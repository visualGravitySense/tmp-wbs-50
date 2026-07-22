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

const posts = await client.fetch(`*[_type == "blogPost" && defined(slug.current)]{"slug": slug.current}`)
const slugs = posts.map((p) => p.slug)

const assets = await client.fetch(
  `*[_type == "sanity.imageAsset" && _createdAt < "2026-06-11T00:00:00Z"] | order(_createdAt desc){
    _id, originalFilename, url, _createdAt
  }`,
)

for (const slug of slugs) {
  const exact = assets.filter((a) => a.originalFilename?.replace(/\.[^.]+$/, '') === slug)
  const partial = assets.filter((a) => {
    const name = (a.originalFilename || '').toLowerCase()
    const s = slug.toLowerCase()
    return name.includes(s.slice(0, 12)) || s.includes(name.replace(/\.[^.]+$/, '').slice(0, 12))
  })
  if (exact.length || partial.length) {
    console.log('\n', slug)
    exact.forEach((a) => console.log('  EXACT', a._createdAt?.slice(0, 10), a.originalFilename, a._id))
    partial
      .filter((a) => !exact.includes(a))
      .slice(0, 3)
      .forEach((a) => console.log('  maybe', a._createdAt?.slice(0, 10), a.originalFilename, a._id))
  }
}
