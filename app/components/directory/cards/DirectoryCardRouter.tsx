'use client'

import type { DirectoryCard } from '../types'
import ProfileDirectoryCard from './ProfileDirectoryCard'

export default function DirectoryCardRouter({ card }: { card: DirectoryCard }) {
  return <ProfileDirectoryCard card={card} />
}
