/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-anonymous-default-export */
export default {
  name: 'meodetavadTulemused',
  title: 'Mõõdetavad tulemused',
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
      name: 'results',
      title: 'Results',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'value',
              title: 'Result Value',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'valueColor',
              title: 'Value Color',
              type: 'string',
              initialValue: 'text-blue-600',
            },
            {
              name: 'label',
              title: 'Result Label',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Result Description',
              type: 'text',
              rows: 2,
              validation: (Rule: any) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: 'source',
      title: 'Source Information',
      type: 'text',
      rows: 2,
      validation: (Rule: any) => Rule.required(),
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
