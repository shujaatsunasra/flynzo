'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Users, Award } from 'lucide-react'

const timelineEvents = [
  {
    year: '2020',
    title: 'Flynzo Founded',
    description: 'Started our journey with a vision to revolutionize travel experiences.',
    icon: Calendar,
    image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    year: '2021',
    title: 'First 1000 Travelers',
    description: 'Reached our first milestone of 1000 happy travelers across 15 destinations.',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    year: '2022',
    title: 'Global Expansion',
    description: 'Expanded to 30+ countries and established partnerships with local guides.',
    icon: MapPin,
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    year: '2023',
    title: 'Industry Recognition',
    description: 'Won "Best Travel Experience Provider" award for exceptional service.',
    icon: Award,
    image: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    year: '2024',
    title: '10K+ Happy Travelers',
    description: 'Celebrated serving over 10,000 travelers and expanding to 50+ destinations.',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    year: '2025',
    title: 'Future Vision',
    description: 'Continuing to innovate and create unforgettable travel experiences worldwide.',
    icon: MapPin,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  }
]

export function Timeline() {
  return (
    <section className="py-20 bg-white overflow-hidden" data-scroll-section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-theme-text mb-4">
            Our <span className="text-theme-text">Journey</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            From humble beginnings to becoming a trusted name in travel, here's our story
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative overflow-hidden">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-neutral-300" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineEvents.map((event, index) => {
              const Icon = event.icon
              const isEven = index % 2 === 0

              return (
                <motion.div
                  key={event.year}
                  className={`relative flex items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-row`}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-2 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-white shadow-lg z-10" />

                  {/* Content */}
                  <div className={`w-full md:w-5/12 ${isEven ? 'md:pr-8 pl-12' : 'md:pl-8 pl-12'} overflow-hidden`}>
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                            <Icon className="w-6 h-6 text-primary-600" />
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-primary-600">{event.year}</div>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-theme-text mb-3">{event.title}</h3>
                        <p className="text-neutral-600 leading-relaxed">{event.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Spacer for desktop layout */}
                  <div className="hidden md:block w-2/12" />
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-neutral-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-theme-text mb-4">
              Ready to Be Part of Our Story?
            </h3>
            <p className="text-neutral-600 mb-6">
              Join thousands of travelers who have trusted us with their dream vacations.
            </p>
            <button className="btn-primary hover-effect">
              Start Your Journey
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
