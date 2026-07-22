import type { Review } from '@/types/review'

export type PartnerIndustryRef = {
  name: string
  industry?: string | null
}

/** Estonian label patterns like "Tootmisjuht kalatööstusest." → Kalatööstus */
const TOOSTUS_LABEL_PATTERN = /([a-zäöüõšžA-ZÄÖÜÕŠŽ]+tööstus)e?st/i

const INDUSTRY_ALIASES: Record<string, string> = {
  Laevatööstus: 'Laevaehitus',
}

/** Fallback keyword hints when partner match and tööstus suffix parsing miss. */
const LABEL_INDUSTRY_HINTS: { pattern: RegExp; industry: string }[] = [
  { pattern: /puidukoda|puidu(?:töö|tööstus)/i, industry: 'Puidutööstus' },
  { pattern: /\bets\s*nord\b|metallitöö/i, industry: 'Metallitööstus' },
  { pattern: /laeva(?:töö|ehitus)/i, industry: 'Laevaehitus' },
  { pattern: /plastitöö/i, industry: 'Plastitööstus' },
  { pattern: /kalatöö|kala(?:tööstus|töö)/i, industry: 'Kalatööstus' },
  { pattern: /trükk|printimine/i, industry: 'Trükkimine' },
  { pattern: /elektro|elektroon/i, industry: 'Elektroonika' },
  { pattern: /taimse?\s+toit|bon\s+soya|toidu/i, industry: 'Toidutööstus' },
]

function capitalizeIndustryToken(token: string): string {
  const trimmed = token.trim()
  if (!trimmed) return ''
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1)
}

function parseIndustryFromLabel(label?: string): string | undefined {
  if (!label?.trim()) return undefined
  const match = label.match(TOOSTUS_LABEL_PATTERN)
  if (!match?.[1]) return undefined
  return capitalizeIndustryToken(match[1])
}

function matchPartnerIndustry(
  label: string | undefined,
  partners: PartnerIndustryRef[],
): string | undefined {
  if (!label?.trim()) return undefined
  const lower = label.toLowerCase()
  let best: { length: number; industry: string } | undefined

  for (const partner of partners) {
    const name = partner.name?.trim()
    const industry = partner.industry?.trim()
    if (!name || !industry) continue
    const nameLower = name.toLowerCase()
    if (!lower.includes(nameLower)) continue
    if (!best || nameLower.length > best.length) {
      best = { length: nameLower.length, industry }
    }
  }

  return best?.industry
}

function normalizeIndustryName(name: string, knownIndustries: Set<string>): string {
  if (knownIndustries.has(name)) return name
  const alias = INDUSTRY_ALIASES[name]
  if (alias && knownIndustries.has(alias)) return alias
  return name
}

/** Resolve a review's filter industry from CMS field, partner match, or label heuristics. */
export function resolveReviewIndustry(
  review: Pick<Review, 'label' | 'industry'>,
  partners: PartnerIndustryRef[],
): string | undefined {
  if (review.industry?.trim()) return review.industry.trim()

  const known = new Set(
    partners.map((p) => p.industry?.trim()).filter((v): v is string => Boolean(v)),
  )

  const fromPartner = matchPartnerIndustry(review.label, partners)
  if (fromPartner) return fromPartner

  const fromLabel = parseIndustryFromLabel(review.label)
  if (fromLabel) return normalizeIndustryName(fromLabel, known)

  const label = review.label ?? ''
  for (const hint of LABEL_INDUSTRY_HINTS) {
    if (!hint.pattern.test(label)) continue
    return normalizeIndustryName(hint.industry, known)
  }

  return undefined
}

export function enrichReviewsWithIndustry(
  reviews: Review[],
  partners: PartnerIndustryRef[],
): Review[] {
  return reviews.map((review) => {
    const industry = resolveReviewIndustry(review, partners)
    return industry ? { ...review, industry } : review
  })
}

export function buildIndustryCountsFromReviews(
  reviews: Review[],
): Record<string, number> {
  const counts: Record<string, number> = {}
  for (const review of reviews) {
    const industry = review.industry?.trim()
    if (!industry) continue
    counts[industry] = (counts[industry] || 0) + 1
  }
  return counts
}