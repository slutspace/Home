'use client'

import Link from 'next/link'
import Image from 'next/image'
import AppLayout from './components/AppLayout'
import AgeVerification from './components/AgeVerification'
import { allVideos } from '../utils/videoData'
import { consumerWatchHistory } from '../utils/consumerProfileData'
import {
  RectangleStackIcon,
  SparklesIcon,
  VideoCameraIcon,
  ClockIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline'

const continueWatching = allVideos.slice(0, 5)

export default function HomePage() {
  return (
    <AppLayout>
      <AgeVerification />
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
        <section className="relative overflow-hidden rounded-2xl border border-gray-700 bg-gradient-to-br from-gray-800 via-gray-900 to-black p-8 md:p-10">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-red-500/10 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl" />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-3">
              <p className="text-sm font-medium uppercase tracking-wider text-red-400">Home</p>
              <h1 className="text-3xl md:text-4xl font-bold text-white">Welcome back</h1>
              <p className="text-gray-400 max-w-xl">
                Jump back into what you were watching, open your library, or manage your account — all from one place.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/library"
                  className="inline-flex items-center gap-2 rounded-full bg-red-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-600 transition-colors"
                >
                  <RectangleStackIcon className="h-5 w-5" />
                  Open Library
                </Link>
                <Link
                  href="/for-you"
                  className="inline-flex items-center gap-2 rounded-full border border-gray-600 bg-gray-800/80 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700 transition-colors"
                >
                  <SparklesIcon className="h-5 w-5" />
                  For You feed
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 min-w-[240px] md:min-w-[280px]">
              <StatCard label="Watch history" value={`${consumerWatchHistory.length}+`} href="/profile/history" />
              <StatCard label="Favorites" value="Saved" href="/profile/favorites" />
              <StatCard label="Wallet" value="Tokens" href="/wallet" />
              <StatCard label="Profile" value="Account" href="/profile" />
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <ClockIcon className="h-6 w-6 text-gray-400" />
              Continue watching
            </h2>
            <Link href="/profile/history" className="text-sm text-red-400 hover:text-red-300 flex items-center gap-1">
              View history
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
            {continueWatching.map((video) => (
              <Link
                key={video.id}
                href={`/video/${video.id}`}
                className="flex-shrink-0 w-44 md:w-52 group"
              >
                <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-800 border border-gray-700 group-hover:border-red-500/50 transition-colors">
                  <Image src={video.thumbnail} alt="" fill className="object-cover" />
                  <span className="absolute bottom-2 right-2 text-xs bg-black/75 px-1.5 py-0.5 rounded text-white">
                    {video.duration}
                  </span>
                </div>
                <p className="mt-2 text-sm text-white line-clamp-2 group-hover:text-red-400 transition-colors">
                  {video.title}
                </p>
                <p className="text-xs text-gray-500">{video.posted}</p>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-4">Explore</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <ExploreCard href="/library" icon={RectangleStackIcon} title="Library" subtitle="Full catalog & sort" />
            <ExploreCard href="/for-you" icon={SparklesIcon} title="For You" subtitle="Personalized picks" />
            <ExploreCard href="/live" icon={VideoCameraIcon} title="Live" subtitle="Streams & chat" />
            <ExploreCard href="/profile/become-creator" icon={VideoCameraIcon} title="Go creator" subtitle="Start earning" accent />
            <ExploreCard href="/settings" icon={Cog6ToothIcon} title="Settings" subtitle="Account & privacy" />
          </div>
        </section>

        <section className="rounded-xl border border-gray-700 bg-gray-800/40 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-gray-700 p-3">
              <UserCircleIcon className="h-8 w-8 text-gray-300" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Your consumer profile</h3>
              <p className="text-sm text-gray-400 mt-1">
                History, favorites, wallet shortcuts, and account settings live in one layout.
              </p>
            </div>
          </div>
          <Link
            href="/profile"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-600 transition-colors whitespace-nowrap"
          >
            Open profile hub
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </AppLayout>
  )
}

function StatCard({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <Link
      href={href}
      className="rounded-xl border border-gray-700/80 bg-black/30 px-4 py-3 hover:border-red-500/40 hover:bg-black/40 transition-colors"
    >
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-lg font-semibold text-white mt-0.5">{value}</p>
    </Link>
  )
}

function ExploreCard({
  href,
  icon: Icon,
  title,
  subtitle,
  accent,
}: {
  href: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  subtitle: string
  accent?: boolean
}) {
  return (
    <Link
      href={href}
      className={`flex flex-col rounded-xl border p-4 transition-all hover:scale-[1.02] ${
        accent
          ? 'border-red-500/40 bg-red-500/5 hover:bg-red-500/10'
          : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
      }`}
    >
      <Icon className={`h-7 w-7 mb-3 ${accent ? 'text-red-400' : 'text-gray-400'}`} />
      <span className="font-medium text-white">{title}</span>
      <span className="text-xs text-gray-500 mt-1">{subtitle}</span>
    </Link>
  )
}
