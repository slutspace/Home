'use client'

import { useMemo, useState, useCallback, useEffect } from 'react'
import directoryFeed from '../../data/directory-feed.json'
import type { DirectoryProfileCard } from './types'
import DirectoryHero from './DirectoryHero'
import DirectoryCreatorGrid from './DirectoryCreatorGrid'
import DirectoryPagination from './DirectoryPagination'
import SiteFooter from '../SiteFooter'
import {
  DEFAULT_DIRECTORY_FILTERS,
  filterDirectoryProfiles,
  type DirectoryFilterState,
} from './filterProfiles'

const cards = directoryFeed as DirectoryProfileCard[]
const PAGE_SIZE = 8

export default function DirectoryDiscoverHome() {
  const [filters, setFilters] = useState<DirectoryFilterState>(DEFAULT_DIRECTORY_FILTERS)
  const [appliedFilters, setAppliedFilters] = useState<DirectoryFilterState>(DEFAULT_DIRECTORY_FILTERS)
  const [page, setPage] = useState(1)

  const applySearch = useCallback((next?: DirectoryFilterState) => {
    const snapshot = next ?? filters
    setFilters(snapshot)
    setAppliedFilters(snapshot)
    setPage(1)
  }, [filters])

  const filteredCards = useMemo(
    () => filterDirectoryProfiles(cards, appliedFilters),
    [appliedFilters]
  )

  const totalPages = Math.max(1, Math.ceil(filteredCards.length / PAGE_SIZE))

  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [page, totalPages])

  const paginatedCards = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return filteredCards.slice(start, start + PAGE_SIZE)
  }, [filteredCards, page])

  const recentlyCards = useMemo(() => {
    return [...filteredCards].reverse().slice(0, PAGE_SIZE)
  }, [filteredCards])

  const goToPage = (next: number) => {
    setPage(next)
    if (typeof window !== 'undefined') {
      const grid = document.getElementById('creator-grid')
      if (grid) {
        grid.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        window.scrollTo({ top: window.innerHeight * 0.85, behavior: 'smooth' })
      }
    }
  }

  const rangeStart = filteredCards.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1
  const rangeEnd = Math.min(page * PAGE_SIZE, filteredCards.length)

  return (
    <div className="relative -mx-4 -mt-2 md:-mx-6 md:-mt-3">
      <div className="relative z-10 mx-auto max-w-[1600px] px-4 md:px-6">
        <DirectoryHero
          filters={filters}
          onFiltersChange={setFilters}
          onSearch={applySearch}
        />

        <section id="creator-grid" className="pb-8 pt-8 md:pt-10">
          {filteredCards.length === 0 ? (
            <p className="rounded-2xl border border-gray-700 bg-gray-800/50 px-6 py-12 text-center text-gray-400">
              No creators match that location. Try a city or state (e.g. Chicago, Miami, CA).
            </p>
          ) : (
            <>
              <div className="mb-6">
                <DirectoryPagination
                  page={page}
                  totalPages={totalPages}
                  rangeStart={rangeStart}
                  rangeEnd={rangeEnd}
                  total={filteredCards.length}
                  onPageChange={goToPage}
                />
              </div>

              <DirectoryCreatorGrid cards={paginatedCards} pageKey={page} />

              {totalPages > 1 && (
                <div className="mt-8">
                  <DirectoryPagination
                    page={page}
                    totalPages={totalPages}
                    rangeStart={rangeStart}
                    rangeEnd={rangeEnd}
                    total={filteredCards.length}
                    onPageChange={goToPage}
                    compact
                  />
                </div>
              )}
            </>
          )}
        </section>

        {filteredCards.length > 0 && (
          <section className="border-t border-gray-800 pb-8 pt-10">
            <h2 className="mb-6 text-2xl font-bold text-white">Active Recently</h2>
            <DirectoryCreatorGrid cards={recentlyCards} pageKey="recent" />
          </section>
        )}

        <SiteFooter />
      </div>
    </div>
  )
}
