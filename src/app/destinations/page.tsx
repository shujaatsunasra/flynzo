import { DestinationHero } from '@/components/destinations/DestinationHero'
import { FilterBar } from '@/components/destinations/FilterBar'
import { DestinationGrid } from '@/components/destinations/DestinationGrid'

export const metadata = {
  title: 'Destinations - Flynzo Tours',
  description: 'Explore amazing destinations around the world with Flynzo Tours. From exotic beaches to cultural cities, find your perfect getaway.',
}

export default function DestinationsPage() {
  return (
    <div className="overflow-x-hidden">
      <DestinationHero />
      <FilterBar />
      <DestinationGrid />
    </div>
  )
}
