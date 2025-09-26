'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Plane, MapPin, Compass } from 'lucide-react'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Destinations', href: '/destinations' },
  { name: 'Booking', href: '/booking' },
  { name: 'Contact', href: '/contact' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-theme-light/95 backdrop-blur-md shadow-lg border-b border-neutral-200' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 hover-effect group">
            <motion.div 
              className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ${
                scrolled ? 'bg-theme-dark' : 'bg-theme-heading/20 backdrop-blur-sm border border-theme-heading/30'
              }`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Plane className="w-6 h-6 text-theme-heading transform rotate-45 group-hover:rotate-90 transition-transform duration-300" />
            </motion.div>
            <motion.span 
              className={`text-2xl font-bold tracking-tight transition-all duration-300 ${
                scrolled ? 'text-theme-text' : 'text-theme-heading drop-shadow-lg'
              }`}
              style={{ letterSpacing: '-0.01em', fontFamily: 'Helvetica, Arial, sans-serif' }}
              whileHover={{ scale: 1.02 }}
            >
              Flynzo
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link
                  href={item.href}
                  className={`font-medium transition-all duration-300 hover-effect relative group ${
                    scrolled 
                      ? 'text-theme-text/70 hover:text-theme-text' 
                      : 'text-theme-heading/90 hover:text-theme-heading drop-shadow-sm'
                  } ${
                    pathname === item.href 
                      ? scrolled ? 'text-theme-text' : 'text-theme-heading'
                      : ''
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  {pathname === item.href && (
                    <motion.div
                      className={`absolute -bottom-2 left-0 w-full h-1 rounded-full transition-all duration-300 ${
                        scrolled ? 'bg-theme-text' : 'bg-theme-heading'
                      }`}
                      layoutId="underline"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  )}
                  <div className="absolute inset-0 bg-neutral-100 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg" />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/booking"
                className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 ${
                  scrolled 
                    ? 'bg-theme-light text-theme-text hover:bg-theme-light/90 shadow-lg' 
                    : 'bg-theme-heading/20 text-theme-heading backdrop-blur-sm border border-theme-heading/40 hover:bg-theme-heading/30 hover:border-theme-heading/60'
                }`}
              >
                Book Now
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button - Elementis Style */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-3 rounded-lg transition-all duration-300 hover-effect ${
              scrolled
                ? 'text-theme-text hover:bg-theme-light/90'
                : 'text-theme-heading hover:bg-theme-heading/20'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isOpen ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="w-6 h-6 relative"
              >
                {isOpen ? (
                  // Custom X icon - Elementis style
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                  >
                    <motion.path
                      d="M18 6L6 18M6 6l12 12"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </svg>
                ) : (
                  // Custom hamburger icon - Elementis style
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                  >
                    <motion.path
                      d="M3 12h18M3 6h18M3 18h18"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </svg>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Fullscreen Mobile Menu with Glassmorphism */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Glassmorphism Background */}
            <div className="absolute inset-0 bg-theme-dark/60 backdrop-blur-md" />
            
            {/* Menu Panel */}
            <motion.div
              className="absolute inset-y-0 right-0 w-full max-w-sm bg-theme-heading/10 backdrop-blur-xl border-l border-theme-heading/20 shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >

            {/* Close Button - Glassmorphism Style */}
            <motion.button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 w-12 h-12 rounded-xl bg-theme-heading/20 backdrop-blur-sm border border-theme-heading/30 hover:bg-theme-heading/30 hover:border-theme-heading/50 flex items-center justify-center text-theme-heading transition-all duration-300 shadow-lg"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1, duration: 0.3, ease: 'backOut' }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <motion.path
                  d="M18 6L6 18M6 6l12 12"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </svg>
            </motion.button>

            {/* Menu Content */}
            <div className="flex flex-col h-full px-6 py-8">
              {/* Logo Section */}
              <motion.div
                className="mb-12"
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center space-x-3">
                  <motion.div 
                    className="flex items-center justify-center w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 shadow-lg"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Plane className="w-7 h-7 text-white transform rotate-45" />
                  </motion.div>
                  <span className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                    Flynzo
                  </span>
                </Link>
              </motion.div>

              {/* Navigation Links */}
              <nav className="flex-1 space-y-3">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ 
                      delay: 0.2 + index * 0.1, 
                      duration: 0.4,
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 rounded-xl font-medium text-white transition-all duration-300 relative group ${
                        pathname === item.href 
                          ? 'bg-white/20 backdrop-blur-sm border border-white/30 text-white' 
                          : 'hover:bg-white/10 hover:backdrop-blur-sm'
                      }`}
                    >
                      <motion.span
                        className="relative z-10 flex items-center"
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        {item.name}
                        
                        {/* Active indicator */}
                        {pathname === item.href && (
                          <motion.div
                            className="ml-auto w-2 h-2 bg-white rounded-full"
                            layoutId="mobile-indicator"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                          />
                        )}
                      </motion.span>
                      
                      {/* Hover effect */}
                      <motion.div
                        className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={false}
                      />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* CTA Button */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="mb-6"
              >
                <Link
                  href="/booking"
                  onClick={() => setIsOpen(false)}
                  className="block w-full py-4 px-6 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white font-semibold text-base text-center hover:bg-white/30 hover:border-white/50 transition-all duration-300 group shadow-lg"
                >
                  <motion.span
                    className="flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Book Now</span>
                    <motion.div
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Plane className="w-4 h-4 transform rotate-45 group-hover:rotate-90 transition-transform duration-300" />
                    </motion.div>
                  </motion.span>
                </Link>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.4 }}
              >
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                  <p className="text-sm text-white/80 mb-1">Ready to explore?</p>
                  <p className="text-base font-semibold text-white">+91 9773713859</p>
                </div>
              </motion.div>
            </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
