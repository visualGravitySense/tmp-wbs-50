import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      options: {
        list: [
          { title: 'External URL', value: 'external' },
          { title: 'Internal Page', value: 'internal' },
        ],
        layout: 'radio',
      },
      initialValue: 'external',
    }),
    defineField({
      name: 'reference',
      title: 'Internal Page',
      type: 'reference',
      to: [
        { type: 'page' },
        { type: 'training' },
        { type: 'blogPage' },
        { type: 'koolitusPage' },
        { type: 'aboutPage' },
        { type: 'opstarProfit' },
        { type: 'testimonialsPage' },
        { type: 'kontaktPage' },
        { type: 'galleryPage' },
        { type: 'privacyPolicyPage' },
        { type: 'juhendatudLoputoodPage' },
        { type: 'mainPage' },
      ],
      hidden: ({ parent }) => parent?.linkType !== 'internal',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { linkType?: string; url?: string } | undefined
          if (parent?.linkType === 'internal' && !value && !parent?.url?.trim()) {
            return 'Page selection or path is required for internal links'
          }
          return true
        }),
    }),
    defineField({
      name: 'url',
      title: 'URL or path',
      type: 'string',
      description:
        'External: full URL (https://…). Internal: relative path (e.g. /kontakt) when not using page picker above.',
      hidden: ({ parent }) => !parent?.linkType,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as {
            linkType?: string
            reference?: { _ref?: string }
          } | undefined

          if (parent?.linkType === 'external' && !value?.trim()) {
            return 'URL is required for external links'
          }

          if (
            parent?.linkType === 'internal' &&
            !parent?.reference?._ref &&
            !value?.trim()
          ) {
            return 'Page selection or path is required for internal links'
          }

          return true
        }),
    }),
  ],
  preview: {
    select: {
      linkType: 'linkType',
      url: 'url',
      reference: 'reference.title',
    },
    prepare(selection) {
      const { linkType, url, reference } = selection
      return {
        title: linkType === 'external' ? url : reference || url,
        subtitle: linkType === 'external' ? 'External Link' : 'Internal Page',
      }
    },
  },
})