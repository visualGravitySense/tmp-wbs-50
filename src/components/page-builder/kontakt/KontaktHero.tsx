import { urlFor } from '@/lib/sanity/client'
import EyebrowPillBadge from '@/components/EyebrowPillBadge'

interface KontaktHeroProps {
  block: any
}

export default function KontaktHero({ block }: KontaktHeroProps) {
  return (
    <header className="site-hero site-hero--kontakt mb-12 grid items-center gap-8 pt-28 pb-16 md:pt-36 lg:grid-cols-2 lg:gap-12 sm:mb-14">
      <div className="flex flex-col items-center text-center md:items-start md:text-left">
        <EyebrowPillBadge flow text={block.eyebrow} />
        <h1 className="text-3xl font-extrabold tracking-tight leading-[1.1] text-[#122136] dark:text-white sm:text-4xl md:text-5xl lg:text-6xl">
          {(() => {
            const rawTitle = block.pageTitle || 'Võta ühendust, ja loome süsteemi';
            const trimmed = rawTitle.trim();
            const commaIndex = trimmed.indexOf(',');
            let main = trimmed;
            let accent = '';
            if (commaIndex >= 0) {
              main = trimmed.slice(0, commaIndex).trim();
              accent = trimmed.slice(commaIndex + 1).trim();
            }
            return (
              <>
                <span className="block">{main}</span>
                {accent ? (
                  <span className="block mt-2 font-serif font-normal italic text-[#0055E5] dark:text-sky-400 normal-case tracking-normal text-2xl sm:text-3xl lg:text-4xl">
                    {accent}
                  </span>
                ) : null}
              </>
            );
          })()}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[rgb(var(--text-secondary))] sm:text-base">
          {block.intro}
        </p>
      </div>

      {/* Image Placeholder */}
      <div className="relative h-64 sm:h-80 lg:h-full w-full min-h-[300px] rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 flex flex-col items-center justify-center">
        {block.image ? (
          <img
            src={urlFor(block.image).width(800).url()}
            alt={block.pageTitle || 'Kontakt'}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <>
            <div
              className="absolute inset-0 opacity-10 dark:opacity-5"
              style={{
                backgroundImage:
                  "url('data:image/svg+xml,%3Csvg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.4\" fill-rule=\"evenodd\"%3E%3Ccircle cx=\"3\" cy=\"3\" r=\"3\"/%3E%3Ccircle cx=\"13\" cy=\"13\" r=\"3\"/%3E%3C/g%3E%3C/svg%3E')",
              }}
            ></div>
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-xs">
                Placeholder Pilt
              </span>
            </div>
          </>
        )}
      </div>
    </header>
  )
}
