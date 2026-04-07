'use client'

import { useState, useRef, useEffect, useCallback, useMemo, type ChangeEvent } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import AppLayout from './components/AppLayout'
import AgeVerification from './components/AgeVerification'
import { allVideos } from '../utils/videoData'
import {
  RectangleStackIcon,
  SparklesIcon,
  VideoCameraIcon,
  ClockIcon,
  UserCircleIcon,
  ArrowRightIcon,
  PencilSquareIcon,
  EnvelopeIcon,
  UserGroupIcon,
  EyeIcon,
  ChatBubbleBottomCenterTextIcon,
  ArrowUpTrayIcon,
} from '@heroicons/react/24/outline'

const continueWatching = allVideos
  .filter((v) => !v.title.startsWith('Mature Woman with Young Man on Couch'))
  .slice(0, 5)

const profileNavLinks = [
  { label: 'My Profile', href: '/profile' },
  { label: 'Videos', href: '/library' },
  { label: 'Short videos', href: '/library' },
  { label: 'Galleries', href: '/profile/creator' },
  { label: 'Posts', href: '/community' },
  { label: 'Friends', href: '/community' },
  { label: 'Favorites', href: '/profile/favorites' },
] as const

const DASH_KEY = 'slutspace_dashboard_v1'
const LAST_VISIT_KEY = 'slutspace_dash_last_visit'
const SESSION_VIEW_KEY = 'slutspace_dash_viewed_session'

type DashPersist = {
  emailVerified: boolean
  uploadedVideo: boolean
  uploadedPhoto: boolean
  profileViews: number
}

const defaultDash: DashPersist = {
  emailVerified: false,
  uploadedVideo: false,
  uploadedPhoto: false,
  profileViews: 1,
}

function loadDash(): DashPersist {
  if (typeof window === 'undefined') return defaultDash
  try {
    const raw = localStorage.getItem(DASH_KEY)
    if (!raw) return defaultDash
    const o = JSON.parse(raw) as Record<string, unknown>
    const views = o.profileViews
    return {
      ...defaultDash,
      emailVerified: Boolean(o.emailVerified),
      uploadedVideo: Boolean(o.uploadedVideo),
      uploadedPhoto: Boolean(o.uploadedPhoto),
      profileViews:
        typeof views === 'number' && Number.isFinite(views) && views >= 1
          ? Math.floor(views)
          : defaultDash.profileViews,
    }
  } catch {
    return defaultDash
  }
}

function saveDash(p: DashPersist) {
  try {
    localStorage.setItem(DASH_KEY, JSON.stringify(p))
  } catch {
    /* ignore quota */
  }
}

function profilePercent(d: DashPersist): number {
  let t = 0
  if (d.emailVerified) t += 34
  if (d.uploadedVideo) t += 33
  if (d.uploadedPhoto) t += 33
  return Math.min(100, t)
}

export default function HomePage() {
  const [dash, setDash] = useState<DashPersist>(defaultDash)
  const [hydrated, setHydrated] = useState(false)
  const [lastSeenLabel, setLastSeenLabel] = useState('Last seen 5 days ago · 46 days on SlutSpace')
  const uploadInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const loaded = loadDash()
    setDash(loaded)

    const prevVisit = localStorage.getItem(LAST_VISIT_KEY)
    if (prevVisit) {
      const ms = Date.now() - parseInt(prevVisit, 10)
      const days = Math.floor(ms / 86400000)
      const part =
        days < 1
          ? 'Last seen today'
          : days === 1
            ? 'Last seen yesterday'
            : `Last seen ${days} days ago`
      setLastSeenLabel(`${part} · 46 days on SlutSpace`)
    }
    localStorage.setItem(LAST_VISIT_KEY, String(Date.now()))

    if (typeof sessionStorage !== 'undefined' && !sessionStorage.getItem(SESSION_VIEW_KEY)) {
      sessionStorage.setItem(SESSION_VIEW_KEY, '1')
      const next = { ...loaded, profileViews: loaded.profileViews + 1 }
      setDash(next)
      saveDash(next)
    }

    setHydrated(true)
  }, [])

  const updateDash = useCallback((patch: Partial<DashPersist>) => {
    setDash((prev) => {
      const next = { ...prev, ...patch }
      saveDash(next)
      return next
    })
  }, [])

  const pct = useMemo(() => profilePercent(dash), [dash])

  const verifyEmail = useCallback(() => {
    if (dash.emailVerified) return
    updateDash({ emailVerified: true })
  }, [dash.emailVerified, updateDash])

  const onUploadChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length) return
    setDash((prev) => {
      let video = prev.uploadedVideo
      let photo = prev.uploadedPhoto
      for (let i = 0; i < files.length; i++) {
        const f = files[i]
        if (f.type.startsWith('video/')) video = true
        if (f.type.startsWith('image/')) photo = true
      }
      const next = { ...prev, uploadedVideo: video, uploadedPhoto: photo }
      saveDash(next)
      return next
    })
    e.target.value = ''
  }, [])

  return (
    <AppLayout>
      <AgeVerification />
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Profile snapshot & completion — home dashboard */}
        <section className="rounded-2xl border border-gray-700 bg-gray-800/30 overflow-hidden">
          <input
            ref={uploadInputRef}
            type="file"
            className="hidden"
            accept="video/*,image/*"
            multiple
            aria-hidden
            onChange={onUploadChange}
          />
          <div className="p-6 md:p-8 space-y-6">
              {/* Always side-by-side with identity (scroll horizontally on very narrow screens) */}
              <div className="flex flex-row flex-nowrap items-stretch gap-4 min-w-0 overflow-x-auto overflow-y-visible scrollbar-site pb-1 -mx-1 px-1">
                <div className="flex flex-row items-start gap-4 min-w-0 flex-1">
                  <div
                    className="h-20 w-20 shrink-0 rounded-2xl bg-gradient-to-br from-red-500/30 to-gray-800 border border-gray-600 flex items-center justify-center text-2xl font-bold text-white"
                    aria-hidden
                  >
                    U
                  </div>
                  <div className="min-w-0 flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-bold text-white truncate">UpstartAxis38</h2>
                      <span className="text-xs font-medium uppercase tracking-wide px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        Newbie
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{lastSeenLabel}</p>
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href="/profile/creator"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-red-500/90 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-600 transition-colors"
                      >
                        <PencilSquareIcon className="h-4 w-4" />
                        Edit profile
                      </Link>
                      <button
                        type="button"
                        onClick={() => uploadInputRef.current?.click()}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-gray-600 px-3 py-1.5 text-sm text-gray-300 hover:bg-gray-700/60 transition-colors"
                      >
                        <ArrowUpTrayIcon className="h-4 w-4 text-red-400" />
                        Upload
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={verifyEmail}
                  disabled={dash.emailVerified}
                  className="shrink-0 w-[min(100%,17rem)] sm:w-64 self-stretch rounded-xl border border-amber-500/25 bg-amber-500/5 p-4 flex flex-col justify-center text-left transition-opacity disabled:opacity-90 cursor-pointer hover:bg-amber-500/10 disabled:hover:bg-amber-500/5 disabled:cursor-default"
                >
                  <div className="flex items-start gap-3">
                    <EnvelopeIcon className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-white">
                        {dash.emailVerified ? 'Email verified' : 'Verify your email'}
                      </p>
                      <p className="text-sm text-gray-400 mt-0.5 break-all">t*********r@m**l.com</p>
                    </div>
                    <span className="text-xs font-semibold text-amber-400 shrink-0">
                      {dash.emailVerified ? '✓' : '+5%'}
                    </span>
                  </div>
                </button>
              </div>

              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                  <span>Profile filled</span>
                  <span className="text-red-400 font-medium">{hydrated ? pct : 0}%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-900 overflow-hidden border border-gray-700">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-red-500 to-pink-500 transition-[width] duration-300 ease-out"
                    style={{ width: `${hydrated ? pct : 0}%` }}
                  />
                </div>
              </div>

              <nav className="flex flex-wrap gap-2">
                {profileNavLinks.map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-gray-300 bg-gray-900/80 border border-gray-700 hover:border-red-500/40 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </nav>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl bg-gray-900/60 border border-gray-700 py-3 px-2">
                  <EyeIcon className="h-4 w-4 text-gray-500 mx-auto mb-1" />
                  <p className="text-lg font-semibold text-white">{dash.profileViews}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wide">Profile views</p>
                </div>
                <div className="rounded-xl bg-gray-900/60 border border-gray-700 py-3 px-2">
                  <UserGroupIcon className="h-4 w-4 text-gray-500 mx-auto mb-1" />
                  <p className="text-lg font-semibold text-white">0</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wide">Subscribers</p>
                </div>
                <div className="rounded-xl bg-gray-900/60 border border-gray-700 py-3 px-2">
                  <ChatBubbleBottomCenterTextIcon className="h-4 w-4 text-gray-500 mx-auto mb-1" />
                  <p className="text-lg font-semibold text-white">0</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wide">Comments left</p>
                </div>
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
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-site">
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
            <ExploreCard href="/live/2" icon={SparklesIcon} title="For You" subtitle="Your live stream" />
            <ExploreCard href="/live" icon={VideoCameraIcon} title="Live" subtitle="Browse & filter streams" />
            <ExploreCard href="/profile/become-creator" icon={VideoCameraIcon} title="Go creator" subtitle="Start earning" accent />
            <button
              type="button"
              onClick={() => uploadInputRef.current?.click()}
              aria-label="Upload photos and videos"
              className="flex flex-col rounded-xl border p-4 transition-all hover:scale-[1.02] border-gray-700 bg-gray-800/50 hover:border-gray-600 text-left focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              <ArrowUpTrayIcon className="h-7 w-7 mb-3 text-gray-400" />
              <span className="font-medium text-white">Upload</span>
              <span className="text-xs text-gray-500 mt-1">Photos & videos</span>
            </button>
          </div>
        </section>

        <section className="rounded-xl border border-gray-700 bg-gray-800/40 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-gray-700 p-3">
              <UserCircleIcon className="h-8 w-8 text-gray-300" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Profile hub</h3>
              <p className="text-sm text-gray-400 mt-1">
                History, wallet, and creator tools — same account as above.
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
