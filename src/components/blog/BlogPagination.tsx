import { marketingMicroPillClass } from '@/components/ui'
import { cn } from '@/lib/utils'

interface BlogPaginationProps {
  currentPage: number
  totalPages: number
  makePageHref: (page: number) => string
}

const pageBtnBase =
  'inline-flex h-9 min-w-9 items-center justify-center px-2 text-[13px] font-semibold transition-all duration-150'

function pageBtnInactive() {
  return cn(
    marketingMicroPillClass,
    'text-[rgb(var(--text-secondary))] hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-300',
  )
}

function pageBtnActive() {
  return 'border-blue-600 bg-blue-600 text-white shadow-[0_2px_10px_rgba(0,113,227,0.28)]'
}

function pageBtnDisabled() {
  return cn(marketingMicroPillClass, 'pointer-events-none opacity-40')
}

export default function BlogPagination({
  currentPage,
  totalPages,
  makePageHref,
}: BlogPaginationProps) {
  if (totalPages <= 1) return null

  return (
    <nav
      className="flex items-center justify-center gap-1.5 border-t border-black/[0.06] pb-8 pt-10 dark:border-white/10"
      aria-label="Blogi leheküljed"
    >
      {currentPage > 1 ? (
        <a
          href={makePageHref(currentPage - 1)}
          rel="nofollow"
          className={`${pageBtnBase} ${pageBtnInactive()} text-base font-normal`}
          aria-label="Eelmine leht"
        >
          ←
        </a>
      ) : (
        <span
          className={`${pageBtnBase} ${pageBtnDisabled()} text-base font-normal`}
          aria-hidden
        >
          ←
        </span>
      )}

      {Array.from({ length: totalPages }).map((_, idx) => {
        const page = idx + 1
        const isActive = page === currentPage
        return (
          <a
            key={page}
            href={makePageHref(page)}
            rel="nofollow"
            aria-current={isActive ? 'page' : undefined}
            className={`${pageBtnBase} ${isActive ? pageBtnActive() : pageBtnInactive()}`}
          >
            {page}
          </a>
        )
      })}

      {currentPage < totalPages ? (
        <a
          href={makePageHref(currentPage + 1)}
          rel="nofollow"
          className={`${pageBtnBase} ${pageBtnInactive()} text-base font-normal`}
          aria-label="Järgmine leht"
        >
          →
        </a>
      ) : (
        <span
          className={`${pageBtnBase} ${pageBtnDisabled()} text-base font-normal`}
          aria-hidden
        >
          →
        </span>
      )}
    </nav>
  )
}
