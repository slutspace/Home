'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import AppLayout from '../components/AppLayout'
import { allVideos } from '../../utils/videoData'
import AgeVerification from '../components/AgeVerification'

export default function LibraryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<'rating' | 'newest' | 'views' | 'trending'>('rating');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const videosPerPage = 20;
  const totalPages = Math.ceil(allVideos.length / videosPerPage);
  
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = allVideos.slice(indexOfFirstVideo, indexOfLastVideo);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  };

  const handleSortChange = (option: 'rating' | 'newest' | 'views' | 'trending') => {
    setSortOption(option);
    setShowSortDropdown(false);
    
    const sortedVideos = [...allVideos].sort((a, b) => {
      switch (option) {
        case 'rating':
          return parseInt(b.views.replace(/,/g, '')) - parseInt(a.views.replace(/,/g, ''));
        case 'newest':
          const timeA = a.posted.includes('hour') ? 1 : a.posted.includes('day') ? 2 : 3;
          const timeB = b.posted.includes('hour') ? 1 : b.posted.includes('day') ? 2 : 3;
          return timeA - timeB;
        case 'views':
          return parseInt(b.views.replace(/,/g, '')) - parseInt(a.views.replace(/,/g, ''));
        case 'trending':
          const viewsA = parseInt(a.views.replace(/,/g, ''));
          const viewsB = parseInt(b.views.replace(/,/g, ''));
          const timeWeightA = a.posted.includes('hour') ? 3 : a.posted.includes('day') ? 2 : 1;
          const timeWeightB = b.posted.includes('hour') ? 3 : b.posted.includes('day') ? 2 : 1;
          return (viewsB * timeWeightB) - (viewsA * timeWeightA);
        default:
          return 0;
      }
    });
    
    const sortedCurrentVideos = sortedVideos.slice(indexOfFirstVideo, indexOfLastVideo);
    allVideos.splice(indexOfFirstVideo, sortedCurrentVideos.length, ...sortedCurrentVideos);
  };

  return (
    <AppLayout>
      <AgeVerification />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Library</h1>
            <p className="text-sm text-gray-400 mt-1">Browse the full catalog — sort, paginate, and dive in.</p>
          </div>
          
          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
            >
              <span className="text-sm">Sort by: {sortOption.charAt(0).toUpperCase() + sortOption.slice(1)}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {showSortDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-50">
                <div className="py-1">
                  {['rating', 'newest', 'views', 'trending'].map((option) => (
                    <button
                      key={option}
                      onClick={() => handleSortChange(option as 'rating' | 'newest' | 'views' | 'trending')}
                      className={`w-full text-left px-4 py-2 text-sm ${
                        sortOption === option
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {currentVideos.map((video) => (
            <div key={video.id} className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-all hover:scale-105 cursor-pointer hover:bg-gray-750 flex flex-col h-full">
              <div className="group">
                <Link href={`/video/${video.id}`}>
                  <div className="relative w-full aspect-video">
                    {video.thumbnail.includes('dragon1.png') || 
                      video.thumbnail.includes('dragon10.png') || 
                      video.thumbnail.includes('dragon22.jpeg') ? (
                      <div className="w-full h-full flex items-center justify-center bg-gray-900">
                        <Image 
                          src={video.thumbnail}
                          alt={video.title}
                          width={120}
                          height={120}
                          style={{ objectFit: 'contain' }}
                          className="max-h-[80%] max-w-[80%]"
                          priority={video.id <= 5}
                        />
                      </div>
                    ) : video.thumbnail.includes('dragon31.jpeg') ? (
                      <div className="w-full h-full flex items-center justify-center bg-gray-900">
                        <Image 
                          src={video.thumbnail}
                          alt={video.title}
                          width={160}
                          height={160}
                          style={{ objectFit: 'contain' }}
                          className="max-h-[85%] max-w-[85%]"
                          priority={video.id <= 5}
                        />
                      </div>
                    ) : (
                      <Image 
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        priority={video.id <= 5}
                      />
                    )}
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded z-10">
                      {video.duration}
                    </div>
                  </div>
                </Link>
                <div className="p-3 flex-1">
                  <Link href={`/video/${video.id}`}>
                    <h3 className="text-white font-medium text-sm group-hover:text-blue-400 line-clamp-2">{video.title}</h3>
                  </Link>
                  <div className="flex items-center mt-2">
                    <Link href={`/profile/${video.channel}`} onClick={(e) => e.stopPropagation()} className="mr-2">
                      <div className="relative w-6 h-6">
                        <Image 
                          src={video.channelIcon}
                          alt={video.channel}
                          fill
                          className="rounded-full hover:ring-1 hover:ring-blue-500 transition-all"
                        />
                      </div>
                    </Link>
                    <div>
                      <Link href={`/profile/${video.channel}`} className="hover:text-blue-400 transition-colors">
                        <span className="text-gray-300 text-xs">{video.channel}</span>
                      </Link>
                      <p className="text-gray-400 text-xs">{video.views} • {video.posted}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            Prev
          </button>
          
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              {index + 1}
            </button>
          ))}
          
          <button
            onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            Next
          </button>
        </div>

        <footer className="mt-12 py-6 border-t border-gray-700">
          <div className="flex flex-wrap justify-between items-center text-sm">
            <div className="flex gap-4">
              <Link href="/community" className="text-gray-400 hover:text-white transition-colors">
                Community
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                Contact Us
              </Link>
            </div>
            <div className="flex gap-4">
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms and Conditions
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </AppLayout>
  )
}
