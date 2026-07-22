import { MAIN_PAGE_FILTER } from '@/lib/sanity/mainPageFilter'

/** Same `finalCTA` object as on the home page (`mainPage`); fetch alone to avoid loading the full main page query. */
export const MAIN_PAGE_FINAL_CTA_QUERY = `*[${MAIN_PAGE_FILTER}][0]{
  finalCTA{
    title,
    subtitle,
    nextGroupInfo,
    spotsInfo,
    supportInfo,
    supportPrefix,
    primaryButtonText,
    primaryButtonLink,
    secondaryButtonText,
    secondaryButtonLink,
    footerText
  }
}`
