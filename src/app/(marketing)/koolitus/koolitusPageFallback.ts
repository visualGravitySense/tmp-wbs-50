/**
 * Minimal fallback data for the /koolitus page when Sanity is unavailable.
 * Kept in a separate module so it's tree-shaken from the SSR bundle when
 * Sanity data is present (i.e. the `page || FALLBACK` short-circuits).
 *
 * NOTE: Keep this object small — it gets serialised into the page HTML
 * as a prop on the <MarketingPageBuilderLayer> server component.
 */
export const KOOLITUS_PAGE_DATA_FALLBACK = {
  title: 'Tootmisjuhtimise koolitus',
  hero: {
    headline: 'Lean-Agile',
    scriptHeadline: 'Tootmisjuhtimise arenguprogramm',
    subtitle: '9 päevaga saad meeskonnale süsteemi, mis töötab ilma sinuta.',
    description: 'Lean-Agile tootmisjuhtimise arenguprogramm — LEAN · TPS · Product Name.',
    eyebrow: 'OpStar Profit™ · Programm',
    badges: [] as { text: string; color: string; size: string }[],
  },
} as const
