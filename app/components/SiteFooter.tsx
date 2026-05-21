'use client'

import Link from 'next/link'

type FooterLink = { label: string; href: string }

type FooterColumn = { title: string; links: FooterLink[] }

const COLUMNS: FooterColumn[] = [
  {
    title: 'Menu',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Memberships & Pricing', href: '/memberships' },
      { label: 'Sign Up', href: '/signup' },
      { label: 'Login', href: '/login' },
    ],
  },
  {
    title: 'Browse',
    links: [
      { label: 'Locations', href: '/locations' },
      { label: 'All Escorts', href: '/browse/all' },
      { label: 'Backpage Alternatives', href: '/browse/backpage-alternatives' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'TLC Donation Matching', href: '/resources/tlc-donation-matching' },
      { label: 'Resources', href: '/resources' },
      { label: '#AcceptanceMatters', href: '/resources/acceptance-matters' },
      { label: 'Escort Terms', href: '/resources/escort-terms' },
      { label: 'SlutSpace FAQ', href: '/faq' },
      { label: 'SlutSpace Status', href: '/status' },
    ],
  },
  {
    title: 'Platform',
    links: [
      { label: 'Help / Support', href: '/help' },
      { label: 'About', href: '/about' },
      { label: 'Social', href: '/social' },
      { label: 'Terms', href: '/terms' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Legal Notices', href: '/legal-notices' },
      { label: 'Anti-Exploitation Policy', href: '/anti-exploitation-policy' },
    ],
  },
]

const SECONDARY_COLUMNS: FooterColumn[] = [
  {
    title: "What's New",
    links: [{ label: "What's New", href: '/whats-new' }],
  },
  {
    title: 'Legal & Safety',
    links: [
      { label: 'Legal & Safety', href: '/legal-safety' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Use', href: '/terms' },
      { label: 'DMCA Policy', href: '/dmca' },
      { label: 'Cookies Policy', href: '/cookies' },
      { label: 'Parental Control Guide', href: '/parental-control' },
      { label: 'Anti-Slavery Help', href: '/anti-slavery-help' },
    ],
  },
  {
    title: 'Work with us',
    links: [
      { label: 'Work with us', href: '/work-with-us' },
      { label: 'Become a Model', href: '/become-a-model' },
      { label: 'Studio Signup', href: '/profile/creator/studio' },
      { label: 'Webcam Affiliate Program', href: '/webcam-affiliate' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help & Support', href: '/help' },
      { label: 'Support & FAQ', href: '/faq' },
      { label: 'Billing Support', href: '/billing-support' },
      { label: 'Give Feedback', href: '/feedback' },
    ],
  },
]

function FooterColumnBlock({ column }: { column: FooterColumn }) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-white">{column.title}</h3>
      <ul className="space-y-2">
        {column.links.map((link) => (
          <li key={`${column.title}-${link.href}-${link.label}`}>
            <Link
              href={link.href}
              className="text-sm text-gray-400 transition-colors hover:text-red-400"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-gray-700 bg-gray-900/80">
      <div className="mx-auto max-w-[1600px] px-4 py-12 md:px-6">
        <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xl font-bold text-white">
              Slut<span className="text-red-500">Space</span>
            </p>
            <p className="mt-1 max-w-md text-sm text-gray-500">
              The creator platform built for intimacy, exclusivity, and control.
            </p>
          </div>
          <p className="text-xs text-gray-600">© {new Date().getFullYear()} SlutSpace. All rights reserved.</p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
          {COLUMNS.map((column) => (
            <FooterColumnBlock key={column.title} column={column} />
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-8 border-t border-gray-800 pt-10 sm:grid-cols-3 lg:grid-cols-4">
          {SECONDARY_COLUMNS.map((column) => (
            <FooterColumnBlock key={column.title} column={column} />
          ))}
        </div>
      </div>
    </footer>
  )
}
