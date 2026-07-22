import { MAIN_PAGE_FILTER } from '@/lib/sanity/mainPageFilter'

/** About trainer block from main page — reused on /koolitus extended trainer bio. */
export const MAIN_PAGE_ABOUT_ANDRES_QUERY = `
  *[${MAIN_PAGE_FILTER}][0] {
    aboutAndres {
      eyebrow,
      title,
      subtitle,
      quote,
      description,
      tags,
      stats {
        value,
        label
      },
      certificationLink,
      mainImage {
        asset->,
        alt
      },
      overlayImage {
        asset->,
        alt
      },
      overlayImage2 {
        asset->,
        alt
      }
    }
  }
`
