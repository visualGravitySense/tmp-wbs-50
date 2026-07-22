/**
 * Restores marketingSplitHeroBlock at the top of koolitusPage.sections[]
 * after strip-legacy removed the duplicate legacy `hero` field.
 *
 * Usage:
 *   node scripts/restore-koolitus-hero.mjs
 *   node scripts/restore-koolitus-hero.mjs --apply
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

/** Snapshot from koolitusPage before strip-legacy (2026-07-06). */
const HERO_BLOCK = {
  _type: 'marketingSplitHeroBlock',
  _key: 'restore-koolitus-hero',
  eyebrow: 'OPSTAR PROFIT™ • PRAKTILINE KOOLITUS',
  headline: '9 päeva. Üks süsteem',
  scriptHeadline: 'Tootmisjuhtimise arenguprogramm',
  description:
    '9-päevane praktiline arenguprogramm, mis ühendab LEAN-i põhimõtted, süsteemse inimkeskse juhtimise ja sinu ettevõtte reaalse parendusprojekti. Kasva teadlikuks juhiks, tipptasemel spetsialistiks või tulemuslikuks meeskonnaliikmeks.',
  rightComponentType: 'quickFacts',
  isVisible: true,
  hideFromScrollNav: false,
  navLabel: 'Hero',
  primaryCta: {
    text: 'Registreeru',
    link: {
      _type: 'link',
      linkType: 'external',
      url: 'https://andres-kase-tootmisjuhtimine.vercel.app/koolitus#pricing',
    },
  },
  secondaryCta: {
    text: 'Loe tagasisidet',
    link: {
      _type: 'link',
      linkType: 'internal',
      reference: { _type: 'reference', _ref: 'testimonialsPage' },
    },
  },
  quickFactsCard: {
    durationPill: 'Faktid',
    eyebrow: 'Arenguprogrammi lühiülevaade',
    priceText: '12. grupp alustab | Sügis 2026',
    subsidyText: 'Registreerimine avatud',
    title: 'Praktiline korraldus ja programmi sisu:',
    rows: [
      {
        _key: 'qf1',
        icon: 'calendarDays',
        label: 'Kuidas õpid?',
        value: '9 neljapäeva 4 kuu jooksul',
        hint: 'Õpid neljapäeval, kavandad reedel ja juurutad enne järgmist kohtumist.',
      },
      {
        _key: 'qf2',
        icon: 'users',
        label: 'Kellega õpid?',
        value: 'Kuni 16 osalejat',
        hint: 'Võimaldab kogemuste jagamist, sisukaid arutelusid ja personaalset tuge.',
      },
      {
        _key: 'qf3',
        icon: 'clock',
        label: 'Mida lahendad?',
        value: 'Oma ettevõtte parendusprojekti',
        hint: 'Lahendad päris väljakutse oma ettevõttes ja rakendad õpitut kohe praktikas.',
      },
      {
        _key: 'qf4',
        icon: 'award',
        label: 'Mida omandad?',
        value: 'LEAN-juhtimise ja OPSTAR PROFIT™ raamistiku',
        hint: 'Õpid tundma nii LEAN juhtimist kui ka süsteemse juhtimise põhiaspekte',
      },
      {
        _key: 'qf5',
        icon: 'mapPin',
        label: 'Kus õppimine toimub?',
        value: 'Viljandi linnas',
        hint: 'Seminarid Viljandis, õppekäigud Eesti tootmisettevõtetesse.',
      },
      {
        _key: 'qf6',
        icon: 'calendarDays',
        label: 'Aga peale koolitust?',
        value: '3–12 kuud järelmentorlust',
        hint: 'Jätkad õpituga. Soovi korral personaalne tugi ka pärast programmi lõppu.',
      },
    ],
  },
}

const doc = await client.fetch(`*[_id == "koolitusPage"][0]{ sections }`)
if (!doc) {
  console.error('koolitusPage not found')
  process.exit(1)
}

const sections = Array.isArray(doc.sections) ? [...doc.sections] : []
const hasHero = sections.some((s) => s?._type === 'marketingSplitHeroBlock')

console.log(`Current sections: ${sections.length}`)
console.log(`Types: ${sections.map((s) => s._type).join(', ') || '(empty)'}`)
console.log(`Has marketingSplitHeroBlock: ${hasHero}`)

if (hasHero) {
  console.log('Hero block already present — nothing to restore.')
  process.exit(0)
}

const next = [HERO_BLOCK, ...sections]
console.log(`\nWould prepend marketingSplitHeroBlock → ${next.length} sections total`)
console.log('Mode:', apply ? 'APPLY' : 'dry-run')

if (!apply) {
  console.log('\nPass --apply to patch koolitusPage.sections')
  process.exit(0)
}

if (!token) {
  console.error('Set SANITY_API_TOKEN in .env')
  process.exit(1)
}

await client
  .patch('koolitusPage')
  .set({ sections: next })
  .commit({ autoGenerateArrayKeys: true })

console.log('✓ Hero restored. Publish in Studio and redeploy if needed.')