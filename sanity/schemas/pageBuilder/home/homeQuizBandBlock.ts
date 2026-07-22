import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homeQuizBandBlock',
  title: 'Kiirtest (Quick Quiz)',
  type: 'object',
  fields: [
    defineField({
      name: 'quiz',
      title: 'Quick Quiz',
      type: 'quizContent',
    }),
    defineField({
      name: 'helpFormTeaser',
      title: 'Tootmisaudit (eemaldatud)',
      type: 'helpFormTeaserBlock',
      hidden: true,
      description: 'Eemaldatud avalehelt — ei kuvata.',
    }),
  ],
  preview: {
    select: {
      quizTitle: 'quiz.introTopLine',
      helpTitle: 'helpFormTeaser.title',
    },
    prepare({ quizTitle, helpTitle }) {
      return {
        title: quizTitle || 'Quick Quiz + abi',
        subtitle: helpTitle ? `Abi: ${helpTitle}` : 'Avalehe intro riba',
      }
    },
  },
})
