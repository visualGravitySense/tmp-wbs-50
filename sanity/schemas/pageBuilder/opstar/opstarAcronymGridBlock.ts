import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'opstarAcronymGridBlock',
  title: 'Product akronüümide ruudustik',
  type: 'object',
  fields: [
    defineField({
      name: 'enabled',
      title: 'Show section',
      type: 'boolean',
      initialValue: true,
      description:
        'Static grid (OP, ST, STAR, PRO, FIT) — labels are defined in the frontend component.',
    }),
  ],
  preview: {
    select: { enabled: 'enabled' },
    prepare({ enabled }: { enabled?: boolean }) {
      return {
        title: 'Product akronüümide ruudustik',
        subtitle:
          enabled === false
            ? 'Hidden'
            : 'Product · OP, ST, STAR, PRO, FIT (static)',
      }
    },
  },
})
