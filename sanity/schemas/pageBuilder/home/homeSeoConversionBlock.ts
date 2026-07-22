import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homeSeoConversionBlock',
  title: 'SEO & konversioon',
  type: 'object',
  fields: [
    defineField({
      name: 'seoConversionSection',
      title: 'SEO & konversioon',
      type: 'seoConversionSectionContent',
    }),
  ],
  preview: {
    select: {
      title: 'seoConversionSection.title',
      eyebrow: 'seoConversionSection.eyebrow',
    },
    prepare({ title, eyebrow }) {
      return {
        title: title || 'Põhimõisted',
        subtitle: eyebrow ? `SEO plokk: ${eyebrow}` : 'SEO plokk',
      }
    },
  },
})
