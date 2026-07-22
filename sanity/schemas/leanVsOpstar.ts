/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-anonymous-default-export */
export default {
  name: 'leanVsOpstar',
  title: 'LEAN vs OPSTAR PROFIT™',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'eyebrow',
      title: 'Eyebrow Text',
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
      name: 'comparisonItems',
      title: 'Comparison Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'criterion',
              title: 'Criterion',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'leanValue',
              title: 'Tavaline LEAN',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'opstarValue',
              title: 'OPSTAR PROFIT™',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'opstarHasAdvantage',
              title: 'OPSTAR has Advantage',
              type: 'boolean',
              initialValue: true,
            },
          ],
        },
      ],
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'CTA Text',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'subtitle',
          title: 'CTA Subtitle',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'buttonUrl',
          title: 'Button URL',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
      ],
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      initialValue: 'bg-white',
    },
    {
      name: 'titleColor',
      title: 'Title Color',
      type: 'string',
      initialValue: 'text-gray-900',
    },
    {
      name: 'eyebrowColor',
      title: 'Eyebrow Color',
      type: 'string',
      initialValue: 'text-blue-600',
    },
    {
      name: 'opstarColumnColor',
      title: 'OPSTAR Column Color',
      type: 'string',
      initialValue: 'bg-blue-50 border-blue-200',
    },
  ],
  preview: {
    select: {
      title: 'title',
      eyebrow: 'eyebrow',
    },
    prepare(selection: any) {
      const { title, eyebrow } = selection
      return {
        title: title,
        subtitle: eyebrow,
      }
    },
  },
}
