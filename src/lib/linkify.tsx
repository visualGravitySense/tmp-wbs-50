import React from 'react'

/**
 * Automatically detects http:// and https:// URLs in a string and renders them as clickable links.
 * Excludes trailing punctuation (like periods, commas, quotes) from the URL path to ensure correct linking.
 */
export function renderTextWithLinks(text: string): React.ReactNode {
  if (!text) return null
  const urlRegex = /(https?:\/\/[^\s,;!?:'"]+)/g
  const parts = text.split(urlRegex)
  return (
    <>
      {parts.map((part, i) => {
        if (part.match(urlRegex)) {
          return (
            <a
              key={i}
              href={part}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-blue-600 hover:underline dark:text-blue-400 font-semibold break-words"
            >
              {part}
            </a>
          )
        }
        return part
      })}
    </>
  )
}
