import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity/client'
import {
  REVIEWS_PAGE_QUERY,
  normalizeReviewsFromGroq,
} from '@/lib/sanity/queries/reviews'
import { TESTIMONIALS_SCROLL_BATCH } from '@/lib/testimonials-pagination'

const MAX_LIMIT = 50

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const offset = Math.max(0, Number.parseInt(searchParams.get('offset') || '0', 10) || 0)
  const rawLimit = Number.parseInt(searchParams.get('limit') || String(TESTIMONIALS_SCROLL_BATCH), 10)
  const limit = Math.min(MAX_LIMIT, Math.max(1, Number.isFinite(rawLimit) ? rawLimit : TESTIMONIALS_SCROLL_BATCH))
  const industry = (searchParams.get('industry') || '').trim()
  const start = offset
  const end = offset + limit

  try {
    const rows = await client.fetch(REVIEWS_PAGE_QUERY, { start, end, industry })
    const reviews = normalizeReviewsFromGroq(rows)
    return NextResponse.json({ reviews, nextOffset: start + reviews.length })
  } catch (e) {
    console.error('[api/reviews]', e)
    return NextResponse.json({ error: 'fetch_failed' }, { status: 500 })
  }
}
