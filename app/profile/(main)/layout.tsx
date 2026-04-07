'use client'

import AppLayout from '../../components/AppLayout'
import ConsumerHubShell from '../../components/ConsumerHubShell'

export default function ConsumerProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppLayout>
      <ConsumerHubShell homeRoot={false}>{children}</ConsumerHubShell>
    </AppLayout>
  )
}
