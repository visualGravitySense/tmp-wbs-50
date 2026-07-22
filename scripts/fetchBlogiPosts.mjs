/**
 * Fetch WordPress blog posts listed on tootmisjuhtimine.ee/blogi/ (HTML archive).
 *
 * The public blog uses paginated archive pages; this script discovers post slugs
 * from those listings and loads full REST objects for `import-posts.mjs`.
 *
 * Usage:
 *   node scripts/fetchBlogiPosts.mjs
 *   node scripts/fetchBlogiPosts.mjs --page=2
 *   node scripts/fetchBlogiPosts.mjs --pages=1-2
 *   node scripts/fetchBlogiPosts.mjs --page=2 --out=posts-page2.json
 *   node scripts/fetchBlogiPosts.mjs --merge --out=posts.json
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { JSDOM } from 'jsdom'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const SITE = 'https://tootmisjuhtimine.ee'
const LISTING_BASE = `${SITE}/blogi`
const REST_BASE = `${SITE}/wp-json/wp/v2/posts`

function parseArgs() {
  const pageArg = process.argv.find((a) => a.startsWith('--page='))
  const pagesArg = process.argv.find((a) => a.startsWith('--pages='))
  const outArg = process.argv.find((a) => a.startsWith('--out='))
  const merge = process.argv.includes('--merge')

  let listingPages = null
  if (pageArg) {
    const n = Number(pageArg.slice('--page='.length))
    if (!Number.isFinite(n) || n < 1) throw new Error('--page must be a positive integer')
    listingPages = [n]
  } else if (pagesArg) {
    const raw = pagesArg.slice('--pages='.length)
    const [from, to] = raw.split('-').map((v) => Number(v.trim()))
    if (!Number.isFinite(from) || !Number.isFinite(to) || from < 1 || to < from) {
      throw new Error('--pages must look like 1-2')
    }
    listingPages = Array.from({ length: to - from + 1 }, (_, i) => from + i)
  }

  const out = outArg
    ? path.isAbsolute(outArg.slice('--out='.length))
      ? outArg.slice('--out='.length)
      : path.join(ROOT, outArg.slice('--out='.length))
    : path.join(ROOT, 'posts.json')

  return { listingPages, out, merge }
}

function listingUrl(page) {
  return page <= 1 ? `${LISTING_BASE}/` : `${LISTING_BASE}/page/${page}/`
}

function extractPostSlugs(html) {
  const dom = new JSDOM(html)
  const slugs = new Set()

  for (const a of dom.window.document.querySelectorAll('h2 a[href], h3 a[href], .entry-title a[href]')) {
    try {
      const u = new URL(a.href)
      if (u.hostname !== 'tootmisjuhtimine.ee') continue
      const parts = u.pathname.split('/').filter(Boolean)
      if (parts.length !== 1) continue
      const head = parts[0]
      if (['category', 'blogi', 'author', 'tag', 'page', 'wp-json'].includes(head)) continue
      slugs.add(head)
    } catch {
      // ignore malformed href
    }
  }

  return [...slugs]
}

async function discoverListingPages(requestedPages) {
  if (requestedPages?.length) {
    return requestedPages
  }

  const pages = []
  for (let page = 1; page <= 50; page += 1) {
    const res = await fetch(listingUrl(page), { headers: { Accept: 'text/html' } })
    if (!res.ok) break
    const html = await res.text()
    const slugs = extractPostSlugs(html)
    if (slugs.length === 0) break
    pages.push(page)
    if (!html.includes('/page/') && page > 1) break
  }
  return pages
}

async function collectSlugs(listingPages) {
  const slugs = new Set()
  for (const page of listingPages) {
    const url = listingUrl(page)
    const res = await fetch(url, { headers: { Accept: 'text/html' } })
    if (!res.ok) {
      throw new Error(`Listing page ${page} failed: HTTP ${res.status} (${url})`)
    }
    const html = await res.text()
    const found = extractPostSlugs(html)
    console.info(`Listing page ${page}: ${found.length} post(s)`)
    for (const slug of found) slugs.add(slug)
  }
  return [...slugs]
}

async function fetchPostBySlug(slug) {
  const url = `${REST_BASE}?slug=${encodeURIComponent(slug)}`
  const res = await fetch(url, { headers: { Accept: 'application/json' } })
  if (!res.ok) {
    throw new Error(`REST slug=${slug}: HTTP ${res.status}`)
  }
  const rows = await res.json()
  if (!Array.isArray(rows) || rows.length === 0) {
    throw new Error(`REST slug=${slug}: post not found`)
  }
  return rows[0]
}

function mergePosts(existing, incoming) {
  const bySlug = new Map()
  for (const post of existing) {
    if (post?.slug) bySlug.set(String(post.slug), post)
  }
  for (const post of incoming) {
    if (post?.slug) bySlug.set(String(post.slug), post)
  }
  return [...bySlug.values()].sort((a, b) => {
    const da = a.date ? Date.parse(a.date) : 0
    const db = b.date ? Date.parse(b.date) : 0
    return db - da
  })
}

async function main() {
  const { listingPages: requestedPages, out, merge } = parseArgs()
  const listingPages = await discoverListingPages(requestedPages)
  if (!listingPages.length) {
    throw new Error('No blog listing pages discovered')
  }

  console.info(`Discovering posts from listing page(s): ${listingPages.join(', ')}`)
  const slugs = await collectSlugs(listingPages)
  if (!slugs.length) {
    throw new Error('No post slugs found on listing page(s)')
  }

  console.info(`Fetching ${slugs.length} post(s) from WordPress REST API…`)
  const posts = []
  for (const slug of slugs) {
    const post = await fetchPostBySlug(slug)
    posts.push(post)
    const title =
      typeof post.title === 'string'
        ? post.title
        : post.title?.rendered != null
          ? String(post.title.rendered).replace(/<[^>]+>/g, '').trim()
          : slug
    console.info(`  ✓ ${slug} — ${title}`)
  }

  let output = posts
  if (merge && fs.existsSync(out)) {
    const existing = JSON.parse(fs.readFileSync(out, 'utf8'))
    if (!Array.isArray(existing)) throw new Error(`Expected array in ${out}`)
    output = mergePosts(existing, posts)
    console.info(`Merged with existing file → ${output.length} total post(s)`)
  }

  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, JSON.stringify(output, null, 2), 'utf8')
  console.info(`Wrote ${posts.length} fetched post(s) to ${out}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
