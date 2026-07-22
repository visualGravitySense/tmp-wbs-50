export interface Badge {
  text: string
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'gray'
  size?: 'sm' | 'md' | 'lg'
}

export interface HeroSection {
  eyebrow?: string
  headline: string
  subtitle: string
  description: string
  linkedinUrl?: string
  image?: {
    asset: {
      _id: string
      url: string
    }
  }
  primaryButton: {
    text: string
    link: string
  }
  secondaryButton: {
    text: string
    link: string
  }
  badges?: Badge[]
  technologyBadges?: Badge[]
  floatingBadges?: Array<{
    label?: string
    text?: string
    icon?: string
    positionX?: number
    positionY?: number
  }>
  stat1Number?: string
  stat1Label?: string
  stat2Number?: string
  stat2Label?: string
  stat3Number?: string
  stat3Label?: string
}

export interface QuoteSection {
  /** Pill above the card (preferred). */
  eyebrow?: string
  /** @deprecated Use `eyebrow`. */
  subtitle?: string
  cardLabel?: string
  secondBadgeText?: string
  quotes?: Array<{
    quote: string
    author: string
  }>
  /** @deprecated Use `quotes[]`. */
  quote?: string
  /** @deprecated Use `quotes[]`. */
  author?: string
  backgroundColor?: 'gray' | 'blue' | 'white' | 'purple'
}

export interface ExperienceCard {
  title: string
  subtitle?: string
  year: string
  description: string
  emoji?: string
  color?: 'blue' | 'green' | 'purple' | 'orange'
}

export interface RightSideContent {
  introText?: string
  title: string
  descriptionText?: string
  /** Caption above competence badges (Sanity: rightSideContent.badgesLabel) */
  badgesLabel?: string
  badges?: Badge[]
  experienceCards?: ExperienceCard[]
  image?: any
}

export interface AboutSection {
  title: string
  scriptTitle?: string
  eyebrow?: string
  content: any[]
  rightSideContent?: RightSideContent
}

export interface ExperienceItem {
  icon?: string
  title: string
  description: string
  year?: string
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'gray'
}

export interface ExperienceStat {
  value: string
  label: string
}

export interface ExperienceSection {
  title: string
  subtitle?: string
  eyebrow?: string
  layoutVariant?: 'default' | 'split'
  fundamentalsTitle?: string
  fundamentalsDescription?: string
  statsTitle?: string
  showStatistics?: boolean
  stats?: ExperienceStat[]
  backgroundColor?: 'white' | 'gray' | 'blue' | 'light-blue'
  experienceItems?: ExperienceItem[]
  factsEyebrow?: string
  factsDescription?: string
  factsItems?: Array<{
    text: string
    colorTheme?: 'blue' | 'purple' | 'green'
  }>
}

export interface CTASection {
  title: string
  subtitle?: string
  backgroundColor?: 'blue-purple' | 'purple-pink' | 'green-blue' | 'orange-red' | 'blue-lightblue'
  description?: string
  primaryButtonText: string
  primaryButtonUrl: string
  secondaryButtonText?: string
  secondaryButtonUrl?: string
  primaryButtonIcon?: string
  secondaryButtonIcon?: string
  /** Empty string hides the footnote line; omit for default Estonian copy */
  trustFootnote?: string
}

export interface Achievement {
  title: string
  description: string
  icon?: string
}

export interface StudentProject {
  projectTitle: string
  studentName: string
  university: string
  projectDescription: string
  year: string
  category: 'lean' | 'process' | 'quality' | 'strategic' | 'supplychain' | 'other'
  result?: string
}

export interface KeyAchievementsSection {
  title: string
  description?: string
  achievements: Achievement[]
  studentProjects: StudentProject[]
  fallbackProjects?: StudentProject[]
}

export interface ManufacturingCompany {
  companyName: string
  country: string
  industry: 'automotive' | 'electronics' | 'food' | 'pharmaceutical' | 'textile' | 'chemical' | 'metal' | 'plastics' | 'wood' | 'other'
  visitYear: string
  visitPurpose: string
  keyInsights?: string
}

export interface WorldManufacturingVisits {
  title: string
  subtitle?: string
  manufacturingCompanies: ManufacturingCompany[]
}

export interface Expertise {
  title: string
  description?: string
  icon?: string
}

export interface Testimonial {
  name: string
  company?: string
  role?: string
  testimonial: string
  rating: number
}

/** Heading + CTA for the testimonials block (Sanity: testimonialsSection) */
export interface AboutTestimonialsSection {
  title?: string
  subtitle?: string
  buttonText?: string
  buttonLink?: string
}

export interface Service {
  title: string
  description: string
  features?: string[]
  price?: string
}

export interface ServicesSection {
  title: string
  subtitle?: string
  services: Service[]
}

export interface ContactSection {
  title: string
  description: string
  email: string
  phone: string
  address?: string
  backgroundColor?: 'blue-purple' | 'purple-pink' | 'green-blue' | 'orange-red' | 'blue-lightblue'
}

export interface SEO {
  metaTitle?: string
  metaDescription?: string
  ogImage?: {
    asset: {
      _id: string
      url: string
    }
  }
}

/** KKK / FAQ block (inline or dereferenced `kkk` document) */
export interface GuaranteePillar {
  icon?: 'shield' | 'calendar' | 'message-circle' | string
  title: string
  text: string
}

export interface GuaranteeSection {
  eyebrow?: string
  headline: string
  subtext?: string
  pillars: GuaranteePillar[]
  primaryButton: {
    text: string
    link: string
  }
  secondaryButton: {
    text: string
    link: string
  }
}

export interface AboutKkkData {
  title?: string
  eyebrow?: string
  showEyebrowDots?: boolean
  subtitle?: string
  /** Dereferenced global `faqItem` documents (primary). */
  questions?: Array<{
    question: string
    answer?: unknown
  }>
  /** Legacy inline FAQ rows — kept for unmigrated page content. */
  faqs?: Array<{
    question: string
    answer?: unknown
  }>
}

export interface AboutPage {
  title: string
  /** Dereferenced `review` docs from Sanity when curated on the About document */
  featuredReviews?: unknown
  hero: HeroSection
  quoteSection?: QuoteSection
  aboutSection: AboutSection
  experienceSection?: ExperienceSection
  ctaSection?: CTASection
  guaranteeSection?: GuaranteeSection
  keyAchievements?: KeyAchievementsSection
  worldManufacturingVisits?: WorldManufacturingVisits
  expertise?: Expertise[]
  testimonialsSection?: AboutTestimonialsSection
  testimonials?: Testimonial[]
  /** Dereferenced standalone `kkk` document when set in CMS */
  kkkDocument?: AboutKkkData | null
  /** Inline KKK on About Page document */
  kkk?: AboutKkkData
  services?: ServicesSection
  contactSection?: ContactSection
  seo?: SEO
}
