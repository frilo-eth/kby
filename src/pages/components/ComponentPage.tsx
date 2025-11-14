import React from 'react'
import { useParams, Link } from 'react-router-dom'
import DraggablePriceInput from '@/components/draggable-price-input'
import FeedV3 from '@/prototypes/FeedV3'
import Searchbox from '@/prototypes/Searchbox'

const components: Record<string, { name: string; product: string; component?: React.ComponentType }> = {
  'draggable-price-input': {
    name: 'Draggable Price Input',
    product: 'DEX',
    component: DraggablePriceInput,
  },
  'feed-v3': {
    name: 'Feed V3',
    product: 'Feed',
    component: FeedV3,
  },
  'searchbox': {
    name: 'Searchbox',
    product: 'Feed',
    component: Searchbox,
  },
}

export default function ComponentPage() {
  const { id } = useParams<{ id: string }>()
  const componentId = id || ''
  const componentData = components[componentId]

  if (!componentData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Component not found</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-800">Go back to index</Link>
        </div>
      </div>
    )
  }

  const componentName = componentData.name
  const componentProduct = componentData.product

  // Full-page components that should render without wrapper constraints
  const isFullPageComponent = componentId === 'feed-v3' || componentId === 'searchbox'

  if (isFullPageComponent) {
    return (
      <>
        {/* Minimal floating info bar - like Next.js error pill */}
        <div className="fixed top-4 left-4 z-50">
          <div className="bg-white border border-gray-200 rounded-full shadow-lg px-4 py-2 flex items-center gap-3 text-sm">
            <Link
              to="/"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </Link>
            <span className="text-gray-900 font-medium">{componentName}</span>
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
              componentProduct === 'DEX' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-orange-100 text-orange-800'
            }`}>
              {componentProduct}
            </span>
          </div>
        </div>

        {/* Full-screen prototype display - no wrapper constraints */}
        {componentData.component && (() => {
          const Component = componentData.component
          return <Component />
        })()}
      </>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Minimal floating info bar - like Next.js error pill */}
      <div className="fixed top-4 left-4 z-50">
        <div className="bg-white border border-gray-200 rounded-full shadow-lg px-4 py-2 flex items-center gap-3 text-sm">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </Link>
          <span className="text-gray-900 font-medium">{componentName}</span>
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
            componentProduct === 'DEX' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-orange-100 text-orange-800'
          }`}>
            {componentProduct}
          </span>
        </div>
      </div>

      {/* Full-screen prototype display */}
      <div className="w-full h-screen pt-16">
        {componentData.component && (() => {
          const Component = componentData.component
          return <Component />
        })()}
      </div>
    </div>
  )
}

