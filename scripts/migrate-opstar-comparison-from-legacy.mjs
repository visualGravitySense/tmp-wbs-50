/**
 * Re-link production comparison rows into opstarComparisonBlock sections.
 * Usage: node scripts/migrate-opstar-comparison-from-legacy.mjs
 *        node scripts/migrate-opstar-comparison-from-legacy.mjs --apply
 */
import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })
dotenv.config({ path: '.env' })

const apply = process.argv.includes('--apply')

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

const PRODUCTION = {
  title: 'Mis on OPSTAR PROFIT™?',
  subtitle: 'Lihtne seletus — ilma žargoonita. Mis see on ja mis see ei ole.',
  comparisonItems: [
    { isNot: 'Mitte tavaline LEAN raamatust kopeeritud', is: 'Eesti tootmise jaoks kohandatud meetodid' },
    { isNot: 'Mitte teooria mis jääb klassiruumi', is: '25 aasta välitestitud praktika 60+ ettevõttes' },
    { isNot: 'Mitte ühesuurune lahendus kõigile', is: 'Rakendatav esmaspäeval — kohe peale koolitust' },
    { isNot: 'Mitte veel üks sertifikaadiprogramm', is: '8-komponentne süsteem mis katab kõik juhtimistasemed' },
    { isNot: 'Mitte konsultatsioon kus teised teevad sinu eest', is: 'Sinu meeskonnaga koos ehitatud lahendus' },
  ],
  backgroundColor: 'bg-gray-50',
  titleColor: 'text-gray-900',
  isNotColor: 'text-red-600',
  isColor: 'text-green-600',
}

function withKeys(items) {
  return items.map((row, index) => ({
    _key: `cmp-${index}`,
    ...row,
  }))
}

const PLACEHOLDER_TITLE_RE = /^mis on opstar\??$/i

function isPlaceholderRow(row) {
  const isNot = row?.isNot?.trim() ?? ''
  const is = row?.is?.trim() ?? ''
  if (!isNot && !is) return true
  if (isNot && is && isNot === is) return true
  if (PLACEHOLDER_TITLE_RE.test(isNot) || PLACEHOLDER_TITLE_RE.test(is)) return true
  return false
}

function hasRows(comparison) {
  return comparison?.comparisonItems?.some((r) => !isPlaceholderRow(r)) ?? false
}

function pickSource(doc) {
  if (hasRows(doc.comparison)) {
    return {
      ...PRODUCTION,
      ...doc.comparison,
      comparisonItems: withKeys(doc.comparison.comparisonItems),
    }
  }

  for (const section of doc.sections ?? []) {
    if (section._type !== 'opstarComparisonBlock') continue
    if (hasRows(section.comparison)) {
      return {
        ...PRODUCTION,
        ...section.comparison,
        comparisonItems: withKeys(section.comparison.comparisonItems),
      }
    }
  }

  return { ...PRODUCTION, comparisonItems: withKeys(PRODUCTION.comparisonItems) }
}

function patchSections(sections, comparison) {
  const list = Array.isArray(sections) ? [...sections] : []
  let found = false

  const next = list.map((section) => {
    if (section._type !== 'opstarComparisonBlock') return section
    found = true
    return { ...section, comparison }
  })

  if (!found) {
    next.push({
      _type: 'opstarComparisonBlock',
      _key: 'migrated-opstar-comparison',
      comparison,
    })
  }

  return next
}

const doc = await client.fetch(`*[_type == "opstarProfit" && _id == "opstarProfit"][0]{
  comparison,
  sections
}`)

if (!doc) {
  console.error('opstarProfit not found')
  process.exit(1)
}

const comparison = pickSource(doc)
const sections = patchSections(doc.sections, comparison)

console.log('Comparison title:', comparison.title)
console.log('Rows:', comparison.comparisonItems.length)
console.log(
  'Sections:',
  sections.map((s) => s._type).join(', '),
)

if (!apply) {
  console.log('\nDry run. Pass --apply to patch opstarProfit.')
  process.exit(0)
}

if (!token) {
  console.error('Set SANITY_API_TOKEN in .env to apply.')
  process.exit(1)
}

await client
  .patch('opstarProfit')
  .set({ sections, comparison })
  .commit({ autoGenerateArrayKeys: true })

console.log('\nPatched opstarProfit — publish in Studio.')