import { defineType } from 'sanity'

/**
 * Photo gallery block for the koolitus page builder.
 * Renders an asymmetric image grid with lightbox.
 */
export default defineType({
  name: 'koolitusPhotoGalleryBlock',
  title: 'Fotogalerii (koolitusmomendid)',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Pealkiri',
      type: 'string' as const,
      initialValue: 'Teooria kohtub praktikaga',
    },
    {
      name: 'subtitle',
      title: 'Silmapealiskiri',
      type: 'string' as const,
      initialValue: 'Vaated meie toimunud koolitustelt ja visiitidelt',
    },
    {
      name: 'images',
      title: 'Fotod',
      type: 'array' as const,
      of: [
        {
          type: 'image' as const,
          options: { hotspot: true },
          fields: [
            {
              name: 'tag',
              title: 'Silt (nt "Koolitusmoment")',
              type: 'string' as const,
            },
            {
              name: 'alt',
              title: 'Alt-tekst (SEO)',
              type: 'string' as const,
            },
            {
              name: 'size',
              title: 'Kaardi suurus',
              type: 'string' as const,
              options: {
                list: [
                  { title: 'Tavaline', value: 'normal' },
                  { title: 'Suur (peamine)', value: 'large' },
                  { title: 'Lai', value: 'wide' },
                ],
                layout: 'radio',
              },
              initialValue: 'normal',
            },
          ],
        },
      ],
      validation: (Rule: any) => Rule.min(1),
    },
  ],
  preview: {
    select: { title: 'title', images: 'images' },
    prepare({ title, images }: { title?: string; images?: unknown[] }) {
      const count = images?.length ?? 0
      return {
        title: title || 'Fotogalerii',
        subtitle: `${count} foto`,
      }
    },
  },
})
