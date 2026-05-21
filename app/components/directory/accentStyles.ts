import type { DirectoryAccent } from './types'

/** Accents mapped to SlutSpace palette (red / purple / blue highlights) */
export function accentGradient(accent: DirectoryAccent): string {
  const map: Record<DirectoryAccent, string> = {
    purple: 'from-purple-600/80 via-purple-500/60 to-gray-900',
    lime: 'from-emerald-600/50 via-teal-600/40 to-gray-900',
    orange: 'from-red-600/70 via-orange-600/50 to-gray-900',
    pink: 'from-pink-600/60 via-red-500/50 to-gray-900',
    cyan: 'from-instagram-blue/60 via-blue-600/40 to-gray-900',
  }
  return map[accent]
}

export function accentBorder(accent: DirectoryAccent): string {
  const map: Record<DirectoryAccent, string> = {
    purple: 'border-purple-500/30',
    lime: 'border-emerald-500/25',
    orange: 'border-red-500/35',
    pink: 'border-pink-500/30',
    cyan: 'border-blue-500/30',
  }
  return map[accent]
}

export function accentText(accent: DirectoryAccent): string {
  const map: Record<DirectoryAccent, string> = {
    purple: 'text-purple-400',
    lime: 'text-emerald-400',
    orange: 'text-red-400',
    pink: 'text-pink-400',
    cyan: 'text-instagram-blue',
  }
  return map[accent]
}
