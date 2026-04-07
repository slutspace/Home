'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { 
  HomeIcon, 
  FireIcon,
  VideoCameraIcon,
  BookmarkIcon,
  ClockIcon,
  LightBulbIcon,
  MagnifyingGlassIcon,
  BellIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
  PuzzlePieceIcon,
  SparklesIcon,
  HeartIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  WalletIcon,
  CurrencyDollarIcon,
  PlusCircleIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  TvIcon,
  UserGroupIcon,
  RectangleStackIcon,
  Cog6ToothIcon,
  ArrowRightStartOnRectangleIcon
} from '@heroicons/react/24/outline'
import { CheckIcon } from '@heroicons/react/24/solid'

interface AppLayoutProps {
  children: React.ReactNode;
  userPreference?: 'submissive' | 'dominant' | null;
}

export default function AppLayout({ children, userPreference: propPreference }: AppLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isWalletExpanded, setIsWalletExpanded] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [userPreference, setUserPreference] = useState<'submissive' | 'dominant' | null>(null);
  const [userColor, setUserColor] = useState<'purple' | 'red' | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [autoplay, setAutoplay] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const sidebarLinkClass = (active: boolean, extra = '') =>
    `flex items-center px-4 py-2.5 md:py-2 rounded-lg transition-colors ${extra} ${
      active ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700'
    }`;
  
  // Check if this is the user's first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (hasVisited) {
      setIsFirstVisit(false);
    } else {
      localStorage.setItem('hasVisited', 'true');
    }
  }, []);

  // Check authentication status on mount
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(authStatus === 'true');
  }, []);

  // Function to clear user preference
  const clearUserPreference = () => {
    localStorage.removeItem('userPreference');
    setUserPreference(null);
  };

  // Check localStorage for user preference on mount and update when prop changes
  useEffect(() => {
    const savedPreference = localStorage.getItem('userPreference') as 'submissive' | 'dominant' | null;
    setUserPreference(propPreference || savedPreference || null);
  }, [propPreference]);

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Handle header visibility on scroll
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;
    
    const controlHeader = () => {
      if (window.innerWidth < 768) { // only apply for mobile view
        if (window.scrollY > lastScrollY && window.scrollY > 50) {
          // Scrolling down - hide header
          setShowHeader(false);
        } else {
          // Scrolling up - show header
          setShowHeader(true);
        }
        setLastScrollY(window.scrollY);
      } else {
        // Always show header on desktop
        setShowHeader(true);
      }
    };

    window.addEventListener('scroll', controlHeader);
    
    // Clean up 
    return () => {
      window.removeEventListener('scroll', controlHeader);
    };
  }, [lastScrollY]);
  
  // Handle body scroll when mobile menu is open
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;
    
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);
  
  // set active tab when page loads
  useEffect(() => {
    const route = pathname.split('/')[1];
    setActiveTab(route || 'home');
  }, [pathname]);

  // Handle animations for clicked tab
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  // Update user color based on preference
  useEffect(() => {
    if (userPreference === 'submissive') {
      setUserColor('purple');
    } else if (userPreference === 'dominant') {
      setUserColor('red');
    } else {
      setUserColor(null);
    }
  }, [userPreference]);

  // Add logout function
  const handleLogout = () => {
    // Clear all user-related data from localStorage
    localStorage.removeItem('userPreference');
    localStorage.removeItem('hasVisited');
    localStorage.removeItem('isAuthenticated');
    
    // Update authentication state
    setIsAuthenticated(false);
    
    // Close the dropdown
    setIsProfileDropdownOpen(false);
    
    // Redirect to home page
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header 
        className={`bg-gray-800 sticky top-0 z-50 transition-transform duration-300 ${
          showHeader ? 'transform-none' : '-translate-y-full'
        }`}
      >
        <div className="flex justify-between items-center h-14 px-4">
          {/* Left section - Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-red-500">
              SlutSpace
            </Link>
          </div>

          {/* Middle section - Search */}
          <div className="hidden md:flex items-center flex-1 max-w-2xl mx-4">
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

          {/* Mobile search - visible on mobile */}
          <div className="flex md:hidden items-center flex-1 max-w-xs mx-2">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-full pl-4 pr-8 py-1.5 text-sm text-white placeholder-gray-400 focus:outline-none"
              />
              <button 
                type="submit"
                className="absolute right-2 top-1.5 text-gray-400"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            </form>
          </div>

          {/* Right section - User controls */}
          <div className="flex items-center space-x-1">
            {/* Preference indicator - visible on desktop */}
            {userPreference && (
              <div 
                onClick={clearUserPreference}
                className={`hidden md:flex items-center preference-indicator preference-${userPreference} px-3 py-1.5 rounded-full cursor-pointer bg-gray-700/30 hover:bg-gray-700/50 transition-all group`}
                title={`Click to remove your ${userPreference} preference`}
              >
                <HeartIcon className={`h-5 w-5 mr-1.5 ${userPreference === 'dominant' ? 'text-red-500 animate-heart-pulse-red' : 'text-purple-500 animate-heart-pulse-purple'}`} />
                <span className="text-sm font-medium capitalize">{userPreference}</span>
                <XMarkIcon className="h-4 w-4 ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )}

            {/* Preference indicator - visible on mobile, enhanced */}
            {userPreference && (
              <div 
                onClick={clearUserPreference}
                className={`md:hidden p-2 preference-indicator preference-${userPreference} rounded-full bg-gray-700/30 hover:bg-gray-700/50 active:bg-gray-700/70 transition-all cursor-pointer`}
                title={`Click to remove your ${userPreference} preference`}
              >
                <HeartIcon className={`h-6 w-6 ${userPreference === 'dominant' ? 'text-red-500 animate-heart-pulse-red' : 'text-purple-500 animate-heart-pulse-purple'}`} />
              </div>
            )}

            {/* Profile button with dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)} 
                className="p-2 text-gray-400 hover:text-white focus:outline-none"
                aria-label="Open profile menu"
              >
                <UserCircleIcon className="h-6 w-6" />
              </button>
              
              {/* Profile Dropdown */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-700 animate-fadeIn">
                  {!isAuthenticated ? (
                    <Link 
                      href="/signup" 
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <span className="flex items-center">
                        <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
                        <span>Sign up</span>
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
                          <span>Your Profile</span>
                        </span>
                      </Link>
                      <Link 
                        href="/settings" 
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <span className="flex items-center">
                          <CogIcon className="h-4 w-4 mr-2" />
                          <span>Settings</span>
                        </span>
                      </Link>
                      <Link 
                        href="/wallet" 
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <span className="flex items-center">
                          <WalletIcon className="h-4 w-4 mr-2" />
                          <span>Wallet</span>
                        </span>
                      </Link>
                      <div className="border-t border-gray-700 my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300"
                      >
                        <span className="flex items-center">
                          <ArrowRightStartOnRectangleIcon className="h-4 w-4 mr-2" />
                          <span>Logout</span>
                        </span>
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
            
            {/* Mobile hamburger menu button - moved to right side */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="md:hidden p-2 text-gray-400 hover:text-white"
              aria-label="Open menu"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu - Optimized for mobile devices */}
      <div className={`
        md:hidden fixed inset-0 z-40 bg-gray-900 transition-all duration-300 ease-in-out
        ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}>
        <div className={`
          h-full w-full max-w-sm bg-gray-800 flex flex-col transition-transform duration-300 ease-in-out transform
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          {/* Header fixed at top */}
          <div className="flex justify-between items-center h-14 px-4 bg-gray-800 border-b border-gray-700 flex-shrink-0">
            <button 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="p-2 text-gray-400 hover:text-white"
              aria-label="Close menu"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            <Link href="/" className="text-xl font-bold text-red-500">
              SlutSpace
            </Link>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto pb-20 flex flex-col">
            {/* Mobile menu navigation */}
            <nav className="pt-4 px-2 flex-shrink-0">
              <div className="space-y-1">
                <Link href="/" className={sidebarLinkClass(pathname === '/')}>
                  <HomeIcon className="h-6 w-6 mr-3" />
                  <span>Home</span>
                </Link>
                <Link href="/library" className={sidebarLinkClass(pathname.startsWith('/library'))}>
                  <RectangleStackIcon className="h-6 w-6 mr-3" />
                  <span>Library</span>
                </Link>
                <Link href="/for-you" className={sidebarLinkClass(pathname.startsWith('/for-you'))}>
                  <SparklesIcon className="h-6 w-6 mr-3" />
                  <span>For You</span>
                </Link>
                <Link href="/live" className={sidebarLinkClass(pathname.startsWith('/live'))}>
                  <VideoCameraIcon className="h-6 w-6 mr-3" />
                  <span>Live</span>
                </Link>
              </div>
            </nav>

            {/* Account Section - now at the bottom of scrollable area */}
            <div className="px-2 py-4 mt-auto border-t border-gray-700">
              <h3 className="px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Account
              </h3>

              <div className="space-y-1">
                <Link href="/profile" className="flex items-center px-4 py-2.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
                  <UserCircleIcon className="h-6 w-6 mr-3" />
                  <span>Profile</span>
                </Link>
                <Link href="/settings" className="flex items-center px-4 py-2.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
                  <CogIcon className="h-6 w-6 mr-3" />
                  <span>Settings</span>
                </Link>
                <Link href="/signup" className="flex items-center px-4 py-2.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
                  <ArrowRightOnRectangleIcon className="h-6 w-6 mr-3" />
                  <span>Sign up</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar - Only visible on desktop */}
        <aside className="hidden md:block w-64 bg-gray-800 text-white min-h-screen fixed top-14">
          <nav className="pt-4">
            <div className="px-2 space-y-1">
              <Link href="/" className={sidebarLinkClass(pathname === '/', 'px-4 py-2')}>
                <HomeIcon className="h-6 w-6 mr-3" />
                <span>Home</span>
              </Link>
              <Link href="/library" className={sidebarLinkClass(pathname.startsWith('/library'), 'px-4 py-2')}>
                <RectangleStackIcon className="h-6 w-6 mr-3" />
                <span>Library</span>
              </Link>
              <Link href="/for-you" className={sidebarLinkClass(pathname.startsWith('/for-you'), 'px-4 py-2')}>
                <SparklesIcon className="h-6 w-6 mr-3" />
                <span>For You</span>
              </Link>
              <Link href="/live" className={sidebarLinkClass(pathname.startsWith('/live'), 'px-4 py-2')}>
                <VideoCameraIcon className="h-6 w-6 mr-3" />
                <span>Live</span>
              </Link>
            </div>
          </nav>
        </aside>
        
        {/* Main content */}
        <main className="w-full md:ml-64 p-4 md:p-6 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  )
} 