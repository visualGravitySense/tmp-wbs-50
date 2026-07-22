'use client'

import { marketingMicroPillClass } from '@/components/ui'
import { cn } from '@/lib/utils'

interface ThesesPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const pageBtnBase =
  'inline-flex h-9 min-w-9 items-center justify-center rounded-xl px-2 text-[13px] font-semibold transition-all duration-150'

function pageBtnInactive() {
  return cn(
    marketingMicroPillClass,
    'text-[rgb(var(--text-secondary))] hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-300',
  )
}

function pageBtnActive() {
  return 'border border-blue-600 bg-blue-600 text-white shadow-[0_8px_24px_-8px_rgba(37,99,235,0.55)] dark:shadow-[0_8px_28px_-10px_rgba(29,97,255,0.45)]'
}

function pageBtnDisabled() {
  return cn(marketingMicroPillClass, 'pointer-events-none opacity-40')
}

export default function ThesesPagination({
  currentPage,
  totalPages,
  onPageChange,
}: ThesesPaginationProps) {
  if (totalPages <= 1) return null

  return (
    <nav
      className="flex flex-col items-center gap-4 border-t border-[var(--border)]/70 pt-10"
      aria-label="Lõputööde leheküljed"
    >
      <div className="flex items-center justify-center gap-1.5">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={cn(
            pageBtnBase,
            currentPage > 1 ? pageBtnInactive() : pageBtnDisabled(),
            'text-base font-normal',
          )}
          aria-label="Eelmine leht"
        >
          ←
        </button>

        {Array.from({ length: totalPages }).map((_, idx) => {
          const page = idx + 1
          const isActive = page === currentPage
          return (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              aria-current={isActive ? 'page' : undefined}
              className={cn(pageBtnBase, isActive ? pageBtnActive() : pageBtnInactive())}
            >
              {page}
            </button>
          )
        })}

        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className={cn(
            pageBtnBase,
            currentPage < totalPages ? pageBtnInactive() : pageBtnDisabled(),
            'text-base font-normal',
          )}
          aria-label="Järgmine leht"
        >
          →
        </button>
      </div>
    </nav>
  )
}
