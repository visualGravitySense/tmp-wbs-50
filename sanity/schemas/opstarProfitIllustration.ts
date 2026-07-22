/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-anonymous-default-export */
export default {
  name: 'opstarProfitIllustration',
  title: 'Opstar Profit Illustration',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'centralText',
      title: 'Central Text',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
      initialValue: 'OPSTAR PROFIT',
    },
    {
      name: 'illustrationItems',
      title: 'Illustration Items',
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
              name: 'position',
              title: 'Position',
              type: 'object',
              fields: [
                {
                  name: 'x',
                  title: 'X Position (%)',
                  type: 'number',
                  validation: (Rule: any) => Rule.required().min(0).max(100),
                },
                {
                  name: 'y',
                  title: 'Y Position (%)',
                  type: 'number',
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
      title: 'Background Color',
      type: 'string',
      initialValue: 'from-blue-50 to-white',
    },
    {
      name: 'centralCircleColor',
      title: 'Central Circle Color',
      type: 'string',
      initialValue: 'from-blue-400 to-blue-600',
    },
  ],
  preview: {
    select: {
      title: 'title',
      centralText: 'centralText',
    },
    prepare(selection: any) {
      const { title, centralText } = selection
      return {
        title: title,
        subtitle: `Central: ${centralText}`,
      }
    },
  },
}
