import { defineField, defineType, type FieldDefinition } from 'sanity'

import { getOpstarPageField } from './getOpstarPageField'

export function createOpstarSectionBlock(options: {
  name: string
  title: string
  fieldName: string
  previewTitlePath: string
  previewSubtitle?: string
}) {
  const { name, title, fieldName, previewTitlePath, previewSubtitle = 'OPSTAR Profit' } =
    options

  return defineType({
    name,
    title,
    type: 'object',
    fields: [
      defineField(getOpstarPageField(fieldName) as unknown as FieldDefinition),
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
