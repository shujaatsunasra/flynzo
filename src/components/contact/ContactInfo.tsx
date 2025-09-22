'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, MessageCircle, Headphones } from 'lucide-react'

const contactMethods = [
  {
    icon: Phone,
    title: 'Call Us',
    description: 'Speak with our travel experts',
    contact: '+91 9773713859, +91 9724287467',
    hours: 'Mon-Fri: 9AM-6PM IST',
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
    hours: 'Mon-Fri: 9AM-6PM IST',
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
    <section className="py-20 bg-neutral-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
            Get in <span className="text-secondary-400">Touch</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Ready to start your next adventure? Our travel experts are here to help you plan the perfect trip.
          </p>
        </motion.div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {contactMethods.map((method, index) => {
            const Icon = method.icon
            return (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/15 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">{method.title}</h3>
                <p className="text-white/80 text-sm mb-3">{method.description}</p>
                <div className="text-lg font-semibold mb-1">{method.contact}</div>
                <div className="text-white/70 text-sm mb-4">{method.hours}</div>
                <button className="bg-neutral-100 hover:bg-neutral-200 text-neutral-900 px-4 py-2 rounded-lg font-medium transition-colors hover-effect">
                  {method.action}
                </button>
              </motion.div>
            )
          })}
        </div>

        {/* Office Locations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">Our Offices</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
              >
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{office.city}</h3>
                <div className="space-y-2 text-white/80">
                  <p className="whitespace-pre-line">{office.address}</p>
                  <p>{office.phone}</p>
                  <p>{office.email}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Business Hours */}
        <motion.div
          className="mt-16 text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Clock className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">Business Hours</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-2xl mx-auto">
            <div>
              <h4 className="font-semibold mb-2">Regular Support</h4>
              <ul className="space-y-1 text-white/80">
                <li>Monday - Friday: 9:00 AM - 6:00 PM IST</li>
                <li>Saturday: 10:00 AM - 4:00 PM IST</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Emergency Support</h4>
              <ul className="space-y-1 text-white/80">
                <li>24/7 Emergency Hotline</li>
                <li>Travel Assistance Available</li>
                <li>Worldwide Coverage</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
