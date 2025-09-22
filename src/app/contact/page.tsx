import { ContactForm } from '@/components/contact/ContactForm'
import { MapSection } from '@/components/contact/MapSection'
import { ContactInfo } from '@/components/contact/ContactInfo'

export const metadata = {
  title: 'Contact Us - Flynzo Tours',
  description: 'Get in touch with Flynzo Tours. We\'re here to help plan your perfect travel experience.',
}

export default function ContactPage() {
  return (
    <div className="overflow-x-hidden">
      <ContactInfo />
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <ContactForm />
        <MapSection />
      </div>
    </div>
  )
}
