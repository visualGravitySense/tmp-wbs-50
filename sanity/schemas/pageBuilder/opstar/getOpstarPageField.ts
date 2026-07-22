import {
  opstarPageSectionFields,
  type OpstarFieldDefinition,
} from '../../objects/opstarCoreFields'

import { cloneSanityFieldDef } from './cloneSanityFieldDef'

/**
 * Isolated copy of legacy OPSTAR section shapes for page-builder blocks.
 * Clones field trees so Studio never shares references with `opstarProfit` legacy fields.
 */
export function getOpstarPageField(sectionName: string): OpstarFieldDefinition {
  const field = opstarPageSectionFields[sectionName]

  if (!field) {
    return { name: sectionName, type: 'string', title: 'MISSING FIELD' }
  }

  const { hidden: _hidden, ...visibleField } = field as OpstarFieldDefinition & {
    hidden?: unknown
  }

  return cloneSanityFieldDef(visibleField)
}