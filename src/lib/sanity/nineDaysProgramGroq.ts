/**
 * Shared GROQ projection for `siteSettings.nineDaysProgram`.
 * Used by site settings fetch and any page that needs global 9-day program data.
 */
export const NINE_DAYS_PROGRAM_GROQ = `
  eyebrow,
  title,
  titleHighlight,
  subtitle,
  backgroundColor,
  habitsQuestionTitle,
  habitsQuestionSubtitle,
  dayPickerTitle,
  viewedCountLabel,
  continueButtonText,
  dayGoalLabel,
  dayFocusLabel,
  dayExtraInfoTitle,
  nextDayLabel,
  finalDayMessage,
  dayLinkPrefix,
  dayLinkText,
  dayLinkHref,
  primaryBtnText,
  primaryBtnLink,
  popupTitle,
  popupSubtitle,
  sidebarCtas {
    registerText,
    registerUrl,
    readMoreText,
    readMoreUrl
  },
  habits[] {
    _key,
    day,
    title,
    description,
    icon,
    benefit
  },
  oppepaevad[]->{
    dayNumber,
    tag,
    title,
    habitsFocus,
    companyPain,
    shortSolution,
    fullProgram,
    infoCards[] {
      title,
      body
    }
  },
  days[] {
    dayNumber,
    habit,
    tag,
    title,
    description,
    infoCards[] {
      title,
      body
    }
  },
  testimonials[] {
    quote,
    author,
    company,
    position
  },
  completionSection {
    title,
    description,
    selectedHabits[] {
      _key,
      title,
      description,
      icon
    },
    nextCourseInfo,
    buttonText
  },
  faqSection {
    question,
    testimonials[] {
      quote,
      author,
      company,
      position
    }
  }
`