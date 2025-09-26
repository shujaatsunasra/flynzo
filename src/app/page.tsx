import { Hero } from '@/components/home/Hero'
import TourStorytellingSection from '@/components/home/TourStorytellingSection'
import { TravelExpertise } from '@/components/home/TravelExpertise'
import { SocialProof } from '@/components/home/SocialProof'
import { JourneyPlanningSection } from '@/components/home/JourneyPlanningSection'
import { WhyChooseUs } from '@/components/home/WhyChooseUs'
import { Testimonials } from '@/components/home/Testimonials'
import { CallToAction } from '@/components/home/CallToAction'

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Combined Hero and Story Section */}
      <div className="relative">
        <Hero />
        {/* Hide TourStorytellingSection on mobile and tablet, show only on desktop (lg and above) */}
        <div className="hidden lg:block">
          <TourStorytellingSection />
        </div>
      </div>
      <TravelExpertise />
      <SocialProof />
      <JourneyPlanningSection />
      <WhyChooseUs />
      <Testimonials />
      <CallToAction />
    </div>
  )
}
