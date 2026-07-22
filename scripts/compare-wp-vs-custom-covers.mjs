/**
 * Compare WP featured image dimensions vs May/June custom Sanity assets
 * to help infer slug → custom asset mapping.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'
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

const customAssets = await client.fetch(
  `*[_type == "sanity.imageAsset" && _createdAt < "2026-06-11T00:00:00Z" && _createdAt > "2026-05-20T00:00:00Z"]{
    _id, originalFilename, metadata{dimensions}
  }`,
)

const posts = await client.fetch(
  `*[_type == "blogPost" && defined(slug.current) && defined(wpImportId)]{"slug": slug.current, title}`,
)

for (const post of posts) {
  const url = `${WP_API}?slug=${encodeURIComponent(post.slug)}&_embed=1`
  const res = await fetch(url)
  const rows = await res.json()
  const wp = rows[0]
  const media = wp?._embedded?.['wp:featuredmedia']?.[0]
  const wpW = media?.media_details?.width
  const wpH = media?.media_details?.height
  const wpName = media?.source_url?.split('/').pop()

  const sanityCurrent = await client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0].coverImage.asset->{originalFilename, metadata{dimensions}}`,
    { slug: post.slug },
  )

  console.log(`\n${post.slug}`)
  console.log(`  title: ${post.title?.slice(0, 60)}`)
  console.log(`  WP: ${wpName} ${wpW}x${wpH}`)
  console.log(
    `  current: ${sanityCurrent?.originalFilename} ${sanityCurrent?.metadata?.dimensions?.width}x${sanityCurrent?.metadata?.dimensions?.height}`,
  )
}

console.log('\n--- Custom assets pool ---')
for (const a of customAssets) {
  const d = a.metadata?.dimensions
  console.log(`${a.originalFilename} ${d?.width}x${d?.height} ${a._id}`)
}
