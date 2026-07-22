import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })
dotenv.config()

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-04-28',
  useCdn: false,
})

const doc = await client.fetch(`*[_id == "mainPage"][0]`)
if (!doc) {
  console.log('No mainPage document')
  process.exit(1)
}

console.log('project:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
console.log('dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET)
console.log('_id:', doc._id)
console.log('title:', doc.title)
console.log('headline:', doc.headline)
console.log('eyebrow:', doc.eyebrow)
console.log('sections:', doc.sections?.length ?? 0)
console.log('\nAll keys (' + Object.keys(doc).filter((k) => !k.startsWith('_')).length + '):')
console.log(Object.keys(doc).filter((k) => !k.startsWith('_')).sort().join(', '))
console.log('\nHas slug?', 'slug' in doc)
console.log('Has heroTitle?', 'heroTitle' in doc || 'hero' in doc)
