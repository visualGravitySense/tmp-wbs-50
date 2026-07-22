import { defineType, defineField } from 'sanity'

import { faqAnswerPortableText } from './objects/faqAnswerBlock'

export default defineType({
  name: 'faqItem',
  title: 'KKK küsimus/vastus',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Küsimus',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Vastus',
      description: 'Vormindus: loendid, paks kiri, lingid.',
      type: 'array',
      of: [faqAnswerPortableText],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: 'question' },
    prepare({ title }: { title?: string }) {
      return { title: title || 'KKK küsimus/vastus' }
    },
  },
})