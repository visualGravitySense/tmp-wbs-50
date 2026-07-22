import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

/**
 * Some datasets / API-imported docs are only visible to authenticated reads.
 * Use a read token on the server only (never NEXT_PUBLIC_* — must not ship to the browser).
 */
function serverReadToken(): string | undefined {
  if (typeof window !== 'undefined') return undefined
  const t = (process.env.SANITY_API_READ_TOKEN || process.env.SANITY_AUTH_TOKEN || '').trim()
  return t || undefined
}

const readToken = serverReadToken()

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  ...(readToken ? { token: readToken } : {}),
})

const builder = createImageUrlBuilder(client)

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

export function urlFor(source: any) {
  return builder.image(source)
}

export default client
