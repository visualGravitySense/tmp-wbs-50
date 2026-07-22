import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'koolitusNineDaysProgramBlock',
  title: '9 päeva programm (Globaalne viide)',
  type: 'object',
  description:
    'Kuvab globaalse 9-päevase programmi sisu viite kaudu. Muuda sisu: menüüst „9 päeva programm" või Site Settings.',
  fields: [
    defineField({
      name: 'nineDaysProgramDocument',
      title: '9 päeva programm',
      type: 'reference',
      to: [{ type: 'nineDaysProgram' }],
      description:
        'Viit globaalsele programmi dokumendile. Vaikimisi: nineDaysProgram singleton.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      docTitle: 'nineDaysProgramDocument->title',
      docLabel: 'nineDaysProgramDocument->label',
    },
    prepare({ docTitle, docLabel }: { docTitle?: string; docLabel?: string }) {
      return {
        title: '9 Päeva Programm',
        subtitle: docLabel || docTitle || 'Globaalne viide',
      }
    },
  },
})