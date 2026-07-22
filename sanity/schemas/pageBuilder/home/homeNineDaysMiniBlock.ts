import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homeNineDaysMiniBlock',
  title: '9 päeva (mini)',
  type: 'object',
  fields: [
    defineField({
      name: 'nineDaysMini',
      title: '9 päeva programm (avaleht)',
      type: 'nineDaysMini',
    }),
  ],
  preview: {
    select: {
      title: 'nineDaysMini.mainTitle',
      eyebrow: 'nineDaysMini.eyebrow',
    },
    prepare({ title, eyebrow }) {
      return {
        title: title || '9 päeva programm',
        subtitle: eyebrow || 'NineDaysMini',
      }
    },
  },
})
