'use client'

import { motion } from 'framer-motion'
import { CheckCircle, MessageCircle, Clock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface BookingSuccessProps {
  bookingData?: {
    destination: string
    customDestination?: string
    firstName: string
    lastName: string
    email: string
    phone: string
  }
}

export function BookingSuccess({ bookingData }: BookingSuccessProps) {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-md w-full">
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Success Icon */}
          <motion.div
            className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 200 }}
          >
            <CheckCircle className="w-10 h-10 text-green-600" />
          </motion.div>

          {/* Success Message */}
          <motion.h1
            className="text-2xl font-bold text-theme-text mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Booking Sent Successfully!
          </motion.h1>

          <motion.p
            className="text-neutral-600 mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            Your booking details have been sent to our travel expert via WhatsApp. 
            We'll get back to you within 24 hours with a personalized itinerary.
          </motion.p>

          {/* Booking Summary */}
          {bookingData && (
            <motion.div
              className="bg-neutral-50 rounded-xl p-4 mb-6 text-left"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <h3 className="font-semibold text-theme-text mb-2">Booking Summary:</h3>
              <div className="space-y-1 text-sm text-neutral-600">
                <p><strong>Name:</strong> {bookingData.firstName} {bookingData.lastName}</p>
                <p><strong>Destination:</strong> {bookingData.destination || bookingData.customDestination}</p>
                <p><strong>Contact:</strong> {bookingData.phone}</p>
              </div>
            </motion.div>
          )}

          {/* WhatsApp Info */}
          <motion.div
            className="bg-green-50 rounded-xl p-4 mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <div className="flex items-center justify-center mb-2">
              <MessageCircle className="w-5 h-5 text-green-600 mr-2" />
              <span className="font-semibold text-green-900">WhatsApp Contact</span>
            </div>
            <p className="text-green-800 text-sm">
              <strong>+91 8401271114</strong>
            </p>
            <p className="text-green-700 text-xs mt-1">
              Our travel expert will respond within 24 hours
            </p>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            className="space-y-3 mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <div className="flex items-center text-sm text-neutral-600">
              <Clock className="w-4 h-4 mr-2 text-blue-500" />
              <span>Check your WhatsApp for our response</span>
            </div>
            <div className="flex items-center text-sm text-neutral-600">
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
              <span>We'll create a personalized itinerary</span>
            </div>
            <div className="flex items-center text-sm text-neutral-600">
              <MessageCircle className="w-4 h-4 mr-2 text-blue-500" />
              <span>Receive detailed quote with no obligations</span>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
          >
            <Link
              href="/"
              className="inline-flex items-center justify-center w-full px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            
            <Link
              href="/destinations"
              className="inline-flex items-center justify-center w-full px-6 py-3 border border-neutral-300 text-neutral-700 rounded-xl hover:bg-neutral-50 transition-colors"
            >
              Explore More Destinations
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
