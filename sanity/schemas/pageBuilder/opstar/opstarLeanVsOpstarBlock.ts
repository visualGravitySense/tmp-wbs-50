import { defineField, defineType } from 'sanity'

/**
 * Standalone LEAN vs OPSTAR block — inline fields only (no opstarCoreFields
 * references) to prevent Studio form freeze on /opstar-profit.
 */
export default defineType({
  name: 'opstarLeanVsOpstarBlock',
  title: 'LEAN vs OPSTAR PROFIT™',
  type: 'object',
  fields: [
    defineField({
      name: 'leanVsOpstar',
      title: 'Võrdluse sisu',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'title',
          title: 'Pealkiri',
          type: 'string',
          initialValue: 'LEAN vs OPSTAR PROFIT™',
        }),
        defineField({
          name: 'eyebrow',
          title: 'Silmapealiskiri',
          type: 'string',
          initialValue: 'Võrdlus',
        }),
        defineField({
          name: 'subtitle',
          title: 'Alapealkiri',
          type: 'text',
          rows: 2,
          initialValue:
            'Vali tuttav valu — vaata, kuidas Lean ja OPSTAR PROFIT™ seda erinevalt lahendavad.',
        }),
        defineField({
          name: 'comparisonItems',
          title: 'Valu stsenaariumid',
          description:
            'Iga rida on üks interaktiivne vahekaart (nt "Protsessid ei tööta").',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'leanVsOpstarRow',
              fields: [
                defineField({
                  name: 'criterion',
                  title: 'Stsenaariumi silt',
                  type: 'string',
                }),
                defineField({
                  name: 'leanValue',
                  title: 'Kuidas LEAN seda käsitleb',
                  type: 'text',
                  rows: 3,
                }),
                defineField({
                  name: 'opstarValue',
                  title: 'Kuidas OPSTAR PROFIT™ seda käsitleb',
                  type: 'text',
                  rows: 3,
                }),
                defineField({
                  name: 'opstarHasAdvantage',
                  title: 'OPSTAR eelis',
                  type: 'boolean',
                  initialValue: true,
                }),
              ],
              preview: {
                select: { title: 'criterion' },
                prepare({ title }: { title?: string }) {
                  return { title: title || 'Stsenaarium' }
                },
              },
            },
          ],
        }),
        defineField({
          name: 'cta',
          title: 'Kutse tegevusele',
          type: 'object',
          fields: [
            defineField({ name: 'text', title: 'Pealkiri', type: 'string' }),
            defineField({ name: 'subtitle', title: 'Alapealkiri', type: 'string' }),
            defineField({ name: 'buttonText', title: 'Nupu tekst', type: 'string' }),
            defineField({ name: 'buttonUrl', title: 'Nupu link', type: 'string' }),
          ],
        }),
        defineField({
          name: 'backgroundColor',
          title: 'Taustavärv (Tailwind)',
          type: 'string',
          initialValue: 'bg-white',
        }),
        defineField({
          name: 'titleColor',
          title: 'Pealkirja värv',
          type: 'string',
          initialValue: 'text-gray-900',
        }),
        defineField({
          name: 'eyebrowColor',
          title: 'Silmapealiskirja värv',
          type: 'string',
          initialValue: 'text-blue-600',
        }),
        defineField({
          name: 'opstarColumnColor',
          title: 'OPSTAR veeru värv',
          type: 'string',
          initialValue: 'bg-blue-50 border-blue-200',
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'leanVsOpstar.title' },
    prepare({ title }: { title?: string }) {
      return {
        title: title || 'LEAN vs OPSTAR PROFIT™',
        subtitle: 'OPSTAR Profit',
      }
    },
  },
})