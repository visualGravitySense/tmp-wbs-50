/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-anonymous-default-export */
export default {
  name: 'opstarProfit8Components',
  title: 'Opstar Profit 8 Components',
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
      name: 'components',
      title: 'Components',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'number',
              title: 'Component Number',
              type: 'number',
              validation: (Rule: any) => Rule.required().min(1).max(8),
            },
            {
              name: 'title',
              title: 'Component Title',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'tags',
              title: 'Tags',
              type: 'string',
              description: 'Tags separated by · (e.g., KPI · Gemba · Andon)',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'whatIs',
              title: 'Mis see on',
              type: 'text',
              rows: 3,
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'howItWorks',
              title: 'Kuidas toimib',
              type: 'text',
              rows: 3,
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'result',
              title: 'Tulemus',
              type: 'text',
              rows: 3,
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'resultMetric',
              title: 'Result Metric',
              type: 'string',
              description: 'Result metric with arrow (e.g., ↑ 15–25% tootlikkus 90 päevaga)',
              validation: (Rule: any) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule: any) => Rule.required().min(8).max(8),
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
