'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Send, MessageCircle } from 'lucide-react'

type ContactFormData = {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  inquiryType: string
}

const inquiryTypes = [
  'General Information',
  'Booking Inquiry',
  'Existing Booking',
  'Travel Support',
  'Partnership',
  'Other'
]

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>()

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    console.log('Contact Form Data:', data)
    toast.success('Message sent successfully! We\'ll get back to you within 24 hours.')
    reset()
    setIsSubmitting(false)
  }

  return (
    <section className="py-16 bg-white overflow-hidden" data-scroll-section>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <MessageCircle className="w-12 h-12 text-primary-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Send us a Message</h2>
            <p className="text-neutral-600">
              Have a question or ready to start planning? Fill out the form below and we'll respond promptly.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name and Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  className="input-field"
                  placeholder="Your full name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Please enter a valid email'
                    }
                  })}
                  className="input-field"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Phone and Inquiry Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  {...register('phone')}
                  className="input-field"
                  placeholder="+91 9773713859"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Inquiry Type *
                </label>
                <select
                  {...register('inquiryType', { required: 'Please select an inquiry type' })}
                  className="input-field"
                >
                  <option value="">Select inquiry type</option>
                  {inquiryTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.inquiryType && (
                  <p className="text-red-500 text-sm mt-1">{errors.inquiryType.message}</p>
                )}
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Subject *
              </label>
              <input
                type="text"
                {...register('subject', { required: 'Subject is required' })}
                className="input-field"
                placeholder="Brief description of your inquiry"
              />
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Message *
              </label>
              <textarea
                rows={6}
                {...register('message', { required: 'Message is required' })}
                className="input-field resize-none"
                placeholder="Tell us about your travel plans, questions, or how we can help you..."
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full md:w-auto px-8 py-3 hover-effect disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Contact Info */}
          <div className="mt-12 pt-8 border-t border-neutral-200 text-center">
            <p className="text-neutral-600 mb-4">
              Prefer to contact us directly?
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-8">
              <a href="tel:+919773713859" className="text-neutral-900 hover:text-neutral-700 hover-effect">
                📞 +91 9773713859
              </a>
              <a href="mailto:Info.flynzo@gmail.com" className="text-neutral-900 hover:text-neutral-700 hover-effect">
                ✉️ Info.flynzo@gmail.com
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
