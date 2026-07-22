/**
 * Migrate scraped testimonials → Sanity `review` documents.
 *
 * Env (load from repo root `.env` via dotenv, or export in shell):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_PROJECT_ID (matches Next.js `lib/sanity/client`)
 *   NEXT_PUBLIC_SANITY_DATASET or SANITY_DATASET — default: production
 *   NEXT_PUBLIC_SANITY_API_VERSION or SANITY_API_VERSION — default: 2024-01-01
 *   SANITY_AUTH_TOKEN — write token
 *
 * Data (repo root by default):
 *   ./testimonials.json — array of { authorName, roleCompany, content }
 *
 * Usage:
 *   node scripts/import-reviews.mjs
 *   node scripts/import-reviews.mjs --file=./testimonials.json
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

dotenv.config({ path: path.join(ROOT, '.env') })

function parseArgs() {
  const fileArg = process.argv.find((a) => a.startsWith('--file='))
  const rel = fileArg ? fileArg.slice('--file='.length) : 'testimonials.json'
  return path.isAbsolute(rel) ? rel : path.join(ROOT, rel)
}

function readJson(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`)
  }
  const raw = fs.readFileSync(filePath, 'utf8')
  const data = JSON.parse(raw)
  if (!Array.isArray(data)) {
    throw new Error('Expected testimonials.json to be a JSON array')
  }
  return data
}

/** Deterministic _id from SHA-256 so createOrReplace is idempotent across runs. */
function stableReviewId(author, label, text) {
  const payload = `${author}\n${label}\n${text}`
  const hash = crypto.createHash('sha256').update(payload, 'utf8').digest('hex')
  return `import.review.${hash}`
}

/** First non-empty env value (empty string in .env counts as unset). */
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
  const dataset =
    envStr('NEXT_PUBLIC_SANITY_DATASET', 'SANITY_DATASET') || 'production'
  const apiVersion =
    envStr('NEXT_PUBLIC_SANITY_API_VERSION', 'SANITY_API_VERSION') || '2024-01-01'
  const token = envStr('SANITY_AUTH_TOKEN')

  if (!projectId) {
    throw new Error(
      'Missing Sanity project id: set NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_PROJECT_ID in .env',
    )
  }
  if (!token) {
    throw new Error('Missing SANITY_AUTH_TOKEN in .env')
  }

  return createClient({ projectId, dataset, apiVersion, token, useCdn: false })
}

async function main() {
  const jsonPath = parseArgs()
  const rows = readJson(jsonPath)
  const client = getClient()

  let ok = 0
  let skipped = 0

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    const author = String(row.authorName ?? '').trim()
    const label = String(row.roleCompany ?? '').trim()
    const text = String(row.content ?? '').trim()

    if (!author || !text) {
      console.warn(`Skip row ${i + 1}: missing author or text`)
      skipped += 1
      continue
    }

    const _id = stableReviewId(author, label, text)
    const doc = {
      _id,
      _type: 'review',
      author,
      label: label || undefined,
      text,
    }
    if (doc.label === undefined) delete doc.label

    await client.createOrReplace(doc)
    ok += 1
    console.log(`Uploaded review ${_id} — ${author}`)
  }

  console.log(`Done: ${ok} uploaded, ${skipped} skipped, from ${jsonPath}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
