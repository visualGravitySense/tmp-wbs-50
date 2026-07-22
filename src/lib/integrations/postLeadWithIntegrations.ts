import {
  type LeadIntegrationsResponse,
  warnSmailyIntegrationsInConsole,
} from '@/lib/integrations/leadResponse'

function isLeadIntegrationsResponse(data: unknown): data is LeadIntegrationsResponse {
  if (!data || typeof data !== 'object') return false
  const o = data as Record<string, unknown>
  if (o.ok !== true) return false
  const integrations = o.integrations
  if (!integrations || typeof integrations !== 'object') return false
  const i = integrations as Record<string, unknown>
  return typeof i.telegram === 'string' && typeof i.smaily === 'string'
}

/**
 * POST lead API; HTTP error → throw. HTTP 200 + integrations → Console hoiatus, kui Smaily ebaõnnestus.
 */
export async function postLeadWithIntegrations(
  url: string,
  source: string,
  body: Record<string, unknown>,
): Promise<void> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const data = (await res.json().catch(() => null)) as
    | LeadIntegrationsResponse
    | { error?: string }
    | null

  if (!res.ok) {
    const err = new Error(
      data && typeof data === 'object' && 'error' in data && typeof data.error === 'string'
        ? data.error
        : 'request_failed',
    )
    ;(err as Error & { status?: number }).status = res.status
    throw err
  }

  if (isLeadIntegrationsResponse(data)) {
    warnSmailyIntegrationsInConsole(source, data)
  }
}
