/**
 * Move WordPress imports from immutable `post` → native `blogPost` documents.
 *
 * Sanity cannot change `_type` in place. This script copies each `post` import to
 * `import.blogPost.{slug}` and deletes the old `post` document.
 *
 * Usage:
 *   node scripts/migrate-import-post-type.mjs --dry-run
 *   node scripts/migrate-import-post-type.mjs
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

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

function getClient() {
  const projectId = envStr('NEXT_PUBLIC_SANITY_PROJECT_ID', 'SANITY_PROJECT_ID')
  const dataset = envStr('NEXT_PUBLIC_SANITY_DATASET', 'SANITY_DATASET') || 'production'
  const apiVersion = envStr('NEXT_PUBLIC_SANITY_API_VERSION', 'SANITY_API_VERSION') || '2024-01-01'
  const token = envStr('SANITY_AUTH_TOKEN', 'SANITY_API_TOKEN')

  if (!projectId) throw new Error('Missing Sanity project id')
  if (!token) throw new Error('Missing SANITY_AUTH_TOKEN')

  return createClient({ projectId, dataset, apiVersion, token, useCdn: false, perspective: 'raw' })
}

function blogPostIdForSlug(slug) {
  return `import.blogPost.${slug}`
}

async function main() {
  const client = getClient()
  const imports = await client.fetch(
    `*[_type == "post"]{
      _id,
      title,
      slug,
      body,
      content,
      publishedAt,
      excerpt,
      category,
      readTime,
      featured,
      author,
      coverImage,
      wpImportId
    }`,
  )

  if (!imports.length) {
    console.log('No `post` imports found — nothing to migrate.')
    return
  }

  console.log(`${dryRun ? '[dry-run] ' : ''}Migrating ${imports.length} WordPress import(s) to blogPost…`)

  for (const doc of imports) {
    const slug = doc.slug?.current?.trim()
    if (!slug) {
      console.warn(`  skip ${doc._id}: missing slug`)
      continue
    }

    const targetId = blogPostIdForSlug(slug)
    const existing = await client.fetch(`*[_id == $id][0]{_id, _type}`, { id: targetId })

    if (existing && existing._type === 'blogPost' && existing._id !== doc._id) {
      console.warn(`  skip ${slug}: blogPost already exists at ${targetId}`)
      if (!dryRun) await client.delete(doc._id)
      continue
    }

    const body =
      Array.isArray(doc.body) && doc.body.length > 0
        ? doc.body
        : Array.isArray(doc.content) && doc.content.length > 0
          ? doc.content
          : []

    const nextDoc = {
      _id: targetId,
      _type: 'blogPost',
      title: doc.title,
      slug: doc.slug,
      body,
      publishedAt: doc.publishedAt,
      excerpt: doc.excerpt,
      category: doc.category || 'juhtimine',
      readTime: doc.readTime,
      featured: Boolean(doc.featured),
      author: doc.author,
      coverImage: doc.coverImage,
      wpImportId: doc.wpImportId,
    }

    Object.keys(nextDoc).forEach((key) => nextDoc[key] === undefined && delete nextDoc[key])

    console.log(`  → ${slug}: ${doc._id} → ${targetId}`)
    if (dryRun) continue

    await client.createOrReplace(nextDoc)
    if (doc._id !== targetId) {
      await client.delete(doc._id)
    }
  }

  console.log(dryRun ? 'Dry run complete.' : 'Migration complete. Refresh Sanity Studio.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
