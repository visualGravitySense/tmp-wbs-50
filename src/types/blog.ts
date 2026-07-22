export interface Author {
  name: string
  role?: string
  avatar?: {
    asset: {
      _ref: string
      _type: string
    }
    alt?: string
  }
}

export interface CalloutBlock {
  _type: 'calloutBlock'
  type: 'info' | 'warning' | 'success'
  text: string
}

export interface ImageBlock {
  _type: 'imageBlock'
  image: {
    asset: {
      _ref: string
      _type: string
    }
    alt?: string
  }
  caption?: string
}

export interface StatsRow {
  _type: 'statsRow'
  stats: Array<{
    number: number
    label: string
  }>
}

export type PortableTextBlock = 
  | { _type: 'block'; style: 'normal' | 'h2' | 'h3' | 'h4'; children: Array<any> }
  | { _type: 'block'; list: 'bullet' | 'number'; children: Array<any> }
  | CalloutBlock
  | ImageBlock
  | StatsRow

export interface BlogBody {
  _id: string
  _type: 'array'
  portableTextBlocks: PortableTextBlock[]
}

export interface BlogPost {
  _id: string
  _type: 'blogPost' | 'post'
  title: string
  slug: {
    current: string
  }
  publishedAt: string
  excerpt?: string
  coverImage?: {
    asset: {
      _ref: string
      _type: string
    }
    alt?: string
  }
  category: string
  readTime: number
  featured: boolean
  author: Author
  body: PortableTextBlock[]
}

export interface BlogPostPreview {
  _id: string
  title: string
  slug: {
    current: string
  }
  publishedAt: string
  excerpt?: string
  /** First blocks of `body`; used for card preview when `excerpt` is empty */
  bodyLead?: unknown[]
  coverImage?: {
    asset: {
      _ref: string
      _type: string
    }
    alt?: string
  }
  category: string
  readTime: number
  featured: boolean
  author: Author
}

export type BlogCategory = string

export interface CategoryConfig {
  label: string
  color: string
  textColor?: string
}

export const CATEGORY_CONFIG: Record<BlogCategory, CategoryConfig> = {
  juhtimine: { label: 'Juhtimine', color: '#EEEDFE', textColor: '#3C3489' },
  lean: { label: 'LEAN', color: '#E1F5EE', textColor: '#085041' },
  kaizen: { label: 'Kaizen', color: '#FAEEDA', textColor: '#633806' },
  vsm: { label: 'VSM', color: '#E6F1FB', textColor: '#0C447C' },
  tps: { label: 'TPS', color: '#EAF3DE', textColor: '#27500A' },
  meeskond: { label: 'Meeskond', color: '#F3F4F6', textColor: '#111827' },
  protsessid: { label: 'Protsessid', color: '#F3F4F6', textColor: '#111827' },
  mõõtmine: { label: 'Mõõtmine', color: '#F3F4F6', textColor: '#111827' },
  'case-study': { label: 'Case Study', color: '#F3F4F6', textColor: '#111827' },
}

export interface BlogPageCategory {
  value: string
  label: string
  tagBackground?: string
  tagTextColor?: string
}

export interface BlogPageSettings {
  title?: string
  /** Page-builder sections (includes optional `newsletterBlock`). */
  sections?: Array<{ _type?: string; _key?: string; [key: string]: unknown }>
  seo?: {
    metaTitle?: string
    metaDescription?: string
    metaKeywords?: string
    ogImage?: any
  }
  hero?: {
    pillText?: string
    title?: string
    titleAccent?: string
    description?: string
    heroImage?: {
      asset?: { _ref?: string }
    }
    stats?: Array<{
      value?: string
      label?: string
    }>
  }
  filterBar?: {
    allLabel?: string
    categories?: BlogPageCategory[]
  }
  listUi?: {
    featuredBadgeText?: string
    featuredReadMoreText?: string
    cardReadMoreText?: string
    emptyStateText?: string
    readTimeSuffix?: string
  }
  pagination?: {
    enabled?: boolean
    postsPerPage?: number
  }
  newsletter?: {
    title?: string
    description?: string
    placeholder?: string
    buttonText?: string
    note?: string
  }
}
