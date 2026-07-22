import { defineField, defineType } from 'sanity'

/**
 * Standalone "Mis on OPSTAR?" comparison block — inline fields only.
 */
export default defineType({
  name: 'opstarComparisonBlock',
  title: 'Mis on OPSTAR? (võrdlus)',
  type: 'object',
  fields: [
    defineField({
      name: 'comparison',
      title: 'Võrdluse sisu',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'title',
          title: 'Pealkiri',
          type: 'string',
          initialValue: 'Mis on OPSTAR PROFIT™?',
        }),
        defineField({
          name: 'eyebrow',
          title: 'Silmapealiskiri',
          type: 'string',
        }),
        defineField({
          name: 'subtitle',
          title: 'Alapealkiri',
          type: 'text',
          rows: 2,
          initialValue:
            'Lihtne seletus — ilma žargoonita. Mis see on ja mis see ei ole.',
        }),
        defineField({
          name: 'comparisonItems',
          title: 'Võrdluse read',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'opstarComparisonRow',
              fields: [
                defineField({
                  name: 'isNot',
                  title: 'Mis see EI ole',
                  type: 'string',
                }),
                defineField({
                  name: 'is',
                  title: 'Mis see ON',
                  type: 'string',
                }),
              ],
              preview: {
                select: { isNot: 'isNot', is: 'is' },
                prepare({ isNot, is }: { isNot?: string; is?: string }) {
                  return {
                    title: isNot || is || 'Võrdlusrida',
                    subtitle: is && isNot ? is : undefined,
                  }
                },
              },
            },
          ],
        }),
        defineField({
          name: 'backgroundColor',
          title: 'Taustavärv',
          type: 'string',
          initialValue: 'bg-gray-50',
        }),
        defineField({
          name: 'titleColor',
          title: 'Pealkirja värv',
          type: 'string',
          initialValue: 'text-gray-900',
        }),
        defineField({
          name: 'isNotColor',
          title: 'Ei-veeru värv',
          type: 'string',
          initialValue: 'text-red-600',
        }),
        defineField({
          name: 'isColor',
          title: 'On-veeru värv',
          type: 'string',
          initialValue: 'text-green-600',
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'comparison.title' },
    prepare({ title }: { title?: string }) {
      return {
        title: title || 'Mis on OPSTAR? (võrdlus)',
        subtitle: 'OPSTAR Profit',
      }
    },
  },
})