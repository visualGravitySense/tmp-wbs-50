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
  title, "slug": slug.current, _createdAt, wpImportId
} | order(_createdAt asc)`)

for (const p of posts) {
  console.log(p._createdAt?.slice(0, 10), p.slug, '|', p.title?.slice(0, 80))
}
