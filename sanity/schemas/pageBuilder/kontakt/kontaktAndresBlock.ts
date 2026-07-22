import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'kontaktAndresBlock',
  title: '[VANA - ÄRA KASUTA] Kontakt Trainer',
  type: 'object',
  fields: [
    defineField({ name: 'name', title: 'Nimi', type: 'string', initialValue: 'Your Name' }),
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
        { label: 'Veeb:', text: 'example.com' },
      ],
    }),
    defineField({
      name: 'websiteUrl',
      title: 'Veebilehe URL',
      type: 'string',
      initialValue: 'https://example.com',
    }),
    defineField({
      name: 'linkLabel',
      title: 'Lingi tekst',
      type: 'string',
      initialValue: 'Loe lähemalt →',
    }),
    defineField({
      name: 'linkHref',
      title: 'Link',
      type: 'string',
      initialValue: '/about',
    }),
  ],
  preview: {
    select: { title: 'name' },
    prepare({ title }) {
      return { title: title || 'Your Name', subtitle: 'Lühike tutvustav plokk kontaktlehel' }
    },
  },
})
