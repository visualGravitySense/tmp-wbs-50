/**
 * Applies restore via Sanity HTTP mutate API (no @sanity/client).
 * node scripts/apply-restore-koolitus-hero-fetch.mjs
 */
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })
dotenv.config()

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'buc8lir0'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'andres-prod'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'
const token =
  process.env.SANITY_API_WRITE_TOKEN ||
  process.env.SANITY_API_TOKEN ||
  process.env.SANITY_AUTH_TOKEN

if (!token) {
  console.error('Missing SANITY_API_TOKEN')
  process.exit(1)
}

const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
}

async function query(q) {
  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(q)}`
  const res = await fetch(url, { headers })
  const json = await res.json()
  if (!res.ok) throw new Error(JSON.stringify(json))
  return json.result
}

const hero = {
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
      { _key: 'qf1', icon: 'calendarDays', label: 'Kuidas õpid?', value: '9 neljapäeva 4 kuu jooksul', hint: 'Õpid neljapäeval, kavandad reedel ja juurutad enne järgmist kohtumist.' },
      { _key: 'qf2', icon: 'users', label: 'Kellega õpid?', value: 'Kuni 16 osalejat', hint: 'Võimaldab kogemuste jagamist, sisukaid arutelusid ja personaalset tuge.' },
      { _key: 'qf3', icon: 'clock', label: 'Mida lahendad?', value: 'Oma ettevõtte parendusprojekti', hint: 'Lahendad päris väljakutse oma ettevõttes ja rakendad õpitut kohe praktikas.' },
      { _key: 'qf4', icon: 'award', label: 'Mida omandad?', value: 'LEAN-juhtimise ja OPSTAR PROFIT™ raamistiku', hint: 'Õpid tundma nii LEAN juhtimist kui ka süsteemse juhtimise põhiaspekte' },
      { _key: 'qf5', icon: 'mapPin', label: 'Kus õppimine toimub?', value: 'Viljandi linnas', hint: 'Seminarid Viljandis, õppekäigud Eesti tootmisettevõtetesse.' },
      { _key: 'qf6', icon: 'calendarDays', label: 'Aga peale koolitust?', value: '3–12 kuud järelmentorlust', hint: 'Jätkad õpituga. Soovi korral personaalne tugi ka pärast programmi lõppu.' },
    ],
  },
}

const before = await query(
  `*[_id == "koolitusPage"][0]{"sc": count(sections), "hasHero": count(sections[_type == "marketingSplitHeroBlock"])}`,
)
console.log('Before:', before)

if (before.hasHero > 0) {
  console.log('Hero already present.')
  process.exit(0)
}

const doc = await query(`*[_id == "koolitusPage"][0]{ sections }`)
const sections = Array.isArray(doc?.sections) ? doc.sections : []

const mutateUrl = `https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}`
const body = {
  mutations: [
    {
      patch: {
        id: 'koolitusPage',
        set: { sections: [hero, ...sections] },
      },
    },
  ],
}

const res = await fetch(mutateUrl, {
  method: 'POST',
  headers,
  body: JSON.stringify(body),
})
const json = await res.json()
if (!res.ok) {
  console.error('Mutate failed:', json)
  process.exit(1)
}
console.log('Mutate OK:', json.transactionId)

const after = await query(
  `*[_id == "koolitusPage"][0]{"sc": count(sections), "hasHero": count(sections[_type == "marketingSplitHeroBlock"]), "first": sections[0]._type}`,
)
console.log('After:', after)