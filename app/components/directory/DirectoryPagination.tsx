'use client'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

export default function DirectoryPagination({
  page,
  totalPages,
  rangeStart,
  rangeEnd,
  total,
  onPageChange,
  compact = false,
}: {
  page: number
  totalPages: number
  rangeStart: number
  rangeEnd: number
  total: number
  onPageChange: (page: number) => void
  compact?: boolean
}) {
  if (total === 0) return null

  return (
    <div
      className={`flex flex-col gap-4 sm:flex-row sm:items-center ${
        compact ? 'sm:justify-center' : 'sm:justify-between'
      }`}
    >
      {!compact && (
        <p className="text-sm text-gray-400">
          Showing <span className="font-semibold text-white">{rangeStart}–{rangeEnd}</span> of{' '}
          <span className="font-semibold text-white">{total}</span> creators
        </p>
      )}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => onPageChange(Math.max(1, page - 1))}
            disabled={page <= 1}
            className="inline-flex items-center gap-1 rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 disabled:pointer-events-none disabled:opacity-40"
            aria-label="Previous page"
          >
            <ChevronLeftIcon className="h-4 w-4" />
            {compact ? 'Previous' : 'Prev'}
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                className={`min-w-[2.25rem] rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                  p === page
                    ? 'bg-red-500 text-white'
                    : 'border border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                aria-label={`Page ${p}`}
                aria-current={p === page ? 'page' : undefined}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            disabled={page >= totalPages}
            className="inline-flex items-center gap-1 rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 disabled:pointer-events-none disabled:opacity-40"
            aria-label="Next page"
          >
            {compact ? 'Next' : 'Next'}
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  )
}
