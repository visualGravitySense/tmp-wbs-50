export type IntegrationWireStatus =
  | 'ok'
  | 'failed'
  | 'skipped_no_email'
  | 'not_configured'

export type LeadIntegrationsResponse = {
  ok: true
  integrations: {
    telegram: IntegrationWireStatus
    smaily: IntegrationWireStatus
  }
  /** Ainult dev — Smaily vea põhjus (ilma salajaseta). */
  debug?: { smaily?: string }
}

export function leadIntegrationsResponse(input: {
  telegramConfigured: boolean
  telegramOk: boolean
  smailyConfigured: boolean
  smailyAttempted: boolean
  smailyOk: boolean
  smailyDebug?: string
}): LeadIntegrationsResponse {
  const telegram: IntegrationWireStatus = !input.telegramConfigured
    ? 'not_configured'
    : input.telegramOk
      ? 'ok'
      : 'failed'

  let smaily: IntegrationWireStatus
  if (!input.smailyAttempted) {
    smaily = 'skipped_no_email'
  } else if (!input.smailyConfigured) {
    smaily = 'not_configured'
  } else if (input.smailyOk) {
    smaily = 'ok'
  } else {
    smaily = 'failed'
  }

  const body: LeadIntegrationsResponse = { ok: true, integrations: { telegram, smaily } }
  if (input.smailyDebug && smaily === 'failed') {
    body.debug = { smaily: input.smailyDebug }
  }
  return body
}

/** Brauseri Console — kui CRM-i sync ebaõnnestus, aga vorm näitas edu. */
export function warnSmailyIntegrationsInConsole(
  source: string,
  payload: LeadIntegrationsResponse,
): void {
  if (typeof window === 'undefined') return

  const { integrations, debug } = payload

  if (integrations.smaily === 'failed') {
    console.warn(
      `[${source}] Smaily CRM ei saanud kontakti.`,
      debug?.smaily ?? integrations.smaily,
    )
    return
  }

  if (integrations.smaily === 'ok') {
    console.info(`[${source}] ✅ Smaily CRM — kontakt salvestatud.`)
    return
  }

  if (integrations.smaily === 'skipped_no_email') {
    console.info(`[${source}] ℹ️ Smaily CRM — vahele jäetud (e-posti aadressi pole).`)
    return
  }

  if (process.env.NODE_ENV === 'development' && integrations.smaily === 'not_configured') {
    console.warn(
      `[${source}] Smaily CRM pole seadistatud (SMAILY_DOMAIN / SMAILY_API_KEY / SMAILY_SUCCESS_URL / SMAILY_FAILURE_URL).`,
    )
  }
}
