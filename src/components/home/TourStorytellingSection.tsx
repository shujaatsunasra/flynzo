'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { ArrowRight, MapPin, Clock, Users, Star, Camera, Heart, Compass, Plane, Mountain } from 'lucide-react'
import { useStoryElements } from '@/hooks/useSupabaseData'

const floatingElements = [
  { icon: Plane, delay: 0, duration: 20, path: 'M-100,100 Q400,50 900,200' },
  { icon: Mountain, delay: 5, duration: 25, path: 'M-50,300 Q500,150 1000,400' },
  { icon: Camera, delay: 10, duration: 18, path: 'M1000,100 Q500,250 -100,300' },
  { icon: Compass, delay: 15, duration: 22, path: 'M-80,500 Q600,200 1100,600' }
]

export default function TourStorytellingSection() {
  const { storyElements, loading, error } = useStoryElements()
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeStory, setActiveStory] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)

  // Always call hooks at the top level
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.2], [50, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1])

  // Mobile-optimized parallax transforms - moved before conditional returns
  const backgroundY = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "50%"] : ["0%", "100%"])
  const titleY = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "-25%"] : ["0%", "-50%"])
  const textScale = useTransform(scrollYProgress, [0, 0.5, 1], isMobile ? [1, 1.05, 0.95] : [1, 1.1, 0.9])
  
  // Additional transforms for scroll indicators
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])
  const scrollProgressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setActiveStory((prev) => (prev - 1 + storyElements.length) % storyElements.length)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        setActiveStory((prev) => (prev + 1) % storyElements.length)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [storyElements.length])

  // Device detection
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768)
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024)
    }

    checkDevice()
    window.addEventListener('resize', checkDevice)
    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  // Auto-advance stories
  useEffect(() => {
    if (storyElements.length === 0) return
    
    const interval = setInterval(() => {
      setActiveStory((prev) => (prev + 1) % storyElements.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [storyElements.length])

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return // Disable mouse tracking on mobile
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isMobile])

  if (loading) {
    return null
  }

  if (error || !storyElements.length) {
    return null
  }

  // Improved touch gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile && !isTablet) return
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    })
    setIsDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if ((!isMobile && !isTablet) || !isDragging) return

    const currentTouch = e.touches[0]
    const diffX = Math.abs(currentTouch.clientX - touchStart.x)
    const diffY = Math.abs(currentTouch.clientY - touchStart.y)
    
    // Prevent default scrolling for horizontal swipes
    if (diffX > diffY && diffX > 5) {
      e.preventDefault()
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if ((!isMobile && !isTablet) || !isDragging) return
    setIsDragging(false)
    
    const touchEnd = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY
    }
    
    const diffX = touchStart.x - touchEnd.x
    const diffY = touchStart.y - touchEnd.y
    
    // Enhanced swipe detection with better thresholds
    const minSwipeDistance = isMobile ? 40 : 60
    const maxYVariation = isMobile ? 80 : 120
    const velocityThreshold = Math.abs(diffX) > minSwipeDistance * 1.5

    if (Math.abs(diffX) > minSwipeDistance &&
        Math.abs(diffX) > Math.abs(diffY) * 1.5 &&
        Math.abs(diffY) < maxYVariation) {
      if (diffX > 0) {
        // Swipe left - next story
        setActiveStory((prev) => (prev + 1) % storyElements.length)
      } else {
        // Swipe right - previous story
        setActiveStory((prev) => (prev - 1 + storyElements.length) % storyElements.length)
      }
    } else if (velocityThreshold) {
      // Fast swipe detection for better responsiveness
      if (diffX > 0) {
        setActiveStory((prev) => (prev + 1) % storyElements.length)
      } else {
        setActiveStory((prev) => (prev - 1 + storyElements.length) % storyElements.length)
      }
    }
  }

  return (
    <div className="relative h-screen overflow-hidden bg-theme-dark">
      <div className="flex justify-center items-center min-h-[500px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {storyElements.map((story, index) => (
            <motion.div
              key={story.id}
              className="relative cursor-pointer transition-all duration-300"
              animate={{
                scale: activeStory === index ? 1.05 : 1,
                opacity: activeStory === index ? 1 : 0.8,
                y: activeStory === index ? -10 : 0,
              }}
              whileHover={{ scale: 1.1, y: -15 }}
              transition={{ duration: 0.3 }}
              onClick={() => setActiveStory(index)}
            >
              <div className="relative w-full h-64 rounded-3xl overflow-hidden shadow-2xl group">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  quality={90}
                />
                <div className="absolute inset-0 bg-theme-dark/40 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-xl font-bold mb-2">{story.title}</h3>
                    <p className="text-sm opacity-90">{story.subtitle}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}