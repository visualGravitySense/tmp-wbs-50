import { MARKETING_SECTIONS_QUERY } from '@/lib/sanity/marketingSectionsQuery'

/** Singleton `kontaktPage`; fallback to newest doc if Studio created a random _id. */
export const KONTAKT_PAGE_QUERY = `
  coalesce(
    *[_type == "kontaktPage" && _id == "kontaktPage"][0],
    *[_type == "kontaktPage"] | order(_updatedAt desc)[0]
  ){
    title,
    ${MARKETING_SECTIONS_QUERY}
    seo,
    hero,
    quickContact,
    messageForm,
    andresBlock,
    opstarBlock,
    servicesSection,
    legalNote
  }
`
