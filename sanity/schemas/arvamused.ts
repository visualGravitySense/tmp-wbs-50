/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-anonymous-default-export */
export default {
  name: 'arvamused',
  title: 'Arvamused',
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
      name: 'reviews',
      title: 'Reviews',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'rating',
              title: 'Rating',
              type: 'number',
              validation: (Rule: any) => Rule.required().min(1).max(5),
              initialValue: 5,
            },
            {
              name: 'quote',
              title: 'Review Quote',
              type: 'text',
              rows: 3,
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'authorName',
              title: 'Author Name',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'authorRole',
              title: 'Author Role',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'authorCompany',
              title: 'Author Company/Location',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'avatarInitials',
              title: 'Avatar Initials',
              type: 'string',
              validation: (Rule: any) => Rule.required().min(2).max(3),
            },
            {
              name: 'avatarGradient',
              title: 'Avatar Gradient',
              type: 'string',
              initialValue: 'radial-gradient(ellipse at 38% 30%,#5baeff,#007aff 50%,#0040a8)',
            },
          ],
        },
      ],
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: 'totalReviews',
      title: 'Total Reviews Count',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: 'averageRating',
      title: 'Average Rating',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'recommendationPercentage',
      title: 'Recommendation Percentage',
      type: 'string',
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
