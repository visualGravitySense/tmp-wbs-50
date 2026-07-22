import { DEFAULT_NINE_DAYS_MINI_DAYS } from './nineDaysMiniContentDefaults'
import type { NineDaysMiniDay } from './nineDaysMiniDefaults'

export const NINE_DAYS_MINI_DAY_COUNT = 9

export type NineDaysMiniProgramDays = {
  day1?: NineDaysMiniDay
  day2?: NineDaysMiniDay
  day3?: NineDaysMiniDay
  day4?: NineDaysMiniDay
  day5?: NineDaysMiniDay
  day6?: NineDaysMiniDay
  day7?: NineDaysMiniDay
  day8?: NineDaysMiniDay
  day9?: NineDaysMiniDay
}

export type NineDaysMiniDaysSource = {
  programDays?: NineDaysMiniProgramDays | null
  /** @deprecated Kasuta programDays.day1–day9 */
  days?: NineDaysMiniDay[] | null
  oppepaevad?: any[] | null
}

function slotKey(index: number): keyof NineDaysMiniProgramDays {
  return `day${index + 1}` as keyof NineDaysMiniProgramDays
}

function coalesceField(value: string | undefined, fallback: string): string {
  const trimmed = value?.trim()
  return trimmed ? trimmed : fallback
}

function normalizeDay(
  raw: NineDaysMiniDay | undefined,
  index: number,
  fallback: NineDaysMiniDay,
): NineDaysMiniDay {
  const dayNumber = raw?.dayNumber ?? fallback.dayNumber ?? index + 1
  return {
    dayNumber,
    title: coalesceField(raw?.title, fallback.title ?? ''),
    subtitle: coalesceField(raw?.subtitle, fallback.subtitle ?? ''),
    habit: coalesceField(raw?.habit, fallback.habit ?? ''),
    companyPain: raw?.companyPain,
    companyPainTitle: raw?.companyPainTitle || fallback.companyPainTitle,
    shortSolution: raw?.shortSolution || fallback.shortSolution,
    participantWins: raw?.participantWins || fallback.participantWins,
    companyWins: raw?.companyWins || fallback.companyWins,
    typeLabel: raw?.typeLabel || fallback.typeLabel,
  }
}

function fromProgramDays(programDays: NineDaysMiniProgramDays): NineDaysMiniDay[] {
  return Array.from({ length: NINE_DAYS_MINI_DAY_COUNT }, (_, index) =>
    normalizeDay(programDays[slotKey(index)], index, DEFAULT_NINE_DAYS_MINI_DAYS[index]),
  )
}

function fromLegacyArray(days: NineDaysMiniDay[]): NineDaysMiniDay[] {
  return Array.from({ length: NINE_DAYS_MINI_DAY_COUNT }, (_, index) => {
    const byNumber = days.find((d) => d.dayNumber === index + 1)
    const byIndex = days[index]
    return normalizeDay(byNumber ?? byIndex, index, DEFAULT_NINE_DAYS_MINI_DAYS[index])
  })
}

function fromOppepaevad(oppepaevad: any[]): NineDaysMiniDay[] {
  return Array.from({ length: NINE_DAYS_MINI_DAY_COUNT }, (_, index) => {
    const raw = oppepaevad.find((d: any) => d.dayNumber === index + 1) || oppepaevad[index]
    const mapped: NineDaysMiniDay | undefined = raw ? {
      dayNumber: raw.dayNumber,
      title: raw.title,
      subtitle: raw.shortSolution ? raw.shortSolution.join(', ') : '',
      habit: raw.habitsFocus || raw.habit,
      companyPain: raw.companyPain,
      companyPainTitle: raw.companyPainTitle,
      shortSolution: raw.shortSolution,
      participantWins: raw.participantWins,
      companyWins: raw.companyWins,
      typeLabel: raw.typeLabel,
    } : undefined
    return normalizeDay(mapped, index, DEFAULT_NINE_DAYS_MINI_DAYS[index])
  })
}

/** CMS + vaikeväärtused tühjade väljade jaoks (Studio orienteerumiseks). */
export function resolveNineDaysMiniDays(source?: NineDaysMiniDaysSource | null): NineDaysMiniDay[] {
  if (Array.isArray(source?.oppepaevad) && source.oppepaevad.length > 0) {
    return fromOppepaevad(source.oppepaevad)
  }

  if (source?.programDays) {
    return fromProgramDays(source.programDays)
  }

  if (Array.isArray(source?.days) && source.days.length > 0) {
    return fromLegacyArray(source.days)
  }

  return DEFAULT_NINE_DAYS_MINI_DAYS.map((day) => ({ ...day }))
}
