'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MessageCircle, Copy, Check, ExternalLink } from 'lucide-react'
import { BookingData } from '@/lib/whatsapp'

interface MessagePreviewProps {
  bookingData: BookingData
  isOpen: boolean
  onClose: () => void
  onSend: () => void
  isSubmitting?: boolean
}

export function MessagePreview({ bookingData, isOpen, onClose, onSend, isSubmitting = false }: MessagePreviewProps) {
  const [isCopied, setIsCopied] = useState(false)
  
  const formatBookingForPreview = (data: BookingData): string => {
    const destination = data.destination || data.customDestination || 'Not specified'
    const travelersText = `${data.adults} Adult${data.adults > 1 ? 's' : ''}${data.children > 0 ? `, ${data.children} Child${data.children > 1 ? 'ren' : ''}` : ''}`
    
    // Format dates for better readability
    const formatDate = (dateString: string) => {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
    
    const departureDate = formatDate(data.departureDate)
    const returnDate = formatDate(data.returnDate)
    const duration = Math.ceil((new Date(data.returnDate).getTime() - new Date(data.departureDate).getTime()) / (1000 * 60 * 60 * 24))
    
    return `✨ *FLYNZO TRAVEL INQUIRY* ✨

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 *TRAVEL DESTINATION*
📍 ${destination}

📅 *TRAVEL ITINERARY*
🗓️ *Departure:* ${departureDate}
🗓️ *Return:* ${returnDate}
⏱️ *Duration:* ${duration} ${duration === 1 ? 'day' : 'days'}

👥 *TRAVEL GROUP*
👨‍👩‍👧‍👦 *Total Travelers:* ${travelersText}
${data.roomType ? `🏨 *Accommodation:* ${data.roomType.charAt(0).toUpperCase() + data.roomType.slice(1)} Room` : ''}

👤 *CUSTOMER DETAILS*
📝 *Name:* ${data.firstName} ${data.lastName}
📧 *Email:* ${data.email}
📱 *Phone:* ${data.phone}
${data.address ? `🏠 *Address:* ${data.address}` : ''}
${data.emergencyContact ? `🚨 *Emergency Contact:* ${data.emergencyContact}` : ''}

${data.specialRequests ? `📋 *SPECIAL REQUIREMENTS*\n${data.specialRequests}\n` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⏰ *Inquiry Received:* ${new Date().toLocaleString('en-IN', { 
      timeZone: 'Asia/Kolkata',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })}

🎯 *PRIORITY:* HIGH
🚀 *Action Required:* Please contact customer within 2 hours

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Thank you for choosing Flynzo! 🌟`
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formatBookingForPreview(bookingData))
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">WhatsApp Message Preview</h3>
                  <p className="text-sm text-slate-600">Review your booking details before sending</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Message Content */}
            <div className="p-6 max-h-96 overflow-y-auto">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <pre className="whitespace-pre-wrap text-sm text-slate-700 font-mono leading-relaxed">
                  {formatBookingForPreview(bookingData)}
                </pre>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between p-6 border-t border-slate-200 bg-slate-50">
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleCopy}
                  className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span className="text-sm font-medium">Copy Message</span>
                    </>
                  )}
                </button>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={onSend}
                  disabled={isSubmitting}
                  className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-4 h-4" />
                      <span>Send via WhatsApp</span>
                      <ExternalLink className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
