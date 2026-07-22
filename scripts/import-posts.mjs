/**
 * Migrate WordPress REST export → Sanity `post` documents (full blog schema).
 *
 * Mirrors `import-reviews.mjs`: same env, client, dotenv, and idempotent `createOrReplace`.
 *
 * Env (repo root `.env` via dotenv):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_PROJECT_ID (matches Next.js `lib/sanity/client`)
 *   NEXT_PUBLIC_SANITY_DATASET or SANITY_DATASET — default: production
 *   NEXT_PUBLIC_SANITY_API_VERSION or SANITY_API_VERSION — default: 2024-01-01
 *   SANITY_AUTH_TOKEN (or SANITY_API_TOKEN — same write token some setups use)
 *
 * Data (default `./posts.json` at repo root):
 *   WordPress REST `posts` array items with `id`, `slug`, `date`,
 *   `title.rendered`, `excerpt.rendered`, `content.rendered` (HTML).
 *
 * HTML → Portable Text: npm package `html-to-portable-text` is an alias to `@portabletext/html`
 * (the name `html-to-portable-text` is not published on npm).
 *
 * Usage:
 *   node scripts/import-posts.mjs
 *   node scripts/import-posts.mjs --file=./posts.json
 *   node scripts/import-posts.mjs --file=./posts-page2.json
 *   node scripts/import-posts.mjs --slugs=slug-one,slug-two
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { JSDOM } from 'jsdom'
import { htmlToPortableText } from 'html-to-portable-text'
import {
  decodeHtmlEntities,
  normalizeExcerpt,
  sanitizePortableTextSpans,
  stripHtml,
} from './lib/decodeHtmlEntities.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

dotenv.config({ path: path.join(ROOT, '.env') })
dotenv.config({ path: path.join(ROOT, '.env.local'), override: true })

function parseArgs() {
  const fileArg = process.argv.find((a) => a.startsWith('--file='))
  const slugsArg = process.argv.find((a) => a.startsWith('--slugs='))
  const rel = fileArg ? fileArg.slice('--file='.length) : 'posts.json'
  const filePath = path.isAbsolute(rel) ? rel : path.join(ROOT, rel)
  const slugFilter = slugsArg
    ? slugsArg
        .slice('--slugs='.length)
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : null
  return { filePath, slugFilter }
}

function readJson(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`)
  }
  const raw = fs.readFileSync(filePath, 'utf8')
  const data = JSON.parse(raw)
  if (!Array.isArray(data)) {
    throw new Error('Expected posts.json to be a JSON array')
  }
  return data
}

function randomKey() {
  return crypto.randomBytes(6).toString('hex')
}

/** Stable id by slug — matches `uploadData.mjs` and Studio native blog posts. */
function stablePostId(slug) {
  return `import.blogPost.${slug}`
}

function getRendered(objOrString) {
  if (typeof objOrString === 'string') return objOrString
  if (objOrString && typeof objOrString === 'object' && 'rendered' in objOrString) {
    return String(objOrString.rendered ?? '')
  }
  return ''
}

function htmlToBlocks(html, { slug } = { slug: '?' }) {
  const input = (html && String(html).trim()) || '<p></p>'
  try {
    const blocks = htmlToPortableText(input, {
      parseHtml: (h) => new JSDOM(h).window.document,
    })
    const normalized = sanitizePortableTextSpans(
      Array.isArray(blocks) && blocks.length > 0 ? blocks : null,
    )
    return Array.isArray(normalized) && normalized.length > 0
      ? normalized
      : [
          {
            _type: 'block',
            _key: randomKey(),
            style: 'normal',
            markDefs: [],
            children: [
              { _type: 'span', _key: randomKey(), text: ' ', marks: [] },
            ],
          },
        ]
  } catch (err) {
    console.warn(`[html-to-portable-text] slug=${slug}: ${err?.message || err}`)
    return [
      {
        _type: 'block',
        _key: randomKey(),
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: randomKey(),
            text: stripHtml(input).slice(0, 8000) || ' ',
            marks: [],
          },
        ],
      },
    ]
  }
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
  const token = envStr('SANITY_AUTH_TOKEN', 'SANITY_API_TOKEN')

  if (!projectId) {
    throw new Error(
      'Missing Sanity project id: set NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_PROJECT_ID in .env',
    )
  }
  if (!token) {
    throw new Error('Missing SANITY_AUTH_TOKEN or SANITY_API_TOKEN in .env / .env.local')
  }

  return createClient({ projectId, dataset, apiVersion, token, useCdn: false })
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

const DEFAULT_AUTHOR = {
  name: 'Andres Kase',
  role: 'Tootmisjuhtimise koolitaja',
}

async function main() {
  const { filePath, slugFilter } = parseArgs()
  const rowsAll = readJson(filePath)
  const rows = slugFilter?.length
    ? rowsAll.filter((row) => slugFilter.includes(String(row.slug ?? '').trim()))
    : rowsAll
  const client = getClient()

  if (slugFilter?.length && rows.length === 0) {
    throw new Error(`No rows in ${filePath} matched --slugs=${slugFilter.join(',')}`)
  }

  let ok = 0
  let skipped = 0

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    const wpId = row.id
    if (wpId == null || Number.isNaN(Number(wpId))) {
      console.warn(`Skip row ${i + 1}: missing numeric WordPress id`)
      skipped += 1
      continue
    }

    const slug = row.slug != null ? String(row.slug).trim() : ''
    const titleHtml = getRendered(row.title)
    const title = decodeHtmlEntities(stripHtml(titleHtml)) || slug || `post-${wpId}`

    if (!slug) {
      console.warn(`Skip row ${i + 1}: missing slug (wp id ${wpId})`)
      skipped += 1
      continue
    }

    const dateRaw = row.date != null ? String(row.date) : ''
    const publishedAt = dateRaw ? new Date(dateRaw).toISOString() : new Date().toISOString()

    const excerptHtml = getRendered(row.excerpt)
    const excerpt = normalizeExcerpt(excerptHtml)

    const contentHtml = getRendered(row.content)
    const body = htmlToBlocks(contentHtml, { slug })

    const _id = stablePostId(slug)
    const existing = await client.fetch(
      `*[_id == $id][0]{ coverImage }`,
      { id: _id },
    )
    const doc = {
      _id,
      _type: 'blogPost',
      title,
      slug: { _type: 'slug', current: slug },
      body,
      publishedAt,
      excerpt,
      category: 'juhtimine',
      readTime: estimateReadTime(body),
      featured: false,
      author: DEFAULT_AUTHOR,
      wpImportId: Number(wpId),
    }
    if (existing?.coverImage?.asset?._ref) {
      doc.coverImage = existing.coverImage
    }
    if (doc.excerpt === undefined) delete doc.excerpt

    await client.createOrReplace(doc)
    ok += 1
    console.log(`Imported post — ${title}`)
  }

  console.log(`Done: ${ok} posts imported, ${skipped} skipped, from ${filePath}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
