import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homeFinalCtaBlock',
  title: 'Lõpu CTA',
  type: 'object',
  fields: [
    defineField({
      name: 'finalCTA',
      title: 'Lõpu CTA (sinine bänner)',
      type: 'finalCtaBlock',
      options: { collapsible: true, collapsed: true },
    }),
  ],
  preview: {
    select: {
      title: 'finalCTA.title',
      subtitle: 'finalCTA.subtitle',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Lõpu CTA',
        subtitle: subtitle || 'Sinine bänner',
      }
    },
  },
})
