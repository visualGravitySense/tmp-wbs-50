import { createClient } from '@sanity/client'
import { NextRequest, NextResponse } from 'next/server'

import { ensureAboutPageHeroSections } from '@/lib/sanity/aboutHeroRestore'

type AboutDoc = {
  _id: string
  sections?: unknown[]
  hero?: unknown
}

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  const expected = process.env.SANITY_REVALIDATE_SECRET

  if (!expected || secret !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  const token =
    process.env.SANITY_API_WRITE_TOKEN ||
    process.env.SANITY_API_TOKEN ||
    process.env.SANITY_AUTH_TOKEN

  if (!projectId || !dataset || !token) {
    return NextResponse.json({ error: 'Missing Sanity credentials' }, { status: 500 })
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
    token,
    useCdn: false,
  })

  const ids = ['aboutPage', 'drafts.aboutPage']
  const results: Record<string, unknown> = {}

  for (const id of ids) {
    const doc = await client.fetch<AboutDoc | null>(
      `*[_id == $id][0]{ _id, sections, hero }`,
      { id },
    )

    if (!doc) {
      results[id] = { found: false }
      continue
    }

    const before = {
      sectionCount: doc.sections?.length ?? 0,
      hasHero: (doc.sections ?? []).some(
        (s) => (s as { _type?: string })?._type === 'marketingSplitHeroBlock',
      ),
      firstType: (doc.sections?.[0] as { _type?: string })?._type ?? null,
    }

    const { changed, sections, reason } = ensureAboutPageHeroSections(doc.sections, doc.hero)

    if (changed) {
      await client.patch(doc._id).set({ sections }).commit({ autoGenerateArrayKeys: true })
    }

    results[id] = {
      found: true,
      before,
      after: {
        sectionCount: sections.length,
        hasHero: (sections[0] as { _type?: string })?._type === 'marketingSplitHeroBlock',
        firstType: (sections[0] as { _type?: string })?._type ?? null,
      },
      changed,
      reason,
    }
  }

  return NextResponse.json({
    ok: true,
    message: 'aboutPage hero restore complete — publish in Studio if needed',
    results,
  })
}