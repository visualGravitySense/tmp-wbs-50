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

const keys = [
  'hero',
  'audienceSection',
  'nineDaysProgram',
  'featuresSection',
  'buildingsSection',
  'leanHouseSection',
  'investmentSection',
  'leadFormTeaser',
  'cohortsSection',
  'certificateSection',
  'pricesSection',
  'featuredReviews',
  'testimonialsSection',
  'kkk',
  'kkkDocument',
  'ctaSection',
  'contactSection',
  'finalCTA',
]

const docs = await client.fetch(`*[_type == "koolitusPage"]{ _id, _updatedAt, sections }`)
console.log('Documents:', docs.map((d) => `${d._id} (sections: ${d.sections?.length ?? 0})`).join('\n'))

for (const id of ['drafts.koolitusPage', 'koolitusPage']) {
  const d = await client.fetch(`*[_id == $id][0]`, { id })
  if (!d) continue
  console.log(`\n--- ${id} ---`)
  for (const k of keys) {
    const v = d[k]
    let status = 'empty'
    if (v != null) {
      if (Array.isArray(v)) status = v.length ? `array(${v.length})` : 'empty array'
      else if (typeof v === 'object') status = Object.keys(v).length ? `object(${Object.keys(v).length} keys)` : 'empty object'
      else status = String(v)
    }
    console.log(`  ${k}: ${status}`)
  }
}

const doc = await client.fetch(`*[_type == "koolitusPage" && _id == "koolitusPage"][0]`)
  ?? await client.fetch(`*[_type == "koolitusPage"][0]`)

if (!doc) {
  console.error('No koolitusPage found')
  process.exit(1)
}

console.log('\nUsing _id:', doc._id)
for (const k of keys) {
  const v = doc[k]
  let status = 'empty'
  if (v != null) {
    if (Array.isArray(v)) status = v.length ? `array(${v.length})` : 'empty array'
    else if (typeof v === 'object') status = Object.keys(v).length ? `object(${Object.keys(v).length} keys)` : 'empty object'
    else status = String(v)
  }
  console.log(`  ${k}: ${status}`)
}
