/**
 * Restore blog coverImage from Sanity document history (before WP cover overwrite).
 *
 * Usage:
 *   node scripts/restore-blog-covers-from-history.mjs --dry-run
 *   node scripts/restore-blog-covers-from-history.mjs
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
dotenv.config({ path: path.join(ROOT, '.env') })
dotenv.config({ path: path.join(ROOT, '.env.local'), override: true })

const dryRun = process.argv.includes('--dry-run')
const WP_RESTORE_DAY = '2026-06-11'

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
  const apiVersion = '2021-06-07'
  const token = envStr('SANITY_AUTH_TOKEN', 'SANITY_API_TOKEN')
  if (!projectId || !token) throw new Error('Missing Sanity credentials')
  return createClient({ projectId, dataset, apiVersion, token, useCdn: false })
}

async function listRevisions(client, docId) {
  const { projectId, dataset } = client.config()
  const url = `https://${projectId}.api.sanity.io/v2021-06-07/history/${dataset}/documents/${encodeURIComponent(docId)}`
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${envStr('SANITY_AUTH_TOKEN', 'SANITY_API_TOKEN')}` },
  })
  if (!res.ok) {
    throw new Error(`History HTTP ${res.status} for ${docId}`)
  }
  const body = await res.json()
  return Array.isArray(body) ? body : body.documents || []
}

async function getRevisionDoc(client, docId, revisionId) {
  const { projectId, dataset } = client.config()
  const url = `https://${projectId}.api.sanity.io/v2021-06-07/data/history/${dataset}/documents/${encodeURIComponent(docId)}?revision=${encodeURIComponent(revisionId)}`
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${envStr('SANITY_AUTH_TOKEN', 'SANITY_API_TOKEN')}` },
  })
  if (!res.ok) throw new Error(`Revision HTTP ${res.status}`)
  const body = await res.json()
  return body.documents?.[0] || body.document || body
}

function coverRef(doc) {
  return doc?.coverImage?.asset?._ref || null
}

async function findPreWpCover(client, docId) {
  const revisions = await listRevisions(client, docId)
  if (!revisions.length) return null

  const sorted = [...revisions].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  )

  for (const rev of sorted) {
    const ts = rev.timestamp?.slice(0, 10)
    if (ts && ts >= WP_RESTORE_DAY) continue
    const doc = await getRevisionDoc(client, docId, rev.id)
    const ref = coverRef(doc)
    if (ref) {
      return { coverImage: doc.coverImage, revisionId: rev.id, timestamp: rev.timestamp }
    }
  }

  return null
}

async function main() {
  const client = getClient()
  const posts = await client.fetch(
    `*[_type == "blogPost" && defined(slug.current)]{
      _id, title, "slug": slug.current,
      coverImage
    } | order(publishedAt desc)`,
  )

  console.log(`${dryRun ? '[dry-run] ' : ''}Restoring covers from Sanity history (before ${WP_RESTORE_DAY})…`)

  let restored = 0
  let skipped = 0

  for (const post of posts) {
    const currentRef = coverRef(post)
    const historical = await findPreWpCover(client, post._id)
    if (!historical?.coverImage?.asset?._ref) {
      console.log(`  skip ${post.slug}: no pre-WP cover in history`)
      skipped += 1
      continue
    }

    if (historical.coverImage.asset._ref === currentRef) {
      console.log(`  keep ${post.slug}: already on original cover`)
      skipped += 1
      continue
    }

    const asset = await client.fetch(`*[_id == $id][0]{url, originalFilename}`, {
      id: historical.coverImage.asset._ref,
    })
    console.log(`  → ${post.slug}`)
    console.log(`     rev ${historical.timestamp} → ${asset?.originalFilename || historical.coverImage.asset._ref}`)

    if (!dryRun) {
      await client
        .patch(post._id)
        .set({
          coverImage: {
            _type: 'image',
            asset: { _type: 'reference', _ref: historical.coverImage.asset._ref },
            alt: historical.coverImage.alt || post.title,
          },
        })
        .commit()
    }
    restored += 1
  }

  console.log(`${dryRun ? 'Would restore' : 'Restored'} ${restored}, skipped ${skipped}.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
