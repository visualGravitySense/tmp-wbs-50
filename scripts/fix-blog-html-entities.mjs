/**
 * Fix WordPress HTML entities (&#8211;, &nbsp;, …) in imported blogPost documents.
 *
 * Usage:
 *   node scripts/fix-blog-html-entities.mjs --dry-run
 *   node scripts/fix-blog-html-entities.mjs
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  decodeHtmlEntities,
  normalizeExcerpt,
  sanitizePortableTextSpans,
} from './lib/decodeHtmlEntities.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
dotenv.config({ path: path.join(ROOT, '.env') })
dotenv.config({ path: path.join(ROOT, '.env.local'), override: true })

const dryRun = process.argv.includes('--dry-run')

function envStr(...keys) {
  for (const k of keys) {
    const v = process.env[k]
    if (v == null) continue
    const t = String(v).trim().replace(/^["']|["']$/g, '')
    if (t) return t
  }
  return ''
}

function needsFix(str) {
  return typeof str === 'string' && /&(?:#\d+|#x[\da-f]+|[a-z]+);/i.test(str)
}

function bodyNeedsFix(body) {
  if (!Array.isArray(body)) return false
  return body.some(
    (b) =>
      b?._type === 'block' &&
      Array.isArray(b.children) &&
      b.children.some((c) => needsFix(c?.text)),
  )
}

async function main() {
  const client = createClient({
    projectId: envStr('NEXT_PUBLIC_SANITY_PROJECT_ID', 'SANITY_PROJECT_ID'),
    dataset: envStr('NEXT_PUBLIC_SANITY_DATASET', 'SANITY_DATASET') || 'production',
    apiVersion: envStr('NEXT_PUBLIC_SANITY_API_VERSION', 'SANITY_API_VERSION') || '2024-01-01',
    token: envStr('SANITY_AUTH_TOKEN', 'SANITY_API_TOKEN'),
    useCdn: false,
  })

  const posts = await client.fetch(
    `*[_type == "blogPost" && defined(slug.current)]{
      _id, title, excerpt, body, "slug": slug.current, wpImportId
    }`,
  )

  let fixed = 0
  let skipped = 0

  for (const post of posts) {
    const nextTitle = decodeHtmlEntities(post.title)
    const nextExcerpt = post.excerpt
      ? normalizeExcerpt(post.excerpt)
      : undefined
    const nextBody = sanitizePortableTextSpans(post.body)

    const changed =
      nextTitle !== post.title ||
      nextExcerpt !== post.excerpt ||
      JSON.stringify(nextBody) !== JSON.stringify(post.body)

    if (!changed) {
      skipped += 1
      continue
    }

    const titleFix = nextTitle !== post.title
    const excerptFix = nextExcerpt !== post.excerpt
    const bodyFix = JSON.stringify(nextBody) !== JSON.stringify(post.body)

    console.log(`→ ${post.slug}`)
    if (titleFix) console.log(`   title: ${post.title?.slice(0, 50)} → ${nextTitle.slice(0, 50)}`)
    if (excerptFix) {
      console.log(`   excerpt: ${post.excerpt?.slice(0, 55)}`)
      console.log(`         → ${nextExcerpt?.slice(0, 55)}`)
    }
    if (bodyFix) console.log('   body: decoded span entities')

    if (!dryRun) {
      const patch = {}
      if (titleFix) patch.title = nextTitle
      if (excerptFix) patch.excerpt = nextExcerpt
      if (bodyFix) patch.body = nextBody
      await client.patch(post._id).set(patch).commit()
    }
    fixed += 1
  }

  console.log(`${dryRun ? 'Would fix' : 'Fixed'} ${fixed}, unchanged ${skipped}.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
