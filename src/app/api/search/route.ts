import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity/client'
import { SITE_SEARCH_QUERY, type SiteSearchHit } from '@/lib/sanity/queries/siteSearch'

export const dynamic = 'force-dynamic'

function buildMatchPattern(raw: string): string | null {
  const trimmed = raw.trim().toLowerCase()
  if (trimmed.length < 2) return null
  const safe = trimmed
    .replace(/[*?]/g, ' ')
    .replace(/\s+/g, ' ')
    .slice(0, 80)
  const parts = safe.split(' ').filter(Boolean)
  if (parts.length === 0) return null
  return `*${parts.join('*')}*`
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q') ?? ''
  const pattern = buildMatchPattern(q)
  if (!pattern) {
    return NextResponse.json({ results: [] as SiteSearchHit[] })
  }

  try {
    const results = await client.fetch<SiteSearchHit[]>(SITE_SEARCH_QUERY, { p: pattern })
    const cleaned = (results ?? []).filter((r) => r.href && r.title)
    return NextResponse.json({ results: cleaned })
  } catch (e) {
    console.error('[api/search]', e)
    return NextResponse.json({ results: [], error: 'search_failed' }, { status: 500 })
  }
}
