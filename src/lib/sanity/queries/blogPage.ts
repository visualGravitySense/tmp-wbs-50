import { MARKETING_SECTIONS_QUERY } from '@/lib/sanity/marketingSectionsQuery'
import { singletonPageFilter } from '@/lib/sanity/singletonPageFilters'

const NEWSLETTER_BLOCK_FIELDS = `
  title,
  subtitle,
  placeholder,
  buttonText,
  successMessage,
  note,
  "smallNote": note,
  tag,
  source,
  variant
`

export const BLOG_PAGE_QUERY = `*[${singletonPageFilter('blogPage')}][0]{
  title,
  ${MARKETING_SECTIONS_QUERY}
  seo,
  hero{
    pillText,
    title,
    titleAccent,
    description,
    heroImage,
    stats[]{ value, label }
  },
  filterBar{
    allLabel,
    categories[]{
      value,
      label,
      tagBackground,
      tagTextColor
    }
  },
  listUi{
    featuredBadgeText,
    featuredReadMoreText,
    cardReadMoreText,
    emptyStateText,
    readTimeSuffix
  },
  pagination{
    enabled,
    postsPerPage
  },
  newsletter{
    title,
    description,
    placeholder,
    buttonText,
    note
  }
  // Page-builder newsletter blocks are projected via MARKETING_SECTIONS_QUERY
  // (_type == "newsletterBlock" => { title, subtitle, placeholder, ... }).
}`

/**
 * Lightweight query for single-post sidebar (and other surfaces that only need copy).
 * Prefers a sidebar-variant block, then any newsletterBlock, then legacy `newsletter` object.
 */
export const BLOG_NEWSLETTER_SETTINGS_QUERY = `*[${singletonPageFilter('blogPage')}][0]{
  "newsletterBlock": coalesce(
    sections[_type == "newsletterBlock" && variant == "sidebar"][0]{${NEWSLETTER_BLOCK_FIELDS}},
    sections[_type == "newsletterBlock"][0]{${NEWSLETTER_BLOCK_FIELDS}}
  ),
  newsletter{
    title,
    description,
    placeholder,
    buttonText,
    note
  }
}`

export type BlogNewsletterSettings = {
  title?: string
  subtitle?: string
  placeholder?: string
  buttonText?: string
  successMessage?: string
  note?: string
  smallNote?: string
  tag?: string
  source?: string
  variant?: 'horizontal' | 'sidebar'
}

/** Merge page-builder block + legacy newsletter fields for frontend props. */
export function resolveBlogNewsletterSettings(
  data: {
    newsletterBlock?: BlogNewsletterSettings | null
    newsletter?: {
      title?: string
      description?: string
      placeholder?: string
      buttonText?: string
      note?: string
    } | null
  } | null | undefined,
  opts?: { preferSidebarSource?: boolean },
): BlogNewsletterSettings {
  const block = data?.newsletterBlock
  const legacy = data?.newsletter
  const note = block?.note?.trim() || block?.smallNote?.trim() || legacy?.note?.trim() || undefined

  return {
    title: block?.title?.trim() || legacy?.title?.trim() || undefined,
    subtitle:
      block?.subtitle?.trim() || legacy?.description?.trim() || undefined,
    placeholder: block?.placeholder?.trim() || legacy?.placeholder?.trim() || undefined,
    buttonText: block?.buttonText?.trim() || legacy?.buttonText?.trim() || undefined,
    successMessage: block?.successMessage?.trim() || undefined,
    note,
    smallNote: note,
    tag: block?.tag?.trim() || undefined,
    source:
      block?.source?.trim() ||
      (opts?.preferSidebarSource ? 'blog-sidebar' : undefined),
    variant: block?.variant === 'sidebar' ? 'sidebar' : block?.variant === 'horizontal' ? 'horizontal' : undefined,
  }
}
