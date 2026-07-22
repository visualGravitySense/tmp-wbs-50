import { defineField, defineType, type FieldDefinition } from 'sanity'

import { getAboutPageField } from './getAboutPageField'

export function createAboutSectionBlock(options: {
  name: string
  title: string
  fieldName: string
  previewTitlePath: string
  previewSubtitle?: string
}) {
  const { name, title, fieldName, previewTitlePath, previewSubtitle = 'Your Name' } =
    options

  return defineType({
    name,
    title,
    type: 'object',
    fields: [
      defineField(getAboutPageField(fieldName) as unknown as FieldDefinition),
    ],
    preview: {
      select: { previewTitle: previewTitlePath },
      prepare({ previewTitle }: { previewTitle?: string }) {
        return {
          title: previewTitle || title,
          subtitle: previewSubtitle,
        }
      },
    },
  })
}
