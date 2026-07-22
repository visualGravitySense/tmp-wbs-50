import 'server-only'

import { fetchWithRetry } from '@/lib/sanity/fetchWithRetry'
import client from '@/lib/sanity/client'
import { normalizeReviewsFromGroq } from '@/lib/sanity/queries/reviews'

/** Same Sanity client + cache policy as `/testimonials` (authenticated API, no CDN). */
export async function fetchReviewPool(query: string) {
  const raw = await fetchWithRetry(
    () => client.fetch(query, {}, { next: { revalidate: 60 }, stega: false }),
    { label: 'reviewPool' },
  )
  return normalizeReviewsFromGroq(raw)
}
