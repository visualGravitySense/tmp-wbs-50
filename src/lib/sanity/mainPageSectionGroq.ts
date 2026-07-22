/** GROQ field projections for `mainPage` legacy sections (mirrored in builder blocks). */

export const QUIZ_SECTION_GROQ = `
  title,
  eyebrow,
  introTopLine,
  introAccentLine,
  introDescription,
  questions[]{
    question,
    options[]{
      text,
      points
    }
  },
  results[]{
    minScore,
    title,
    description,
    ctaLink
  }
`

export const HELP_FORM_TEASER_GROQ = `
  enabled,
  eyebrow,
  title,
  description,
  buttonText,
  image{
    asset->
  },
  questions[]{
    question,
    options
  }
`

export const SEO_CONVERSION_SECTION_GROQ = `
  enabled,
  anchorId,
  eyebrow,
  title,
  intro,
  terms[]{
    termId,
    title,
    subtitle,
    description
  }
`

export const CHALLENGES_SECTION_GROQ = `
  title,
  managerTitle,
  participantTitle,
  collectiveTitle,
  managerChallenges,
  participantChallenges,
  collectiveChallenges,
  conclusion
`

export const NINE_DAYS_MINI_GROQ = `
  eyebrow,
  mainHeading,
  mainTitle,
  italicTitle,
  subtitle,
  greenButtonText,
  greenButtonLink,
  whiteButtonText,
  whiteButtonLink,
  overviewLabel,
  dayPickerLabel,
  progressLabel,
  dayBadgePrefix,
  habitLabel,
  planCtaPrefix,
  planCtaLinkText,
  planCtaLinkUrl,
  planButtonText,
  planButtonLink,
  programDays{
    day1{ dayNumber, title, subtitle, habit, typeLabel, companyPainTitle, companyPain, shortSolution, participantWins, companyWins },
    day2{ dayNumber, title, subtitle, habit, typeLabel, companyPainTitle, companyPain, shortSolution, participantWins, companyWins },
    day3{ dayNumber, title, subtitle, habit, typeLabel, companyPainTitle, companyPain, shortSolution, participantWins, companyWins },
    day4{ dayNumber, title, subtitle, habit, typeLabel, companyPainTitle, companyPain, shortSolution, participantWins, companyWins },
    day5{ dayNumber, title, subtitle, habit, typeLabel, companyPainTitle, companyPain, shortSolution, participantWins, companyWins },
    day6{ dayNumber, title, subtitle, habit, typeLabel, companyPainTitle, companyPain, shortSolution, participantWins, companyWins },
    day7{ dayNumber, title, subtitle, habit, typeLabel, companyPainTitle, companyPain, shortSolution, participantWins, companyWins },
    day8{ dayNumber, title, subtitle, habit, typeLabel, companyPainTitle, companyPain, shortSolution, participantWins, companyWins },
    day9{ dayNumber, title, subtitle, habit, typeLabel, companyPainTitle, companyPain, shortSolution, participantWins, companyWins }
  },
  oppepaevad[]->{
    dayNumber,
    tag,
    title,
    habitsFocus,
    companyPain,
    shortSolution
  },
  days[]{
    dayNumber,
    title,
    subtitle,
    habit,
    typeLabel,
    companyPainTitle,
    companyPain,
    shortSolution,
    participantWins,
    companyWins
  },
  leadForm{
    introTitle,
    introText,
    emailLabel,
    emailPlaceholder,
    submitText,
    submitPendingText,
    closeText,
    successTitle,
    successText,
    readMoreLinkText
  },
  faqSection{
    question,
    testimonials[]{
      quote,
      author
    }
  }
`

export const GRANT_SECTION_GROQ = `
  eyebrow,
  percentLabel,
  lightImage { asset-> { _id, url } },
  darkImage { asset-> { _id, url } },
  title,
  highlightedTitle,
  description,
  ctaText,
  ctaLink,
  responseText,
  infoPrefix,
  infoHighlight,
  infoSuffix,
  steps[]{
    title,
    description,
    highlight
  }
`

export const ABOUT_ANDRES_SECTION_GROQ = `
  eyebrow,
  title,
  subtitle,
  quote,
  description,
  tags,
  stats{
    value,
    label
  },
  certificationLink,
  mainImage{
    asset->,
    alt
  },
  overlayImage{
    asset->,
    alt
  },
  overlayImage2{
    asset->,
    alt
  }
`

export const PHOTO_MARQUEE_SECTION_GROQ = `
  title,
  subtitle,
  mobileLayout,
  gradientFrom,
  gradientTo,
  cta{
    text,
    link
  },
  "photos": *[_id == "galleryPage"][0].images[]{
    "image": {
      "asset": asset->{
        ...,
        "blurDataURL": metadata.lqip
      },
      "alt": alt
    },
    caption,
    showOnMain
  }
`

export const BEFORE_AFTER_SECTION_GROQ = `
  title,
  subtitle,
  eyebrow,
  highlightText,
  transformations[]{
    before,
    after
  },
  materialsTitle,
  materialsDescription,
  bookTitle,
  bookDescription,
  resultTitle,
  resultDescription,
  buttonText,
  buttonLink
`

export const PRICING_SECTION_GROQ = `
  title,
  subtitle,
  popularBadgeText,
  ctaText,
  footerNotice,
  supportNotePrefix,
  supportNoteHighlight,
  tiers[]{
    name,
    price,
    description,
    features,
    isPopular
  },
  corporateTitle,
  corporateSubtitle,
  corporatePrice,
  corporatePricePrefix,
  corporatePriceTaxLabel,
  corporatePriceSuffix,
  corporateFeatures,
  corporateCtaText,
  corporateBadgeText,
  hideCorporateBlock
`

export const FINAL_CTA_GROQ = `
  title,
  subtitle,
  nextGroupInfo,
  spotsInfo,
  supportInfo,
  supportPrefix,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  footerText
`

export const PROGRAM_DAYS_TABS_GROQ = `
  eyebrow,
  title,
  scriptTitle,
  isMinimal,
  popupTitle,
  popupSubtitle,
  days[]{
    dayNumber,
    tag,
    title,
    quote,
    description,
    fullPoints,
    typeLabel,
    companyPainTitle,
    companyPain,
    shortSolution,
    participantWins,
    companyWins
  }
`
