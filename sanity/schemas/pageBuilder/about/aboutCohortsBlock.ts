import { defineType } from 'sanity'

export default defineType({
  name: 'aboutCohortsBlock',
  title: 'Kohordid (Grupid ja koolituspäevad)',
  type: 'object',
  fields: [
    {
      name: 'note',
      type: 'string',
      title: 'Note',
      description: 'See plokk kuvab kohorte (gruppe). Andmeid muudetakse "Site Settings -> Cohorts" alt.',
      readOnly: true,
      initialValue: 'Kohordid laetakse seadetest'
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Kohordid (Grupid ja koolituspäevad)',
        subtitle: 'Andres Kase',
      }
    },
  },
})
