import { createClient } from '@sanity/client'
import { NextRequest, NextResponse } from 'next/server'

import {
  patchOpstarComparisonSections,
  pickOpstarComparisonSource,
  type SanityComparisonPayload,
} from '@/lib/opstar/restoreOpstarComparison'

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-admin-secret')
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

  const dryRun = request.nextUrl.searchParams.get('dryRun') === '1'

  const client = createClient({
    projectId,
    dataset,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
    token,
    useCdn: false,
  })

  const doc = await client.fetch<{
    _id: string
    comparison?: SanityComparisonPayload
    sections?: Array<Record<string, unknown>>
  }>(`*[_type == "opstarProfit" && _id == "opstarProfit"][0]{
    _id,
    comparison,
    sections
  }`)

  if (!doc?._id) {
    return NextResponse.json({ error: 'opstarProfit document not found' }, { status: 404 })
  }

  const comparison = pickOpstarComparisonSource(doc.comparison, doc.sections as never)
  const sections = patchOpstarComparisonSections(doc.sections, comparison)

  if (!dryRun) {
    await client
      .patch('opstarProfit')
      .set({ sections, comparison })
      .commit({ autoGenerateArrayKeys: true })
  }

  return NextResponse.json({
    dataset,
    dryRun,
    patched: !dryRun,
    comparisonTitle: comparison.title,
    rowCount: comparison.comparisonItems?.length ?? 0,
    sectionTypes: sections.map((s) => s._type),
  })
}