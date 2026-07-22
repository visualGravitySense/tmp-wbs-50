import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homeAboutBlock',
  title: '[VANA - ÄRA KASUTA] Trainer vana',
  type: 'object',
  fields: [
    defineField({
      name: 'aboutAndres',
      title: 'About Trainer Section',
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
        title: title || 'Your Name',
        subtitle: subtitle || 'About',
      }
    },
  },
})
