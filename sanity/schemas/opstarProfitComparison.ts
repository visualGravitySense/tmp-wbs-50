/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-anonymous-default-export */
export default {
  name: 'opstarProfitComparison',
  title: 'Opstar Profit Comparison',
  type: 'document',
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
      name: 'comparisonItems',
      title: 'Comparison Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'isNot',
              title: 'Mis see EI ole',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'is',
              title: 'Mis see ON',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      initialValue: 'bg-gray-50',
    },
    {
      name: 'titleColor',
      title: 'Title Color',
      type: 'string',
      initialValue: 'text-gray-900',
    },
    {
      name: 'isNotColor',
      title: 'Is Not Column Color',
      type: 'string',
      initialValue: 'text-red-600',
    },
    {
      name: 'isColor',
      title: 'Is Column Color',
      type: 'string',
      initialValue: 'text-green-600',
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
