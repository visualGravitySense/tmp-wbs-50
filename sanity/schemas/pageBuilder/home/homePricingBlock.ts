import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homePricingBlock',
  title: 'Hinnakiri',
  type: 'object',
  fields: [
    defineField({
      name: 'pricingSection',
      title: 'Pricing Section',
      type: 'pricingSectionContent',
    }),
  ],
  preview: {
    select: {
      title: 'pricingSection.title',
      tiers: 'pricingSection.tiers',
    },
    prepare({ title, tiers }) {
      const count = Array.isArray(tiers) ? tiers.length : 0
      return {
        title: title || 'Hinnakiri',
        subtitle: count > 0 ? `${count} paketti` : 'Hinnad',
      }
    },
  },
})
