import { NextResponse } from 'next/server'
import {
  courseRegistrationSmailyFields,
  formatCourseRegistrationTelegramText,
} from '@/lib/courseRegistration/format'
import { leadIntegrationsResponse } from '@/lib/integrations/leadResponse'
import { upsertSmailyContact } from '@/lib/smaily/server'
import { sendTelegramText } from '@/lib/telegram/server'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: Request) {
  let body: {
    name?: unknown
    email?: unknown
    phone?: unknown
    note?: unknown
    cohort?: unknown
    marketingConsent?: unknown
    company?: unknown
    packageTier?: unknown
  }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }

  const name = typeof body.name === 'string' ? body.name.trim().slice(0, 200) : ''
  const email = typeof body.email === 'string' ? body.email.trim().slice(0, 254) : ''
  const phone = typeof body.phone === 'string' ? body.phone.trim().slice(0, 64) : ''
  const company = typeof body.company === 'string' ? body.company.trim().slice(0, 120) : ''
  const note = typeof body.note === 'string' ? body.note.trim().slice(0, 3500) : ''
  const cohort = typeof body.cohort === 'string' ? body.cohort.trim().slice(0, 120) : ''
  const packageTier = typeof body.packageTier === 'string' ? body.packageTier.trim().slice(0, 120) : ''
  const marketingConsent = body.marketingConsent === true

  if (!name) {
    return NextResponse.json({ error: 'invalid_name' }, { status: 400 })
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
  }

  const payload = { name, company: company || undefined, email, phone: phone || undefined, note: note || undefined, cohort: cohort || undefined, packageTier: packageTier || undefined, marketingConsent }

  const [tgResult, smailyResult] = await Promise.all([
    sendTelegramText(formatCourseRegistrationTelegramText(payload)),
    upsertSmailyContact({
      email,
      marketingOptOut: !marketingConsent,
      customFields: courseRegistrationSmailyFields(payload),
    }),
  ])

  const tgConfigured = process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID
  const smailyConfigured = process.env.SMAILY_API_USER && process.env.SMAILY_API_KEY

  if (!tgConfigured && !smailyConfigured) {
    return NextResponse.json({ error: 'integrations_not_configured' }, { status: 503 })
  }

  if (tgConfigured && !tgResult.ok) {
    console.error('[api/course-registration] Telegram failed', tgResult)
    return NextResponse.json({ error: 'telegram_send_failed' }, { status: 502 })
  }

  if (smailyConfigured && !smailyResult.ok && smailyResult.reason !== 'not_configured') {
    console.error('[api/course-registration] Smaily failed (registration still OK if Telegram OK)', smailyResult)
  }

  if (smailyConfigured && smailyResult.ok) {
    console.info('[api/course-registration] Smaily OK', email, smailyResult.code ?? '')
  }

  return NextResponse.json(
    leadIntegrationsResponse({
      telegramConfigured: Boolean(tgConfigured),
      telegramOk: tgResult.ok,
      smailyConfigured: Boolean(smailyConfigured),
      smailyAttempted: true,
      smailyOk: smailyResult.ok,
      smailyDebug:
        !smailyResult.ok && smailyResult.reason === 'api_error'
          ? `HTTP ${smailyResult.status ?? '?'} ${smailyResult.body ?? ''}`
          : undefined,
    }),
  )
}
