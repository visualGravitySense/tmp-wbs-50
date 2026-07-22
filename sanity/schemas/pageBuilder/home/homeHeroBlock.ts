import { defineType } from 'sanity'
import { homeHeroFields } from './fields/heroFields'

export default defineType({
  name: 'homeHeroBlock',
  title: 'Hero',
  type: 'object',
  fields: homeHeroFields,
  preview: {
    select: {
      headline: 'headline',
      scriptHeadline: 'scriptHeadline',
    },
    prepare({ headline, scriptHeadline }) {
      const title = [headline, scriptHeadline].filter(Boolean).join(' — ') || 'Hero'
      return {
        title,
        subtitle: 'Avalehe hero (ainult pealeht)',
      }
    },
  },
})
