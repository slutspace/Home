'use client'

import { useState, useRef } from 'react'
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
  Cog6ToothIcon,
  ArrowRightIcon,
  PencilSquareIcon,
  EnvelopeIcon,
  ShieldCheckIcon,
  PhotoIcon,
  DocumentTextIcon,
  UserGroupIcon,
  EyeIcon,
  ChatBubbleBottomCenterTextIcon,
  ArrowUpTrayIcon,
} from '@heroicons/react/24/outline'

const continueWatching = allVideos.slice(0, 5)

const profileNavLinks = [
  { label: 'My Profile', href: '/profile' },
  { label: 'Videos', href: '/library' },
  { label: 'Short videos', href: '/library' },
  { label: 'Galleries', href: '/profile/creator' },
  { label: 'Posts', href: '/community' },
  { label: 'Friends', href: '/community' },
  { label: 'Favorites', href: '/profile/favorites' },
] as const

const completionTasks = [
  { label: 'Add and verify your email', bonus: '+5%', done: false },
  { label: 'Verify your identity', bonus: '+20%', done: false },
  { label: 'Upload your first video', bonus: '', done: false },
  { label: 'Upload your first photo', bonus: '', done: false },
  { label: 'Create your first post', bonus: '', done: false },
  { label: 'Meet new friends', bonus: '', done: false },
] as const

export default function HomePage() {
  const [status, setStatus] = useState('')
  const uploadInputRef = useRef<HTMLInputElement>(null)

  return (
    <AppLayout>
      <AgeVerification />
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Profile snapshot & completion — home dashboard */}
        <section className="rounded-2xl border border-gray-700 bg-gray-800/30 overflow-hidden">
          <div className="grid lg:grid-cols-5 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-gray-700">
            <div className="lg:col-span-3 p-6 md:p-8 space-y-6">
              <div className="flex flex-col xl:flex-row xl:items-stretch gap-4 xl:gap-6">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 flex-1 min-w-0">
                  <div
                    className="h-20 w-20 shrink-0 rounded-2xl bg-gradient-to-br from-red-500/30 to-gray-800 border border-gray-600 flex items-center justify-center text-2xl font-bold text-white"
                    aria-hidden
                  >
                    U
                  </div>
                  <div className="flex-1 min-w-0 space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-bold text-white truncate">UpstartAxis38</h2>
                      <span className="text-xs font-medium uppercase tracking-wide px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        Newbie
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">Last seen 5 days ago · 46 days on SlutSpace</p>
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href="/profile/creator"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-red-500/90 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-600 transition-colors"
                      >
                        <PencilSquareIcon className="h-4 w-4" />
                        Edit profile
                      </Link>
                      <Link
                        href="/settings"
                        className="inline-flex items-center rounded-lg border border-gray-600 px-3 py-1.5 text-sm text-gray-300 hover:bg-gray-700/60 transition-colors"
                      >
                        Settings
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-amber-500/25 bg-amber-500/5 p-4 flex flex-col justify-center xl:max-w-[280px] xl:shrink-0 w-full">
                  <div className="flex items-start gap-3">
                    <EnvelopeIcon className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-white">Verify your email</p>
                      <p className="text-sm text-gray-400 mt-0.5 break-all">t*********r@m**l.com</p>
                    </div>
                    <span className="text-xs font-semibold text-amber-400 shrink-0">+5%</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                  <span>Profile filled</span>
                  <span className="text-red-400 font-medium">0%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-900 overflow-hidden border border-gray-700">
                  <div className="h-full w-0 rounded-full bg-gradient-to-r from-red-500 to-pink-500" />
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
                  <p className="text-lg font-semibold text-white">1</p>
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

              <div>
                <label htmlFor="home-status" className="sr-only">
                  Your status
                </label>
                <textarea
                  id="home-status"
                  rows={3}
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  placeholder="Write your status here..."
                  className="w-full rounded-xl bg-gray-900 border border-gray-700 text-sm text-white placeholder-gray-500 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500/40 resize-none"
                />
              </div>
            </div>

            <div className="lg:col-span-2 p-6 md:p-8 space-y-6 bg-gray-900/20">
              <input
                ref={uploadInputRef}
                type="file"
                className="hidden"
                accept="video/*,image/*"
                multiple
                aria-hidden
              />
              <button
                type="button"
                onClick={() => uploadInputRef.current?.click()}
                aria-label="Upload photos or videos"
                className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-600 bg-gray-800/50 px-4 py-8 text-sm font-medium text-gray-200 hover:border-red-500/50 hover:bg-gray-800 hover:text-white transition-colors"
              >
                <ArrowUpTrayIcon className="h-6 w-6 text-red-400" />
                Upload photos or videos
              </button>

              <div>
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <ShieldCheckIcon className="h-4 w-4 text-gray-400" />
                  Complete your profile
                </h3>
                <ul className="space-y-2">
                  {completionTasks.map((task) => (
                    <li
                      key={task.label}
                      className="flex items-center justify-between gap-3 rounded-lg border border-gray-700/80 bg-gray-800/40 px-3 py-2.5 text-sm"
                    >
                      <span className="text-gray-300 flex items-center gap-2 min-w-0">
                        {task.label === 'Upload your first video' && (
                          <VideoCameraIcon className="h-4 w-4 text-gray-500 shrink-0" />
                        )}
                        {task.label === 'Upload your first photo' && (
                          <PhotoIcon className="h-4 w-4 text-gray-500 shrink-0" />
                        )}
                        {task.label === 'Create your first post' && (
                          <DocumentTextIcon className="h-4 w-4 text-gray-500 shrink-0" />
                        )}
                        {task.label === 'Meet new friends' && (
                          <UserGroupIcon className="h-4 w-4 text-gray-500 shrink-0" />
                        )}
                        {task.label === 'Add and verify your email' && (
                          <EnvelopeIcon className="h-4 w-4 text-gray-500 shrink-0" />
                        )}
                        {task.label === 'Verify your identity' && (
                          <ShieldCheckIcon className="h-4 w-4 text-gray-500 shrink-0" />
                        )}
                        <span>{task.label}</span>
                      </span>
                      {task.bonus ? (
                        <span className="text-xs font-medium text-amber-400 shrink-0">{task.bonus}</span>
                      ) : (
                        <span className="text-xs text-gray-600 shrink-0">—</span>
                      )}
                    </li>
                  ))}
                </ul>
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
            <ExploreCard href="/settings" icon={Cog6ToothIcon} title="Settings" subtitle="Account & privacy" />
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
