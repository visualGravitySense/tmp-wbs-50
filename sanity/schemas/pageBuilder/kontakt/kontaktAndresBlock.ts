import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'kontaktAndresBlock',
  title: '[VANA - ÄRA KASUTA] Kontakt Andres Kase',
  type: 'object',
  fields: [
    defineField({ name: 'name', title: 'Nimi', type: 'string', initialValue: 'Andres Kase' }),
    defineField({
      name: 'role',
      title: 'Roll',
      type: 'string',
      initialValue: 'Tootmisjuhtimise koolitaja ja konsultant',
    }),
    defineField({
      name: 'description',
      title: 'Kirjeldus',
      type: 'text',
      rows: 4,
      initialValue:
        'Eesti juhtiv tootmisjuhtimise koolitaja — üle 25 aasta praktikat tootmisettevõtetes, 100+ tehase kogemus ja personaalsed programmid, mis ühendavad LEAN, TPS ja reaalse põranda töö.',
    }),
    defineField({
      name: 'highlights',
      title: 'Täpploend',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Silt (paks)', type: 'string' }),
            defineField({ name: 'text', title: 'Tekst', type: 'string' }),
          ],
          preview: { select: { title: 'label', subtitle: 'text' } },
        },
      ],
      initialValue: [
        { label: 'Koolitused:', text: '9-päevane tootmisjuhtide programm ja ettevõttesisesed lahendused' },
        { label: 'Konsultatsioon:', text: 'protsessid, KPI, Gemba, meeskonna areng' },
        { label: 'Veeb:', text: 'tootmisjuhtimine.ee' },
      ],
    }),
    defineField({
      name: 'websiteUrl',
      title: 'Veebilehe URL',
      type: 'string',
      initialValue: 'https://tootmisjuhtimine.ee',
    }),
    defineField({
      name: 'linkLabel',
      title: 'Lingi tekst',
      type: 'string',
      initialValue: 'Loe lähemalt Andresest →',
    }),
    defineField({
      name: 'linkHref',
      title: 'Link',
      type: 'string',
      initialValue: '/andres-kase',
    }),
  ],
  preview: {
    select: { title: 'name' },
    prepare({ title }) {
      return { title: title || 'Andres Kase', subtitle: 'Lühike tutvustav plokk kontaktlehel' }
    },
  },
})
