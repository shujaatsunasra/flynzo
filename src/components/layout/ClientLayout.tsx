'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { CustomCursor } from './CustomCursor'
import { Preloader } from './Preloader'
import { HeaderNew } from './Header-new'
import { Footer } from './Footer'

interface ClientLayoutProps {
  children: React.ReactNode
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const pathname = usePathname()
  const isBookingPage = pathname === '/booking'

  const handlePreloaderComplete = () => {
    setIsPreloaderComplete(true)
    setIsTransitioning(true)
  }

  return (
    <>
      {/* Premium Preloader with Fade Transition */}
      <AnimatePresence>
        {!isPreloaderComplete && (
          <Preloader onComplete={handlePreloaderComplete} />
        )}
      </AnimatePresence>

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Main Content with Professional Fade Entrance */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: isPreloaderComplete ? 1 : 0
        }}
        transition={{
          duration: isTransitioning ? 0.6 : 0,
          ease: [0.25, 0.46, 0.45, 0.94], // Professional cubic-bezier
          delay: isTransitioning ? 0 : 0
        }}
        className="relative"
      >
        {/* Conditional Header - Hide for booking page */}
        {!isBookingPage && <HeaderNew />}
        
        <motion.main
          className={`relative overflow-x-hidden ${
            isBookingPage 
              ? 'h-screen' 
              : 'min-h-screen pt-20'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: isTransitioning ? 1 : 0,
            y: isTransitioning ? 0 : 20
          }}
          transition={{
            duration: 0.8,
            delay: 0.1,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          {children}
        </motion.main>
        
        {/* Conditional Footer - Hide for booking page */}
        {!isBookingPage && <Footer />}
      </motion.div>
    </>
  )
}
