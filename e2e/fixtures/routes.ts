/** Public marketing routes covered by doc/QA Test Plan.md (sections 1–2). */
export type PublicRoute = {
  id: string
  path: string
  label: string
  /** Included in `src/app/sitemap.ts` via PUBLIC_MARKETING_PATHS */
  inSitemap: boolean
}

export const PUBLIC_PAGE_ROUTES: readonly PublicRoute[] = [
  { id: 'ST-01', path: '/', label: 'Main Page', inSitemap: true },
  { id: 'ST-02', path: '/andres-kase', label: 'About Page', inSitemap: true },
  { id: 'ST-03', path: '/blog', label: 'Blog Page', inSitemap: true },
  { id: 'ST-04', path: '/galerii', label: 'Gallery Page', inSitemap: true },
  {
    id: 'ST-05',
    path: '/juhendatud-loputood',
    label: 'Thesis Page',
    inSitemap: false,
  },
  { id: 'ST-06', path: '/kontakt', label: 'Contact Page', inSitemap: true },
  { id: 'ST-07', path: '/koolitus', label: 'Training Page', inSitemap: true },
  { id: 'ST-08', path: '/opstar-profit', label: 'Opstar Profit Page', inSitemap: true },
  { id: 'ST-09', path: '/privacy-policy', label: 'Privacy Policy', inSitemap: true },
  { id: 'ST-10', path: '/register', label: 'Register Page', inSitemap: true },
  { id: 'ST-11', path: '/testimonials', label: 'Testimonials Page', inSitemap: true },
  {
    id: 'ST-12',
    path: '/taienduskoolituse-standard',
    label: 'Education Standard Page',
    inSitemap: true,
  },
] as const

export const SITEMAP_PATHS = PUBLIC_PAGE_ROUTES.filter((route) => route.inSitemap).map(
  (route) => route.path,
)
