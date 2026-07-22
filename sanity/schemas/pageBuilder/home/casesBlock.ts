import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'casesBlock',
  title: 'Cases Block (Juhtumiuuringud)',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Juhtumiuuringud' }),
    defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Päris tulemused päris ettevõtetest' }),
    defineField({ name: 'subheading', title: 'Subheading', type: 'string', initialValue: 'Enne ja pärast — numbrid räägivad ise.' }),
    defineField({
      name: 'cases',
      title: 'Cases',
      type: 'array',
      of: [{ type: 'caseItem' }]
    })
  ]
})
