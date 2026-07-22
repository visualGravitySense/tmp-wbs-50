/**
 * One-shot: patch andres-prod opstarProfit comparison block with production rows.
 * node scripts/patch-sanity-comparison.mjs
 */
import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })
dotenv.config({ path: '.env' })

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

const comparison = {
  ...PRODUCTION,
  comparisonItems: PRODUCTION.comparisonItems.map((row, i) => ({
    _key: `cmp-${i}`,
    ...row,
  })),
}

const doc = await client.fetch(`*[_type == "opstarProfit" && _id == "opstarProfit"][0]{ sections }`)
if (!doc) throw new Error('opstarProfit not found')

const sections = (doc.sections ?? []).map((section) =>
  section._type === 'opstarComparisonBlock'
    ? { ...section, comparison }
    : section,
)

await client.patch('opstarProfit').set({ sections, comparison }).commit({ autoGenerateArrayKeys: true })
console.log('Patched opstarProfit with', comparison.comparisonItems.length, 'rows')