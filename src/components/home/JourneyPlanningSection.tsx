'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { MessageSquare, Calendar, MapPin, Plane, Camera, Heart, CheckCircle } from 'lucide-react'

const planningSteps = [
  {
    step: "01",
    title: "Dream & Discover",
    subtitle: "Tell us your travel dreams",
    description: "Share your vision, preferences, and bucket list destinations. Our travel specialists listen to understand your unique travel style and aspirations.",
    icon: Heart,
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
    icon: MapPin,
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
    icon: Calendar,
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
    icon: Plane,
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
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  return (
    <section ref={containerRef} className="relative py-16 sm:py-24 md:py-32 bg-primary-50 overflow-hidden hidden md:block">
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
          <div className="inline-flex items-center space-x-2 bg-neutral-900 rounded-full px-6 py-3 mb-6">
            <MessageSquare className="w-5 h-5 text-white" />
            <span className="text-white font-medium">Your Journey Starts Here</span>
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
          className="bg-neutral-900 rounded-3xl p-12 text-center border border-neutral-800"
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-4">Our Promise to You</h3>
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed px-4">
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
                className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <guarantee.icon className="w-14 h-14 text-green-400 mx-auto mb-6" />
                <h4 className="text-white font-bold text-lg mb-3">{guarantee.title}</h4>
                <p className="text-white/80 text-base leading-relaxed">{guarantee.description}</p>
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
  const { scrollYProgress } = useScroll({
    target: stepRef,
    offset: ["start end", "end start"]
  })

  const iconScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8])
  const iconRotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", isReversed ? "10%" : "-10%"])

  return (
    <motion.div
      ref={stepRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
      className={`grid lg:grid-cols-2 gap-16 items-center ${isReversed ? 'lg:grid-flow-col-dense' : ''}`}
    >
      {/* Icon Section */}
      <motion.div
        className={`relative ${isReversed ? 'lg:col-start-2' : ''}`}
        style={{ y: contentY }}
      >
        <div className="relative flex items-center justify-center">
          {/* Background Circle */}
          <motion.div
            className={`w-80 h-80 rounded-full bg-gradient-to-br ${step.color} opacity-10`}
            style={{ scale: iconScale }}
          />
          
          {/* Icon */}
          <motion.div
            className={`absolute w-32 h-32 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-2xl`}
            style={{ rotate: iconRotate }}
          >
            <step.icon className="w-16 h-16 text-white" />
          </motion.div>

          {/* Step Number */}
          <div className="absolute -top-8 -left-8 w-16 h-16 rounded-full bg-neutral-900 flex items-center justify-center">
            <span className="text-white font-bold text-lg">{step.step}</span>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        className={`space-y-6 ${isReversed ? 'lg:col-start-1' : ''}`}
        style={{ y: contentY }}
      >
        <div>
          <div className="text-neutral-500 font-medium mb-2">{step.subtitle}</div>
          <h3 className="heading-md mb-4">{step.title}</h3>
          <p className="body-lg text-neutral-600 mb-8">{step.description}</p>
        </div>

        <div className="space-y-3">
          {step.details.map((detail, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + idx * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center space-x-3"
            >
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-neutral-700">{detail}</span>
            </motion.div>
          ))}
        </div>

        {index === planningSteps.length - 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            viewport={{ once: true }}
            className="pt-6"
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
