import { FaqBlockquoteStyle } from '../../components/FaqBlockquoteStyle'

/** Quote style for legacy portable-text content (prevents Studio "unknown blockquote style" errors). */
export const legacyBlockquoteStyle = {
  title: 'Quote',
  value: 'blockquote',
  component: FaqBlockquoteStyle,
} as const

type PortableTextStyle = { title: string; value: string; component?: typeof FaqBlockquoteStyle }

/** Append blockquote when a field uses a restricted style list that omitted it. */
export function withLegacyBlockquote<T extends PortableTextStyle>(styles: T[]): T[] {
  if (styles.some((style) => style.value === 'blockquote')) {
    return styles
  }
  return [...styles, legacyBlockquoteStyle as T]
}