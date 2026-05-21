export type StaticPageEntry = {
  title: string
  description: string
  sections?: { heading: string; body: string }[]
}

export const STATIC_PAGES: Record<string, StaticPageEntry> = {
  memberships: {
    title: 'Memberships & Pricing',
    description: 'Choose a plan that fits how you browse, subscribe, and support creators on SlutSpace.',
    sections: [
      { heading: 'Free', body: 'Browse discovery, follow creators, and access public previews.' },
      { heading: 'Supporter', body: 'Monthly tiers unlock feeds, DMs, and exclusive drops from your favorites.' },
      { heading: 'Creator Pro', body: 'Advanced analytics, payout tools, and studio features for professionals.' },
    ],
  },
  locations: {
    title: 'Locations',
    description: 'Browse creators and live sessions by city, state, and tour dates.',
  },
  'browse-all': {
    title: 'All Creators',
    description: 'Full directory of verified and rising creators on SlutSpace.',
  },
  'browse-backpage': {
    title: 'Backpage Alternatives',
    description: 'SlutSpace offers a modern, consent-forward platform for independent creators and subscribers.',
  },
  blog: {
    title: 'Blog',
    description: 'Product updates, creator stories, and platform news from the SlutSpace team.',
  },
  resources: {
    title: 'Resources',
    description: 'Guides, policies, and community resources for creators and subscribers.',
  },
  'resources-tlc': {
    title: 'TLC Donation Matching',
    description: 'Learn how SlutSpace supports matched giving for approved community partners.',
  },
  'resources-acceptance': {
    title: '#AcceptanceMatters',
    description: 'Our commitment to inclusion, safety, and respect across the SlutSpace community.',
  },
  'resources-escort-terms': {
    title: 'Escort Terms',
    description: 'Definitions and guidelines for listings, bookings, and professional conduct.',
  },
  faq: {
    title: 'SlutSpace FAQ',
    description: 'Answers to common questions about accounts, billing, creators, and safety.',
  },
  status: {
    title: 'SlutSpace Status',
    description: 'Current platform status, incidents, and scheduled maintenance.',
  },
  help: {
    title: 'Help / Support',
    description: 'Get help with your account, payouts, reporting, and technical issues.',
  },
  about: {
    title: 'About',
    description: 'SlutSpace is a creator platform built for intimacy, exclusivity, and control.',
  },
  social: {
    title: 'Social',
    description: 'Follow SlutSpace on social channels for updates and community highlights.',
  },
  'legal-notices': {
    title: 'Legal Notices',
    description: 'Corporate notices, contact information, and jurisdictional disclosures.',
  },
  'anti-exploitation': {
    title: 'Anti-Exploitation Policy',
    description: 'We prohibit exploitation, trafficking, and non-consensual content in all forms.',
  },
  'whats-new': {
    title: "What's New",
    description: 'Recent releases, experiments, and improvements across SlutSpace.',
  },
  'legal-safety': {
    title: 'Legal & Safety',
    description: 'Overview of policies that protect users, creators, and the platform.',
  },
  dmca: {
    title: 'DMCA Policy',
    description: 'How to submit copyright notices and counter-notifications.',
  },
  cookies: {
    title: 'Cookies Policy',
    description: 'How we use cookies and similar technologies on SlutSpace.',
  },
  'parental-control': {
    title: 'Parental Control Guide',
    description: 'Tools and guidance for restricting access to adult content in your household.',
  },
  'anti-slavery-help': {
    title: 'Anti-Slavery Help',
    description: 'Resources and reporting paths for suspected trafficking or coercion.',
  },
  'work-with-us': {
    title: 'Work with us',
    description: 'Partnerships, careers, and business opportunities with SlutSpace.',
  },
  'become-a-model': {
    title: 'Become a Model',
    description: 'Start your creator profile, verify your identity, and grow your audience.',
  },
  'webcam-affiliate': {
    title: 'Webcam Affiliate Program',
    description: 'Earn by referring creators and subscribers to SlutSpace.',
  },
  'billing-support': {
    title: 'Billing Support',
    description: 'Help with charges, refunds, and payment methods.',
  },
  feedback: {
    title: 'Give Feedback',
    description: 'Share ideas and report issues to improve SlutSpace.',
  },
}
