/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-anonymous-default-export */
export default {
  name: 'opstarProfitBlock',
  title: 'Opstar Profit Block',
  type: 'document',
  groups: [
    { name: 'heading', title: 'Heading', default: true },
    { name: 'columns', title: 'Columns' },
    { name: 'orbit', title: 'Orbit diagram' },
    { name: 'heroDiagram', title: 'Hero diagram' },
    { name: 'styling', title: 'Styling (reserved)' },
  ],
  fields: [
    {
      name: 'eyebrow',
      title: 'Block Eyebrow',
      type: 'string',
      group: 'heading',
      description: 'Optional small text above the title.',
    },
    {
      name: 'title',
      title: 'Block Title',
      type: 'string',
      group: 'heading',
      description: 'Large heading above the three-column section.',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Block Subtitle',
      type: 'text',
      rows: 2,
      group: 'heading',
      description: 'Optional line under the title.',
    },
    {
      name: 'leftColumn',
      title: 'Left Column (vasakpoolne veerg)',
      group: 'columns',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Veeru pealkiri',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'acronymItems',
          title: 'Akronüümid (OP, ST, STAR jne)',
          type: 'array',
          description: 'Kuvatakse vasakul veerul. Iga kirje: lühend (OP), täisnimi ja kirjeldus.',
          of: [
            {
              type: 'object',
              preview: {
                select: { title: 'code', subtitle: 'label' },
              },
              fields: [
                {
                  name: 'code',
                  title: 'Lühend (nt OP)',
                  type: 'string',
                  validation: (Rule: any) => Rule.required(),
                  description: 'Sinisega kuvatav lühend, nt OP, ST, STAR.',
                },
                {
                  name: 'label',
                  title: 'Täisnimi (nt Operatsioonide juhtimine)',
                  type: 'string',
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: 'description',
                  title: 'Kirjeldus (hall tekst all)',
                  type: 'text',
                  rows: 2,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'rightColumn',
      title: 'Right Column (parempoolne veerg)',
      group: 'columns',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Veeru pealkiri',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'acronymItems',
          title: 'Akronüümid (PRO, FIT, PROFIT jne)',
          type: 'array',
          description: 'Kuvatakse paremal veerul. Iga kirje: lühend (PRO), täisnimi ja kirjeldus.',
          of: [
            {
              type: 'object',
              preview: {
                select: { title: 'code', subtitle: 'label' },
              },
              fields: [
                {
                  name: 'code',
                  title: 'Lühend (nt PRO)',
                  type: 'string',
                  validation: (Rule: any) => Rule.required(),
                  description: 'Sinisega kuvatav lühend, nt PRO, FIT, PROFIT.',
                },
                {
                  name: 'label',
                  title: 'Täisnimi (nt Professionaalsus)',
                  type: 'string',
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: 'description',
                  title: 'Kirjeldus (hall tekst all)',
                  type: 'text',
                  rows: 2,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'illustration',
      title: 'Orbit diagram',
      group: 'orbit',
      type: 'object',
      description:
        'Central hub label and satellite chips. Position X/Y are percentages on the square (50,50 = center). Lines connect from center to each chip.',
      validation: (Rule: any) => Rule.required(),
      fields: [
        {
          name: 'centralText',
          title: 'Central hub text',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
          initialValue: 'OPSTAR PROFIT',
          description: 'Text inside the circle in the middle.',
        },
        {
          name: 'illustrationItems',
          title: 'Satellite labels',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Item Title',
                  type: 'string',
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: 'description',
                  title: 'Hover detail text',
                  type: 'text',
                  rows: 3,
                  description: 'Shown when the visitor hovers or taps this satellite node.',
                },
                {
                  name: 'position',
                  title: 'Position on diagram',
                  type: 'object',
                  fields: [
                    {
                      name: 'x',
                      title: 'X (%)',
                      type: 'number',
                      description: '0 = left edge, 50 = center, 100 = right.',
                      validation: (Rule: any) => Rule.required().min(0).max(100),
                    },
                    {
                      name: 'y',
                      title: 'Y (%)',
                      type: 'number',
                      description: '0 = top edge, 50 = center, 100 = bottom.',
                      validation: (Rule: any) => Rule.required().min(0).max(100),
                    },
                  ],
                },
              ],
            },
          ],
          validation: (Rule: any) => Rule.required().min(1),
        },
        {
          name: 'backgroundColor',
          title: 'Illustration background (Tailwind classes)',
          type: 'string',
          initialValue: 'from-blue-50 to-white',
          description: 'Not applied by the site yet; reserved for future use.',
        },
        {
          name: 'centralCircleColor',
          title: 'Central circle gradient (Tailwind)',
          type: 'string',
          initialValue: 'from-blue-400 to-blue-600',
          description: 'Not applied by the site yet; reserved for future use.',
        },
      ],
    },
    // ── Hero diagram override fields ──────────────────────────────────────
    {
      name: 'heroDiagramMeta',
      title: 'Hero card labels',
      group: 'heroDiagram',
      type: 'object',
      description: 'Text labels shown inside the hero card (eyebrow, title, badge, tag pills). Leave empty to use defaults.',
      fields: [
        {
          name: 'eyebrowLabel',
          title: 'Eyebrow label',
          type: 'string',
          initialValue: 'OPSTAR PROFIT™ • METOODIKA RAAMISTIK',
        },
        {
          name: 'cardTitle',
          title: 'Card title',
          type: 'string',
          initialValue: 'OPSTAR PROFIT™ SÜSTEEMNE JUHTIMINE',
        },
        {
          name: 'badgeText',
          title: 'Badge text (top-right)',
          type: 'string',
          initialValue: 'BAASRAAMISTIK',
        },
        {
          name: 'tagPills',
          title: 'Tag pills (comma-separated)',
          type: 'string',
          description: 'E.g.: STRATEEGIA, PROTSESSID, KASUMILIKKUS, LEAN-AGILE',
          initialValue: 'STRATEEGIA, PROTSESSID, KASUMILIKKUS, LEAN-AGILE',
        },
      ],
    },
    {
      name: 'heroMetrics',
      title: 'Hero bottom metrics',
      group: 'heroDiagram',
      type: 'array',
      description: 'Stats shown at the bottom of the hero card (e.g. 25+ / AASTAT). Leave empty to use defaults.',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
          ],
          preview: {
            select: { title: 'value', subtitle: 'label' },
          },
        },
      ],
    },
    // ── Styling (reserved) ────────────────────────────────────────────────
    {
      name: 'backgroundColor',
      title: 'Block background (Tailwind)',
      group: 'styling',
      type: 'string',
      initialValue: 'bg-blue-600',
      description: 'Not applied by the OpstarProfitBlock component yet.',
    },
    {
      name: 'textColor',
      title: 'Text color (Tailwind)',
      group: 'styling',
      type: 'string',
      initialValue: 'text-white',
      description: 'Not applied by the OpstarProfitBlock component yet.',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare(selection: any) {
      const { title, subtitle } = selection
      return {
        title: title,
        subtitle: subtitle,
      }
    },
  },
}
