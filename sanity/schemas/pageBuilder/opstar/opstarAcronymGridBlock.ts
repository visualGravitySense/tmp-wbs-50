import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'opstarAcronymGridBlock',
  title: 'OPSTAR akronüümide ruudustik',
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
        title: 'OPSTAR akronüümide ruudustik',
        subtitle:
          enabled === false
            ? 'Hidden'
            : 'OPSTAR · OP, ST, STAR, PRO, FIT (static)',
      }
    },
  },
})
