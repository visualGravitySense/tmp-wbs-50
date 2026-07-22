import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'kontaktOpstarBlock',
  title: 'Kontakt OPSTAR PROFIT',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Pealkiri',
      type: 'string',
      initialValue: 'OPSTAR PROFIT™',
    }),
    defineField({
      name: 'tagline',
      title: 'Alapealkiri',
      type: 'string',
      initialValue: 'Tootmisjuhtimise raamistik Eesti ettevõtetele',
    }),
    defineField({
      name: 'description',
      title: 'Kirjeldus',
      type: 'text',
      rows: 4,
      initialValue:
        'Kaheksa komponendiga süsteem, mis on loodud Eesti tootmisettevõtete vajadustest — kiirem rakendamine kui abstraktne LEAN, selged tööriistad ja mõõdetavad tulemused. Koolitused ja sertifikaadid viivad läbi Andres Kase.',
    }),
    defineField({
      name: 'bullets',
      title: 'Täpploend',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: [
        '8-komponentne raamistik ja praktilised tööriistad',
        'Tehasekülastused ja reaalsete näidete põhine õpe',
        'Rahvusvaheline tunnistus programmi lõpetamisel',
      ],
    }),
    defineField({
      name: 'linkLabel',
      title: 'Lingi tekst',
      type: 'string',
      initialValue: 'Tutvu OPSTAR PROFIT™ raamistikuga →',
    }),
    defineField({
      name: 'linkHref',
      title: 'Link',
      type: 'string',
      initialValue: '/opstar-profit',
    }),
  ],
  preview: {
    select: { title: 'name' },
    prepare({ title }) {
      return { title: title || 'OPSTAR PROFIT', subtitle: 'Lühike tutvustav plokk kontaktlehel' }
    },
  },
})
