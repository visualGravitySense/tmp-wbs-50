import Link from 'next/link'
import EyebrowPillBadge from '@/components/EyebrowPillBadge'
import { Container } from '@/components/ui'

interface FooterLinkItem {
  label?: string
  href?: string
}

type FooterSocialPlatform = 'facebook' | 'linkedin' | 'instagram' | 'youtube' | 'x'

interface FooterSocialItem {
  platform?: FooterSocialPlatform
  url?: string
  label?: string
}

interface FooterData {
  brandBadge?: string
  brandTitle?: string
  brandDescription?: string
  servicesTitle?: string
  servicesLinks?: FooterLinkItem[]
  infoTitle?: string
  infoLinks?: FooterLinkItem[]
  contactTitle?: string
  emailLabel?: string
  email?: string
  phoneLabel?: string
  phone?: string
  locationLabel?: string
  location?: string
  registryCode?: string
  vatNumber?: string
  partnerBadgeText?: string
  partnerBadgeLink?: string
  copyrightText?: string
  bottomTagline?: string
  socialLinks?: FooterSocialItem[] | null
}

interface FooterProps {
  data?: FooterData
}

const JUHENDATUD_LOPUTOOD_FOOTER_LINK: FooterLinkItem = {
  href: '/juhendatud-loputood',
  label: 'Juhendatud lõputööd',
}

const defaultServiceLinks: FooterLinkItem[] = [
  { href: '/koolitus', label: 'Tootmisjuhtimise koolitus' },
  { href: '/about', label: 'Konsultatsioonid' },
  { href: '/product', label: 'Product Name' },
  JUHENDATUD_LOPUTOOD_FOOTER_LINK,
  { href: '/koolitus', label: 'Töötukassa koolitused' },
]

const PRIVACY_FOOTER_LINK: FooterLinkItem = {
  href: '/privacy-policy',
  label: 'Privaatsuspoliitika',
}

const GALLERY_FOOTER_LINK: FooterLinkItem = {
  href: '/galerii',
  label: 'Galerii',
}

const KONTAKT_FOOTER_LINK: FooterLinkItem = {
  href: '/kontakt',
  label: 'Kontakt',
}

const STANDARD_FOOTER_LINK: FooterLinkItem = {
  href: '/taienduskoolituse-standard',
  label: 'Täienduskoolituse standard',
}

const defaultInfoLinks: FooterLinkItem[] = [
  { href: '/about', label: 'Meist' },
  { href: '/blog', label: 'Blogi' },
  { href: '/koolitus', label: 'Programm' },
  GALLERY_FOOTER_LINK,
  STANDARD_FOOTER_LINK,
  PRIVACY_FOOTER_LINK,
  KONTAKT_FOOTER_LINK,
]

const CANONICAL_TESTIMONIALS_HREF = '/testimonials'

/** Legacy paths / CMS typos for the testimonials archive. */
const LEGACY_TESTIMONIALS_HREFS = new Set(['/tagasiside', '/arvamused'])

/** Footer “Tagasiside” must point at the canonical listing (`/testimonials`). */
function normalizeFooterLink(link: FooterLinkItem): FooterLinkItem {
  const href = (link.href ?? '').trim()
  const hrefPath = href.split(/[?#]/)[0]?.replace(/\/$/, '') || ''
  const labelNorm = (link.label ?? '').trim().toLowerCase()

  if (
    labelNorm === 'tagasiside' ||
    LEGACY_TESTIMONIALS_HREFS.has(hrefPath) ||
    hrefPath === '/tagasiside'
  ) {
    return { ...link, href: CANONICAL_TESTIMONIALS_HREF }
  }

  if (href === '#contact' || (labelNorm === 'kontakt' && hrefPath === '#contact')) {
    return { ...link, href: '/kontakt' }
  }

  return link
}

function normalizeFooterLinks(links: FooterLinkItem[]): FooterLinkItem[] {
  return links.map(normalizeFooterLink)
}

/** CMS `servicesLinks` may omit new service pages — ensure they appear in Teenused column. */
function ensureServiceColumnLinks(links: FooterLinkItem[]): FooterLinkItem[] {
  if (links.some((l) => l.href === '/juhendatud-loputood')) {
    return links
  }

  const out = [...links]
  const productIdx = out.findIndex((l) => l.href === '/product' || l.href === '/opstar-profit')
  out.splice(productIdx >= 0 ? productIdx + 1 : out.length, 0, JUHENDATUD_LOPUTOOD_FOOTER_LINK)
  return out
}

/** CMS `infoLinks` may omit gallery / legal / kontakt — ensure they appear in Info column. */
function ensureInfoColumnLinks(links: FooterLinkItem[]): FooterLinkItem[] {
  const out = [...links]
  const hasKontakt = () =>
    out.some((l) => {
      const h = (l.href ?? '').trim()
      return h === '/kontakt' || h === '#contact'
    })
  const kontaktIdx = () => out.findIndex((l) => l.href === '/kontakt' || l.href === '#contact')

  if (!out.some((l) => l.href === '/taienduskoolituse-standard')) {
    const i = kontaktIdx()
    out.splice(i >= 0 ? i : out.length, 0, STANDARD_FOOTER_LINK)
  }
  if (!out.some((l) => l.href === '/privacy-policy')) {
    const i = kontaktIdx()
    out.splice(i >= 0 ? i : out.length, 0, PRIVACY_FOOTER_LINK)
  }
  if (!out.some((l) => l.href === '/galerii')) {
    const i = kontaktIdx()
    out.splice(i >= 0 ? i : out.length, 0, GALLERY_FOOTER_LINK)
  }
  if (!hasKontakt()) {
    out.push(KONTAKT_FOOTER_LINK)
  }
  return out
}

const defaultSocialLinks: FooterSocialItem[] = [
  { platform: 'facebook', url: '#' },
  { platform: 'linkedin', url: '#' },
  { platform: 'instagram', url: '#' },
]

const SOCIAL_PLATFORM_LABELS: Record<FooterSocialPlatform, string> = {
  facebook: 'Facebook',
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
  youtube: 'YouTube',
  x: 'X',
}

function socialAriaLabel(item: FooterSocialItem) {
  const trimmed = item.label?.trim()
  if (trimmed) return trimmed
  if (item.platform && item.platform in SOCIAL_PLATFORM_LABELS) {
    return SOCIAL_PLATFORM_LABELS[item.platform]
  }
  return 'social'
}

function renderSocialIcon(platform?: FooterSocialItem['platform']) {
  if (platform === 'linkedin') {
    return (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    )
  }

  if (platform === 'instagram') {
    return (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
      </svg>
    )
  }

  if (platform === 'youtube') {
    return (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    )
  }

  if (platform === 'x') {
    return (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    )
  }

  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function resolveSocialLinks(data?: FooterData): FooterSocialItem[] {
  if (Array.isArray(data?.socialLinks)) {
    return data.socialLinks.filter((item) => item?.url?.trim())
  }
  return defaultSocialLinks
}

export function Footer({ data }: FooterProps) {
  const serviceLinks = ensureServiceColumnLinks(
    normalizeFooterLinks(
      data?.servicesLinks?.length ? data.servicesLinks : defaultServiceLinks,
    ),
  )
  const infoLinks = ensureInfoColumnLinks(
    normalizeFooterLinks(data?.infoLinks?.length ? data.infoLinks : defaultInfoLinks),
  )
  const socialLinks = resolveSocialLinks(data)
  const partnerBadgeText = data?.partnerBadgeText || 'PRODUCT FRAMEWORK'
  const partnerBadgeLink = data?.partnerBadgeLink?.trim()

  return (
    <footer className="footer-wrapper relative overflow-hidden border-t border-[var(--border)]/70 bg-gradient-to-b from-[rgb(var(--bg-secondary))] via-[rgb(var(--bg-tertiary))] to-[rgb(var(--bg-primary))] text-[rgb(var(--text-primary))]">
      <div className="absolute inset-0">
        <div className="footer-glow-1 absolute left-[16%] top-0 h-96 w-96 rounded-full bg-blue-200/15 blur-[120px] dark:bg-blue-600/10" />
        <div className="footer-glow-2 absolute bottom-0 right-[16%] h-96 w-96 rounded-full bg-indigo-200/15 blur-[120px] dark:bg-indigo-600/10" />
        <div className="footer-glow-radial absolute inset-0 bg-[radial-gradient(75%_60%_at_50%_0%,rgba(59,130,246,0.08),transparent_70%)]" />
      </div>

      <Container size="6xl" elevated className="py-14 sm:py-16 lg:py-20">
        <div className="footer-panel rounded-[1.6rem] border border-[var(--border)]/70 bg-[rgb(var(--bg-primary))]/55 p-5 shadow-[0_30px_80px_-45px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:rounded-[2rem] sm:p-8 md:p-10">
          <div className="mb-10 grid gap-8 sm:mb-12 sm:gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <EyebrowPillBadge
                text={data?.brandBadge || 'Site Name'}
                className="mb-4 sm:mb-6"
              />
              <h3 className="mb-3 text-2xl font-black tracking-[-0.03em] sm:mb-4 sm:text-3xl">
                {data?.brandTitle || 'Site Name'}
              </h3>
              <p className="max-w-md text-sm leading-relaxed text-[rgb(var(--text-secondary))] sm:text-[15px]">
                {data?.brandDescription ||
                  'Eesti juhtiv tootmisjuhtimise koolitus. Aitame tehaseid saavutada uue taseme toimimist läbi praktilise koolituse ja personaalse mentorluse.'}
              </p>

              <div className="mt-6 flex gap-2.5 sm:mt-7 sm:gap-3">
                {socialLinks.map((item, index) => (
                  <a
                    key={`${item.platform || 'social'}-${index}`}
                    href={item.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-btn flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-white/50 text-[rgb(var(--text-primary))] transition-all hover:-translate-y-0.5 hover:border-blue-300/50 hover:bg-white/80 dark:bg-white/10 dark:hover:bg-white/20 sm:h-10 sm:w-10"
                    aria-label={socialAriaLabel(item)}
                  >
                    {renderSocialIcon(item.platform)}
                  </a>
                ))}
              </div>
            </div>

            <div className="grid gap-7 sm:gap-8 md:grid-cols-2 lg:col-span-4">
              <div>
                <h4 className="mb-5 text-xs font-black uppercase tracking-[0.18em] text-[rgb(var(--text-secondary))]">
                  {data?.servicesTitle || 'Teenused'}
                </h4>
                <ul className="space-y-3">
                  {serviceLinks.map((link, index) => (
                    <li key={`${link.label || 'service'}-${index}`}>
                      <Link href={link.href || '#'} className="footer-link block py-0.5 text-sm font-medium text-[rgb(var(--text-primary))] transition-colors hover:text-blue-600">
                        {link.label || 'Link'}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-5 text-xs font-black uppercase tracking-[0.18em] text-[rgb(var(--text-secondary))]">
                  {data?.infoTitle || 'Info'}
                </h4>
                <ul className="space-y-3">
                  {infoLinks.map((link, index) => (
                    <li key={`${link.label || 'info'}-${index}`}>
                      {link.href?.startsWith('#') ? (
                        <a href={link.href} className="footer-link block py-0.5 text-sm font-medium text-[rgb(var(--text-primary))] transition-colors hover:text-blue-600">
                          {link.label || 'Link'}
                        </a>
                      ) : (
                        <Link href={link.href || '#'} className="footer-link block py-0.5 text-sm font-medium text-[rgb(var(--text-primary))] transition-colors hover:text-blue-600">
                          {link.label || 'Link'}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="min-w-0 rounded-2xl border border-[var(--border)]/70 bg-[rgb(var(--bg-secondary))]/60 p-5 sm:p-6 lg:col-span-3">
              <h4 className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-[rgb(var(--text-secondary))]">
                {data?.contactTitle || 'Kontakt'}
              </h4>
              <div className="min-w-0 space-y-2.5 text-sm text-[rgb(var(--text-secondary))]">
                <p className="min-w-0">
                  <span className="font-semibold text-[rgb(var(--text-primary))]">
                    {data?.emailLabel || 'Email:'}
                  </span>{' '}
                  <a
                    href={`mailto:${data?.email || 'hello@example.com'}`}
                    className="footer-contact-link break-all underline-offset-2 transition-colors hover:text-blue-600 hover:underline"
                  >
                    {data?.email || 'hello@example.com'}
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-[rgb(var(--text-primary))]">
                    {data?.phoneLabel || 'Telefon:'}
                  </span>{' '}
                  <a
                    href={`tel:${(data?.phone || '+3720000000').replace(/\s+/g, '')}`}
                    className="footer-contact-link underline-offset-2 transition-colors hover:text-blue-600 hover:underline"
                  >
                    {data?.phone || '+372 000 0000'}
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-[rgb(var(--text-primary))]">
                    {data?.locationLabel || 'Asukoht:'}
                  </span>{' '}
                  {data?.location || 'Tartu 11/Lossi 29, 71004 Viljandi'}
                </p>
                {(data?.registryCode || '12736663') && (
                  <p>
                    <span className="font-semibold text-[rgb(var(--text-primary))]">
                      Registrikood:
                    </span>{' '}
                    {data?.registryCode || '12736663'}
                  </p>
                )}
                {(data?.vatNumber || 'EE101854744') && (
                  <p>
                    <span className="font-semibold text-[rgb(var(--text-primary))]">
                      KMKR number:
                    </span>{' '}
                    {data?.vatNumber || 'EE101854744'}
                  </p>
                )}
              </div>
              {partnerBadgeLink ? (
                <Link
                  href={partnerBadgeLink}
                  className="footer-partner-badge mt-5 block rounded-xl border border-emerald-300/35 bg-emerald-500/10 px-3 py-2 text-center text-[10px] font-black uppercase tracking-[0.14em] text-emerald-700 transition-colors hover:bg-emerald-500/20 dark:text-emerald-300"
                >
                  {partnerBadgeText}
                </Link>
              ) : (
                <div className="footer-partner-badge mt-5 rounded-xl border border-emerald-300/35 bg-emerald-500/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">
                  {partnerBadgeText}
                </div>
              )}
            </div>
          </div>

          <div className="footer-divider border-t border-[var(--border)]/70 pt-5 sm:pt-6">
            <div className="flex flex-col items-center justify-between gap-2.5 text-center md:flex-row md:text-left">
              <p className="text-xs font-medium text-[rgb(var(--text-secondary))]">
                {data?.copyrightText || '\u00A9 2026 Site Name. All rights reserved.'}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[rgb(var(--text-secondary))] sm:tracking-[0.16em]">
                {data?.bottomTagline || 'Built for practical manufacturing leadership'}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
