'use client'

import { motion } from 'framer-motion'
import { MapPin, Users, Heart, Award } from 'lucide-react'

export function AboutHero() {
  return (
    <section className="relative py-20 bg-theme-dark text-theme-heading overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-theme-heading rounded-full" />
        <div className="absolute bottom-32 right-16 w-24 h-24 border border-theme-heading rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-theme-heading rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
              About <span className="text-secondary-400">Flynzo</span>
            </h1>
            <p className="text-xl md:text-2xl text-theme-heading/90 mb-8 leading-relaxed">
              We're passionate about creating extraordinary travel experiences that connect people with the world's most beautiful destinations.
            </p>
            <p className="text-lg text-theme-heading/80 mb-8 leading-relaxed">
              Since our founding in 2020, we've been dedicated to crafting personalized journeys that go beyond typical tourism. Our expert team designs each trip with meticulous attention to detail, ensuring every moment is memorable.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-1 text-theme-heading">50+</div>
                <div className="text-theme-heading/80">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1 text-theme-heading">10K+</div>
                <div className="text-theme-heading/80">Happy Travelers</div>
              </div>
            </div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Travel Adventure"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
              
              {/* Floating Cards - Responsive positioning */}
              <div className="absolute top-2 left-2 md:-top-6 md:-left-6 bg-theme-light rounded-lg p-3 md:p-4 shadow-lg">
                <MapPin className="w-6 h-6 md:w-8 md:h-8 text-primary-500 mb-1 md:mb-2" />
                <div className="text-theme-text font-semibold text-sm md:text-base">50+ Destinations</div>
              </div>
              
              <div className="absolute bottom-2 right-2 md:-bottom-6 md:-right-6 bg-theme-light rounded-lg p-3 md:p-4 shadow-lg">
                <Award className="w-6 h-6 md:w-8 md:h-8 text-secondary-500 mb-1 md:mb-2" />
                <div className="text-theme-text font-semibold text-sm md:text-base">Award Winning</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Core Values Preview */}
        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-theme-heading/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Expert Team</h3>
            <p className="text-theme-heading/80">Passionate travel experts with deep destination knowledge</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-theme-heading/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Personalized Care</h3>
            <p className="text-theme-heading/80">Every journey is crafted with your unique preferences in mind</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-theme-heading/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Quality Assured</h3>
            <p className="text-theme-heading/80">Committed to excellence in every aspect of your travel experience</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
