import { createHash } from 'node:crypto'
import { getSiteUrl } from '@/lib/site/siteUrl'

/** Static marketing routes included in sitemap and agent discovery. */
export const PUBLIC_MARKETING_PATHS = [
  '/',
  '/koolitus',
  '/opstar-profit',
  '/andres-kase',
  '/kontakt',
  '/blog',
  '/register',
  '/testimonials',
  '/galerii',
  '/tagasiside',
  '/privacy-policy',
  '/taienduskoolituse-standard',
] as const

function sha256Digest(content: string): string {
  return `sha256:${createHash('sha256').update(content, 'utf8').digest('hex')}`
}

export function agentSkillsIndex() {
  const siteUrl = getSiteUrl()
  const skills = [
    {
      name: 'sitemap',
      type: 'discovery',
      description: 'XML sitemap of canonical public URLs for this site.',
      url: `${siteUrl}/sitemap.xml`,
    },
    {
      name: 'robots',
      type: 'discovery',
      description: 'Crawler and AI content-signal policy for this site.',
      url: `${siteUrl}/robots.txt`,
    },
    {
      name: 'api-catalog',
      type: 'discovery',
      description: 'RFC 9727 linkset of public site resources and documentation entry points.',
      url: `${siteUrl}/.well-known/api-catalog`,
    },
    {
      name: 'auth',
      type: 'documentation',
      description: 'Authentication and agent access policy for this public marketing site.',
      url: `${siteUrl}/auth.md`,
    },
  ].map((skill) => ({
    ...skill,
    digest: sha256Digest(`${skill.name}:${skill.url}`),
  }))

  return {
    $schema: 'https://agentskills.io/schemas/discovery/v0.2.0/index.schema.json',
    site: siteUrl,
    skills,
  }
}

export function apiCatalogLinkset() {
  const siteUrl = getSiteUrl()

  const pages = [
    { path: '/', title: 'Home' },
    { path: '/koolitus', title: 'Koolitus' },
    { path: '/opstar-profit', title: 'OPSTAR Profit' },
    { path: '/andres-kase', title: 'Andres Kase' },
    { path: '/kontakt', title: 'Kontakt' },
    { path: '/blog', title: 'Blogi' },
    { path: '/register', title: 'Registreerimine' },
  ]

  return {
    linkset: pages.map(({ path, title }) => ({
      anchor: `${siteUrl}${path === '/' ? '' : path}`,
      'service-doc': [
        {
          href: `${siteUrl}${path === '/' ? '' : path}`,
          title,
          type: 'text/html',
        },
      ],
      status: [{ href: `${siteUrl}/api/health`, type: 'application/health+json' }],
    })),
  }
}
