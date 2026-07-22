import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'floatingBadge',
  title: 'Ujuv märgis pildil',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Märgise sildike (Label)',
      type: 'string',
      description: 'Väike ülemine tekst (nt "VISIIDID" või "HINNANG")',
    }),
    defineField({
      name: 'text',
      title: 'Märgise tekst',
      type: 'string',
      description: 'Nt. "100+ tehast külastatud"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon / Sümbol',
      type: 'string',
      description: 'Kasuta "factory" (tehas) või "star" (täht) märgise kõrval kuvamiseks.',
      initialValue: 'factory',
      options: {
        list: [
          { title: 'Tehas (Factory)', value: 'factory' },
          { title: 'Täht (Star)', value: 'star' },
        ],
      },
    }),
    defineField({
      name: 'positionX',
      title: 'Koordinaat X (Horisontaalne asukoht %)',
      type: 'number',
      initialValue: 10,
      validation: (Rule) => Rule.min(0).max(100),
      description: '0% on täiesti vasakul, 100% täiesti paremal.',
    }),
    defineField({
      name: 'positionY',
      title: 'Koordinaat Y (Vertikaalne asukoht %)',
      type: 'number',
      initialValue: 20,
      validation: (Rule) => Rule.min(0).max(100),
      description: '0% on täiesti üleval, 100% täiesti all.',
    }),
  ],
  preview: {
    select: {
      text: 'text',
      icon: 'icon',
      x: 'positionX',
      y: 'positionY',
    },
    prepare({ text, icon, x, y }) {
      const sym = icon === 'star' ? '⭐' : '🏭'
      return {
        title: `${sym} ${text || 'Ujuv märgis'}`,
        subtitle: `Asukoht: X: ${x ?? 10}%, Y: ${y ?? 20}%`,
      }
    },
  },
})
