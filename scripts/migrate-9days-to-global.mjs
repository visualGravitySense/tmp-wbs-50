/**
 * Migrates legacy embedded 9-day program content to a global Sanity document
 * and wires koolitusPage.sections[] via a reference block.
 *
 * Schema types (deploy Studio schema before running --apply):
 *   - Global document:  nineDaysProgram  (_id: nineDaysProgram)
 *   - Page builder block: koolitusNineDaysProgramBlock
 *   - Block reference field: nineDaysProgramDocument → nineDaysProgram
 *
 * Usage:
 *   node scripts/migrate-9days-to-global.mjs            # dry-run
 *   node scripts/migrate-9days-to-global.mjs --apply    # write to dataset
 *
 * Env (.env.local or .env):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET=andres-prod
 *   SANITY_API_TOKEN (or SANITY_API_WRITE_TOKEN)
 */
import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })
dotenv.config()

const apply = process.argv.includes('--apply')
const force = process.argv.includes('--force')

const GLOBAL_DOC_ID = 'nineDaysProgram'
const GLOBAL_DOC_TYPE = 'nineDaysProgram'
const BLOCK_TYPE = 'koolitusNineDaysProgramBlock'
const REF_FIELD = 'nineDaysProgramDocument'
const KOOLITUS_PAGE_ID = 'koolitusPage'

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

/** Full content extracted from koolitusPage before strip-legacy (CLI dump 2026-07-06). */
const PROGRAM_CONTENT = {
  label: '9 päeva programm',
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

const PROGRAM_REFERENCE = {
  _type: 'reference',
  _ref: GLOBAL_DOC_ID,
  _weak: true,
}

function stripProgramBlock(block) {
  if (!block || block._type !== BLOCK_TYPE) return block
  const {
    nineDaysProgram: _legacyEmbedded,
    contentSource: _contentSource,
    usesGlobalNineDaysProgram: _flag,
    ...rest
  } = block
  return {
    ...rest,
    [REF_FIELD]: PROGRAM_REFERENCE,
  }
}

function buildProgramBlock(existing) {
  if (existing?._type === BLOCK_TYPE) {
    return stripProgramBlock(existing)
  }
  return {
    _type: BLOCK_TYPE,
    _key: 'migrate-9days-global',
    isVisible: true,
    hideFromScrollNav: false,
    navLabel: 'Programm',
    [REF_FIELD]: PROGRAM_REFERENCE,
  }
}

async function main() {
  console.log('Sanity migrate-9days-to-global')
  console.log('  project:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'buc8lir0')
  console.log('  dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET || 'andres-prod')
  console.log('  global _type:', GLOBAL_DOC_TYPE)
  console.log('  global _id:  ', GLOBAL_DOC_ID)
  console.log('  block _type: ', BLOCK_TYPE)
  console.log('  ref field:   ', REF_FIELD)
  console.log('')

  const [globalDoc, koolitusPage, siteSettings] = await Promise.all([
    client.fetch(`*[_id == $id][0]{ _id, _type, title, "oppepaevCount": count(oppepaevad) }`, {
      id: GLOBAL_DOC_ID,
    }),
    client.fetch(`*[_id == $id][0]{ sections }`, { id: KOOLITUS_PAGE_ID }),
    client.fetch(`*[_id == "siteSettings"][0]{ "hasMirror": defined(nineDaysProgram.title) }`),
  ])

  const sections = Array.isArray(koolitusPage?.sections) ? [...koolitusPage.sections] : []
  const blockIndex = sections.findIndex((s) => s?._type === BLOCK_TYPE)
  const hasBlock = blockIndex >= 0
  const staleEmbedded = sections.filter((s) => s?._type === BLOCK_TYPE && s.nineDaysProgram).length
  const hasRef = sections.some(
    (s) => s?._type === BLOCK_TYPE && s[REF_FIELD]?._ref === GLOBAL_DOC_ID,
  )

  console.log('Before:')
  console.log('  global document exists:', Boolean(globalDoc))
  console.log('  global document title: ', globalDoc?.title ?? '(none)')
  console.log('  siteSettings mirror:   ', siteSettings?.hasMirror ? 'yes' : 'no')
  console.log('  koolitus sections:     ', sections.length)
  console.log('  program block present: ', hasBlock ? 'yes' : 'no')
  console.log('  block has _ref:        ', hasRef ? 'yes' : 'no')
  console.log('  stale embedded blocks: ', staleEmbedded)

  const needsGlobalDoc = !globalDoc?.title || force
  let nextSections = [...sections]

  if (hasBlock) {
    nextSections[blockIndex] = buildProgramBlock(sections[blockIndex])
  } else {
    const featuresIndex = nextSections.findIndex((s) => s?._type === 'koolitusFeaturesBlock')
    const insertAt = featuresIndex >= 0 ? featuresIndex + 1 : nextSections.length
    nextSections = [
      ...nextSections.slice(0, insertAt),
      buildProgramBlock(null),
      ...nextSections.slice(insertAt),
    ]
  }

  const sectionsChanged =
    JSON.stringify(nextSections) !== JSON.stringify(sections) || !hasBlock || staleEmbedded > 0

  const actions = []
  if (needsGlobalDoc) {
    actions.push(`createOrReplace ${GLOBAL_DOC_TYPE} (${GLOBAL_DOC_ID})`)
  }
  if (sectionsChanged || !hasRef) {
    actions.push(`patch ${KOOLITUS_PAGE_ID}.sections[] → ${REF_FIELD}._ref = ${GLOBAL_DOC_ID}`)
  }
  actions.push(`mirror content to siteSettings.nineDaysProgram`)

  if (actions.length === 0) {
    console.log('\nNothing to do — migration already applied.')
    return
  }

  console.log('\nPlanned actions:')
  for (const action of actions) console.log(`  • ${action}`)
  console.log('\nMode:', apply ? 'APPLY' : 'dry-run (pass --apply to write)')

  if (!apply) return

  if (!token) {
    console.error('\nMissing write token. Set SANITY_API_TOKEN in .env.local')
    process.exit(1)
  }

  if (needsGlobalDoc) {
    const res = await client.createOrReplace({
      _id: GLOBAL_DOC_ID,
      _type: GLOBAL_DOC_TYPE,
      ...PROGRAM_CONTENT,
    })
    console.log(`✓ Global document: ${res._id}`)
  }

  if (sectionsChanged || !hasRef) {
    const res = await client
      .patch(KOOLITUS_PAGE_ID)
      .set({ sections: nextSections })
      .commit({ autoGenerateArrayKeys: true })
    console.log(`✓ koolitusPage sections patched: ${res._id}`)
  }

  const mirrorPayload = { ...PROGRAM_CONTENT }
  delete mirrorPayload.label
  await client.patch('siteSettings').set({ nineDaysProgram: mirrorPayload }).commit()
  console.log('✓ siteSettings.nineDaysProgram mirrored')

  const after = await client.fetch(
    `{
      "global": *[_id == $id][0]{ _id, _type, title, "oppepaevCount": count(oppepaevad) },
      "block": *[_id == $pageId][0].sections[_type == $blockType][0]{
        _key,
        _type,
        "ref": nineDaysProgramDocument._ref,
        "hasStaleEmbed": defined(nineDaysProgram)
      }
    }`,
    { id: GLOBAL_DOC_ID, pageId: KOOLITUS_PAGE_ID, blockType: BLOCK_TYPE },
  )

  console.log('\nAfter:', JSON.stringify(after, null, 2))
  console.log('\nPublish nineDaysProgram + koolitusPage + siteSettings in Studio.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})