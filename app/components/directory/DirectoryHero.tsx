'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  MapPinIcon,
  XMarkIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline'
import type { DirectoryFilterState } from './filterProfiles'
import DirectoryFiltersModal from './DirectoryFiltersModal'

const HERO_BG =
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1600&auto=format&fit=crop&q=80'

const GENDER_OPTIONS: { id: DirectoryFilterState['gender']; label: string }[] = [
  { id: 'female', label: 'Female' },
  { id: 'male', label: 'Male' },
]

export default function DirectoryHero({
  filters,
  onFiltersChange,
  onSearch,
}: {
  filters: DirectoryFilterState
  onFiltersChange: (next: DirectoryFilterState) => void
  onSearch: (next?: DirectoryFilterState) => void
}) {
  const [locationInput, setLocationInput] = useState(filters.location)
  const [filtersModalOpen, setFiltersModalOpen] = useState(false)

  const applyLocation = useCallback(
    (location: string) => {
      const next = { ...filters, location: location.trim() }
      onFiltersChange(next)
      onSearch(next)
    },
    [filters, onFiltersChange, onSearch]
  )

  useEffect(() => {
    const t = setTimeout(() => {
      if (locationInput.trim() !== filters.location) {
        applyLocation(locationInput)
      }
    }, 400)
    return () => clearTimeout(t)
  }, [locationInput, filters.location, applyLocation])

  const patch = (partial: Partial<DirectoryFilterState>, applyNow = false) => {
    const next = { ...filters, ...partial }
    onFiltersChange(next)
    if (applyNow) onSearch(next)
  }

  const clearLocation = () => {
    setLocationInput('')
    applyLocation('')
  }

  return (
    <>
      <section
        className="relative mt-0 flex min-h-[calc(100vh-3.5rem-1.25rem)] flex-col overflow-hidden rounded-[28px] border border-gray-700 shadow-2xl shadow-black/40"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(17,24,39,0.88), rgba(17,24,39,0.95)), url(${HERO_BG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%',
        }}
      >
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-10 text-center md:px-10 md:py-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mx-auto max-w-3xl"
          >
            <h1 className="text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
              Explore <span className="text-red-500">SlutSpace</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-300 md:mt-8 md:text-xl">
              The creator platform built for intimacy, exclusivity, and control. Subscribe to uncensored
              feeds, unlock premium drops, and connect one-on-one — your rules, your rates, your audience.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.45 }}
            className="mt-12 flex w-full max-w-2xl flex-col items-center gap-5 md:mt-14"
          >
            <div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
              <div className="flex w-full max-w-md items-center overflow-hidden rounded-full border border-gray-600/80 bg-gray-900/70 shadow-lg backdrop-blur-md sm:w-auto sm:min-w-[280px] sm:flex-1">
                <div className="flex min-w-0 flex-1 items-center gap-2 px-4 py-3">
                  <MapPinIcon className="h-5 w-5 shrink-0 text-gray-400" />
                  <input
                    type="text"
                    value={locationInput}
                    onChange={(e) => setLocationInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        applyLocation(locationInput)
                      }
                    }}
                    placeholder="Anywhere"
                    className="min-w-0 flex-1 bg-transparent text-center text-sm text-white placeholder:text-gray-500 focus:outline-none sm:text-left"
                    aria-label="Search by city or state"
                  />
                  {locationInput && (
                    <button
                      type="button"
                      onClick={clearLocation}
                      className="rounded-full p-1 text-gray-400 hover:bg-gray-700/50 hover:text-white"
                      aria-label="Clear location"
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-center gap-2">
                {GENDER_OPTIONS.map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => patch({ gender: id }, true)}
                    className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${
                      filters.gender === id
                        ? 'border-red-500/50 bg-red-500/20 text-white shadow-sm'
                        : 'border-gray-600 bg-gray-900/50 text-gray-300 hover:border-gray-500 hover:text-white'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setFiltersModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-gray-300 transition-colors hover:text-white"
            >
              <AdjustmentsHorizontalIcon className="h-4 w-4" />
              More Filters
            </button>
          </motion.div>
        </div>
      </section>

      <DirectoryFiltersModal
        open={filtersModalOpen}
        onClose={() => setFiltersModalOpen(false)}
        filters={filters}
        onFiltersChange={onFiltersChange}
        onApply={onSearch}
      />
    </>
  )
}
