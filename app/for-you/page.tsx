import { redirect } from 'next/navigation'

/** Story discovery moved to /live; /for-you/feed/* routes remain available. */
export default function ForYouIndexPage() {
  redirect('/live')
}
