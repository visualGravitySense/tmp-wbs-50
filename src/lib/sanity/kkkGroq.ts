/** Portable Text projection for FAQ answers (links preserved). */
export const FAQ_ANSWER_GROQ = `answer[] {
  ...,
  markDefs[] {
    ...,
    _type == "link" => { _key, _type, href }
  }
}`

/** Dereferenced global FAQ items (primary). */
export const FAQ_QUESTIONS_GROQ = `questions[]->{
  question,
  ${FAQ_ANSWER_GROQ}
}`

/** Legacy inline FAQ items — kept for pages not yet migrated. */
export const FAQ_LEGACY_FAQS_GROQ = `faqs[] {
  question,
  ${FAQ_ANSWER_GROQ}
}`

/** Full KKK section header + questions (with legacy fallback). */
export const KKK_SECTION_GROQ = `
  title,
  eyebrow,
  showEyebrowDots,
  subtitle,
  ${FAQ_QUESTIONS_GROQ},
  ${FAQ_LEGACY_FAQS_GROQ}
`