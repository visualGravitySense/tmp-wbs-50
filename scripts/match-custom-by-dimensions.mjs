/**
 * Match WP-imported posts (June 11 covers) to pre-June-11 custom assets by
 * excluding WP-dimension matches — custom covers have different sizes.
 */
import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@sanity/client'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
dotenv.config({ path: path.join(ROOT, '.env') })
dotenv.config({ path: path.join(ROOT, '.env.local'), override: true })

const WP_API = 'https://tootmisjuhtimine.ee/wp-json/wp/v2/posts'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
})

const BLOG_CUSTOM_ASSETS = await client.fetch(
  `*[_type == "sanity.imageAsset" && _createdAt < "2026-06-11T00:00:00Z" && (
    originalFilename match "fokus*" ||
    originalFilename match "lean-juhtimine*" ||
    originalFilename match "Juhi-vastutus*" ||
    originalFilename match "10-year*" ||
    originalFilename match "aicberg*" ||
    originalFilename match "Gemini_Generated_Image_tzg7yrtzg7yrtzg7*" ||
    originalFilename match "5f2b622a*" ||
    originalFilename match "11aab82c*" ||
    originalFilename match "fookus-sisul*"
  )]{
    _id, originalFilename, metadata{dimensions}, _createdAt
  }`,
)

const posts = await client.fetch(
  `*[_type == "blogPost" && defined(slug.current) && defined(wpImportId)]{
    "slug": slug.current, title,
    coverImage{ asset->{_id, originalFilename, metadata{dimensions}, _createdAt} }
  }`,
)

const used = new Set()

for (const post of posts) {
  const url = `${WP_API}?slug=${encodeURIComponent(post.slug)}&_embed=1`
  const res = await fetch(url)
  const wp = (await res.json())[0]
  const media = wp?._embedded?.['wp:featuredmedia']?.[0]
  const wpW = media?.media_details?.width
  const wpH = media?.media_details?.height

  const cur = post.coverImage?.asset
  const curW = cur?.metadata?.dimensions?.width
  const curH = cur?.metadata?.dimensions?.height
  const isWpClone =
    cur?._createdAt?.startsWith('2026-06-11') && wpW && wpH && curW === wpW && curH === wpH

  const slugHint = post.slug.replace(/-/g, ' ').slice(0, 20)

  const candidates = BLOG_CUSTOM_ASSETS.filter((a) => {
    if (used.has(a._id)) return false
    const name = (a.originalFilename || '').toLowerCase()
    const slug = post.slug.toLowerCase()
    if (name.replace(/\.[^.]+$/, '') === slug) return true
    if (slug.includes('juhi-vastutus') && name.includes('juhi-vastutus')) return true
    if (slug.includes('10') && name.includes('10-year')) return true
    if (slug.includes('fookus') && name.includes('fokus')) return true
    if (slug.includes('lean') && name.includes('lean-juhtimine')) return true
    if (slug.includes('stop-saad') && name.includes('aicberg')) return true
    if (slug.includes('toojou') && a.originalFilename?.match(/^[0-9a-f-]{36}/)) return true
    return false
  })

  console.log(`\n${post.slug} wpClone=${isWpClone}`)
  console.log(`  ${cur?.originalFilename} ${curW}x${curH}`)
  candidates.forEach((c) => {
    const d = c.metadata?.dimensions
    console.log(`  → ${c.originalFilename} ${d?.width}x${d?.height} ${c._id}`)
  })
}
