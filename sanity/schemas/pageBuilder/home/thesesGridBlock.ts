import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'thesesGridBlock',
  title: 'Lõputööde võrgustik',
  type: 'object',
  fields: [
    defineField({
      name: 'variant',
      title: 'Vaate tüüp',
      type: 'string',
      options: {
        list: [
          { title: 'Preview (Kompaktne vaade)', value: 'preview' },
          { title: 'Full (Täielik nimekiri filtritega)', value: 'full' }
        ],
        layout: 'radio'
      },
      initialValue: 'preview'
    }),
    defineField({
      name: 'sectionTitle',
      title: 'Sektsiooni pealkiri',
      type: 'string',
      initialValue: 'Juhendatud lõputööd',
    }),
    defineField({
      name: 'sectionSubtitle',
      title: 'Sektsiooni alapealkiri',
      type: 'text',
      rows: 2,
      initialValue: 'Valik juhendatud bakalaureuse- ja magistritöid tootmise ja juhtimise valdkonnast.',
    }),
    defineField({
      name: 'theses',
      title: 'Lõputööd',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'thesis' }] }],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: {
      title: 'sectionTitle',
      count: 'theses.length',
    },
    prepare({ title, count }) {
      return {
        title: title || 'Lõputööde võrgustik',
        subtitle: count ? `${count} lõputöö(d)` : 'Lõputöid pole valitud',
      }
    },
  },
})
