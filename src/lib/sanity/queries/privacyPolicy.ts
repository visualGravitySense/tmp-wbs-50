import { MARKETING_SECTIONS_QUERY } from '@/lib/sanity/marketingSectionsQuery'

export const PRIVACY_POLICY_PAGE_QUERY = `
  *[_type == "privacyPolicyPage" && _id == "privacyPolicyPage"][0]{
    title,
    ${MARKETING_SECTIONS_QUERY}
    seo,
    eyebrow,
    pageTitle,
    lastUpdated,
    lastUpdatedPrefix,
    backLinkLabel,
    backLinkPath,
    body
  }
`
