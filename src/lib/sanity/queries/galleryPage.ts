import { MARKETING_SECTIONS_QUERY } from '@/lib/sanity/marketingSectionsQuery'

export const GALLERY_PAGE_QUERY = `
  *[_type == "galleryPage" && _id == "galleryPage"][0]{
    title,
    ${MARKETING_SECTIONS_QUERY}
    seo,
    pillText,
    pageTitle,
    description,
    heroImage,
    "orderedCategories": select(
      count(orderedCategories) > 0 => orderedCategories[]->{
        _id,
        title
      },
      *[_type == "galleryCategory"] | order(title asc) {
        _id,
        title
      }
    ),
    images[]{
      ...,
      asset->{
        ...,
        "blurDataURL": metadata.lqip
      },
      categories[]->{
        _id,
        title
      }
    }
  }
`
