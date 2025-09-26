'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react'

export function FilterBar() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filters = ['All', 'Europe', 'Asia', 'Americas', 'Africa', 'Oceania', 'Beach', 'City', 'Adventure', 'Culture']

  return (
    <section className="py-8 bg-white border-b border-neutral-200 overflow-hidden" data-scroll-section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
          {/* Filters */}
          <div className="flex items-center space-x-4 overflow-x-auto pb-2 lg:pb-0">
            <div className="flex items-center space-x-2 whitespace-nowrap">
              <Filter className="w-5 h-5 text-neutral-600" />
              <span className="text-neutral-600 font-medium">Filter by:</span>
            </div>
            <div className="flex space-x-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all hover-effect ${
                    activeFilter === filter
                      ? 'bg-theme-text text-theme-light'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* View Controls */}
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-theme-text/70 hover:text-theme-text transition-colors hover-effect">
              <SlidersHorizontal className="w-5 h-5" />
              <span className="text-sm font-medium">Advanced Filters</span>
            </button>
            
            <div className="flex items-center space-x-1 bg-neutral-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors hover-effect ${
                  viewMode === 'grid' ? 'bg-white text-primary-600 shadow-sm' : 'text-neutral-600'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors hover-effect ${
                  viewMode === 'list' ? 'bg-white text-primary-600 shadow-sm' : 'text-neutral-600'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
