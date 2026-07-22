/**
 * Preview site origin for Presentation — must match the URL where `next dev` runs.
 * In the browser we always use `window.location.origin` so Studio preview matches
 * the active port (3000, 3001, …).
 */
export function getPreviewOrigin(): string {
  if (typeof window !== 'undefined') {
    return window.location.origin.replace(/\/$/, '')
  }

  const fromEnv =
    process.env.SANITY_STUDIO_PREVIEW_ORIGIN ||
    process.env.NEXT_PUBLIC_SITE_URL

  if (fromEnv) {
    return fromEnv.replace(/\/$/, '')
  }

  return 'http://localhost:3000'
}
