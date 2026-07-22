import { MARKETING_SECTIONS_QUERY } from '@/lib/sanity/marketingSectionsQuery'

export const JUHENDATUD_LOPUTOOD_PAGE_QUERY = `
  *[_type == "juhendatudLoputoodPage" && _id == "juhendatudLoputoodPage"][0]{
    title,
    ${MARKETING_SECTIONS_QUERY}
    seo
  }
`
