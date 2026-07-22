import { defineType } from 'sanity'
import { marketingSplitHeroFields } from './fields/splitHeroFields'

export default defineType({
  name: 'marketingSplitHeroBlock',
  title: 'Hero (split layout)',
  type: 'object',
  fields: marketingSplitHeroFields,
  preview: {
    select: {
      headline: 'headline',
      scriptHeadline: 'scriptHeadline',
    },
    prepare({ headline, scriptHeadline }) {
      const title = [headline, scriptHeadline].filter(Boolean).join(' — ') || 'Hero'
      return {
        title,
        subtitle: 'Split hero',
      }
    },
  },
})
