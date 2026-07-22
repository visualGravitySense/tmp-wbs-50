import { defineField, defineType } from 'sanity'

/** @deprecated Use painPointsBlock (variant: grid). */
export default defineType({
  name: 'painBlock',
  title: 'Valu blokk (legacy)',
  type: 'object',
  deprecated: { reason: 'Kasuta painPointsBlock (variant: grid)' },
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'subheading', title: 'Subheading', type: 'string' }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text' }),
          ],
        },
      ],
    }),
    defineField({ name: 'bottomText', title: 'Bottom text', type: 'text' }),
    defineField({ name: 'ctaText', title: 'CTA text', type: 'string' }),
    defineField({ name: 'ctaLink', title: 'CTA link', type: 'string' }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }: { title?: string }) {
      return { title: title || 'Valu blokk (legacy)', subtitle: '→ painPointsBlock grid' }
    },
  },
})