/**
 * Re-inject aboutWorldVisitsBlock into marketing pages from aboutPage production content.
 * Usage: node scripts/restore-world-visits-blocks.mjs
 *        node scripts/restore-world-visits-blocks.mjs --apply
 */
import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })
dotenv.config()

const apply = process.argv.includes('--apply')
const TARGETS = ['mainPage', 'koolitusPage', 'opstarProfit']

const token =
  process.env.SANITY_API_WRITE_TOKEN ||
  process.env.SANITY_API_TOKEN ||
  process.env.SANITY_AUTH_TOKEN

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'buc8lir0',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'andres-prod',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token,
  useCdn: false,
})

function cloneVisitsBlock(source) {
  if (!source?.worldManufacturingVisits) return null
  return {
    _type: 'aboutWorldVisitsBlock',
    _key: `restored-world-visits-${Date.now()}`,
    isVisible: true,
    hideFromScrollNav: false,
    navLabel: 'Tehaste külastused',
    worldManufacturingVisits: source.worldManufacturingVisits,
  }
}

const sourceDoc = await client.fetch(
  `*[_id == "aboutPage"][0]{
    "block": sections[_type == "aboutWorldVisitsBlock"][0]
  }`,
)

const template = cloneVisitsBlock(sourceDoc?.block)
if (!template) {
  console.error('No aboutWorldVisitsBlock found on aboutPage')
  process.exit(1)
}

console.log('Source title:', template.worldManufacturingVisits.title)
console.log(
  'Companies:',
  template.worldManufacturingVisits.manufacturingCompanies?.length ?? 0,
)

for (const id of TARGETS) {
  const doc = await client.fetch(`*[_id == $id][0]{ sections }`, { id })
  const sections = Array.isArray(doc?.sections) ? [...doc.sections] : []
  const hasBlock = sections.some((s) => s?._type === 'aboutWorldVisitsBlock')

  console.log(`\n${id}: sections=${sections.length}, hasBlock=${hasBlock}`)

  if (hasBlock) {
    console.log('  skip — block already present')
    continue
  }

  const next = [...sections, { ...template, _key: `restored-world-visits-${id}` }]

  if (!apply) {
    console.log('  dry-run — would append aboutWorldVisitsBlock')
    continue
  }

  if (!token) {
    console.error('Set SANITY_API_TOKEN to apply.')
    process.exit(1)
  }

  await client.patch(id).set({ sections: next }).commit({ autoGenerateArrayKeys: true })
  console.log('  patched')
}

if (!apply) {
  console.log('\nDry run. Pass --apply to patch documents.')
}