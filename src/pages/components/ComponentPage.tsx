import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { componentRegistry } from '@/config/components'

export default function ComponentPage() {
  const { id } = useParams<{ id: string }>()
  const componentId = id || ''
  const componentData = componentRegistry[componentId]

  if (!componentData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Component not found</h1>
          <p className="text-gray-600 mb-4">Component ID: {componentId}</p>
          <Link to="/" className="text-blue-600 hover:text-blue-800">Go back to index</Link>
        </div>
      </div>
    )
  }

  const componentName = componentData.name
  const componentProduct = componentData.product
  const Component = componentData.component
  const isFullPage = componentData.isFullPage ?? false

  // Render component with error boundary
  const renderComponent = () => {
    if (!Component) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-gray-500">
            <p>Component not available</p>
          </div>
        </div>
      )
    }

    try {
      return <Component />
    } catch (error) {
      console.error('Error rendering component:', error)
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-red-500">
            <p>Error rendering component</p>
            <p className="text-sm mt-2">{String(error)}</p>
          </div>
        </div>
      )
    }
  }

  // Full-page components render without wrapper
  if (isFullPage) {
    return (
      <>
        {/* Minimal floating info bar */}
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

        {/* Full-screen component */}
        {renderComponent()}
      </>
    )
  }

  // Regular components with wrapper
  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Minimal floating info bar */}
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

      {/* Component display */}
      <div className="w-full h-screen pt-16">
        {renderComponent()}
      </div>
    </div>
  )
}

