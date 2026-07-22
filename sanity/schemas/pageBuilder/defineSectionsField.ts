import type { FieldDefinition } from 'sanity'

type SectionsFieldOptions = {
  /** Subset of block types for this page. */
  allowedTypes: readonly string[]
  description?: string
}

function sortAllowedTypes(types: readonly string[]): string[] {
  const heroFirst = ['marketingSplitHeroBlock', 'homeHeroBlock']
  return [...types].sort((a, b) => {
    const ai = heroFirst.indexOf(a)
    const bi = heroFirst.indexOf(b)
    if (ai >= 0 && bi >= 0) return ai - bi
    if (ai >= 0) return -1
    if (bi >= 0) return 1
    return 0
  })
}

/**
 * Reusable `sections` array for any singleton marketing page document.
 */
export function definePageSectionsField(
  options: SectionsFieldOptions,
): FieldDefinition {
  const allowed = sortAllowedTypes(options.allowedTypes)
  const of = allowed.map((type) => ({ type }))

  return {
    name: 'sections',
    title: 'Page sections (builder)',
    description:
      options.description ??
      'Drag blocks to build the page. Shared blocks work on any page. Empty array = legacy fields below.',
    type: 'array',
    of,
  } as any
}