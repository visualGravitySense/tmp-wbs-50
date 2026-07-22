import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'quizContent',
  title: 'Quick Quiz',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Quiz Title',
      type: 'string',
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow (Small Header)',
      type: 'string',
      initialValue: 'Testi oma süsteemi',
    }),
    defineField({
      name: 'introTopLine',
      title: 'Intro Heading - Top Line',
      description: 'Dark top line shown before quiz card',
      type: 'string',
      initialValue: 'Kas need tootmisjuhtimise probleemid',
    }),
    defineField({
      name: 'introAccentLine',
      title: 'Intro Heading - Accent Line',
      description: 'Blue/italic second line shown before quiz card',
      type: 'string',
      initialValue: 'esinevad ka sinu töös?',
    }),
    defineField({
      name: 'introDescription',
      title: 'Intro Description',
      type: 'text',
      rows: 3,
      initialValue:
        'Märgi alamprobleemid, mida oma töös või organisatsioonis ära tunned. Tööriist toob esile peamise juhtimiskategooria ning seob selle vastava arendusteema ja kasuga.',
    }),
    defineField({
      name: 'questions',
      title: 'Questions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              title: 'Question Text',
              type: 'string',
            }),
            defineField({
              name: 'options',
              title: 'Answers',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'text',
                      title: 'Answer Text',
                      type: 'string',
                    }),
                    defineField({
                      name: 'points',
                      title: 'Points',
                      type: 'number',
                      description: 'Usually 1-5',
                    }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'results',
      title: 'Result Thresholds',
      description: 'Define messages based on total score',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'minScore',
              title: 'Min Score',
              type: 'number',
            }),
            defineField({
              name: 'title',
              title: 'Result Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Result Description',
              type: 'text',
            }),
            defineField({
              name: 'ctaLink',
              title: 'Programmi link (valikuline)',
              type: 'string',
              description: 'Kui tühi, suunab "Vaata programmi" nupp vaikimisi /koolitus lehele.',
            }),
          ],
        },
      ],
    }),
  ],
})
