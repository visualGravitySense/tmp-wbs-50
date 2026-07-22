/**
 * Remove duplicate legacy fields from page documents that already use page builder.
 * Fixes: "Total attribute/datatype count exceeds limit of 2000"
 *
 * Usage:
 *   node scripts/strip-legacy-page-fields.mjs                  # dry-run all page types
 *   node scripts/strip-legacy-page-fields.mjs --apply          # patch production
 *   node scripts/strip-legacy-page-fields.mjs koolitusPage     # one type, dry-run
 *   node scripts/strip-legacy-page-fields.mjs mainPage --apply
 */
import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import {
  PAGE_LEGACY_FIELDS,
  LEGACY_FIELD_REQUIRES_SECTION_BLOCK,
} from './lib/pageLegacyFields.mjs'

dotenv.config({ path: '.env.local' })
dotenv.config()

const args = process.argv.slice(2).filter((a) => !a.startsWith('--'))
const apply = process.argv.includes('--apply')
const force = process.argv.includes('--force')

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token =
  process.env.SANITY_API_WRITE_TOKEN ||
  process.env.SANITY_API_TOKEN ||
  process.env.SANITY_AUTH_TOKEN

if (!projectId || !dataset || !token) {
  console.error('Need NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and a write token in .env')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token,
  useCdn: false,
})

/** Recursively count attribute nodes (approximates Sanity API limit). */
function countAttributes(value) {
  if (value === null || value === undefined) return 0

  if (Array.isArray(value)) {
    let count = 1
    for (const item of value) count += countAttributes(item)
    return count
  }

  if (typeof value === 'object') {
    if (value._type === 'reference' || value._type === 'geopoint' || value._type === 'slug') {
      return 1
    }

    if (value._type === 'block') {
      let count = 1
      if (Array.isArray(value.children)) {
        for (const child of value.children) count += countAttributes(child)
      }
      if (Array.isArray(value.markDefs)) {
        for (const mark of value.markDefs) count += countAttributes(mark)
      }
      return count
    }

    if (value._type === 'span') {
      let count = 1
      if (Array.isArray(value.marks)) count += value.marks.length
      return count
    }

    let count = 1
    for (const [key, val] of Object.entries(value)) {
      if (key.startsWith('_') && key !== '_type' && key !== '_key') continue
      count += countAttributes(val)
    }
    return count
  }

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

function hasValue(value) {
  if (value == null) return false
  if (Array.isArray(value)) return value.length > 0
  if (typeof value === 'object') return Object.keys(value).length > 0
  return value !== ''
}

const typeFilter = args[0]
const types = typeFilter ? [typeFilter] : Object.keys(PAGE_LEGACY_FIELDS)

if (typeFilter && !PAGE_LEGACY_FIELDS[typeFilter]) {
  console.error(`Unknown type "${typeFilter}". Known: ${Object.keys(PAGE_LEGACY_FIELDS).join(', ')}`)
  process.exit(1)
}

console.log(`Dataset: ${dataset}`)
console.log(`Mode: ${apply ? 'APPLY' : 'dry-run'}\n`)

let patched = 0

for (const type of types) {
  const legacyFields = PAGE_LEGACY_FIELDS[type]
  const docs = await client.fetch(`*[_type == $type]{ _id, _updatedAt, sections }`, { type })

  if (!docs.length) {
    console.log(`${type}: no documents`)
    continue
  }

  for (const meta of docs) {
    const doc = await client.fetch(`*[_id == $id][0]`, { id: meta._id })
    const sectionCount = Array.isArray(doc.sections) ? doc.sections.length : 0
    const before = countDocument(doc)

    const sectionTypes = new Set(
      (Array.isArray(doc.sections) ? doc.sections : []).map((s) => s?._type).filter(Boolean),
    )
    const blockGuards = LEGACY_FIELD_REQUIRES_SECTION_BLOCK[type] ?? {}

    const fieldsToUnset = legacyFields.filter((field) => {
      if (!hasValue(doc[field])) return false
      const requiredBlock = blockGuards[field]
      if (requiredBlock && !sectionTypes.has(requiredBlock)) {
        return false
      }
      return true
    })

    const skippedGuards = legacyFields.filter((field) => {
      if (!hasValue(doc[field])) return false
      const requiredBlock = blockGuards[field]
      return requiredBlock && !sectionTypes.has(requiredBlock)
    })

    if (!fieldsToUnset.length) {
      console.log(`${doc._id}: no legacy fields to remove (${before.total} attrs, ${sectionCount} sections)`)
      continue
    }

    if (!force && sectionCount === 0) {
      console.warn(
        `${doc._id}: SKIP — sections[] is empty; legacy fields are still the live content (${before.total} attrs)`,
      )
      continue
    }

    const estimatedAfter =
      before.total - fieldsToUnset.reduce((sum, field) => sum + (before.byKey[field] || 0), 0)

    const status = before.total > 2000 ? 'OVER LIMIT' : 'ok'
    console.log(`\n${doc._id} (${type}) — ${before.total} attrs [${status}] → ~${estimatedAfter} after strip`)
    console.log(`  sections: ${sectionCount}`)
    if (skippedGuards.length) {
      console.log(`  kept (no builder block yet): ${skippedGuards.join(', ')}`)
    }
    console.log(`  unset (${fieldsToUnset.length}): ${fieldsToUnset.join(', ')}`)

    for (const field of fieldsToUnset.sort((a, b) => (before.byKey[b] || 0) - (before.byKey[a] || 0)).slice(0, 8)) {
      console.log(`    - ${field}: ${before.byKey[field] || 0} attrs`)
    }

    if (!apply) continue

    await client.patch(doc._id).unset(fieldsToUnset).commit({ autoGenerateArrayKeys: true })
    patched += 1
    console.log(`  ✓ patched`)
  }
}

if (!apply) {
  console.log('\nDry run complete. Re-run with --apply to remove legacy fields.')
} else {
  console.log(`\nPatched ${patched} document(s).`)
  console.log('Re-open Sanity Studio and publish — the 2000 attribute error should be gone.')
}