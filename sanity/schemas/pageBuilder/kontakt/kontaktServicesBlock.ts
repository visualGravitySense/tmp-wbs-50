import { defineField, defineType } from 'sanity'

const linkFields = [
  defineField({
    name: 'label',
    title: 'Lingi tekst',
    type: 'string',
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'href',
    title: 'URL või tee',
    type: 'string',
    validation: (Rule) => Rule.required(),
  }),
]

export default defineType({
  name: 'kontaktServicesBlock',
  title: 'Kontakt Teenused',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Ploki pealkiri',
      type: 'string',
      initialValue: 'Mille jaoks võtta ühendust?',
    }),
    defineField({
      name: 'items',
      title: 'Kaardid',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Pealkiri', type: 'string' }),
            defineField({ name: 'text', title: 'Tekst', type: 'text', rows: 2 }),
            ...linkFields,
          ],
          preview: { select: { title: 'title', subtitle: 'label' } },
        },
      ],
      initialValue: [
        {
          title: 'Koolitus ja registreerumine',
          text: '9-päevane programm, vabad kohad, Töötukassa toetus.',
          label: 'Koolitusleht',
          href: '/koolitus',
        },
        {
          title: 'Konsultatsioon',
          text: 'Tehase külastus, audit või juhtimise arendus.',
          label: 'Konsultatsioonid',
          href: '/andres-kase',
        },
        {
          title: 'OPSTAR PROFIT™',
          text: 'Raamistiku tutvustus ja rakendamine ettevõttes.',
          label: 'OPSTAR leht',
          href: '/opstar-profit',
        },
      ],
    }),
    defineField({
      name: 'registerNote',
      title: 'Registreerumise tekst',
      type: 'text',
      rows: 2,
      initialValue:
        'Oled valmis registreeruma? Täida registreerimisvorm — vastame küsimustele enne kinnitamist.',
    }),
    defineField({
      name: 'registerButtonText',
      title: 'Registreerumise nupu tekst',
      type: 'string',
      initialValue: 'Registreeru kursusele',
    }),
    defineField({
      name: 'registerButtonHref',
      title: 'Registreerumise nupu link',
      type: 'string',
      initialValue: '/register',
    }),
  ],
  preview: {
    select: { title: 'sectionTitle' },
    prepare({ title }) {
      return { title: title || 'Teenused', subtitle: 'Kolme kaardiga teenuste plokk' }
    },
  },
})
