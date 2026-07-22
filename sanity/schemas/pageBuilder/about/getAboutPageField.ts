import {
  aboutPageSectionFields,
  type AboutFieldDefinition,
} from '../../objects/aboutCoreFields'

/**
 * Reuse legacy inline About section shapes from `aboutCoreFields` so page-builder
 * blocks validate against production data already stored in `sections[]`.
 */
export function getAboutPageField(sectionName: string): AboutFieldDefinition {
  const field = aboutPageSectionFields[sectionName]

  if (!field) {
    return { name: sectionName, type: 'string', title: 'MISSING FIELD' }
  }

  const { hidden: _hidden, ...visibleField } = field as AboutFieldDefinition & {
    hidden?: unknown
  }
  return { ...visibleField }
}