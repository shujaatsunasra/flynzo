'use client'

import { motion } from 'framer-motion'
import { Search, MapPin, Compass } from 'lucide-react'

export function DestinationHero() {
  return (
    <section className="relative py-20 bg-theme-dark text-theme-heading overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border border-theme-heading rounded-full animate-pulse" />
        <div className="absolute top-32 right-20 w-16 h-16 border border-theme-heading rounded-full animate-bounce" />
        <div className="absolute bottom-20 left-1/4 w-12 h-12 border border-theme-heading rounded-full animate-pulse" />
        <div className="absolute bottom-32 right-1/3 w-24 h-24 border border-theme-heading rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center mb-6">
            <Compass className="w-12 h-12 text-secondary-400 mr-4" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display">
              Discover <span className="text-secondary-400">Destinations</span>
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-theme-heading/90 max-w-3xl mx-auto mb-8 leading-relaxed">
            From bustling cities to serene beaches, from ancient cultures to modern marvels - 
            explore the world's most incredible destinations with Flynzo Tours.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-neutral-400" />
            </div>
            <input
              type="text"
              placeholder="Search destinations, countries, or experiences..."
              className="w-full pl-12 pr-4 py-4 text-lg bg-theme-light/95 backdrop-blur-sm border-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary-400 text-theme-text placeholder-theme-text/60"
            />
            <button className="absolute right-2 top-2 bg-theme-text hover:bg-theme-text/80 text-theme-light px-6 py-2 rounded-xl transition-colors hover-effect">
              Search
            </button>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-theme-heading/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-8 h-8" />
            </div>
            <div className="text-3xl font-bold mb-1">50+</div>
            <div className="text-theme-heading/80 text-sm">Destinations</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-theme-heading/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Compass className="w-8 h-8" />
            </div>
            <div className="text-3xl font-bold mb-1">6</div>
            <div className="text-theme-heading/80 text-sm">Continents</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-theme-heading/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-8 h-8" />
            </div>
            <div className="text-3xl font-bold mb-1">100+</div>
            <div className="text-theme-heading/80 text-sm">Cities</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-theme-heading/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Compass className="w-8 h-8" />
            </div>
            <div className="text-3xl font-bold mb-1">500+</div>
            <div className="text-theme-heading/80 text-sm">Experiences</div>
          </div>
        </motion.div>

        {/* Popular Destinations Preview */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-theme-heading/80 mb-4">Popular destinations:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Kashmir', 'Goa', 'Kerala', 'Rajasthan', 'Himachal Pradesh', 'Tamil Nadu', 'Uttarakhand', 'Karnataka'].map((destination) => (
              <button
                key={destination}
                className="bg-theme-heading/10 hover:bg-theme-heading/20 backdrop-blur-sm border border-theme-heading/20 text-theme-heading px-4 py-2 rounded-full text-sm transition-all hover-effect hover:scale-105"
              >
                {destination}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
