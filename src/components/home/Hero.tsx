'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight, Play, MapPin, Users, Calendar, Star, Compass, Globe, Camera, Heart } from 'lucide-react'
import Image from 'next/image'

export function Hero() {
  const [currentStory, setCurrentStory] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Minimal parallax effects - no separate scrolling
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0])

  const springConfig = { stiffness: 100, damping: 30 }
  const x = useSpring(mouseX, springConfig)
  const ySpring = useSpring(mouseY, springConfig)
  
  const stories = [
    {
      id: 1,
      title: "Where Stories",
      subtitle: "Come to Life",
      description: "Every destination has a story waiting to be discovered. From the snow-capped mountains of Kashmir to the pristine beaches of Goa, we don't just take you places—we immerse you in narratives that transform travel into transformation.",
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      overlayImage: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: "from-blue-600 via-purple-600 to-pink-600",
      accent: "text-blue-400",
      stats: [
        { icon: Globe, value: "127", label: "Destinations" },
        { icon: Users, value: "50K+", label: "Story Seekers" },
        { icon: Heart, value: "4.9", label: "Love Rating" },
      ]
    },
    {
      id: 2,
      title: "Craft Your",
      subtitle: "Adventure",
      description: "Your journey is uniquely yours. Our master storytellers and local experts collaborate to weave experiences that resonate with your soul. Each itinerary is a carefully crafted narrative where you're the protagonist.",
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      overlayImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: "from-emerald-600 via-teal-600 to-cyan-600",
      accent: "text-emerald-400",
      stats: [
        { icon: Compass, value: "15+", label: "Years Crafting" },
        { icon: Camera, value: "1M+", label: "Memories Made" },
        { icon: Star, value: "100%", label: "Satisfaction" },
      ]
    },
    {
      id: 3,
      title: "Beyond",
      subtitle: "Expectations",
      description: "We believe luxury isn't just about thread counts and champagne—it's about moments that take your breath away. Our curated experiences go beyond the ordinary, creating connections that last long after you return home.",
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      overlayImage: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: "from-orange-600 via-red-600 to-pink-600",
      accent: "text-orange-400",
      stats: [
        { icon: Heart, value: "Premium", label: "Experiences" },
        { icon: Users, value: "24/7", label: "Support" },
        { icon: Globe, value: "Limitless", label: "Possibilities" },
      ]
    }
  ]

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!isPlaying) return
    
    const interval = setInterval(() => {
      setCurrentStory((prev) => (prev + 1) % stories.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [stories.length, isPlaying])

  // Touch gesture handlers for mobile story navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isMobile) return
    const touchEnd = e.changedTouches[0].clientX
    const diff = touchStart - touchEnd
    
    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0) {
        // Swipe left - next story
        setCurrentStory((prev) => (prev + 1) % stories.length)
      } else {
        // Swipe right - previous story
        setCurrentStory((prev) => (prev - 1 + stories.length) % stories.length)
      }
    }
  }

  const handleMouseMove = (event: React.MouseEvent) => {
    if (isMobile) return // Disable mouse effects on mobile
    
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const mouseXPos = event.clientX - rect.left - centerX
    const mouseYPos = event.clientY - rect.top - centerY
    
    mouseX.set(mouseXPos * 0.1)
    mouseY.set(mouseYPos * 0.1)
  }

  return (
    <section 
      ref={containerRef}
      className="relative h-screen overflow-hidden -mt-20"
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Completely Static Background - No Motion */}
      <div className="absolute inset-0 w-full h-full">
        {stories.map((story, index) => (
          <div
            key={story.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1500 ${
              currentStory === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Main Background with Extra Coverage */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <Image
                src={story.image}
                alt={story.title}
                fill
                className="object-cover w-full h-full"
                style={{ 
                  minHeight: '110vh',
                  minWidth: '110vw',
                  transform: 'translate(-5%, -5%)'
                }}
                quality={100}
                priority={index === 0}
              />
            </div>
            
            {/* Blackish Glass Overlay - Match Preloader */}
            <div className="absolute inset-0 bg-theme-dark/60" />
            <div className="absolute inset-0 bg-gradient-to-b from-theme-dark/20 via-transparent to-theme-dark/40" />
            
          </div>
        ))}
      </div>

      {/* Floating Elements - Desktop Only */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        <motion.div
          className="absolute top-20 left-20 w-2 h-2 bg-theme-heading/20 rounded-full"
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 0 }}
        />
        <motion.div
          className="absolute top-40 right-32 w-1 h-1 bg-theme-heading/30 rounded-full"
          animate={{ 
            y: [0, -15, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute bottom-32 left-32 w-3 h-3 bg-theme-heading/10 rounded-full"
          animate={{ 
            y: [0, -25, 0],
            opacity: [0.1, 0.4, 0.1]
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* Main Content */}
      <motion.div 
        className="relative z-20 min-h-screen flex items-center"
        style={{ opacity }}
      >
        <div className="container-width section-padding">
          {/* Optimized Hero Layout */}
          <div className="flex flex-col items-center justify-center text-center min-h-screen py-12">
            
            {/* Main Content - Perfect Visual Hierarchy */}
            <motion.div
              key={currentStory}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="w-full max-w-5xl relative z-20"
            >
              {/* Brand Badge - Refined Spacing */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-theme-dark/40 backdrop-blur-md rounded-full px-4 py-2 border border-theme-heading/10 mb-8"
              >
                <Compass className="w-4 h-4 text-theme-heading" />
                <span className="text-theme-heading text-sm" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 700 }}>Flynzo Adventures</span>
              </motion.div>

              {/* Main Headline - Perfect Typography Scale */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="mb-8"
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-theme-heading leading-[0.95]" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)', fontFamily: 'Karatone, serif', fontWeight: 'normal' }}>
                  <span className="block mb-1">
                    {stories[currentStory].title}
                  </span>
                  <span className={`block ${stories[currentStory].accent}`}>
                    {stories[currentStory].subtitle}
                  </span>
                </h1>
              </motion.div>

              {/* Description - Optimized Readability */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="text-lg sm:text-xl md:text-2xl text-theme-heading/90 leading-relaxed max-w-3xl mx-auto mb-10 font-display"
                style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)', fontWeight: 300 }}
              >
                {stories[currentStory].description}
              </motion.p>

              {/* CTA Buttons - Perfect Spacing */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Link
                  href="/destinations"
                  className="inline-flex items-center justify-center px-8 py-4 text-base text-theme-text bg-theme-light rounded-lg hover:bg-theme-light/90 focus:outline-none focus:ring-2 focus:ring-theme-light/50 focus:ring-offset-2 focus:ring-offset-theme-dark transition-all duration-300 group shadow-lg hover:shadow-xl"
                  style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', fontWeight: 400 }}
                >
                  Start Your Story
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
                
                <button 
                  className="inline-flex items-center justify-center px-8 py-4 text-base text-theme-heading bg-theme-dark/20 backdrop-blur-sm border border-theme-heading/40 rounded-lg hover:bg-theme-dark/30 hover:border-theme-heading/60 focus:outline-none focus:ring-2 focus:ring-theme-heading/30 focus:ring-offset-2 focus:ring-offset-theme-dark transition-all duration-300 group shadow-lg hover:shadow-xl"
                  onClick={() => setIsPlaying(!isPlaying)}
                  style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', fontWeight: 400 }}
                >
                  <Play className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                  {isPlaying ? 'Pause Stories' : 'Play Stories'}
                </button>
              </motion.div>
            </motion.div>

            {/* Stats Section - Refined Spacing */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="hidden lg:block w-full max-w-4xl mt-16"
            >
              <div className="grid grid-cols-3 gap-6">
                {stories[currentStory].stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1.2 + index * 0.1 }}
                    className="bg-theme-heading/10 backdrop-blur-md rounded-xl p-6 border border-theme-heading/20 hover:bg-theme-heading/15 transition-all duration-300 text-center"
                  >
                    <div className="flex flex-col items-center space-y-3">
                      <stat.icon className="w-8 h-8 text-theme-heading" />
                      <div>
                        <div className="text-3xl text-theme-heading mb-1" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', fontWeight: 700 }}>{stat.value}</div>
                        <div className="text-theme-heading/70 text-sm font-display" style={{ fontWeight: 300 }}>{stat.label}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>


      {/* Modern Scroll Indicator - Desktop Only, Above Marquee */}
      <motion.div
        className="absolute bottom-36 sm:bottom-40 md:bottom-44 lg:bottom-48 xl:bottom-52 right-4 sm:right-8 z-30 hidden lg:block"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center space-y-3">
          {/* Enhanced scroll indicator with better visual design */}
          <div className="relative">
            <div className="w-6 h-10 border-2 border-theme-heading/50 rounded-full flex justify-center bg-theme-dark/20 backdrop-blur-sm shadow-lg">
              <motion.div
                className="w-1.5 h-3 bg-theme-heading rounded-full mt-2"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            {/* Subtle glow effect */}
            <div className="absolute inset-0 w-6 h-10 border border-theme-heading/20 rounded-full bg-gradient-to-b from-theme-heading/10 to-transparent" />
          </div>
          
          {/* Scroll text indicator */}
          <motion.div
            className="text-theme-heading/60 text-xs tracking-wider uppercase font-display"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ fontWeight: 300 }}
          >
            Scroll
          </motion.div>
        </div>
      </motion.div>


    </section>
  )
}
