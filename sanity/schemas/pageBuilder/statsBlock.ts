import { defineType } from 'sanity'

export default defineType({
  name: 'statsBlock',
  title: 'Statistika (4 numbrit)',
  type: 'object',
  icon: () => '🔢',
  fields: [
    {
      name: 'heading',
      title: 'Pealkiri (valikuline)',
      type: 'string' as const,
      description:
        'Kuvatakse numbrite kohal. Jätke tühjaks, kui pealkirja pole vaja (nt kogemus / statistika-plokk).',
    },
    {
      name: 'stats',
      title: 'Statistika (4 numbrit)',
      type: 'array' as const,
      description:
        'Lisa täpselt 4 numbrit. Tühjade korral võetakse globaalsed statistikad siteSettings-ist.',
      validation: (Rule) => Rule.max(4),
      of: [
        {
          type: 'object' as const,
          fields: [
            {
              name: 'number',
              title: 'Number',
              type: 'string' as const,
              description: 'nt "150" või "38.5"',
            },
            {
              name: 'suffix',
              title: 'Sufiks',
              type: 'string' as const,
              description: 'nt "+" või "%"',
            },
            {
              name: 'label',
              title: 'Silt',
              type: 'string' as const,
              description: 'nt "LÕPETAJAT" (kuvatakse numbri all)',
            },
          ],
          preview: {
            select: { number: 'number', suffix: 'suffix', label: 'label' },
            prepare({
              number,
              suffix,
              label,
            }: {
              number?: string
              suffix?: string
              label?: string
            }) {
              return { title: `${number ?? ''}${suffix ?? ''} ${label ?? ''}`.trim() }
            },
          },
        },
      ],
    },
    {
      name: 'showDivider',
      title: 'Näita eraldusjoont',
      type: 'boolean' as const,
      initialValue: true,
    },
  ],
  preview: {
    select: { heading: 'heading', stats: 'stats' },
    prepare({ heading, stats }: { heading?: string; stats?: unknown[] }) {
      const count = Array.isArray(stats) ? stats.length : 0
      return {
        title: heading || 'Statistika (4 numbrit)',
        subtitle: count ? `${count} numbrit` : 'Kogemus / statistika-plokk',
      }
    },
  },
})