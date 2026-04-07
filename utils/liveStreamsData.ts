export interface LiveStreamCard {
  id: number
  title: string
  streamer: string
  streamerImage: string
  thumbnail: string
  viewers: number
  category: string
  location: string
  interests: string[]
  startedAt: string
}

export const LIVE_CATEGORIES = [
  'all',
  'gaming',
  'music',
  'chat',
  'fitness',
  'creative',
  'after dark',
] as const

export const LIVE_LOCATIONS = [
  'anywhere',
  'north america',
  'europe',
  'asia pacific',
  'latin america',
  'global online',
] as const

export const LIVE_INTERESTS = [
  'all',
  'trending',
  'romance',
  'community',
  'competitive',
  'chill',
  'new creators',
  'verified',
] as const

export const liveStreamsCatalog: LiveStreamCard[] = [
  {
    id: 2,
    title: 'PUBG Mobile Finals — Road to Champion',
    streamer: 'GamingPro',
    viewers: 8765,
    category: 'gaming',
    location: 'north america',
    interests: ['trending', 'competitive'],
    thumbnail:
      'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    streamerImage:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    startedAt: '30 min ago',
  },
  {
    id: 3,
    title: 'Live Piano — Taking Requests',
    streamer: 'MusicWorld',
    viewers: 567,
    category: 'music',
    location: 'europe',
    interests: ['chill', 'community'],
    thumbnail:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    streamerImage:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    startedAt: '1 hr ago',
  },
  {
    id: 4,
    title: 'Cook-along: Homemade Pasta',
    streamer: 'CookingMaster',
    viewers: 890,
    category: 'creative',
    location: 'latin america',
    interests: ['community', 'new creators'],
    thumbnail:
      'https://images.unsplash.com/photo-1596075780750-81249df16d19?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    streamerImage:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    startedAt: '45 min ago',
  },
  {
    id: 5,
    title: 'HIIT Workout — Join Me',
    streamer: 'FitnessHub',
    viewers: 345,
    category: 'fitness',
    location: 'north america',
    interests: ['trending', 'verified'],
    thumbnail:
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    streamerImage:
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    startedAt: '15 min ago',
  },
  {
    id: 6,
    title: 'Tokyo Nights Walk & Chat',
    streamer: 'TravelExplorer',
    viewers: 678,
    category: 'chat',
    location: 'asia pacific',
    interests: ['chill', 'community'],
    thumbnail:
      'https://images.unsplash.com/photo-1527203561188-dae1bc1a417f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    streamerImage:
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    startedAt: '3 hr ago',
  },
  {
    id: 7,
    title: 'Digital Art — Fantasy Portraits',
    streamer: 'ArtStudio',
    viewers: 234,
    category: 'creative',
    location: 'global online',
    interests: ['new creators', 'romance'],
    thumbnail:
      'https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    streamerImage:
      'https://images.unsplash.com/photo-1558898479-33c0057a5d12?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    startedAt: '50 min ago',
  },
  {
    id: 8,
    title: 'Late Lounge — Q&A & Vibes',
    streamer: 'NightOwl',
    viewers: 2100,
    category: 'after dark',
    location: 'europe',
    interests: ['trending', 'romance', 'verified'],
    thumbnail:
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    streamerImage:
      'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    startedAt: 'Live now',
  },
  {
    id: 1,
    title: 'Live Coding: React From Scratch',
    streamer: 'CodeMaster',
    viewers: 1234,
    category: 'creative',
    location: 'north america',
    interests: ['community', 'new creators'],
    thumbnail:
      'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    streamerImage:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    startedAt: '2 hr ago',
  },
]
