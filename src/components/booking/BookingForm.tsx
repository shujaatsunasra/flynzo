'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { 
  MapPin, 
  Calendar, 
  Users, 
  Settings, 
  User, 
  Check, 
  ChevronRight,
  ChevronLeft,
  Plane,
  MessageCircle,
  AlertCircle,
  Loader2,
  Clock,
  Globe,
  Heart,
  Star,
  ArrowLeft,
  Home
} from 'lucide-react'
import { sendToWhatsApp, validateBookingData, type BookingData } from '@/lib/whatsapp'
import { WhatsAppButton } from './WhatsAppButton'
import { MessagePreview } from './MessagePreview'

type FormData = {
  destination: string
  customDestination: string
  departureDate: string
  returnDate: string
  adults: number
  children: number
  roomType: string
  specialRequests: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  emergencyContact: string
}

const steps = [
  { id: 1, name: 'Destination', icon: MapPin, description: 'Where would you like to go?', color: 'bg-theme-dark/50' },
  { id: 2, name: 'Dates & Travelers', icon: Calendar, description: 'When and how many?', color: 'bg-theme-dark/50' },
  { id: 3, name: 'Preferences', icon: Settings, description: 'Customize your experience', color: 'bg-theme-dark/50' },
  { id: 4, name: 'Contact Info', icon: User, description: 'Your details', color: 'bg-theme-dark/50' },
  { id: 5, name: 'Review', icon: Check, description: 'Confirm your booking', color: 'bg-theme-dark/50' }
]

const popularDestinations = [
  { name: 'Kashmir, India', icon: '🏔️', description: 'Paradise on Earth' },
  { name: 'Goa, India', icon: '🏖️', description: 'Beach Paradise' },
  { name: 'Kerala, India', icon: '🌴', description: 'God\'s Own Country' },
  { name: 'Rajasthan, India', icon: '🏰', description: 'Royal Heritage' },
  { name: 'Himachal Pradesh, India', icon: '⛰️', description: 'Mountain Retreat' },
  { name: 'Tamil Nadu, India', icon: '🏛️', description: 'Cultural Heritage' },
  { name: 'Uttarakhand, India', icon: '🕉️', description: 'Spiritual Journey' },
  { name: 'Karnataka, India', icon: '🌊', description: 'Coastal Beauty' }
]

export function BookingForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [validationIssues, setValidationIssues] = useState<string[]>([])
  const [hasValidationErrors, setHasValidationErrors] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showMessagePreview, setShowMessagePreview] = useState(false)
  const { register, handleSubmit, watch, formState: { errors }, trigger, setValue } = useForm<FormData>()

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const nextStep = async () => {
    const currentStepData = watch()
    let stepValidation = { isValid: true, errors: [] as string[] }
    
    // Step-specific validation
    if (currentStep === 1) {
      // Only validate destination for step 1
      if (!currentStepData.destination && !currentStepData.customDestination) {
        stepValidation = { isValid: false, errors: ['Please select or enter a destination'] }
      }
    } else if (currentStep === 2) {
      // Validate dates and travelers for step 2
      if (!currentStepData.departureDate) {
        stepValidation.errors.push('Please select your departure date')
      }
      if (!currentStepData.returnDate) {
        stepValidation.errors.push('Please select your return date')
      }
      if (currentStepData.departureDate && currentStepData.returnDate) {
        const departure = new Date(currentStepData.departureDate)
        const returnDate = new Date(currentStepData.returnDate)
        
        if (departure >= returnDate) {
          stepValidation.errors.push('Return date should be after departure date')
        }
        
        if (departure < new Date()) {
          stepValidation.errors.push('Please select a future departure date')
        }
      }
      if (!currentStepData.adults || currentStepData.adults < 1) {
        stepValidation.errors.push('Please select at least 1 adult traveler')
      }
      stepValidation.isValid = stepValidation.errors.length === 0
    } else if (currentStep === 3) {
      // Step 3 (preferences) has no required fields, so always valid
      stepValidation = { isValid: true, errors: [] }
    } else if (currentStep === 4) {
      // Validate contact info for step 4
      if (!currentStepData.firstName?.trim()) {
        stepValidation.errors.push('Please enter your first name')
      }
      if (!currentStepData.lastName?.trim()) {
        stepValidation.errors.push('Please enter your last name')
      }
      if (!currentStepData.email?.trim()) {
        stepValidation.errors.push('Please enter your email address')
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentStepData.email)) {
        stepValidation.errors.push('Please enter a valid email address')
      }
      if (!currentStepData.phone?.trim()) {
        stepValidation.errors.push('Please enter your phone number')
      } else if (!/^[\+]?[0-9\s\-\(\)]{10,}$/.test(currentStepData.phone.replace(/\s/g, ''))) {
        stepValidation.errors.push('Please enter a valid phone number')
      }
      stepValidation.isValid = stepValidation.errors.length === 0
    }
    
    if (!stepValidation.isValid) {
      setValidationIssues(stepValidation.errors)
      setHasValidationErrors(true)
      toast.error('Please address the issues before proceeding')
      return
    }
    
    setValidationIssues([])
    setHasValidationErrors(false)
    
    // Trigger form validation for current step
    const isValid = await trigger()
    if (isValid && currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setValidationIssues([])
      setHasValidationErrors(false)
    }
  }

  const handlePreviewMessage = () => {
    const data = watch()
    const validation = validateBookingData(data)
    if (!validation.isValid) {
      setValidationIssues(validation.errors)
      setHasValidationErrors(true)
      toast.error('Please complete all required fields before previewing')
      return
    }
    setValidationIssues([])
    setHasValidationErrors(false)
    setShowMessagePreview(true)
  }

  const handleSendMessage = async () => {
    const data = watch()
    setIsSubmitting(true)
    setShowMessagePreview(false)
    
    try {
      const result = await sendToWhatsApp(data as BookingData)
      
      if (result.success) {
        toast.success('Booking inquiry sent successfully! Our team will contact you within 2 hours.', {
          duration: 5000,
          icon: '✅',
          style: {
            background: '#2B3530',
            color: 'white',
            fontSize: '16px',
            padding: '16px',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(43, 53, 48, 0.3)'
          }
        })
      } else {
        toast.error('WhatsApp API unavailable. Please try again or contact us directly.', {
          duration: 4000,
          icon: '⚠️',
          style: {
            background: '#2B3530',
            color: 'white',
            fontSize: '16px',
            padding: '16px',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(43, 53, 48, 0.3)'
          }
        })
      }
      
      // Reset form after successful submission
      setTimeout(() => {
        setCurrentStep(1)
        window.location.reload()
      }, 3000)
      
    } catch (error) {
      console.error('Booking submission error:', error)
      toast.error('Something went wrong. Please try again or contact us directly.', {
        duration: 4000,
        icon: '❌',
        style: {
          background: '#EF4444',
          color: 'white',
          fontSize: '16px',
          padding: '16px',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(239, 68, 68, 0.3)'
        }
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const onSubmit = async (data: FormData) => {
    // This function is now handled by handleSendMessage
    handleSendMessage()
  }

  const watchedValues = watch()

  return (
    <div className={`${hasValidationErrors ? 'min-h-screen' : 'h-screen'} bg-gradient-to-br from-theme-light via-theme-light to-theme-light ${hasValidationErrors ? 'overflow-auto' : 'overflow-hidden'}`}>
      <section className={`relative ${hasValidationErrors ? 'min-h-full' : 'h-full'} flex flex-col`}>
        {/* Back Button - Top Left */}
        <motion.div
          className="absolute top-4 left-4 z-10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-theme-light/80 backdrop-blur-sm border border-theme-heading/20 rounded-xl hover:bg-theme-light hover:border-theme-text transition-all duration-300 group shadow-sm hover:shadow-md"
            aria-label="Return to home page"
          >
            <ArrowLeft className="w-4 h-4 text-theme-text group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="text-sm font-medium text-theme-text hidden sm:inline">Back to Home</span>
            <Home className="w-4 h-4 text-theme-text sm:hidden" />
          </Link>
        </motion.div>

        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col ${hasValidationErrors ? 'py-4 pb-8' : 'py-4'}`}>
          {/* Header */}
          <motion.div
            className="text-center mb-6 sm:mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center justify-center mb-2">
              <div className="bg-gradient-to-r from-theme-text to-theme-text rounded-2xl p-2 shadow-xl">
                <Plane className="w-5 h-5 sm:w-6 sm:h-6 text-theme-heading" />
              </div>
            </div>
            
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-theme-text to-theme-text/80 bg-clip-text text-transparent mb-1">
              Book Your Dream Trip
            </h1>
            <p className="text-xs sm:text-sm text-theme-text/70 max-w-xl mx-auto leading-relaxed mb-6">
              Tell us about your perfect getaway and we'll create a personalized itinerary just for you
            </p>
          </motion.div>

          {/* Progress Steps */}
          <motion.div 
            className="mb-6 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              {/* Mobile Progress Bar */}
              {isMobile && (
                <div className="mb-6">
                  <div className="flex justify-between text-xs text-theme-text/70 mb-2">
                    <span className="font-medium">Step {currentStep} of {steps.length}</span>
                    <span className="font-semibold">{Math.round((currentStep / steps.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-theme-heading/20 rounded-full h-2">
                    <motion.div
                      className="h-2 rounded-full bg-theme-text"
                      initial={{ width: 0 }}
                      animate={{ width: `${(currentStep / steps.length) * 100}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                </div>
              )}

              {/* Desktop Progress Steps */}
              {!isMobile && (
                <div className="flex items-center justify-between">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center flex-1">
                      <div className="flex flex-col items-center space-y-2">
                        <motion.div
                          className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
                            currentStep >= step.id
                              ? 'bg-theme-text text-theme-light shadow-lg'
                              : 'bg-theme-heading/10 text-theme-text/50'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {currentStep > step.id ? (
                            <Check className="w-5 h-5" />
                          ) : (
                            <step.icon className="w-5 h-5" />
                          )}
                          {currentStep === step.id && (
                            <motion.div
                              className="absolute inset-0 rounded-xl bg-theme-text/30"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                          )}
                        </motion.div>
                        <div className="text-center min-w-0">
                          <div className="text-xs font-semibold text-theme-text">{step.name}</div>
                          <div className="text-xs text-theme-text/60 hidden lg:block">{step.description}</div>
                        </div>
                      </div>
                      {index < steps.length - 1 && (
                        <motion.div
                          className={`flex-1 h-0.5 mx-4 transition-all duration-500 ${
                            currentStep > step.id 
                              ? 'bg-theme-text' 
                              : 'bg-theme-heading/20'
                          }`}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: currentStep > step.id ? 1 : 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Validation Errors */}
          <AnimatePresence>
            {validationIssues.length > 0 && (
              <motion.div
                className="mb-6 bg-theme-light border border-theme-heading/20 rounded-2xl p-6 shadow-sm"
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <AlertCircle className="w-6 h-6 text-theme-text" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-theme-text font-semibold mb-3 text-lg">Please address the following issues:</h4>
                    <ul className="text-theme-text/80 space-y-2">
                      {validationIssues.map((error, index) => (
                        <motion.li 
                          key={index} 
                          className="text-sm flex items-center"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <span className="w-2 h-2 bg-theme-text rounded-full mr-3 flex-shrink-0"></span>
                          {error}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form Container */}
          <motion.div
            className="relative flex-1 flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              className="relative bg-theme-light/80 backdrop-blur-sm rounded-2xl shadow-xl border border-theme-light/20 p-4 sm:p-6 lg:p-8 flex-1 flex flex-col overflow-hidden"
              key={currentStep}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Step 1: Destination */}
              {currentStep === 1 && (
                <motion.div 
                  className="space-y-4 flex-1 flex flex-col"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-center mb-6">
                    <h2 className="text-lg sm:text-xl font-bold text-theme-text mb-1">Where would you like to go?</h2>
                    <p className="text-xs sm:text-sm text-theme-text/70">Choose from our popular destinations or tell us your dream location</p>
                    <div className="mt-1 inline-flex items-center px-2 py-1 bg-theme-heading/20 text-theme-text text-xs font-medium rounded-full">
                      <span className="w-1.5 h-1.5 bg-theme-text rounded-full mr-1.5"></span>
                      Required
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mb-6 flex-1">
                    {popularDestinations.map((destination, index) => (
                      <motion.label 
                        key={destination.name} 
                        className="cursor-pointer group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <input
                          type="radio"
                          value={destination.name}
                          {...register('destination')}
                          className="sr-only"
                        />
                        <motion.div 
                          className={`p-3 sm:p-4 lg:p-5 border-2 rounded-xl text-center transition-all duration-300 group-hover:scale-105 h-full flex flex-col justify-center ${
                            watchedValues.destination === destination.name 
                              ? 'border-theme-text bg-theme-light text-theme-text shadow-lg' 
                              : 'border-theme-heading/20 bg-theme-light hover:border-theme-text hover:shadow-md'
                          }`}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="text-lg sm:text-xl lg:text-2xl mb-1">{destination.icon}</div>
                          <div className="font-semibold text-xs sm:text-sm lg:text-base mb-1 leading-tight">{destination.name}</div>
                          <div className="text-xs text-theme-text/60 leading-tight">{destination.description}</div>
                        </motion.div>
                      </motion.label>
                    ))}
                  </div>
                  
                  <div className="relative">
                    <label className="block text-xs sm:text-sm font-semibold text-theme-text mb-1">
                      Or specify a custom destination:
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter your dream destination..."
                        {...register('customDestination')}
                        className="w-full px-3 py-2 pl-10 border border-theme-heading/20 rounded-xl focus:ring-2 focus:ring-theme-text focus:border-theme-text transition-colors text-sm"
                      />
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-theme-text/50" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Dates & Travelers */}
              {currentStep === 2 && (
                <motion.div 
                  className="space-y-6 flex-1 flex flex-col"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-theme-text to-theme-text rounded-xl mb-3">
                      <Calendar className="w-6 h-6 text-theme-text" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-theme-text mb-2">When are you traveling?</h2>
                    <p className="text-sm text-theme-text/70">Tell us your travel dates and group size</p>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-theme-text flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-theme-text" />
                        Travel Dates
                      </h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-theme-text mb-2">
                            Departure Date *
                          </label>
                          <div className="relative">
                            <input
                              type="date"
                              {...register('departureDate', { required: 'Please select your departure date' })}
                              className="w-full px-4 py-3 pl-12 border border-theme-heading/20 rounded-xl focus:ring-2 focus:ring-theme-text focus:border-theme-text transition-colors"
                              min={new Date().toISOString().split('T')[0]}
                            />
                            <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-theme-text/50" />
                          </div>
                          {errors.departureDate && (
                            <p className="text-theme-text text-sm mt-3 flex items-center">
                              <AlertCircle className="w-4 h-4 mr-1" />
                              {errors.departureDate.message}
                            </p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold text-theme-text mb-2">
                            Return Date *
                          </label>
                          <div className="relative">
                            <input
                              type="date"
                              {...register('returnDate', { required: 'Please select your return date' })}
                              className="w-full px-4 py-3 pl-12 border border-theme-heading/20 rounded-xl focus:ring-2 focus:ring-theme-text focus:border-theme-text transition-colors"
                              min={watchedValues.departureDate || new Date().toISOString().split('T')[0]}
                            />
                            <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-theme-text/50" />
                          </div>
                          {errors.returnDate && (
                            <p className="text-theme-text text-sm mt-3 flex items-center">
                              <AlertCircle className="w-4 h-4 mr-1" />
                              {errors.returnDate.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-theme-text flex items-center">
                        <Users className="w-5 h-5 mr-2 text-theme-text" />
                        Travelers
                      </h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-theme-text mb-2">
                            Adults (18+) *
                          </label>
                          <div className="relative">
                            <select {...register('adults', { required: true })} className="w-full px-4 py-3 pl-12 border border-theme-heading/20 rounded-xl focus:ring-2 focus:ring-theme-text focus:border-theme-text transition-colors">
                              {[1, 2, 3, 4, 5, 6].map(num => (
                                <option key={num} value={num}>{num} Adult{num > 1 ? 's' : ''}</option>
                              ))}
                            </select>
                            <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-theme-text/50" />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold text-theme-text mb-2">
                            Children (0-17)
                          </label>
                          <div className="relative">
                            <select {...register('children')} className="w-full px-4 py-3 pl-12 border border-theme-heading/20 rounded-xl focus:ring-2 focus:ring-theme-text focus:border-theme-text transition-colors">
                              {[0, 1, 2, 3, 4].map(num => (
                                <option key={num} value={num}>{num} Child{num > 1 ? 'ren' : ''}</option>
                              ))}
                            </select>
                            <Heart className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-theme-text/50" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Preferences */}
              {currentStep === 3 && (
                <motion.div 
                  className="space-y-6 flex-1 flex flex-col"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-theme-text to-theme-text rounded-xl mb-3">
                      <Settings className="w-6 h-6 text-theme-text" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-theme-text mb-2">Customize your experience</h2>
                    <p className="text-sm text-theme-text/70">Tell us your preferences to create the perfect trip</p>
                  </div>
                  
                  <div className="space-y-6 flex-1">
                    <div>
                      <label className="block text-sm font-semibold text-theme-text mb-3">
                        Accommodation Preference
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                        {[
                          { value: 'standard', label: 'Standard Room', icon: '🏨', description: 'Comfortable & affordable' },
                          { value: 'deluxe', label: 'Deluxe Room', icon: '✨', description: 'Enhanced comfort' },
                          { value: 'suite', label: 'Suite', icon: '👑', description: 'Luxury experience' },
                          { value: 'villa', label: 'Private Villa', icon: '🏡', description: 'Exclusive & private' }
                        ].map((option) => (
                          <motion.label 
                            key={option.value} 
                            className="cursor-pointer group"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <input
                              type="radio"
                              value={option.value}
                              {...register('roomType')}
                              className="sr-only"
                            />
                            <div className={`p-3 border-2 rounded-xl transition-all duration-300 group-hover:shadow-md ${
                              watchedValues.roomType === option.value 
                                ? 'border-theme-text bg-gradient-to-br from-theme-light to-theme-light text-theme-text shadow-lg' 
                                : 'border-theme-heading/20 bg-theme-light hover:border-theme-text'
                            }`}>
                              <div className="text-lg sm:text-xl mb-1">{option.icon}</div>
                              <div className="font-semibold text-xs sm:text-sm mb-1 leading-tight">{option.label}</div>
                              <div className="text-xs text-theme-text/60 leading-tight hidden sm:block">{option.description}</div>
                            </div>
                          </motion.label>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-theme-text mb-2">
                        Special Requests or Requirements
                      </label>
                      <div className="relative">
                        <textarea
                          rows={4}
                          placeholder="Tell us about any special requirements, dietary restrictions, accessibility needs, or special occasions..."
                          {...register('specialRequests')}
                          className="w-full px-4 py-3 border border-theme-heading/20 rounded-xl focus:ring-2 focus:ring-theme-text focus:border-theme-text transition-colors resize-none"
                        />
                        <div className="absolute bottom-3 right-3 text-xs text-theme-text/50">
                          Optional
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Contact Info */}
              {currentStep === 4 && (
                <motion.div 
                  className="space-y-6 flex-1 flex flex-col"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-theme-text to-theme-text rounded-xl mb-3">
                      <User className="w-6 h-6 text-theme-text" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-theme-text mb-2">Your contact information</h2>
                    <p className="text-sm text-theme-text/70">We'll use this to send you your personalized itinerary</p>
                  </div>
                  
                  <div className="space-y-6 flex-1">
                    <div>
                      <h3 className="text-lg font-semibold text-theme-text mb-6 flex items-center">
                        <User className="w-5 h-5 mr-2 text-theme-text" />
                        Personal Details
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-theme-text mb-2">
                            First Name *
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              {...register('firstName', { required: 'Please enter your first name' })}
                              className="w-full px-4 py-3 pl-12 border border-theme-heading/20 rounded-xl focus:ring-2 focus:ring-theme-text focus:border-theme-text transition-colors"
                              placeholder="Enter your first name"
                            />
                            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-theme-text/50" />
                          </div>
                          {errors.firstName && (
                            <p className="text-theme-text text-sm mt-3 flex items-center">
                              <AlertCircle className="w-4 h-4 mr-1" />
                              {errors.firstName.message}
                            </p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold text-theme-text mb-2">
                            Last Name *
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              {...register('lastName', { required: 'Please enter your last name' })}
                              className="w-full px-4 py-3 pl-12 border border-theme-heading/20 rounded-xl focus:ring-2 focus:ring-theme-text focus:border-theme-text transition-colors"
                              placeholder="Enter your last name"
                            />
                            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-theme-text/50" />
                          </div>
                          {errors.lastName && (
                            <p className="text-theme-text text-sm mt-3 flex items-center">
                              <AlertCircle className="w-4 h-4 mr-1" />
                              {errors.lastName.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-theme-text mb-6 flex items-center">
                        <MessageCircle className="w-5 h-5 mr-2 text-theme-text" />
                        Contact Information
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-theme-text mb-2">
                            Email Address *
                          </label>
                          <div className="relative">
                            <input
                              type="email"
                              {...register('email', { 
                                required: 'Please enter your email address',
                                pattern: {
                                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                  message: 'Please enter a valid email address'
                                }
                              })}
                              className="w-full px-4 py-3 pl-12 border border-theme-heading/20 rounded-xl focus:ring-2 focus:ring-theme-text focus:border-theme-text transition-colors"
                              placeholder="your.email@example.com"
                            />
                            <MessageCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-theme-text/50" />
                          </div>
                          {errors.email && (
                            <p className="text-theme-text text-sm mt-3 flex items-center">
                              <AlertCircle className="w-4 h-4 mr-1" />
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold text-theme-text mb-2">
                            Phone Number *
                          </label>
                          <div className="relative">
                            <input
                              type="tel"
                              {...register('phone', { 
                                required: 'Please enter your phone number',
                                pattern: {
                                  value: /^[\+]?[0-9\s\-\(\)]{10,}$/,
                                  message: 'Please enter a valid phone number'
                                }
                              })}
                              className="w-full px-4 py-3 pl-12 border border-theme-heading/20 rounded-xl focus:ring-2 focus:ring-theme-text focus:border-theme-text transition-colors"
                              placeholder="+91 9876543210"
                            />
                            <MessageCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-theme-text/50" />
                          </div>
                          {errors.phone && (
                            <p className="text-theme-text text-sm mt-3 flex items-center">
                              <AlertCircle className="w-4 h-4 mr-1" />
                              {errors.phone.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-theme-text mb-6 flex items-center">
                        <MapPin className="w-5 h-5 mr-2 text-theme-text" />
                        Additional Information
                      </h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-theme-text mb-2">
                            Address (Optional)
                          </label>
                          <div className="relative">
                            <textarea
                              rows={3}
                              {...register('address')}
                              className="w-full px-4 py-3 pl-12 border border-theme-heading/20 rounded-xl focus:ring-2 focus:ring-theme-text focus:border-theme-text transition-colors resize-none"
                              placeholder="Your complete address..."
                            />
                            <MapPin className="absolute left-4 top-4 w-5 h-5 text-theme-text/50" />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold text-theme-text mb-2">
                            Emergency Contact (Optional)
                          </label>
                          <div className="relative">
                            <input
                              type="tel"
                              {...register('emergencyContact')}
                              className="w-full px-4 py-3 pl-12 border border-theme-heading/20 rounded-xl focus:ring-2 focus:ring-theme-text focus:border-theme-text transition-colors"
                              placeholder="Emergency contact number"
                            />
                            <MessageCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-theme-text/50" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 5: Review */}
              {currentStep === 5 && (
                <motion.div 
                  className="space-y-6 flex-1 flex flex-col"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-theme-text to-theme-text rounded-xl mb-3">
                      <Check className="w-6 h-6 text-theme-text" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-theme-text mb-2">Review your booking</h2>
                    <p className="text-sm text-theme-text/70">Please review all details before submitting your booking</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-theme-light to-theme-light rounded-2xl p-4 sm:p-6 border border-theme-heading/20 flex-1">
                    <h3 className="text-lg font-bold text-theme-text mb-6 flex items-center">
                      <Star className="w-5 h-5 mr-2 text-theme-text" />
                      Booking Summary
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-theme-heading/20">
                          <span className="font-semibold text-theme-text flex items-center text-sm">
                            <Globe className="w-4 h-4 mr-2 text-theme-text" />
                            Destination:
                          </span>
                          <span className="text-right font-medium text-theme-text text-sm">
                            {watchedValues.destination || watchedValues.customDestination || 'Not specified'}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center py-2 border-b border-theme-heading/20">
                          <span className="font-semibold text-theme-text flex items-center text-sm">
                            <Calendar className="w-4 h-4 mr-2 text-theme-text" />
                            Travel Dates:
                          </span>
                          <span className="text-right font-medium text-theme-text text-sm">
                            {watchedValues.departureDate} to {watchedValues.returnDate}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center py-2 border-b border-theme-heading/20">
                          <span className="font-semibold text-theme-text flex items-center text-sm">
                            <Users className="w-4 h-4 mr-2 text-theme-text" />
                            Travelers:
                          </span>
                          <span className="text-right font-medium text-theme-text text-sm">
                            {watchedValues.adults} Adult{watchedValues.adults > 1 ? 's' : ''}{watchedValues.children > 0 ? `, ${watchedValues.children} Child${watchedValues.children > 1 ? 'ren' : ''}` : ''}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center py-2 border-b border-theme-heading/20">
                          <span className="font-semibold text-theme-text flex items-center text-sm">
                            <Settings className="w-4 h-4 mr-2 text-theme-text" />
                            Room Type:
                          </span>
                          <span className="text-right font-medium text-theme-text text-sm">
                            {watchedValues.roomType || 'Not specified'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-theme-heading/20">
                          <span className="font-semibold text-theme-text flex items-center text-sm">
                            <User className="w-4 h-4 mr-2 text-theme-text" />
                            Contact:
                          </span>
                          <span className="text-right font-medium text-theme-text text-sm">
                            {watchedValues.firstName} {watchedValues.lastName}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center py-2 border-b border-theme-heading/20">
                          <span className="font-semibold text-theme-text flex items-center text-sm">
                            <MessageCircle className="w-4 h-4 mr-2 text-theme-text" />
                            Email:
                          </span>
                          <span className="text-right font-medium text-theme-text break-all text-sm">
                            {watchedValues.email}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center py-2 border-b border-theme-heading/20">
                          <span className="font-semibold text-theme-text flex items-center text-sm">
                            <MessageCircle className="w-4 h-4 mr-2 text-theme-text" />
                            Phone:
                          </span>
                          <span className="text-right font-medium text-theme-text text-sm">
                            {watchedValues.phone}
                          </span>
                        </div>
                        
                        {watchedValues.address && (
                          <div className="flex justify-between items-start py-2 border-b border-theme-heading/20">
                            <span className="font-semibold text-theme-text flex items-center text-sm">
                              <MapPin className="w-4 h-4 mr-2 text-theme-text" />
                              Address:
                            </span>
                            <span className="text-right text-xs font-medium text-theme-text max-w-xs">
                              {watchedValues.address}
                            </span>
                          </div>
                        )}
                        
                        {watchedValues.emergencyContact && (
                          <div className="flex justify-between items-center py-2 border-b border-theme-heading/20">
                            <span className="font-semibold text-theme-text flex items-center text-sm">
                              <MessageCircle className="w-4 h-4 mr-2 text-theme-text" />
                              Emergency Contact:
                            </span>
                            <span className="text-right font-medium text-theme-text text-sm">
                              {watchedValues.emergencyContact}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {watchedValues.specialRequests && (
                      <div className="mt-4 pt-4 border-t border-theme-heading/20">
                        <div className="flex justify-between items-start">
                          <span className="font-semibold text-theme-text flex items-center text-sm">
                            <Settings className="w-4 h-4 mr-2 text-theme-text" />
                            Special Requests:
                          </span>
                          <span className="text-right text-xs font-medium text-theme-text max-w-md">
                            {watchedValues.specialRequests}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="bg-gradient-to-r from-theme-light to-theme-light rounded-2xl p-4 sm:p-6 border border-theme-heading/20">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-theme-text to-theme-text rounded-xl flex items-center justify-center mr-3">
                        <MessageCircle className="w-5 h-5 text-theme-text" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-theme-text">Ready to book via WhatsApp!</h3>
                        <p className="text-theme-text/80 text-xs">Send your details to our travel expert</p>
                      </div>
                    </div>
                    
                    <p className="text-theme-text mb-3 leading-relaxed text-sm">
                      Click the button below to send your booking details directly to our travel expert via WhatsApp. 
                      We'll respond within 24 hours with a personalized itinerary and quote.
                    </p>
                    
                    <div className="bg-theme-light rounded-xl p-3 border border-theme-heading/20 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-semibold text-theme-text">WhatsApp Contact</p>
                          <p className="text-sm font-bold text-theme-text">+91 8401271114</p>
                        </div>
                        <div className="w-10 h-10 bg-theme-heading/20 rounded-full flex items-center justify-center">
                          <MessageCircle className="w-5 h-5 text-theme-text" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-6 pt-6 border-t border-theme-heading/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <motion.button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`flex items-center px-4 py-3 rounded-xl font-semibold transition-all duration-300 w-full sm:w-auto justify-center text-sm ${
                    currentStep === 1
                      ? 'text-theme-text/50 cursor-not-allowed'
                      : 'text-theme-text hover:text-theme-text hover:bg-theme-light/50'
                  }`}
                  whileHover={currentStep !== 1 ? { scale: 1.02 } : {}}
                  whileTap={currentStep !== 1 ? { scale: 0.98 } : {}}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </motion.button>

                {currentStep < steps.length ? (
                  <motion.button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center hover-effect w-full sm:w-auto justify-center px-6 py-3 rounded-xl font-semibold bg-theme-text text-theme-light shadow-lg hover:shadow-xl text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </motion.button>
                ) : (
                  <WhatsAppButton
                    onClick={handlePreviewMessage}
                    disabled={isSubmitting}
                    isSubmitting={isSubmitting}
                    showPreview={true}
                    className="w-full sm:w-auto"
                  />
                )}
              </motion.div>
            </motion.form>
          </motion.div>
        </div>
      </section>

      {/* Message Preview Modal */}
      <MessagePreview
        bookingData={watchedValues as BookingData}
        isOpen={showMessagePreview}
        onClose={() => setShowMessagePreview(false)}
        onSend={handleSendMessage}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}
