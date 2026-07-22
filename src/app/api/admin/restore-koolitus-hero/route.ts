import { createClient } from '@sanity/client'
import { NextRequest, NextResponse } from 'next/server'

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
} as const

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  const expected = process.env.SANITY_REVALIDATE_SECRET

  if (!expected || secret !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  const token =
    process.env.SANITY_API_WRITE_TOKEN ||
    process.env.SANITY_API_TOKEN ||
    process.env.SANITY_AUTH_TOKEN

  if (!projectId || !dataset || !token) {
    return NextResponse.json({ error: 'Missing Sanity credentials' }, { status: 500 })
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
    token,
    useCdn: false,
  })

  const before = await client.fetch<{ sc: number; hasHero: number }>(
    `*[_id == "koolitusPage"][0]{
      "sc": count(sections),
      "hasHero": count(sections[_type == "marketingSplitHeroBlock"])
    }`,
  )

  if (!before) {
    return NextResponse.json({ error: 'koolitusPage not found' }, { status: 404 })
  }

  if (before.hasHero > 0) {
    return NextResponse.json({
      ok: true,
      message: 'Hero already present',
      before,
      after: before,
    })
  }

  const doc = await client.fetch<{ sections?: unknown[] }>(
    `*[_id == "koolitusPage"][0]{ sections }`,
  )
  const sections = Array.isArray(doc?.sections) ? [...doc.sections] : []

  await client
    .patch('koolitusPage')
    .set({ sections: [HERO_BLOCK, ...sections] })
    .commit({ autoGenerateArrayKeys: true })

  const after = await client.fetch<{ sc: number; hasHero: number }>(
    `*[_id == "koolitusPage"][0]{
      "sc": count(sections),
      "hasHero": count(sections[_type == "marketingSplitHeroBlock"])
    }`,
  )

  return NextResponse.json({
    ok: true,
    message: 'Hero restored — publish koolitusPage in Studio',
    before,
    after,
  })
}