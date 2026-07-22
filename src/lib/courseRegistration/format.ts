import type { CourseRegistrationPayload } from '@/lib/telegramLeadClient'

export function formatCourseRegistrationTelegramText(data: CourseRegistrationPayload): string {
  const name = data.name.trim()
  const company = data.company?.trim()
  const email = data.email.trim()
  const phone = data.phone?.trim()
  const note = data.note?.trim()
  const cohort = data.cohort?.trim()
  return [
    'Kursusele registreerumine',
    '',
    `Nimi: ${name}`,
    company ? `Ettevõte: ${company}` : null,
    `E-post: ${email}`,
    phone ? `Telefon: ${phone}` : 'Telefon: —',
    cohort ? `Grupp (ID): ${cohort}` : 'Grupp: —',
    data.packageTier ? `Valitud pakett: ${data.packageTier.trim()}` : null,
    `Turundusnõusolek: ${data.marketingConsent ? 'jah' : 'ei'}`,
    '',
    note || '(märkust ei lisatud)',
  ].filter((x) => x !== null).join('\n')
}

export function courseRegistrationSmailyFields(
  data: CourseRegistrationPayload,
): Record<string, string> {
  return {
    name: data.name.trim().slice(0, 200),
    phone: (data.phone?.trim() || '').slice(0, 64),
    source: 'register',
    cohort: (data.cohort?.trim() || '').slice(0, 120),
    note: (data.note?.trim() || '').slice(0, 500),
    tier: (data.packageTier?.trim() || '').slice(0, 120),
    marketing_consent: data.marketingConsent ? 'yes' : 'no',
  }
}
