'use client'

import { useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import type { DirectoryFilterState } from './filterProfiles'

const ADVANCED_FILTER_DEFAULTS: Pick<
  DirectoryFilterState,
  'keywords' | 'serviceType' | 'catersTo' | 'hourlyRate' | 'availability' | 'age' | 'ethnicity' | 'bodyType'
> = {
  keywords: 'any',
  serviceType: 'any',
  catersTo: 'any',
  hourlyRate: 'any',
  availability: 'any',
  age: '18+',
  ethnicity: 'any',
  bodyType: 'any',
}
import { directoryCta } from './siteTheme'

type FilterRowProps = {
  label: string
  value: string
  options: string[]
  onChange: (v: string) => void
}

function FilterRow({ label, value, options, onChange }: FilterRowProps) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-gray-200 py-3 last:border-0">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-sky-700/80">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="cursor-pointer rounded-lg border border-gray-200 bg-white px-2 py-1 text-sm font-medium text-gray-800 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o === 'any' ? 'ANY' : o}
          </option>
        ))}
      </select>
    </div>
  )
}

export default function DirectoryFiltersModal({
  open,
  onClose,
  filters,
  onFiltersChange,
  onApply,
}: {
  open: boolean
  onClose: () => void
  filters: DirectoryFilterState
  onFiltersChange: (next: DirectoryFilterState) => void
  onApply: (next: DirectoryFilterState) => void
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  const patch = (partial: Partial<DirectoryFilterState>) => {
    onFiltersChange({ ...filters, ...partial })
  }

  const handleApply = () => {
    onApply(filters)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center" role="dialog" aria-modal="true" aria-labelledby="more-filters-title">
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close filters"
      />
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h2 id="more-filters-title" className="text-lg font-bold text-gray-900">
            More filters
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            aria-label="Close"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[min(70vh,520px)] overflow-y-auto px-5 py-2">
          <FilterRow
            label="Keywords"
            value={filters.keywords}
            options={['any', 'live', 'verified', 'free', 'partner']}
            onChange={(keywords) => patch({ keywords })}
          />
          <FilterRow
            label="Service type"
            value={filters.serviceType}
            options={['any', 'live', 'creator', 'top creator', 'new', 'partner', 'pro', 'rising']}
            onChange={(serviceType) => patch({ serviceType })}
          />
          <FilterRow
            label="Caters to"
            value={filters.catersTo}
            options={['any', 'everyone', 'subscribers']}
            onChange={(catersTo) => patch({ catersTo })}
          />
          <FilterRow
            label="Hourly rate"
            value={filters.hourlyRate}
            options={['any', 'free', '$5', '$9', '$15', 'verified']}
            onChange={(hourlyRate) => patch({ hourlyRate })}
          />
          <FilterRow
            label="Availability"
            value={filters.availability}
            options={['any', 'available']}
            onChange={(availability) => patch({ availability })}
          />
          <FilterRow
            label="Age"
            value={filters.age}
            options={['18+']}
            onChange={(age) => patch({ age })}
          />
          <FilterRow
            label="Ethnicity"
            value={filters.ethnicity}
            options={['any']}
            onChange={(ethnicity) => patch({ ethnicity })}
          />
          <FilterRow
            label="Body type"
            value={filters.bodyType}
            options={['any']}
            onChange={(bodyType) => patch({ bodyType })}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 px-5 py-4">
          <button
            type="button"
            onClick={() => {
              onFiltersChange({ ...filters, ...ADVANCED_FILTER_DEFAULTS })
            }}
            className="text-sm font-semibold text-sky-700 hover:text-sky-900"
          >
            Reset filters
          </button>
          <button type="button" onClick={handleApply} className={directoryCta}>
            Apply filters
          </button>
        </div>
      </div>
    </div>
  )
}
