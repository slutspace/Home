'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  HomeIcon,
  XMarkIcon,
  HeartIcon,
  RectangleStackIcon,
} from '@heroicons/react/24/outline'

interface AppLayoutProps {
  children: React.ReactNode;
  userPreference?: 'submissive' | 'dominant' | null;
}

export default function AppLayout({ children, userPreference: propPreference }: AppLayoutProps) {
  const [userPreference, setUserPreference] = useState<'submissive' | 'dominant' | null>(null);
  const pathname = usePathname();

  const isLibraryRoute = pathname.startsWith('/library');
  const isHomeRoute = pathname === '/';

  const navIconBtn = (active: boolean) =>
    `p-2 rounded-lg transition-colors ${
      active ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700/80'
    }`;

  const clearUserPreference = () => {
    localStorage.removeItem('userPreference');
    setUserPreference(null);
  };

  useEffect(() => {
    const savedPreference = localStorage.getItem('userPreference') as 'submissive' | 'dominant' | null;
    setUserPreference(propPreference || savedPreference || null);
  }, [propPreference]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <header className="bg-gray-800 relative z-50 border-b border-gray-700 shrink-0">
        <div className="flex justify-between items-center h-14 px-3 sm:px-4 gap-2">
          <div className="flex items-center shrink-0">
            <Link href="/" className="text-lg sm:text-xl font-bold text-red-500">
              SlutSpace
            </Link>
          </div>

          <div className="flex items-center gap-0.5 sm:gap-1 shrink-0 ml-auto">
            {userPreference && (
              <div
                onClick={clearUserPreference}
                className={`hidden sm:flex items-center preference-indicator preference-${userPreference} px-2 py-1 rounded-full cursor-pointer bg-gray-700/30 hover:bg-gray-700/50 transition-all group`}
                title={`Remove ${userPreference} preference`}
              >
                <HeartIcon className={`h-4 w-4 sm:mr-1 ${userPreference === 'dominant' ? 'text-red-500 animate-heart-pulse-red' : 'text-purple-500 animate-heart-pulse-purple'}`} />
                <span className="text-xs font-medium capitalize hidden md:inline">{userPreference}</span>
                <XMarkIcon className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block" />
              </div>
            )}
            {userPreference && (
              <div
                onClick={clearUserPreference}
                className={`sm:hidden p-2 rounded-full bg-gray-700/30 preference-indicator preference-${userPreference}`}
                title="Remove preference"
              >
                <HeartIcon className={`h-5 w-5 ${userPreference === 'dominant' ? 'text-red-500' : 'text-purple-500'}`} />
              </div>
            )}

            <Link href="/library" className={navIconBtn(isLibraryRoute)} title="Library" aria-label="Library">
              <RectangleStackIcon className="h-6 w-6" />
            </Link>

            <Link href="/" className={navIconBtn(isHomeRoute)} title="Home" aria-label="Home">
              <HomeIcon className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </header>

      <main className="w-full flex-1 min-w-0 overflow-x-hidden p-4 md:p-6">
        {children}
      </main>
    </div>
  )
}
