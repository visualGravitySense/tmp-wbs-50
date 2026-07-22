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

const rows = await client.fetch(`*[_type == "blogPost"]{
  _id, title, "slug": slug.current, wpImportId,
  "hasCover": defined(coverImage.asset),
  coverImage
} | order(publishedAt desc)`)

const withCover = rows.filter((r) => r.hasCover)
const withoutCover = rows.filter((r) => !r.hasCover)
console.log(`Posts: ${rows.length}, with cover: ${withCover.length}, without: ${withoutCover.length}`)
console.log('\nWith cover:')
withCover.forEach((r) => console.log(`  ${r.slug}`))
console.log('\nWithout cover:')
withoutCover.forEach((r) => console.log(`  ${r.slug}${r.wpImportId ? ` (wp:${r.wpImportId})` : ''}`))
