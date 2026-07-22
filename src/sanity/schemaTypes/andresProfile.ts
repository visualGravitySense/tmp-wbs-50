import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'andresProfile',
  title: 'Expert Profile Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      initialValue: 'Your Name',
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Expert',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      initialValue: 'Programmi juht ja peakoolitaja • 25+ aastat tootmises',
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      initialValue: '"Õpetab seda, mida on ise tehases teinud — ja ka seda, mida tegid Henry Ford sajand tagasi ja Jaapani juhid Toyotas."',
    }),
    defineField({
      name: 'shortBio',
      title: 'Short Bio (Compact Variant)',
      type: 'text',
      initialValue: 'Replace this short bio with your expert introduction and practical experience.',
    }),
    defineField({
      name: 'fullBio',
      title: 'Full Bio (Medium/Full Variants)',
      type: 'array',
      of: [{ type: 'block' }],
      initialValue: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Replace this full bio with your background, industries served, and approach.',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'methodology',
      title: 'Methodology (Medium/Full Variants)',
      type: 'text',
      initialValue: 'Describe your methodology in plain language: how you work with teams and how change sticks after training.',
    }),
    defineField({
      name: 'tags',
      title: 'Tags / Badges',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: ['TRAINING', 'CONSULTING', 'RESULTS'],
    }),
    defineField({
      name: 'statistics',
      title: 'Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Value', type: 'string' }),
            defineField({ name: 'label', title: 'Label', type: 'string' }),
          ],
        },
      ],
      initialValue: [
        { _key: '1', value: '100+', label: 'Clients' },
        { _key: '2', value: '10+', label: 'Years' },
        { _key: '3', value: '4.9/5', label: 'Rating' },
      ],
    }),
    defineField({
      name: 'photo',
      title: 'Main Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'secondaryPhotos',
      title: 'Secondary Photos (Factories/Classroom)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'timeline',
      title: 'Career Timeline',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'year', title: 'Year', type: 'string' }),
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text' }),
          ],
        },
      ],
      initialValue: [
        { _key: 't1', year: '2010', title: 'Role / company', description: 'Career milestone description.' },
        { _key: 't2', year: '2015', title: 'Role / company', description: 'Career milestone description.' },
        { _key: 't3', year: '2020', title: 'Trainer & consultant', description: 'Started independent consulting and training.' },
      ]
    }),
    defineField({
      name: 'factories',
      title: 'Highlighted Factories',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Factory Name', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text' }),
            defineField({ name: 'logo', title: 'Logo/Image', type: 'image' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link (Compact Variant)',
      type: 'string',
      initialValue: '/koolitus',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Label (Compact Variant)',
      type: 'string',
      initialValue: 'Loe edasi →',
    }),
  ],
})
