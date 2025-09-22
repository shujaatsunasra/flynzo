'use client'

import { motion } from 'framer-motion'
import { Star, Quote, MapPin, Calendar, Users, TrendingUp } from 'lucide-react'
import Image from 'next/image'

const recentBookings = [
  {
    destination: "Kashmir, India",
    travelers: 2,
    timeAgo: "2 hours ago",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center"
  },
  {
    destination: "Goa, India",
    travelers: 4,
    timeAgo: "5 hours ago", 
    image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=400&h=300&fit=crop&crop=center"
  },
  {
    destination: "Kerala, India",
    travelers: 2,
    timeAgo: "1 day ago",
    image: "https://images.unsplash.com/photo-1583417319078-4a69db38a482?w=400&h=300&fit=crop&crop=center"
  },
  {
    destination: "Rajasthan, India", 
    travelers: 6,
    timeAgo: "2 days ago",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=300&fit=crop&crop=center"
  }
]

const testimonialHighlights = [
  {
    quote: "The most incredible journey of our lives. Every detail was perfect.",
    author: "Sarah & Michael",
    location: "Kashmir & Rajasthan",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616c0763c63?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  },
  {
    quote: "Flynzo turned our dream honeymoon into reality beyond our imagination.",
    author: "Emma Chen",
    location: "Maldives",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  },
  {
    quote: "Professional, caring, and absolutely exceptional service throughout.",
    author: "David Rodriguez",
    location: "Iceland Adventure",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  }
]

export function SocialProof() {
  return (
    <section className="relative py-20 md:py-28 bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-neutral-50/30 to-white" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Live Activity Feed */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <motion.div
              className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Live Booking Activity</span>
            </motion.div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-neutral-900">
              Travelers Are Booking Right Now
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentBookings.map((booking, index) => (
              <motion.div
                key={index}
                className="relative bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-neutral-100 hover:shadow-md transition-all duration-300 touch-manipulation"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                    <Image
                      src={booking.image}
                      alt={booking.destination}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-neutral-900 text-sm truncate">
                      {booking.destination}
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-neutral-600">
                      <Users className="w-3 h-3" />
                      <span>{booking.travelers} travelers</span>
                      <span>•</span>
                      <span>{booking.timeAgo}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonial Highlights */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
              What Our Travelers Say
            </h2>
            <div className="flex items-center justify-center space-x-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-lg font-semibold text-neutral-900">4.9/5</span>
            </div>
            <p className="text-neutral-600">Based on 2,847 verified reviews</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonialHighlights.map((testimonial, index) => (
              <motion.div
                key={index}
                className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-100 touch-manipulation"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-neutral-300 mb-4" />
                
                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-neutral-700 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center space-x-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900 text-sm">
                      {testimonial.author}
                    </p>
                    <p className="text-xs text-neutral-600 flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Metrics */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="space-y-2">
            <motion.div
              className="text-3xl md:text-4xl font-bold text-neutral-900"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              50K+
            </motion.div>
            <p className="text-sm text-neutral-600">Happy Travelers</p>
          </div>

          <div className="space-y-2">
            <motion.div
              className="text-3xl md:text-4xl font-bold text-neutral-900"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              150+
            </motion.div>
            <p className="text-sm text-neutral-600">Destinations</p>
          </div>

          <div className="space-y-2">
            <motion.div
              className="text-3xl md:text-4xl font-bold text-neutral-900"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: true }}
            >
              15+
            </motion.div>
            <p className="text-sm text-neutral-600">Years Experience</p>
          </div>

          <div className="space-y-2">
            <motion.div
              className="text-3xl md:text-4xl font-bold text-neutral-900"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
            >
              24/7
            </motion.div>
            <p className="text-sm text-neutral-600">Support</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
