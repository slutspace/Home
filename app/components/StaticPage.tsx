'use client'

import Link from 'next/link'
import { STATIC_PAGES, type StaticPageEntry } from '../data/static-pages'

export default function StaticPage({ slug }: { slug: keyof typeof STATIC_PAGES | string }) {
  const page: StaticPageEntry | undefined = STATIC_PAGES[slug]

  if (!page) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-2xl font-bold text-white">Page not found</h1>
        <Link href="/" className="mt-4 inline-block text-red-400 hover:text-red-300">
          Back to home
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:py-12">
      <h1 className="text-3xl font-bold text-white">{page.title}</h1>
      <p className="mt-4 text-lg text-gray-300">{page.description}</p>
      {page.sections && (
        <div className="mt-8 space-y-6 rounded-2xl border border-gray-700 bg-gray-800/60 p-6">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-semibold text-white">{section.heading}</h2>
              <p className="mt-2 text-gray-300">{section.body}</p>
            </section>
          ))}
        </div>
      )}
      <Link
        href="/"
        className="mt-8 inline-flex items-center text-sm font-semibold text-red-400 hover:text-red-300"
      >
        ← Back to discovery
      </Link>
    </div>
  )
}
