'use client'

import Link from 'next/link'
import Image from 'next/image'
import { consumerWatchHistory } from '../../../../utils/consumerProfileData'
import { ClockIcon } from '@heroicons/react/24/outline'

export default function ProfileHistoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <ClockIcon className="h-7 w-7 text-gray-400" />
          Viewing history
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Everything you have opened recently. Tap a row to jump back into the video.
        </p>
      </div>

      <div className="rounded-xl border border-gray-700 divide-y divide-gray-700/80 overflow-hidden bg-gray-800/30">
        {consumerWatchHistory.map((video, index) => (
          <Link
            key={`${video.id}-${index}`}
            href={`/video/${video.id}`}
            className="flex gap-4 p-4 hover:bg-gray-700/40 transition-colors"
          >
            <div className="relative w-36 sm:w-44 aspect-video flex-shrink-0 rounded-lg overflow-hidden bg-gray-900">
              <Image src={video.thumbnail} alt="" fill className="object-cover" />
              <span className="absolute bottom-1 right-1 text-[10px] bg-black/75 px-1 rounded text-white">
                {video.duration}
              </span>
            </div>
            <div className="min-w-0 flex-1 py-1">
              <p className="text-white font-medium line-clamp-2">{video.title}</p>
              <p className="text-sm text-gray-400 mt-1">{video.channel}</p>
              <p className="text-xs text-gray-500 mt-2">
                {video.views} · {video.posted}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
