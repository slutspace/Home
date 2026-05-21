import AppLayout from '../components/AppLayout'
import StaticPage from '../components/StaticPage'

export function staticPage(slug: string) {
  return function StaticPageRoute() {
    return (
      <AppLayout>
        <StaticPage slug={slug} />
      </AppLayout>
    )
  }
}
