import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'kontaktHeroBlock',
  title: 'Kontakt Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Pildiriba (pill)',
      type: 'string',
      initialValue: 'Kontakt ja koostöö',
    }),
    defineField({
      name: 'pageTitle',
      title: 'Pealkiri (H1)',
      type: 'string',
      initialValue: 'Võta ühendust',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Sissejuhatus',
      type: 'text',
      rows: 4,
      initialValue:
        'Kõik koolitused, konsultatsioonid ja Product Name programmid on seotud meie meeskonna praktilise tootmisjuhtimise kogemusega. Kirjuta, helista või täida vorm — leiame koos järgmise sammu.',
    }),
    defineField({
      name: 'image',
      title: 'Hero Pilt (paremal poolel)',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: 'pageTitle' },
    prepare({ title }) {
      return { title: title || 'Kontakt Hero', subtitle: 'Kontakt lehe hero plokk' }
    },
  },
})
