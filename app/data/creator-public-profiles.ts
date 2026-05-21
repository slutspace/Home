export type CreatorPublicProfile = {
  id: string
  username: string
  displayName: string
  tagline: string
  pronouns: string
  bio: string
  bannerUrl: string
  avatarUrl: string
  isLive: boolean
  isVerified: boolean
  level: number
  rating: number
  ratingCount: number
  privateFrom: string
  privateUnit: string
  bestForLabel: string
  privateTags: string[]
  locations: { city: string; icon?: 'plane' | 'home' }[]
  lastActive: string
  attributes: { label: string; value: string }[]
  videos: { id: string; title: string; duration: string; likes: number; thumb: string; locked?: boolean; unlockPrice?: string }[]
  albums: { id: string; title: string; count: number; likes: number; cover: string; special?: string }[]
  photos: string[]
  reviews: { id: string; stars: number; text: string; date: string; badge?: string }[]
  goal: { title: string; current: number; target: number; contributors: number }
  schedule: { day: string; time: string; isToday?: boolean; isOff?: boolean }[]
  knights: { id: string; name: string; score: number; flag?: string }[]
  tips: { label: string; price: number }[]
}

export const DEFAULT_CREATOR_PROFILE: CreatorPublicProfile = {
  id: 'mayacreates',
  username: 'mayacreates',
  displayName: 'Maya Chen',
  tagline: 'Premium drops · live nights · your rules',
  pronouns: 'She',
  bio: 'Exclusive lifestyle creator known for polished sets, intimate live rooms, and subscriber-only drops. Based in Los Angeles with touring dates — subscribe for uncensored feeds, custom requests, and ticketed private shows.',
  bannerUrl:
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1600&h=600&fit=crop&q=80',
  avatarUrl:
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&q=80',
  isLive: true,
  isVerified: true,
  level: 65,
  rating: 4.9,
  ratingCount: 128,
  privateFrom: '90',
  privateUnit: 'tk/min',
  bestForLabel: 'Best for Privates',
  privateTags: [
    'Ahegao',
    'Role Play',
    'Dirty Talk',
    'Oil show',
    'Toys',
    'ASMR',
    'Cosplay',
    'JOI',
    'Squirting',
    'Domination',
  ],
  locations: [
    { city: 'Los Angeles, CA', icon: 'home' },
    { city: 'Austin, TX · touring', icon: 'plane' },
    { city: 'Miami, FL · guest rooms', icon: 'plane' },
  ],
  lastActive: 'Last active today',
  attributes: [
    { label: 'From', value: 'United States' },
    { label: 'Languages', value: 'English, Mandarin' },
    { label: 'Age', value: '21+ creator' },
    { label: 'Interested in', value: 'Everybody' },
    { label: 'Body type', value: 'Athletic' },
    { label: 'Specifics', value: 'Lingerie, POV, Live' },
    { label: 'Ethnicity', value: 'Asian' },
    { label: 'Hair', value: 'Dark brown' },
    { label: 'Eye color', value: 'Brown' },
    { label: 'Subculture', value: 'Glamour' },
  ],
  videos: [
    {
      id: 'v1',
      title: 'POV: private room after-party 💋',
      duration: '08:25',
      likes: 277,
      thumb: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=300&fit=crop&q=80',
      locked: true,
      unlockPrice: '277 tk',
    },
    {
      id: 'v2',
      title: 'Lingerie try-on — fan picks',
      duration: '12:10',
      likes: 412,
      thumb: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=300&fit=crop&q=80',
      locked: true,
      unlockPrice: 'Fan Club',
    },
    {
      id: 'v3',
      title: 'Late night Q&A uncut',
      duration: '22:04',
      likes: 189,
      thumb: 'https://images.unsplash.com/photo-1529626465592-4ff0802cfb7e?w=400&h=300&fit=crop&q=80',
      locked: true,
      unlockPrice: '150 tk',
    },
    {
      id: 'v4',
      title: 'Studio BTS — lighting test',
      duration: '05:18',
      likes: 96,
      thumb: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop&q=80',
      locked: true,
      unlockPrice: 'Fan Club',
    },
  ],
  albums: [
    { id: 'a1', title: 'Public', count: 12, likes: 842, cover: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&q=80' },
    { id: 'a2', title: 'Love Me', count: 24, likes: 1204, cover: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop&q=80' },
    { id: 'a3', title: 'SUMMER VIBE', count: 18, likes: 1482, cover: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=300&fit=crop&q=80' },
    { id: 'a4', title: 'Angel', count: 9, likes: 659, cover: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&q=80' },
    { id: 'a5', title: 'Telegram', count: 0, likes: 490, cover: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=300&h=300&fit=crop&q=80', special: 'TELEGRAM CHANNEL' },
  ],
  photos: [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=700&fit=crop&q=80',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&h=700&fit=crop&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=700&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=700&fit=crop&q=80',
  ],
  reviews: [
    { id: 'r1', stars: 5, text: 'Amazing energy in private — exactly what I was looking for.', date: 'May 18, 2026', badge: 'Exclusive Private' },
    { id: 'r2', stars: 5, text: 'Worth every token. Great audio and super responsive.', date: 'May 12, 2026', badge: 'Exclusive Private' },
    { id: 'r3', stars: 5, text: 'Best live room on the site right now.', date: 'May 2, 2026' },
  ],
  goal: { title: 'SEXY LINGERIE SET', current: 1154, target: 3000, contributors: 42 },
  schedule: [
    { day: 'Monday', time: '4:00 PM – 12:00 AM' },
    { day: 'Tuesday', time: '4:00 PM – 12:00 AM' },
    { day: 'Wednesday', time: '4:00 PM – 12:00 AM', isToday: true },
    { day: 'Thursday', time: '4:00 PM – 12:00 AM' },
    { day: 'Friday', time: '4:00 PM – 12:00 AM' },
    { day: 'Saturday', time: '4:00 PM – 12:00 AM' },
    { day: 'Sunday', time: 'No broadcasts', isOff: true },
  ],
  knights: [
    { id: 'k1', name: 'PAPI-T4Z-XXX', score: 93 },
    { id: 'k2', name: 'Jandrar', score: 88, flag: '🇦🇺' },
    { id: 'k3', name: 'MikeR', score: 61 },
    { id: 'k4', name: 'DevonX', score: 54 },
    { id: 'k5', name: 'LunaFan', score: 48 },
    { id: 'k6', name: 'Guest_77', score: 41 },
  ],
  tips: [
    { label: 'HI 💋', price: 10 },
    { label: "DON'T STOP PLEASE", price: 11 },
    { label: 'I LOVE YOU 💕', price: 15 },
    { label: 'Flash request', price: 25 },
    { label: 'Private minute boost', price: 50 },
  ],
}

export function getCreatorPublicProfile(_id?: string): CreatorPublicProfile {
  return DEFAULT_CREATOR_PROFILE
}
