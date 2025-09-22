import { AboutHero } from '@/components/about/AboutHero'
import { Timeline } from '@/components/about/Timeline'
import { TeamGrid } from '@/components/about/TeamGrid'
import { Values } from '@/components/about/Values'

export const metadata = {
  title: 'About Us - Flynzo Tours',
  description: 'Learn about Flynzo Tours mission, values, and the passionate team behind unforgettable travel experiences.',
}

export default function AboutPage() {
  return (
    <div className="overflow-x-hidden">
      <AboutHero />
      <Timeline />
      <Values />
      <TeamGrid />
    </div>
  )
}
