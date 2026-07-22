import type { AboutKkkData } from '@/types/about'

export type KkkSectionResolved = {
  title: string
  eyebrow: string
  subtitle?: string
  showEyebrowDots: boolean
  faqs: Array<{ question: string; answer: unknown }>
}

type FaqLike = {
  question?: string
  answer?: unknown
}

function isFaqLike(value: unknown): value is FaqLike {
  return Boolean(value && typeof value === 'object' && 'question' in value)
}

/** Normalize referenced `questions` or legacy inline `faqs` into a single list. */
export function normalizeKkkFaqs(data?: AboutKkkData | null): Array<{ question: string; answer: unknown }> {
  if (!data) return []

  const referenced = Array.isArray(data.questions)
    ? data.questions.filter(isFaqLike).map((item) => ({
        question: (item.question ?? '').trim(),
        answer: item.answer ?? '',
      }))
    : []

  if (referenced.length > 0) {
    return referenced.filter((item) => item.question)
  }

  const legacy = Array.isArray(data.faqs)
    ? data.faqs
        .filter(isFaqLike)
        .map((item) => ({
          question: (item.question ?? '').trim(),
          answer: item.answer ?? '',
        }))
        .filter((item) => item.question)
    : []

  return legacy
}

function pickKkkSource(
  fromRef?: AboutKkkData | null,
  fromInline?: AboutKkkData | null,
): AboutKkkData | null {
  if (fromRef && (hasFaqs(fromRef) || hasHeaderFields(fromRef))) return fromRef
  if (fromInline && (hasFaqs(fromInline) || hasHeaderFields(fromInline))) return fromInline
  return null
}

function hasFaqs(data?: AboutKkkData | null) {
  return normalizeKkkFaqs(data).length > 0
}

function hasHeaderFields(data?: AboutKkkData | null) {
  if (!data) return false
  return Boolean(
    (data.title && data.title.trim()) ||
      (data.eyebrow && data.eyebrow.trim()) ||
      (data.subtitle && data.subtitle.trim()),
  )
}

/** Merge CMS KKK (reference or inline) with page fallbacks. */
export function resolveKkkSection(
  fromRef: AboutKkkData | null | undefined,
  fromInline: AboutKkkData | null | undefined,
  fallback: AboutKkkData,
): KkkSectionResolved {
  const cms = pickKkkSource(fromRef, fromInline)
  const faqsSource = cms ? normalizeKkkFaqs(cms) : normalizeKkkFaqs(fallback)

  return {
    title: (cms?.title || '').trim() || fallback.title || 'KKK',
    eyebrow: (cms?.eyebrow || '').trim() || fallback.eyebrow || 'KKK',
    subtitle: cms?.subtitle?.trim() || fallback.subtitle,
    showEyebrowDots: cms?.showEyebrowDots ?? fallback.showEyebrowDots ?? true,
    faqs: faqsSource,
  }
}