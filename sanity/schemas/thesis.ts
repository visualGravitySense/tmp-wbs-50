import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'thesis',
  title: 'Lõputöö',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Pealkiri',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'school',
      title: 'Õppeasutus',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Aasta',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(1990).max(2100),
    }),
    defineField({
      name: 'type',
      title: 'Töö liik',
      type: 'string',
      options: {
        list: [
          { title: 'Bakalaureusetöö', value: 'bakalaureusetöö' },
          { title: 'Magistritöö', value: 'magistritöö' },
          { title: 'Doktoritöö', value: 'doktoritöö' },
          { title: 'Lõputöö', value: 'lõputöö' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategooria',
      type: 'string',
      description: 'Näiteks „Tootmine“, „LEAN“, „Juhtimine“',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'industry',
      title: 'Tööstusharu',
      type: 'string',
      description: 'Valdkond (nt Puidutööstus, Elektroonika)',
    }),
    defineField({
      name: 'keywords',
      title: 'Märksõnad',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'abstract',
      title: 'Annotatsioon',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'achievement',
      title: 'Saavutus / eristus',
      type: 'string',
      description: 'Valikuline märge (nt „Parim lõputöö“, „Eriauhind“)',
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Allika link',
      type: 'url',
      description: 'Link lõputöö täisversioonile või andmebaasi kirjelega',
    }),
    defineField({
      name: 'showOnAndresPage',
      title: 'Näita about lehel',
      type: 'boolean',
      description: 'Lülita sisse, et kuvada see lõputöö about alamlehel esiletõstetud projektide all.',
      initialValue: false,
    }),
    defineField({
      name: 'mentorComment',
      title: 'Juhendaja kommentaar',
      type: 'text',
      rows: 4,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      year: 'year',
      school: 'school',
    },
    prepare({ title, author, year, school }) {
      return {
        title: title || 'Lõputöö',
        subtitle: [author, school, year].filter(Boolean).join(' · '),
      }
    },
  },
  orderings: [
    {
      title: 'Aasta (uuemad enne)',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
  ],
})
