import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'andresBlock',
  title: 'Andres Block (Unified)',
  type: 'object',
  fields: [
    defineField({
      name: 'variant',
      title: 'Variant (Display Layout)',
      type: 'string',
      options: {
        list: [
          { title: 'Compact (Text + Button)', value: 'compact' },
          { title: 'Medium (Tags, Quote, 3 Stats)', value: 'medium' },
          { title: 'Full (Full Bio, Multi-photo grid, 4 Stats)', value: 'full' },
        ],
        layout: 'radio',
      },
      initialValue: 'compact',
    }),
    defineField({
      name: 'name',
      title: 'Name / Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
    }),
    defineField({
      name: 'shortBio',
      title: 'Short Bio',
      type: 'text',
      description: 'Used for compact variant description',
    }),
    defineField({
      name: 'bio',
      title: 'Bio (Rich Text)',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Optional: Extra rich text content for Full or Medium views',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string' })
      ]
    }),
    defineField({
      name: 'secondaryPhotos',
      title: 'Secondary Photos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt Text', type: 'string' })
          ]
        }
      ]
    }),
    defineField({
      name: 'stats',
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
    }),
    defineField({
      name: 'tags',
      title: 'Tags / Badges (Technologies/Expertise)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Add expertise pills like Lean, Toyota TPS, Kaizen, etc. (Visible in FULL variant)',
    }),
    defineField({
      name: 'fieldExperience',
      title: 'Field Experience Text',
      type: 'string',
      description: 'Short text highlighting practical field experience',
    }),
    defineField({
      name: 'timeline',
      title: 'Timeline (Ajajoon)',
      type: 'array',
      of: [{
        type: 'object',
        name: 'timelineItem',
        fields: [
          { name: 'year', title: 'Year (Aasta)', type: 'string' },
          { name: 'title', title: 'Title (Sündmus/Pealkiri)', type: 'string' },
          { name: 'description', title: 'Description (Kirjeldus)', type: 'text' }
        ]
      }]
    }),
    defineField({
      name: 'methodologyTitle',
      title: 'Methodology Title',
      type: 'string',
      description: 'Title for the highlighted methodology box (e.g., "METOODIKA")',
    }),
    defineField({
      name: 'methodologyText',
      title: 'Methodology Text',
      type: 'text',
      description: 'Plain text or string for the methodology description',
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Small text above the title (e.g. KOOLITAJA ANDRES)',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Label',
      type: 'string',
      description: 'Text for the call to action button (used mainly in compact variant)',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'string',
      description: 'URL or path for the call to action button',
    }),
  ],
  preview: {
    select: {
      variant: 'variant',
      name: 'name',
    },
    prepare({ variant, name }) {
      const displayTitle = name || 'Andres Block'
      const capitalizedVariant = variant ? variant.charAt(0).toUpperCase() + variant.slice(1) : 'Compact'
      return {
        title: displayTitle,
        subtitle: `Variant: ${capitalizedVariant}`,
      }
    },
  },
})
