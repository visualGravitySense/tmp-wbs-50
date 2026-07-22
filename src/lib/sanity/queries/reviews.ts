import type { Review } from '@/types/review'

export { TESTIMONIALS_INITIAL_LIMIT, TESTIMONIALS_SCROLL_BATCH } from '@/lib/testimonials-pagination'

const REVIEW_FIELDS = `_id, author, label, text, industry`

/** First paint on `/testimonials` — rest load via `/api/reviews` on scroll. */
export const REVIEWS_LIST_QUERY = `*[_type == "review"] | order(_createdAt desc) {
  ${REVIEW_FIELDS}
}`

/** Oldest first — used on About page so default picks differ from `REVIEWS_LIST_QUERY` (home, etc.). */
export const REVIEWS_LIST_QUERY_ASC = `*[_type == "review"] | order(_createdAt asc) {
  ${REVIEW_FIELDS}
}`

/** Author A→Z — Koolitus page pool (differs from home date order when `featuredReviews` is empty). */
export const REVIEWS_LIST_QUERY_AUTHOR_ASC = `*[_type == "review"] | order(author asc) {
  ${REVIEW_FIELDS}
}`

/** Author Z→A — Product page pool (differs from Koolitus + home + About). */
export const REVIEWS_LIST_QUERY_AUTHOR_DESC = `*[_type == "review"] | order(author desc) {
  ${REVIEW_FIELDS}
}`

export const REVIEWS_COUNT_QUERY = `count(*[_type == "review"])`

export const REVIEWS_FILTERED_COUNT_QUERY = `count(*[_type == "review" && ($industry == "" || industry == $industry)])`

/** Partner names + industries — used to infer review filter tags on /testimonials. */
export const PARTNER_INDUSTRIES_QUERY = `*[_type == "partnerLogo"]{ name, industry }`

/** Paginated slice: GROQ range is `[start...end)` (end exclusive). */
export const REVIEWS_PAGE_QUERY = `*[_type == "review" && ($industry == "" || industry == $industry)] | order(_createdAt desc) [$start...$end] {
  ${REVIEW_FIELDS}
}`

/** Normalize GROQ rows for `review` documents (shared by home + testimonials page). */
export function normalizeReviewsFromGroq(raw: unknown): Review[] {
  if (!Array.isArray(raw)) return []
  return raw
    .filter((r): r is Record<string, unknown> => r !== null && typeof r === 'object')
    .map((r) => ({
      id: typeof r._id === 'string' ? r._id : undefined,
      author: typeof r.author === 'string' ? r.author.trim() : '',
      label:
        typeof r.label === 'string' && r.label.trim() ? r.label.trim() : undefined,
      text: typeof r.text === 'string' ? r.text.trim() : '',
      industry:
        typeof r.industry === 'string' && r.industry.trim() ? r.industry.trim() : undefined,
    }))
    .filter((r) => r.author && r.text)
}


