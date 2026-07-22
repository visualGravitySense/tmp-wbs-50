/**
 * Lists all mainPage documents in the dataset (diagnose duplicate Pealeht vs mainPage).
 *
 *   node scripts/list-main-pages.mjs
 */
import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })
dotenv.config()

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN

if (!projectId || !dataset) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET in .env.local')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-04-28',
  token,
  useCdn: false,
})

const docs = await client.fetch(
  `*[_type == "mainPage"]{ _id, title, headline, "hasSections": count(sections) > 0, _updatedAt } | order(_updatedAt desc)`,
)

console.log(`Dataset: ${dataset} (${projectId})`)
console.log(`Found ${docs.length} mainPage document(s):\n`)

for (const doc of docs) {
  const marker = doc._id === 'mainPage' ? ' ← singleton (Studio menu)' : ' ← duplicate?'
  console.log(`  ${doc._id}${marker}`)
  console.log(`    title: ${doc.title ?? '(no title)'}`)
  console.log(`    headline: ${doc.headline ?? '(no headline)'}`)
  console.log(`    sections: ${doc.hasSections ? 'yes' : 'no'}`)
  console.log(`    updated: ${doc._updatedAt}\n`)
}

if (!docs.some((d) => d._id === 'mainPage')) {
  console.log('⚠  No document with _id "mainPage". Studio → Main Page may show deleted/empty.')
  console.log('   Run: node scripts/consolidate-main-page.mjs --from <active-id>')
}
