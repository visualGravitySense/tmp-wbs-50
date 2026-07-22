import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homeAboutBlock',
  title: '[VANA - ÄRA KASUTA] Andres Kase vana',
  type: 'object',
  fields: [
    defineField({
      name: 'aboutAndres',
      title: 'About Andres Section',
      type: 'aboutAndresSectionContent',
    }),
  ],
  preview: {
    select: {
      title: 'aboutAndres.title',
      subtitle: 'aboutAndres.subtitle',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Andres Kase',
        subtitle: subtitle || 'About',
      }
    },
  },
})
