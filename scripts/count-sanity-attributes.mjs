/**
 * Count Sanity document attribute/datatype nodes (same limit as API: 2000).
 * Usage: node scripts/count-sanity-attributes.mjs [docType]
 */
import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })
dotenv.config()

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token =
  process.env.SANITY_API_WRITE_TOKEN ||
  process.env.SANITY_API_TOKEN ||
  process.env.SANITY_AUTH_TOKEN

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token,
  useCdn: false,
})

const docTypeFilter = process.argv[2]

/** Recursively count attribute nodes in a Sanity document value. */
function countAttributes(value, depth = 0) {
  if (value === null || value === undefined) return 0

  if (Array.isArray(value)) {
    let count = 1 // array node
    for (const item of value) {
      count += countAttributes(item, depth + 1)
    }
    return count
  }

  if (typeof value === 'object') {
    // Image/file asset reference
    if (value._type === 'reference') return 1
    if (value._type === 'geopoint') return 1
    if (value._type === 'slug') return 1

    // Portable text block
    if (value._type === 'block') {
      let count = 1
      if (Array.isArray(value.children)) {
        for (const child of value.children) count += countAttributes(child, depth + 1)
      }
      if (Array.isArray(value.markDefs)) {
        for (const mark of value.markDefs) count += countAttributes(mark, depth + 1)
      }
      return count
    }

    // Portable text span
    if (value._type === 'span') {
      let count = 1
      if (Array.isArray(value.marks)) count += value.marks.length
      return count
    }

    let count = 1 // object node
    for (const [key, val] of Object.entries(value)) {
      if (key.startsWith('_') && key !== '_type' && key !== '_key') continue
      count += countAttributes(val, depth + 1)
    }
    return count
  }

  // Primitive leaf
  return 1
}

function countDocument(doc) {
  let total = 0
  const byKey = {}

  for (const [key, value] of Object.entries(doc)) {
    if (key.startsWith('_')) continue
    const c = countAttributes(value)
    byKey[key] = c
    total += c
  }

  return { total, byKey }
}

const types = docTypeFilter
  ? [docTypeFilter]
  : [
      'mainPage',
      'koolitusPage',
      'opstarProfit',
      'aboutPage',
      'kontaktPage',
      'siteSettings',
    ]

for (const type of types) {
  const docs = await client.fetch(`*[_type == $type]{ _id, _updatedAt, sections }`, { type })
  if (!docs.length) {
    console.log(`\n${type}: (no documents)`)
    continue
  }

  for (const meta of docs) {
    const doc = await client.fetch(`*[_id == $id][0]`, { id: meta._id })
    const { total, byKey } = countDocument(doc)
    const sections = doc.sections?.length ?? 0
    const status = total > 2000 ? '⚠️  OVER LIMIT' : 'ok'

    console.log(`\n${doc._id} (${type}) — ${total} attributes [${status}]`)
    console.log(`  sections: ${sections}`)
    console.log(`  updated: ${doc._updatedAt}`)

    const sorted = Object.entries(byKey).sort((a, b) => b[1] - a[1])
    for (const [key, count] of sorted.slice(0, 15)) {
      console.log(`    ${key}: ${count}`)
    }
    if (sorted.length > 15) console.log(`    … +${sorted.length - 15} more keys`)
  }
}