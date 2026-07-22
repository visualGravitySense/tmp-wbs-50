import client from '@/lib/sanity/client'
import { REGISTER_COHORT_BY_ID_QUERY } from '@/lib/sanity/queries/registerCohort'

export type RegisterCohortDetail = {
  id?: string
  name?: string
  trainingTitle?: string
  location?: string
  dates?: string
  daysUntil?: string
  timing?: string
  badges?: Array<{ text?: string; type?: string }>
  spotsAvailable?: number
  spotsTotal?: number
  spotsFilled?: number
  statusLabel?: string
  statusTone?: 'active' | 'upcoming' | 'finished'
  price?: string
  priceNote?: string
  preRegistrationInfo?: string
  preRegistrationBenefits?: string[]
  isCompleted?: boolean
}

export async function getRegisterCohortById(cohortId: string): Promise<RegisterCohortDetail | null> {
  const id = cohortId.trim()
  if (!id) return null
  try {
    return await client.fetch(
      REGISTER_COHORT_BY_ID_QUERY,
      { cohortId: id },
      { next: { revalidate: 60 } },
    )
  } catch {
    return null
  }
}
