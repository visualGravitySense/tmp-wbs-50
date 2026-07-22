import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'partnerLogo',
  title: 'Partner Logo',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Company Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessiblity.',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'industry',
      title: 'Tegevusala (Industry)',
      type: 'string',
      description: 'Näiteks: Tootmine, Logistika, Tehnoloogia',
    }),
    defineField({
      name: 'country',
      title: 'Riik (Country)',
      type: 'string',
      description: 'Riigi nimi (nt. Eesti)',
    }),
    defineField({
      name: 'url',
      title: 'Website URL',
      type: 'url',
      description: 'Optional link to company website',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
      url: 'url',
    },
    prepare(selection) {
      const { title, media, url } = selection
      return {
        title,
        media,
        subtitle: url ? `🔗 ${url}` : '',
      }
    },
  },
})
