import { NextResponse } from 'next/server'
import { leadIntegrationsResponse } from '@/lib/integrations/leadResponse'
import { upsertSmailyContact } from '@/lib/smaily/server'
import { sendTelegramText } from '@/lib/telegram/server'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface QuizAnswer {
  question: string
  selectedOption: string
}

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
    answers?: unknown
  }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }

  const name = typeof body.name === 'string' ? body.name.trim().slice(0, 128) : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const answers = Array.isArray(body.answers) ? (body.answers as QuizAnswer[]) : []

  if (!name) {
    return NextResponse.json({ error: 'name_required' }, { status: 400 })
  }
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
  }

  // Construct a detailed, highly readable Telegram notification for Andres
  let telegramMessage = `📊 UUS TEHASE TOOTMISAUDIT (QUIZ)\n\n`
  telegramMessage += `👤 Nimi: ${name}\n`
  telegramMessage += `✉️ E-post: ${email}\n`
  telegramMessage += `📍 Allikas: tootmisaudit-quiz\n\n`
  telegramMessage += `📝 VASTUSED:\n`

  answers.forEach((ans, index) => {
    telegramMessage += `\n${index + 1}. ${ans.question}\n👉 ${ans.selectedOption}\n`
  })

  // Format answers for Smaily custom fields
  const smailyFields: Record<string, string> = {
    source: 'tootmisaudit-quiz',
    name: name,
    lead_type: 'quiz-audit',
    marketing_consent: 'no',
  }

  // Add ALL questions and answers dynamically (up to however many there are)
  answers.forEach((ans, index) => {
    const qNum = index + 1
    // Add both the question text and the selected option to Smaily CRM
    smailyFields[`q${qNum}_text`] = ans.question.slice(0, 255)
    smailyFields[`q${qNum}_answer`] = ans.selectedOption.slice(0, 255)
  })

  // Add a combined message string just in case
  const answersSnippet = answers.map((ans, idx) => `${idx + 1}) ${ans.selectedOption}`).join(' | ')
  smailyFields['message'] = answersSnippet.slice(0, 500)

  const [tgResult, smailyResult] = await Promise.all([
    tgConfigured ? sendTelegramText(telegramMessage) : Promise.resolve({ ok: false as const, reason: 'not_configured' as const }),
    smailyConfigured
      ? upsertSmailyContact({
          email: email.toLowerCase(),
          marketingOptOut: true,
          customFields: smailyFields,
        })
      : Promise.resolve({ ok: true as const }),
  ])

  if (tgConfigured && !tgResult.ok) {
    console.error('[api/quiz-submit] Telegram error', tgResult)
    return NextResponse.json({ error: 'telegram_send_failed' }, { status: 502 })
  }

  const smailyDebug =
    !smailyResult.ok
      ? smailyResult.reason === 'api_error'
        ? `HTTP ${smailyResult.status ?? '?'} ${smailyResult.body ?? ''}`
        : smailyResult.reason
      : undefined

  if (smailyDebug) {
    console.error('[api/quiz-submit] Smaily error', smailyResult)
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
