'use client'

import { motion } from 'framer-motion'
import { MapPin, Mail, Linkedin, Twitter } from 'lucide-react'

const teamMembers = [
  {
    name: 'Nashra',
    position: 'Co-Founder & CEO',
    location: 'Palanpur, Gujarat, India',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b293?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    bio: 'Travel enthusiast with extensive experience in the Indian tourism industry. Nashra co-founded Flynzo Innovation Private Limited with a vision to showcase India\'s incredible domestic destinations.',
    specialties: ['Strategic Planning', 'Customer Experience', 'Indian Tourism'],
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'Info.flynzo@gmail.com'
    }
  },
  {
    name: 'Nitin Mongroda',
    position: 'Co-Founder & Operations Head',
    location: 'Palanpur, Gujarat, India',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    bio: 'Operations expert who ensures every domestic tour runs smoothly. Nitin brings precision and efficiency to complex travel logistics across India.',
    specialties: ['Operations Management', 'Quality Assurance', 'Indian Travel Logistics'],
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'Info.flynzo@gmail.com'
    }
  },
  {
    name: 'Travel Experience Team',
    position: 'Destination Specialists',
    location: 'Across India',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    bio: 'Local experts who craft unique travel experiences across India. Our team has explored every corner of India and brings authentic local insights to every domestic tour.',
    specialties: ['Itinerary Design', 'Cultural Integration', 'Local Partnerships'],
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'Info.flynzo@gmail.com'
    }
  },
  {
    name: 'Customer Success Team',
    position: 'Customer Relations',
    location: 'Palanpur, Gujarat, India',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    bio: 'Customer advocates who ensure every client has an exceptional domestic travel experience. Our team\'s attention to detail and communication skills make them invaluable.',
    specialties: ['Customer Relations', 'Problem Solving', 'Client Retention'],
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'Info.flynzo@gmail.com'
    }
  },
  {
    name: 'Marketing Team',
    position: 'Digital Marketing',
    location: 'Palanpur, Gujarat, India',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    bio: 'Marketing strategists who bring India\'s incredible destinations to life. Our team creates compelling campaigns that inspire wanderlust for domestic travel.',
    specialties: ['Digital Marketing', 'Brand Strategy', 'Content Creation'],
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'Info.flynzo@gmail.com'
    }
  },
  {
    name: 'Technology Team',
    position: 'Platform Development',
    location: 'Palanpur, Gujarat, India',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    bio: 'Tech innovators who build platforms that power seamless domestic travel experiences. Our team ensures technology enhances every journey across India.',
    specialties: ['Software Development', 'System Architecture', 'User Experience'],
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'Info.flynzo@gmail.com'
    }
  }
]

export function TeamGrid() {
  return (
    <section className="py-20 bg-white overflow-hidden" data-scroll-section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-neutral-900 mb-4">
            Meet Our <span className="text-neutral-900">Team</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            The passionate professionals behind your unforgettable travel experiences
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Social Links - Show on hover */}
                <div className="absolute bottom-4 left-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={member.social.linkedin}
                    className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-neutral-700" />
                  </a>
                  <a
                    href={member.social.twitter}
                    className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <Twitter className="w-4 h-4 text-neutral-700" />
                  </a>
                  <a
                    href={`mailto:${member.social.email}`}
                    className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <Mail className="w-4 h-4 text-neutral-700" />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center text-neutral-500 text-sm mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  {member.location}
                </div>
                
                <h3 className="text-xl font-bold text-neutral-900 mb-1 group-hover:text-primary-600 transition-colors">
                  {member.name}
                </h3>
                
                <div className="text-primary-600 font-medium mb-4">{member.position}</div>
                
                <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                  {member.bio}
                </p>

                {/* Specialties */}
                <div className="flex flex-wrap gap-1">
                  {member.specialties.map((specialty, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-primary-50 text-primary-600 px-2 py-1 rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Join Our Team CTA */}
        <motion.div
          className="mt-20 text-center bg-neutral-50 rounded-3xl p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
            Join Our Amazing Team
          </h3>
          <p className="text-lg text-neutral-600 mb-6 max-w-2xl mx-auto">
            Are you passionate about travel and creating exceptional experiences? 
            We're always looking for talented individuals to join our growing team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary hover-effect">
              View Open Positions
            </button>
            <button className="btn-secondary hover-effect">
              Send Your Resume
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
