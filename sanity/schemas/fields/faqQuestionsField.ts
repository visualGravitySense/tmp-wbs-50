import { defineField } from 'sanity'

/** Shared FAQ picker — references global `faqItem` documents (mirrors `partnerLogo` pattern). */
export const faqQuestionsField = defineField({
  name: 'questions',
  title: 'Küsimused ja vastused',
  description:
    'Vali globaalsest "KKK küsimus/vastus" nimekirjast. Sama küsimust saab kasutada mitmel lehel.',
  type: 'array',
  of: [{ type: 'reference', to: [{ type: 'faqItem' }] }],
  validation: (Rule) => Rule.min(1),
})