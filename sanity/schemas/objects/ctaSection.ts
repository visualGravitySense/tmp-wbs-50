import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'ctaSection',
  title: 'CTA plokk',
  type: 'object',
  fields: [
    defineField({
      name: 'subtitle',
      title: 'Märksõna (pill üleval)',
      type: 'string',
      description: 'Lühike tekst valges pillis, nt „REGISTREERU KOOLITUSELE”.',
    }),
    defineField({
      name: 'title',
      title: 'Pealkiri',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Alapealkiri / lühitekst',
      type: 'text',
      rows: 3,
      description: 'Tekst pealkirja all (kuupäevad, kohtade arv jms).',
    }),
    defineField({
      name: 'primaryButtonText',
      title: 'Põhinupu tekst',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'primaryButtonUrl',
      title: 'Põhinupu link',
      type: 'string',
      description: 'Sisemine tee (/kontakt) või täielik URL (https://…).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'secondaryButtonText',
      title: 'Teise nupu tekst (valikuline)',
      type: 'string',
    }),
    defineField({
      name: 'secondaryButtonUrl',
      title: 'Teise nupu link (valikuline)',
      type: 'string',
    }),
    defineField({
      name: 'trustFootnote',
      title: 'Väike tekst riba all',
      type: 'string',
      description: 'Nt „Kohtade arv on piiratud”. Jäta tühjaks, et peita rida.',
    }),
    defineField({
      name: 'primaryButtonIcon',
      title: 'Põhinupu ikoon',
      type: 'string',
      description: 'Jäta tühjaks noole jaoks. Või emoji: 🚀 📞 📩',
    }),
    defineField({
      name: 'secondaryButtonIcon',
      title: 'Teise nupu ikoon',
      type: 'string',
      description: 'Jäta tühjaks kirja jaoks. Või emoji: 🔍 📞',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Tausta gradient (varu)',
      type: 'string',
      hidden: true,
      options: {
        list: [
          { title: 'Blue to Purple', value: 'blue-purple' },
          { title: 'Purple to Pink', value: 'purple-pink' },
          { title: 'Green to Blue', value: 'green-blue' },
          { title: 'Orange to Red', value: 'orange-red' },
          { title: 'Blue to Light Blue', value: 'blue-lightblue' },
        ],
      },
      initialValue: 'blue-purple',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      primaryButtonText: 'primaryButtonText',
    },
    prepare({ title, subtitle, primaryButtonText }) {
      return {
        title: title || 'CTA plokk',
        subtitle: [subtitle, primaryButtonText].filter(Boolean).join(' · '),
      }
    },
  },
})
