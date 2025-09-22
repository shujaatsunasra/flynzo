'use client'

import { motion } from 'framer-motion'
import { Award, Globe, Users, Shield, Clock, Star } from 'lucide-react'

const expertiseStats = [
  {
    icon: Globe,
    number: "150+",
    label: "Countries Covered",
    description: "From hidden gems to iconic destinations"
  },
  {
    icon: Users,
    number: "50,000+",
    label: "Happy Travelers",
    description: "Stories that speak for themselves"
  },
  {
    icon: Award,
    number: "15+",
    label: "Years of Excellence",
    description: "Crafting unforgettable journeys since 2008"
  },
  {
    icon: Shield,
    number: "24/7",
    label: "Support Coverage",
    description: "Your peace of mind, guaranteed"
  },
  {
    icon: Clock,
    number: "2 Hours",
    label: "Average Response",
    description: "Lightning-fast assistance worldwide"
  },
  {
    icon: Star,
    number: "4.9/5",
    label: "Customer Rating",
    description: "Excellence recognized globally"
  }
]

export function TravelExpertise() {
  return (
    <section className="relative py-16 sm:py-20 md:py-32 bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Subtle pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-50/50 to-white" />
        
        {/* Floating elements */}
        <div className="absolute inset-0">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-neutral-200/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-6"
            style={{ lineHeight: '1.1' }}
          >
            Why Travelers Choose
            <span className="block text-neutral-600">Our Expertise</span>
          </motion.h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Behind every great story is meticulous planning, local expertise, and unwavering commitment to your perfect journey.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          {expertiseStats.map((stat, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {/* Card Background */}
              <div className="relative bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-100 group-hover:border-neutral-200">
                {/* Icon */}
                <motion.div
                  className="w-12 h-12 md:w-16 md:h-16 bg-neutral-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-neutral-900 transition-colors duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-neutral-600 group-hover:text-white transition-colors duration-300" />
                </motion.div>

                {/* Number */}
                <motion.div
                  className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-2"
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  viewport={{ once: true }}
                >
                  {stat.number}
                </motion.div>

                {/* Label */}
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-neutral-800 mb-2">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
                  {stat.description}
                </p>

                {/* Hover accent */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-neutral-900 rounded-b-2xl"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
