import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'oppepaev',
  title: 'Õppepäev (Training Day)',
  type: 'document',
  fields: [
    defineField({
      name: 'dayNumber',
      title: 'Day Number',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'tag',
      title: 'Tag / Phase',
      type: 'string',
      description: 'Näide: Vundament, Õppepäev, Praktika',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'habitsFocus',
      title: 'Day Goal / Focus (Habit)',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'companyPain',
      title: 'Valu Ettevõttes (Company Pain)',
      description: 'The bullet points shown on the homepage for this day.',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'shortSolution',
      title: 'Mida sel päeval teeme (Short Solution)',
      description: 'The preview list of what happens during this day.',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'fullProgram',
      title: 'Full Program / Main Description',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Peamine kirjeldus paremas suures kaardis.',
    }),
    defineField({
      name: 'infoCards',
      title: 'Info Cards',
      type: 'array',
      description: 'Lisakaardid sama päeva jaoks (nt "Osaleja saab", "Juht / Org võidab").',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Card Title',
              type: 'string',
            },
            {
              name: 'body',
              title: 'Card Body',
              type: 'array',
              of: [{ type: 'block' }],
              validation: (Rule: any) => Rule.required().min(1),
            },
          ],
          preview: {
            select: { title: 'title' },
            prepare(selection: any) {
              return {
                title: selection?.title || 'Info card',
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      dayNumber: 'dayNumber',
      title: 'title',
    },
    prepare(selection: any) {
      const day = selection?.dayNumber ? `Päev ${selection.dayNumber}` : 'Päev'
      return {
        title: `${day}: ${selection?.title || 'Untitled'}`,
      }
    },
  },
})
