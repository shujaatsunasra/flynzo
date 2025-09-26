'use client'

import { motion } from 'framer-motion'
import { Shield, Award, Heart, Clock, Plane, Users } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Safe & Secure',
    description: 'Your safety is our priority with comprehensive insurance and 24/7 support.',
    color: 'bg-theme-light text-theme-text'
  },
  {
    icon: Award,
    title: 'Award Winning',
    description: 'Recognized globally for our exceptional service and customer satisfaction.',
    color: 'bg-theme-light text-theme-text'
  },
  {
    icon: Heart,
    title: 'Personalized',
    description: 'Tailored experiences designed around your preferences and interests.',
    color: 'bg-theme-light text-theme-text'
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round-the-clock assistance whenever and wherever you need us.',
    color: 'bg-theme-light text-theme-text'
  },
  {
    icon: Plane,
    title: 'Best Routes',
    description: 'Carefully planned itineraries to maximize your travel experience.',
    color: 'bg-theme-light text-theme-text'
  },
  {
    icon: Users,
    title: 'Expert Guides',
    description: 'Professional local guides with deep knowledge of each destination.',
    color: 'bg-theme-light text-theme-text'
  }
]

export function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-theme-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-display text-theme-text mb-4">
            Why Choose <span className="text-theme-text">Flynzo</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto px-4">
            We're committed to providing exceptional travel experiences that exceed your expectations
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-xl font-bold text-theme-text mb-3 group-hover:text-primary-600 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-neutral-600 leading-relaxed max-w-sm mx-auto">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          className="mt-20 bg-theme-dark rounded-2xl p-8 md:p-12 text-theme-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">50+</div>
              <div className="text-neutral-300">Countries Covered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">10K+</div>
              <div className="text-neutral-300">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">500+</div>
              <div className="text-neutral-300">Tour Packages</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">98%</div>
              <div className="text-neutral-300">Satisfaction Rate</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
