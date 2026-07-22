import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })
dotenv.config()

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const doc = await client.fetch(`*[_type == "koolitusPage" && _id == "koolitusPage"][0]`)
if (!doc) {
  console.error('No koolitusPage found')
  process.exit(1)
}

console.log('Sections count:', doc.sections?.length)
if (doc.sections) {
  doc.sections.forEach((sec, idx) => {
    console.log(`\n[${idx}] Type: ${sec._type}`)
    console.log(JSON.stringify(sec, null, 2))
  })
}
