import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text'
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'heroBlock'
        },
        {
          type: 'statsBlock'
        },
        {
          type: 'featuresBlock'
        },
        {
          type: 'testimonialsBlock'
        },
        {
          type: 'ctaBlock'
        },
        {
          type: 'textBlock'
        },
        {
          type: 'programDaysTabs'
        },
        {
          type: 'homeNineDaysMiniBlock'
        },
        {
          type: 'helpFormTeaserBlock'
        }
      ]
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string'
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text'
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image'
        })
      ]
    })
  ]
})
