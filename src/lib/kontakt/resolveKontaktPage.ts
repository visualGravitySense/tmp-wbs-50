import type { KontaktPageDoc, ResolvedKontaktPage } from '@/types/kontaktPage'
import { BUSINESS_CONTACT, BUSINESS_LINKS } from '@/lib/contact/businessInfo'

function t(value: string | undefined | null, fallback: string): string {
  const v = value?.trim()
  return v || fallback
}

export const KONTAKT_PAGE_DEFAULTS: ResolvedKontaktPage = {
  seo: {
    metaTitle: 'Contact — Site Name',
    metaDescription:
      'Get in touch: email, phone, and address. Training, consulting, and product inquiries.',
  },
  hero: {
    eyebrow: 'Contact',
    pageTitle: 'Get in touch',
    intro:
      'Reach out for training, consulting, or product questions. Write, call, or use the form — we will find the next step together.',
    image: null,
  },
  quickContact: {
    sectionTitle: 'Direct contact',
    labelEmail: 'Email',
    labelPhone: 'Phone',
    labelAddress: 'Address',
    labelResponse: 'Response time',
    emails: BUSINESS_CONTACT.emails.map((e) => ({ label: e.label, address: e.address })),
    phoneDisplay: BUSINESS_CONTACT.phoneDisplay,
    phoneTel: BUSINESS_CONTACT.phoneTel,
    address: {
      street: BUSINESS_CONTACT.address.street,
      postalCode: BUSINESS_CONTACT.address.postalCode,
      city: BUSINESS_CONTACT.address.city,
      country: BUSINESS_CONTACT.address.country,
    },
    responseNote: BUSINESS_CONTACT.responseNote,
    mapLinkLabel: 'Open on map',
    mapQuery: BUSINESS_CONTACT.mapQuery,
    emailButtonText: 'Send email',
    phoneButtonText: 'Call',
    primaryEmail: BUSINESS_CONTACT.emails[0]?.address ?? 'hello@example.com',
  },
  messageForm: {
    sectionTitle: 'Send a message',
    sectionDescription:
      'Briefly describe your situation — training, consulting, or product. Include email or phone so we can reply on the same channel.',
    contactFieldLabel: 'Email or phone',
    contactPlaceholder: 'name@example.com or +372 …',
    contactHint: 'Valid email or phone number (at least 8 digits).',
    messageFieldLabel: 'Message',
    messagePlaceholder:
      'Briefly describe how we can help — training, consulting, or product…',
    messageHint: 'At least 10 characters · up to 3500',
    submitButtonText: 'Send message',
    submittingButtonText: 'Sending…',
    errorMessage: 'Sending failed. Please try again shortly or write via email.',
    successTitle: 'Thank you — your message was received.',
    successBody:
      'We will reply as soon as possible, usually the same or next business day.',
    formAriaTitle: 'Send a message',
  },
  andresBlock: {
    name: BUSINESS_CONTACT.personName,
    role: BUSINESS_CONTACT.personRole,
    description:
      'Replace this with a short bio of your team or lead expert. Keep it practical and outcome-focused.',
    highlights: [
      { label: 'Services:', text: 'Training programs and in-house solutions' },
      { label: 'Consulting:', text: 'Processes, KPIs, and team development' },
      { label: 'Web:', text: BUSINESS_CONTACT.brandLine },
    ],
    websiteUrl: `https://${BUSINESS_CONTACT.brandLine}`,
    linkLabel: 'Learn more about us →',
    linkHref: BUSINESS_LINKS.about,
  },
  opstarBlock: {
    name: BUSINESS_CONTACT.frameworkName,
    tagline: BUSINESS_CONTACT.frameworkTagline,
    description:
      'Replace this with a short description of your product or methodology. Highlight structure, tools, and measurable outcomes.',
    bullets: [
      'Clear framework and practical tools',
      'Hands-on learning with real examples',
      'Certificate upon program completion',
    ],
    linkLabel: `Explore ${BUSINESS_CONTACT.frameworkName} →`,
    linkHref: BUSINESS_LINKS.opstar,
  },
  servicesSection: {
    sectionTitle: 'What can you contact us about?',
    items: [
      {
        title: 'Training and registration',
        text: 'Program overview, open seats, and funding options.',
        linkLabel: 'Training page',
        linkHref: BUSINESS_LINKS.koolitus,
      },
      {
        title: 'Consulting',
        text: 'On-site visit, audit, or management development.',
        linkLabel: 'About / consulting',
        linkHref: BUSINESS_LINKS.about,
      },
      {
        title: BUSINESS_CONTACT.frameworkName,
        text: 'Product introduction and in-company rollout.',
        linkLabel: 'Product page',
        linkHref: BUSINESS_LINKS.opstar,
      },
    ],
    registerNote:
      'Ready to register? Fill in the registration form — we answer questions before confirmation.',
    registerButtonText: 'Register for course',
    registerButtonHref: BUSINESS_LINKS.register,
  },
  legalNote: {
    beforeLink: 'About personal data processing, see the',
    linkLabel: 'privacy policy',
    linkHref: BUSINESS_LINKS.privacy,
    afterLink: `. The controller for contact data is ${BUSINESS_CONTACT.personName} (${BUSINESS_CONTACT.emails[0]?.address ?? 'hello@example.com'}).`,
  },
}

export function resolveKontaktPage(doc: KontaktPageDoc | null | undefined): ResolvedKontaktPage {
  const d = KONTAKT_PAGE_DEFAULTS
  const q = doc?.quickContact
  const emailsFromCms =
    q?.emails
      ?.map((row) => ({
        label: t(row.label, ''),
        address: t(row.address, ''),
      }))
      .filter((row) => row.address) ?? []
  const emails = emailsFromCms.length > 0 ? emailsFromCms : d.quickContact.emails

  const highlightsFromCms =
    doc?.andresBlock?.highlights
      ?.map((row) => ({
        label: t(row.label, ''),
        text: t(row.text, ''),
      }))
      .filter((row) => row.label || row.text) ?? []
  const highlights = highlightsFromCms.length > 0 ? highlightsFromCms : d.andresBlock.highlights

  const bulletsFromCms =
    doc?.opstarBlock?.bullets?.map((b) => b?.trim()).filter((b): b is string => Boolean(b)) ?? []
  const bullets = bulletsFromCms.length > 0 ? bulletsFromCms : d.opstarBlock.bullets

  const itemsFromCms =
    doc?.servicesSection?.items
      ?.map((item) => ({
        title: t(item.title, ''),
        text: t(item.text, ''),
        linkLabel: t(item.label, ''),
        linkHref: t(item.href, ''),
      }))
      .filter((item) => item.title) ?? []
  const items = itemsFromCms.length > 0 ? itemsFromCms : d.servicesSection.items

  const primaryEmail = t(
    q?.primaryEmailForButtons,
    emails[0]?.address ?? d.quickContact.primaryEmail,
  )

  return {
    seo: {
      metaTitle: t(doc?.seo?.metaTitle, d.seo.metaTitle),
      metaDescription: t(doc?.seo?.metaDescription, d.seo.metaDescription),
      metaKeywords: doc?.seo?.metaKeywords || undefined,
      ogImage: doc?.seo?.ogImage || null,
    },
    hero: {
      eyebrow: t(doc?.hero?.eyebrow, d.hero.eyebrow),
      pageTitle: t(doc?.hero?.pageTitle, d.hero.pageTitle),
      intro: t(doc?.hero?.intro, d.hero.intro),
      image: doc?.hero?.image || null,
    },
    quickContact: {
      sectionTitle: t(q?.sectionTitle, d.quickContact.sectionTitle),
      labelEmail: t(q?.labelEmail, d.quickContact.labelEmail),
      labelPhone: t(q?.labelPhone, d.quickContact.labelPhone),
      labelAddress: t(q?.labelAddress, d.quickContact.labelAddress),
      labelResponse: t(q?.labelResponse, d.quickContact.labelResponse),
      emails,
      phoneDisplay: t(q?.phoneDisplay, d.quickContact.phoneDisplay),
      phoneTel: t(q?.phoneTel, d.quickContact.phoneTel),
      address: {
        street: t(q?.addressStreet, d.quickContact.address.street),
        postalCode: t(q?.addressPostalCode, d.quickContact.address.postalCode),
        city: t(q?.addressCity, d.quickContact.address.city),
        country: t(q?.addressCountry, d.quickContact.address.country),
      },
      responseNote: t(q?.responseNote, d.quickContact.responseNote),
      mapLinkLabel: t(q?.mapLinkLabel, d.quickContact.mapLinkLabel),
      mapQuery: t(q?.mapQuery, d.quickContact.mapQuery),
      emailButtonText: t(q?.emailButtonText, d.quickContact.emailButtonText),
      phoneButtonText: t(q?.phoneButtonText, d.quickContact.phoneButtonText),
      primaryEmail,
    },
    messageForm: {
      sectionTitle: t(doc?.messageForm?.sectionTitle, d.messageForm.sectionTitle),
      sectionDescription: t(doc?.messageForm?.sectionDescription, d.messageForm.sectionDescription),
      contactFieldLabel: t(doc?.messageForm?.contactFieldLabel, d.messageForm.contactFieldLabel),
      contactPlaceholder: t(doc?.messageForm?.contactPlaceholder, d.messageForm.contactPlaceholder),
      contactHint: t(doc?.messageForm?.contactHint, d.messageForm.contactHint),
      messageFieldLabel: t(doc?.messageForm?.messageFieldLabel, d.messageForm.messageFieldLabel),
      messagePlaceholder: t(doc?.messageForm?.messagePlaceholder, d.messageForm.messagePlaceholder),
      messageHint: t(doc?.messageForm?.messageHint, d.messageForm.messageHint),
      submitButtonText: t(doc?.messageForm?.submitButtonText, d.messageForm.submitButtonText),
      submittingButtonText: t(
        doc?.messageForm?.submittingButtonText,
        d.messageForm.submittingButtonText,
      ),
      errorMessage: t(doc?.messageForm?.errorMessage, d.messageForm.errorMessage),
      successTitle: t(doc?.messageForm?.successTitle, d.messageForm.successTitle),
      successBody: t(doc?.messageForm?.successBody, d.messageForm.successBody),
      formAriaTitle: t(doc?.messageForm?.formAriaTitle, d.messageForm.formAriaTitle),
    },
    andresBlock: {
      name: t(doc?.andresBlock?.name, d.andresBlock.name),
      role: t(doc?.andresBlock?.role, d.andresBlock.role),
      description: t(doc?.andresBlock?.description, d.andresBlock.description),
      highlights,
      websiteUrl: t(doc?.andresBlock?.websiteUrl, d.andresBlock.websiteUrl),
      linkLabel: t(doc?.andresBlock?.linkLabel, d.andresBlock.linkLabel),
      linkHref: t(doc?.andresBlock?.linkHref, d.andresBlock.linkHref),
    },
    opstarBlock: {
      name: t(doc?.opstarBlock?.name, d.opstarBlock.name),
      tagline: t(doc?.opstarBlock?.tagline, d.opstarBlock.tagline),
      description: t(doc?.opstarBlock?.description, d.opstarBlock.description),
      bullets,
      linkLabel: t(doc?.opstarBlock?.linkLabel, d.opstarBlock.linkLabel),
      linkHref: t(doc?.opstarBlock?.linkHref, d.opstarBlock.linkHref),
    },
    servicesSection: {
      sectionTitle: t(doc?.servicesSection?.sectionTitle, d.servicesSection.sectionTitle),
      items,
      registerNote: t(doc?.servicesSection?.registerNote, d.servicesSection.registerNote),
      registerButtonText: t(
        doc?.servicesSection?.registerButtonText,
        d.servicesSection.registerButtonText,
      ),
      registerButtonHref: t(
        doc?.servicesSection?.registerButtonHref,
        d.servicesSection.registerButtonHref,
      ),
    },
    legalNote: {
      beforeLink: t(doc?.legalNote?.beforeLink, d.legalNote.beforeLink),
      linkLabel: t(doc?.legalNote?.linkLabel, d.legalNote.linkLabel),
      linkHref: t(doc?.legalNote?.linkHref, d.legalNote.linkHref),
      afterLink: t(doc?.legalNote?.afterLink, d.legalNote.afterLink),
    },
  }
}
