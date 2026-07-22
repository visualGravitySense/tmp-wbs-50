import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homeKkkBlock',
  title: 'KKK (FAQ)',
  type: 'object',
  fields: [
    defineField({
      name: 'kkkSection',
      title: 'KKK Section',
      type: 'kkkSection',
    }),
  ],
  preview: {
    select: {
      title: 'kkkSection.title',
    },
    prepare({ title }) {
      return {
        title: title || 'KKK (FAQ)',
        subtitle: 'Avaleht · KKK',
      }
    },
  },
})
