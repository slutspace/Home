'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import AppLayout from '../components/AppLayout'
import {
  VideoCameraIcon,
  MapPinIcon,
  FunnelIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline'
import {
  liveStreamsCatalog,
  LIVE_CATEGORIES,
  LIVE_LOCATIONS,
  LIVE_INTERESTS,
  type LiveStreamCard,
} from '../../utils/liveStreamsData'

function titleCase(s: string) {
  return s
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export default function LiveBrowsePage() {
  const [category, setCategory] = useState<string>('all')
  const [location, setLocation] = useState<string>('anywhere')
  const [interest, setInterest] = useState<string>('all')

  const filtered = useMemo(() => {
    return liveStreamsCatalog.filter((s) => {
      if (category !== 'all' && s.category !== category) return false
      if (location !== 'anywhere' && s.location !== location) return false
      if (interest !== 'all' && !s.interests.includes(interest)) return false
      return true
    })
  }, [category, location, interest])

  const featured = useMemo(() => {
    const list = filtered.length ? filtered : liveStreamsCatalog
    return [...list].sort((a, b) => b.viewers - a.viewers)[0]
  }, [filtered])

  return (
    <AppLayout>
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Hero — same mood as former For You landing, tuned for live */}
        <Link href={`/live/${featured.id}`} className="block group">
          <div className="relative h-[48vh] min-h-[380px] md:min-h-[440px]">
            <Image
              src={featured.thumbnail}
              alt=""
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-gray-900/30" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
              <div className="flex items-center gap-2 text-red-400 text-sm font-semibold uppercase tracking-wide">
                <span className="inline-flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                Live now
              </div>
              <h1 className="mt-2 text-3xl md:text-4xl font-bold text-white max-w-3xl">
                {featured.title}
              </h1>
              <p className="mt-2 text-gray-300 text-sm md:text-base">
                {featured.streamer} · {featured.viewers.toLocaleString()} watching · {featured.startedAt}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-red-500 px-5 py-2.5 text-sm font-semibold text-white w-fit group-hover:bg-red-600 transition-colors">
                <VideoCameraIcon className="h-5 w-5" />
                Join stream
              </span>
            </div>
          </div>
        </Link>

        <div className="container mx-auto px-4 py-8 md:py-10 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 border-b border-gray-800 pb-6">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <VideoCameraIcon className="h-8 w-8 text-red-400" />
                Browse live
              </h2>
              <p className="text-gray-400 text-sm mt-1 max-w-xl">
                Pick a stream or narrow the list by category, location, and what you are into.
              </p>
            </div>
            <Link
              href="/live/2"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-600 bg-gray-800/80 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-700 transition-colors shrink-0"
            >
              <SparklesIcon className="h-5 w-5 text-pink-400" />
              For You stream
            </Link>
          </div>

          {/* Filters */}
          <div className="space-y-5 rounded-xl border border-gray-800 bg-gray-800/40 p-4 md:p-5">
            <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
              <FunnelIcon className="h-5 w-5" />
              Filters
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Category</p>
              <div className="flex flex-wrap gap-2">
                {LIVE_CATEGORIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(c)}
                    className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                      category === c
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-900 text-gray-300 border border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    {c === 'all' ? 'All' : titleCase(c)}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-gray-500 mb-2">
                  <MapPinIcon className="h-4 w-4" />
                  Location
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-lg border border-gray-700 bg-gray-900 text-white text-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                >
                  {LIVE_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc === 'anywhere' ? 'Anywhere' : titleCase(loc)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-gray-500 mb-2">
                  <SparklesIcon className="h-4 w-4" />
                  Interest
                </label>
                <select
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full rounded-lg border border-gray-700 bg-gray-900 text-white text-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                >
                  {LIVE_INTERESTS.map((int) => (
                    <option key={int} value={int}>
                      {int === 'all' ? 'All interests' : titleCase(int)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <p className="text-xs text-gray-500">
              Showing {filtered.length} stream{filtered.length !== 1 ? 's' : ''}
              {filtered.length === 0 && ' — try loosening filters'}
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {(filtered.length ? filtered : liveStreamsCatalog).map((stream) => (
              <StreamCard key={stream.id} stream={stream} />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

function StreamCard({ stream }: { stream: LiveStreamCard }) {
  return (
    <Link
      href={`/live/${stream.id}`}
      className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-gray-800 border border-gray-800 hover:border-red-500/40 transition-all"
    >
      <Image
        src={stream.thumbnail}
        alt=""
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent" />
      <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
        LIVE
      </div>
      <div className="absolute top-3 right-3 rounded-md bg-black/60 px-2 py-0.5 text-xs text-gray-200">
        {stream.viewers.toLocaleString()}
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 space-y-2">
        <div className="flex items-center gap-2">
          <div className="relative h-9 w-9 rounded-full overflow-hidden ring-2 ring-red-500/50">
            <Image src={stream.streamerImage} alt="" fill className="object-cover" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">{stream.streamer}</p>
            <p className="text-xs text-gray-400 truncate">
              {titleCase(stream.category)} · {titleCase(stream.location)}
            </p>
          </div>
        </div>
        <h3 className="text-base font-semibold text-white line-clamp-2 group-hover:text-red-300 transition-colors">
          {stream.title}
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {stream.interests.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full bg-gray-900/90 border border-gray-700 text-[11px] text-gray-300"
            >
              {titleCase(tag)}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
