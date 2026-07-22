import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'sharedAudience',
  title: 'Audience Section',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Sihtrühm',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Kellele see koolitus on mõeldud?',
    }),
    defineField({
      name: 'socialProofIntro',
      title: 'Social Proof Intro',
      type: 'string',
      initialValue: 'Meie koolitustel on osalenud juba üle 500 tootmisjuhi',
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'quote',
              title: 'Quote',
              type: 'string',
            }),
            defineField({
              name: 'behavior',
              title: 'Behavior',
              type: 'string',
            }),
            defineField({
              name: 'percentage',
              title: 'Percentage',
              type: 'string',
            }),
            defineField({
              name: 'revealText',
              title: 'Reveal Text',
              type: 'string',
            }),
            defineField({
              name: 'revealLink',
              title: 'Reveal Link',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'confirmButtonText',
      title: 'Confirm Button Text',
      type: 'string',
      initialValue: 'Kinnita oma sihtgrupp',
    }),
    defineField({
      name: 'transformBar',
      title: 'Transform Bar',
      type: 'object',
      fields: [
        defineField({
          name: 'beforeLabel',
          title: 'Before Label',
          type: 'string',
          initialValue: 'Enne',
        }),
        defineField({
          name: 'beforeText',
          title: 'Before Text',
          type: 'string',
          initialValue: 'Töötad raskelt, palju stressi',
        }),
        defineField({
          name: 'afterLabel',
          title: 'After Label',
          type: 'string',
          initialValue: 'Pärast',
        }),
        defineField({
          name: 'afterText',
          title: 'After Text',
          type: 'string',
          initialValue: 'Töötad efektiivselt, vähem stressi',
        }),
      ],
    }),
    defineField({
      name: 'goalSection',
      title: 'Goal Section',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string',
          initialValue: 'Sinu eesmärk',
        }),
        defineField({
          name: 'placeholder',
          title: 'Placeholder',
          type: 'string',
          initialValue: 'Kirjuta oma sihtgrupp siia...',
        }),
        defineField({
          name: 'confirmText',
          title: 'Confirm Text',
          type: 'string',
          initialValue: 'Kinnita, et näha personaalset koolitusteed',
        }),
      ],
    }),
    defineField({
      name: 'directorPath',
      title: 'Director Path',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Töö direktorina?',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'string',
          initialValue: 'Kuidas LEAN aitab sinu juhtimist?',
        }),
        defineField({
          name: 'linkText',
          title: 'Link Text',
          type: 'string',
          initialValue: 'Vaata direktorite tee',
        }),
        defineField({
          name: 'linkUrl',
          title: 'Link URL',
          type: 'string',
          initialValue: '/director',
        }),
      ],
    }),
  ],
})
