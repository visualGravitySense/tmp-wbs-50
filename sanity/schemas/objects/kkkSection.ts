import { defineType, defineField } from 'sanity'

import { faqQuestionsField } from '../fields/faqQuestionsField'

export default defineType({
  name: 'kkkSection',
  title: 'KKK (FAQ)',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Pealkiri',
      type: 'string',
      initialValue: 'Korduma kippuvad küsimused',
    }),
    defineField({
      name: 'eyebrow',
      title: 'Märksõna pillis',
      type: 'string',
      initialValue: 'KKK',
    }),
    defineField({
      name: 'showEyebrowDots',
      title: 'Näita punkte pillis',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'subtitle',
      title: 'Alapealkiri (valikuline)',
      type: 'text',
      rows: 2,
      initialValue: 'Lühivastused Andrese kogemuse, koostöö ja koolituste kohta.',
    }),
    faqQuestionsField,
  ],
})