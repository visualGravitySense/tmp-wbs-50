import { postLeadWithIntegrations } from '@/lib/integrations/postLeadWithIntegrations'

/**
 * Ühe e-posti väljaga vorm (nt 9 päeva PDF) → Telegram + Smaily (/api/telegram-lead).
 * `source`: nt `nine-days-mini`, `nine-days-program`.
 */
export async function submitEmailLead(
  email: string,
  source: string,
  opts?: { marketingConsent?: boolean },
): Promise<void> {
  await postLeadWithIntegrations('/api/telegram-lead', source, {
    email,
    source,
    company: '',
    marketingConsent: Boolean(opts?.marketingConsent),
  })
}

/** @deprecated Kasuta submitEmailLead */
export const submitLeadToTelegram = submitEmailLead

export type GrantInquiryPayload = {
  name: string
  email: string
  isikukood?: string
}

/** Töötukassa toetuse päring (GrantSection) → Telegram + Smaily */
export async function submitGrantInquiry(data: GrantInquiryPayload): Promise<void> {
  await postLeadWithIntegrations('/api/grant-inquiry', 'grant-section', {
    name: data.name,
    email: data.email,
    isikukood: data.isikukood ?? '',
    company: '',
  })
}

export type CourseRegistrationPayload = {
  name: string
  company?: string
  email: string
  phone?: string
  note?: string
  cohort?: string
  packageTier?: string
  marketingConsent?: boolean
}

/** /register — Telegram + Smaily CRM (server: /api/course-registration). */
export async function submitCourseRegistration(
  data: CourseRegistrationPayload,
): Promise<void> {
  await postLeadWithIntegrations('/api/course-registration', 'register', {
    name: data.name,
    email: data.email,
    phone: data.phone ?? '',
    note: data.note ?? '',
    cohort: data.cohort ?? '',
    packageTier: data.packageTier ?? '',
    marketingConsent: Boolean(data.marketingConsent),
    company: data.company ?? '',
  })
}

/** @deprecated Kasuta submitCourseRegistration */
export const submitCourseRegistrationToTelegram = submitCourseRegistration

/** Vabas vormis sõnum → Telegram; e-posti korral ka Smaily CRM (/api/telegram-lead). */
export async function submitContactMessageToTelegram(
  message: string,
  source: string,
  contact: string,
  opts?: { name?: string; company?: string; marketingConsent?: boolean },
): Promise<void> {
  await postLeadWithIntegrations('/api/telegram-lead', source, {
    message,
    source,
    contact: contact.trim(),
    name: opts?.name ?? '',
    company: opts?.company ?? '',
    marketingConsent: Boolean(opts?.marketingConsent),
  })
}
