/**
 * Copies the active mainPage duplicate into the singleton `_id: mainPage`.
 *
 * Usage:
 *   node scripts/list-main-pages.mjs
 *   node scripts/consolidate-main-page.mjs --dry-run
 *   node scripts/consolidate-main-page.mjs
 *   node scripts/consolidate-main-page.mjs --delete-duplicate
 *
 * Requires SANITY_API_TOKEN (write) in .env.local
 */
import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })
dotenv.config()

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const deleteDuplicate = args.includes('--delete-duplicate')
const fromArg = args.find((a) => a.startsWith('--from='))?.slice('--from='.length)

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN

if (!projectId || !dataset || !token) {
  console.error('Need NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN in .env.local')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-04-28',
  token,
  useCdn: false,
})

const TARGET_ID = 'mainPage'

const docs = await client.fetch(
  `*[_type == "mainPage"]{ _id, title, headline, _updatedAt } | order(_updatedAt desc)`,
)

if (docs.length === 0) {
  console.error('No mainPage documents found.')
  process.exit(1)
}

let sourceId = fromArg
if (!sourceId) {
  const duplicate = docs.find((d) => d._id !== TARGET_ID)
  sourceId = duplicate?._id
}

if (!sourceId) {
  console.log('Only one mainPage exists and it is not a separate duplicate id.')
  console.log('If singleton is deleted in Studio, restore it there first, or pass --from=<documentId>')
  process.exit(0)
}

if (sourceId === TARGET_ID) {
  console.error('Source and target are the same id.')
  process.exit(1)
}

console.log(`Source (copy from): ${sourceId}`)
console.log(`Target (singleton):  ${TARGET_ID}`)
console.log(`Dataset: ${dataset}\n`)

const source = await client.fetch(`*[_type == "mainPage" && _id == $id][0]`, { id: sourceId })

if (!source) {
  console.error(`Could not load source document ${sourceId}`)
  process.exit(1)
}

const {
  _id: _omitId,
  _rev: _omitRev,
  _createdAt: _omitCreated,
  _updatedAt: _omitUpdated,
  ...content
} = source

const payload = {
  _id: TARGET_ID,
  _type: 'mainPage',
  ...content,
}

if (dryRun) {
  console.log('Dry run — would createOrReplace singleton with fields from source:')
  console.log(`  title: ${payload.title}`)
  console.log(`  headline: ${payload.headline}`)
  console.log(`  sections: ${Array.isArray(payload.sections) ? payload.sections.length : 0} block(s)`)
  if (deleteDuplicate) console.log(`  then delete: ${sourceId}`)
  process.exit(0)
}

const result = await client.createOrReplace(payload)
console.log(`✓ Singleton written: ${result._id}`)

if (deleteDuplicate) {
  await client.delete(sourceId)
  console.log(`✓ Deleted duplicate: ${sourceId}`)
} else {
  console.log(`\nDuplicate still exists (${sourceId}). Remove it in Studio after verifying /`)
  console.log('Or re-run with --delete-duplicate')
}

console.log('\nNext: open http://localhost:3000/studio → Content → Main Page')
console.log('Add blocks under "Page sections (builder)" and Publish.')
