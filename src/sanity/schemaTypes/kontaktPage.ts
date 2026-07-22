import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'kontaktPage',
  title: 'Kontakt Page / Kontaktileht',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title / Pealkiri',
      type: 'string',
    }),
    defineField({
      name: 'pageTitle',
      title: 'Page Title / Lehe pealkiri',
      type: 'string',
    }),
    defineField({
      name: 'richText',
      title: 'Description / Rich Text Content',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Long-form textual blocks for the Kontakt page (Rich Text sisu).',
    }),
    defineField({
      name: 'sections',
      title: 'Page Builder',
      type: 'array',
      of: [
        { type: 'kontaktHeroBlock' },
        { type: 'kontaktQuickBlock' },
        { type: 'kontaktFormBlock' },
        { type: 'kontaktAndresBlock' },
        { type: 'kontaktOpstarBlock' },
        { type: 'kontaktServicesBlock' },
        { type: 'kontaktLegalNoteBlock' },
        { type: 'koolitusLocationBlock' },
      ],
      description: 'Lisa ja reasta kontaktilehe plokke. Kui siin on plokke, kasutatakse neid vana disaini asemel.',
    }),
  ],
})
