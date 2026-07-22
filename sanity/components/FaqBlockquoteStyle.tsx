import type { BlockStyleProps } from 'sanity'

/**
 * Studio-safe blockquote for portable text.
 * Sanity's built-in BlockQuote wraps editable content in <p>, but children
 * render as <div> — invalid HTML that triggers hydration errors in Next.js.
 */
export function FaqBlockquoteStyle(props: BlockStyleProps) {
  return (
    <blockquote
      style={{
        position: 'relative',
        margin: 0,
        paddingLeft: '0.75rem',
        borderLeft: '3px solid var(--card-border-color)',
      }}
    >
      {props.children}
    </blockquote>
  )
}