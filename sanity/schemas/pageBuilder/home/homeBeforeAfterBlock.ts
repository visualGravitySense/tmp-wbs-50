import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homeBeforeAfterBlock',
  title: 'Enne / pärast',
  type: 'object',
  fields: [
    defineField({
      name: 'beforeAfter',
      title: 'Before/After Transformation Section',
      type: 'beforeAfterSectionContent',
    }),
  ],
  preview: {
    select: {
      title: 'beforeAfter.title',
      subtitle: 'beforeAfter.subtitle',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Enne / pärast',
        subtitle: subtitle || 'Transformatsioon',
      }
    },
  },
})
