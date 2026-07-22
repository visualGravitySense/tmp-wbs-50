import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homeGrantBlock',
  title: 'Toetuse sektsioon',
  type: 'object',
  fields: [
    defineField({
      name: 'grantSection',
      title: 'Grant Section',
      type: 'grantSectionContent',
    }),
  ],
  preview: {
    select: {
      title: 'grantSection.title',
      highlight: 'grantSection.highlightedTitle',
    },
    prepare({ title, highlight }) {
      return {
        title: [title, highlight].filter(Boolean).join(' ') || 'Toetuse sektsioon',
        subtitle: 'Töötukassa',
      }
    },
  },
})
