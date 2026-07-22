const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type SmailyContactInput = {
  email: string
  /** @deprecated Opt-in flow handles subscription; kept for call-site compatibility */
  marketingOptOut?: boolean
  customFields?: Record<string, string>
}

export type SmailyUpsertResult =
  | { ok: true; code?: number }
  | { ok: false; reason: 'not_configured' | 'invalid_email' | 'api_error'; status?: number; body?: string }

export type SmailyFormData = {
  email: string
  name?: string
  [key: string]: string | undefined
}

function smailyDomain(): string | null {
  const domain = (
    process.env.SMAILY_DOMAIN ||
    process.env.SMAILY_SUBDOMAIN ||
    process.env.SMAILY_API_USER
  )?.trim()
  return domain || null
}

function smailyOptInEnv() {
  return {
    domain: smailyDomain(),
    key: process.env.SMAILY_API_KEY?.trim(),
    autoresponderId: process.env.SMAILY_AUTORESPONDER_ID?.trim(),
    successUrl: process.env.SMAILY_SUCCESS_URL?.trim(),
    failureUrl: process.env.SMAILY_FAILURE_URL?.trim(),
  }
}

/**
 * Smaily double opt-in — POST /api/opt-in/ (not contact.php).
 *
 * Server-only env:
 * - SMAILY_DOMAIN — subdomain only (fallback: SMAILY_SUBDOMAIN, SMAILY_API_USER)
 * - SMAILY_API_KEY — Settings → API
 * - SMAILY_AUTORESPONDER_ID — Automations → opt-in workflow ID (recommended)
 * - SMAILY_SUCCESS_URL / SMAILY_FAILURE_URL — redirect after confirm/fail
 */
export async function subscribeToSmaily(formData: SmailyFormData): Promise<{ ok: true }> {
  const { domain, key } = smailyOptInEnv()
  const autoresponderId = process.env.SMAILY_AUTORESPONDER_ID

  const apiUser = process.env.SMAILY_API_USER?.trim() || domain
  const apiKey = process.env.SMAILY_API_KEY?.trim() || key

  if (!domain || !apiKey || !apiUser) {
    throw new Error('Smaily env variables not configured')
  }

  const entries = Object.entries(formData).filter(
    (entry): entry is [string, string] => entry[1] !== undefined && entry[1] !== '',
  )
  const fieldMap = Object.fromEntries(entries)
  const source = fieldMap.source?.trim() || 'web'
  const email = fieldMap.email?.trim().toLowerCase()

  if (!email) {
    throw new Error('Email is required for Smaily subscription')
  }

  const { source: _source, email: _email, ...restFields } = fieldMap

  const now = new Date()
  // Format as YYYY-MM-DD HH:mm:ss in Estonian local time (UTC+3 or dynamic offset)
  const offsetMs = now.getTimezoneOffset() * 60 * 1000
  const localDate = new Date(now.getTime() - offsetMs)
  const kuupäev = localDate.toISOString().replace('T', ' ').substring(0, 19)

  const payload = {
    email: email,
    autoresponder: autoresponderId ? parseInt(autoresponderId, 10) : undefined,
    attributes: {
      source,
      // Smaily Support demands 'Opt-in üle api' - force status and record consent date
      is_subscribed: '1',
      is_unsubscribed: '0',
      opt_in: '1',
      kuupäev,
      ...restFields,
    }
  }

  const authHeader = 'Basic ' + Buffer.from(`${apiUser}:${apiKey}`).toString('base64')

  const res = await fetch(`https://${domain}.sendsmaily.net/api/contact.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authHeader,
    },
    body: JSON.stringify(payload),
  })

  let smailyData: any = null
  try {
    const textBody = await res.text()
    smailyData = JSON.parse(textBody)
  } catch (err) {
    // fallback if not JSON or parsing fails
  }

  console.log("Smaily API Full Raw Response:", JSON.stringify(smailyData, null, 2));

  if (!res.ok) {
    throw new Error(`Smaily subscriber update failed: ${res.status} ${JSON.stringify(smailyData)}`)
  }

  return { ok: true }
}

/** @deprecated Use subscribeToSmaily; kept for existing API routes. */
export async function upsertSmailyContact(input: SmailyContactInput): Promise<SmailyUpsertResult> {
  const email = input.email.trim().toLowerCase()
  if (!EMAIL_RE.test(email)) {
    return { ok: false, reason: 'invalid_email' }
  }

  const { domain, key, successUrl, failureUrl } = smailyOptInEnv()
  if (!domain || !key || !successUrl || !failureUrl) {
    return { ok: false, reason: 'not_configured' }
  }

  const formData: SmailyFormData = {
    email,
    ...Object.fromEntries(
      Object.entries(input.customFields ?? {}).map(([k, v]) => [k, String(v).slice(0, 500)]),
    ),
  }

  try {
    await subscribeToSmaily(formData)
    return { ok: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    const statusMatch = message.match(/failed: (\d+)/)
    const status = statusMatch ? Number(statusMatch[1]) : undefined
    const body = message.replace(/^Smaily (?:opt-in|subscriber update) failed: \d+\s*/, '')
    return { ok: false, reason: 'api_error', status, body: body || message }
  }
}
