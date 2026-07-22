import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { getSiteSettings } from '@/lib/sanity'
import { urlFor } from '@/lib/sanity/client'

export default async function NotFound() {
  const siteSettings = await getSiteSettings()
  const pageNotFound = siteSettings?.pageNotFound

  const imageUrl = pageNotFound?.image?.asset?._ref
    ? urlFor(pageNotFound.image).url()
    : null

  const text = pageNotFound?.text || 'Lehte ei leitud. Kontrolli aadressi või mine tagasi avalehele.'
  const buttonLabel = pageNotFound?.buttonLabel || 'Avalehele'

  return (
    <div className="flex min-h-[min(72vh,52rem)] w-full flex-col items-center justify-center px-4 py-16 sm:min-h-[65vh] sm:py-24">
      {imageUrl ? (
        <div className="relative w-full max-w-[min(100%,36rem)]">
          <div className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-[2rem] border border-[var(--border)]/80 bg-[rgb(var(--bg-secondary))]/50 shadow-[0_28px_80px_-40px_rgba(15,23,42,0.35)] backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_32px_90px_-36px_rgba(0,0,0,0.75)]">
            <Image
              src={imageUrl}
              alt=""
              fill
              className="object-cover object-center"
              sizes="(max-width: 640px) 100vw, 36rem"
              priority
            />
            {/* Blend into light page: soft milky overlay + vignette */}
            <div
              className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-b from-white/55 via-white/10 to-white/45 mix-blend-soft-light dark:from-[#0B0F1A]/35 dark:via-transparent dark:to-[#0B0F1A]/55 dark:mix-blend-multiply"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 rounded-[2rem] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35),inset_0_0_70px_rgba(255,255,255,0.25)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06),inset_0_0_90px_rgba(0,0,0,0.35)]"
              aria-hidden
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center">
          <span className="text-7xl font-black tracking-tighter text-blue-600 sm:text-9xl dark:text-blue-500">
            404
          </span>
          <h1 className="mt-2 text-2xl font-black tracking-tight text-[rgb(var(--text-primary))] sm:text-3xl">
            Page Not Found
          </h1>
        </div>
      )}

      <div className="mt-8 max-w-md text-center text-sm font-medium leading-relaxed text-[rgb(var(--text-secondary))] sm:text-base prose prose-sm dark:prose-invert">
        {Array.isArray(text) ? (
          <PortableText value={text} />
        ) : (
          <p>{text as string}</p>
        )}
      </div>
      <Link
        href="/"
        className="mt-6 inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-[rgb(var(--bg-primary))]/80 px-6 py-3 text-xs font-black uppercase tracking-[0.2em] text-[rgb(var(--text-primary))] shadow-sm backdrop-blur-md transition-all hover:border-blue-400/40 hover:bg-blue-500/10 hover:text-blue-700 dark:hover:border-blue-500/30 dark:hover:text-blue-400"
      >
        {buttonLabel}
      </Link>
    </div>
  )
}
