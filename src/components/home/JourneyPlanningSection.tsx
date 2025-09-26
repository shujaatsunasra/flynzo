'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { MessageSquare, Calendar, MapPin, Plane, Camera, Heart, CheckCircle, Star, Clock, Users } from 'lucide-react'
import Image from 'next/image'

const planningSteps = [
  {
    step: "01",
    title: "Dream & Discover",
    subtitle: "Tell us your travel dreams",
    description: "Share your vision, preferences, and bucket list destinations. Our travel specialists listen to understand your unique travel style and aspirations.",
    destination: {
      name: "Kashmir, India",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
      quote: "Kashmir is not just a destination, it's a feeling. Every corner tells a story of beauty, culture, and unforgettable memories.",
      rating: 4.9,
      duration: "7-10 days",
      price: "From $1,299",
      highlights: ["Dal Lake Houseboat", "Gulmarg Gondola", "Pahalgam Valley", "Local Cuisine"]
    },
    pricing: {
      consultation: "Free",
      planning: "From $299",
      timeline: "2-3 days"
    },
    details: [
      "Personal consultation call",
      "Travel style assessment", 
      "Destination recommendations",
      "Budget planning guidance"
    ],
    color: "from-pink-500 to-rose-500"
  },
  {
    step: "02", 
    title: "Design & Customize",
    subtitle: "Craft your perfect itinerary",
    description: "We create a personalized itinerary tailored to your interests, timeline, and preferences. Every detail is carefully considered and customized.",
    destination: {
      name: "Goa, India",
      image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=400&h=300&fit=crop&crop=center",
      quote: "Goa offers the perfect blend of relaxation and adventure. From pristine beaches to vibrant nightlife, every moment is magical.",
      rating: 4.8,
      duration: "5-7 days",
      price: "From $899",
      highlights: ["Beach Resorts", "Water Sports", "Portuguese Heritage", "Seafood Delicacies"]
    },
    pricing: {
      consultation: "Included",
      planning: "From $199",
      timeline: "3-5 days"
    },
    details: [
      "Custom itinerary creation",
      "Activity recommendations",
      "Accommodation selection", 
      "Transportation planning"
    ],
    color: "from-blue-500 to-cyan-500"
  },
  {
    step: "03",
    title: "Book & Prepare", 
    subtitle: "Secure your adventure",
    description: "We handle all bookings, reservations, and logistics. You receive a comprehensive travel package with everything organized and confirmed.",
    destination: {
      name: "Kerala, India",
      image: "https://images.unsplash.com/photo-1583417319078-4a69db38a482?w=400&h=300&fit=crop&crop=center",
      quote: "Kerala's backwaters and hill stations offer a serene escape. It's where nature meets culture in perfect harmony.",
      rating: 4.9,
      duration: "6-8 days",
      price: "From $1,199",
      highlights: ["Backwater Cruises", "Tea Plantations", "Ayurvedic Spas", "Wildlife Sanctuaries"]
    },
    pricing: {
      consultation: "Included",
      planning: "From $149",
      timeline: "1-2 days"
    },
    details: [
      "All bookings confirmed",
      "Travel documentation",
      "Pre-departure briefing",
      "Emergency contacts provided"
    ],
    color: "from-green-500 to-emerald-500"
  },
  {
    step: "04",
    title: "Experience & Enjoy",
    subtitle: "Live your dream journey", 
    description: "Embark on your perfectly planned adventure with 24/7 support. Focus on creating memories while we ensure everything runs smoothly.",
    destination: {
      name: "Rajasthan, India",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=300&fit=crop&crop=center",
      quote: "Rajasthan is a royal experience like no other. Every palace, fort, and desert tells tales of grandeur and romance.",
      rating: 4.9,
      duration: "8-12 days",
      price: "From $1,599",
      highlights: ["Palace Hotels", "Desert Safaris", "Cultural Shows", "Royal Cuisine"]
    },
    pricing: {
      consultation: "Included", 
      planning: "From $99",
      timeline: "Ongoing"
    },
    details: [
      "24/7 travel support",
      "Local guide coordination",
      "Real-time assistance", 
      "Memory documentation"
    ],
    color: "from-purple-500 to-violet-500"
  }
]

const guarantees = [
  {
    icon: CheckCircle,
    title: "Best Price Guarantee",
    description: "Find a lower price elsewhere? We'll match it and give you an additional 5% off."
  },
  {
    icon: CheckCircle,
    title: "24/7 Support",
    description: "Round-the-clock assistance before, during, and after your trip."
  },
  {
    icon: CheckCircle,
    title: "Flexible Booking",
    description: "Free changes up to 30 days before departure on most bookings."
  },
  {
    icon: CheckCircle,
    title: "Travel Insurance",
    description: "Comprehensive coverage included with every booking for peace of mind."
  }
]

export function JourneyPlanningSection() {
  // Updated with tour destination images and hover cards
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  return (
    <section ref={containerRef} className="relative py-16 sm:py-24 md:py-32 bg-primary-50 overflow-hidden">
      {/* Background Elements */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500 rounded-full blur-3xl" />
      </motion.div>

      <div className="container-width section-padding relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <div className="inline-flex items-center space-x-2 bg-theme-text rounded-full px-6 py-3 mb-6">
            <MessageSquare className="w-5 h-5 text-theme-light" />
            <span className="text-theme-light font-medium">Your Journey Starts Here</span>
          </div>
          <h2 className="heading-lg mb-6">
            From Dream to <span className="text-blue-600">Reality</span>
          </h2>
          <p className="body-lg text-neutral-600 max-w-3xl mx-auto">
            Our proven 4-step process ensures your travel dreams become perfectly executed adventures. 
            Every detail is handled with care, precision, and your unique preferences in mind.
          </p>
        </motion.div>

        {/* Planning Steps */}
        <div className="space-y-16 sm:space-y-24 md:space-y-32 mb-16 sm:mb-20 md:mb-24">
          {planningSteps.map((step, index) => (
            <PlanningStep
              key={index}
              step={step}
              index={index}
              isReversed={index % 2 !== 0}
            />
          ))}
        </div>

        {/* Guarantees Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-theme-dark rounded-3xl p-12 text-center border border-theme-heading/20"
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-theme-heading mb-4">Our Promise to You</h3>
          <p className="text-base sm:text-lg md:text-xl text-theme-heading/90 mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed px-4">
            Travel with confidence knowing you're protected by our comprehensive guarantees and support system.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {guarantees.map((guarantee, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-theme-heading/5 rounded-2xl border border-theme-heading/10 hover:bg-theme-heading/10 transition-all duration-300"
              >
                <guarantee.icon className="w-14 h-14 text-theme-heading mx-auto mb-6" />
                <h4 className="text-theme-heading font-bold text-lg mb-3">{guarantee.title}</h4>
                <p className="text-theme-heading/80 text-base leading-relaxed">{guarantee.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function PlanningStep({ 
  step, 
  index, 
  isReversed 
}: { 
  step: typeof planningSteps[0]
  index: number
  isReversed: boolean
}) {
  const stepRef = useRef<HTMLDivElement>(null)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const { scrollYProgress } = useScroll({
    target: stepRef,
    offset: ["start end", "end start"]
  })

  const iconScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8])
  const iconRotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", isReversed ? "10%" : "-10%"])

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false)
    }, 150) // 150ms delay before hiding
  }

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])

  return (
    <motion.div
      ref={stepRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
      className={`grid sm:grid-cols-2 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center ${isReversed ? 'lg:grid-flow-col-dense' : ''}`}
    >
      {/* Tour Destination Section */}
      <motion.div
        className={`relative ${isReversed ? 'sm:col-start-2 lg:col-start-2' : ''}`}
        style={{ y: contentY }}
      >
        <div className="relative flex items-center justify-center">
          {/* Large Circle with Destination Image */}
          <motion.div
            className="w-80 h-80 rounded-full cursor-pointer group relative overflow-hidden shadow-2xl"
            style={{ scale: iconScale }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Destination Image */}
            <Image
              src={step.destination.image}
              alt={step.destination.name}
              width={320}
              height={320}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Glassmorphism Hover Overlay */}
            <motion.div
              className="absolute inset-0 bg-white/20 backdrop-blur-md flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-16 h-16 rounded-full bg-theme-dark/80 backdrop-blur-sm flex items-center justify-center shadow-lg">
                <MapPin className="w-8 h-8 text-white" />
              </div>
            </motion.div>
          </motion.div>
          
          {/* Step Number Circle */}
          <div className="absolute -top-8 -left-8 w-16 h-16 rounded-full bg-theme-text flex items-center justify-center shadow-lg">
            <span className="text-theme-light font-bold text-lg">{step.step}</span>
          </div>
        </div>

        {/* Destination Name */}
        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h4 className="text-lg font-bold text-theme-text mb-1">{step.destination.name}</h4>
          <p className="text-sm text-theme-text/70">{step.destination.duration}</p>
        </motion.div>

        {/* Detailed Tour Hover Card - Smart Positioning */}
        <motion.div
          className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-80 sm:w-96 z-50 sm:top-1/2 sm:left-full sm:ml-2 sm:lg:ml-4 sm:transform-none sm:mt-0 ${
            isReversed ? 'sm:left-auto sm:right-full sm:mr-2 sm:lg:mr-4' : ''
          }`}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            y: isHovered ? 0 : 20,
            scale: isHovered ? 1 : 0.95
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ pointerEvents: isHovered ? 'auto' : 'none' }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="bg-theme-dark/95 backdrop-blur-xl rounded-2xl p-6 border border-theme-heading/20 shadow-2xl">
            {/* Tour Header */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={step.destination.image}
                  alt={step.destination.name}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h5 className="font-bold text-theme-heading text-lg">{step.destination.name}</h5>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-theme-heading/90 text-sm ml-1">{step.destination.rating}</span>
                  </div>
                  <span className="text-theme-heading/60 text-sm">•</span>
                  <span className="text-theme-heading/90 text-sm">{step.destination.duration}</span>
                </div>
              </div>
            </div>

            {/* Pricing Info */}
            <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-theme-heading/10 rounded-xl">
              <div className="text-center">
                <div className="text-xs text-theme-heading/70 mb-1">Consultation</div>
                <div className="font-bold text-theme-heading text-sm">{step.pricing.consultation}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-theme-heading/70 mb-1">Planning</div>
                <div className="font-bold text-theme-heading text-sm">{step.pricing.planning}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-theme-heading/70 mb-1">Tour Price</div>
                <div className="font-bold text-theme-heading text-sm">{step.destination.price}</div>
              </div>
            </div>

            {/* Tour Highlights */}
            <div className="mb-4">
              <div className="text-xs text-theme-heading/70 mb-2">Tour Highlights</div>
              <div className="flex flex-wrap gap-2">
                {step.destination.highlights.map((highlight, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-theme-text/20 text-theme-heading text-xs rounded-full"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>

            {/* Tour Quote */}
            <div className="border-l-2 border-theme-heading/30 pl-4">
              <p className="text-theme-heading/90 text-sm italic mb-2">
                "{step.destination.quote}"
              </p>
              <div className="flex items-center justify-between">
                <span className="text-theme-heading/70 text-xs">Tour Experience</span>
                <button className="px-3 py-1 bg-theme-text text-theme-light text-xs rounded-full hover:bg-theme-text/80 transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Content */}
      <motion.div
        className={`space-y-4 ${isReversed ? 'sm:col-start-1 lg:col-start-1' : ''}`}
        style={{ y: contentY }}
      >
        <div>
          <div className="text-theme-text/70 font-medium mb-2">{step.subtitle}</div>
          <h3 className="heading-md mb-3">{step.title}</h3>
          <p className="body-lg text-theme-text/80 mb-6">{step.description}</p>
        </div>

        <div className="space-y-2">
          {step.details.map((detail, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + idx * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center space-x-3"
            >
              <CheckCircle className="w-5 h-5 text-theme-heading flex-shrink-0" />
              <span className="text-theme-text/80">{detail}</span>
            </motion.div>
          ))}
        </div>

        {index === planningSteps.length - 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            viewport={{ once: true }}
            className="pt-4"
          >
            <button className="btn-primary hover-effect">
              Start Planning Your Journey
            </button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}
