'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  PaperAirplaneIcon,
  HomeIcon,
  ClockIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'
import type { DirectoryProfileCard } from '../types'

const MotionLink = motion(Link)

const PORTRAIT_FALLBACK =
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop&auto=format&q=80'

function MetaRow({ icon: Icon, children }: { icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 text-sm text-gray-700">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" />
      <span className="leading-snug">{children}</span>
    </div>
  )
}

function InfoPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-gray-900 px-2 py-0.5 text-xs font-semibold text-white">
      {children}
    </span>
  )
}

export default function ProfileDirectoryCard({ card }: { card: DirectoryProfileCard }) {
  const [imgSrc, setImgSrc] = useState(card.portraitUrl || PORTRAIT_FALLBACK)

  useEffect(() => {
    setImgSrc(card.portraitUrl || PORTRAIT_FALLBACK)
  }, [card.portraitUrl])

  return (
    <MotionLink
      href={card.href}
      className="group flex h-full w-full flex-col overflow-hidden rounded-[28px] bg-white shadow-lg shadow-black/20 ring-1 ring-gray-200/80 transition-all duration-300 hover:shadow-xl hover:ring-red-500/30"
      whileHover={{ scale: 1.01, y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
    >
      <div className="relative aspect-square w-full shrink-0 overflow-hidden bg-gray-200">
        <img
          src={imgSrc}
          alt={card.name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setImgSrc(PORTRAIT_FALLBACK)}
        />
        {card.verified && (
          <span className="absolute left-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-md bg-gray-900 shadow-md">
            <StarIcon className="h-4 w-4 text-white" />
          </span>
        )}
        <span className="absolute bottom-2 right-2 z-10 rounded bg-white/90 px-1.5 py-0.5 text-[10px] font-bold text-red-500 shadow-sm">
          SlutSpace
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-4">
        <div className="flex flex-wrap items-center gap-1.5">
          <InfoPill>{card.category}</InfoPill>
          <InfoPill>
            <PhotoIcon className="h-3.5 w-3.5" />
            {card.photoCount}
          </InfoPill>
          <InfoPill>{card.price}</InfoPill>
          {card.availability && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              {card.availability}
            </span>
          )}
        </div>

        <h3 className="mt-2 truncate text-xl font-bold tracking-tight text-gray-900">{card.name}</h3>
        <p className="truncate text-sm font-medium italic text-gray-600">@{card.username}</p>
        <p className="mt-0.5 line-clamp-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
          {card.tagline}
        </p>

        <div className="mt-2 space-y-1">
          {card.travelLine && <MetaRow icon={PaperAirplaneIcon}>{card.travelLine}</MetaRow>}
          <MetaRow icon={HomeIcon}>{card.locationLine}</MetaRow>
          <MetaRow icon={ClockIcon}>{card.scheduleLine}</MetaRow>
        </div>

        <p className="mt-auto line-clamp-2 pt-2 text-sm leading-snug text-gray-600">
          {card.bioSnippet}
          {!card.bioSnippet.endsWith('...') && '...'}
        </p>
      </div>
    </MotionLink>
  )
}
