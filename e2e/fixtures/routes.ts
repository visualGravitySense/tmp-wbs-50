/** Public marketing routes for smoke / SEO e2e. */
export type PublicRoute = {
  id: string
  path: string
  label: string
  /** Included in `src/app/sitemap.ts` via PUBLIC_MARKETING_PATHS */
  inSitemap: boolean
}

export const PUBLIC_PAGE_ROUTES: readonly PublicRoute[] = [
  { id: 'ST-01', path: '/', label: 'Main Page', inSitemap: true },
  { id: 'ST-02', path: '/about', label: 'About Page', inSitemap: true },
  { id: 'ST-03', path: '/blog', label: 'Blog Page', inSitemap: true },
  { id: 'ST-04', path: '/galerii', label: 'Gallery Page', inSitemap: true },
  { id: 'ST-05', path: '/kontakt', label: 'Contact Page', inSitemap: true },
  { id: 'ST-06', path: '/koolitus', label: 'Training Page', inSitemap: true },
  { id: 'ST-07', path: '/product', label: 'Product Page', inSitemap: true },
  { id: 'ST-08', path: '/privacy-policy', label: 'Privacy Policy', inSitemap: true },
  { id: 'ST-09', path: '/register', label: 'Register Page', inSitemap: true },
  { id: 'ST-10', path: '/testimonials', label: 'Testimonials Page', inSitemap: true },
] as const

export const SITEMAP_PATHS = PUBLIC_PAGE_ROUTES.filter((route) => route.inSitemap).map(
  (route) => route.path,
)
