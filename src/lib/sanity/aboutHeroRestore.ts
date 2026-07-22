import { buildSanityLink, normalizeSanityLink } from '@/lib/sanity/internalLinkRefs'

/** Shared restore logic for aboutPage marketingSplitHeroBlock (Studio + API + scripts). */

type HeroLike = {
  eyebrow?: string
  headline?: string
  subtitle?: string
  scriptHeadline?: string
  description?: string
  image?: unknown
  heroImage?: unknown
  linkedinUrl?: string
  floatingBadges?: unknown[]
  badges?: unknown[]
  technologyBadges?: unknown[]
  primaryButton?: { text?: string; link?: string }
  secondaryButton?: { text?: string; link?: string }
}

type CtaField = { text?: string; link?: unknown }

type Section = {
  _type?: string
  _key?: string
  hero?: HeroLike
  primaryCta?: CtaField
  secondaryCta?: CtaField
} & HeroLike

export function heroToMarketingSplitBlock(hero: HeroLike | null | undefined, key: string) {
  if (!hero || typeof hero !== 'object') return null
  return {
    _type: 'marketingSplitHeroBlock' as const,
    _key: key,
    eyebrow: hero.eyebrow,
    headline: hero.headline ?? '',
    scriptHeadline: hero.subtitle ?? hero.scriptHeadline,
    description: hero.description,
    rightComponentType: 'aboutAndres' as const,
    heroImage: hero.image ?? hero.heroImage,
    linkedinUrl: hero.linkedinUrl,
    floatingBadges: hero.floatingBadges,
    badges: hero.badges ?? hero.technologyBadges,
    primaryCta: buttonToCta(hero.primaryButton),
    secondaryCta: buttonToCta(hero.secondaryButton),
    isVisible: true,
    hideFromScrollNav: false,
    navLabel: 'Hero',
  }
}

function buttonToCta(button?: { text?: string; link?: string }) {
  if (!button || typeof button !== 'object') return undefined
  const url = String(button.link ?? '').trim()
  if (!button.text?.trim() && !url) return undefined
  const link = buildSanityLink(url)
  if (!link) return { text: button.text }
  return { text: button.text, link }
}

export function aboutHeroBlockToMarketingSplit(block: Section | null | undefined) {
  if (!block || block._type !== 'aboutHeroBlock') return null
  const key = block._key ?? 'converted-about-hero'
  return heroToMarketingSplitBlock(block.hero ?? block, key)
}

export const DEFAULT_ABOUT_MARKETING_SPLIT_HERO = {
  _type: 'marketingSplitHeroBlock' as const,
  _key: 'restore-about-hero',
  rightComponentType: 'aboutAndres' as const,
  headline: 'ANDRES KASE',
  scriptHeadline: 'Lean-Agile ekspert',
  description:
    '25 aastat tootmispõrandal — õpetan seda, mida olen ise teinud, mitte seda, mida raamatutest lugesin.',
  linkedinUrl: 'https://www.linkedin.com/',
  floatingBadges: [
    {
      _key: 'fb1',
      label: 'VISIIDID',
      text: '100+ tehast külastatud',
      icon: 'factory',
      positionX: 80,
      positionY: 10,
    },
    {
      _key: 'fb2',
      label: 'HINNANG',
      text: '4.9 / 5 koolituse hinnang',
      icon: 'star',
      positionX: 20,
      positionY: 65,
    },
  ],
  primaryCta: {
    text: 'Kontakt',
    link: buildSanityLink('/kontakt')!,
  },
  secondaryCta: {
    text: 'Koolitused',
    link: buildSanityLink('/koolitus')!,
  },
  isVisible: true,
  hideFromScrollNav: false,
  navLabel: 'Hero',
}

function normalizeHeroCtaLinks(block: Section): { block: Section; changed: boolean } {
  if (block._type !== 'marketingSplitHeroBlock') return { block, changed: false }
  let changed = false
  const next: Section = { ...block }

  for (const key of ['primaryCta', 'secondaryCta'] as const) {
    const cta = next[key]
    if (!cta?.link) continue
    const normalized = normalizeSanityLink(cta.link)
    if (normalized !== cta.link) {
      next[key] = { ...cta, link: normalized }
      changed = true
    }
  }

  return { block: next, changed }
}

export function ensureAboutPageHeroSections(
  sections: unknown[] | null | undefined,
  legacyHero: unknown,
) {
  const list = Array.isArray(sections) ? [...(sections as Section[])] : []

  const splitIndex = list.findIndex((s) => s?._type === 'marketingSplitHeroBlock')
  if (splitIndex >= 0) {
    const { block, changed } = normalizeHeroCtaLinks(list[splitIndex])
    if (changed) {
      const next = [...list]
      next[splitIndex] = block
      return { changed: true, sections: next, reason: 'normalized hero CTA internal links' }
    }
    return { changed: false, sections: list, reason: 'marketingSplitHeroBlock already present' }
  }

  const aboutHeroIndex = list.findIndex((s) => s?._type === 'aboutHeroBlock')
  if (aboutHeroIndex >= 0) {
    const converted = aboutHeroBlockToMarketingSplit(list[aboutHeroIndex])
    if (converted) {
      const next = [...list]
      next[aboutHeroIndex] = converted
      return { changed: true, sections: next, reason: 'converted aboutHeroBlock → marketingSplitHeroBlock' }
    }
  }

  const fromLegacy = heroToMarketingSplitBlock(legacyHero as HeroLike, 'restore-about-hero-legacy')
  const heroBlock = fromLegacy ?? DEFAULT_ABOUT_MARKETING_SPLIT_HERO

  return {
    changed: true,
    sections: [heroBlock, ...list],
    reason: fromLegacy ? 'prepended from legacy hero field' : 'prepended DEFAULT_ABOUT_MARKETING_SPLIT_HERO',
  }
}