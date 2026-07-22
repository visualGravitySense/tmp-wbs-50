/**
 * Restore blog cover images from WordPress featured media → Sanity `coverImage`.
 *
 * WP imports never uploaded covers; native posts keep existing covers.
 *
 * Usage:
 *   node scripts/restore-blog-covers.mjs --dry-run
 *   node scripts/restore-blog-covers.mjs
 *   node scripts/restore-blog-covers.mjs --slug=toojoupuudus
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const WP_API = 'https://tootmisjuhtimine.ee/wp-json/wp/v2/posts'

dotenv.config({ path: path.join(ROOT, '.env') })
dotenv.config({ path: path.join(ROOT, '.env.local'), override: true })

const dryRun = process.argv.includes('--dry-run')
const slugArg = process.argv.find((a) => a.startsWith('--slug='))
const onlySlug = slugArg ? slugArg.slice('--slug='.length).trim() : null

function envStr(...keys) {
  for (const k of keys) {
    const v = process.env[k]
    if (v == null) continue
    const t = String(v).trim().replace(/^["']|["']$/g, '')
    if (t) return t
  }
  return ''
}

function getClient() {
  const projectId = envStr('NEXT_PUBLIC_SANITY_PROJECT_ID', 'SANITY_PROJECT_ID')
  const dataset = envStr('NEXT_PUBLIC_SANITY_DATASET', 'SANITY_DATASET') || 'production'
  const apiVersion = envStr('NEXT_PUBLIC_SANITY_API_VERSION', 'SANITY_API_VERSION') || '2024-01-01'
  const token = envStr('SANITY_AUTH_TOKEN', 'SANITY_API_TOKEN')
  if (!projectId || !token) throw new Error('Missing Sanity credentials in .env')
  return createClient({ projectId, dataset, apiVersion, token, useCdn: false })
}

function getRendered(objOrString) {
  if (typeof objOrString === 'string') return objOrString
  if (objOrString && typeof objOrString === 'object' && 'rendered' in objOrString) {
    return String(objOrString.rendered ?? '')
  }
  return ''
}

function firstContentImageUrl(html) {
  const match = String(html).match(/<img[^>]+src=["']([^"']+)["']/i)
  return match?.[1]?.trim() || null
}

function featuredImageUrl(wpPost) {
  const media = wpPost?._embedded?.['wp:featuredmedia']?.[0]
  if (media && media.code !== 'rest_forbidden') {
    const sizes = media.media_details?.sizes
    const fromFeatured =
      sizes?.full?.source_url ||
      sizes?.large?.source_url ||
      sizes?.medium_large?.source_url ||
      media.source_url ||
      null
    if (fromFeatured) return fromFeatured
  }
  return firstContentImageUrl(getRendered(wpPost?.content))
}

async function fetchWpPostBySlug(slug) {
  const url = `${WP_API}?slug=${encodeURIComponent(slug)}&_embed=1`
  const res = await fetch(url, { headers: { Accept: 'application/json' } })
  if (!res.ok) throw new Error(`WP HTTP ${res.status} for ${slug}`)
  const rows = await res.json()
  return Array.isArray(rows) && rows.length > 0 ? rows[0] : null
}

async function uploadCoverFromUrl(client, imageUrl, { filename, alt }) {
  const res = await fetch(imageUrl)
  if (!res.ok) throw new Error(`Image HTTP ${res.status}: ${imageUrl}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  const name = filename || path.basename(new URL(imageUrl).pathname) || 'cover.jpg'
  const asset = await client.assets.upload('image', buffer, { filename: name })
  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: asset._id },
    alt: alt || undefined,
  }
}

async function main() {
  const client = getClient()
  const posts = await client.fetch(
    `*[_type == "blogPost" && defined(slug.current)${onlySlug ? ' && slug.current == $slug' : ''}]{
      _id,
      title,
      "slug": slug.current,
      "hasCover": defined(coverImage.asset),
      wpImportId
    } | order(publishedAt desc)`,
    onlySlug ? { slug: onlySlug } : {},
  )

  const targets = posts.filter((p) => !p.hasCover)
  if (!targets.length) {
    console.log('All matching posts already have cover images.')
    return
  }

  console.log(`${dryRun ? '[dry-run] ' : ''}Restoring covers for ${targets.length} post(s)…`)

  let ok = 0
  let skipped = 0

  for (const post of targets) {
    const slug = post.slug
    if (!slug) {
      skipped += 1
      continue
    }

    const wpPost = await fetchWpPostBySlug(slug)
    if (!wpPost) {
      console.warn(`  skip ${slug}: not found on WordPress`)
      skipped += 1
      continue
    }

    const imageUrl = featuredImageUrl(wpPost)
    if (!imageUrl) {
      console.warn(`  skip ${slug}: no featured image on WordPress`)
      skipped += 1
      continue
    }

    console.log(`  → ${slug}`)
    console.log(`     ${imageUrl}`)
    if (dryRun) {
      ok += 1
      continue
    }

    const coverImage = await uploadCoverFromUrl(client, imageUrl, {
      filename: `${slug}${path.extname(new URL(imageUrl).pathname) || '.jpg'}`,
      alt: post.title || slug,
    })
    await client.patch(post._id).set({ coverImage }).commit()
    ok += 1
  }

  console.log(`${dryRun ? 'Would restore' : 'Restored'} ${ok}, skipped ${skipped}.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
