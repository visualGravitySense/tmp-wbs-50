import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })
dotenv.config()

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-04-28',
  useCdn: true,
  token: process.env.SANITY_API_TOKEN,
})

const FILTER = '_type == "mainPage" && _id == "mainPage"'

const published = await client.fetch(`*[${FILTER}][0]{ _id, title, sections }`)
const cdn = await client.fetch(`*[${FILTER}][0]{ _id, title, "sectionCount": count(sections), sections[]{ _type, _key, headline, partnersTitle } }`, {}, { useCdn: true })
const api = await client.fetch(`*[${FILTER}][0]{ _id, title, "sectionCount": count(sections), sections[]{ _type, _key, headline, partnersTitle } }`, {}, { useCdn: false })

console.log('env:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, process.env.NEXT_PUBLIC_SANITY_DATASET)
console.log('\n--- API (useCdn: false) ---')
console.log(JSON.stringify(api, null, 2))
console.log('\n--- CDN (useCdn: true) ---')
console.log(JSON.stringify(cdn, null, 2))

const validTypes = new Set(['homeHeroBlock', 'homePartnersBlock', 'homeTestimonialsBlock'])
for (const label of ['api', 'cdn']) {
  const data = label === 'api' ? api : cdn
  const sections = data?.sections ?? []
  const valid = sections.filter((s) => validTypes.has(s._type))
  console.log(`\n${label}: ${sections.length} raw, ${valid.length} valid for PageSections`)
  sections.forEach((s) => {
    if (!validTypes.has(s._type)) console.log(`  ⚠ unknown _type: ${s._type}`)
  })
}
