export type KontaktEmailRow = { label?: string; address?: string }

export type KontaktHighlightRow = { label?: string; text?: string }

export type KontaktServiceCard = {
  title?: string
  text?: string
  label?: string
  href?: string
}

export type KontaktPageDoc = {
  title?: string
  seo?: { metaTitle?: string; metaDescription?: string; metaKeywords?: string; ogImage?: any }
  hero?: { eyebrow?: string; pageTitle?: string; intro?: string; image?: any }
  quickContact?: {
    sectionTitle?: string
    labelEmail?: string
    labelPhone?: string
    labelAddress?: string
    labelResponse?: string
    emails?: KontaktEmailRow[]
    phoneDisplay?: string
    phoneTel?: string
    addressStreet?: string
    addressPostalCode?: string
    addressCity?: string
    addressCountry?: string
    responseNote?: string
    mapLinkLabel?: string
    mapQuery?: string
    emailButtonText?: string
    phoneButtonText?: string
    primaryEmailForButtons?: string
  }
  messageForm?: {
    sectionTitle?: string
    sectionDescription?: string
    contactFieldLabel?: string
    contactPlaceholder?: string
    contactHint?: string
    messageFieldLabel?: string
    messagePlaceholder?: string
    messageHint?: string
    submitButtonText?: string
    submittingButtonText?: string
    errorMessage?: string
    successTitle?: string
    successBody?: string
    formAriaTitle?: string
  }
  andresBlock?: {
    name?: string
    role?: string
    description?: string
    highlights?: KontaktHighlightRow[]
    websiteUrl?: string
    linkLabel?: string
    linkHref?: string
  }
  opstarBlock?: {
    name?: string
    tagline?: string
    description?: string
    bullets?: string[]
    linkLabel?: string
    linkHref?: string
  }
  servicesSection?: {
    sectionTitle?: string
    items?: KontaktServiceCard[]
    registerNote?: string
    registerButtonText?: string
    registerButtonHref?: string
  }
  legalNote?: {
    beforeLink?: string
    linkLabel?: string
    linkHref?: string
    afterLink?: string
  }
}

export type ResolvedKontaktPage = {
  seo: { metaTitle: string; metaDescription: string; metaKeywords?: string; ogImage?: any }
  hero: { eyebrow: string; pageTitle: string; intro: string; image: any }
  quickContact: {
    sectionTitle: string
    labelEmail: string
    labelPhone: string
    labelAddress: string
    labelResponse: string
    emails: { label: string; address: string }[]
    phoneDisplay: string
    phoneTel: string
    address: { street: string; postalCode: string; city: string; country: string }
    responseNote: string
    mapLinkLabel: string
    mapQuery: string
    emailButtonText: string
    phoneButtonText: string
    primaryEmail: string
  }
  messageForm: {
    sectionTitle: string
    sectionDescription: string
    contactFieldLabel: string
    contactPlaceholder: string
    contactHint: string
    messageFieldLabel: string
    messagePlaceholder: string
    messageHint: string
    submitButtonText: string
    submittingButtonText: string
    errorMessage: string
    successTitle: string
    successBody: string
    formAriaTitle: string
  }
  andresBlock: {
    name: string
    role: string
    description: string
    highlights: { label: string; text: string }[]
    websiteUrl: string
    linkLabel: string
    linkHref: string
  }
  opstarBlock: {
    name: string
    tagline: string
    description: string
    bullets: string[]
    linkLabel: string
    linkHref: string
  }
  servicesSection: {
    sectionTitle: string
    items: { title: string; text: string; linkLabel: string; linkHref: string }[]
    registerNote: string
    registerButtonText: string
    registerButtonHref: string
  }
  legalNote: {
    beforeLink: string
    linkLabel: string
    linkHref: string
    afterLink: string
  }
}
