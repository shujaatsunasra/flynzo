'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Phone, Mail } from 'lucide-react'

export function CallToAction() {
  return (
    <section className="relative py-24 overflow-hidden bg-theme-light">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)'
        }}
      />
      <div className="absolute inset-0 bg-theme-dark/40 md:bg-theme-dark/70" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-theme-heading">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display font-bold text-theme-heading leading-tight mb-6">
            Ready for Your Next <span className="text-theme-heading">Adventure?</span>
          </h2>
          <p className="text-base sm:text-lg md:text-2xl text-theme-heading leading-relaxed max-w-3xl mx-auto mb-8 px-4">
            Don't wait any longer. Start planning your dream vacation today and create memories that will last a lifetime.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Link
            href="/booking"
            className="btn-primary text-sm sm:text-base md:text-lg hover-effect group px-6 sm:px-8 py-3 sm:py-4"
          >
            Book Your Trip
            <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 inline-block group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link
            href="/destinations"
            className="btn-secondary text-sm sm:text-base md:text-lg hover-effect group px-6 sm:px-8 py-3 sm:py-4"
          >
            Explore Destinations
          </Link>
        </motion.div>

        {/* Contact Options */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-12 px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center space-x-3 text-theme-heading bg-theme-heading/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-theme-heading/20">
            <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-theme-heading" />
            <span className="text-theme-heading font-medium text-lg">Call us: +91 9773713859, +91 9724287467</span>
          </div>
          <div className="flex items-center space-x-3 text-theme-heading bg-theme-heading/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-theme-heading/20">
            <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-theme-heading" />
            <span className="text-theme-heading font-medium text-lg">Email: Info.flynzo@gmail.com</span>
          </div>
        </motion.div>

        {/* Special Offer */}
        <motion.div
          className="mt-16 inline-block bg-theme-heading/15 backdrop-blur-md rounded-2xl p-8 border border-theme-heading/30 shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-theme-heading font-bold text-2xl mb-3">Special Offer!</div>
          <div className="text-theme-heading text-lg mb-2">
            Book now and get <span className="font-bold text-yellow-300 text-xl">15% OFF</span> on your first trip
          </div>
          <div className="text-theme-heading/80 text-sm">*Terms and conditions apply</div>
        </motion.div>
      </div>
    </section>
  )
}
