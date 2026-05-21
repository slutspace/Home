'use client'

import AppLayout from '../../components/AppLayout'
import AgeVerification from '../../components/AgeVerification'
import CreatorPublicProfile from '../../components/creator-profile/CreatorPublicProfile'

export default function CreatorProfilePage() {
  return (
    <AppLayout>
      <AgeVerification />
      <CreatorPublicProfile />
    </AppLayout>
  )
}
