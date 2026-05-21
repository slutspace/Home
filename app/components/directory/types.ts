export type DirectoryAccent = 'purple' | 'lime' | 'orange' | 'pink' | 'cyan'

export type DirectoryProfileCard = {
  id: string
  type: 'profile'
  name: string
  username: string
  portraitUrl: string
  /** Lowercase city/state tokens for location search */
  searchLocation: string
  locationCity: string
  locationState: string
  gender: 'female' | 'male'
  /** Category pill e.g. "Live", "Creator" */
  category: string
  photoCount: number
  /** Display price or rate e.g. "$380" or "Free" */
  price: string
  tagline: string
  /** Travel / tour line with plane icon */
  travelLine?: string
  /** Home base with house icon */
  locationLine: string
  /** Clock line e.g. "Today" or "Live now" */
  scheduleLine: string
  /** Green "Available" etc. */
  availability?: string
  bioSnippet: string
  verified: boolean
  href: string
}

export type DirectoryCard = DirectoryProfileCard
