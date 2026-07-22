import { defineField, defineType } from 'sanity'

import { nineDaysProgramFields } from '../fields/nineDaysProgramFields'

/** Global singleton for 9-day program content (referenced from page builder blocks). */
export default defineType({
  name: 'nineDaysProgram',
  title: '9 päeva programm (globaalne)',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Dokumendi silt (Studio)',
      type: 'string',
      initialValue: '9 päeva programm',
      validation: (Rule) => Rule.required(),
    }),
    ...nineDaysProgramFields,
  ],
  preview: {
    select: { label: 'label', title: 'title' },
    prepare({ label, title }: { label?: string; title?: string }) {
      return {
        title: label || '9 päeva programm',
        subtitle: title || 'Globaalne programmi sisu',
      }
    },
  },
})