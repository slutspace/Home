'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowLeftIcon,
  PhotoIcon,
  VideoCameraIcon,
  BookmarkIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  EllipsisHorizontalIcon,
  PencilIcon,
  CameraIcon,
  WalletIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ChevronRightIcon,
  PlusIcon,
  Square2StackIcon,
  RectangleGroupIcon,
  RectangleStackIcon,
  Squares2X2Icon,
  FilmIcon,
  StarIcon,
  ClockIcon,
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  EyeIcon
} from '@heroicons/react/24/outline'
import { CurrencyDollarIcon as CurrencyDollarIconSolid } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function ProfilePage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [activeTab, setActiveTab] = useState<'photos' | 'videos' | 'favorites' | 'history' | 'messages' | 'wallet'>('photos')
  const [isFollowing, setIsFollowing] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [showWalletDetails, setShowWalletDetails] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'albums'>('grid')
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null)
  const [isTabChanging, setIsTabChanging] = useState(false)
  const [user, setUser] = useState({
    username: 'johndoe',
    name: 'John Doe',
    bio: 'Digital creator | Photography enthusiast | Travel lover',
    followers: '12.5K',
    following: '856',
    posts: '234',
    isVerified: true,
    wallet: {
      balance: 2580.75,
      coins: 15000,
      nfts: 6,
      transactions: [
        { id: 1, type: 'deposit', amount: 100, date: '2023-08-15', status: 'completed' },
        { id: 2, type: 'tip', amount: -25, date: '2023-08-14', status: 'completed' },
        { id: 3, type: 'purchase', amount: -50, date: '2023-08-10', status: 'completed' }
      ]
    }
  })
  const [photoFilter, setPhotoFilter] = useState<'recent' | 'favorites' | 'all'>('recent')
  const [showAllPhotos, setShowAllPhotos] = useState(false)
  const [viewingHistory, setViewingHistory] = useState<Array<{
    id: string;
    type: 'photo' | 'video';
    url: string;
    title: string;
  }>>([])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveProfile = () => {
    // Here you would typically make an API call to save the profile changes
    setIsEditing(false)
  }

  const handleTabChange = (tab: string) => {
    setIsTabChanging(true)
    setActiveTab(tab as 'photos' | 'videos' | 'favorites' | 'history' | 'messages' | 'wallet')
    // Reset tab changing state after animation completes
    setTimeout(() => setIsTabChanging(false), 300)
  }

  // Sample photo albums
  const photoAlbums = [
    { id: 'photos', name: 'All Photos', count: 148, cover: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538', type: 'photo' },
    { id: 'selfies', name: 'Selfies', count: 52, cover: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61', type: 'photo' },
    { id: 'travel', name: 'Travel', count: 87, cover: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b', type: 'photo' },
    { id: 'favorites', name: 'Favorites', count: 35, cover: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f', type: 'photo' }
  ]

  // Sample video albums
  const videoAlbums = [
    { id: 'all-videos', name: 'All Videos', count: 24, cover: 'https://images.unsplash.com/photo-1536240478700-b869070f9279', type: 'video' },
    { id: 'vlogs', name: 'Vlogs', count: 12, cover: 'https://images.unsplash.com/photo-1626379953822-baec19c3accd', type: 'video' },
    { id: 'tutorials', name: 'Tutorials', count: 8, cover: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7', type: 'video' },
    { id: 'reels', name: 'Reels', count: 16, cover: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85', type: 'video' }
  ]

  // Sample posts (photos)
  const photos = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538',
      likes: 1234,
      comments: 56,
      date: '2023-10-15'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61',
      likes: 856,
      comments: 23,
      date: '2023-10-10'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b',
      likes: 2345,
      comments: 89,
      date: '2023-10-08'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f',
      likes: 543,
      comments: 32,
      date: '2023-10-05'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857',
      likes: 876,
      comments: 45,
      date: '2023-10-01'
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1526800544336-d04f0cbfd700',
      likes: 987,
      comments: 67,
      date: '2023-09-28'
    },
    {
      id: 7,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      likes: 765,
      comments: 43,
      date: '2023-09-25'
    },
    {
      id: 8,
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
      likes: 654,
      comments: 38,
      date: '2023-09-20'
    },
    {
      id: 9,
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
      likes: 543,
      comments: 27,
      date: '2023-09-18'
    }
  ]

  // Sample videos
  const videos = [
    {
      id: 101,
      thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279',
      duration: '3:45',
      views: 2560,
      title: 'Travel vlog: Tokyo day 1',
      date: '2023-10-12'
    },
    {
      id: 102,
      thumbnail: 'https://images.unsplash.com/photo-1626379953822-baec19c3accd',
      duration: '2:18',
      views: 1870,
      title: 'Morning routine 2023',
      date: '2023-10-05'
    },
    {
      id: 103,
      thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7',
      duration: '5:22',
      views: 3450,
      title: 'How to edit photos like a pro',
      date: '2023-09-28'
    },
    {
      id: 104,
      thumbnail: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85',
      duration: '1:05',
      views: 7890,
      title: 'Beach sunset timelapse',
      date: '2023-09-15'
    },
    {
      id: 105,
      thumbnail: 'https://images.unsplash.com/photo-1605379399642-870262d3d051',
      duration: '4:10',
      views: 2340,
      title: 'Photography tips and tricks',
      date: '2023-09-08'
    },
    {
      id: 106,
      thumbnail: 'https://images.unsplash.com/photo-1593697821028-7cc59cfd7399',
      duration: '2:45',
      views: 1980,
      title: 'Weekend highlights',
      date: '2023-09-01'
    }
  ]

  // Sample favorites
  const favorites = [
    {
      id: 201,
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab',
      type: 'photo',
      likes: 876,
      comments: 45,
      saved: '2023-10-20'
    },
    {
      id: 202,
      thumbnail: 'https://images.unsplash.com/photo-1514870262631-55de0332faf6',
      type: 'video',
      duration: '3:22',
      title: 'Concert highlights',
      saved: '2023-10-15'
    },
    {
      id: 203,
      image: 'https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e',
      type: 'photo',
      likes: 543,
      comments: 28,
      saved: '2023-10-10'
    },
    {
      id: 204,
      thumbnail: 'https://images.unsplash.com/photo-1576633587382-13ddf37b1fc1',
      type: 'video',
      duration: '1:45',
      title: 'City at night',
      saved: '2023-10-05'
    }
  ]

  // Sample messages for inbox
  const messages = [
    { id: 1, sender: 'Alice Smith', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3', message: 'Hey, loved your latest video! Can we collab sometime?', time: '2 hours ago', unread: true },
    { id: 2, sender: 'Bob Johnson', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3', message: 'Thanks for the tips on your photography tutorial!', time: '5 hours ago', unread: false },
    { id: 3, sender: 'Carol Williams', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3', message: 'When are you going live next? I missed your last stream.', time: 'Yesterday', unread: true },
    { id: 4, sender: 'David Brown', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3', message: 'Can you check out my new content? Would love your feedback!', time: '2 days ago', unread: false },
    { id: 5, sender: 'Emma Davis', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3', message: 'The NFT you sent is amazing! Thank you so much.', time: '3 days ago', unread: false },
    { id: 6, sender: 'Frank Miller', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3', message: 'Just sent you some crypto for that awesome tutorial!', time: '1 week ago', unread: false }
  ];

  // Wallet modal state and handlers
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  const openWalletModal = () => {
    setIsWalletModalOpen(true);
  };

  const closeWalletModal = () => {
    setIsWalletModalOpen(false);
  };

  // Sort photos based on filter
  const getFilteredPhotos = () => {
    let filteredPhotos = [...photos];
    
    if (photoFilter === 'recent') {
      // Return photos sorted by date (most recent first)
      filteredPhotos = filteredPhotos.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else if (photoFilter === 'favorites') {
      // Return photos with most likes
      filteredPhotos = filteredPhotos.sort((a, b) => b.likes - a.likes);
    }
    
    // Return all or limited photos based on showAllPhotos state
    return showAllPhotos ? filteredPhotos : filteredPhotos.slice(0, 6);
  };

  const renderContentByTab = () => {
    switch (activeTab) {
      case 'photos':
        if (viewMode === 'albums' && !selectedAlbum) {
          return (
            <motion.div 
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Photo Albums</h3>
                <button 
                  onClick={() => setViewMode('grid')} 
                  className="text-sm text-blue-400 font-medium"
                >
                  See All Photos
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {photoAlbums.map((album) => (
                  <motion.div 
                    key={album.id} 
                    className="relative rounded-xl overflow-hidden cursor-pointer shadow-lg border border-gray-700"
                    onClick={() => setSelectedAlbum(album.id)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
                    <img 
                      src={album.cover} 
                      alt={album.name} 
                      className="w-full aspect-square object-cover"
                    />
                    <div className="absolute top-3 right-3 z-20">
                      <div className="bg-gray-900/70 rounded-full p-1.5">
                        <PhotoIcon className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 p-3 z-20">
                      <h4 className="text-white font-medium text-lg">{album.name}</h4>
                      <p className="text-gray-300 text-sm">{album.count} photos</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        } else if (viewMode === 'albums' && selectedAlbum) {
          // Album detail view
          const album = photoAlbums.find(a => a.id === selectedAlbum);
          return (
            <motion.div 
              className="mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <button 
                  className="flex items-center text-blue-400"
                  onClick={() => setSelectedAlbum(null)}
                >
                  <ChevronRightIcon className="h-4 w-4 transform rotate-180 mr-1" />
                  <span>Albums</span>
                </button>
                <div className="text-white font-medium">{album?.name}</div>
                <button 
                  onClick={() => setViewMode('grid')} 
                  className="text-sm text-blue-400 font-medium"
                >
                  See All
                </button>
              </div>
              <div className="grid grid-cols-3 gap-1">
                {photos.map((photo) => (
                  <motion.div 
                    key={photo.id} 
                    className="relative aspect-square"
                    whileHover={{ scale: 1.05, zIndex: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img 
                      src={photo.image} 
                      alt={`Photo ${photo.id}`} 
                      className="w-full h-full object-cover rounded-sm"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        } else {
          // Default grid view
          return (
            <motion.div 
              className="mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Photos</h3>
                <div className="flex space-x-2">
                  <div className="bg-gray-800 rounded-lg p-1 flex">
                    <motion.button
                      onClick={() => setPhotoFilter('recent')}
                      className={`px-2 sm:px-3 py-1.5 text-xs rounded-md flex items-center ${
                        photoFilter === 'recent' ? 'bg-gray-700 text-white' : 'text-gray-400'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ClockIcon className="h-3.5 w-3.5 mr-1" />
                      <span className="hidden sm:inline">Recent</span>
                    </motion.button>
                    <motion.button
                      onClick={() => setPhotoFilter('favorites')}
                      className={`px-2 sm:px-3 py-1.5 text-xs rounded-md flex items-center ${
                        photoFilter === 'favorites' ? 'bg-gray-700 text-white' : 'text-gray-400'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <StarIcon className="h-3.5 w-3.5 mr-1" />
                      <span className="hidden sm:inline">Popular</span>
                    </motion.button>
                  </div>
                  <motion.button
                    onClick={() => setShowAllPhotos(!showAllPhotos)}
                    className="px-2 sm:px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {showAllPhotos ? 'Show Less' : 'View All'}
                  </motion.button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1">
                {getFilteredPhotos().map((photo) => (
                  <motion.div 
                    key={photo.id} 
                    className="relative aspect-square"
                    whileHover={{ 
                      scale: 1.03, 
                      zIndex: 10,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <img 
                      src={photo.image} 
                      alt={`Photo ${photo.id}`} 
                      className="w-full h-full object-cover"
                    />
                    <motion.div 
                      className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center space-x-4"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <div className="flex items-center space-x-2">
                        <HeartIcon className="h-5 w-5 text-white" />
                        <span className="text-white text-sm">{photo.likes}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ChatBubbleLeftIcon className="h-5 w-5 text-white" />
                        <span className="text-white text-sm">{photo.comments}</span>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
              {photoFilter !== 'all' && photos.length > 6 && (
                <motion.button
                  onClick={() => setPhotoFilter('all')}
                  className="w-full mt-4 py-2 border border-gray-700 rounded-lg text-blue-400 text-sm font-medium flex items-center justify-center"
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  View All Photos ({photos.length})
                </motion.button>
              )}
            </motion.div>
          );
        }
      case 'videos':
        if (viewMode === 'albums' && !selectedAlbum) {
          return (
            <motion.div 
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Video Collections</h3>
                <button 
                  onClick={() => setViewMode('grid')} 
                  className="text-sm text-blue-400 font-medium"
                >
                  See All Videos
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {videoAlbums.map((album) => (
                  <motion.div 
                    key={album.id} 
                    className="relative rounded-xl overflow-hidden cursor-pointer shadow-lg border border-gray-700"
                    onClick={() => setSelectedAlbum(album.id)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
                    <img 
                      src={album.cover} 
                      alt={album.name} 
                      className="w-full aspect-video object-cover"
                    />
                    <div className="absolute top-3 right-3 z-20">
                      <div className="bg-gray-900/70 rounded-full p-1.5">
                        <FilmIcon className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 p-3 z-20">
                      <h4 className="text-white font-medium text-lg">{album.name}</h4>
                      <p className="text-gray-300 text-sm">{album.count} videos</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        } else if (viewMode === 'albums' && selectedAlbum) {
          // Video album detail view
          const album = videoAlbums.find(a => a.id === selectedAlbum);
          return (
            <motion.div 
              className="mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <button 
                  className="flex items-center text-blue-400"
                  onClick={() => setSelectedAlbum(null)}
                >
                  <ChevronRightIcon className="h-4 w-4 transform rotate-180 mr-1" />
                  <span>Collections</span>
                </button>
                <div className="text-white font-medium">{album?.name}</div>
                <button 
                  onClick={() => setViewMode('grid')} 
                  className="text-sm text-blue-400 font-medium"
                >
                  See All
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {videos.map((video) => (
                  <motion.div 
                    key={video.id} 
                    className="relative rounded-lg overflow-hidden"
                    whileHover={{ scale: 1.03, zIndex: 10 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <div className="relative">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title} 
                        className="w-full aspect-video object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                          <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-gray-900 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-2">
                      <h3 className="text-white text-sm font-medium truncate">{video.title}</h3>
                      <p className="text-gray-400 text-xs">{video.views.toLocaleString()} views</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        } else {
          // Default video grid view
          return (
            <motion.div 
              className="mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-2 gap-3">
                {videos.map((video) => (
                  <motion.div 
                    key={video.id} 
                    className="relative rounded-lg overflow-hidden bg-gray-800"
                    whileHover={{ scale: 1.03, zIndex: 10 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <div className="relative">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title} 
                        className="w-full aspect-video object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                          <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-gray-900 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-2">
                      <h3 className="text-white text-sm font-medium truncate">{video.title}</h3>
                      <p className="text-gray-400 text-xs">{video.views.toLocaleString()} views • {video.date}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        }
      case 'favorites':
        return (
          <motion.div 
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Favorites</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {favorites.map((item) => (
                <motion.div 
                  key={item.id} 
                  className="relative rounded-lg overflow-hidden"
                  whileHover={{ scale: 1.03, zIndex: 10 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {item.type === 'photo' ? (
                    <>
                      <img 
                        src={item.image} 
                        alt={`Favorite ${item.id}`} 
                        className="w-full aspect-square object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <div className="bg-black/50 rounded-full p-1">
                          <StarIcon className="h-4 w-4 text-yellow-400" />
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                        <div className="flex items-center justify-between text-white text-xs">
                          <div className="flex items-center space-x-2">
                            <HeartIcon className="h-3 w-3" />
                            <span>{item.likes}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <ChatBubbleLeftIcon className="h-3 w-3" />
                            <span>{item.comments}</span>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="relative">
                        <img 
                          src={item.thumbnail} 
                          alt={item.title} 
                          className="w-full aspect-video object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                            <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center">
                              <svg className="w-3 h-3 text-gray-900 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="absolute top-2 right-2">
                          <div className="bg-black/50 rounded-full p-1">
                            <StarIcon className="h-4 w-4 text-yellow-400" />
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {item.duration}
                        </div>
                      </div>
                      <div className="p-2 bg-gray-800">
                        <h3 className="text-white text-sm font-medium truncate">{item.title}</h3>
                        <p className="text-gray-400 text-xs">Saved {item.saved}</p>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      case 'history':
        return (
          <motion.div 
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Viewing History</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {viewingHistory.map((item) => (
                <div key={item.id} className="relative group">
                  {item.type === 'photo' ? (
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  ) : (
                    <video
                      src={item.url}
                      className="w-full h-64 object-cover rounded-lg"
                      controls
                    />
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
                    <button className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200 text-white">
                      <EyeIcon className="h-8 w-8" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      case 'messages':
        return (
          <motion.div 
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Messages</h3>
              <div>
                <button className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-md text-sm flex items-center">
                  <PencilIcon className="h-4 w-4 mr-1" />
                  New Message
                </button>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg">
              {messages.map((msg) => (
                <motion.div 
                  key={msg.id}
                  className={`p-4 flex items-start space-x-3 border-b border-gray-700 hover:bg-gray-750 cursor-pointer transition-colors ${
                    msg.unread ? 'bg-gray-750/50' : ''
                  }`}
                  whileHover={{ backgroundColor: 'rgba(31, 41, 55, 0.7)' }}
                >
                  <img 
                    src={msg.avatar} 
                    alt={msg.sender} 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-white">{msg.sender}</h4>
                      <span className="text-gray-400 text-xs">{msg.time}</span>
                    </div>
                    <p className={`text-sm mt-1 ${msg.unread ? 'text-white' : 'text-gray-400'}`}>
                      {msg.message}
                    </p>
                  </div>
                  {msg.unread && (
                    <div className="w-2 h-2 rounded-full bg-purple-500 mt-2" />
                  )}
                </motion.div>
              ))}
              
              {messages.length === 0 && (
                <div className="p-8 text-center">
                  <div className="bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ChatBubbleLeftIcon className="h-8 w-8 text-gray-500" />
                  </div>
                  <h4 className="text-gray-300 font-medium mb-2">No messages yet</h4>
                  <p className="text-gray-500 text-sm">
                    Connect with other users to start conversations
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        );
      case 'wallet':
        return (
          <motion.div 
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Wallet</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <motion.button 
                className="bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg flex items-center justify-center font-medium"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <PlusIcon className="h-5 w-5 mr-1" />
                Add Funds
              </motion.button>
              <motion.button 
                className="bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg flex items-center justify-center font-medium"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <ShareIcon className="h-5 w-5 mr-1" />
                Send
              </motion.button>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header - removed 'sticky top-0' class so it scrolls away */}
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={() => router.back()}
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowLeftIcon className="h-6 w-6" />
              </motion.button>
              <h1 className="text-xl font-bold">@{user.username}</h1>
              {user.isVerified && (
                <motion.span 
                  className="ml-2 text-purple-500"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </motion.span>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={openWalletModal}
                className="text-gray-400 hover:text-white transition-colors relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <WalletIcon className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
              </motion.button>
              <motion.button
                onClick={() => setIsEditing(!isEditing)}
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isEditing ? (
                  <span className="text-purple-500 font-semibold" onClick={handleSaveProfile}>
                    Save
                  </span>
                ) : (
                  <PencilIcon className="h-6 w-6" />
                )}
              </motion.button>
              <motion.button
                onClick={() => router.push('/settings')}
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Cog6ToothIcon className="h-6 w-6" />
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Info */}
        <motion.div 
          className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div 
            className="relative group"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 p-1">
              <div className="w-full h-full rounded-full bg-gray-800 overflow-hidden">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <UserCircleIcon className="w-full h-full text-gray-600" />
                )}
              </div>
            </div>
            {isEditing && (
              <motion.button
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <CameraIcon className="h-8 w-8 text-white" />
              </motion.button>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
          </motion.div>
          
          <div className="flex-1 text-center md:text-left">
            {isEditing ? (
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Name"
                />
                <textarea
                  value={user.bio}
                  onChange={(e) => setUser({ ...user, bio: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Bio"
                  rows={3}
                />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <motion.button
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      isFollowing
                        ? 'bg-gray-700 text-white hover:bg-gray-600'
                        : 'bg-purple-500 text-white hover:bg-purple-600'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </motion.button>
                </div>
                <p className="mt-4 text-gray-400">{user.bio}</p>
              </motion.div>
            )}
            
            <motion.div 
              className="flex justify-center md:justify-start space-x-8 mt-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <div className="text-center">
                <p className="font-semibold">{user.posts}</p>
                <p className="text-sm text-gray-400">Posts</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">{user.followers}</p>
                <p className="text-sm text-gray-400">Followers</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">{user.following}</p>
                <p className="text-sm text-gray-400">Following</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Content Tabs with View Options */}
        <div className="mt-8 border-b border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div className="flex space-x-4 sm:space-x-8">
              <motion.button
                onClick={() => handleTabChange('photos')}
                className={`py-3 border-b-2 font-medium ${
                  activeTab === 'photos'
                    ? 'border-purple-500 text-purple-500'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-col items-center">
                  <PhotoIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span className="text-xs mt-1">Photos</span>
                </div>
              </motion.button>
              <motion.button
                onClick={() => handleTabChange('videos')}
                className={`py-3 border-b-2 font-medium ${
                  activeTab === 'videos'
                    ? 'border-purple-500 text-purple-500'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-col items-center">
                  <FilmIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span className="text-xs mt-1">Videos</span>
                </div>
              </motion.button>
              <motion.button
                onClick={() => handleTabChange('favorites')}
                className={`py-3 border-b-2 font-medium ${
                  activeTab === 'favorites'
                    ? 'border-purple-500 text-purple-500'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-col items-center">
                  <StarIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span className="text-xs mt-1">Favorites</span>
                </div>
              </motion.button>
              <motion.button
                onClick={() => handleTabChange('history')}
                className={`py-3 border-b-2 font-medium ${
                  activeTab === 'history'
                    ? 'border-purple-500 text-purple-500'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-col items-center">
                  <EyeIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span className="text-xs mt-1">History</span>
                </div>
              </motion.button>
            </div>
            
            {(activeTab === 'photos' || activeTab === 'videos') && (
              <div className="flex space-x-2">
                <motion.button 
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-gray-700 text-white' : 'text-gray-400'}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Squares2X2Icon className="h-5 w-5" />
                </motion.button>
                <motion.button 
                  onClick={() => {
                    setViewMode('albums');
                    setSelectedAlbum(null);
                  }}
                  className={`p-1.5 rounded-md ${viewMode === 'albums' ? 'bg-gray-700 text-white' : 'text-gray-400'}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <RectangleStackIcon className="h-5 w-5" />
                </motion.button>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Content based on tab and view mode */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderContentByTab()}
        </motion.div>
      </div>

      {/* Wallet Modal */}
      {isWalletModalOpen && (
        <motion.div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-gray-800 rounded-xl w-full max-w-md relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <motion.button 
              onClick={closeWalletModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
            
            <div className="p-6">
              <motion.div 
                className="flex items-center mb-6"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <WalletIcon className="h-6 w-6 text-purple-500 mr-2" />
                <h3 className="text-xl font-semibold text-white">Your Wallet</h3>
              </motion.div>
              
              <motion.div 
                className="relative bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-5 mb-6 overflow-hidden"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="absolute inset-0 bg-[url('/coin-pattern.svg')] mix-blend-overlay opacity-10"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-gray-200">Available Balance</div>
                    <div className="bg-white/20 px-2 py-1 rounded-full text-xs text-white">
                      <span className="text-green-300">+5.7%</span>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white mb-3">${user.wallet.balance.toLocaleString()}</div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-gray-200">SLUT Coins</div>
                      <div className="text-white font-semibold">{user.wallet.coins.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-200">NFTs</div>
                      <div className="text-white font-semibold">{user.wallet.nfts}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="grid grid-cols-2 gap-3 mb-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.button 
                  className="bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg flex items-center justify-center font-medium"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <PlusIcon className="h-5 w-5 mr-1" />
                  Add Funds
                </motion.button>
                <motion.button 
                  className="bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg flex items-center justify-center font-medium"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <ShareIcon className="h-5 w-5 mr-1" />
                  Send
                </motion.button>
              </motion.div>
              
              <motion.div 
                className="space-y-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h4 className="text-sm font-medium text-gray-300">Recent Transactions</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {user.wallet.transactions.map((transaction, index) => (
                    <motion.div 
                      key={transaction.id} 
                      className="flex items-center justify-between bg-gray-750 rounded-lg p-3"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ scale: 1.02, backgroundColor: 'rgba(75, 85, 99, 0.4)' }}
                    >
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                          transaction.amount > 0 ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {transaction.amount > 0 ? (
                            <PlusIcon className="h-4 w-4" />
                          ) : (
                            <CurrencyDollarIcon className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <p className="text-white text-sm capitalize">{transaction.type}</p>
                          <p className="text-gray-400 text-xs">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${transaction.amount > 0 ? 'text-green-400' : 'text-blue-400'}`}>
                          {transaction.amount > 0 ? `+$${transaction.amount}` : `-$${Math.abs(transaction.amount)}`}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <Link href="/wallet" className="block text-center text-blue-400 hover:underline mt-4">
                    View All Transactions
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
} 