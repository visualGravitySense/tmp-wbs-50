/**
 * Restores global `siteSettings.nineDaysProgram` from the pre-migration CLI dump.
 * Also ensures koolitusPage has a koolitusNineDaysProgramBlock and strips stale
 * embedded nineDaysProgram data from page-builder blocks (saves attributes).
 *
 * Usage:
 *   node scripts/restore-nine-days-program.mjs
 *   node scripts/restore-nine-days-program.mjs --apply
 */
import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })
dotenv.config()

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

/** Snapshot from koolitusPage.sections[].nineDaysProgram before strip-legacy (2026-07-06). */
const NINE_DAYS_PROGRAM = {
  backgroundColor: 'bg-gray-50',
  eyebrow: 'Baaskursuse programm',
  title: '9-päevane intensiivprogramm',
  subtitle: 'Muuda oma tootmist 9 päevaga LEAN süsteemi abil',
  habits: [
    {
      _key: '12f8ba2ac3cb',
      benefit: 'distsipliin',
      day: '1',
      description: 'algus',
      icon: '⭐',
      title: 'Habbit',
    },
    {
      _key: '644eb6e8d204',
      benefit: 'Turvalisus',
      day: 'Päev 2',
      description: 'Proovin',
      icon: 'k',
      title: 'Päev 2',
    },
  ],
  oppepaevad: [
    { _key: '3d2516e8bc7e', _type: 'reference', _ref: '5d0a67e6-0a0b-4adc-aa3f-ff58c401d706' },
    { _key: '85bac26fc328', _type: 'reference', _ref: '1d75df99-798c-4e3d-9edb-ac4d9f50e78f' },
    { _key: '7c30e7d0959c', _type: 'reference', _ref: '96f9740b-fed5-4afa-aad1-c8e25194c348' },
    { _key: 'd9e653859e8a', _type: 'reference', _ref: 'f59e2928-2b86-4aa4-b723-49020c10b8e1' },
    { _key: 'eff48f0a97fd', _type: 'reference', _ref: 'ccb2f4a4-6127-4cd7-82ca-32e155b260d3' },
    { _key: '3c08a045c075', _type: 'reference', _ref: '6dee8f25-8efd-45df-8775-3d242cc25d4f' },
    { _key: '23b73942b133', _type: 'reference', _ref: '49db9f21-47f6-4c2e-a71a-412fd9d41cd5' },
    { _key: '538b3b5b6898', _type: 'reference', _ref: '26248482-1a7b-4203-9a5e-c7e736577aa9' },
    { _key: '9b03f1296cfc', _type: 'reference', _ref: 'ca1b7336-3724-451c-b3a5-f3e823a84b38' },
  ],
  sidebarCtas: {
    readMoreText: 'Loe lähemalt',
    registerText: 'Registreeru programmi →',
    registerUrl: '/register',
  },
  completionSection: {
    title: 'Programmi lõpetamiseks',
    description: 'Vali sobivaim viis osalemiseks',
    nextCourseInfo: 'Järgmine kursus algab 15. oktoober',
    buttonText: 'Registreeru kursusele',
    selectedHabits: [
      {
        _key: 'afad6fc20fe3',
        description: 'harjumsus',
        icon: '⭐',
        title: 'Distsipliin',
      },
    ],
  },
  faqSection: {
    question: 'Kuidas töötab 9-päevane programm?',
  },
}

const PROGRAM_BLOCK = {
  _type: 'koolitusNineDaysProgramBlock',
  _key: 'restore-nine-days-program',
  contentSource: 'siteSettings.nineDaysProgram',
  isVisible: true,
  hideFromScrollNav: false,
  navLabel: 'Programm',
}

function stripEmbeddedNineDaysFromBlock(block) {
  if (!block || block._type !== 'koolitusNineDaysProgramBlock') return block
  const { nineDaysProgram: _removed, ...rest } = block
  return rest
}

async function main() {
  const [siteSettings, koolitusPage] = await Promise.all([
    client.fetch(`*[_id == "siteSettings"][0]{ _id, nineDaysProgram }`),
    client.fetch(`*[_id == "koolitusPage"][0]{ sections }`),
  ])

  if (!siteSettings) {
    console.error('siteSettings document not found')
    process.exit(1)
  }

  const hasGlobal =
    Boolean(siteSettings.nineDaysProgram?.title) ||
    (Array.isArray(siteSettings.nineDaysProgram?.oppepaevad) &&
      siteSettings.nineDaysProgram.oppepaevad.length > 0)

  const sections = Array.isArray(koolitusPage?.sections) ? [...koolitusPage.sections] : []
  const programBlockIndex = sections.findIndex((s) => s?._type === 'koolitusNineDaysProgramBlock')
  const hasProgramBlock = programBlockIndex >= 0

  const blocksWithStaleData = sections.filter(
    (s) => s?._type === 'koolitusNineDaysProgramBlock' && s.nineDaysProgram,
  ).length

  console.log('siteSettings.nineDaysProgram:', hasGlobal ? 'present' : 'missing/empty')
  console.log('koolitusPage sections:', sections.length)
  console.log('koolitusNineDaysProgramBlock:', hasProgramBlock ? 'yes' : 'no')
  console.log('blocks with stale embedded nineDaysProgram:', blocksWithStaleData)

  const patches = []

  if (!hasGlobal) {
    patches.push({
      id: 'siteSettings',
      action: 'set nineDaysProgram',
      fn: () => client.patch('siteSettings').set({ nineDaysProgram: NINE_DAYS_PROGRAM }),
    })
  }

  let nextSections = sections.map(stripEmbeddedNineDaysFromBlock)
  const needsBlockInsert = !hasProgramBlock
  const needsBlockCleanup = blocksWithStaleData > 0

  if (needsBlockInsert) {
    const featuresIndex = nextSections.findIndex((s) => s?._type === 'koolitusFeaturesBlock')
    const insertAt = featuresIndex >= 0 ? featuresIndex + 1 : nextSections.length
    nextSections = [
      ...nextSections.slice(0, insertAt),
      PROGRAM_BLOCK,
      ...nextSections.slice(insertAt),
    ]
    patches.push({
      id: 'koolitusPage',
      action: 'insert koolitusNineDaysProgramBlock',
      fn: () => client.patch('koolitusPage').set({ sections: nextSections }),
    })
  } else if (needsBlockCleanup) {
    patches.push({
      id: 'koolitusPage',
      action: 'strip stale nineDaysProgram from block(s)',
      fn: () => client.patch('koolitusPage').set({ sections: nextSections }),
    })
  }

  if (patches.length === 0) {
    console.log('\nNothing to restore — global data and page builder block look OK.')
    process.exit(0)
  }

  console.log('\nPlanned patches:')
  for (const p of patches) console.log(`  - ${p.id}: ${p.action}`)
  console.log('Mode:', apply ? 'APPLY' : 'dry-run')

  if (!apply) {
    console.log('\nPass --apply to write changes.')
    process.exit(0)
  }

  if (!token) {
    console.error('Set SANITY_API_TOKEN in .env.local')
    process.exit(1)
  }

  for (const p of patches) {
    const res = await p.fn().commit({ autoGenerateArrayKeys: true })
    console.log(`✓ ${p.id}: ${p.action} (${res._id})`)
  }

  const after = await client.fetch(`*[_id == "siteSettings"][0]{
    "hasProgram": defined(nineDaysProgram.title),
    "oppepaevCount": count(nineDaysProgram.oppepaevad)
  }`)
  console.log('After:', after)
  console.log('\nPublish siteSettings + koolitusPage in Studio.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})