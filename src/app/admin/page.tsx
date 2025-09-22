'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { supabase, Destination, Tour, Testimonial, CompanyInfo, StoryElement } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Save, X, Eye, LogOut, Shield } from 'lucide-react'

export default function AdminPanel() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('destinations')
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [tours, setTours] = useState<Tour[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo[]>([])
  const [storyElements, setStoryElements] = useState<StoryElement[]>([])
  const [editingItem, setEditingItem] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/admin/login')
      return
    }
    fetchData()
  }, [session, status, router])

  const tabs = [
    { id: 'destinations', label: 'Destinations', icon: '🏔️' },
    { id: 'tours', label: 'Tours', icon: '🎒' },
    { id: 'testimonials', label: 'Testimonials', icon: '💬' },
    { id: 'company', label: 'Company Info', icon: '🏢' },
    { id: 'stories', label: 'Stories', icon: '📖' }
  ]

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [destinationsRes, toursRes, testimonialsRes, companyRes, storiesRes] = await Promise.all([
        supabase.from('destinations').select('*').order('id'),
        supabase.from('tours').select('*').order('id'),
        supabase.from('testimonials').select('*').order('id'),
        supabase.from('company_info').select('*').order('id'),
        supabase.from('story_elements').select('*').order('id')
      ])

      if (destinationsRes.data) setDestinations(destinationsRes.data)
      if (toursRes.data) setTours(toursRes.data)
      if (testimonialsRes.data) setTestimonials(testimonialsRes.data)
      if (companyRes.data) setCompanyInfo(companyRes.data)
      if (storiesRes.data) setStoryElements(storiesRes.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleEdit = (item: any) => {
    setEditingItem(item)
    setIsEditing(true)
  }

  const handleSave = async () => {
    try {
      const tableName = activeTab === 'company' ? 'company_info' : activeTab
      const { error } = await supabase
        .from(tableName)
        .update(editingItem)
        .eq('id', editingItem.id)

      if (error) throw error

      await fetchData()
      setIsEditing(false)
      setEditingItem(null)
    } catch (error) {
      console.error('Error saving:', error)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return

    try {
      const tableName = activeTab === 'company' ? 'company_info' : activeTab
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id)

      if (error) throw error

      await fetchData()
    } catch (error) {
      console.error('Error deleting:', error)
    }
  }

  const renderDestinations = () => (
    <div className="space-y-4">
      {destinations.map((dest) => (
        <motion.div
          key={dest.id}
          className="bg-white rounded-lg p-6 shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800">{dest.name}</h3>
              <p className="text-gray-600">{dest.region}</p>
              <p className="text-gray-700 mt-2">{dest.description}</p>
              <div className="mt-2">
                <span className="text-green-600 font-semibold">₹{dest.starting_price}</span>
                <span className="text-gray-500 ml-4">⭐ {dest.rating} ({dest.reviews} reviews)</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(dest)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(dest.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )

  const renderTours = () => (
    <div className="space-y-4">
      {tours.map((tour) => (
        <motion.div
          key={tour.id}
          className="bg-white rounded-lg p-6 shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800">{tour.title}</h3>
              <p className="text-gray-600">{tour.destination}</p>
              <p className="text-gray-700 mt-2">{tour.description}</p>
              <div className="mt-2">
                <span className="text-green-600 font-semibold">{tour.price}</span>
                <span className="text-gray-500 ml-4">{tour.duration}</span>
                <span className="text-gray-500 ml-4">{tour.capacity}</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(tour)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(tour.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )

  const renderTestimonials = () => (
    <div className="space-y-4">
      {testimonials.map((testimonial) => (
        <motion.div
          key={testimonial.id}
          className="bg-white rounded-lg p-6 shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800">{testimonial.name}</h3>
              <p className="text-gray-600">{testimonial.location}</p>
              <p className="text-gray-700 mt-2">{testimonial.text}</p>
              <div className="mt-2">
                <span className="text-yellow-500">⭐ {testimonial.rating}</span>
                <span className="text-gray-500 ml-4">{testimonial.tour}</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(testimonial)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(testimonial.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )

  const renderCompanyInfo = () => (
    <div className="space-y-4">
      {companyInfo.map((company) => (
        <motion.div
          key={company.id}
          className="bg-white rounded-lg p-6 shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800">{company.name}</h3>
              <p className="text-gray-600">{company.contact_person}</p>
              <p className="text-gray-700 mt-2">{company.email}</p>
              <p className="text-gray-700">{company.phone}</p>
              <p className="text-gray-700 mt-2">{company.address}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(company)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
              >
                <Edit className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )

  const renderStories = () => (
    <div className="space-y-4">
      {storyElements.map((story) => (
        <motion.div
          key={story.id}
          className="bg-white rounded-lg p-6 shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800">{story.title}</h3>
              <p className="text-gray-600">{story.subtitle}</p>
              <p className="text-gray-700 mt-2">{story.description}</p>
              <p className="text-gray-600 mt-2 text-sm">{story.full_story}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(story)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(story.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Flynzo Admin Panel</h1>
            <p className="text-gray-600">Manage your website content and tours</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Shield className="w-4 h-4" />
              <span>Welcome, {session.user?.name || session.user?.email}</span>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {activeTab === 'destinations' && renderDestinations()}
          {activeTab === 'tours' && renderTours()}
          {activeTab === 'testimonials' && renderTestimonials()}
          {activeTab === 'company' && renderCompanyInfo()}
          {activeTab === 'stories' && renderStories()}
        </div>

        {/* Edit Modal */}
        {isEditing && editingItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Edit {activeTab.slice(0, -1)}</h2>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                {Object.keys(editingItem).map((key) => {
                  if (key === 'id' || key === 'created_at' || key === 'updated_at') return null
                  
                  return (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </label>
                      {key === 'highlights' ? (
                        <textarea
                          value={Array.isArray(editingItem[key]) ? editingItem[key].join(', ') : editingItem[key]}
                          onChange={(e) => {
                            setEditingItem({
                              ...editingItem,
                              [key]: e.target.value.split(', ').filter(item => item.trim())
                            })
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={3}
                        />
                      ) : key === 'position' ? (
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="number"
                            placeholder="X"
                            value={editingItem[key]?.x || ''}
                            onChange={(e) => {
                              setEditingItem({
                                ...editingItem,
                                [key]: { ...editingItem[key], x: parseInt(e.target.value) }
                              })
                            }}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <input
                            type="number"
                            placeholder="Y"
                            value={editingItem[key]?.y || ''}
                            onChange={(e) => {
                              setEditingItem({
                                ...editingItem,
                                [key]: { ...editingItem[key], y: parseInt(e.target.value) }
                              })
                            }}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      ) : (
                        <input
                          type={key.includes('price') ? 'number' : key.includes('email') ? 'email' : 'text'}
                          value={editingItem[key] || ''}
                          onChange={(e) => {
                            setEditingItem({
                              ...editingItem,
                              [key]: e.target.value
                            })
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
