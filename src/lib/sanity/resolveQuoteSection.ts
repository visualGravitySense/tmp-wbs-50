import type { QuoteSection } from '@/types/about'
import type { AboutQuoteSectionData } from '@/components/about/AboutQuoteCarousel'

const DEFAULT_QUOTES: AboutQuoteSectionData = {
  eyebrow: 'Tsitaat',
  cardLabel: 'Andres Kase',
  quotes: [
    {
      quote:
        'Tootmisjuht ei pea olema see, kes kustutab tulesid. Ta peab ehitama süsteemi kus tulekahju ei toimu.',
      author: 'Andres Kase',
    },
  ],
  backgroundColor: 'gray',
}

/** Normalize CMS quote block (array + legacy single quote fields). */
export function resolveQuoteSection(
  cms?: QuoteSection | null,
  fallback: AboutQuoteSectionData = DEFAULT_QUOTES,
): AboutQuoteSectionData | null {
  if (!cms) return fallback.quotes.length > 0 ? fallback : null

  const fromArray =
    cms.quotes?.filter((q) => q.quote?.trim() && q.author?.trim()).map((q) => ({
      quote: q.quote.trim(),
      author: q.author.trim(),
    })) ?? []

  const legacySingle =
    cms.quote?.trim() && cms.author?.trim()
      ? [{ quote: cms.quote.trim(), author: cms.author.trim() }]
      : []

  const quotes = fromArray.length > 0 ? fromArray : legacySingle.length > 0 ? legacySingle : fallback.quotes

  if (quotes.length === 0) return null

  const eyebrow = (cms.eyebrow || cms.subtitle || '').trim() || fallback.eyebrow
  const cardLabel = cms.secondBadgeText?.trim() || cms.cardLabel?.trim() || fallback.cardLabel

  return {
    eyebrow,
    cardLabel,
    quotes,
    backgroundColor: cms.backgroundColor ?? fallback.backgroundColor,
  }
}
