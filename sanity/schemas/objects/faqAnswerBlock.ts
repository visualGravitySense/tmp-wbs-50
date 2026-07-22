import { defineArrayMember } from 'sanity'

import { legacyBlockquoteStyle } from './legacyBlockquoteStyle'

/** Shared FAQ answer portable text member (used by `faqItem`). */
export const faqAnswerPortableText = defineArrayMember({
  type: 'block',
  styles: [
    { title: 'Normal', value: 'normal' },
    { title: 'Heading 1', value: 'h1' },
    { title: 'Heading 2', value: 'h2' },
    { title: 'Heading 3', value: 'h3' },
    { title: 'Heading 4', value: 'h4' },
    { title: 'Heading 5', value: 'h5' },
    { title: 'Heading 6', value: 'h6' },
    legacyBlockquoteStyle,
  ],
  lists: [
    { title: 'Bullet', value: 'bullet' },
    { title: 'Numbered', value: 'number' },
  ],
  marks: {
    decorators: [
      { title: 'Strong', value: 'strong' },
      { title: 'Emphasis', value: 'em' },
      { title: 'Code', value: 'code' },
    ],
    annotations: [
      {
        name: 'link',
        type: 'object',
        fields: [{ name: 'href', type: 'url', title: 'URL' }],
      },
    ],
  },
})