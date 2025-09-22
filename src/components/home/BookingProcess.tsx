'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Calendar, CreditCard, Plane, CheckCircle, ArrowRight } from 'lucide-react'

const processSteps = [
  {
    step: "01",
    icon: MessageCircle,
    title: "Tell Us Your Dream",
    description: "Share your vision, preferences, and travel aspirations with our expert consultants.",
    details: "Free consultation • Personalized recommendations • No commitment required",
    color: "from-blue-500 to-cyan-500"
  },
  {
    step: "02", 
    icon: Calendar,
    title: "We Craft Your Itinerary",
    description: "Our local experts design a bespoke journey tailored to your unique interests.",
    details: "Custom itinerary • Local insights • Flexible modifications",
    color: "from-purple-500 to-pink-500"
  },
  {
    step: "03",
    icon: CreditCard,
    title: "Secure Your Journey",
    description: "Book with confidence using our secure payment system and flexible terms.",
    details: "Secure payments • ATOL protection • Flexible cancellation",
    color: "from-green-500 to-emerald-500"
  },
  {
    step: "04",
    icon: Plane,
    title: "Experience Magic",
    description: "Embark on your perfectly curated adventure with 24/7 support throughout.",
    details: "24/7 support • Local assistance • Memorable experiences",
    color: "from-orange-500 to-red-500"
  }
]

export function BookingProcess() {
  return (
    <section className="relative py-16 sm:py-20 md:py-32 bg-neutral-50 overflow-hidden hidden md:block">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-white to-neutral-50" />
        
        {/* Geometric shapes */}
        <div className="absolute inset-0 opacity-30">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-32 h-32 border border-neutral-200/50 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: 'translate(-50%, -50%)'
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 15 + Math.random() * 10,
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
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-6"
          >
            From Dream to Reality
            <span className="block text-neutral-600">in 4 Simple Steps</span>
          </motion.h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Our streamlined process transforms your travel dreams into unforgettable realities, 
            with expert guidance every step of the way.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-24 left-1/2 transform -translate-x-1/2 w-px h-full">
            <motion.div
              className="w-full bg-gradient-to-b from-neutral-300 to-neutral-200"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              transition={{ duration: 2, delay: 0.5 }}
              viewport={{ once: true }}
            />
          </div>

          <div className="space-y-16 md:space-y-24">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                className={`relative flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } gap-8 md:gap-16`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Step Content */}
                <div className="flex-1 max-w-lg">
                  <motion.div
                    className="relative bg-white rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-100"
                    whileHover={{ y: -5 }}
                  >
                    {/* Step Number */}
                    <div className="flex items-center mb-6">
                      <motion.div
                        className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-lg mr-4`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        {step.step}
                      </motion.div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-neutral-900">
                        {step.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-base sm:text-lg text-neutral-700 mb-4 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Details */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {step.details.split(' • ').map((detail, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-neutral-100 text-neutral-700"
                        >
                          <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                          {detail}
                        </span>
                      ))}
                    </div>

                    {/* Action Hint */}
                    <motion.div
                      className="flex items-center text-neutral-600 group cursor-pointer"
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-sm font-medium group-hover:text-neutral-900 transition-colors">
                        {index === 0 ? "Start your journey" : 
                         index === 1 ? "See sample itineraries" :
                         index === 2 ? "Secure booking" : "Begin adventure"}
                      </span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </motion.div>

                    {/* Decorative element */}
                    <motion.div
                      className={`absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r ${step.color} opacity-20`}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.4, 0.2]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    />
                  </motion.div>
                </div>

                {/* Step Icon */}
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center shadow-lg`}>
                    <step.icon className="w-12 h-12 md:w-16 md:h-16 text-white" />
                  </div>
                  
                  {/* Pulse effect */}
                  <motion.div
                    className={`absolute inset-0 rounded-full bg-gradient-to-r ${step.color} opacity-30`}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0, 0.3]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="btn-primary hover-effect text-lg px-12 py-4"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Start Planning Your Journey
            <ArrowRight className="w-5 h-5 ml-3" />
          </motion.button>
          <p className="text-sm text-neutral-600 mt-4">
            Free consultation • No commitment required • Response within 2 hours
          </p>
        </motion.div>
      </div>
    </section>
  )
}
