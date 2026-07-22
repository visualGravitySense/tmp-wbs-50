import Link from 'next/link'

interface KontaktLegalNoteProps {
  block: any
}

export default function KontaktLegalNote({ block }: KontaktLegalNoteProps) {
  return (
    <p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-relaxed text-[rgb(var(--text-secondary))]">
      {block.beforeLink}{' '}
      <Link
        href={block.linkHref}
        className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
      >
        {block.linkLabel}
      </Link>
      {block.afterLink}
    </p>
  )
}
