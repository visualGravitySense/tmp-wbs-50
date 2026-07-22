/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-anonymous-default-export */
import { withLegacyBlockquote } from './objects/legacyBlockquoteStyle'
export default {
  name: 'kolmSammast',
  title: 'Kolm sammast',
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
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'stepNumber',
              title: 'Step Number',
              type: 'number',
              validation: (Rule: any) => Rule.required().min(1),
            },
            {
              name: 'title',
              title: 'Step Title',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Step Description',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: withLegacyBlockquote([
                    { title: 'Normal', value: 'normal' },
                    { title: 'H1', value: 'h1' },
                    { title: 'H2', value: 'h2' },
                    { title: 'H3', value: 'h3' },
                  ]),
                  lists: [
                    { title: 'Bullet', value: 'bullet' },
                    { title: 'Numbered', value: 'number' },
                  ],
                  marks: {
                    decorators: [
                      { title: 'Strong', value: 'strong' },
                      { title: 'Emphasis', value: 'em' },
                      { title: 'Code', value: 'code' },
                    ],
                    annotations: [
                      {
                        name: 'link',
                        type: 'object',
                        fields: [
                          {
                            name: 'href',
                            type: 'url',
                            title: 'URL',
                          },
                        ],
                      },
                    ],
                  },
                },
              ],
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Icon name or emoji (e.g., 🎯, 📊, 🚀)',
            },
          ],
        },
      ],
      validation: (Rule: any) => Rule.required().min(1).max(3),
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
      name: 'stepColor',
      title: 'Step Number Color',
      type: 'string',
      initialValue: 'bg-blue-600 text-white',
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
