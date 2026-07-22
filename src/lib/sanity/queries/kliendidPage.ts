import { groq } from 'next-sanity'
import { MARKETING_SECTIONS_QUERY } from '@/lib/sanity/marketingSectionsQuery'

export const KLIENDID_PAGE_QUERY = groq`
  {
    "page": *[_type == "kliendidPage"][0] {
      title,
      ${MARKETING_SECTIONS_QUERY}
    },
    "settings": *[_type == "siteSettings"][0] {},
    "clients": *[_type == "partnerLogo"] | order(order asc) {
      _id,
      name,
      displayType,
      logo {
        _type,
        alt,
        asset {
          _ref,
          _type
        }
      },
      url,
      order,
      industry,
      country
    }
  }
`
