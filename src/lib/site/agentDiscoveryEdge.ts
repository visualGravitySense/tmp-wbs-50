import { getSiteUrl } from '@/lib/site/siteUrl'

/** Edge-safe helpers for middleware (no Node.js built-ins). */

export function markdownForPath(pathname: string): string | null {
  if (pathname !== '/') return null

  const siteUrl = getSiteUrl()
  return `# Site Name

Training, consulting, and product resources.

## Main pages

- [Training](${siteUrl}/koolitus)
- [Product](${siteUrl}/product)
- [About](${siteUrl}/about)
- [Blog](${siteUrl}/blog)
- [Contact](${siteUrl}/kontakt)
- [Register](${siteUrl}/register)

## Discovery

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
