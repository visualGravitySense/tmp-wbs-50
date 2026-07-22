import type { Review } from '@/types/review'
import { normalizeReviewsFromGroq } from '@/lib/sanity/queries/reviews'

function reviewKey(r: Review): string {
  if (r.id) return r.id
  return `${r.author}::${(r.text ?? '').slice(0, 64)}`
}

function dedupeByKey(list: Review[]): Review[] {
  const seen = new Set<string>()
  const out: Review[] = []
  for (const r of list) {
    const k = reviewKey(r)
    if (seen.has(k)) continue
    seen.add(k)
    out.push(r)
  }
  return out
}

/**
 * Builds the marketing-page review list from Sanity:
 * - `featuredRaw`: optional curated refs (order preserved).
 * - `pool`: all (or a large slice of) `review` documents from GROQ, newest first.
 *
 * Curated rows are shown first; every other review in `pool` is appended so
 * choosing featured items in Studio never replaces the rest of the catalog on
 * the page (they only pin / reorder the head).
 */
export function resolveFeaturedReviews(featuredRaw: unknown, pool: Review[]): Review[] {
  const curated = dedupeByKey(normalizeReviewsFromGroq(featuredRaw))
  const allPool = dedupeByKey(pool)

  if (curated.length === 0) return allPool

  const curatedKeys = new Set(curated.map(reviewKey))
  const rest = allPool.filter((r) => !curatedKeys.has(reviewKey(r)))
  return [...curated, ...rest]
}
