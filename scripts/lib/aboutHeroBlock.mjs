/**
 * Shared helpers for aboutPage marketingSplitHeroBlock restore/seed.
 * Keep in sync with `src/lib/sanity/aboutHeroRestore.ts` (canonical for API routes).
 */
import { buildSanityLink, normalizeSanityLink } from './internalLinkRefs.mjs'

export function heroToMarketingSplitBlock(hero, key) {
  if (!hero || typeof hero !== 'object') return null
  const h = hero
  return {
    _type: 'marketingSplitHeroBlock',
    _key: key,
    eyebrow: h.eyebrow,
    headline: h.headline ?? '',
    scriptHeadline: h.subtitle ?? h.scriptHeadline,
    description: h.description,
    rightComponentType: 'aboutAndres',
    heroImage: h.image ?? h.heroImage,
    linkedinUrl: h.linkedinUrl,
    floatingBadges: h.floatingBadges,
    badges: h.badges ?? h.technologyBadges,
    primaryCta: buttonToCta(h.primaryButton),
    secondaryCta: buttonToCta(h.secondaryButton),
    isVisible: true,
    hideFromScrollNav: false,
    navLabel: 'Hero',
  }
}

function buttonToCta(button) {
  if (!button || typeof button !== 'object') return undefined
  const link = button.link
  if (!button.text?.trim() && !link?.trim()) return undefined
  const sanityLink = buildSanityLink(link)
  if (!sanityLink) return { text: button.text }
  return { text: button.text, link: sanityLink }
}

export function aboutHeroBlockToMarketingSplit(block) {
  if (!block || block._type !== 'aboutHeroBlock') return null
  const key = block._key ?? 'converted-about-hero'
  const mapped = heroToMarketingSplitBlock(block.hero ?? block, key)
  return mapped
}

/** Fallback when legacy `hero` field and sections[] are both empty. */
export const DEFAULT_ABOUT_MARKETING_SPLIT_HERO = {
  _type: 'marketingSplitHeroBlock',
  _key: 'restore-about-hero',
  rightComponentType: 'aboutAndres',
  headline: 'ANDRES KASE',
  scriptHeadline: 'Lean-Agile ekspert',
  description:
    '25 aastat tootmispõrandal — õpetan seda, mida olen ise teinud, mitte seda, mida raamatutest lugesin.',
  linkedinUrl: 'https://www.linkedin.com/in/andres-kase-a93352b/',
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
    link: buildSanityLink('/kontakt'),
  },
  secondaryCta: {
    text: 'Koolitused',
    link: buildSanityLink('/koolitus'),
  },
  isVisible: true,
  hideFromScrollNav: false,
  navLabel: 'Hero',
}

function normalizeHeroCtaLinks(block) {
  if (block?._type !== 'marketingSplitHeroBlock') return { block, changed: false }
  let changed = false
  const next = { ...block }
  for (const key of ['primaryCta', 'secondaryCta']) {
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

export function ensureAboutPageHeroSections(sections, legacyHero) {
  const list = Array.isArray(sections) ? [...sections] : []

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

  const fromLegacy = heroToMarketingSplitBlock(legacyHero, 'restore-about-hero-legacy')
  const heroBlock = fromLegacy ?? DEFAULT_ABOUT_MARKETING_SPLIT_HERO

  return {
    changed: true,
    sections: [heroBlock, ...list],
    reason: fromLegacy ? 'prepended from legacy hero field' : 'prepended DEFAULT_ABOUT_MARKETING_SPLIT_HERO',
  }
}