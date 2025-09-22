'use client'

import { motion } from 'framer-motion'
import { Heart, Shield, Star, Users, Compass, Award } from 'lucide-react'

const values = [
  {
    icon: Heart,
    title: 'Passion for Travel',
    description: 'We believe travel has the power to transform lives and broaden perspectives. Our passion drives us to create exceptional experiences.',
    color: 'bg-red-100 text-red-600'
  },
  {
    icon: Shield,
    title: 'Safety First',
    description: 'Your safety and security are our top priorities. We maintain the highest standards and provide comprehensive support.',
    color: 'bg-green-100 text-green-600'
  },
  {
    icon: Star,
    title: 'Excellence',
    description: 'We strive for excellence in every detail, from planning to execution, ensuring your journey exceeds expectations.',
    color: 'bg-yellow-100 text-yellow-600'
  },
  {
    icon: Users,
    title: 'Customer-Centric',
    description: 'Every decision we make is with our travelers in mind. Your satisfaction and happiness are what motivate us daily.',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    icon: Compass,
    title: 'Adventure Spirit',
    description: 'We encourage exploration and discovery, helping you step out of your comfort zone to experience the extraordinary.',
    color: 'bg-purple-100 text-purple-600'
  },
  {
    icon: Award,
    title: 'Integrity',
    description: 'We operate with transparency, honesty, and ethical practices, building trust through our actions and commitment.',
    color: 'bg-indigo-100 text-indigo-600'
  }
]

export function Values() {
  return (
    <section className="py-20 bg-neutral-50 overflow-hidden" data-scroll-section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-neutral-900 mb-4">
            Our <span className="text-neutral-900">Values</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            The principles that guide everything we do and shape every experience we create
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${value.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-xl font-bold text-neutral-900 mb-4 group-hover:text-primary-600 transition-colors">
                  {value.title}
                </h3>
                
                <p className="text-neutral-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Mission Statement */}
        <motion.div
          className="mt-20 bg-neutral-900 rounded-3xl p-8 md:p-12 text-white text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold font-display mb-6">
              Our Mission
            </h3>
            <p className="text-lg md:text-xl leading-relaxed text-primary-50 mb-8">
              To create transformative travel experiences that connect people with diverse cultures, 
              breathtaking destinations, and unforgettable memories while promoting sustainable and 
              responsible tourism practices.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">50+</div>
                <div className="text-primary-200">Destinations Worldwide</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">10K+</div>
                <div className="text-primary-200">Satisfied Travelers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">98%</div>
                <div className="text-primary-200">Customer Satisfaction</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
