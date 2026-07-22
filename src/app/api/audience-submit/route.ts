import { NextResponse } from 'next/server'
import { sendTelegramText } from '@/lib/telegram/server'
import { upsertSmailyContact } from '@/lib/smaily/server'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: Request) {
  const tgConfigured = Boolean(
    process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID
  )
  const smailyConfigured = Boolean(
    process.env.SMAILY_API_USER && process.env.SMAILY_API_KEY
  )

  if (!tgConfigured && !smailyConfigured) {
    return NextResponse.json({ error: 'integrations_not_configured' }, { status: 503 })
  }

  let body: {
    selectedProblems?: string[]
    customGoal?: string
    buttonClicked?: string
    title?: string
    contact?: string
  }
  
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }

  const selectedProblems = Array.isArray(body.selectedProblems) ? body.selectedProblems : []
  const customGoal = typeof body.customGoal === 'string' ? body.customGoal.trim() : ''
  const buttonClicked = typeof body.buttonClicked === 'string' ? body.buttonClicked.trim() : ''
  const title = typeof body.title === 'string' ? body.title.trim() : 'Kas tunned end tootmisjuhtimise "tulekahjude" keskel ära?'
  const contact = typeof body.contact === 'string' ? body.contact.trim() : ''

  if (!contact) {
    return NextResponse.json({ error: 'contact_required' }, { status: 400 })
  }

  const hasValidEmail = EMAIL_RE.test(contact)
  const digits = contact.replace(/\D/g, '').length
  const hasValidPhone = digits >= 8 && digits <= 15

  if (!hasValidEmail && !hasValidPhone) {
    return NextResponse.json({ error: 'invalid_contact' }, { status: 400 })
  }

  // Smaily Integration
  let smailyResultOk = true
  if (hasValidEmail && smailyConfigured) {
    try {
      const smailyRes = await upsertSmailyContact({
        email: contact.toLowerCase(),
        marketingOptOut: true,
        customFields: {
          source: 'koolitus-audience',
          message: `Sihtgrupp: ${selectedProblems.join(', ')}. Eesmärk: ${customGoal}${buttonClicked ? ` [Nupp: ${buttonClicked}]` : ''}`.slice(0, 500),
          marketing_consent: 'no',
        }
      })
      smailyResultOk = smailyRes.ok
    } catch (err) {
      console.error('[api/audience-submit] Smaily subscription error', err)
      smailyResultOk = false
    }
  }

  // Construct Telegram message
  let telegramMessage = `🎯 UUS TEGEVUS: SIHTGRUPPI VALIK\n\n`
  telegramMessage += `📝 Küsimustik: "${title}"\n\n`
  
  if (selectedProblems.length > 0) {
    telegramMessage += `🔥 VALITUD PROBLEEMID:\n`
    selectedProblems.forEach((problem) => {
      telegramMessage += `• "${problem}"\n`
    })
    telegramMessage += `\n`
  } else {
    telegramMessage += `🔥 VALITUD PROBLEEMID: Ühtegi punkti ei valitud\n\n`
  }

  telegramMessage += `💭 KASUTAJA EESMÄRK / LISAINFO:\n`
  telegramMessage += customGoal ? `${customGoal}\n\n` : `(Väli jäeti tühjaks)\n\n`

  telegramMessage += `📞 KONTAKTANDMED:\n`
  telegramMessage += `${contact}\n\n`

  if (buttonClicked) {
    telegramMessage += `👉 Vajutati nupule: "${buttonClicked}"\n`
  }

  telegramMessage += `\n📍 Allikas: koolitus-audience`

  try {
    let tgResult = { ok: true }
    if (tgConfigured) {
      const res = await sendTelegramText(telegramMessage)
      tgResult = { ok: res.ok }
    }
    
    if (!tgResult.ok) {
      console.error('[api/audience-submit] Telegram send failed')
      return NextResponse.json({ error: 'telegram_send_failed' }, { status: 502 })
    }
    return NextResponse.json({ ok: true, smailyOk: smailyResultOk })
  } catch (error) {
    console.error('[api/audience-submit] Exception occurred', error)
    return NextResponse.json({ error: 'internal_server_error' }, { status: 500 })
  }
}
