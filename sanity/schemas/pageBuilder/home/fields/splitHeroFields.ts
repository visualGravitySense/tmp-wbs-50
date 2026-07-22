import { defineField } from 'sanity'

/** Split-layout hero (MarketingSplitHero) — blog, galerii, lõputööd jms. */
export const marketingSplitHeroFields = [
  defineField({
    name: 'eyebrow',
    title: 'Eyebrow',
    type: 'string',
    description: 'Väike tekst pealkirja kohal',
  }),
  defineField({
    name: 'headline',
    title: 'Main Headline',
    type: 'string',
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'scriptHeadline',
    title: 'Script Headline',
    type: 'string',
    description: 'Teine rida pealkirja all — kursiiviga aktsent',
  }),
  defineField({
    name: 'description',
    title: 'Description',
    type: 'text',
    rows: 3,
  }),
  defineField({
    name: 'rightComponentType',
    title: 'Parempoolse osa tüüp',
    type: 'string',
    description: 'Vali, mida soovid kuvada parempoolsel poolel',
    initialValue: 'image',
    options: {
      list: [
        { title: 'Standardne pilt', value: 'image' },
        { title: 'Koolitus: Kiired faktid', value: 'quickFacts' },
        { title: 'About: Andrese profiil', value: 'aboutAndres' },
        { title: 'OPSTAR diagramm', value: 'opstarDiagram' },
        { title: 'Blog: Filter + Posts + Newsletter', value: 'blogImage' },
        { title: 'Kliendid: Statistika', value: 'clientsStats' },
      ],
      layout: 'radio',
    },
  }),
  defineField({
    name: 'heroImage',
    title: 'Hero pilt (valikuline)',
    description: 'Portree või esiletõstetud pilt paremal. Kui tühi, kuvatakse dekoratiivne graafika.',
    type: 'image',
    options: { hotspot: true },
    hidden: ({ parent }) =>
      parent?.rightComponentType !== 'image' && parent?.rightComponentType !== 'aboutAndres',
  }),
  defineField({
    name: 'linkedinUrl',
    title: 'LinkedIn URL',
    type: 'url',
    description: 'Link Andrese LinkedIn profiilile (ainult Andrese profiili puhul)',
    hidden: ({ parent }) => parent?.rightComponentType !== 'aboutAndres',
  }),
  defineField({
    name: 'floatingBadges',
    title: 'Hõljuvad märgid',
    type: 'array',
    description: 'Hõljuvad märgid pildi ümber (ainult Andrese profiili puhul)',
    of: [{ type: 'floatingBadge' }],
    hidden: ({ parent }) => parent?.rightComponentType !== 'aboutAndres',
  }),
  defineField({
    name: 'quickFactsCard',
    title: 'Kiirete faktide kaart (Koolitus)',
    type: 'object',
    hidden: ({ parent }) => parent?.rightComponentType !== 'quickFacts',
    options: { collapsible: true, collapsed: false },
    fields: [
      defineField({
        name: 'eyebrow',
        title: 'Card eyebrow',
        type: 'string',
        description: 'Small uppercase line above the card title.',
      }),
      defineField({
        name: 'title',
        title: 'Card title',
        type: 'string',
        description: 'Main heading inside the glass card (e.g. Kiired faktid).',
      }),
      defineField({
        name: 'durationPill',
        title: 'Duration pill',
        type: 'string',
        description: 'Short badge top-right (e.g. 9 päeva).',
      }),
      defineField({
        name: 'rows',
        title: 'Fact rows',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              defineField({
                name: 'label',
                title: 'Label',
                type: 'string',
                validation: (Rule) => Rule.required(),
              }),
              defineField({
                name: 'value',
                title: 'Value',
                type: 'string',
                validation: (Rule) => Rule.required(),
              }),
              defineField({
                name: 'hint',
                title: 'Expand hint (on hover / click)',
                type: 'text',
                rows: 2,
              }),
              defineField({
                name: 'icon',
                title: 'Icon',
                type: 'string',
                options: {
                  list: [
                    { title: 'Calendar', value: 'calendarDays' },
                    { title: 'Users / group', value: 'users' },
                    { title: 'Map pin', value: 'mapPin' },
                    { title: 'Award', value: 'award' },
                    { title: 'Message', value: 'messageSquare' },
                    { title: 'Clock', value: 'clock' },
                  ],
                  layout: 'dropdown',
                },
                initialValue: 'calendarDays',
              }),
            ],
            preview: {
              select: { title: 'label', subtitle: 'value' },
              prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
                return { title: title || 'Row', subtitle }
              },
            },
          },
        ],
      }),
      defineField({
        name: 'subsidyText',
        title: 'Subsidy line (left, green)',
        type: 'string',
      }),
      defineField({
        name: 'priceText',
        title: 'Price line (right, bold)',
        type: 'string',
      }),
      defineField({
        name: 'stats',
        title: 'Bottom statistics (4 columns)',
        type: 'array',
        validation: (Rule) => Rule.max(4).min(1),
        of: [
          {
            type: 'object',
            fields: [
              defineField({
                name: 'animatedValue',
                title: 'Animated number (end value)',
                type: 'number',
                description: 'Counter animates from 0 to this value.',
                validation: (Rule) => Rule.required().min(0),
              }),
              defineField({
                name: 'decimals',
                title: 'Decimal places',
                type: 'number',
                options: {
                  list: [
                    { title: '0', value: 0 },
                    { title: '1', value: 1 },
                    { title: '2', value: 2 },
                  ],
                  layout: 'radio',
                },
                initialValue: 0,
              }),
              defineField({
                name: 'suffix',
                title: 'Suffix after number',
                type: 'string',
              }),
              defineField({
                name: 'label',
                title: 'Label under number',
                type: 'string',
                validation: (Rule) => Rule.required(),
              }),
            ],
            preview: {
              select: { v: 'animatedValue', s: 'suffix', l: 'label' },
              prepare({ v, s, l }: { v?: number; s?: string; l?: string }) {
                return { title: `${v ?? ''}${s ?? ''}`, subtitle: l }
              },
            },
          },
        ],
      }),
    ],
  }),
  defineField({
    name: 'badges',
    title: 'Märgid',
    type: 'array',
    description: 'Märgid, mida kuvada kiirfaktide kohal (ainult Koolituse puhul)',
    hidden: ({ parent }) => parent?.rightComponentType !== 'quickFacts',
    of: [
      {
        type: 'object',
        fields: [
          defineField({
            name: 'text',
            title: 'Badge Text',
            type: 'string',
            validation: (Rule) => Rule.required(),
          }),
          defineField({
            name: 'color',
            title: 'Badge Color',
            type: 'string',
            options: {
              list: [
                { title: 'Blue', value: 'blue' },
                { title: 'Green', value: 'green' },
                { title: 'Yellow', value: 'yellow' },
                { title: 'Red', value: 'red' },
                { title: 'Purple', value: 'purple' },
                { title: 'Gray', value: 'gray' },
                { title: 'White', value: 'white' },
              ],
            },
            initialValue: 'blue',
          }),
          defineField({
            name: 'size',
            title: 'Badge Size',
            type: 'string',
            options: {
              list: [
                { title: 'Small', value: 'sm' },
                { title: 'Medium', value: 'md' },
                { title: 'Large', value: 'lg' },
              ],
            },
            initialValue: 'md',
          }),
        ],
      },
    ],
  }),
  defineField({
    name: 'opstarProfitBlockRef',
    title: 'OPSTAR kasumiplokk',
    type: 'reference',
    to: [{ type: 'opstarProfitBlock' }],
    description: 'Viide OPSTAR kasumi diagrammile (ainult OPSTAR diagrammi puhul)',
    hidden: ({ parent }) => parent?.rightComponentType !== 'opstarDiagram',
  }),
  defineField({
    name: 'primaryCta',
    title: 'Primary CTA',
    type: 'object',
    fields: [
      defineField({ name: 'text', title: 'Tekst', type: 'string' }),
      defineField({ name: 'link', title: 'Link', type: 'link' }),
    ],
  }),
  defineField({
    name: 'secondaryCta',
    title: 'Secondary CTA',
    type: 'object',
    fields: [
      defineField({ name: 'text', title: 'Tekst', type: 'string' }),
      defineField({ name: 'link', title: 'Link', type: 'link' }),
    ],
  }),
  defineField({
    name: 'stats',
    title: 'Statistika (valikuline)',
    type: 'array',
    of: [
      {
        type: 'object',
        fields: [
          defineField({ name: 'value', title: 'Väärtus', type: 'string' }),
          defineField({ name: 'label', title: 'Silt', type: 'string' }),
        ],
      },
    ],
  }),
]
