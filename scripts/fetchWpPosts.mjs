/**
 * Fetch all WordPress posts from tootmisjuhtimine.ee REST API.
 *
 * Usage:
 *   node scripts/fetchWpPosts.mjs
 *   node scripts/fetchWpPosts.mjs --out=./data/content.json
 *
 * Output:
 *   - Simplified array → `content.json` (or `--out=…`): { title, content, slug } for legacy use.
 *   - Full raw REST objects → `posts.json` at repo root (always): includes `id`, `slug`, `date`,
 *     `title.rendered`, `excerpt.rendered`, `content.rendered`, etc. for `import-posts.mjs`.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const BASE =
  'https://tootmisjuhtimine.ee/wp-json/wp/v2/posts?per_page=100&page='

const POSTS_JSON = path.join(ROOT, 'posts.json')

function parseArgs() {
  const outArg = process.argv.find((a) => a.startsWith('--out='))
  const out = outArg ? outArg.slice('--out='.length) : path.join(ROOT, 'content.json')
  return { out: path.isAbsolute(out) ? out : path.join(ROOT, out) }
}

function mapPost(raw) {
  const title =
    typeof raw.title === 'string'
      ? raw.title
      : raw.title?.rendered != null
        ? String(raw.title.rendered)
        : ''
  const content =
    typeof raw.content === 'string'
      ? raw.content
      : raw.content?.rendered != null
        ? String(raw.content.rendered)
        : ''
  const slug = raw.slug != null ? String(raw.slug) : ''
  return { title, content, slug }
}

async function fetchPage(page) {
  const url = `${BASE}${page}`
  const res = await fetch(url, {
    headers: { Accept: 'application/json' },
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`HTTP ${res.status} for ${url}: ${text.slice(0, 200)}`)
  }
  const totalPages = parseInt(res.headers.get('x-wp-totalpages') || '1', 10)
  const posts = await res.json()
  if (!Array.isArray(posts)) {
    throw new Error('Unexpected response: expected JSON array of posts')
  }
  return { posts, totalPages }
}

/** Full WordPress REST post objects (no field stripping). */
async function fetchAllPostsRaw() {
  const all = []
  let page = 1
  let totalPages = 1

  do {
    const { posts, totalPages: tp } = await fetchPage(page)
    totalPages = Number.isFinite(tp) && tp > 0 ? tp : 1
    for (const raw of posts) {
      all.push(raw)
    }
    if (posts.length === 0) break
    page += 1
  } while (page <= totalPages)

  return all
}

async function main() {
  const { out } = parseArgs()
  console.info('Fetching WordPress posts…')
  const raw = await fetchAllPostsRaw()
  const simplified = raw.map(mapPost)

  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, JSON.stringify(simplified, null, 2), 'utf8')
  console.info(`Wrote ${simplified.length} simplified posts to ${out}`)

  fs.writeFileSync(POSTS_JSON, JSON.stringify(raw, null, 2), 'utf8')
  console.info(`Wrote ${raw.length} raw REST posts to ${POSTS_JSON}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
