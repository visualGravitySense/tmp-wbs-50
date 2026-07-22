import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'caseItem',
  title: 'Juhtumiuuring (Case)',
  type: 'object',
  fields: [
    defineField({ name: 'companyName', title: 'Company Name', type: 'string' }),
    defineField({ name: 'year', title: 'Year', type: 'string' }),
    defineField({ name: 'sector', title: 'Sector', type: 'string' }),
    defineField({ name: 'employeesCount', title: 'Employees Count', type: 'string' }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'beforeOee', title: 'Before OEE', type: 'string' }),
    defineField({ name: 'beforePraak', title: 'Before Praak', type: 'string' }),
    defineField({ name: 'beforeUletunnid', title: 'Before Ületunnid', type: 'string' }),
    defineField({ name: 'afterOee', title: 'After OEE', type: 'string' }),
    defineField({ name: 'afterPraak', title: 'After Praak', type: 'string' }),
    defineField({ name: 'afterUletunnid', title: 'After Ületunnid', type: 'string' }),
    defineField({ name: 'summaryResult', title: 'Summary Result', type: 'string' }),
    defineField({ name: 'duration', title: 'Duration', type: 'string' }),
  ]
})
