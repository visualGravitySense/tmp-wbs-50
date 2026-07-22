/* eslint-disable @typescript-eslint/no-explicit-any */

export type AboutFieldDefinition = {
  name: string
  type: string
  title?: string
  [key: string]: unknown
}

export function withAboutLegacyHidden(
  field: AboutFieldDefinition,
): AboutFieldDefinition {
  return { ...field, hidden: true }
}

export const aboutHeroField: AboutFieldDefinition = {
  name: 'hero',
  title: 'Hero Section',
  type: 'object',
  fields: [
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
      description: 'Trainer LinkedIn profiili link',
    },
    {
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'floatingBadges',
      title: 'Floating Ambient Badges (portrait)',
      type: 'array',
      description: 'Lisa kuni 2 ujuvat märgist portreefotole. Nende asukohta saab reguleerida protsentides.',
      of: [{ type: 'floatingBadge' }],
    },
    {
      name: 'primaryButton',
      title: 'Primary Button',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'link',
          title: 'Button Link',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
      ],
    },
    {
      name: 'secondaryButton',
      title: 'Secondary Button',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'link',
          title: 'Button Link',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
      ],
    },
    {
      name: 'badges',
      title: 'Badges',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Badge Text',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
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
                ],
              },
              initialValue: 'blue',
            },
            {
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
            },
          ],
        },
      ],
    },
    {
      name: 'technologyBadges',
      title: 'Technology Badges',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Badge Text',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
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
                ],
              },
              initialValue: 'purple',
            },
            {
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
              initialValue: 'sm',
            },
          ],
        },
      ],
    },
    {
      name: 'stat1Number',
      title: 'Stat 1 Number',
      type: 'string',
      initialValue: '147+',
    },
    {
      name: 'stat1Label',
      title: 'Stat 1 Label',
      type: 'string',
      initialValue: 'lõpetajat',
    },
    {
      name: 'stat2Number',
      title: 'Stat 2 Number',
      type: 'string',
      initialValue: '+31%',
    },
    {
      name: 'stat2Label',
      title: 'Stat 2 Label',
      type: 'string',
      initialValue: 'OEE kasv',
    },
    {
      name: 'stat3Number',
      title: 'Stat 3 Number',
      type: 'string',
      initialValue: '4.9/5',
    },
    {
      name: 'stat3Label',
      title: 'Stat 3 Label',
      type: 'string',
      initialValue: 'hinnang',
    },
  ],
}

export const aboutQuoteSectionField: AboutFieldDefinition = {
  name: 'quoteSection',
  title: 'Tsitaadid (slider)',
  type: 'object',
  description:
    'Tsitaatide plokk lehel /about. Lisa nii palju tsitaate kui vaja — kuvatakse karussellina.',
  options: { collapsible: true, collapsed: false },
  fields: [
    {
      name: 'eyebrow',
      title: 'Ülapill (eyebrow)',
      type: 'string',
      initialValue: 'Tsitaat',
    },
    {
      name: 'subtitle',
      title: 'Ülapill (legacy — kasuta eyebrow)',
      type: 'string',
    },
    {
      name: 'cardLabel',
      title: 'Silt kaardil (legacy - ära kasuta)',
      type: 'string',
    },
    {
      name: 'secondBadgeText',
      title: 'Teine Badge (kaardi sees)',
      type: 'string',
      description: "See tekst ilmub valge kaardi sees oleval badge'il.",
      initialValue: 'Your Name',
    },
    {
      name: 'quotes',
      title: 'Tsitaadid',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'quote',
              title: 'Tsitaat',
              type: 'text',
              rows: 4,
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'author',
              title: 'Autor',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
          ],
          preview: {
            select: { title: 'author', subtitle: 'quote' },
            prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
              return {
                title: title || 'Autor',
                subtitle: subtitle ? `${subtitle.slice(0, 72)}…` : '',
              }
            },
          },
        },
      ],
      initialValue: [
        {
          _key: 'q1',
          quote:
            'Tootmisjuht ei pea olema see, kes kustutab tulesid. Ta peab ehitama süsteemi kus tulekahju ei toimu.',
          author: 'Your Name',
        },
      ],
      validation: (Rule: any) => Rule.min(1),
    },
    {
      name: 'quote',
      title: 'Tsitaat (üksik — legacy)',
      type: 'text',
      rows: 3,
      hidden: ({ parent }: { parent?: { quotes?: unknown[] } }) =>
        Boolean(parent?.quotes && parent.quotes.length > 0),
    },
    {
      name: 'author',
      title: 'Autor (üksik — legacy)',
      type: 'string',
      hidden: ({ parent }: { parent?: { quotes?: unknown[] } }) =>
        Boolean(parent?.quotes && parent.quotes.length > 0),
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'Light Gray', value: 'gray' },
          { title: 'Light Blue', value: 'blue' },
          { title: 'White', value: 'white' },
          { title: 'Light Purple', value: 'purple' },
        ],
      },
      initialValue: 'gray',
    },
  ],
}

export const aboutAboutSectionField: AboutFieldDefinition = {
  name: 'aboutSection',
  title: 'About Section',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Section Title (Bold)',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'scriptTitle',
      title: 'Script Title (Italic)',
      type: 'string',
      description: 'The second part of the title that appears in italic/script font',
    },
    {
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
      description: 'Optional eyebrow text above the section title',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'rightSideContent',
      title: 'Right Side Content',
      type: 'object',
      fields: [
        {
          name: 'introText',
          title: 'Intro Text',
          type: 'text',
          rows: 2,
          description: 'Introductory text before the main title',
        },
        {
          name: 'title',
          title: 'Main Title',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'descriptionText',
          title: 'Description Text',
          type: 'text',
          rows: 3,
          description: 'Description text after the main title',
        },
        {
          name: 'badges',
          title: 'Badges',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'text',
                  title: 'Badge Text',
                  type: 'string',
                  validation: (Rule: any) => Rule.required(),
                },
                {
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
                    ],
                  },
                  initialValue: 'blue',
                },
                {
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
                  initialValue: 'sm',
                },
              ],
            },
          ],
        },
        {
          name: 'badgesLabel',
          title: 'Badges group label',
          type: 'string',
          description: 'Caption above the competence badges (e.g. Tunnustused & Kompetentsid)',
        },
        {
          name: 'image',
          title: 'Pilt / Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          description: 'Pilt paremale poolele',
        },
        {
          name: 'experienceCards',
          title: 'Experience Cards',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: 'subtitle',
                  title: 'Subtitle',
                  type: 'string',
                },
                {
                  name: 'year',
                  title: 'Year',
                  type: 'string',
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                  rows: 3,
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: 'emoji',
                  title: 'Emoji',
                  type: 'string',
                  description: 'Emoji character (e.g., \ud83c\udfed, \u265e\ufe0f, \ud83c\udf93)',
                },
                {
                  name: 'color',
                  title: 'Card Color',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Blue', value: 'blue' },
                      { title: 'Green', value: 'green' },
                      { title: 'Purple', value: 'purple' },
                      { title: 'Orange', value: 'orange' },
                    ],
                  },
                  initialValue: 'blue',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export const aboutExperienceSectionField: AboutFieldDefinition = {
  name: 'experienceSection',
  title: 'Experience Section',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'text',
      rows: 2,
    },
    {
      name: 'eyebrow',
      title: 'Section eyebrow',
      type: 'string',
      description: 'Small label above the section title (timeline)',
    },
    {
      name: 'layoutVariant',
      title: 'Layout variant',
      type: 'string',
      description: 'Choose timeline layout style for this section',
      options: {
        list: [
          { title: 'Default (timeline left + right sticky column)', value: 'default' },
          { title: 'Split (two timeline columns + right blocks below)', value: 'split' },
        ],
        layout: 'radio',
      },
      initialValue: 'default',
    },
    {
      name: 'fundamentalsTitle',
      title: 'Right column — fundamentals card title',
      type: 'string',
    },
    {
      name: 'fundamentalsDescription',
      title: 'Right column — fundamentals card text',
      type: 'text',
      rows: 4,
    },
    {
      name: 'showStatistics',
      title: 'Kuva statistika plokk',
      type: 'boolean',
      description: 'Kui see on välja lülitatud, siis parempoolset statistika plokki ei kuvata.',
      initialValue: false,
    },
    {
      name: 'statsTitle',
      title: 'Right column — stats block title',
      type: 'string',
    },
    {
      name: 'factsEyebrow',
      title: 'Faktide ülemine silt',
      type: 'string',
      initialValue: 'PÕHIALUSED'
    },
    {
      name: 'factsDescription',
      title: 'Faktide alustekst',
      type: 'text',
      initialValue: 'Aastakümnete pikkune kogemus mitmes valdkonnas on andnud mulle sügavaima teadmise ja praktiliste oskuste kogumi.'
    },
    {
      name: 'factsItems',
      title: 'Faktide plokid (Pills)',
      type: 'array',
      of: [{ type: 'careerFactItem' }]
    },
    {
      name: 'stats',
      title: 'Right column — statistics',
      type: 'array',
      description: 'You can add any number of statistic items',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Value', type: 'string', validation: (Rule: any) => Rule.required() },
            { name: 'label', title: 'Label', type: 'string', validation: (Rule: any) => Rule.required() },
          ],
        },
      ],
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Gray', value: 'gray' },
          { title: 'Blue', value: 'blue' },
          { title: 'Light Blue', value: 'light-blue' },
        ],
      },
      initialValue: 'white',
    },
    {
      name: 'experienceItems',
      title: 'Experience Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon/Emoji',
              type: 'string',
              description: 'Icon or emoji (e.g., \ud83c\udfed, \u265e\ufe0f, \ud83c\udf93)',
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'year',
              title: 'Year/Period',
              type: 'string',
            },
            {
              name: 'color',
              title: 'Item Color',
              type: 'string',
              options: {
                list: [
                  { title: 'Blue', value: 'blue' },
                  { title: 'Green', value: 'green' },
                  { title: 'Purple', value: 'purple' },
                  { title: 'Orange', value: 'orange' },
                  { title: 'Gray', value: 'gray' },
                ],
              },
              initialValue: 'blue',
            },
          ],
        },
      ],
    },
  ],
}

export const aboutGuaranteeSectionField: AboutFieldDefinition = {
  name: 'guaranteeSection',
  title: 'Riskivaba osalemine (garantii)',
  type: 'object',
  options: { collapsible: true, collapsed: false },
  fields: [
    {
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'RISKIVABA OSALEMINE',
    },
    {
      name: 'headline',
      title: 'Pealkiri',
      type: 'string',
      initialValue: 'Kui ei sobi — raha tagasi',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'subtext',
      title: 'Alatekst',
      type: 'text',
      rows: 3,
      initialValue:
        'Osale esimesel koolituspäeval. Kui tunned, et programm ei vasta ootustele — annan kogu osalustasu tagasi. Küsimusteta.',
    },
    {
      name: 'pillars',
      title: 'Garantii sambad',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Ikoon',
              type: 'string',
              options: {
                list: [
                  { title: 'Kilp (shield)', value: 'shield' },
                  { title: 'Kalender', value: 'calendar' },
                  { title: 'Sõnum', value: 'message-circle' },
                ],
              },
              initialValue: 'shield',
            },
            {
              name: 'title',
              title: 'Pealkiri',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'text',
              title: 'Tekst',
              type: 'text',
              rows: 3,
              validation: (Rule: any) => Rule.required(),
            },
          ],
          preview: {
            select: { title: 'title', icon: 'icon' },
            prepare({ title, icon }: { title?: string; icon?: string }) {
              return { title: title || 'Garantii sammas', subtitle: icon }
            },
          },
        },
      ],
    },
    {
      name: 'primaryButton',
      title: 'Peamine nupp',
      type: 'object',
      fields: [
        { name: 'text', title: 'Tekst', type: 'string', initialValue: 'Registreeru riskivabalt' },
        { name: 'link', title: 'Link', type: 'string', initialValue: '#registreeru' },
      ],
    },
    {
      name: 'secondaryButton',
      title: 'Teisene nupp',
      type: 'object',
      fields: [
        { name: 'text', title: 'Tekst', type: 'string', initialValue: 'Broneeri tasuta kõne' },
        { name: 'link', title: 'Link', type: 'string', initialValue: '/kontakt' },
      ],
    },
  ],
}

export const aboutCtaSectionField: AboutFieldDefinition = {
  name: 'ctaSection',
  title: 'CTA plokk',
  type: 'ctaSection',
  description:
    'Klaasplokk: märksõna, pealkiri, lühitekst, nupu tekst ja link, väike tekst all.',
  options: { collapsible: true, collapsed: false },
}

export const aboutKeyAchievementsField: AboutFieldDefinition = {
  name: 'keyAchievements',
  title: 'Key Achievements Section',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Key Achievements',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Section Description',
      type: 'text',
      rows: 3,
      description: 'Description of the achievements and student projects',
    },
    {
      name: 'achievements',
      title: 'Achievement Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Font Awesome icon class (e.g., "fa-trophy")'
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              validation: (Rule: any) => Rule.required(),
            },
          ],
        },
      ],
    },
    {
      name: 'studentProjects',
      title: 'Student Projects',
      type: 'array',
      description: 'Projects completed by students under trainer supervision',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'projectTitle',
              title: 'Project Title',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'studentName',
              title: 'Student Name',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'university',
              title: 'University',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'projectDescription',
              title: 'Project Description',
              type: 'text',
              rows: 3,
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'year',
              title: 'Year',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'category',
              title: 'Project Category',
              type: 'string',
              options: {
                list: [
                  { title: 'Lean Manufacturing', value: 'lean' },
                  { title: 'Process Improvement', value: 'process' },
                  { title: 'Quality Management', value: 'quality' },
                  { title: 'Strategic Planning', value: 'strategic' },
                  { title: 'Supply Chain', value: 'supplychain' },
                  { title: 'Other', value: 'other' },
                ],
              },
              initialValue: 'other',
            },
            {
              name: 'result',
              title: 'Project Result',
              type: 'text',
              rows: 2,
              description: 'Key outcomes and achievements of the project',
            },
          ],
        },
      ],
    },
  ],
}

export const aboutWorldManufacturingVisitsField: AboutFieldDefinition = {
  name: 'worldManufacturingVisits',
  title: 'Tehaste külastused',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Pealkiri',
      type: 'string',
      initialValue: 'Tehase külastused üle Euroopa',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'text',
      rows: 2,
      description: 'Brief description of manufacturing visits experience',
    },
    {
      name: 'manufacturingCompanies',
      title: 'Manufacturing Companies Visited',
      type: 'array',
      description: 'List of manufacturing companies and facilities visited worldwide',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'companyName',
              title: 'Company Name',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'country',
              title: 'Country',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'industry',
              title: 'Industry Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Automotive', value: 'automotive' },
                  { title: 'Electronics', value: 'electronics' },
                  { title: 'Food & Beverage', value: 'food' },
                  { title: 'Pharmaceutical', value: 'pharmaceutical' },
                  { title: 'Textile', value: 'textile' },
                  { title: 'Chemical', value: 'chemical' },
                  { title: 'Metal & Steel', value: 'metal' },
                  { title: 'Plastics', value: 'plastics' },
                  { title: 'Wood & Furniture', value: 'wood' },
                  { title: 'Other', value: 'other' },
                ],
              },
              initialValue: 'other',
            },
            {
              name: 'visitYear',
              title: 'Visit Year',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'visitPurpose',
              title: 'Visit Purpose',
              type: 'text',
              rows: 2,
              description: 'Purpose of the visit (consulting, audit, training, etc.)',
            },
            {
              name: 'keyInsights',
              title: 'Key Insights',
              type: 'text',
              rows: 3,
              description: 'Key learnings and observations from the visit',
            },
          ],
        },
      ],
    },
  ],
}

export const aboutExpertiseField: AboutFieldDefinition = {
  name: 'expertise',
  title: 'Areas of Expertise',
  type: 'array',
  of: [
    {
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Skill Title',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
        },
        {
          name: 'icon',
          title: 'Icon',
          type: 'string',
          description: 'Font Awesome icon name',
        },
      ],
    },
  ],
}

export const aboutTestimonialsSectionField: AboutFieldDefinition = {
  name: 'testimonialsSection',
  title: 'Testimonials (header & CTA)',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Main heading',
      type: 'string',
    },
    {
      name: 'subtitle',
      title: 'Eyebrow / pill text',
      type: 'string',
    },
    {
      name: 'buttonText',
      title: 'Bottom button text',
      type: 'string',
    },
    {
      name: 'buttonLink',
      title: 'Bottom button link',
      type: 'string',
    },
  ],
}

export const aboutTestimonialsField: AboutFieldDefinition = {
  name: 'testimonials',
  title: 'Testimonials',
  type: 'array',
  of: [
    {
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Client Name',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'company',
          title: 'Company',
          type: 'string',
        },
        {
          name: 'role',
          title: 'Role',
          type: 'string',
        },
        {
          name: 'testimonial',
          title: 'Testimonial Text',
          type: 'text',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'rating',
          title: 'Rating',
          type: 'number',
          validation: (Rule: any) => Rule.required().min(1).max(5),
        },
      ],
    },
  ],
}

export const aboutServicesField: AboutFieldDefinition = {
  name: 'services',
  title: 'Services Section',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'text',
    },
    {
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Service Title',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [{type: 'string'}],
            },
            {
              name: 'price',
              title: 'Price',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
}

export const aboutKkkDocumentField: AboutFieldDefinition = {
  name: 'kkkDocument',
  title: 'KKK — ühine dokument (valikuline)',
  type: 'reference',
  to: [{ type: 'kkk' }],
  description:
    'Vali eraldi KKK dokument, kui sama FAQ-d kasutatakse mitmel lehel. Kui valitud, kirjutab see üle allpool oleva KKK ploki.',
  weak: true,
}

export const aboutKkkField: AboutFieldDefinition = {
  name: 'kkk',
  title: 'KKK (Korduma kippuvad küsimused)',
  type: 'kkkSection',
  description:
    'FAQ plokk lehel /about — pealkiri, alapealkiri ja küsimused/vastused. Kui ülal on valitud eraldokument, kasutatakse seda.',
  options: { collapsible: true, collapsed: false },
}

export const aboutContactSectionField: AboutFieldDefinition = {
  name: 'contactSection',
  title: 'Contact section',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'backgroundColor',
      title: 'Background',
      type: 'string',
      options: {
        list: [
          { title: 'Blue to Purple', value: 'blue-purple' },
          { title: 'Purple to Pink', value: 'purple-pink' },
          { title: 'Green to Blue', value: 'green-blue' },
          { title: 'Orange to Red', value: 'orange-red' },
          { title: 'Blue to Light Blue', value: 'blue-lightblue' },
        ],
      },
      initialValue: 'blue-lightblue',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
    },
    {
      name: 'address',
      title: 'Address',
      type: 'string',
    },
  ],
}

export const aboutPageSectionFields: Record<string, AboutFieldDefinition> = {
  hero: aboutHeroField,
  quoteSection: aboutQuoteSectionField,
  aboutSection: aboutAboutSectionField,
  experienceSection: aboutExperienceSectionField,
  guaranteeSection: aboutGuaranteeSectionField,
  ctaSection: aboutCtaSectionField,
  keyAchievements: aboutKeyAchievementsField,
  worldManufacturingVisits: aboutWorldManufacturingVisitsField,
  expertise: aboutExpertiseField,
  testimonialsSection: aboutTestimonialsSectionField,
  testimonials: aboutTestimonialsField,
  services: aboutServicesField,
  kkkDocument: aboutKkkDocumentField,
  kkk: aboutKkkField,
  contactSection: aboutContactSectionField,
}