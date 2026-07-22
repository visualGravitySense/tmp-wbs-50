import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'mainPage',
  title: 'Main Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Text',
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
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary CTA Button',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Button Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'url',
          title: 'Button URL',
          type: 'url',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary CTA Button',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Button Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'url',
          title: 'Button URL',
          type: 'url',
          validation: (Rule) => Rule.required(),
        }),
      ],
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

    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Feature Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Feature Description',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'icon',
              title: 'Icon Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Blue (Results)', value: 'blue' },
                  { title: 'Orange (Factories)', value: 'orange' },
                  { title: 'Purple (Group)', value: 'purple' },
                  { title: 'Green (Certificate)', value: 'green' },
                ],
              },
              initialValue: 'blue',
            }),
            defineField({
              name: 'svgIcon',
              title: 'SVG Icon Code',
              type: 'text',
              description: 'SVG code for the icon',
              rows: 5,
            }),
          ],
        },
      ],
    }),

    defineField({
      name: 'nineDaysMini',
      title: 'Nine Days Program (Mini)',
      type: 'object',
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Eyebrow Text',
          type: 'string',
          initialValue: '9-päevane programm',
        }),
        defineField({
          name: 'mainTitle',
          title: 'Main Title',
          type: 'array',
          of: [{ type: 'block' }],
        }),
        defineField({
          name: 'italicTitle',
          title: 'Italic Title',
          type: 'string',
          initialValue: 'mida me teeme?',
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'text',
        }),
        defineField({
          name: 'greenButtonText',
          title: 'Green Button Text',
          type: 'string',
        }),
        defineField({
          name: 'greenButtonLink',
          title: 'Green Button Link',
          type: 'string',
          initialValue: '/koolitus',
        }),
        defineField({
          name: 'whiteButtonText',
          title: 'White Button Text',
          type: 'string',
        }),
        defineField({
          name: 'whiteButtonLink',
          title: 'White Button Link',
          type: 'string',
        }),
        defineField({
          name: 'dayPickerLabel',
          title: 'Day Picker Label',
          type: 'string',
          initialValue: 'Mis päev sind huvitab kõige rohkem?',
        }),
        defineField({
          name: 'habitLabel',
          title: 'Habit Label',
          type: 'string',
          initialValue: 'Harjumus, mida sa omandad:',
        }),
        defineField({
          name: 'planCtaPrefix',
          title: 'Plan CTA Prefix',
          type: 'string',
          description: 'Use {day} placeholder for active day number',
          initialValue: 'Päev {day} kõlab huvitavalt?',
        }),
        defineField({
          name: 'planCtaLinkText',
          title: 'Plan CTA Link Text',
          type: 'string',
          initialValue: 'Registreeru ja ela see päev ise läbi.',
        }),
        defineField({
          name: 'planCtaLinkUrl',
          title: 'Plan CTA Link URL',
          type: 'string',
          initialValue: '/register',
        }),
        defineField({
          name: 'planButtonText',
          title: 'Plan Button Text',
          type: 'string',
          initialValue: 'Registreeru programmi →',
        }),
        defineField({
          name: 'planButtonLink',
          title: 'Plan Button Link',
          type: 'string',
          initialValue: '/register',
        }),
        defineField({
          name: 'days',
          title: 'Program Days (Mini Plan)',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'dayNumber',
                  title: 'Day Number',
                  type: 'number',
                }),
                defineField({
                  name: 'title',
                  title: 'Day Title',
                  type: 'string',
                }),
                defineField({
                  name: 'subtitle',
                  title: 'Day Subtitle',
                  type: 'string',
                }),
                defineField({
                  name: 'habit',
                  title: 'Habit',
                  type: 'string',
                }),
              ],
            },
          ],
        }),
        defineField({
          name: 'faqSection',
          title: 'Mini FAQ Section',
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
              initialValue: 'Kuidas 147 tootmisjuhti 9-päevase puudumise lahendasid?',
            }),
            defineField({
              name: 'testimonials',
              title: 'Testimonials',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'quote',
                      title: 'Quote',
                      type: 'text',
                      rows: 2,
                    }),
                    defineField({
                      name: 'author',
                      title: 'Author',
                      type: 'string',
                    }),
                  ],
                },
              ],
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'headline',
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title,
        subtitle: `Main: ${subtitle}`,
      }
    },
  },
})
