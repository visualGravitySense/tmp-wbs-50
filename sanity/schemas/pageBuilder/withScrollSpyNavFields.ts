import type { FieldDefinition } from 'sanity'

import { scrollSpyNavFields } from './scrollSpyNavFields'

type BlockSchema = {
  name: string
  fields?: FieldDefinition[]
}

export function withScrollSpyNavFields<T extends BlockSchema>(schema: T): T {
  if (!Array.isArray(schema.fields)) return schema

  const hasNavFields = schema.fields.some(
    (field) => field.name === 'navLabel' || field.name === 'hideFromScrollNav',
  )
  if (hasNavFields) return schema

  return {
    ...schema,
    fields: [...schema.fields, ...scrollSpyNavFields],
  }
}
