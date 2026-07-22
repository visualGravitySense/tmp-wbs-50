import { MAIN_PAGE_FILTER } from '@/lib/sanity/mainPageFilter'

/** Same `partners` list as main page LogoMarquee (`mainPage.partners` dereferenced). */
export const MAIN_PAGE_PARTNERS_QUERY = `
  *[${MAIN_PAGE_FILTER}][0]{
    partners[]->{
      _id,
      name,
      displayType,
      logo,
      url,
      order
    }
  }
`
