import { defineField } from 'sanity'

/** Hero fields mirrored from `mainPage` top-level (HeroSection). */
export const homeHeroFields = [
  defineField({
    name: 'eyebrow',
    title: 'Eyebrow',
    type: 'string',
    description: 'Small text above the main headline',
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
    description: 'Italic script-style headline',
  }),
  defineField({
    name: 'description',
    title: 'Description',
    type: 'text',
    rows: 2,
  }),
  defineField({
    name: 'primaryCta',
    title: 'Primary CTA',
    type: 'object',
    fields: [
      defineField({
        name: 'text',
        title: 'Button Text',
        type: 'string',
      }),
      defineField({
        name: 'link',
        title: 'Button Link',
        type: 'link',
      }),
    ],
  }),
  defineField({
    name: 'secondaryCta',
    title: 'Secondary CTA',
    type: 'object',
    fields: [
      defineField({
        name: 'text',
        title: 'Button Text',
        type: 'string',
      }),
      defineField({
        name: 'link',
        title: 'Button Link',
        type: 'link',
      }),
    ],
  }),
  defineField({
    name: 'heroImage',
    title: 'Hero Image (optional)',
    description: 'Portrait or featured photo on the right of the Hero section.',
    type: 'image',
    options: { hotspot: true },
  }),
  defineField({
    name: 'socialProof',
    title: 'Social Proof',
    type: 'object',
    fields: [
      defineField({
        name: 'text',
        title: 'Social Proof Text',
        type: 'string',
        description: 'e.g., "147 tootmisjuhti on juba läbinud"',
      }),
      defineField({
        name: 'highlight',
        title: 'Highlight Text',
        type: 'string',
        description: 'Text to highlight in bold',
      }),
    ],
  }),

]
