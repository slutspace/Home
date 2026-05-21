'use client'

import { motion, AnimatePresence } from 'framer-motion'
import type { DirectoryProfileCard } from './types'
import ProfileDirectoryCard from './cards/ProfileDirectoryCard'

export default function DirectoryCreatorGrid({
  cards,
  pageKey,
}: {
  cards: DirectoryProfileCard[]
  pageKey?: string | number
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey ?? 'grid'}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3 }}
      >
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.03 }}
            className="min-w-0"
          >
            <ProfileDirectoryCard card={card} />
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  )
}
