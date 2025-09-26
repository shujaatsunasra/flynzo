'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [cursorType, setCursorType] = useState<'default' | 'button' | 'link' | 'card' | 'tour'>('default')

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

  const getElementType = (element: EventTarget | null): 'default' | 'button' | 'link' | 'card' | 'tour' => {
    if (!element || !(element instanceof Element)) return 'default'
    
    const target = element as HTMLElement
    
    // Check for tour cards specifically
    if (target.closest('.tour-card') !== null || 
        target.closest('[data-tour]') !== null ||
        target.classList?.contains('destination-card') ||
        target.closest('.destination-card') !== null) {
      return 'tour'
    }
    
    // Check for buttons (including elements with btn- classes)
    if (target.tagName === 'BUTTON' || 
        target.closest('button') !== null ||
        target.classList.toString().includes('btn-')) {
      return 'button'
    }
    
    // Check for links
    if (target.tagName === 'A' || target.closest('a') !== null) {
      return 'link'
    }
    
    // Check for cards
    if (target.classList?.contains('card') || target.closest('.card') !== null) {
      return 'card'
    }
    
    // Check for general hover elements
    if (target.classList?.contains('hover-effect') === true) {
      return 'button'
    }
    
    return 'default'
  }

    const handleMouseEnter = (e: Event) => {
      const elementType = getElementType(e.target)
      if (elementType !== 'default') {
        setIsHovering(true)
        setCursorType(elementType)
      }
    }

    const handleMouseLeave = (e: Event) => {
      const elementType = getElementType(e.target)
      if (elementType !== 'default') {
        setIsHovering(false)
        setCursorType('default')
      }
    }

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseenter', handleMouseEnter, true)
    document.addEventListener('mouseleave', handleMouseLeave, true)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseenter', handleMouseEnter, true)
      document.removeEventListener('mouseleave', handleMouseLeave, true)
    }
  }, [])

  // Hide cursor on mobile devices
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (isMobile) return null

  // Different cursor effects based on element type
  const getCursorScale = () => {
    if (isClicking) return 0.8
    switch (cursorType) {
      case 'tour': return 2.5
      case 'button': return 2.2
      case 'link': return 1.8
      case 'card': return 1.6
      default: return isHovering ? 1.5 : 1
    }
  }

  const getCursorOpacity = () => {
    switch (cursorType) {
      case 'tour': return 0.95
      case 'button': return 0.9
      case 'link': return 0.7
      case 'card': return 0.6
      default: return isHovering ? 0.8 : 0.3
    }
  }

  return (
    <>
      {/* Outer Circle */}
      <motion.div
        className={`fixed top-0 left-0 w-8 h-8 rounded-full border-2 pointer-events-none z-[9999] ${
          cursorType === 'tour' ? 'border-theme-heading bg-theme-heading/20' :
          cursorType === 'button' ? 'border-theme-text bg-theme-text/10' :
          cursorType === 'link' ? 'border-theme-text bg-theme-text/5' :
          cursorType === 'card' ? 'border-theme-text/60 bg-theme-text/5' :
          'border-theme-text/50'
        }`}
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: getCursorScale(),
          opacity: getCursorOpacity(),
          rotate: (cursorType === 'button' || cursorType === 'tour') ? 45 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: (cursorType === 'button' || cursorType === 'tour') ? 200 : 150,
          damping: (cursorType === 'button' || cursorType === 'tour') ? 20 : 15,
          mass: 0.1,
        }}
      />
      
      {/* Inner Dot */}
      <motion.div
        className={`fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] ${
          cursorType === 'tour' ? 'bg-theme-heading' :
          cursorType === 'button' ? 'bg-theme-text' :
          cursorType === 'link' ? 'bg-theme-text' :
          cursorType === 'card' ? 'bg-theme-text/60' :
          'bg-theme-text'
        }`}
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isClicking ? 0.6 : isHovering ? 1.4 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 800,
          damping: 35,
          mass: 0.1,
        }}
      />
      
      {/* Special effect for buttons and tours */}
      {(cursorType === 'button' || cursorType === 'tour') && (
        <motion.div
          className={`fixed top-0 left-0 w-12 h-12 rounded-full border pointer-events-none z-[9998] ${
            cursorType === 'tour' ? 'border-theme-heading/20' : 'border-theme-text/10'
          }`}
          animate={{
            x: mousePosition.x - 24,
            y: mousePosition.y - 24,
            scale: isHovering ? 1 : 0,
            opacity: isHovering ? 0.3 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 20,
            mass: 0.2,
          }}
        />
      )}
    </>
  )
}
