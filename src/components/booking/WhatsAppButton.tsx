'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Check, ExternalLink, Eye } from 'lucide-react'

interface WhatsAppButtonProps {
  onClick: () => void
  disabled?: boolean
  isSubmitting?: boolean
  className?: string
  showPreview?: boolean
}

export function WhatsAppButton({ 
  onClick, 
  disabled = false, 
  isSubmitting = false, 
  className = '',
  showPreview = true
}: WhatsAppButtonProps) {
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    if (disabled || isSubmitting) return
    
    setIsClicked(true)
    onClick()
    
    // Reset animation after 2 seconds
    setTimeout(() => setIsClicked(false), 2000)
  }

  return (
    <motion.button
      onClick={handleClick}
      disabled={disabled || isSubmitting}
      className={`
        relative overflow-hidden rounded-xl px-8 py-4 font-semibold text-white
        bg-theme-text hover:bg-theme-text/80
        disabled:opacity-50 disabled:cursor-not-allowed
        shadow-lg hover:shadow-xl transform hover:scale-105
        transition-all duration-300 ease-out
        flex items-center justify-center space-x-3
        min-h-[56px] w-full sm:w-auto
        ${className}
      `}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background animation */}
      <motion.div
        className="absolute inset-0 bg-gray-700"
        initial={{ scale: 0, opacity: 0 }}
        animate={isClicked ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex items-center space-x-3">
        {isSubmitting ? (
          <>
            <motion.div
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <span>Processing...</span>
          </>
        ) : isClicked ? (
          <>
            <Check className="w-5 h-5" />
            <span>{showPreview ? 'Opening Preview...' : 'Opening WhatsApp...'}</span>
            <ExternalLink className="w-4 h-4" />
          </>
        ) : (
          <>
            {showPreview ? <Eye className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
            <span className="hidden sm:inline">
              {showPreview ? 'Preview & Send' : 'Send via WhatsApp'}
            </span>
            <span className="sm:hidden">
              {showPreview ? 'Preview' : 'WhatsApp'}
            </span>
            <ExternalLink className="w-4 h-4" />
          </>
        )}
      </div>
    </motion.button>
  )
}

// Mobile-optimized floating WhatsApp button
export function FloatingWhatsAppButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 bg-theme-text hover:bg-theme-text/80 text-theme-light p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.5 }}
    >
      <MessageCircle className="w-6 h-6" />
    </motion.button>
  )
}
