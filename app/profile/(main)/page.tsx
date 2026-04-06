'use client'

import Link from 'next/link'
import Image from 'next/image'
import { consumerWatchHistory, consumerFavorites } from '../../../utils/consumerProfileData'
import {
  ArrowRightIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline'

export default function ConsumerProfileOverviewPage() {
  const previewHistory = consumerWatchHistory.slice(0, 3)
  const previewFavorites = consumerFavorites.slice(0, 3)

  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-gray-700 bg-gradient-to-br from-gray-800/80 to-gray-900 p-6 flex flex-col sm:flex-row sm:items-center gap-6">
        <div className="relative h-24 w-24 rounded-full overflow-hidden ring-2 ring-red-500/40 bg-gray-700 flex-shrink-0">
          <Image
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=60"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <p className="text-xs uppercase tracking-wide text-gray-500">Signed in as</p>
          <h2 className="text-xl font-semibold text-white mt-0.5">Alex Viewer</h2>
          <p className="text-sm text-gray-400 mt-1">alex.viewer@example.com · Member since 2024</p>
          <div className="flex flex-wrap gap-2 mt-4">
            <Link
              href="/settings"
              className="text-sm rounded-lg bg-gray-700 px-4 py-2 text-white hover:bg-gray-600 transition-colors"
            >
              Account settings
            </Link>
            <Link
              href="/wallet"
              className="text-sm rounded-lg border border-gray-600 px-4 py-2 text-gray-200 hover:bg-gray-800 transition-colors"
            >
              Open wallet
            </Link>
          </div>
        </div>
      </section>

      <section className="grid sm:grid-cols-2 gap-4">
        <QuickPanel
          title="Watching history"
          description="Pick up where you left off."
          href="/profile/history"
          items={previewHistory.map((v) => ({ id: v.id, title: v.title, sub: v.posted, thumb: v.thumbnail }))}
        />
        <QuickPanel
          title="Favorites"
          description="Videos you have saved."
          href="/profile/favorites"
          items={previewFavorites.map((v) => ({
            id: v.id,
            title: v.title,
            sub: v.views,
            thumb: v.thumbnail,
          }))}
        />
      </section>

      <section className="rounded-xl border border-gray-700 bg-gray-800/40 p-6">
        <div className="flex items-center gap-2 mb-3">
          <SparklesIcon className="h-6 w-6 text-amber-400" />
          <h3 className="text-lg font-semibold text-white">Become a creator</h3>
        </div>
        <p className="text-sm text-gray-400 mb-4">
          Walk through eligibility, channel setup, and payouts. When you are ready, open the full creator studio to manage posts, live, and monetization.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/profile/become-creator"
            className="inline-flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-600 transition-colors"
          >
            Start creator setup
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
          <Link
            href="/profile/creator"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-600 px-4 py-2.5 text-sm font-medium text-gray-200 hover:bg-gray-800 transition-colors"
          >
            Creator studio (full)
          </Link>
        </div>
      </section>
    </div>
  )
}

function QuickPanel({
  title,
  description,
  href,
  items,
}: {
  title: string
  description: string
  href: string
  items: { id: number; title: string; sub: string; thumb: string }[]
}) {
  return (
    <div className="rounded-xl border border-gray-700 bg-gray-800/30 p-4">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <h3 className="font-semibold text-white">{title}</h3>
          <p className="text-xs text-gray-500 mt-0.5">{description}</p>
        </div>
        <Link href={href} className="text-xs text-red-400 hover:text-red-300 flex items-center gap-0.5 whitespace-nowrap">
          See all
          <ArrowRightIcon className="h-3 w-3" />
        </Link>
      </div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={`/video/${item.id}`}
              className="flex items-center gap-3 rounded-lg p-2 -mx-2 hover:bg-gray-700/50 transition-colors"
            >
              <div className="relative h-12 w-20 flex-shrink-0 rounded overflow-hidden bg-gray-900">
                <Image src={item.thumb} alt="" fill className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-white line-clamp-1">{item.title}</p>
                <p className="text-xs text-gray-500">{item.sub}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
