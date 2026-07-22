import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'koolitusFeaturesBlock',
  title: 'Miks valida meie programm (omadused)',
  type: 'object',
  fields: [
    defineField({
      name: 'featuresSection',
      title: 'Sektsiooni tekstid ja eeliste kaardid',
      type: 'object',
      options: { collapsible: false },
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Eyebrow (ülemine silt)',
          type: 'string',
          initialValue: 'Omadused',
          description: 'Nt „Omadused“ pill pealkirja kohal.',
        }),
        defineField({
          name: 'title',
          title: 'Pealkiri',
          type: 'string',
          initialValue: 'Miks valida meie 9-päevane programm?',
        }),
        defineField({
          name: 'subtitle',
          title: 'Alapealkiri',
          type: 'text',
          rows: 2,
          initialValue: 'Unikaalne lähenemine, mis tagasi reaalsed tulemused',
        }),
        defineField({
          name: 'features',
          title: 'Eeliste kaardid',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'koolitusFeatureItem',
              fields: [
                defineField({
                  name: 'icon',
                  title: 'Ikoon (emoji või lühitekst)',
                  type: 'string',
                }),
                defineField({
                  name: 'title',
                  title: 'Kaardi pealkiri',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'description',
                  title: 'Kirjeldus',
                  type: 'text',
                  rows: 3,
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: { title: 'title', icon: 'icon' },
                prepare({ title, icon }: { title?: string; icon?: string }) {
                  return {
                    title: title || 'Eelise kaart',
                    subtitle: icon || undefined,
                  }
                },
              },
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'featuresSection.title',
      subtitle: 'featuresSection.subtitle',
      count: 'featuresSection.features',
    },
    prepare({
      title,
      subtitle,
      count,
    }: {
      title?: string
      subtitle?: string
      count?: unknown[]
    }) {
      const n = Array.isArray(count) ? count.length : 0
      return {
        title: title || 'Miks valida meie 9-päevane programm?',
        subtitle: subtitle
          ? `${subtitle.slice(0, 60)}${subtitle.length > 60 ? '…' : ''}`
          : n
            ? `${n} eelise kaarti`
            : 'Omadused',
      }
    },
  },
})