import { defineField, defineType } from 'sanity'
import type { Review } from '../../types/review'

/** Field layout matches {@link Review}. */
export default defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    defineField({
      name: 'author' satisfies keyof Review,
      title: 'Author',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label' satisfies keyof Review,
      title: 'Label',
      description: 'Job title, company, or similar (optional)',
      type: 'string',
    }),
    defineField({
      name: 'industry' satisfies keyof Review,
      title: 'Tegevusala (Industry)',
      type: 'string',
      description: 'Valdkond (nt Puidutööstus, Laevaehitus). Kasutatakse tagasiside lehe filtris.',
    }),
    defineField({
      name: 'text' satisfies keyof Review,
      title: 'Text',
      type: 'text',
      rows: 6,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'author',
      subtitle: 'label',
    },
  },
})
