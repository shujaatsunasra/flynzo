'use client'

import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'

export function MapSection() {
  return (
    <section className="bg-neutral-100 relative overflow-hidden" data-scroll-section>
      <motion.div
        className="h-full min-h-[600px] relative"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Placeholder for Map - In production, you'd integrate with Google Maps, Mapbox, or similar */}
        <div className="absolute inset-0 bg-neutral-100 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-neutral-800 mb-2">Find Us Here</h3>
            <p className="text-neutral-700 mb-6 max-w-sm">
              Interactive map integration would be placed here in production.
              Visit our office in Palanpur, Gujarat, India.
            </p>
            
            {/* Office Markers */}
            <div className="space-y-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div>
                    <div className="font-semibold text-neutral-900">Palanpur Office</div>
                    <div className="text-sm text-neutral-600">Shop No.28, Alif Plaza, Shop B/143/28, 1st Floor, Kanodar, Banaskantha, Palanpur, Gujarat, India, 385520</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div>
                    <div className="font-semibold text-neutral-900">Contact Person</div>
                    <div className="text-sm text-neutral-600">Nashra, Nitin Mongroda - Flynzo Innovation Private Limited</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <div className="font-semibold text-neutral-900">Emergency Contact</div>
                    <div className="text-sm text-neutral-600">+91 9724287467 - Available 24/7</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* In production, replace with actual map integration like this: */}
        {/* 
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.123456789!2d72.123456789!3d24.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c2b123456789%3A0x123456789abcdef!2sPalanpur%2C%20Gujarat%2C%20India!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        */}

        {/* Floating Action Button */}
        <div className="absolute bottom-6 right-6">
          <button className="bg-neutral-900 hover:bg-neutral-800 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover-effect">
            <MapPin className="w-6 h-6" />
          </button>
        </div>
      </motion.div>
    </section>
  )
}
