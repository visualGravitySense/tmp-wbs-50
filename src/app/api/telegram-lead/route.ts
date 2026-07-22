import { NextResponse } from 'next/server'
import { leadIntegrationsResponse } from '@/lib/integrations/leadResponse'
import { upsertSmailyContact } from '@/lib/smaily/server'
import { sendTelegramText } from '@/lib/telegram/server'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const MIN_MESSAGE = 10
const MAX_MESSAGE = 3500
const MAX_CONTACT = 128

function phoneDigitCount(s: string): number {
  return s.replace(/\D/g, '').length
}

/** Server-only: Telegram + valikuline Smaily (e-posti kontaktid). */
export async function POST(req: Request) {
  const tgConfigured = Boolean(
    process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID,
  )
  const smailyConfigured = Boolean(
    process.env.SMAILY_API_USER && process.env.SMAILY_API_KEY,
  )
  if (!tgConfigured && !smailyConfigured) {
    return NextResponse.json({ error: 'integrations_not_configured' }, { status: 503 })
  }

  let body: {
    name?: unknown
    email?: unknown
    source?: unknown
    message?: unknown
    company?: unknown
    contact?: unknown
    marketingConsent?: unknown
  }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }

  const name = typeof body.name === 'string' ? body.name.trim().slice(0, 200) : ''
  const company = typeof body.company === 'string' ? body.company.trim().slice(0, 120) : ''
  const marketingConsent = body.marketingConsent === true

  const messageRaw = typeof body.message === 'string' ? body.message.trim() : ''
  const sourceRaw = typeof body.source === 'string' ? body.source : 'web'
  const source = sourceRaw.replace(/\s+/g, ' ').slice(0, 120) || 'web'

  let text: string
  let smailyEmail: string | null = null
  let smailyFields: Record<string, string> = { source }

  if (messageRaw.length > 0) {
    if (messageRaw.length < MIN_MESSAGE) {
      return NextResponse.json({ error: 'message_too_short' }, { status: 400 })
    }
    if (messageRaw.length > MAX_MESSAGE) {
      return NextResponse.json({ error: 'message_too_long' }, { status: 400 })
    }
    const contactRaw =
      typeof body.contact === 'string'
        ? body.contact.trim().replace(/\s+/g, ' ').slice(0, MAX_CONTACT)
        : ''
    const hasValidEmail = EMAIL_RE.test(contactRaw)
    const digits = phoneDigitCount(contactRaw)
    const hasValidPhone = digits >= 8 && digits <= 15 && contactRaw.length > 0
    if (!hasValidEmail && !hasValidPhone) {
      return NextResponse.json({ error: 'invalid_contact' }, { status: 400 })
    }
    const emailLine = hasValidEmail ? contactRaw : '—'
    const phoneLine = !hasValidEmail && hasValidPhone ? contactRaw : '—'
    
    const introLines = [
      'Küsimus saidilt (Andres)',
      '',
      messageRaw,
      '',
      '—',
      name ? `Nimi: ${name}` : null,
      company ? `Ettevõte: ${company}` : null,
      `E-post: ${emailLine}`,
      `Telefon: ${phoneLine}`,
      `Allikas: ${source}`
    ].filter(x => x !== null).join('\n')
    
    text = introLines
    if (hasValidEmail && marketingConsent) {
      smailyEmail = contactRaw.toLowerCase()
      smailyFields = {
        source,
        message: messageRaw.slice(0, 500),
        marketing_consent: 'yes',
        ...(name ? { name } : {}),
        ...(company ? { company } : {}),
      }
    }
  } else {
    const email = typeof body.email === 'string' ? body.email.trim() : ''
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
    }
    const isPdfLead =
      source === 'nine-days-mini' ||
      source === 'nine-days-program' ||
      source === 'hero-vaata-programmi' ||
      source === 'opstar_profit_program'
    text = isPdfLead
      ? `9-päeva programm — PDF / e-post\nE-post: ${email}\nAllikas: ${source}`
      : `Uus e-posti kontakt\nE-post: ${email}\nAllikas: ${source}${marketingConsent ? '\nTurundusnõusolek: jah' : ''}`
    if (isPdfLead || marketingConsent) {
      smailyEmail = email.toLowerCase()
      smailyFields = {
        source,
        lead_type: isPdfLead ? 'pdf-program' : 'email-lead',
        ...(isPdfLead ? { request: 'programmi_materjal_email' } : {}),
        marketing_consent: isPdfLead || marketingConsent ? 'yes' : 'no',
      }
    }
  }

  const [tgResult, smailyResult] = await Promise.all([
    tgConfigured ? sendTelegramText(text) : Promise.resolve({ ok: false as const, reason: 'not_configured' as const }),
    smailyEmail && smailyConfigured
      ? upsertSmailyContact({
          email: smailyEmail,
          customFields: smailyFields,
        })
      : Promise.resolve({ ok: true as const }),
  ])

  if (tgConfigured && !tgResult.ok) {
    console.error('[api/telegram-lead] Telegram error', tgResult)
    return NextResponse.json({ error: 'telegram_send_failed' }, { status: 502 })
  }

  const smailyDebug =
    smailyEmail && smailyConfigured && !smailyResult.ok
      ? smailyResult.reason === 'api_error'
        ? `HTTP ${smailyResult.status ?? '?'} ${smailyResult.body ?? ''}`
        : smailyResult.reason
      : undefined

  if (smailyDebug) {
    console.error('[api/telegram-lead] Smaily error (form still OK if Telegram OK)', smailyResult)
  } else if (smailyEmail && smailyConfigured && smailyResult.ok) {
    const smailyCode = 'code' in smailyResult ? smailyResult.code : undefined
    console.info('[api/telegram-lead] Smaily OK', smailyEmail, smailyCode ?? '')
  }

  return NextResponse.json(
    leadIntegrationsResponse({
      telegramConfigured: tgConfigured,
      telegramOk: tgResult.ok,
      smailyConfigured,
      smailyAttempted: Boolean(smailyEmail),
      smailyOk: smailyResult.ok,
      smailyDebug,
    }),
  )
}
