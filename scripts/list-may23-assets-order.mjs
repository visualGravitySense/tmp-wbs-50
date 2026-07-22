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

const assets = await client.fetch(
  `*[_type == "sanity.imageAsset" && _createdAt >= "2026-05-23T00:00:00Z" && _createdAt < "2026-05-24T00:00:00Z"] | order(_createdAt asc){
    _id, originalFilename, _createdAt, url
  }`,
)

for (const a of assets) {
  const refs = await client.fetch(
    `*[references($id)]{_type, "slug": slug.current, title}[0...8]`,
    { id: a._id },
  )
  console.log(a._createdAt, a.originalFilename, a._id)
  refs.forEach((r) => console.log('  ref:', r._type, r.slug || r.title))
}
