import { useState, useEffect } from 'react'
import { supabase, Destination, Tour, Testimonial, CompanyInfo, StoryElement } from '@/lib/supabase'

export function useDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('destinations')
          .select('*')
          .order('id')

        if (error) throw error
        setDestinations(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchDestinations()
  }, [])

  return { destinations, loading, error }
}

export function useTours() {
  const [tours, setTours] = useState<Tour[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('tours')
          .select('*')
          .order('id')

        if (error) throw error
        setTours(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchTours()
  }, [])

  return { tours, loading, error }
}

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .order('id')

        if (error) throw error
        setTestimonials(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  return { testimonials, loading, error }
}

export function useCompanyInfo() {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('company_info')
          .select('*')
          .order('id')

        if (error) throw error
        setCompanyInfo(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchCompanyInfo()
  }, [])

  return { companyInfo, loading, error }
}

export function useStoryElements() {
  const [storyElements, setStoryElements] = useState<StoryElement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStoryElements = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('story_elements')
          .select('*')
          .order('id')

        if (error) throw error
        setStoryElements(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchStoryElements()
  }, [])

  return { storyElements, loading, error }
}
