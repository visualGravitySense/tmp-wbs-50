import {
  defineDocuments,
  defineLocations,
  type PresentationPluginOptions,
} from 'sanity/presentation'

/** Maps preview URLs → primary document so Presentation opens the right editor (e.g. `/` → main page singleton). */
const mainDocuments = defineDocuments([
  {
    route: '/',
    /** Singleton id from `structure.ts` (`documentId('mainPage')`). */
    filter: `_type == "mainPage" && _id == "mainPage"`,
  },
  {
    route: '/koolitus',
    filter: `_type == "koolitusPage" && _id == "koolitusPage"`,
  },
  {
    route: '/opstar-profit',
    filter: `_type == "opstarProfit"`,
  },
  {
    route: '/andres-kase',
    filter: `_type == "aboutPage"`,
  },
  {
    route: '/kontakt',
    filter: `_type == "kontaktPage" && _id == "kontaktPage"`,
  },
  {
    route: '/taienduskoolituse-standard',
    filter: `_type == "eduStandardsPage" && _id == "eduStandardsPage"`,
  },
])

export const resolve: PresentationPluginOptions['resolve'] = {
  mainDocuments,
  locations: {
    mainPage: defineLocations({
      select: { title: 'title' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || 'Avaleht', href: '/' },
          { title: 'Sanity Studio', href: '/studio' },
        ],
      }),
    }),
    aboutPage: defineLocations({
      select: { title: 'title', headline: 'hero.headline' },
      resolve: (doc) => ({
        locations: [
          {
            title:
              (doc?.headline as string)?.trim() ||
              (doc?.title as string)?.trim() ||
              'Andres Kase',
            href: '/andres-kase',
          },
        ],
      }),
    }),
    post: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Blogi postitus',
            href: doc?.slug ? `/blog/${doc.slug}` : '/blog',
          },
          { title: 'Blogi', href: '/blog' },
        ],
      }),
    }),
    blogPage: defineLocations({
      select: { title: 'title' },
      resolve: (doc) => ({
        locations: [
          { title: (doc?.title as string) || 'Blogi', href: '/blog' },
        ],
      }),
    }),
    privacyPolicyPage: defineLocations({
      select: { title: 'title' },
      resolve: (doc) => ({
        locations: [
          {
            title: (doc?.title as string) || 'Privaatsuspoliitika',
            href: '/privacy-policy',
          },
        ],
      }),
    }),
    eduStandardsPage: defineLocations({
      select: { title: 'title' },
      resolve: (doc) => ({
        locations: [
          {
            title: (doc?.title as string) || 'Täienduskoolituse standard',
            href: '/taienduskoolituse-standard',
          },
        ],
      }),
    }),
    koolitusPage: defineLocations({
      select: { title: 'title' },
      resolve: (doc) => ({
        locations: [
          { title: (doc?.title as string) || 'Koolitus', href: '/koolitus' },
        ],
      }),
    }),
    opstarProfit: defineLocations({
      select: { title: 'title' },
      resolve: (doc) => ({
        locations: [
          {
            title: (doc?.title as string) || 'Opstar Profit',
            href: '/opstar-profit',
          },
        ],
      }),
    }),
    galleryPage: defineLocations({
      select: { title: 'title' },
      resolve: (doc) => ({
        locations: [
          { title: (doc?.title as string) || 'Galerii', href: '/galerii' },
        ],
      }),
    }),
    juhendatudLoputoodPage: defineLocations({
      select: { title: 'title' },
      resolve: (doc) => ({
        locations: [
          {
            title: (doc?.title as string) || 'Juhendatud lõputööd',
            href: '/juhendatud-loputood',
          },
        ],
      }),
    }),
    kontaktPage: defineLocations({
      select: { title: 'title', pageTitle: 'hero.pageTitle' },
      resolve: (doc) => ({
        locations: [
          {
            title: (doc?.pageTitle as string) || (doc?.title as string) || 'Kontakt',
            href: '/kontakt',
          },
        ],
      }),
    }),
    page: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Leht',
            href: doc?.slug ? `/${doc.slug}` : '/',
          },
        ],
      }),
    }),
  },
}
