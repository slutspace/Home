'use client'

import { useState, useEffect } from 'react'
import AppLayout from './components/AppLayout'
import AgeVerification from './components/AgeVerification'
import ConsumerHubShell from './components/ConsumerHubShell'
import ConsumerOverviewContent from './components/ConsumerOverviewContent'

const DASH_KEY = 'slutspace_dashboard_v1'

function loadAvatarFromStorage(): string | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(DASH_KEY)
    if (!raw) return null
    const o = JSON.parse(raw) as Record<string, unknown>
    return typeof o.profileAvatar === 'string' && o.profileAvatar.length > 0 ? o.profileAvatar : null
  } catch {
    return null
  }
}

export default function HomePage() {
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null)

  useEffect(() => {
    setAvatarSrc(loadAvatarFromStorage())
    const onStorage = (e: StorageEvent) => {
      if (e.key === DASH_KEY) setAvatarSrc(loadAvatarFromStorage())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  return (
    <AppLayout>
      <AgeVerification />
      <ConsumerHubShell homeRoot>
        <ConsumerOverviewContent avatarSrc={avatarSrc} />
      </ConsumerHubShell>
    </AppLayout>
  )
}
