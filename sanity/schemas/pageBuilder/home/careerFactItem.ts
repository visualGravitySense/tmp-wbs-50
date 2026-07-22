/* eslint-disable @typescript-eslint/no-explicit-any */
export default {
  name: 'careerFactItem',
  title: 'Fakti märksõna',
  type: 'object',
  fields: [
    {
      name: 'text',
      title: 'Märksõna tekst',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
      description: 'Näiteks: "Toyota", "147+", "Esimene"'
    },
    {
      name: 'colorTheme',
      title: 'Värviteema',
      type: 'string',
      options: {
        list: [
          { title: 'Sinine (Blue)', value: 'blue' },
          { title: 'Lilla (Purple)', value: 'purple' },
          { title: 'Roheline (Green)', value: 'green' },
        ],
        layout: 'radio'
      },
      initialValue: 'blue'
    }
  ],
  preview: {
    select: {
      title: 'text',
      subtitle: 'colorTheme'
    },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return {
        title,
        subtitle: `Teema: ${subtitle}`
      }
    }
  }
}
