'use client'

import { useState, useRef, useEffect, useCallback, type ChangeEvent } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import AppLayout from './components/AppLayout'
import AgeVerification from './components/AgeVerification'
import { allVideos } from '../utils/videoData'
import {
  ClockIcon,
  ArrowRightIcon,
  CameraIcon,
  UserGroupIcon,
  EyeIcon,
  ChatBubbleBottomCenterTextIcon,
  VideoCameraIcon,
  PlusIcon,
  CurrencyDollarIcon,
  XMarkIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline'

const continueWatching = allVideos.slice(0, 5)

const profileNavLinks = [
  { label: 'Videos', href: '/library' },
  { label: 'Friends', href: '/community' },
  { label: 'Favorites', href: '/profile/favorites' },
] as const

const DASH_KEY = 'slutspace_dashboard_v1'
const LAST_VISIT_KEY = 'slutspace_dash_last_visit'
const SESSION_VIEW_KEY = 'slutspace_dash_viewed_session'

const DEFAULT_COINS = 150.75
const DEFAULT_USD = 2580.75
const COIN_TO_USD = DEFAULT_USD / DEFAULT_COINS

type WalletTx = {
  id: string
  type: 'add'
  label: string
  amount: number
  at: string
}

type DashPersist = {
  uploadedVideo: boolean
  uploadedPhoto: boolean
  profileViews: number
  walletCoins: number
  walletUsd: number
  walletTx: WalletTx[]
  profileAvatar: string | null
}

const defaultDash: DashPersist = {
  uploadedVideo: false,
  uploadedPhoto: false,
  profileViews: 1,
  walletCoins: DEFAULT_COINS,
  walletUsd: DEFAULT_USD,
  walletTx: [],
  profileAvatar: null,
}

function loadDash(): DashPersist {
  if (typeof window === 'undefined') return defaultDash
  try {
    const raw = localStorage.getItem(DASH_KEY)
    if (!raw) return defaultDash
    const o = JSON.parse(raw) as Record<string, unknown>
    const views = o.profileViews
    const coins = o.walletCoins
    const usd = o.walletUsd
    const tx = o.walletTx
    return {
      ...defaultDash,
      uploadedVideo: Boolean(o.uploadedVideo),
      uploadedPhoto: Boolean(o.uploadedPhoto),
      profileViews:
        typeof views === 'number' && Number.isFinite(views) && views >= 1
          ? Math.floor(views)
          : defaultDash.profileViews,
      walletCoins:
        typeof coins === 'number' && Number.isFinite(coins) && coins >= 0
          ? coins
          : defaultDash.walletCoins,
      walletUsd:
        typeof usd === 'number' && Number.isFinite(usd) && usd >= 0 ? usd : defaultDash.walletUsd,
      walletTx: Array.isArray(tx)
        ? (tx as WalletTx[])
            .filter(
              (r) =>
                r &&
                typeof r.id === 'string' &&
                typeof r.amount === 'number' &&
                typeof r.label === 'string' &&
                typeof r.at === 'string'
            )
            .slice(0, 20)
        : [],
      profileAvatar: typeof o.profileAvatar === 'string' && o.profileAvatar.length > 0 ? o.profileAvatar : null,
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

function formatCoins(n: number) {
  return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function formatUsd(n: number) {
  return n.toLocaleString(undefined, { style: 'currency', currency: 'USD' })
}

export default function HomePage() {
  const [dash, setDash] = useState<DashPersist>(defaultDash)
  const [hydrated, setHydrated] = useState(false)
  const [lastSeenLabel, setLastSeenLabel] = useState('Last seen 5 days ago · 46 days on SlutSpace')
  const [walletModalOpen, setWalletModalOpen] = useState(false)
  const [addCoinsInput, setAddCoinsInput] = useState('')
  const [historyPanelOpen, setHistoryPanelOpen] = useState(false)
  const uploadInputRef = useRef<HTMLInputElement>(null)
  const avatarInputRef = useRef<HTMLInputElement>(null)
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

  useEffect(() => {
    if (!walletModalOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setWalletModalOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [walletModalOpen])

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

  const onAvatarChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !file.type.startsWith('image/')) {
      e.target.value = ''
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = typeof reader.result === 'string' ? reader.result : null
      if (!dataUrl) return
      setDash((prev) => {
        const next = { ...prev, profileAvatar: dataUrl }
        saveDash(next)
        return next
      })
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }, [])

  const addCoins = useCallback(() => {
    const raw = parseFloat(addCoinsInput.replace(/,/g, ''))
    if (!Number.isFinite(raw) || raw <= 0) return
    setDash((prev) => {
      const coins = prev.walletCoins + raw
      const usd = coins * COIN_TO_USD
      const tx: WalletTx = {
        id: `${Date.now()}`,
        type: 'add',
        label: 'Added coins',
        amount: raw,
        at: new Date().toISOString(),
      }
      const next = {
        ...prev,
        walletCoins: coins,
        walletUsd: usd,
        walletTx: [tx, ...prev.walletTx].slice(0, 20),
      }
      saveDash(next)
      return next
    })
    setAddCoinsInput('')
  }, [addCoinsInput])

  return (
    <AppLayout>
      <AgeVerification />
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
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
          <input
            ref={avatarInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            aria-hidden
            onChange={onAvatarChange}
          />
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex flex-row flex-nowrap items-stretch gap-4 min-w-0 overflow-x-auto overflow-y-visible scrollbar-site pb-1 -mx-1 px-1">
              <div className="flex flex-row items-start gap-4 min-w-0 flex-1">
                <div className="relative h-20 w-20 shrink-0">
                  <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-red-500/30 to-gray-800 border border-gray-600 overflow-hidden flex items-center justify-center text-2xl font-bold text-white">
                    {dash.profileAvatar ? (
                      <Image
                        src={dash.profileAvatar}
                        alt=""
                        width={80}
                        height={80}
                        unoptimized
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span aria-hidden>U</span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => avatarInputRef.current?.click()}
                    className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border border-gray-600 bg-gray-900 text-gray-200 shadow-md hover:bg-gray-800 hover:border-red-500/40 transition-colors"
                    aria-label="Change profile picture"
                  >
                    <CameraIcon className="h-4 w-4" />
                  </button>
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
                    <button
                      type="button"
                      onClick={() => uploadInputRef.current?.click()}
                      aria-label="Upload photos or videos"
                      className="inline-flex items-center justify-center gap-0.5 rounded-lg border border-gray-600 px-2.5 py-2 text-gray-300 hover:bg-gray-700/60 transition-colors"
                    >
                      <VideoCameraIcon className="h-5 w-5 text-red-400" />
                      <PlusIcon className="h-4 w-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setWalletModalOpen(true)}
                className="shrink-0 w-[min(100%,17rem)] sm:w-64 self-stretch rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-4 flex flex-col justify-center text-left cursor-pointer hover:bg-emerald-500/10 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <CurrencyDollarIcon className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white">Wallet balance</p>
                    <p className="text-lg font-semibold text-emerald-300 tabular-nums mt-0.5">
                      {hydrated ? formatCoins(dash.walletCoins) : '—'} coins
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5 tabular-nums">
                      ≈ {hydrated ? formatUsd(dash.walletUsd) : '—'}
                    </p>
                  </div>
                  <ArrowTopRightOnSquareIcon className="h-4 w-4 text-emerald-400/80 shrink-0 mt-1" />
                </div>
              </button>
            </div>

            <nav className="flex flex-wrap gap-2">
              {profileNavLinks.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setHistoryPanelOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-gray-300 bg-gray-900/80 border border-gray-700 hover:border-red-500/40 hover:text-white transition-colors"
                >
                  {label}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => setHistoryPanelOpen((o) => !o)}
                aria-expanded={historyPanelOpen}
                aria-controls="home-history-panel"
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  historyPanelOpen
                    ? 'text-white bg-gray-800 border-red-500/50'
                    : 'text-gray-300 bg-gray-900/80 border-gray-700 hover:border-red-500/40 hover:text-white'
                }`}
              >
                History
              </button>
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

        {historyPanelOpen && (
          <section id="home-history-panel" className="text-center" aria-label="Continue watching">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-4">
              <h2 className="text-xl font-semibold text-white inline-flex items-center gap-2 justify-center">
                <ClockIcon className="h-6 w-6 text-gray-400 shrink-0" />
                Continue watching
              </h2>
              <Link href="/profile/history" className="text-sm text-red-400 hover:text-red-300 inline-flex items-center gap-1">
                View history
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 pb-2 scrollbar-site">
              {continueWatching.map((video) => (
                <Link
                  key={video.id}
                  href={`/video/${video.id}`}
                  className="flex-shrink-0 w-44 md:w-52 group flex flex-col items-center text-center"
                >
                  <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-gray-800 border border-gray-700 group-hover:border-red-500/50 transition-colors">
                    <Image src={video.thumbnail} alt="" fill className="object-cover" />
                    <span className="absolute bottom-2 right-2 text-xs bg-black/75 px-1.5 py-0.5 rounded text-white">
                      {video.duration}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-white line-clamp-2 group-hover:text-red-400 transition-colors w-full">
                    {video.title}
                  </p>
                  <p className="text-xs text-gray-500">{video.posted}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {walletModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          role="presentation"
          onClick={() => setWalletModalOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="wallet-modal-title"
            className="relative w-full max-w-md rounded-2xl border border-gray-700 bg-gray-900 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setWalletModalOpen(false)}
              className="absolute top-3 right-3 rounded-lg p-2 text-gray-400 hover:bg-gray-800 hover:text-white"
              aria-label="Close wallet"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
            <div className="p-6 pt-10 space-y-5">
              <div>
                <h2 id="wallet-modal-title" className="text-lg font-semibold text-white flex items-center gap-2">
                  <CurrencyDollarIcon className="h-6 w-6 text-emerald-400" />
                  Wallet
                </h2>
                <p className="text-sm text-gray-500 mt-1">Manage your balance on SlutSpace</p>
              </div>
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-1">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Available</p>
                <p className="text-2xl font-bold text-emerald-300 tabular-nums">{formatCoins(dash.walletCoins)} coins</p>
                <p className="text-sm text-gray-400 tabular-nums">≈ {formatUsd(dash.walletUsd)}</p>
              </div>
              <div className="space-y-2">
                <label htmlFor="wallet-add-coins" className="text-sm font-medium text-gray-300">
                  Add coins
                </label>
                <div className="flex gap-2">
                  <input
                    id="wallet-add-coins"
                    type="text"
                    inputMode="decimal"
                    value={addCoinsInput}
                    onChange={(e) => setAddCoinsInput(e.target.value)}
                    placeholder="e.g. 100"
                    className="flex-1 rounded-lg bg-gray-800 border border-gray-600 text-white text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                  />
                  <button
                    type="button"
                    onClick={addCoins}
                    className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
              <Link
                href="/wallet"
                onClick={() => setWalletModalOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-600 py-2.5 text-sm font-medium text-gray-200 hover:bg-gray-800 transition-colors"
              >
                Open full wallet
                <ArrowTopRightOnSquareIcon className="h-4 w-4" />
              </Link>
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Recent activity</h3>
                {dash.walletTx.length === 0 ? (
                  <p className="text-sm text-gray-600 py-2">No transactions yet.</p>
                ) : (
                  <ul className="max-h-40 overflow-y-auto space-y-2 text-sm scrollbar-site">
                    {dash.walletTx.map((tx) => (
                      <li
                        key={tx.id}
                        className="flex justify-between gap-2 rounded-lg bg-gray-800/60 border border-gray-700/80 px-3 py-2"
                      >
                        <span className="text-gray-300 truncate">{tx.label}</span>
                        <span className="text-emerald-400 font-medium tabular-nums shrink-0">
                          +{formatCoins(tx.amount)}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  )
}
