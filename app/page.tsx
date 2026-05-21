'use client'

import AppLayout from './components/AppLayout'
import AgeVerification from './components/AgeVerification'
import DirectoryDiscoverHome from './components/directory/DirectoryDiscoverHome'

export default function HomePage() {
  return (
    <AppLayout>
      <AgeVerification />
      <DirectoryDiscoverHome />
    </AppLayout>
  )
}
