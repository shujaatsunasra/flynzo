'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, MessageCircle, Headphones } from 'lucide-react'

const contactMethods = [
  {
    icon: Phone,
    title: 'Call Us',
    description: 'Speak with our travel experts',
    contact: '+91 9773713859',
    contact2: '+91 9724287467',
    hours: 'Mon-Fri: 10AM-6PM IST',
    action: 'Call Now'
  },
  {
    icon: Mail,
    title: 'Email Us',
    description: 'Send us your questions',
    contact: 'Info.flynzo@gmail.com',
    hours: 'We respond within 24 hours',
    action: 'Send Email'
  },
  {
    icon: MessageCircle,
    title: 'Live Chat',
    description: 'Chat with our support team',
    contact: 'Available on website',
    hours: 'Mon-Fri: 10AM-6PM IST',
    action: 'Start Chat'
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Emergency travel assistance',
    contact: '+91 9773713859',
    hours: 'Available 24/7',
    action: 'Emergency Line'
  }
]

const offices = [
  {
    city: 'Palanpur, Gujarat',
    address: 'Shop No.28, Alif Plaza, Shop B/143/28, 1st Floor\nKanodar, Banaskantha, Palanpur\nGujarat, India, 385520',
    phone: '+91 9773713859',
    email: 'Info.flynzo@gmail.com'
  },
  {
    city: 'Contact Person',
    address: 'Nashra, Nitin Mongroda\nFlynzo Innovation Private Limited',
    phone: '+91 9724287467',
    email: 'Info.flynzo@gmail.com'
  }
]

export function ContactInfo() {
  return (
    <section className="relative py-16 sm:py-20 md:py-24 bg-theme-dark text-theme-heading overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500 rounded-full blur-3xl" />
      </div>

      <div className="container-width section-padding relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center space-x-2 bg-theme-heading/10 rounded-full px-6 py-3 mb-6 border border-theme-heading/20">
            <MessageCircle className="w-5 h-5 text-theme-heading" />
            <span className="text-theme-heading font-medium">Get in Touch</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display mb-6 text-theme-heading">
            Ready to Start Your <span className="text-theme-light">Adventure?</span>
          </h1>
          <p className="body-lg text-theme-heading/90 max-w-3xl mx-auto">
            Our travel experts are here to help you plan the perfect trip. 
            Choose your preferred way to connect with us.
          </p>
        </motion.div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {contactMethods.map((method, index) => {
            const Icon = method.icon
            return (
              <motion.div
                key={index}
                className="bg-theme-heading/10 backdrop-blur-sm rounded-3xl p-6 sm:p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-theme-heading/20 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-theme-dark to-theme-dark/80 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8 text-theme-light" />
                </div>
                <h3 className="text-xl font-bold text-theme-heading mb-3">{method.title}</h3>
                <p className="text-theme-heading/80 text-sm mb-4">{method.description}</p>
                <div className="text-lg font-semibold text-theme-heading mb-1">{method.contact}</div>
                {method.contact2 && (
                  <div className="text-lg font-semibold text-theme-heading mb-2">{method.contact2}</div>
                )}
                <div className="text-theme-heading/70 text-sm mb-6">{method.hours}</div>
                <button className="btn-primary hover-effect w-full">
                  {method.action}
                </button>
              </motion.div>
            )
          })}
        </div>

        {/* Office Locations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16 sm:mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="heading-md mb-4 text-theme-heading">Our Office Locations</h2>
            <p className="body-lg text-theme-heading/90 max-w-2xl mx-auto">
              Visit us at our offices or get in touch with our dedicated team members.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {offices.map((office, index) => (
              <motion.div
                key={index}
                className="bg-theme-heading/10 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-theme-heading/20 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-theme-dark to-theme-dark/80 rounded-2xl flex items-center justify-center mr-4">
                    <MapPin className="w-6 h-6 text-theme-light" />
                  </div>
                  <h3 className="text-xl font-bold text-theme-heading">{office.city}</h3>
                </div>
                <div className="space-y-3 text-theme-heading/80">
                  <p className="whitespace-pre-line leading-relaxed">{office.address}</p>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-theme-heading/60" />
                    <span className="font-medium">{office.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-theme-heading/60" />
                    <span className="font-medium">{office.email}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Business Hours */}
        <motion.div
          className="bg-theme-heading/10 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-lg border border-theme-heading/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-theme-dark to-theme-dark/80 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Clock className="w-8 h-8 text-theme-light" />
            </div>
            <h3 className="heading-md mb-4 text-theme-heading">Business Hours</h3>
            <p className="body-lg text-theme-heading/90 max-w-2xl mx-auto">
              We're here to help you plan your perfect trip. Check our availability below.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-theme-heading/5 backdrop-blur-sm rounded-2xl p-6 border border-theme-heading/20">
              <h4 className="font-bold text-lg text-theme-heading mb-4 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-theme-dark to-theme-dark/80 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-theme-light text-sm">📞</span>
                </div>
                Regular Support
              </h4>
              <ul className="space-y-2 text-theme-heading/80">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-theme-dark rounded-full mr-3"></div>
                  Monday - Friday: 10:00 AM - 6:00 PM IST
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-theme-dark rounded-full mr-3"></div>
                  Saturday: 10:00 AM - 6:00 PM IST
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-neutral-400 rounded-full mr-3"></div>
                  Sunday: Closed
                </li>
              </ul>
            </div>
            <div className="bg-theme-heading/5 backdrop-blur-sm rounded-2xl p-6 border border-theme-heading/20">
              <h4 className="font-bold text-lg text-theme-heading mb-4 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-theme-dark to-theme-dark/80 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-theme-light text-sm">🚨</span>
                </div>
                Emergency Support
              </h4>
              <ul className="space-y-2 text-theme-heading/80">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-theme-dark rounded-full mr-3"></div>
                  24/7 Emergency Hotline
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-theme-dark rounded-full mr-3"></div>
                  Travel Assistance Available
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-theme-dark rounded-full mr-3"></div>
                  Worldwide Coverage
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
