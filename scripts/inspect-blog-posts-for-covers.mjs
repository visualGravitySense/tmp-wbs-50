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
  _id, title, "slug": slug.current, publishedAt, wpImportId,
  coverImage{ asset->{_id, originalFilename, _createdAt} }
} | order(publishedAt desc)`)

for (const p of posts) {
  const cov = p.coverImage?.asset
  console.log(
    [
      p.publishedAt?.slice(0, 10) || '????',
      p.slug?.slice(0, 50),
      cov?._createdAt?.slice(0, 10) || 'no-cover',
      cov?.originalFilename || '',
    ].join(' | '),
  )
}
