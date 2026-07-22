import { getSiteUrl } from '@/lib/site/siteUrl'

export const revalidate = 3600

export function GET() {
  const siteUrl = getSiteUrl()

  const body = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

Disallow: /studio
Disallow: /api/
Disallow: /_next/

# AI / crawler content preferences (Content Signals)
# https://contentsignals.org/
Content-Signal: ai-train=no, search=yes, ai-input=no

Sitemap: ${siteUrl}/sitemap.xml
Host: ${siteUrl.replace(/^https?:\/\//, '')}
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
