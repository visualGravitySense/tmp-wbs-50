import { NextResponse } from 'next/server'
import { getSiteSettings } from '@/lib/sanity'

export async function GET() {
  try {
    const siteSettings = await getSiteSettings()
    return NextResponse.json(siteSettings?.productionAuditQuiz || {})
  } catch (err) {
    console.error('Failed to fetch quiz config:', err)
    return NextResponse.json({ error: 'failed_to_fetch_config' }, { status: 500 })
  }
}
