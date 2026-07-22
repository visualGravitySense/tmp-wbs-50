import { defineField } from 'sanity'

/** Testimonials / reviews fields mirrored from `mainPage` (TestimonialsReviews + legacy Testimonials). */
export const homeTestimonialsFields = [
  defineField({
    name: 'featuredReviews',
    title: 'Avalehe tagasiside (Review dokumendid)',
    description:
      'Vali konkreetsed Review dokumendid — kuvatakse avalehel (esimesed 3 kaarti; ülejäänu vaata /testimonials). Järjekord = kuvamise järjekord. Kui tühi, kasutatakse uusimaid Review dokumente automaatselt.',
    type: 'array',
    of: [
      {
        type: 'reference',
        to: [{ type: 'review' }],
      },
    ],
  }),
  defineField({
    name: 'testimonialReferences',
    title: 'Vali klikiga kliendid (Testimonials)',
    type: 'array',
    of: [{ type: 'reference', to: [{ type: 'testimonial' }] }]
  }),
  defineField({
    name: 'testimonials',
    title: 'Testimonials Section (legacy inline)',
    description:
      'Kasutatakse ainult siis, kui Review dokumendid puuduvad. Tulevikus eelistatakse featuredReviews.',
    type: 'object',
    fields: [
      defineField({
        name: 'title',
        title: 'Section Title',
        type: 'string',
        initialValue: 'Kuidas me aitasid teistel',
      }),
      defineField({
        name: 'subtitle',
        title: 'Section Subtitle',
        type: 'string',
        initialValue: 'Kliendid räägivad',
      }),
      defineField({
        name: 'testimonials',
        title: 'Testimonials',
        type: 'array',
        of: [
          {
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
                validation: (Rule) => Rule.required(),
              }),
              defineField({
                name: 'company',
                title: 'Company',
                type: 'string',
              }),
              defineField({
                name: 'content',
                title: 'Testimonial Content',
                type: 'text',
                rows: 3,
                validation: (Rule) => Rule.required(),
              }),
              defineField({
                name: 'rating',
                title: 'Rating',
                type: 'number',
                options: {
                  list: [
                    { title: '1 Star', value: 1 },
                    { title: '2 Stars', value: 2 },
                    { title: '3 Stars', value: 3 },
                    { title: '4 Stars', value: 4 },
                    { title: '5 Stars', value: 5 },
                  ],
                },
                initialValue: 5,
              }),
              defineField({
                name: 'avatar',
                title: 'Avatar Image',
                type: 'image',
                options: {
                  hotspot: true,
                },
                fields: [
                  defineField({
                    name: 'alt',
                    title: 'Alternative Text',
                    type: 'string',
                    description: 'Description of the image for accessibility',
                  }),
                ],
              }),
            ],
          },
        ],
        initialValue: [
          {
            name: 'Margus Põld',
            role: 'Tootmisjuht',
            company: 'Tehnikum OÜ',
            content:
              'Koolitus oli mängu muutev. Õppisime praktilikke meetodeid, mida saime kohe tehases rakendada. OEE tõusis 35% esimese 3 kuuga.',
            rating: 5,
          },
          {
            name: 'Tiina Lepik',
            role: 'Olemike juht',
            company: 'Baltic Pack',
            content:
              'Parim investeering meie meeskonnale. Treener ei õpeta ainult teooriat, vaid näitab kuidas asju tegelikult tehases toimima paneb.',
            rating: 5,
          },
          {
            name: 'Jaan Tamm',
            role: 'CEO',
            company: 'MetalWorks AS',
            content:
              '25+ aastat kogemust on näha. Treener räägib keelt, mida tootmisinimene mõistab ja usaldab. Soovitan kõigile tootmisjuhtidele.',
            rating: 5,
          },
        ],
      }),
      defineField({
        name: 'buttonText',
        title: 'Button Text',
        type: 'string',
        initialValue: 'Vaata kõik tagasisideid',
      }),
      defineField({
        name: 'buttonLink',
        title: 'Button Link',
        type: 'string',
        initialValue: '/testimonials',
      }),
    ],
  }),
]
