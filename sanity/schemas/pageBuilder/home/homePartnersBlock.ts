import { defineType } from 'sanity'
import { homePartnersFields } from './fields/partnersFields'

export default defineType({
  name: 'homePartnersBlock',
  title: 'Partners marquee',
  type: 'object',
  fields: homePartnersFields,
  preview: {
    select: {
      title: 'partnersTitle',
      partners: 'partners',
    },
    prepare({ title, partners }) {
      const count = Array.isArray(partners) ? partners.length : 0
      return {
        title: title || 'Osalenud',
        subtitle: count > 0 ? `${count} partnerit` : 'Partnerid (marquee)',
      }
    },
  },
})
