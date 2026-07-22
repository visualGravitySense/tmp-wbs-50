/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-anonymous-default-export */
export default {
  name: 'opstarProfitCta',
  title: 'Product Name CTA',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'CTA Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'CTA Subtitle',
      type: 'text',
      rows: 2,
    },
    {
      name: 'description',
      title: 'CTA Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'Blue to Purple', value: 'blue-purple' },
          { title: 'Purple to Pink', value: 'purple-pink' },
          { title: 'Green to Blue', value: 'green-blue' },
          { title: 'Orange to Red', value: 'orange-red' },
          { title: 'Blue to Light Blue', value: 'blue-lightblue' },
        ],
      },
      initialValue: 'blue-purple',
    },
    {
      name: 'primaryButtonText',
      title: 'Primary Button Text',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'primaryButtonUrl',
      title: 'Primary Button URL',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'primaryButtonIcon',
      title: 'Primary Button Icon',
      type: 'string',
      initialValue: '🚀',
    },
    {
      name: 'secondaryButtonText',
      title: 'Secondary Button Text',
      type: 'string',
    },
    {
      name: 'secondaryButtonUrl',
      title: 'Secondary Button URL',
      type: 'string',
    },
    {
      name: 'secondaryButtonIcon',
      title: 'Secondary Button Icon',
      type: 'string',
      initialValue: '📞',
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
        subtitle: subtitle || 'Product Name CTA',
      }
    },
  },
}
