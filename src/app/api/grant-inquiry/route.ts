import { NextResponse } from 'next/server'
import {
  formatGrantInquiryTelegramText,
  grantInquirySmailyFields,
} from '@/lib/grantInquiry/format'
import { isValidIsikukood, normalizeIsikukood } from '@/lib/grantInquiry/isikukood'
import { leadIntegrationsResponse } from '@/lib/integrations/leadResponse'
import { upsertSmailyContact } from '@/lib/smaily/server'
import { sendTelegramText } from '@/lib/telegram/server'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: Request) {
  let body: {
    name?: unknown
    email?: unknown
    isikukood?: unknown
    company?: unknown
  }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }

  const honeypot = typeof body.company === 'string' ? body.company.trim() : ''
  if (honeypot.length > 0) {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 })
  }

  const name = typeof body.name === 'string' ? body.name.trim().slice(0, 200) : ''
  const email = typeof body.email === 'string' ? body.email.trim().slice(0, 254) : ''
  const isikukoodRaw = typeof body.isikukood === 'string' ? normalizeIsikukood(body.isikukood) : ''

  if (name.length < 2) {
    return NextResponse.json({ error: 'invalid_name' }, { status: 400 })
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
  }
  if (!isValidIsikukood(isikukoodRaw)) {
    return NextResponse.json({ error: 'invalid_isikukood' }, { status: 400 })
  }

  const payload = {
    name,
    email,
    isikukood: isikukoodRaw || undefined,
  }

  const tgConfigured = Boolean(
    process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID,
  )
  const smailyConfigured = Boolean(
    process.env.SMAILY_API_USER && process.env.SMAILY_API_KEY,
  )

  if (!tgConfigured && !smailyConfigured) {
    return NextResponse.json({ error: 'integrations_not_configured' }, { status: 503 })
  }

  const [tgResult, smailyResult] = await Promise.all([
    tgConfigured ? sendTelegramText(formatGrantInquiryTelegramText(payload)) : Promise.resolve({ ok: false as const, reason: 'not_configured' as const }),
    smailyConfigured
      ? upsertSmailyContact({
          email,
          marketingOptOut: true,
          customFields: grantInquirySmailyFields(payload),
        })
      : Promise.resolve({ ok: true as const }),
  ])

  if (tgConfigured && !tgResult.ok) {
    console.error('[api/grant-inquiry] Telegram failed', tgResult)
    return NextResponse.json({ error: 'telegram_send_failed' }, { status: 502 })
  }

  const smailyDebug =
    smailyConfigured && !smailyResult.ok
      ? smailyResult.reason === 'api_error'
        ? `HTTP ${smailyResult.status ?? '?'} ${smailyResult.body ?? ''}`
        : smailyResult.reason
      : undefined

  if (smailyDebug) {
    console.error('[api/grant-inquiry] Smaily failed (inquiry still OK if Telegram OK)', smailyResult)
  } else if (smailyConfigured && smailyResult.ok) {
    const smailyCode = 'code' in smailyResult ? smailyResult.code : undefined
    console.info('[api/grant-inquiry] Smaily OK', email, smailyCode ?? '')
  }

  return NextResponse.json(
    leadIntegrationsResponse({
      telegramConfigured: tgConfigured,
      telegramOk: tgResult.ok,
      smailyConfigured,
      smailyAttempted: true,
      smailyOk: smailyResult.ok,
      smailyDebug,
    }),
  )
}
