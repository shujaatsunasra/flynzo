'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  Plane 
} from 'lucide-react'

const footerSections = [
  {
    title: 'Quick Links',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Destinations', href: '/destinations' },
      { name: 'Tours', href: '/tours' },
      { name: 'Contact', href: '/contact' },
    ]
  },
  {
    title: 'Support',
    links: [
      { name: 'Help Center', href: '/help' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Refund Policy', href: '/refund' },
    ]
  },
  {
    title: 'Popular Destinations',
    links: [
      { name: 'Kashmir, India', href: '/destinations/kashmir' },
      { name: 'Goa, India', href: '/destinations/goa' },
      { name: 'Kerala, India', href: '/destinations/kerala' },
      { name: 'Rajasthan, India', href: '/destinations/rajasthan' },
    ]
  }
]

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com', name: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com', name: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com', name: 'Instagram' },
]

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-6 sm:py-8 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 hover-effect mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-neutral-100 rounded-xl">
                <Plane className="w-6 h-6 text-neutral-900" />
              </div>
              <span className="text-xl sm:text-2xl font-bold font-display">Flynzo</span>
            </Link>
            <p className="text-sm text-neutral-400 mb-3 sm:mb-4 max-w-md hidden sm:block">
              Discover amazing domestic destinations across India with our expertly crafted tours.
            </p>
            
            {/* Contact Info - Simplified for Mobile */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400" />
                <span className="text-sm sm:text-base text-neutral-300">Info.flynzo@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3 hidden sm:flex">
                <Phone className="w-5 h-5 text-neutral-400" />
                <span className="text-neutral-300">+91 9773713859, +91 9724287467</span>
              </div>
            </div>
          </div>

          {/* Footer Sections - Simplified for Mobile */}
          {footerSections.slice(0, 2).map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={index === 2 ? 'hidden lg:block' : ''}
            >
              <h3 className="text-white font-semibold text-sm sm:text-base mb-2 sm:mb-3">{section.title}</h3>
              <ul className="space-y-2 sm:space-y-3">
                {section.links.slice(0, 3).map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-400 hover:text-neutral-200 transition-colors hover-effect"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
          
          {/* Show all sections on desktop */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-semibold text-base mb-3">{footerSections[2].title}</h3>
            <ul className="space-y-3">
              {footerSections[2].links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-neutral-200 transition-colors hover-effect"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Newsletter Section - Hidden on Mobile */}
        <div className="border-t border-neutral-800 py-4 sm:py-6 md:py-8 hidden sm:block">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">Stay Updated</h3>
              <p className="text-sm text-neutral-400">Subscribe to get special offers and travel tips.</p>
            </div>
            <div className="flex space-x-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-3 py-2 sm:px-4 sm:py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:border-transparent text-sm"
              />
              <button className="btn-primary px-4 py-2 sm:px-6 sm:py-3 whitespace-nowrap hover-effect text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer - Compact Mobile */}
        <div className="border-t border-neutral-800 py-3 sm:py-4 md:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <p className="text-neutral-400 text-xs sm:text-sm text-center sm:text-left">
              © 2025 Flynzo Innovation Private Limited. All rights reserved.
            </p>
            
            {/* Social Links - Smaller on Mobile */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-neutral-800 hover:bg-neutral-700 rounded-lg flex items-center justify-center transition-all duration-300 hover-effect group"
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
