import koolitusPage from '../../koolitusPage'

import { cloneSanityFieldDef } from '../opstar/cloneSanityFieldDef'

type FieldDefinition = {
  name: string
  type: string
  title?: string
  [key: string]: unknown
}

/**
 * Isolated copy of legacy koolitus section shapes for page-builder blocks.
 * Clones field trees so Studio never shares references with `koolitusPage` legacy fields.
 */
export function getKoolitusPageField(sectionName: string): FieldDefinition {
  const fields = koolitusPage.fields as FieldDefinition[]
  const field = fields.find((f) => f.name === sectionName)

  if (!field) {
    return { name: sectionName, type: 'string', title: 'MISSING FIELD' }
  }

  const { hidden: _hidden, ...visibleField } = field

  return cloneSanityFieldDef(visibleField)
}