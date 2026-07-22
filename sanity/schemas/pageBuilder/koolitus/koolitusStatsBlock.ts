import { defineType } from 'sanity'

/**
 * Statistika block for the koolitus page builder.
 * Renders animated count-up stat cells (reuses HeroStatsGrid component).
 */
export default defineType({
  name: 'koolitusStatsBlock',
  title: 'Statistika (numbrid)',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Pealkiri (valikuline)',
      type: 'string' as const,
      description: 'Kuvatakse numbrite kohal. Jätke tühjaks, kui pealkirja pole vaja.',
    },
    {
      name: 'stats',
      title: 'Statistika',
      description: 'Valikuline. Vali konkreetsed numbrid, mida kuvada. Kui jätad tühjaks, kuvatakse automaatselt kõik numbrid pealehelt (Avalehe stats).',
      type: 'array' as const,
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
            prepare({ number, suffix, label }: { number?: string; suffix?: string; label?: string }) {
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
    select: { heading: 'heading' },
    prepare({ heading }: { heading?: string }) {
      return {
        title: heading || 'Statistika',
        subtitle: 'Numbrite blokk',
      }
    },
  },
})
