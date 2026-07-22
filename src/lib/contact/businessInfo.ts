/** Ühised kontakt- ja äriandmed (jalus, kontaktileht, privaatsuspoliitika viited). */
export const BUSINESS_CONTACT = {
  personName: 'Andres Kase',
  personRole: 'Tootmisjuhtimise koolitaja ja konsultant',
  brandLine: 'tootmisjuhtimine.ee',
  frameworkName: 'OPSTAR PROFIT™',
  frameworkTagline: 'Tootmisjuhtimise raamistik Eesti ettevõtetele',
  emails: [
    { label: 'Üldine', address: 'andreskase@tootmisjuhtimine.ee' },
    { label: 'Koolitus ja pakkumised', address: 'andres@tootmisjuhtimine.ee' },
  ],
  phoneDisplay: '+372 51 38 403',
  phoneTel: '+3725138403',
  address: {
    street: 'Tartu 11 / Lossi 29',
    postalCode: '71004',
    city: 'Viljandi',
    country: 'Eesti',
    full: 'Tartu 11/Lossi 29, 71004 Viljandi',
  },
  responseNote: 'Vastame tavaliselt 24 tunni jooksul tööpäevadel.',
  mapQuery: 'Tartu 11 Lossi 29 Viljandi Eesti',
} as const

export const BUSINESS_LINKS = {
  register: '/register',
  koolitus: '/koolitus',
  about: '/andres-kase',
  opstar: '/opstar-profit',
  blog: '/blog',
  gallery: '/galerii',
  testimonials: '/testimonials',
  privacy: '/privacy-policy',
} as const

export function mapsUrl(query: string = BUSINESS_CONTACT.mapQuery) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}
