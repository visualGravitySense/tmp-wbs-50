import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'sharedHero',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
    }),
    defineField({
      name: 'scriptHeadline',
      title: 'Script / gradient line (under headline)',
      type: 'string',
      description: 'Second line in the hero title, shown in blue gradient italics (e.g. Professional Training).',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
      description: 'Small text displayed above the main headline (e.g., "Professional Training", "Expert-Led Courses")',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Gradient',
      type: 'string',
      options: {
        list: [
          { title: 'Blue to Purple', value: 'blue-purple' },
          { title: 'Purple to Pink', value: 'purple-pink' },
          { title: 'Green to Blue', value: 'green-blue' },
          { title: 'Orange to Red', value: 'orange-red' },
          { title: 'Blue to Light Blue', value: 'blue-lightblue' },
          { title: 'Gray to Dark Gray', value: 'gray-darkgray' },
          { title: 'Light Gray to Gray', value: 'lightgray-gray' },
          { title: 'Slate to Dark Slate', value: 'slate-darkslate' },
          { title: 'Cool Gray to Blue Gray', value: 'coolgray-bluegray' },
          { title: 'Warm Gray to Rose', value: 'warmgray-rose' },
        ],
      },
      initialValue: 'blue-purple',
    }),
    defineField({
      name: 'primaryButton',
      title: 'Primary Button',
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
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'secondaryButton',
      title: 'Secondary Button',
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
          type: 'string',
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
      name: 'badges',
      title: 'Badges',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Badge Text',
              type: 'string',
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
      name: 'quickFactsCard',
      title: 'Hero — Quick facts card (right column)',
      type: 'object',
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
                }),
                defineField({
                  name: 'value',
                  title: 'Value',
                  type: 'string',
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
                  description: 'Counter animates from 0 to this value when the card enters the viewport.',
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
                  description: 'e.g. + or % (leave empty if none)',
                }),
                defineField({
                  name: 'label',
                  title: 'Label under number',
                  type: 'string',
                }),
              ],
              preview: {
                select: {
                  v: 'animatedValue',
                  s: 'suffix',
                  l: 'label',
                },
                prepare({
                  v,
                  s,
                  l,
                }: {
                  v?: number
                  s?: string
                  l?: string
                }) {
                  return {
                    title: `${v ?? ''}${s ?? ''}`,
                    subtitle: l,
                  }
                },
              },
            },
          ],
        }),
      ],
    }),
  ],
})
