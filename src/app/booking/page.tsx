import { BookingForm } from '@/components/booking/BookingForm'

export const metadata = {
  title: 'Book Your Dream Trip - Flynzo Tours',
  description: 'Plan your perfect getaway with Flynzo Tours. Book your dream vacation with our easy multi-step booking process and get personalized itineraries.',
}

export default function BookingPage() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      <BookingForm />
    </div>
  )
}
