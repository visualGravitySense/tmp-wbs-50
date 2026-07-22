/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-anonymous-default-export */
export default {
  name: 'cases',
  title: 'Cases',
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
      name: 'caseStudies',
      title: 'Case Studies',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'company',
              title: 'Company Name',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'industry',
              title: 'Industry',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'employees',
              title: 'Number of Employees',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'location',
              title: 'Location',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'year',
              title: 'Year',
              type: 'number',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'beforeMetrics',
              title: 'Before Metrics',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'label',
                      title: 'Metric Label',
                      type: 'string',
                      validation: (Rule: any) => Rule.required(),
                    },
                    {
                      name: 'value',
                      title: 'Metric Value',
                      type: 'string',
                      validation: (Rule: any) => Rule.required(),
                    },
                  ],
                },
              ],
              validation: (Rule: any) => Rule.required().min(1),
            },
            {
              name: 'afterMetrics',
              title: 'After Metrics',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'label',
                      title: 'Metric Label',
                      type: 'string',
                      validation: (Rule: any) => Rule.required(),
                    },
                    {
                      name: 'value',
                      title: 'Metric Value',
                      type: 'string',
                      validation: (Rule: any) => Rule.required(),
                    },
                  ],
                },
              ],
              validation: (Rule: any) => Rule.required().min(1),
            },
            {
              name: 'resultMain',
              title: 'Main Result',
              type: 'text',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'resultTime',
              title: 'Result Time',
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
