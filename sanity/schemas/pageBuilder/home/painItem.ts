import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'painItem',
  title: 'Valu punkt',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Pealkiri (Probleem)',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Kirjeldus',
      type: 'text',
    }),
  ],
})
