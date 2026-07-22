import { defineArrayMember, defineField } from 'sanity'

/** Shared field definitions for 9-day program content (siteSettings object + global document). */
export const nineDaysProgramFields = [
  defineField({
    name: 'eyebrow',
    title: 'Eyebrow',
    type: 'string',
    initialValue: 'OMADUSED',
    description: 'Väike tekst ülal, nt "OMADUSED"',
  }),
  defineField({
    name: 'title',
    title: 'Title',
    type: 'string',
    initialValue: '9-päevane intensiivprogramm',
  }),
  defineField({
    name: 'subtitle',
    title: 'Subtitle',
    type: 'text',
    rows: 2,
    initialValue: 'Muuda oma tootmist 9 päevaga LEAN süsteemi abil',
  }),
  defineField({
    name: 'primaryBtnText',
    title: 'Sinise nupu tekst',
    type: 'string',
    initialValue: 'REGISTREERU PROGRAMMI',
    description: 'Peamise sinise nupu silt. Näide: "REGISTREERU PROGRAMMI".',
  }),
  defineField({
    name: 'primaryBtnLink',
    title: 'Sinise nupu link / ankur',
    type: 'string',
    description:
      "Sisesta täislink, lehe tee nagu '/koolitus' või ankur nagu '#pricing'. Kui jätad tühjaks, nuppu ei kuvata.",
  }),
  defineField({
    name: 'backgroundColor',
    title: 'Background Color',
    type: 'string',
    initialValue: 'bg-gray-50',
  }),
  defineField({
    name: 'habits',
    title: 'Habits',
    type: 'array',
    of: [
      defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'day', title: 'Day', type: 'string', validation: (Rule) => Rule.required() }),
          defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
          defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 2,
            validation: (Rule) => Rule.required(),
          }),
          defineField({ name: 'icon', title: 'Icon', type: 'string', validation: (Rule) => Rule.required() }),
          defineField({ name: 'benefit', title: 'Benefit', type: 'string', validation: (Rule) => Rule.required() }),
        ],
      }),
    ],
  }),
  defineField({
    name: 'oppepaevad',
    title: 'Õppepäevad (Shared Data)',
    description:
      'Vali siin Õppepäeva dokumendid (1-9), et andmed sünkroniseeruks avalehe ja koolituslehe vahel.',
    type: 'array',
    of: [defineArrayMember({ type: 'reference', to: [{ type: 'oppepaev' }] })],
  }),
  defineField({
    name: 'days',
    title: 'Program Days (Vanem vorm)',
    type: 'array',
    hidden: true,
    readOnly: true,
    description: 'Ainult vanade andmete lugemiseks.',
    of: [
      defineArrayMember({
        type: 'object',
        fields: [
          defineField({
            name: 'dayNumber',
            title: 'Day Number',
            type: 'number',
            validation: (Rule) => Rule.required().min(1),
          }),
          defineField({
            name: 'tag',
            title: 'Tag',
            type: 'string',
            description: 'Näide: Vundament, Praktika, Õppepäev',
          }),
          defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
          defineField({
            name: 'habit',
            title: 'Day Goal / Focus',
            type: 'text',
            rows: 2,
            validation: (Rule) => Rule.required(),
          }),
          defineField({
            name: 'description',
            title: 'Main Description',
            type: 'array',
            of: [{ type: 'block' }],
            description:
              'Peamine kirjeldus paremas suures kaardis. Kui infoCards on täidetud, kuvatakse mitu kaarti.',
          }),
          defineField({
            name: 'infoCards',
            title: 'Info Cards',
            type: 'array',
            of: [
              defineArrayMember({
                type: 'object',
                fields: [
                  defineField({ name: 'title', title: 'Card Title', type: 'string' }),
                  defineField({
                    name: 'body',
                    title: 'Card Body',
                    type: 'array',
                    of: [{ type: 'block' }],
                    validation: (Rule) => Rule.required().min(1),
                  }),
                ],
                preview: {
                  select: { title: 'title' },
                  prepare(selection: { title?: string }) {
                    return { title: selection?.title || 'Info card' }
                  },
                },
              }),
            ],
          }),
        ],
        preview: {
          select: { dayNumber: 'dayNumber', title: 'title' },
          prepare(selection: { dayNumber?: number; title?: string }) {
            const day = selection?.dayNumber ? `Day ${selection.dayNumber}` : 'Day'
            return { title: `${day}: ${selection?.title || 'Untitled'}` }
          },
        },
      }),
    ],
  }),
  defineField({
    name: 'popupTitle',
    title: 'Popup Pealkiri',
    type: 'string',
    description: '«Saada mulle programm» / «Loe lähemalt» vormi pealkiri',
    initialValue: 'Saadame programmi sulle e-kirjaga märgitud aadressile.',
  }),
  defineField({
    name: 'popupSubtitle',
    title: 'Popup Alapealkiri / Nõusolek',
    type: 'text',
    rows: 3,
    description: 'GDPR / nõusoleku tekst programmi vormis',
    initialValue: 'Vormi saatmisega kinnitad, et nõustud oma kontaktandmete jagamisega.',
  }),
  defineField({
    name: 'sidebarCtas',
    title: 'Left column — branded buttons',
    type: 'object',
    options: { collapsible: true, collapsed: false },
    description: 'Green gradient + white pill under the day cards (reference layout).',
    fields: [
      defineField({
        name: 'registerText',
        title: 'Green button text',
        type: 'string',
        initialValue: 'Registreeru programmi →',
      }),
      defineField({
        name: 'registerUrl',
        title: 'Green button URL',
        type: 'string',
        initialValue: '/register',
        description: 'Registration page path, e.g. /register',
      }),
      defineField({
        name: 'readMoreText',
        title: 'White button text',
        type: 'string',
        initialValue: 'Loe lähemalt',
      }),
      defineField({
        name: 'readMoreUrl',
        title: 'White button URL',
        type: 'string',
        description: 'Brochure, PDF, or detail page',
      }),
    ],
  }),
  defineField({
    name: 'completionSection',
    title: 'Completion Section',
    type: 'object',
    fields: [
      defineField({
        name: 'title',
        title: 'Title',
        type: 'string',
        initialValue: 'Programmi lõpetamiseks',
      }),
      defineField({
        name: 'description',
        title: 'Description',
        type: 'string',
        initialValue: 'Vali sobivaim viis osalemiseks',
      }),
      defineField({
        name: 'selectedHabits',
        title: 'Selected Habits',
        type: 'array',
        of: [
          defineArrayMember({
            type: 'object',
            fields: [
              defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
              defineField({
                name: 'description',
                title: 'Description',
                type: 'string',
                validation: (Rule) => Rule.required(),
              }),
              defineField({ name: 'icon', title: 'Icon', type: 'string', validation: (Rule) => Rule.required() }),
            ],
          }),
        ],
      }),
      defineField({
        name: 'nextCourseInfo',
        title: 'Next Course Info',
        type: 'string',
        initialValue: 'Järgmine kursus algab 15. septembril',
      }),
      defineField({
        name: 'buttonText',
        title: 'Button Text',
        type: 'string',
        initialValue: 'Registreeru kursusele',
      }),
    ],
  }),
  defineField({
    name: 'faqSection',
    title: 'FAQ Section',
    type: 'object',
    fields: [
      defineField({
        name: 'question',
        title: 'Question',
        type: 'string',
        initialValue: 'Kuidas töötab 9-päevane programm?',
      }),
      defineField({
        name: 'testimonials',
        title: 'Testimonials',
        type: 'array',
        of: [
          defineArrayMember({
            type: 'object',
            fields: [
              defineField({ name: 'quote', title: 'Quote', type: 'string', validation: (Rule) => Rule.required() }),
              defineField({ name: 'author', title: 'Author', type: 'string', validation: (Rule) => Rule.required() }),
              defineField({ name: 'company', title: 'Company', type: 'string', validation: (Rule) => Rule.required() }),
              defineField({ name: 'position', title: 'Position', type: 'string', validation: (Rule) => Rule.required() }),
            ],
          }),
        ],
      }),
    ],
  }),
]