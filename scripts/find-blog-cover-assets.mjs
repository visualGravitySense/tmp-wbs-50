import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
dotenv.config({ path: path.join(ROOT, '.env') })
dotenv.config({ path: path.join(ROOT, '.env.local'), override: true })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
})

const posts = await client.fetch(`*[_type == "blogPost" && defined(slug.current)]{
  _id, title, "slug": slug.current,
  coverImage{ asset->{_id, url, originalFilename, _createdAt} }
} | order(publishedAt desc)`)

console.log('=== Current covers ===')
for (const p of posts) {
  const url = p.coverImage?.asset?.url
  console.log(p.slug, url ? url.slice(-60) : 'NO COVER', p.coverImage?.asset?.originalFilename || '')
}

const assets = await client.fetch(
  `*[_type == "sanity.imageAsset"] | order(_createdAt desc)[0...80]{
    _id, url, originalFilename, _createdAt, size
  }`,
)

console.log('\n=== Recent image assets (last 80) ===')
for (const a of assets) {
  console.log(a._createdAt?.slice(0, 10), a.originalFilename || '(no name)', a.url?.slice(-70))
}
