import { defineField, defineType, type FieldDefinition } from 'sanity'

import { getKoolitusPageField } from './getKoolitusPageField'

export function createKoolitusSectionBlock(options: {
  name: string
  title: string
  fieldName: string
  previewTitlePath: string
  previewSubtitle?: string
}) {
  const { name, title, fieldName, previewTitlePath, previewSubtitle = 'Koolitus' } =
    options

  return defineType({
    name,
    title,
    type: 'object',
    fields: [
      defineField(getKoolitusPageField(fieldName) as unknown as FieldDefinition),
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
