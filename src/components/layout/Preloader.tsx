'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plane, Mountain, MapPin, Compass } from 'lucide-react'

// Animation constants - faster timing
const GREETING_FADE_DURATION = 400    // Greeting fade in
const GREETING_HOLD_DURATION = 250   // Greeting hold time  
const CROSSFADE_DURATION = 400     // Crossfade between greetings

// Multilingual greetings for the travel theme
const greetings = [
  { text: 'Hello', lang: 'English' },
  { text: 'Bonjour', lang: 'French' },
  { text: 'Hola', lang: 'Spanish' },
  { text: 'Ciao', lang: 'Italian' },
  { text: 'こんにちは', lang: 'Japanese' },
  { text: 'Guten Tag', lang: 'German' },
  { text: 'Namaste', lang: 'Hindi' },
  { text: 'Olá', lang: 'Portuguese' },
  { text: 'Здравствуйте', lang: 'Russian' },
  { text: 'مرحبا', lang: 'Arabic' }
]

// Travel-themed micro-animations data
const travelElements = [
  { Icon: Plane, delay: 0, duration: 12, path: 'M-50,50 Q150,30 350,70' },
  { Icon: Mountain, delay: 3, duration: 15, path: 'M-30,80 Q200,60 380,100' },
  { Icon: MapPin, delay: 6, duration: 10, path: 'M-40,120 Q180,90 360,130' },
  { Icon: Compass, delay: 9, duration: 13, path: 'M-60,30 Q170,10 340,50' }
]

interface PreloaderProps {
  onComplete?: () => void
}

export function Preloader({ onComplete }: PreloaderProps = {}) {
  const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    // Greeting animation sequence with crossfade timing
    let timeoutId: NodeJS.Timeout

     const showNextGreeting = (index: number) => {
       if (index >= greetings.length) {
         // Perfect synchronization with main content fade-in
         setTimeout(() => {
           setIsVisible(false)
           setTimeout(() => {
             onComplete?.()
           }, 600) // Synchronized with fade transition
         }, 100) // Brief pause after last greeting

         return
       }

      setCurrentGreetingIndex(index)
      
      // Crossfade timing for smooth transitions
      const delay = index === 0 ? 
        GREETING_FADE_DURATION + GREETING_HOLD_DURATION : // First greeting
        CROSSFADE_DURATION // Subsequent greetings

      timeoutId = setTimeout(() => {
        showNextGreeting(index + 1)
      }, delay)
    }

    // Start the sequence
    showNextGreeting(0)

    // Fallback to ensure preloader doesn't get stuck
    const fallbackTimer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => {
        onComplete?.()
      }, 800)
    }, 5000) // Maximum 5 seconds

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      clearTimeout(fallbackTimer)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [onComplete, prefersReducedMotion])

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        className="preloader fixed inset-0 z-[10000] grid place-items-center overflow-hidden bg-black"
        initial={{ opacity: 1 }}
        exit={{
          opacity: 0,
          scale: 1,
          y: 0
        }}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      >
        {/* Travel-themed micro-animations background */}
        {!prefersReducedMotion && (
          <div className="absolute inset-0 overflow-hidden">
            {travelElements.map((element, index) => (
              <motion.div
                key={index}
                className="absolute opacity-5"
                initial={{ offsetDistance: '0%', opacity: 0 }}
                animate={{ 
                  offsetDistance: '100%', 
                  opacity: [0, 0.05, 0.05, 0] 
                }}
                transition={{
                  duration: element.duration,
                  delay: element.delay,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                style={{
                  offsetPath: `path('${element.path}')`,
                  offsetRotate: 'auto'
                }}
              >
                <element.Icon 
                  className="w-4 h-4 text-white" 
                  style={{
                    filter: 'blur(1px)',
                  }}
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Main content - Text only */}
        <div className="relative z-10">
          <div className="text-center">
           <AnimatePresence mode="wait">
             <motion.div
               key={currentGreetingIndex}
               className="text-white text-xl md:text-2xl lg:text-3xl font-raleway font-light tracking-wide"
               style={{
                 textShadow: '0 2px 20px rgba(255, 255, 255, 0.3)'
               }}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ 
                 duration: prefersReducedMotion ? 0.3 : GREETING_FADE_DURATION / 1000,
                 ease: 'easeInOut'
               }}
             >
               {greetings[currentGreetingIndex]?.text}
             </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Subtle shimmer effect */}
        {!prefersReducedMotion && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.02) 50%, transparent 70%)',
              backgroundSize: '200% 200%'
            }}
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%']
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  )
}