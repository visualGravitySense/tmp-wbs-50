/**
 * Restore blog coverImage from custom Sanity assets (May–June 2026),
 * NOT from WordPress. Uses scripts/data/blogCustomCoverMap.json.
 *
 * Usage:
 *   node scripts/restore-blog-covers-custom.mjs --dry-run
 *   node scripts/restore-blog-covers-custom.mjs
 *   node scripts/restore-blog-covers-custom.mjs --slug=toojoupuudus
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const MAP_PATH = path.join(ROOT, 'scripts/data/blogCustomCoverMap.json')
const WP_RESTORE_DAY = '2026-06-11'

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

function loadMap() {
  if (!fs.existsSync(MAP_PATH)) {
    throw new Error(`Missing ${MAP_PATH}`)
  }
  const data = JSON.parse(fs.readFileSync(MAP_PATH, 'utf8'))
  const skip = new Set(data.skipSlugs || [])
  const covers = data.covers || {}
  return { skip, covers }
}

function coverRef(doc) {
  return doc?.coverImage?.asset?._ref || null
}

async function main() {
  const client = getClient()
  const { skip, covers } = loadMap()

  const posts = await client.fetch(
    `*[_type == "blogPost" && defined(slug.current)${onlySlug ? ' && slug.current == $slug' : ''}]{
      _id, title, "slug": slug.current,
      coverImage{ asset->{_id, originalFilename, _createdAt} }
    } | order(publishedAt desc)`,
    onlySlug ? { slug: onlySlug } : {},
  )

  console.log(`${dryRun ? '[dry-run] ' : ''}Restoring custom blog covers from Sanity assets…`)

  let updated = 0
  let skipped = 0
  let missing = 0

  for (const post of posts) {
    const slug = post.slug
    if (!slug || skip.has(slug)) {
      if (slug && skip.has(slug)) {
        console.log(`  keep ${slug}: in skipSlugs`)
      }
      skipped += 1
      continue
    }

    const assetId = covers[slug]
    if (!assetId) {
      console.log(`  skip ${slug}: no entry in blogCustomCoverMap.json`)
      skipped += 1
      continue
    }

    const currentRef = coverRef(post)
    if (currentRef === assetId) {
      console.log(`  keep ${slug}: already on custom asset`)
      skipped += 1
      continue
    }

    const asset = await client.fetch(
      `*[_id == $id && _type == "sanity.imageAsset"][0]{_id, originalFilename, _createdAt, url}`,
      { id: assetId },
    )
    if (!asset) {
      console.warn(`  missing asset for ${slug}: ${assetId}`)
      missing += 1
      continue
    }

    if (asset._createdAt?.slice(0, 10) >= WP_RESTORE_DAY) {
      console.warn(`  warn ${slug}: asset is from WP restore day (${asset.originalFilename})`)
    }

    const currentName = post.coverImage?.asset?.originalFilename || '(none)'
    console.log(`  → ${slug}`)
    console.log(`     ${currentName} → ${asset.originalFilename}`)

    if (!dryRun) {
      await client
        .patch(post._id)
        .set({
          coverImage: {
            _type: 'image',
            asset: { _type: 'reference', _ref: asset._id },
            alt: post.title || slug,
          },
        })
        .commit()
    }
    updated += 1
  }

  console.log(
    `${dryRun ? 'Would update' : 'Updated'} ${updated}, skipped ${skipped}${missing ? `, missing assets ${missing}` : ''}.`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
