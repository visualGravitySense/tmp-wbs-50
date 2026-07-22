import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'photoMarqueeSectionContent',
  title: 'Photo Marquee Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Teooria kohtub praktikaga',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      initialValue: 'Vaated meie toimunud koolitustelt ja visiitidelt',
    }),
    defineField({
      name: 'mobileLayout',
      title: 'Mobiilne vaade (Layout on Mobile)',
      type: 'string',
      options: {
        list: [
          { title: 'Lohisatav galerii / Slaidid (Scroll/Swipe)', value: 'scroll' },
          { title: 'Lõputu jooksev rida (Infinite Marquee)', value: 'marquee' },
        ],
        layout: 'radio',
      },
      initialValue: 'scroll',
      description: 'Vali, kuidas kuvatakse fotosid mobiilsetel seadmetel.',
    }),
    defineField({
      name: 'gradientFrom',
      title: 'Gradient From (HEX)',
      type: 'string',
      description: 'Example: #2954de',
      initialValue: '#2954de',
    }),
    defineField({
      name: 'gradientTo',
      title: 'Gradient To (HEX)',
      type: 'string',
      description: 'Example: #2b2f90',
      initialValue: '#2b2f90',
    }),
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                }),
              ],
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
              initialValue: 'Koolitusmoment',
            }),
            defineField({
              name: 'showOnMain',
              title: 'Kuva avalehel (Teooria kohtub praktikaga)',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: 'caption',
              media: 'image',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'cta',
      title: 'CTA Button',
      description: 'Nupp, mis viib kogu galerii lehele (nt "Vaata kogu galeriid")',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Nupu tekst',
          type: 'string',
          initialValue: 'Vaata kogu galeriid',
        }),
        defineField({
          name: 'link',
          title: 'Nupu link',
          type: 'string',
          description: 'Sisesta lehe teekond (nt /galerii) või täispikk URL',
          initialValue: '/galerii',
        }),
      ],
    }),
  ],
})

