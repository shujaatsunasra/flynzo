'use client'

import { useEffect, useRef, useState } from 'react'

interface SmoothScrollProviderProps {
  children: React.ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const locomotiveScrollRef = useRef<any>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient || !scrollRef.current || typeof window === 'undefined') return

    const initializeScroll = async () => {
      try {
        const LocomotiveScroll = (await import('locomotive-scroll')).default
        
        // Detect device type for optimal scroll settings
        const isMobile = window.innerWidth < 768
        const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024
        
        const scroll = new LocomotiveScroll({
          el: scrollRef.current!,
          smooth: true,
          multiplier: isMobile ? 0.8 : isTablet ? 0.9 : 1,
          class: 'is-revealed',
          smartphone: {
            smooth: true
          },
          tablet: {
            smooth: true
          }
        })

        locomotiveScrollRef.current = scroll
      } catch (error) {
        console.warn('Locomotive Scroll failed to initialize:', error)
      }
    }

    initializeScroll()

    return () => {
      if (locomotiveScrollRef.current) {
        locomotiveScrollRef.current.destroy()
      }
    }
  }, [isClient])

  if (!isClient) {
    return <div className="w-full">{children}</div>
  }

  return (
    <div ref={scrollRef} data-scroll-container className="w-full">
      {children}
    </div>
  )
}
