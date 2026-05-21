'use client'

import AppLayout from '../../components/AppLayout'
import AgeVerification from '../../components/AgeVerification'
import CreatorPublicProfile from '../../components/creator-profile/CreatorPublicProfile'

export default function ProfileByIdPage({ params }: { params: { id: string } }) {
  return (
    <AppLayout>
      <AgeVerification />
      <CreatorPublicProfile creatorId={params.id} />
    </AppLayout>
  )
}
