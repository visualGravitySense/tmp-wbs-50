/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-anonymous-default-export */
import { faqQuestionsField } from './fields/faqQuestionsField'

/** Standalone FAQ document schema (registered in Studio). Primary content for /opstar-profit lives inside the `opstarProfit` document → KKK Section. Keep fields aligned with that object. */
export default {
  name: 'kkk',
  title: 'KKK (FAQ) — standalone',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'eyebrow',
      title: 'Pill badge text',
      description: 'Short label shown in the pill with dots.',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'showEyebrowDots',
      title: 'Show dots on pill badge',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'subtitle',
      title: 'Subtitle (optional)',
      type: 'text',
      rows: 2,
    },
    faqQuestionsField,
    {
      name: 'backgroundColor',
      title: 'Background Color (reserved)',
      type: 'string',
      initialValue: 'bg-white',
      description: 'Not applied by the current site theme; kept for editors / future use.',
    },
    {
      name: 'titleColor',
      title: 'Title Color (reserved)',
      type: 'string',
      initialValue: 'text-gray-900',
    },
    {
      name: 'eyebrowColor',
      title: 'Eyebrow Color (reserved)',
      type: 'string',
      initialValue: 'text-blue-600',
    },
    {
      name: 'questionBackgroundColor',
      title: 'Question Background Color (reserved)',
      type: 'string',
      initialValue: 'bg-gray-50',
    },
    {
      name: 'questionTextColor',
      title: 'Question Text Color (reserved)',
      type: 'string',
      initialValue: 'text-gray-900',
    },
    {
      name: 'answerBackgroundColor',
      title: 'Answer Background Color (reserved)',
      type: 'string',
      initialValue: 'bg-white',
    },
    {
      name: 'answerTextColor',
      title: 'Answer Text Color (reserved)',
      type: 'string',
      initialValue: 'text-gray-700',
    },
  ],
  preview: {
    select: {
      title: 'title',
      eyebrow: 'eyebrow',
    },
    prepare(selection: any) {
      const { title, eyebrow } = selection
      return {
        title: title,
        subtitle: eyebrow,
      }
    },
  },
}
