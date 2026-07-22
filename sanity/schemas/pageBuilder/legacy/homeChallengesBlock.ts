import { defineField, defineType } from 'sanity'

/** @deprecated Use painPointsBlock (variant: roles). */
export default defineType({
  name: 'homeChallengesBlock',
  title: 'Väljakutsed (legacy)',
  type: 'object',
  deprecated: { reason: 'Kasuta painPointsBlock (variant: roles)' },
  fields: [
    defineField({
      name: 'challenges',
      title: 'Challenges',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'managerTitle', title: 'Manager Column Title', type: 'string' }),
        defineField({ name: 'participantTitle', title: 'Participant Column Title', type: 'string' }),
        defineField({ name: 'collectiveTitle', title: 'Collective Column Title', type: 'string' }),
        defineField({
          name: 'managerChallenges',
          title: 'Manager Challenges',
          type: 'array',
          of: [{ type: 'string' }],
        }),
        defineField({
          name: 'participantChallenges',
          title: 'Participant Challenges',
          type: 'array',
          of: [{ type: 'string' }],
        }),
        defineField({
          name: 'collectiveChallenges',
          title: 'Collective Challenges',
          type: 'array',
          of: [{ type: 'string' }],
        }),
        defineField({ name: 'conclusion', title: 'Conclusion Text', type: 'string' }),
      ],
    }),
  ],
  preview: {
    select: { title: 'challenges.title' },
    prepare({ title }: { title?: string }) {
      return { title: title || 'Väljakutsed (legacy)', subtitle: '→ painPointsBlock roles' }
    },
  },
})