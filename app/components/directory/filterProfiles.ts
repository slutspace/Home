import type { DirectoryProfileCard } from './types'

export type DirectoryFilterState = {
  location: string
  radiusMi: string
  gender: 'any' | 'female' | 'male'
  keywords: string
  serviceType: string
  catersTo: string
  hourlyRate: string
  availability: string
  age: string
  ethnicity: string
  bodyType: string
}

export const DEFAULT_DIRECTORY_FILTERS: DirectoryFilterState = {
  location: '',
  radiusMi: '30',
  gender: 'female',
  keywords: 'any',
  serviceType: 'any',
  catersTo: 'any',
  hourlyRate: 'any',
  availability: 'any',
  age: '18+',
  ethnicity: 'any',
  bodyType: 'any',
}

function norm(s: string) {
  return s.toLowerCase().replace(/[.,]/g, ' ').replace(/\s+/g, ' ').trim()
}

function haystack(card: DirectoryProfileCard): string {
  return norm(
    [
      card.searchLocation,
      card.locationLine,
      card.travelLine ?? '',
      card.locationCity,
      card.locationState,
    ].join(' ')
  )
}

function matchesLocation(card: DirectoryProfileCard, query: string): boolean {
  const q = norm(query)
  if (!q || q === 'anywhere') return true
  const hay = haystack(card)
  const tokens = q.split(' ').filter(Boolean)
  return tokens.every((t) => hay.includes(t))
}

export function filterDirectoryProfiles(
  cards: DirectoryProfileCard[],
  filters: DirectoryFilterState
): DirectoryProfileCard[] {
  return cards.filter((card) => {
    if (!matchesLocation(card, filters.location)) return false

    if (filters.gender !== 'any' && card.gender !== filters.gender) return false

    if (filters.keywords !== 'any') {
      const textBlob = norm(
        [card.name, card.username, card.tagline, card.bioSnippet, card.category].join(' ')
      )
      if (!textBlob.includes(norm(filters.keywords))) return false
    }

    if (
      filters.serviceType !== 'any' &&
      !norm(card.category).includes(norm(filters.serviceType))
    ) {
      return false
    }

    if (filters.availability !== 'any') {
      if (!card.availability || !norm(card.availability).includes(norm(filters.availability))) {
        return false
      }
    }

    if (
      filters.hourlyRate !== 'any' &&
      !norm(card.price).includes(norm(filters.hourlyRate))
    ) {
      return false
    }

    return true
  })
}
