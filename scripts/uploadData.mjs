/**
 * Bulk upload helpers for Sanity (blog posts, partner logos, testimonials/"reviews").
 *
 * Prerequisites:
 *   npm i (already has @sanity/client)
 *
 * Env:
 *   SANITY_PROJECT_ID       — Sanity project ID (or NEXT_PUBLIC_SANITY_PROJECT_ID)
 *   SANITY_DATASET          — default: production
 *   SANITY_API_VERSION      — default: 2024-01-01
 *   SANITY_AUTH_TOKEN       — token with write access (Content > API > Tokens)
 *
 * Usage:
 *   node scripts/uploadData.mjs                    # all: blog + partners + reviews
 *   node scripts/uploadData.mjs blog
 *   node scripts/uploadData.mjs partners
 *   node scripts/uploadData.mjs reviews
 *   node scripts/uploadData.mjs --dry-run all      # log only, no mutations
 *
 * Data files (repo root):
 *   scripts/data/blogPosts.json    — copy from blogPosts.example.json; array of posts
 *   scripts/data/reviews.json      — copy from reviews.example.json; array of testimonials
 *
 * Partner logos: images under public/partners (png, jpg, jpeg, webp, svg, gif)
 */

import { createClient } from '@sanity/client'
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')

const IMAGE_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg'])

/** Sanity uses `testimonial` for client reviews; there is no separate `review` type in this repo. */
const REVIEW_DOCUMENT_TYPE = 'testimonial'

function randomKey() {
  return crypto.randomBytes(6).toString('hex')
}

function slugify(input) {
  return String(input || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96) || 'item'
}

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(raw)
}

function resolveFromRoot(rel) {
  return path.isAbsolute(rel) ? rel : path.join(ROOT, rel)
}

/** Plain string → minimal Portable Text blocks for blog `body`. */
function stringToPortableText(text) {
  const paragraphs = String(text).split(/\n\n+/).filter(Boolean)
  return paragraphs.map((p) => ({
    _type: 'block',
    _key: randomKey(),
    style: 'normal',
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: randomKey(),
        text: p.replace(/\n/g, ' '),
        marks: [],
      },
    ],
  }))
}

/**
 * Upload a local image/binary to Sanity assets, return `{ _type, asset: { _type, _ref } }` for image fields.
 */
export async function uploadImageAsset(client, filePath, { filename } = {}) {
  const abs = resolveFromRoot(filePath)
  if (!fs.existsSync(abs)) {
    throw new Error(`Image not found: ${abs}`)
  }
  const buffer = fs.readFileSync(abs)
  const name = filename || path.basename(abs)
  const asset = await client.assets.upload('image', buffer, { filename: name })
  return {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: asset._id,
    },
  }
}

/**
 * Map JSON row → blogPost document fields.
 * Expected keys (flexible):
 *   title, slug?, publishedAt, excerpt?, category, readTime?, featured?,
 *   author?: { name, role?, avatarPath? },
 *   body?: string | portable text blocks[],
 *   coverImagePath?
 */
export function mapBlogPostFromJson(row, { defaultAuthorName = 'Andres Kase' } = {}) {
  const title = String(row.title || '').trim()
  if (!title) throw new Error('blog post: missing title')

  const slugSource = row.slug || title
  const slugCurrent = typeof slugSource === 'string' ? slugSource : slugSource?.current || title
  const slug = slugify(slugCurrent)

  const category = String(row.category || 'general').trim().toLowerCase()
  if (!/^[a-z0-9-]+$/.test(category)) {
    throw new Error(`blog post "${title}": category must be slug-like (a-z, 0-9, hyphen): got "${category}"`)
  }

  const publishedAt = row.publishedAt || new Date().toISOString()
  const readTime = Number(row.readTime) > 0 ? Number(row.readTime) : 5

  let body = row.body
  if (typeof body === 'string') {
    body = stringToPortableText(body)
  }
  if (!Array.isArray(body) || body.length === 0) {
    body = stringToPortableText(row.excerpt || title)
  }

  return {
    meta: { title, slug, coverImagePath: row.coverImagePath, authorAvatarPath: row.author?.avatarPath },
    doc: {
      _type: 'blogPost',
      title,
      slug: { _type: 'slug', current: slug },
      publishedAt,
      excerpt: row.excerpt ? String(row.excerpt).slice(0, 200) : undefined,
      category,
      readTime,
      featured: Boolean(row.featured),
      author: {
        _type: 'object',
        name: row.author?.name || defaultAuthorName,
        role: row.author?.role || undefined,
      },
      body,
    },
  }
}

export async function uploadBlogPosts(client, posts, { dryRun = false } = {}) {
  const results = []
  for (const row of posts) {
    const { meta, doc: base } = mapBlogPostFromJson(row)
    const id = `import.blogPost.${meta.slug}`

    if (meta.coverImagePath && !dryRun) {
      base.coverImage = {
        ...(await uploadImageAsset(client, meta.coverImagePath)),
        alt: base.title,
      }
    }

    if (meta.authorAvatarPath && !dryRun) {
      base.author.avatar = await uploadImageAsset(client, meta.authorAvatarPath, {
        filename: path.basename(meta.authorAvatarPath),
      })
    }

    const doc = { ...base, _id: id }
    Object.keys(doc).forEach((k) => doc[k] === undefined && delete doc[k])

    if (dryRun) {
      console.info('[dry-run] blogPost', id, base.title)
      results.push({ id, title: base.title, skipped: true })
      continue
    }

    await client.createOrReplace(doc)
    console.info('blogPost', id, base.title)
    results.push({ id, title: base.title })
  }
  return results
}

export async function uploadPartnerLogos(client, partnersDir = 'public/partners', { dryRun = false } = {}) {
  const dir = resolveFromRoot(partnersDir)
  if (!fs.existsSync(dir)) {
    console.warn(`Partner dir missing (skip): ${dir}`)
    return []
  }

  const files = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isFile())
    .map((d) => d.name)
    .filter((name) => IMAGE_EXT.has(path.extname(name).toLowerCase()))
    .sort()

  const results = []
  let order = 0
  for (const file of files) {
    const abs = path.join(dir, file)
    const baseName = path.basename(file, path.extname(file))
    const id = `import.partnerLogo.${slugify(baseName)}`
    order += 1

    if (dryRun) {
      console.info('[dry-run] partnerLogo', id, baseName)
      results.push({ id, name: baseName, skipped: true })
      continue
    }

    const imageField = await uploadImageAsset(client, abs, { filename: file })
    const doc = {
      _id: id,
      _type: 'partnerLogo',
      name: baseName.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      displayType: 'logo',
      logo: {
        ...imageField,
        alt: `${baseName} logo`,
      },
      order,
    }
    await client.createOrReplace(doc)
    console.info('partnerLogo', id, doc.name)
    results.push({ id, name: doc.name })
  }
  return results
}

/**
 * Create testimonial documents (reviews). JSON rows: { name, content, role?, company?, rating?, featured? }
 */
export async function uploadReviews(client, reviews, { dryRun = false } = {}) {
  const results = []
  for (let i = 0; i < reviews.length; i++) {
    const row = reviews[i]
    const name = String(row.name || '').trim()
    const content = String(row.content || row.quote || row.text || '').trim()
    if (!name || !content) {
      console.warn('Skipping review row (missing name/content):', row)
      continue
    }
    const slug = slugify(`${name}-${i}`)
    const id = `import.${REVIEW_DOCUMENT_TYPE}.${slug}`

    const doc = {
      _id: id,
      _type: REVIEW_DOCUMENT_TYPE,
      name,
      content,
      role: row.role || undefined,
      company: row.company || undefined,
      rating: row.rating != null ? Math.min(5, Math.max(1, Number(row.rating))) : undefined,
      featured: Boolean(row.featured),
    }

    if (row.avatarPath && !dryRun) {
      doc.avatar = await uploadImageAsset(client, row.avatarPath)
    }

    if (dryRun) {
      console.info(`[dry-run] ${REVIEW_DOCUMENT_TYPE}`, id, name)
      results.push({ id, name, skipped: true })
      continue
    }

    Object.keys(doc).forEach((k) => doc[k] === undefined && delete doc[k])
    await client.createOrReplace(doc)
    console.info(REVIEW_DOCUMENT_TYPE, id, name)
    results.push({ id, name })
  }
  return results
}

function makeClient() {
  const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  if (!projectId) {
    throw new Error('Set SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_PROJECT_ID')
  }
  const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
  const token = process.env.SANITY_AUTH_TOKEN
  if (!token) {
    throw new Error('Set SANITY_AUTH_TOKEN (write token)')
  }
  const apiVersion = process.env.SANITY_API_VERSION || process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

  return createClient({ projectId, dataset, apiVersion, token, useCdn: false })
}

async function main() {
  const argv = process.argv.slice(2)
  const dryRun = argv.includes('--dry-run')
  const cmds = argv.filter((a) => a !== '--dry-run')
  const mode = cmds[0] || 'all'

  const client = makeClient()
  console.info('Sanity', client.config().projectId, '/', client.config().dataset, dryRun ? '(dry-run)' : '')

  const runBlog = mode === 'all' || mode === 'blog'
  const runPartners = mode === 'all' || mode === 'partners'
  const runReviews = mode === 'all' || mode === 'reviews'

  if (runBlog) {
    const blogPath = path.join(ROOT, 'scripts', 'data', 'blogPosts.json')
    if (!fs.existsSync(blogPath)) {
      console.warn(`Missing ${blogPath} — skip blog upload`)
    } else {
      const posts = readJson(blogPath)
      if (!Array.isArray(posts)) throw new Error('blogPosts.json must be a JSON array')
      await uploadBlogPosts(client, posts, { dryRun })
    }
  }

  if (runPartners) {
    await uploadPartnerLogos(client, 'public/partners', { dryRun })
  }

  if (runReviews) {
    const reviewsPath = path.join(ROOT, 'scripts', 'data', 'reviews.json')
    if (!fs.existsSync(reviewsPath)) {
      console.warn(`Missing ${reviewsPath} — skip reviews upload`)
    } else {
      const reviews = readJson(reviewsPath)
      if (!Array.isArray(reviews)) throw new Error('reviews.json must be a JSON array')
      await uploadReviews(client, reviews, { dryRun })
    }
  }

  console.info('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
