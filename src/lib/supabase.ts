import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface Destination {
  id: number
  name: string
  region: string
  image: string
  rating: number
  reviews: number
  starting_price: number
  tours: number
  highlights: string[]
  description: string
  created_at?: string
  updated_at?: string
}

export interface Tour {
  id: number
  title: string
  destination: string
  price: string
  duration: string
  capacity: string
  rating: number
  reviews: number
  image: string
  description: string
  highlights: string[]
  created_at?: string
  updated_at?: string
}

export interface Testimonial {
  id: number
  name: string
  location: string
  rating: number
  text: string
  image: string
  tour: string
  created_at?: string
  updated_at?: string
}

export interface CompanyInfo {
  id: number
  name: string
  email: string
  phone: string
  address: string
  contact_person: string
  created_at?: string
  updated_at?: string
}

export interface StoryElement {
  id: number
  title: string
  subtitle: string
  description: string
  full_story: string
  image: string
  overlay_image: string
  color: string
  position: { x: number; y: number }
  scale: number
  rotation: number
  created_at?: string
  updated_at?: string
}
