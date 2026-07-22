/** Shared contact & business data (footer, contact page, privacy references). */
export const BUSINESS_CONTACT = {
  personName: 'Your Name',
  personRole: 'Your role / title',
  brandLine: 'example.com',
  frameworkName: 'Product Name',
  frameworkTagline: 'Your product or service tagline',
  emails: [
    { label: 'General', address: 'hello@example.com' },
    { label: 'Sales', address: 'hello@example.com' },
  ],
  phoneDisplay: '+372 000 0000',
  phoneTel: '+3720000000',
  address: {
    street: 'Street Address',
    postalCode: '00000',
    city: 'City',
    country: 'Country',
    full: 'Street Address, 00000 City',
  },
  responseNote: 'We typically respond within 24 hours on business days.',
  mapQuery: 'City Country',
} as const

export const BUSINESS_LINKS = {
  register: '/register',
  koolitus: '/koolitus',
  about: '/about',
  opstar: '/product',
  blog: '/blog',
  gallery: '/galerii',
  testimonials: '/testimonials',
  privacy: '/privacy-policy',
} as const

export function mapsUrl(query: string = BUSINESS_CONTACT.mapQuery) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}
