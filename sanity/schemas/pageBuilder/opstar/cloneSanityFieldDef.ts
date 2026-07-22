type FieldLike = Record<string, unknown>

/**
 * Deep-clone a Sanity field definition tree so page-builder blocks never share
 * object references with legacy document fields (avoids Studio form freeze loops).
 */
export function cloneSanityFieldDef<T extends FieldLike>(field: T): T {
  const cloned = { ...field }

  for (const [key, value] of Object.entries(field)) {
    if (typeof value === 'function') continue

    if (Array.isArray(value)) {
      cloned[key as keyof T] = value.map((item) =>
        typeof item === 'object' && item !== null
          ? cloneSanityFieldDef(item as FieldLike)
          : item,
      ) as T[keyof T]
      continue
    }

    if (typeof value === 'object' && value !== null) {
      cloned[key as keyof T] = cloneSanityFieldDef(value as FieldLike) as T[keyof T]
    }
  }

  return cloned
}