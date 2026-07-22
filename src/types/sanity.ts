export interface SiteSettings {
  _type: 'siteSettings'
  _id: string
  siteName: string
  siteDescription: string
  logo?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  favicon?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  defaultSeo: {
    title: string
    description: string
    image?: {
      asset: {
        _ref: string
        _type: 'reference'
      }
    }
  }
  contact: {
    email: string
    phone?: string
    linkedin?: string
  }
  theme: {
    primaryColor?: string
    accentColor?: string
    themeStyle?: 'opstar' | 'vip-holidays' | 'swiss-minimalism'
  }
  cookieBanner?: {
    title?: string
    description?: string
    acceptLabel?: string
    rejectLabel?: string
    readMoreLabel?: string
  }
  pageNotFound?: {
    image?: {
      asset: {
        _ref: string
        _type: 'reference'
      }
    }
    text?: string
    buttonLabel?: string
  }
  productionAuditQuiz?: {
    eyebrow?: string
    title?: string
    description?: string
    questions?: {
      question: string
      options: string[]
    }[]
  }
}

export interface Page {
  _type: 'page'
  _id: string
  slug: {
    current: string
  }
  title: string
  description?: string
  content: PageBuilderBlock[]
  seo: {
    title?: string
    description?: string
    image?: {
      asset: {
        _ref: string
        _type: 'reference'
      }
    }
  }
}

export interface Training {
  _type: 'training'
  _id: string
  title: string
  description: string
  program: {
    duration?: string
    modules: TrainingModule[]
    schedule: TrainingSchedule[]
  }
  pricing: PricingPlan[]
  instructors: Instructor[]
  testimonials: Testimonial[]
}

export interface Testimonial {
  _type: 'testimonial'
  _id: string
  name: string
  role?: string
  company?: string
  content: string
  rating?: number
  avatar?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  featured: boolean
}

// Page Builder Block Types
export type PageBuilderBlock = 
  | HeroBlock
  | StatsBlock
  | FeaturesBlock
  | TestimonialsBlock
  | CtaBlock
  | TextBlock

export interface HeroBlock {
  _type: 'heroBlock'
  _key: string
  heading: string
  subheading?: string
  image?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  ctaButton?: {
    text: string
    url: string
  }
  overlay: boolean
}

export interface StatsBlock {
  _type: 'statsBlock'
  _key: string
  heading?: string
  stats: Stat[]
}

export interface FeaturesBlock {
  _type: 'featuresBlock'
  _key: string
  heading?: string
  description?: string
  features: Feature[]
}

export interface TestimonialsBlock {
  _type: 'testimonialsBlock'
  _key: string
  heading?: string
  description?: string
  testimonials: Testimonial[]
}

export interface CtaBlock {
  _type: 'ctaBlock'
  _key: string
  heading: string
  description?: string
  primaryButton?: {
    text: string
    url: string
  }
  secondaryButton?: {
    text: string
    url: string
  }
  backgroundImage?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
}

export interface TextBlock {
  _type: 'textBlock'
  _key: string
  heading?: string
  content: string
  alignment: 'left' | 'center' | 'right'
  size: 'small' | 'medium' | 'large'
}

// Helper Types
export interface Stat {
  number: string
  label: string
  description?: string
}

export interface Feature {
  title: string
  description?: string
  icon?: string
  image?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
}

export interface TrainingModule {
  title: string
  description?: string
  duration?: string
}

export interface TrainingSchedule {
  date: string
  time: string
  location: string
}

export interface PricingPlan {
  name: string
  price: number
  currency: string
  features: string[]
}

export interface Instructor {
  name: string
  bio?: string
  photo?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  experience?: string
}

export interface AndresProfile {
  _type: 'andresProfile'
  _id: string
  name: string
  eyebrow?: string
  subtitle?: string
  quote?: string
  shortBio?: string
  fullBio?: any[]
  methodology?: string
  tags?: string[]
  statistics?: {
    value: string
    label: string
  }[]
  photo?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  secondaryPhotos?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }[]
  timeline?: {
    year: string
    title: string
    description?: string
  }[]
  factories?: {
    name: string
    description?: string
    logo?: {
      asset: {
        _ref: string
        _type: 'reference'
      }
    }
  }[]
  ctaLink?: string
  ctaLabel?: string
}
