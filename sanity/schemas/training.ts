import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'training',
  title: 'Training',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'program',
      title: 'Program',
      type: 'object',
      fields: [
        defineField({
          name: 'duration',
          title: 'Duration',
          type: 'string'
        }),
        defineField({
          name: 'modules',
          title: 'Modules',
          type: 'array',
          of: [
            {
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
                  name: 'duration',
                  title: 'Duration',
                  type: 'string'
                })
              ]
            }
          ]
        }),
        defineField({
          name: 'schedule',
          title: 'Schedule',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'date',
                  title: 'Date',
                  type: 'string'
                }),
                defineField({
                  name: 'time',
                  title: 'Time',
                  type: 'string'
                }),
                defineField({
                  name: 'location',
                  title: 'Location',
                  type: 'string'
                })
              ]
            }
          ]
        })
      ]
    }),
    defineField({
      name: 'pricing',
      title: 'Pricing',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Plan Name',
              type: 'string'
            }),
            defineField({
              name: 'price',
              title: 'Price',
              type: 'number'
            }),
            defineField({
              name: 'currency',
              title: 'Currency',
              type: 'string'
            }),
            defineField({
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [{ type: 'string' }]
            })
          ]
        }
      ]
    }),
    defineField({
      name: 'instructors',
      title: 'Instructors',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string'
            }),
            defineField({
              name: 'bio',
              title: 'Bio',
              type: 'text'
            }),
            defineField({
              name: 'photo',
              title: 'Photo',
              type: 'image'
            }),
            defineField({
              name: 'experience',
              title: 'Experience',
              type: 'string'
            })
          ]
        }
      ]
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'testimonial' }]
        }
      ]
    })
  ]
})
