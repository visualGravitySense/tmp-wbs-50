import { MARKETING_SECTIONS_QUERY } from '@/lib/sanity/marketingSectionsQuery'

export const EDU_STANDARDS_PAGE_QUERY = `
  *[_type == "eduStandardsPage" && _id == "eduStandardsPage"][0]{
    title,
    ${MARKETING_SECTIONS_QUERY}
    seo,
    eyebrow,
    pageTitle,
    pageTitleAccent,
    lastUpdated,
    lastUpdatedPrefix,
    backLinkLabel,
    backLinkPath,
    body
  }
`
