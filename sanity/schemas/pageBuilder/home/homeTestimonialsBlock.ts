import { defineType } from 'sanity'
import { homeTestimonialsFields } from './fields/testimonialsFields'

export default defineType({
  name: 'homeTestimonialsBlock',
  title: 'Testimonials / reviews',
  type: 'object',
  fields: homeTestimonialsFields,
  preview: {
    select: {
      title: 'testimonials.title',
      featuredCount: 'featuredReviews',
      inlineCount: 'testimonials.testimonials',
    },
    prepare({ title, featuredCount, inlineCount }) {
      const featured = Array.isArray(featuredCount) ? featuredCount.length : 0
      const inline = Array.isArray(inlineCount) ? inlineCount.length : 0
      const parts: string[] = []
      if (featured > 0) parts.push(`${featured} Review`)
      if (inline > 0) parts.push(`${inline} inline`)
      return {
        title: title || 'Tagasiside',
        subtitle: parts.length > 0 ? parts.join(' · ') : 'Reviews',
      }
    },
  },
})
