'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { MapPin, Clock, Thermometer, Users, Camera, Utensils, Mountain, Waves } from 'lucide-react'

const destinations = [
  {
    name: "Kashmir, India",
    tagline: "Paradise on Earth",
    description: "Where snow-capped mountains meet pristine lakes in perfect harmony",
    bestTime: "Apr - Jun, Sep - Nov",
    climate: "Temperate",
    population: "12.5 million",
    highlights: [
      { icon: Camera, text: "Stunning landscapes & houseboats" },
      { icon: Utensils, text: "Authentic Kashmiri cuisine" },
      { icon: Users, text: "Rich cultural heritage" },
      { icon: Mountain, text: "Snow-capped mountains" }
    ],
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop&crop=center",
    experiences: [
      "Shikara ride on Dal Lake",
      "Gulmarg gondola ride",
      "Pahalgam trekking",
      "Srinagar houseboat stay",
      "Sonamarg exploration",
      "Kashmiri handicraft shopping"
    ],
    localTips: [
      "Visit during spring for best weather",
      "Try authentic Wazwan cuisine",
      "Book houseboats in advance",
      "Respect local customs and traditions"
    ]
  },
  {
    name: "Goa, India",
    tagline: "Beach Paradise & Cultural Heritage",
    description: "Where Portuguese architecture meets pristine beaches",
    bestTime: "Nov - Mar",
    climate: "Tropical",
    population: "1.5 million",
    highlights: [
      { icon: Waves, text: "Pristine beaches" },
      { icon: Users, text: "Portuguese heritage" },
      { icon: Utensils, text: "Seafood cuisine" },
      { icon: Camera, text: "Colonial architecture" }
    ],
    image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=1200&h=800&fit=crop&crop=center",
    experiences: [
      "Beach hopping tour",
      "Portuguese heritage walk",
      "Spice plantation visit",
      "Water sports adventure",
      "Goan cooking class",
      "Night market exploration"
    ],
    localTips: [
      "Visit during winter season",
      "Try authentic Goan fish curry",
      "Bargain at flea markets",
      "Respect beach cleanliness"
    ]
  },
  {
    name: "Kerala, India",
    tagline: "God's Own Country",
    description: "Tropical paradise where backwaters and culture converge",
    bestTime: "Oct - Mar",
    climate: "Tropical monsoon",
    population: "33.4 million",
    highlights: [
      { icon: Waves, text: "Backwater cruises" },
      { icon: Mountain, text: "Tea plantations" },
      { icon: Users, text: "Ayurvedic treatments" },
      { icon: Utensils, text: "Spice cuisine" }
    ],
    image: "https://images.unsplash.com/photo-1583417319078-4a69db38a482?w=1200&h=800&fit=crop&crop=center",
    experiences: [
      "Backwater houseboat cruise",
      "Tea plantation tour",
      "Ayurvedic spa treatment",
      "Kathakali performance",
      "Kerala cooking class",
      "Wildlife sanctuary visit"
    ],
    localTips: [
      "Book houseboats in advance",
      "Try authentic Kerala meals",
      "Learn basic Malayalam phrases",
      "Respect temple traditions"
    ]
  }
]

export function DestinationInsights() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  return (
    <section ref={containerRef} className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-white overflow-hidden">
      <div className="container-width section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-neutral-100 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-4 sm:mb-6 border border-neutral-200">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-600" />
            <span className="text-neutral-700 font-medium text-sm sm:text-base">Destination Insights</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-4 sm:mb-6 leading-tight">
            Know Before You <span className="text-black">Go</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Get insider knowledge about our top destinations. From local customs to hidden gems, 
            we share everything you need to make the most of your adventure.
          </p>
        </motion.div>

        {/* Destination Cards - Mobile Optimized */}
        <div className="space-y-8 sm:space-y-12 md:space-y-16 lg:space-y-20">
          {destinations.map((destination, index) => (
            <DestinationCard
              key={index}
              destination={destination}
              index={index}
              isReversed={index % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function DestinationCard({ 
  destination, 
  index, 
  isReversed 
}: { 
  destination: typeof destinations[0]
  index: number
  isReversed: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", isReversed ? "15%" : "-15%"])
  const contentX = useTransform(scrollYProgress, [0, 1], ["0%", isReversed ? "3%" : "-3%"])

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative"
    >
      {/* Mobile-First Card Design */}
      <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-neutral-100">
        
        {/* Image Section - Mobile Optimized */}
        <motion.div
          className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden"
          style={{ y: imageY }}
        >
          <Image
            src={destination.image}
            alt={destination.name}
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
            quality={90}
          />
          
          {/* Modern Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Floating Badge */}
          <div className="absolute top-4 left-4">
            <div className="bg-white/90 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/20">
              <span className="text-xs font-semibold text-neutral-800">{destination.tagline}</span>
            </div>
          </div>
          
          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
              {destination.name}
            </h3>
            <p className="text-white/90 text-sm sm:text-base font-medium">
              {destination.description}
            </p>
          </div>
        </motion.div>

        {/* Content Section - Mobile Optimized */}
        <motion.div
          className="p-6 sm:p-8"
          style={{ x: contentX }}
        >
          {/* Quick Facts - Mobile Grid */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="bg-neutral-50 rounded-2xl p-3 sm:p-4 text-center border border-neutral-200/50 hover:border-neutral-300 transition-colors">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-600 mx-auto mb-2" />
              <div className="text-xs sm:text-sm font-semibold text-neutral-900 mb-1">Best Time</div>
              <div className="text-xs text-neutral-600 leading-tight">{destination.bestTime}</div>
            </div>
            <div className="bg-neutral-50 rounded-2xl p-3 sm:p-4 text-center border border-neutral-200/50 hover:border-neutral-300 transition-colors">
              <Thermometer className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-600 mx-auto mb-2" />
              <div className="text-xs sm:text-sm font-semibold text-neutral-900 mb-1">Climate</div>
              <div className="text-xs text-neutral-600 leading-tight">{destination.climate}</div>
            </div>
            <div className="bg-neutral-50 rounded-2xl p-3 sm:p-4 text-center border border-neutral-200/50 hover:border-neutral-300 transition-colors">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-600 mx-auto mb-2" />
              <div className="text-xs sm:text-sm font-semibold text-neutral-900 mb-1">Population</div>
              <div className="text-xs text-neutral-600 leading-tight">{destination.population}</div>
            </div>
          </div>

          {/* Highlights - Mobile Optimized */}
          <div className="mb-6 sm:mb-8">
            <h4 className="text-lg sm:text-xl font-bold text-neutral-900 mb-4 sm:mb-6">What Makes It Special</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {destination.highlights.map((highlight, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3 bg-white rounded-xl p-3 sm:p-4 border border-neutral-200/50 hover:border-neutral-300 hover:shadow-sm transition-all"
                >
                  <div className="w-8 h-8 bg-neutral-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <highlight.icon className="w-4 h-4 text-neutral-600" />
                  </div>
                  <span className="text-neutral-700 text-sm sm:text-base font-medium">{highlight.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Experiences - Mobile Optimized */}
          <div className="mb-6 sm:mb-8">
            <h4 className="text-lg sm:text-xl font-bold text-neutral-900 mb-4 sm:mb-6">Signature Experiences</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {destination.experiences.map((experience, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3 p-2 sm:p-3 bg-neutral-50 rounded-lg border border-neutral-200/50 hover:border-neutral-300 hover:bg-white transition-all"
                >
                  <div className="w-2 h-2 bg-neutral-400 rounded-full flex-shrink-0" />
                  <span className="text-neutral-600 text-sm sm:text-base">{experience}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Local Tips - Modern Design */}
          <div className="bg-neutral-50 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-neutral-200/50">
            <h4 className="text-lg sm:text-xl font-bold text-neutral-900 mb-4 sm:mb-6 flex items-center">
              <div className="w-6 h-6 bg-neutral-200 rounded-lg flex items-center justify-center mr-3">
                <span className="text-neutral-600 text-xs font-bold">💡</span>
              </div>
              Insider Tips
            </h4>
            <div className="space-y-3 sm:space-y-4">
              {destination.localTips.map((tip, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-3 p-3 bg-white rounded-xl border border-neutral-200/50 hover:border-neutral-300 hover:shadow-sm transition-all"
                >
                  <div className="w-2 h-2 bg-neutral-400 rounded-full flex-shrink-0 mt-2" />
                  <span className="text-neutral-700 text-sm sm:text-base leading-relaxed">{tip}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Buttons - Mobile Optimized */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button className="flex-1 bg-neutral-900 text-white font-semibold py-3 sm:py-4 px-6 rounded-xl hover:bg-neutral-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Explore {destination.name}
            </button>
            <button className="flex-1 bg-white border-2 border-neutral-300 text-neutral-700 font-semibold py-3 sm:py-4 px-6 rounded-xl hover:border-neutral-900 hover:text-neutral-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              View Itineraries
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
