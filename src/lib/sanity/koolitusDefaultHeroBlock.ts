import type { MarketingSplitHeroBlock } from '@/types/mainPageSections'

/** Default koolitus hero when CMS sections[] lost marketingSplitHeroBlock (post strip-legacy). */
export const KOOLITUS_DEFAULT_HERO_BLOCK: MarketingSplitHeroBlock = {
  _type: 'marketingSplitHeroBlock',
  _key: 'fallback-koolitus-hero',
  eyebrow: 'Product Name • PRAKTILINE KOOLITUS',
  headline: '9 päeva. Üks süsteem',
  scriptHeadline: 'Tootmisjuhtimise arenguprogramm',
  description:
    '9-päevane praktiline arenguprogramm, mis ühendab LEAN-i põhimõtted, süsteemse inimkeskse juhtimise ja sinu ettevõtte reaalse parendusprojekti. Kasva teadlikuks juhiks, tipptasemel spetsialistiks või tulemuslikuks meeskonnaliikmeks.',
  rightComponentType: 'quickFacts',
  primaryCta: {
    text: 'Registreeru',
    link: {
      _type: 'link',
      linkType: 'external',
      url: '/koolitus#pricing',
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
        value: 'LEAN-juhtimise ja Product Name raamistiku',
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

export function ensureKoolitusHeroSection<T extends { sections?: unknown }>(
  doc: T | null | undefined,
): T | null | undefined {
  if (!doc || !Array.isArray(doc.sections) || doc.sections.length === 0) {
    return doc
  }

  const hasHero = doc.sections.some(
    (s) =>
      s &&
      typeof s === 'object' &&
      ['marketingSplitHeroBlock', 'koolitusHeroBlock', 'aboutHeroBlock'].includes(
        (s as { _type?: string })._type ?? '',
      ),
  )

  if (hasHero) return doc

  return {
    ...doc,
    sections: [KOOLITUS_DEFAULT_HERO_BLOCK, ...doc.sections],
  }
}