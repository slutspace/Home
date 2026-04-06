'use client'

import Link from 'next/link'
import Image from 'next/image'
import { consumerFavorites } from '../../../../utils/consumerProfileData'
import { HeartIcon } from '@heroicons/react/24/outline'

export default function ProfileFavoritesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <HeartIcon className="h-7 w-7 text-pink-400" />
          Favorites
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Saved videos you can return to anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {consumerFavorites.map((video, index) => (
          <Link
            key={`${video.id}-fav-${index}`}
            href={`/video/${video.id}`}
            className="group rounded-xl border border-gray-700 overflow-hidden bg-gray-800/40 hover:border-pink-500/40 transition-colors"
          >
            <div className="relative aspect-video">
              <Image src={video.thumbnail} alt="" fill className="object-cover group-hover:opacity-90 transition-opacity" />
              <span className="absolute bottom-2 right-2 text-xs bg-black/75 px-1.5 py-0.5 rounded text-white">
                {video.duration}
              </span>
            </div>
            <div className="p-3">
              <p className="text-white font-medium line-clamp-2 group-hover:text-pink-300 transition-colors">
                {video.title}
              </p>
              <p className="text-xs text-gray-500 mt-1">{video.channel} · {video.views}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
