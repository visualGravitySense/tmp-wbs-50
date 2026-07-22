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

const slugs = await client.fetch(
  `*[_type == "blogPost" && defined(slug.current)].slug.current`,
)

const assets = await client.fetch(
  `*[_type == "sanity.imageAsset" && _createdAt < "2026-06-11T00:00:00Z" && _createdAt > "2026-05-01T00:00:00Z"]{
    _id, originalFilename, _createdAt, url
  } | order(_createdAt asc)`,
)

for (const slug of slugs) {
  const matches = assets.filter((a) => {
    const base = (a.originalFilename || '').replace(/\.[^.]+$/, '')
    return base === slug
  })
  if (matches.length) {
    console.log(slug)
    matches.forEach((m) => console.log(' ', m._createdAt, m._id, m.originalFilename))
  }
}

console.log('\n--- May 23 custom named ---')
for (const a of assets.filter((x) => x._createdAt?.startsWith('2026-05-23'))) {
  console.log(a.originalFilename, a._id)
}
