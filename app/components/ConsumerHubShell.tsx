'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserCircleIcon, ClockIcon, HeartIcon, FilmIcon } from '@heroicons/react/24/outline'

function linkActive(pathname: string, href: string, match: 'exact' | 'prefix') {
  if (match === 'exact') return pathname === href
  return pathname === href || pathname.startsWith(`${href}/`)
}

export default function ConsumerHubShell({
  homeRoot,
  children,
}: {
  homeRoot: boolean
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const overviewHref = homeRoot ? '/' : '/profile'

  const navItems: {
    href: string
    label: string
    icon: React.ComponentType<{ className?: string }>
    match: 'exact' | 'prefix'
  }[] = [
    { href: overviewHref, label: 'Overview', icon: UserCircleIcon, match: 'exact' },
    { href: '/profile/history', label: 'History', icon: ClockIcon, match: 'prefix' },
    { href: '/profile/favorites', label: 'Favorites', icon: HeartIcon, match: 'prefix' },
    { href: '/profile/creator', label: 'Creator studio', icon: FilmIcon, match: 'prefix' },
  ]

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">My profile</h1>
        <p className="text-sm text-gray-400 mt-1">
          Consumer hub — history, saves, and the path to publishing.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <nav className="lg:w-56 flex-shrink-0">
          <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-2 space-y-1">
            {navItems.map(({ href, label, icon: Icon, match }) => {
              const active = linkActive(pathname, href, match)
              return (
                <Link
                  key={`${href}-${label}`}
                  href={href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? 'bg-red-500/15 text-red-400 border border-red-500/30'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/60 border border-transparent'
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {label}
                </Link>
              )
            })}
          </div>
        </nav>

        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  )
}
