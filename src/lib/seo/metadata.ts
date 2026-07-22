import type { Metadata } from 'next'

const TITLE_MAX = 60
const DESCRIPTION_MAX = 160
export const SITE_NAME = 'Andres Kase'
export const DEFAULT_OG_IMAGE = '/opstar-brand-logo.webp'

export const DEFAULT_HOME_SEO = {
  title: 'Andres Kase — Tootmisjuhtimise koolitus',
  description:
    '9-päevane tootmisjuhtimise koolitus ja LEAN-Agile programm. Praktilised tööriistad, tehasekülastused ja mõõdetavad tulemused juhtidele.',
} as const

function truncateAtWord(text: string, max: number): string {
  const trimmed = text.trim()
  if (trimmed.length <= max) return trimmed

  const sliced = trimmed.slice(0, max - 1)
  const lastSpace = sliced.lastIndexOf(' ')
  if (lastSpace > max * 0.55) {
    return `${sliced.slice(0, lastSpace).trim()}…`
  }
  return `${sliced.trim()}…`
}

export function truncateMetaTitle(title: string, max = TITLE_MAX): string {
  return truncateAtWord(title, max)
}

export function truncateMetaDescription(description: string, max = DESCRIPTION_MAX): string {
  return truncateAtWord(description, max)
}

function normalizeOgImages(ogImage?: string | string[]): string[] {
  if (!ogImage) return []
  const list = Array.isArray(ogImage) ? ogImage : [ogImage]
  return list.map((url) => url.trim()).filter(Boolean)
}

export type BuildPageMetadataInput = {
  title: string
  description?: string
  path?: string
  keywords?: string | string[]
  ogImage?: string | string[]
  ogType?: 'website' | 'article'
  noIndex?: boolean
}

/** Canonical URL, Open Graph, and Twitter Card metadata for marketing pages. */
export function buildPageMetadata(input: BuildPageMetadataInput): Metadata {
  const title = truncateMetaTitle(input.title)
  const description = input.description
    ? truncateMetaDescription(input.description)
    : undefined
  const canonicalPath = input.path ?? '/'
  const ogImages = normalizeOgImages(input.ogImage)
  const images = ogImages.length > 0 ? ogImages : [DEFAULT_OG_IMAGE]

  return {
    title,
    description,
    keywords: input.keywords,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      url: canonicalPath,
      siteName: SITE_NAME,
      locale: 'et_EE',
      type: input.ogType ?? 'website',
      images: images.map((url) => ({ url })),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images,
    },
    ...(input.noIndex
      ? { robots: { index: false, follow: false } as const }
      : {}),
  }
}
