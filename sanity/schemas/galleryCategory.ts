import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'galleryCategory',
  title: 'Galerii kategooria',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Kategooria nimi',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
