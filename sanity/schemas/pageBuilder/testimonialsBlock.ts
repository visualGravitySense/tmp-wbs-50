import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'testimonialsBlock',
  title: 'Testimonials Block',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text'
    }),
    defineField({
      name: 'testimonialReferences',
      title: 'Vali klikiga kliendid (Testimonials)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'testimonial' }] }]
    })
  ],
  preview: {
    select: {
      heading: 'heading'
    },
    prepare({ heading }) {
      return {
        title: heading || 'Testimonials Block'
      }
    }
  }
})
