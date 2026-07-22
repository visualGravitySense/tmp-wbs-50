import { getSiteUrl } from '@/lib/site/siteUrl'

/** Edge-safe helpers for middleware (no Node.js built-ins). */

export function markdownForPath(pathname: string): string | null {
  if (pathname !== '/') return null

  const siteUrl = getSiteUrl()
  return `# Tootmisjuhtimine.ee

Andres Kase — LEAN, TPS ja OPSTAR PROFIT™ koolitused ning konsultatsioon tootmisettevõtetele.

## Peamised lehed

- [Koolitus](${siteUrl}/koolitus)
- [OPSTAR Profit](${siteUrl}/opstar-profit)
- [Andres Kase](${siteUrl}/andres-kase)
- [Blogi](${siteUrl}/blog)
- [Kontakt](${siteUrl}/kontakt)
- [Registreerimine](${siteUrl}/register)

## Avastamine

- Sitemap: ${siteUrl}/sitemap.xml
- API catalog: ${siteUrl}/.well-known/api-catalog
- Agent skills: ${siteUrl}/.well-known/agent-skills/index.json
`
}

export function homepageLinkHeaderValue(): string {
  return [
    '</.well-known/api-catalog>; rel="api-catalog"',
    '</.well-known/agent-skills/index.json>; rel="agent-skills"',
    '</sitemap.xml>; rel="sitemap"',
    '</robots.txt>; rel="robots"',
    '</auth.md>; rel="author"',
  ].join(', ')
}
