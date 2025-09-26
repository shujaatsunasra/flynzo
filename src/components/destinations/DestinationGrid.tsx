'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MapPin, Star, ArrowRight, Users, Calendar } from 'lucide-react'
import { useDestinations } from '@/hooks/useSupabaseData'

export function DestinationGrid() {
  const { destinations, loading, error } = useDestinations()

  if (loading) {
    return (
      <section className="py-16 bg-neutral-50 overflow-hidden" data-scroll-section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading destinations...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 bg-neutral-50 overflow-hidden" data-scroll-section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">Error loading destinations: {error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-neutral-50 overflow-hidden" data-scroll-section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Results Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-theme-text">Popular Destinations</h2>
            <p className="text-neutral-600">{destinations.length} destinations found</p>
          </div>
          <select className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
            <option>Sort by Popularity</option>
            <option>Sort by Price (Low to High)</option>
            <option>Sort by Price (High to Low)</option>
            <option>Sort by Rating</option>
          </select>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              className="card group cursor-pointer overflow-hidden hover-effect"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              {/* Image */}
              <div className="relative overflow-hidden h-64">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-theme-dark/70 via-transparent to-transparent" />
                
                {/* Overlay Info */}
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-neutral-700">
                    {destination.region}
                  </span>
                </div>
                
                <div className="absolute top-4 right-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-neutral-700">{destination.rating}</span>
                </div>

                 {/* Glassmorphism Text Overlay with Cursor Hover Effect */}
                 <div className="absolute bottom-0 left-0 right-0 bg-theme-dark/35 backdrop-blur-md border-t border-theme-heading/10 transition-all duration-600 ease-out group-hover:bg-theme-heading/35 group-hover:border-theme-heading/40">
                  <div className="p-4">
                    <h3 className="text-xl font-display font-bold text-theme-heading mb-1 transition-colors duration-600 ease-out group-hover:text-theme-text">{destination.name}</h3>
                    <p className="text-theme-heading/90 text-sm font-medium transition-colors duration-600 ease-out group-hover:text-theme-text/70">{destination.tours} tours available</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-neutral-600 mb-4 leading-relaxed">
                  {destination.description}
                </p>

                {/* Highlights */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {destination.highlights.slice(0, 3).map((highlight, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-primary-50 text-primary-600 px-2 py-1 rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                    {destination.highlights.length > 3 && (
                      <span className="text-xs text-neutral-500">
                        +{destination.highlights.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-neutral-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {destination.reviews} reviews
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {destination.tours} tours
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                  <div>
                    <span className="text-sm text-neutral-500">Starting from</span>
                    <div className="text-2xl font-bold text-primary-600">
                      ${destination.starting_price.toLocaleString()}
                    </div>
                  </div>
                  
                  <Link
                    href={`/destinations/${destination.id}`}
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors group-hover:translate-x-1 duration-300"
                  >
                    Explore
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <button className="btn-primary hover-effect">
            Load More Destinations
          </button>
        </motion.div>
      </div>
    </section>
  )
}
