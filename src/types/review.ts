/** Single source of truth for Sanity `review` documents and `TestimonialsReviews` props. */
export type Review = {
  /** Sanity document `_id` when fetched (stable list keys). */
  id?: string
  author: string
  label?: string
  text: string
  /** Primary industry tag for /testimonials filter pills (e.g. Puidutööstus). */
  industry?: string
}
