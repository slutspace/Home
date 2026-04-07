'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { 
  HomeIcon, 
  VideoCameraIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  SparklesIcon,
  HeartIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  WalletIcon,
  RectangleStackIcon,
  ArrowRightStartOnRectangleIcon,
  EllipsisHorizontalIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'

interface AppLayoutProps {
  children: React.ReactNode;
  userPreference?: 'submissive' | 'dominant' | null;
}

export default function AppLayout({ children, userPreference: propPreference }: AppLayoutProps) {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userPreference, setUserPreference] = useState<'submissive' | 'dominant' | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  /** Immersive stream: /live/:id or legacy /for-you/feed (not /live browse). */
  const isForYouWatchRoute =
    pathname.startsWith('/for-you') ||
    (pathname !== '/live' && /^\/live\/[^/]+$/.test(pathname));
  const isLiveBrowseRoute = pathname === '/live';
  const isLibraryRoute = pathname.startsWith('/library');
  const isHomeRoute = pathname === '/';

  const navIconBtn = (active: boolean) =>
    `p-2 rounded-lg transition-colors ${
      active ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700/80'
    }`;

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(authStatus === 'true');
  }, []);

  const clearUserPreference = () => {
    localStorage.removeItem('userPreference');
    setUserPreference(null);
  };

  useEffect(() => {
    const savedPreference = localStorage.getItem('userPreference') as 'submissive' | 'dominant' | null;
    setUserPreference(propPreference || savedPreference || null);
  }, [propPreference]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userPreference');
    localStorage.removeItem('hasVisited');
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    setIsProfileDropdownOpen(false);
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <header className="bg-gray-800 relative z-50 border-b border-gray-700 shrink-0">
        <div className="flex justify-between items-center h-14 px-3 sm:px-4 gap-2">
          <div className="flex items-center shrink-0">
            <Link href="/" className="text-lg sm:text-xl font-bold text-red-500">
              SlutSpace
            </Link>
          </div>

          <div className="hidden md:flex items-center flex-1 max-w-2xl mx-3 min-w-0">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-l-full pl-4 pr-10 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                type="submit"
                className="absolute bg-gray-600 hover:bg-gray-500 rounded-r-full right-0 top-0 bottom-0 px-4 flex items-center justify-center"
              >
                <MagnifyingGlassIcon className="h-5 w-5 text-white" />
              </button>
            </form>
          </div>

          <div className="flex md:hidden items-center flex-1 min-w-0 max-w-[140px] xs:max-w-xs mx-1">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-full pl-3 pr-8 py-1.5 text-sm text-white placeholder-gray-400 focus:outline-none"
              />
              <button type="submit" className="absolute right-2 top-1.5 text-gray-400">
                <MagnifyingGlassIcon className="h-4 w-4" />
              </button>
            </form>
          </div>

          <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
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
            <Link href="/live/2" className={navIconBtn(isForYouWatchRoute)} title="For You" aria-label="For You">
              <SparklesIcon className="h-6 w-6" />
            </Link>
            <Link href="/live" className={navIconBtn(isLiveBrowseRoute)} title="Live" aria-label="Live">
              <VideoCameraIcon className="h-6 w-6" />
            </Link>

            <Link href="/" className={navIconBtn(isHomeRoute)} title="Home" aria-label="Home">
              <HomeIcon className="h-6 w-6" />
            </Link>

            <div className="relative border-l border-gray-700 pl-1 ml-0.5" ref={dropdownRef}>
              <button 
                type="button"
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)} 
                className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/80 focus:outline-none"
                aria-label="Account menu"
                aria-expanded={isProfileDropdownOpen}
              >
                <EllipsisHorizontalIcon className="h-6 w-6" />
              </button>
              
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-700 animate-fadeIn">
                  {!isAuthenticated ? (
                    <Link 
                      href="/signup" 
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <span className="flex items-center">
                        <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
                        Sign up
                      </span>
                    </Link>
                  ) : (
                    <>
                      <div className="px-4 py-3 border-b border-gray-700">
                        <p className="text-sm text-white font-semibold">John Doe</p>
                        <p className="text-xs text-gray-400 truncate">john.doe@example.com</p>
                      </div>
                      <Link 
                        href="/profile" 
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <span className="flex items-center">
                          <UserCircleIcon className="h-4 w-4 mr-2" />
                          Your Profile
                        </span>
                      </Link>
                      <Link 
                        href="/settings" 
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <span className="flex items-center">
                          <CogIcon className="h-4 w-4 mr-2" />
                          Settings
                        </span>
                      </Link>
                      <Link 
                        href="/wallet" 
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <span className="flex items-center">
                          <WalletIcon className="h-4 w-4 mr-2" />
                          Wallet
                        </span>
                      </Link>
                      <div className="border-t border-gray-700 my-1" />
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300"
                      >
                        <span className="flex items-center">
                          <ArrowRightStartOnRectangleIcon className="h-4 w-4 mr-2" />
                          Logout
                        </span>
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className={`w-full flex-1 min-w-0 overflow-x-hidden ${isHomeRoute ? '' : 'p-4 md:p-6'}`}>
        {children}
      </main>
    </div>
  )
}
