/**
 * Upgrade legacy Sanity blocks (homeChallengesBlock, painBlock, koolitusAudienceBlock)
 * to the new unified `painPointsBlock` schema.
 *
 * Usage:
 *   node scripts/migrate-pain-points.mjs --dry-run
 *   node scripts/migrate-pain-points.mjs
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

dotenv.config({ path: path.join(ROOT, '.env') })
dotenv.config({ path: path.join(ROOT, '.env.local'), override: true })

const dryRun = process.argv.includes('--dry-run')

function envStr(...keys) {
  for (const k of keys) {
    const v = process.env[k]
    if (v == null) continue
    const t = String(v).trim().replace(/^["']|["']$/g, '')
    if (t) return t
  }
  return ''
}

function getClient() {
  const projectId = envStr('NEXT_PUBLIC_SANITY_PROJECT_ID', 'SANITY_PROJECT_ID')
  const dataset = envStr('NEXT_PUBLIC_SANITY_DATASET', 'SANITY_DATASET') || 'production'
  const apiVersion = envStr('NEXT_PUBLIC_SANITY_API_VERSION', 'SANITY_API_VERSION') || '2024-01-01'
  const token = envStr('SANITY_AUTH_TOKEN', 'SANITY_API_TOKEN')

  if (!projectId) throw new Error('Missing Sanity project id in .env')
  if (!token) throw new Error('Missing SANITY_AUTH_TOKEN in .env / .env.local')

  return createClient({ projectId, dataset, apiVersion, token, useCdn: false })
}

const LEGACY_TYPES = ['homeChallengesBlock', 'painBlock', 'koolitusAudienceBlock']

async function main() {
  const client = getClient()

  // Find all documents that have at least one of these blocks in their `sections` array
  const docs = await client.fetch(
    `*[defined(sections) && count((sections[])[_type in $types]) > 0]{
      _id,
      _type,
      "title": coalesce(title, name, _id),
      sections
    }`,
    { types: LEGACY_TYPES }
  )

  if (!docs.length) {
    console.log('No documents found with legacy blocks. Nothing to migrate.')
    return
  }

  console.log(`${dryRun ? '[dry-run] ' : ''}Found ${docs.length} document(s) to migrate...`)

  for (const doc of docs) {
    console.log(`\n  → Document: ${doc.title} (${doc._id})`)
    
    let hasChanges = false
    const newSections = doc.sections.map((block) => {
      if (!LEGACY_TYPES.includes(block._type)) return block

      hasChanges = true
      console.log(`    - Found legacy block: ${block._type} (key: ${block._key})`)

      const newBlock = { ...block, _type: 'painPointsBlock' }

      if (block._type === 'homeChallengesBlock') {
        newBlock.variant = 'roles'
        if (block.challenges) {
          Object.assign(newBlock, block.challenges)
        }
        delete newBlock.challenges
      } 
      else if (block._type === 'painBlock') {
        newBlock.variant = 'grid'
        if (block.heading) {
          newBlock.title = block.heading
          delete newBlock.heading
        }
      } 
      else if (block._type === 'koolitusAudienceBlock') {
        newBlock.variant = 'audience'
        if (block.audienceSection) {
          Object.assign(newBlock, block.audienceSection)
        }
        delete newBlock.audienceSection
      }

      console.log(`      > Converted to painPointsBlock (variant: ${newBlock.variant})`)
      return newBlock
    })

    if (!hasChanges) continue

    if (!dryRun) {
      await client.patch(doc._id).set({ sections: newSections }).commit()
      console.log(`    ✓ Successfully patched document`)
    } else {
      console.log(`    [dry-run] Would patch document ${doc._id}`)
    }
  }

  console.log(`\n${dryRun ? 'Dry run complete.' : 'Migration complete.'}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
