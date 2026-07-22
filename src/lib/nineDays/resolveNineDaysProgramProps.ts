import type { NineDaysProgramProps } from '@/components/NineDaysProgram'

type ProgramDaySource = {
  dayNumber?: number
  habit?: string
  habitsFocus?: string
  tag?: string
  title?: string
  description?: unknown[]
  fullProgram?: unknown[]
  infoCards?: Array<{ title?: string; body?: unknown[] }>
  companyPain?: string[]
  shortSolution?: string[]
}

type ProgramSource = {
  eyebrow?: string
  title?: string
  titleHighlight?: string
  subtitle?: string
  habitsQuestionTitle?: string
  habitsQuestionSubtitle?: string
  dayPickerTitle?: string
  viewedCountLabel?: string
  continueButtonText?: string
  dayGoalLabel?: string
  dayFocusLabel?: string
  dayExtraInfoTitle?: string
  nextDayLabel?: string
  finalDayMessage?: string
  dayLinkPrefix?: string
  dayLinkText?: string
  dayLinkHref?: string
  primaryBtnText?: string
  primaryBtnLink?: string
  popupTitle?: string
  popupSubtitle?: string
  sidebarCtas?: NineDaysProgramProps['sidebarCtas']
  habits?: NineDaysProgramProps['habits']
  oppepaevad?: ProgramDaySource[]
  days?: ProgramDaySource[]
  testimonials?: NineDaysProgramProps['testimonials']
  completionSection?: {
    title?: string
    description?: string
    selectedHabits?: Array<string | { title?: string }>
    nextCourseInfo?: string
    buttonText?: string
  }
  faqSection?: NineDaysProgramProps['faqSection']
}

function mapOppepaevToDay(raw: ProgramDaySource, idx: number): ProgramDaySource {
  const dayNumber =
    typeof raw.dayNumber === 'number' && raw.dayNumber > 0 ? raw.dayNumber : idx + 1
  const description =
    Array.isArray(raw.fullProgram) && raw.fullProgram.length > 0
      ? raw.fullProgram
      : Array.isArray(raw.description)
        ? raw.description
        : []

  return {
    dayNumber,
    habit: raw.habitsFocus || raw.habit || '',
    tag: raw.tag || 'Õppepäev',
    title: raw.title || `Päev ${dayNumber}`,
    description,
    infoCards: raw.infoCards,
    habitsFocus: raw.habitsFocus,
    companyPain: raw.companyPain,
    shortSolution: raw.shortSolution,
    fullProgram: raw.fullProgram,
  }
}

function resolveProgramDays(program: ProgramSource): ProgramDaySource[] {
  if (Array.isArray(program.days) && program.days.length > 0) {
    return program.days
  }
  if (Array.isArray(program.oppepaevad) && program.oppepaevad.length > 0) {
    return program.oppepaevad.map(mapOppepaevToDay)
  }
  return []
}

/** Map dereferenced `nineDaysProgram` document → `NineDaysProgram` props. */
export function resolveNineDaysProgramProps(
  program?: ProgramSource | null,
  extras?: {
    ctaSection?: NineDaysProgramProps['ctaSection']
    testimonialsSection?: NineDaysProgramProps['testimonialsSection']
  } | null,
): NineDaysProgramProps | null {
  if (!program) return null

  const days = resolveProgramDays(program)
  if (!program.title?.trim() && days.length === 0) return null

  const selectedHabitsRaw = program.completionSection?.selectedHabits ?? []
  const selectedHabits = selectedHabitsRaw
    .map((item) => (typeof item === 'string' ? item : item?.title))
    .filter((value): value is string => Boolean(value?.trim()))

  return {
    eyebrow: program.eyebrow,
    title: program.title?.trim() || '9-päevane intensiivprogramm',
    titleHighlight: program.titleHighlight,
    subtitle: program.subtitle?.trim() || '',
    habitsQuestionTitle: program.habitsQuestionTitle,
    habitsQuestionSubtitle: program.habitsQuestionSubtitle,
    dayPickerTitle: program.dayPickerTitle,
    viewedCountLabel: program.viewedCountLabel,
    continueButtonText: program.continueButtonText,
    dayGoalLabel: program.dayGoalLabel,
    dayFocusLabel: program.dayFocusLabel,
    dayExtraInfoTitle: program.dayExtraInfoTitle,
    nextDayLabel: program.nextDayLabel,
    finalDayMessage: program.finalDayMessage,
    dayLinkPrefix: program.dayLinkPrefix,
    dayLinkText: program.dayLinkText,
    dayLinkHref: program.dayLinkHref,
    primaryBtnText: program.primaryBtnText,
    primaryBtnLink: program.primaryBtnLink,
    popupTitle:
      program.popupTitle?.trim() ||
      'Saadame programmi sulle e-kirjaga märgitud aadressile.',
    popupSubtitle:
      program.popupSubtitle?.trim() ||
      'Vormi saatmisega kinnitad, et nõustud oma kontaktandmete jagamisega.',
    sidebarCtas: program.sidebarCtas,
    habits: program.habits ?? [],
    days: days as NineDaysProgramProps['days'],
    testimonials: program.testimonials ?? [],
    completionSection: {
      title: program.completionSection?.title ?? '',
      description: program.completionSection?.description ?? '',
      selectedHabits,
      nextCourseInfo: program.completionSection?.nextCourseInfo ?? '',
      buttonText: program.completionSection?.buttonText ?? '',
    },
    faqSection: {
      question: program.faqSection?.question ?? '',
      testimonials: program.faqSection?.testimonials ?? [],
    },
    ctaSection: extras?.ctaSection,
    testimonialsSection: extras?.testimonialsSection,
  }
}