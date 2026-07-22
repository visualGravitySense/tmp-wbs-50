import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'heroBlock',
  title: 'Hero Block',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text'
    }),
    defineField({
      name: 'image',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'ctaButton',
      title: 'CTA Button',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Button Text',
          type: 'string'
        }),
        defineField({
          name: 'url',
          title: 'Button URL',
          type: 'string'
        })
      ]
    }),
    defineField({
      name: 'overlay',
      title: 'Overlay',
      type: 'boolean',
      initialValue: true
    })
  ],
  preview: {
    select: {
      heading: 'heading',
      media: 'image'
    },
    prepare({ heading, media }) {
      return {
        title: heading,
        media
      }
    }
  }
})
