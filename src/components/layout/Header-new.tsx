'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Plane, Menu, X, ArrowRight, Compass, MapPin, Phone, Mail } from 'lucide-react'

const navigation = [
  { name: 'Home', href: '/', icon: Compass },
  { name: 'About', href: '/about', icon: MapPin },
  { name: 'Destinations', href: '/destinations', icon: Compass },
  { name: 'Booking', href: '/booking', icon: Plane },
  { name: 'Contact', href: '/contact', icon: Phone },
]

export function HeaderNew() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHeroSection, setIsHeroSection] = useState(true)
  const pathname = usePathname()
  const headerRef = useRef<HTMLElement>(null)
  
  const { scrollY } = useScroll()
  const headerOpacity = useTransform(scrollY, [0, 50], [1, 1])
  const headerBlur = useTransform(scrollY, [0, 100], [0, 20])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50)
      setIsHeroSection(scrollPosition < window.innerHeight * 0.8)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      {/* Main Header */}
      <motion.header
        ref={headerRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-neutral-200/50' 
            : 'bg-transparent'
        }`}
        style={{
          backdropFilter: `blur(${headerBlur}px)`,
        }}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          duration: 0.3, 
          ease: [0.25, 0.1, 0.25, 1],
          delay: 0.05
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            
            {/* Logo Section */}
            <motion.div
              className="flex items-center space-x-3 group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.25 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/" className="flex items-center space-x-3">
                <motion.div 
                  className={`flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-500 ${
                    isScrolled 
                      ? 'bg-neutral-900 shadow-lg' 
                      : 'bg-white/20 backdrop-blur-md border border-white/30 shadow-xl'
                  }`}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.6 }
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Plane 
                    className={`w-6 h-6 transition-all duration-500 ${
                      isScrolled ? 'text-white' : 'text-white'
                    } transform rotate-45 group-hover:rotate-90`} 
                  />
                </motion.div>
                
                <motion.span 
                  className={`text-2xl font-bold tracking-tight transition-all duration-500 ${
                    isScrolled 
                      ? 'text-neutral-900' 
                      : 'text-white drop-shadow-2xl'
                  }`}
                  style={{ 
                    letterSpacing: '-0.02em', 
                    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                    fontWeight: 700
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  Flynzo
                </motion.span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item, index) => {
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 0.15 + index * 0.05, 
                      duration: 0.25,
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                  >
                    <Link
                      href={item.href}
                      className={`relative px-1 py-2 font-medium transition-all duration-300 group ${
                        isScrolled 
                          ? 'text-neutral-700 hover:text-neutral-900' 
                          : 'text-white/90 hover:text-white'
                      }`}
                    >
                      <span className="relative z-10">
                        {item.name}
                      </span>
                      
                      {/* Underline hover effect */}
                      <span
                        className={`absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 transition-all duration-300 group-hover:w-3/4 ${
                          isScrolled 
                            ? 'bg-neutral-900' 
                            : 'bg-white'
                        }`}
                      />
                    </Link>
                  </motion.div>
                )
              })}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.25 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/booking"
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-500 flex items-center space-x-2 ${
                    isScrolled 
                      ? 'bg-neutral-900 text-white hover:bg-neutral-800 shadow-lg hover:shadow-xl' 
                      : 'bg-white/20 text-white backdrop-blur-md border border-white/40 hover:bg-white/30 hover:border-white/60 shadow-xl hover:shadow-2xl'
                  }`}
                >
                  <span>Book Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={toggleMenu}
              className={`lg:hidden p-3 rounded-xl transition-all duration-500 ${
                isScrolled
                  ? 'text-neutral-900 hover:bg-neutral-100'
                  : 'text-white hover:bg-white/20 backdrop-blur-md'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.25 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isMenuOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  className="w-6 h-6 relative"
                >
                  {isMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Fullscreen Mobile Menu - Elementis Style */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Immersive Background */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-black to-neutral-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            />
            
            {/* Animated Background Pattern */}
            <motion.div
              className="absolute inset-0 opacity-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
            </motion.div>

            {/* Menu Content Container - Slides up from bottom */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-full flex flex-col bg-gradient-to-br from-neutral-900 via-black to-neutral-800"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ 
                duration: 0.4, 
                ease: [0.25, 0.1, 0.25, 1],
                type: "tween"
              }}
            >
              {/* Header Section */}
              <div className="flex justify-between items-center p-6 border-b border-white/10">
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <Link href="/" onClick={closeMenu} className="flex items-center space-x-3">
                    <motion.div 
                      className="flex items-center justify-center w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Plane className="w-7 h-7 text-white transform rotate-45" />
                    </motion.div>
                    <span 
                      className="text-2xl font-bold text-white tracking-tight"
                      style={{ 
                        fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                        fontWeight: 700,
                        letterSpacing: '-0.02em'
                      }}
                    >
                      Flynzo
                    </span>
                  </Link>
                </motion.div>

                <motion.button
                  onClick={closeMenu}
                  className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 hover:border-white/50 flex items-center justify-center text-white transition-all duration-300 shadow-xl"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, duration: 0.3, ease: 'backOut' }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 px-6 py-8 space-y-2">
                {navigation.map((item, index) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ 
                        delay: 0.3 + index * 0.1, 
                        duration: 0.3,
                        ease: [0.25, 0.1, 0.25, 1]
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className="block px-6 py-4 rounded-2xl font-medium text-white transition-all duration-300 relative group hover:bg-white/10 hover:backdrop-blur-md"
                      >
                        <motion.div
                          className="flex items-center justify-between"
                          whileHover={{ x: 4 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <div className="flex items-center space-x-4">
                            <Icon className="w-5 h-5" />
                            <span className="text-lg">{item.name}</span>
                          </div>
                          
                          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
                        </motion.div>
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>

              {/* CTA Section */}
              <motion.div
                className="px-6 pb-8"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.3 }}
              >
                <Link
                  href="/booking"
                  onClick={closeMenu}
                  className="block w-full py-4 px-6 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl text-white font-semibold text-lg text-center hover:bg-white/30 hover:border-white/50 transition-all duration-300 group shadow-xl"
                >
                  <motion.div
                    className="flex items-center justify-center space-x-3"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Book Your Adventure</span>
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Plane className="w-5 h-5 transform rotate-45 group-hover:rotate-90 transition-transform duration-300" />
                    </motion.div>
                  </motion.div>
                </Link>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                className="px-6 pb-8"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.3 }}
              >
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                  <div className="text-center space-y-4">
                    <p className="text-sm text-white/80">Ready to explore?</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-6">
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-white/80" />
                        <span className="text-white font-medium text-sm">+91 9773713859</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-white/80" />
                        <span className="text-white font-medium text-sm">Info.flynzo@gmail.com</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}