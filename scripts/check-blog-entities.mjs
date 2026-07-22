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

const posts = await client.fetch(`*[_type == "blogPost" && defined(wpImportId)]{title, excerpt, "slug": slug.current}`)

for (const p of posts) {
  if (/&#\d+;|&[a-z]+;/i.test(p.title || '') || /&#\d+;|&[a-z]+;/i.test(p.excerpt || '')) {
    console.log(p.slug)
    console.log('  title:', p.title?.slice(0, 100))
    console.log('  excerpt:', p.excerpt?.slice(0, 120))
  }
}
