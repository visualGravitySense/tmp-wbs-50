/**
 * Upgrade legacy Sanity `post` (WordPress import) documents with full blog fields.
 *
 * - Copies `content` → `body` when body is empty
 * - Fills category, readTime, featured, author defaults
 * - Does not change `_type` (Sanity immutable) — same `_id`, expanded schema in Studio
 *
 * Usage:
 *   node scripts/migrate-wp-posts.mjs
 *   node scripts/migrate-wp-posts.mjs --dry-run
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

  if (!projectId) throw new Error('Missing Sanity project id in .env')
  if (!token) throw new Error('Missing SANITY_AUTH_TOKEN in .env / .env.local')

  return createClient({ projectId, dataset, apiVersion, token, useCdn: false })
}

const DEFAULT_AUTHOR = {
  name: 'Andres Kase',
  role: 'Tootmisjuhtimise koolitaja',
}

function estimateReadTime(blocks) {
  if (!Array.isArray(blocks) || blocks.length === 0) return 5
  const text = blocks
    .filter((b) => b?._type === 'block')
    .flatMap((b) => (Array.isArray(b.children) ? b.children : []))
    .map((c) => (typeof c?.text === 'string' ? c.text : ''))
    .join(' ')
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.min(60, Math.ceil(words / 200) || 5))
}

function normalizeCategory(raw) {
  const value = String(raw || 'juhtimine')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
  return value || 'juhtimine'
}

function buildPatch(doc) {
  const body =
    Array.isArray(doc.body) && doc.body.length > 0
      ? doc.body
      : Array.isArray(doc.content) && doc.content.length > 0
        ? doc.content
        : null

  const set = {
    category: normalizeCategory(doc.category),
    readTime:
      typeof doc.readTime === 'number' && doc.readTime >= 1
        ? doc.readTime
        : estimateReadTime(body || doc.content || doc.body),
    featured: Boolean(doc.featured),
    author: doc.author?.name ? doc.author : DEFAULT_AUTHOR,
  }

  if (body && (!Array.isArray(doc.body) || doc.body.length === 0)) {
    set.body = body
  }

  if (doc.wpImportId == null && doc._id.startsWith('import.post.')) {
    // stable id encodes wp import — optional marker for editors
  }

  const unset = []
  if (Array.isArray(doc.content) && Array.isArray(set.body)) {
    unset.push('content')
  }

  return { set, unset }
}

async function main() {
  const client = getClient()
  const legacy = await client.fetch(
    `*[_type == "post"]{
      _id,
      title,
      category,
      readTime,
      featured,
      author,
      body,
      content,
      wpImportId
    }`,
  )

  if (!legacy.length) {
    console.log('No `post` documents found — nothing to upgrade.')
    return
  }

  console.log(`${dryRun ? '[dry-run] ' : ''}Upgrading ${legacy.length} WordPress import(s)…`)

  for (const doc of legacy) {
    const { set, unset } = buildPatch(doc)
    console.log(`  → ${doc.title || doc._id}`)
    if (dryRun) continue

    let patch = client.patch(doc._id.replace(/^drafts\./, '')).set(set)
    if (unset.length) patch = patch.unset(unset)
    await patch.commit()
  }

  console.log(`${dryRun ? 'Would upgrade' : 'Upgraded'} ${legacy.length} document(s).`)
  if (!dryRun) {
    console.log('Refresh Sanity Studio — WordPress posts now have the full Blog Post fields.')
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
