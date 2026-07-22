import { defineField, type PreviewValue } from 'sanity'

import { withLegacyBlockquote } from './legacyBlockquoteStyle'

/** Shared blog article fields — native posts and WordPress imports use the same Studio form. */
export const blogArticleFields = [
  defineField({
    name: 'title',
    title: 'Title',
    type: 'string',
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'slug',
    title: 'Slug',
    type: 'slug',
    options: {
      source: 'title',
      maxLength: 96,
    },
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'publishedAt',
    title: 'Published At',
    type: 'datetime',
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'excerpt',
    title: 'Excerpt',
    type: 'text',
    rows: 3,
    validation: (Rule) => Rule.max(200),
  }),
  defineField({
    name: 'coverImage',
    title: 'Cover Image',
    type: 'image',
    options: {
      hotspot: true,
    },
    fields: [
      defineField({
        name: 'alt',
        title: 'Alternative Text',
        type: 'string',
      }),
    ],
  }),
  defineField({
    name: 'category',
    title: 'Category',
    type: 'string',
    description:
      'Vaba sisestus. Lisa uus kategooria ise (soovitus: lowercase slug, nt "juhtimine", "lean-audit").',
    validation: (Rule) =>
      Rule.required().regex(/^[a-z0-9-]+$/, { name: 'slug-like category' }),
  }),
  defineField({
    name: 'readTime',
    title: 'Reading Time (minutes)',
    type: 'number',
    validation: (Rule) => Rule.required().min(1),
  }),
  defineField({
    name: 'featured',
    title: 'Featured',
    type: 'boolean',
    initialValue: false,
  }),
  defineField({
    name: 'author',
    title: 'Author',
    type: 'object',
    fields: [
      defineField({
        name: 'name',
        title: 'Name',
        type: 'string',
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: 'role',
        title: 'Role',
        type: 'string',
      }),
      defineField({
        name: 'avatar',
        title: 'Avatar',
        type: 'image',
        fields: [
          defineField({
            name: 'alt',
            title: 'Alternative Text',
            type: 'string',
          }),
        ],
      }),
    ],
  }),
  defineField({
    name: 'body',
    title: 'Body',
    type: 'array',
    of: [
      {
        type: 'block',
        styles: withLegacyBlockquote([
          { title: 'Normal', value: 'normal' },
          { title: 'H2', value: 'h2' },
          { title: 'H3', value: 'h3' },
          { title: 'H4', value: 'h4' },
        ]),
        lists: [
          { title: 'Bullet', value: 'bullet' },
          { title: 'Numbered', value: 'number' },
        ],
        marks: {
          decorators: [
            { title: 'Bold', value: 'strong' },
            { title: 'Italic', value: 'em' },
            { title: 'Underline', value: 'underline' },
          ],
        },
      },
      {
        type: 'object',
        name: 'calloutBlock',
        title: 'Callout',
        fields: [
          defineField({
            name: 'type',
            title: 'Type',
            type: 'string',
            options: {
              list: [
                { title: 'Info', value: 'info' },
                { title: 'Warning', value: 'warning' },
                { title: 'Success', value: 'success' },
              ],
            },
          }),
          defineField({
            name: 'text',
            title: 'Text',
            type: 'text',
          }),
        ],
      },
      {
        type: 'object',
        name: 'imageBlock',
        title: 'Image Block',
        fields: [
          defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
              hotspot: true,
            },
          }),
          defineField({
            name: 'caption',
            title: 'Caption',
            type: 'text',
          }),
          defineField({
            name: 'alt',
            title: 'Alternative Text',
            type: 'string',
          }),
        ],
      },
      {
        type: 'object',
        name: 'statsRow',
        title: 'Stats Row',
        fields: [
          defineField({
            name: 'stats',
            title: 'Statistics',
            type: 'array',
            of: [
              {
                type: 'object',
                fields: [
                  defineField({
                    name: 'number',
                    title: 'Number',
                    type: 'number',
                  }),
                  defineField({
                    name: 'label',
                    title: 'Label',
                    type: 'string',
                  }),
                ],
              },
            ],
          }),
        ],
      },
    ],
  }),
  defineField({
    name: 'wpImportId',
    title: 'WordPress post ID (import)',
    type: 'number',
    readOnly: true,
    hidden: ({ document }) => !document?.wpImportId,
    description: 'Set automatically by WordPress import. Leave empty for native posts.',
  }),
]

export const blogArticlePreview = {
  select: {
    title: 'title',
    author: 'author.name',
    media: 'coverImage',
    publishedAt: 'publishedAt',
  },
  prepare(selection: {
    title?: string
    author?: string
    media?: any
    publishedAt?: string
  }): PreviewValue {
    const { title, author, media, publishedAt } = selection
    return {
      title,
      subtitle: author
        ? `by ${author}${publishedAt ? ` on ${new Date(publishedAt).toLocaleDateString()}` : ''}`
        : publishedAt
          ? new Date(publishedAt).toLocaleDateString()
          : undefined,
      media,
    }
  },
}
