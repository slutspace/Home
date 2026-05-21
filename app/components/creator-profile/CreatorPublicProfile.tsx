'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  StarIcon,
  HeartIcon,
  BellIcon,
  ChatBubbleLeftIcon,
  UserPlusIcon,
  EllipsisHorizontalIcon,
  FlagIcon,
  ClockIcon,
  HomeIcon,
  PaperAirplaneIcon,
  InformationCircleIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'
import { StarIcon as StarSolid, CheckBadgeIcon } from '@heroicons/react/24/solid'
import { getCreatorPublicProfile } from '../../data/creator-public-profiles'

type TabId = 'profile' | 'videos' | 'photos' | 'feed'

function Stars({ count }: { count: number }) {
  return (
    <span className="inline-flex gap-0.5 text-amber-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarSolid key={i} className={`h-4 w-4 ${i < count ? 'opacity-100' : 'opacity-25'}`} />
      ))}
    </span>
  )
}

function SectionCard({
  title,
  action,
  children,
  className = '',
}: {
  title: string
  action?: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <section className={`rounded-xl border border-gray-200 bg-white shadow-sm ${className}`}>
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
        <h3 className="text-sm font-bold text-gray-900">{title}</h3>
        {action}
      </div>
      <div className="p-4">{children}</div>
    </section>
  )
}

export default function CreatorPublicProfile({ creatorId }: { creatorId?: string }) {
  const p = getCreatorPublicProfile(creatorId)
  const [tab, setTab] = useState<TabId>('profile')
  const [favourite, setFavourite] = useState(false)
  const [notifyLive, setNotifyLive] = useState(true)
  const goalPct = Math.round((p.goal.current / p.goal.target) * 1000) / 10

  const tabs: { id: TabId; label: string; count?: number }[] = [
    { id: 'profile', label: 'Profile' },
    { id: 'videos', label: 'Videos', count: 128 },
    { id: 'photos', label: 'Photos', count: p.photos.length + 37 },
    { id: 'feed', label: 'Fan Club & Feed' },
  ]

  return (
    <div className="min-h-screen bg-[#f0f2f5] text-gray-900">
      {/* Banner — blurred edge (tryst-style) */}
      <div className="relative h-48 overflow-hidden md:h-56 lg:h-64">
        <div
          className="absolute inset-0 scale-110 bg-cover bg-center blur-2xl opacity-60"
          style={{ backgroundImage: `url(${p.bannerUrl})` }}
        />
        <div
          className="absolute inset-0 mx-auto max-w-6xl bg-cover bg-center"
          style={{ backgroundImage: `url(${p.bannerUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <span className="absolute bottom-3 right-4 rounded bg-black/40 px-2 py-0.5 text-[10px] font-bold text-white">
          SlutSpace
        </span>
      </div>

      <div className="mx-auto max-w-6xl px-4">
        {/* Jump nav */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 py-3 text-sm">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-semibold text-gray-500">Jump to</span>
            {['Photos', 'Availability', 'Rates', 'Contact'].map((j) => (
              <a key={j} href={`#${j.toLowerCase()}`} className="font-semibold text-red-600 hover:text-red-700">
                {j}
              </a>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setFavourite(!favourite)}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
              favourite ? 'border-red-500 bg-red-50 text-red-600' : 'border-gray-300 bg-white text-gray-700 hover:border-red-300'
            }`}
          >
            <StarIcon className={`h-4 w-4 ${favourite ? 'fill-red-500 text-red-500' : ''}`} />
            Favourite
          </button>
        </div>

        {/* Header — avatar + name + actions */}
        <div className="relative -mt-16 flex flex-col gap-6 pb-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col items-center gap-4 md:flex-row md:items-end">
            <div className="relative shrink-0">
              <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-white shadow-lg ring-2 ring-red-500/30 md:h-32 md:w-32">
                <img src={p.avatarUrl} alt="" className="h-full w-full object-cover" />
              </div>
              {p.isLive && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 rounded bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                  Live
                </span>
              )}
            </div>
            <div className="text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
                <h1 className="text-2xl font-bold md:text-3xl">{p.displayName}</h1>
                {p.isVerified && <CheckBadgeIcon className="h-6 w-6 text-sky-500" />}
                <span className="text-sm text-gray-500">♀ · 💎 {p.level}</span>
              </div>
              <div className="mt-1 h-1 w-full max-w-xs rounded-full bg-red-600 md:max-w-sm" />
              <p className="mt-2 text-sm font-bold uppercase tracking-wide text-red-600">{p.tagline}</p>
              <p className="mt-1 inline-flex items-center gap-1 text-sm text-gray-600">
                {p.pronouns}
                <InformationCircleIcon className="h-4 w-4 text-gray-400" />
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow hover:bg-emerald-700"
            >
              Join Fan Club
            </button>
            <button type="button" className="rounded-lg border border-gray-300 bg-white p-2.5 hover:bg-gray-50">
              <HeartIcon className="h-5 w-5" />
            </button>
            <button type="button" className="rounded-lg border border-gray-300 bg-white p-2.5 hover:bg-gray-50">
              <BellIcon className="h-5 w-5" />
            </button>
            <button type="button" className="rounded-lg border border-gray-300 bg-white p-2.5 hover:bg-gray-50">
              <UserPlusIcon className="h-5 w-5" />
            </button>
            <button type="button" className="rounded-lg border border-gray-300 bg-white p-2.5 hover:bg-gray-50">
              <ChatBubbleLeftIcon className="h-5 w-5" />
            </button>
            <button type="button" className="rounded-lg border border-gray-300 bg-white p-2.5 hover:bg-gray-50">
              <EllipsisHorizontalIcon className="h-5 w-5" />
            </button>
            <button type="button" className="rounded-lg border border-gray-300 bg-white p-2.5 text-gray-500 hover:bg-gray-50">
              <FlagIcon className="h-5 w-5" />
            </button>
            <Link
              href="/profile/creator/studio"
              className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50"
            >
              Studio
            </Link>
          </div>
        </div>

        {/* Meta pills */}
        <div className="mb-6 flex flex-wrap justify-center gap-2 md:justify-end">
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm">
            <ClockIcon className="h-4 w-4 text-gray-500" />
            {p.lastActive}
          </span>
          {p.locations.map((loc) => (
            <span
              key={loc.city}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm"
            >
              {loc.icon === 'plane' ? (
                <PaperAirplaneIcon className="h-4 w-4 text-gray-500" />
              ) : (
                <HomeIcon className="h-4 w-4 text-gray-500" />
              )}
              {loc.city}
            </span>
          ))}
        </div>

        {/* Tabs */}
        <nav className="mb-6 flex gap-6 border-b border-gray-200 text-sm font-semibold">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`border-b-2 pb-3 transition-colors ${
                tab === t.id
                  ? 'border-emerald-600 text-emerald-700'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              {t.label}
              {t.count != null && <span className="ml-1 text-gray-400">{t.count}</span>}
            </button>
          ))}
        </nav>

        <div className="grid gap-6 pb-16 lg:grid-cols-12">
          {/* Left column */}
          <div className="space-y-6 lg:col-span-5">
            {/* Private shows */}
            <SectionCard title="My Private Shows">
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <Stars count={5} />
                <span className="font-bold text-gray-900">
                  {p.rating} · {p.ratingCount} ratings
                </span>
                <span className="text-gray-500">
                  from {p.privateFrom} {p.privateUnit}
                </span>
              </div>
              <p className="mt-3 inline-flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-900">
                <span className="text-lg">◆</span>
                {p.bestForLabel} — top-rated private experience
              </p>
              <p className="mt-4 text-xs font-bold uppercase tracking-wide text-gray-500">I do in private shows</p>
              <p className="mt-2 text-sm leading-relaxed text-gray-700">{p.privateTags.join(', ')}</p>
              <button
                type="button"
                className="mt-4 w-full rounded-lg bg-orange-500 py-3 text-sm font-bold text-white hover:bg-orange-600"
              >
                Start Private {p.privateFrom} {p.privateUnit}
              </button>
            </SectionCard>

            <SectionCard
              title={`Users' Reviews (${p.reviews.length})`}
              action={
                <button type="button" className="text-xs font-semibold text-sky-700">
                  See more
                </button>
              }
            >
              <ul className="space-y-4">
                {p.reviews.map((r) => (
                  <li key={r.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <Stars count={r.stars} />
                    <p className="mt-2 text-sm text-gray-800">{r.text}</p>
                    <p className="mt-1 text-xs text-gray-500">
                      {r.date}
                      {r.badge && <span className="ml-2 font-semibold text-gray-600">· {r.badge}</span>}
                    </p>
                  </li>
                ))}
              </ul>
            </SectionCard>

            <SectionCard title="Epic Goal">
              <p className="text-sm font-bold text-violet-700">{p.goal.title}</p>
              <div className="mt-3 h-3 overflow-hidden rounded-full bg-violet-100">
                <div
                  className="h-full rounded-full bg-violet-600 transition-all"
                  style={{ width: `${goalPct}%` }}
                />
              </div>
              <div className="mt-2 flex justify-between text-xs font-semibold text-gray-600">
                <span>
                  {p.goal.current.toLocaleString()} tk / {p.goal.target.toLocaleString()} tk
                </span>
                <span>{goalPct}%</span>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-gray-500">{p.goal.contributors} contributors</span>
                <button type="button" className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white">
                  Contribute
                </button>
              </div>
            </SectionCard>

            <div id="photos">
              <SectionCard title="Photos">
                <div className="grid grid-cols-2 gap-2">
                  {p.photos.map((src, i) => (
                    <div key={i} className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100">
                      <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6 lg:col-span-7">
            {(tab === 'profile' || tab === 'videos') && (
              <>
                <div className="grid gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">About {p.displayName}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-700">{p.bio}</p>
                  </div>
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    {p.attributes.map((a) => (
                      <div key={a.label}>
                        <dt className="font-semibold text-gray-900">{a.label}</dt>
                        <dd className="text-gray-600">{a.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <SectionCard
                  title={`Videos ${128}`}
                  action={
                    <Link href="/library" className="flex items-center gap-1 text-xs font-semibold text-emerald-700">
                      See all <ChevronRightIcon className="h-3 w-3" />
                    </Link>
                  }
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    {p.videos.map((v) => (
                      <article key={v.id} className="group">
                        <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-200">
                          <img
                            src={v.thumb}
                            alt=""
                            className={`h-full w-full object-cover ${v.locked ? 'scale-105 blur-md' : ''}`}
                          />
                          {v.locked && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/40 p-3 text-center">
                              <button
                                type="button"
                                className="rounded bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white"
                              >
                                Join Fan Club
                              </button>
                              <span className="text-xs font-semibold text-white">or {v.unlockPrice}</span>
                            </div>
                          )}
                          <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-xs text-white">
                            {v.duration}
                          </span>
                        </div>
                        <p className="mt-2 line-clamp-2 text-sm font-medium text-gray-900">{v.title}</p>
                        <p className="text-xs text-gray-500">♥ {v.likes}</p>
                      </article>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="mt-4 w-full rounded-lg bg-emerald-600 py-3 text-sm font-bold text-white hover:bg-emerald-700"
                  >
                    See All 128 Videos
                  </button>
                </SectionCard>
              </>
            )}

            <SectionCard
              title={`Albums ${p.albums.length}`}
              action={
                <button type="button" className="text-xs font-semibold text-gray-600">
                  See all
                </button>
              }
            >
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {p.albums.map((a) => (
                  <div key={a.id} className="text-center">
                    <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                      <img src={a.cover} alt="" className="h-full w-full object-cover" />
                      {a.count > 0 && (
                        <span className="absolute bottom-1 right-1 rounded bg-black/60 px-1.5 text-[10px] text-white">
                          {a.count}
                        </span>
                      )}
                      {a.special && (
                        <span className="absolute inset-0 flex items-center justify-center bg-black/50 p-2 text-center text-[10px] font-bold text-white">
                          {a.special}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm font-semibold">{a.title}</p>
                    <p className="text-xs text-gray-500">♥ {a.likes}</p>
                  </div>
                ))}
              </div>
            </SectionCard>

            <div id="availability">
              <SectionCard
                title="Broadcast Schedule"
                action={
                  <label className="flex items-center gap-2 text-xs font-medium text-gray-600">
                    Notify when live
                    <input
                      type="checkbox"
                      checked={notifyLive}
                      onChange={(e) => setNotifyLive(e.target.checked)}
                      className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                  </label>
                }
              >
                <ul className="divide-y divide-gray-100">
                  {p.schedule.map((row) => (
                    <li
                      key={row.day}
                      className={`flex justify-between py-2.5 text-sm ${
                        row.isToday ? 'font-bold text-emerald-700' : 'text-gray-700'
                      } ${row.isOff ? 'text-gray-400' : ''}`}
                    >
                      <span>{row.day}</span>
                      <span>{row.time}</span>
                    </li>
                  ))}
                </ul>
              </SectionCard>
            </div>

            <SectionCard title={`Knights (${p.knights.length})`}>
              <div className="flex flex-wrap gap-4">
                {p.knights.map((k) => (
                  <div key={k.id} className="flex w-20 flex-col items-center text-center">
                    <div className="relative">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-800 text-lg font-bold text-white">
                        {k.name[0]}
                      </div>
                      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                        {k.score}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-[10px] font-medium text-gray-700">
                      {k.flag} {k.name}
                    </p>
                  </div>
                ))}
                <button type="button" className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-dashed border-gray-300 text-gray-400">
                  ···
                </button>
              </div>
            </SectionCard>

            <div id="rates">
            <SectionCard title="Tip Menu">
              <ul className="divide-y divide-gray-100">
                {p.tips.map((t) => (
                  <li key={t.label} className="flex items-center justify-between py-2.5 text-sm">
                    <span className="font-medium text-gray-800">{t.label}</span>
                    <span className="font-bold text-gray-900">{t.price} tk</span>
                  </li>
                ))}
              </ul>
            </SectionCard>
            </div>

            <div id="contact" className="rounded-xl border border-gray-200 bg-white p-4 text-center text-sm text-gray-600 shadow-sm">
              <p className="font-semibold text-gray-900">Contact & booking</p>
              <p className="mt-2">Message @{p.username} for collabs, customs, and private calendar requests.</p>
              <button
                type="button"
                className="mt-4 rounded-lg bg-red-500 px-6 py-2.5 text-sm font-bold text-white hover:bg-red-600"
              >
                Send message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
