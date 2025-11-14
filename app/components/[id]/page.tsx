'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import DraggablePriceInput from '@/components/draggable-price-input'

const components: Record<string, { name: string; product: string; component?: React.ComponentType }> = {
  'draggable-price-input': {
    name: 'Draggable Price Input',
    product: 'DEX',
    component: DraggablePriceInput,
  },
  'feed-v3': {
    name: 'Feed V3',
    product: 'Feed',
  },
}

export default function ComponentPage({ params }: { params: { id: string } }) {
  const componentId = params.id
  const componentData = components[componentId]
  const [feedError, setFeedError] = useState(false)
  
  if (!componentData) {
    notFound()
  }

  const componentName = componentData.name
  const componentProduct = componentData.product
  const isFeed = componentId === 'feed-v3'

  useEffect(() => {
    if (!isFeed) return
    
    let timeoutId: NodeJS.Timeout
    let hasChecked = false
    
    // Check if Feed is running - only once, with a delay
    const checkFeed = () => {
      if (hasChecked) return
      hasChecked = true
      
      const img = new Image()
      img.onerror = () => {
        timeoutId = setTimeout(() => {
          setFeedError(true)
        }, 2000)
      }
      img.onload = () => {
        setFeedError(false)
      }
      img.src = 'http://localhost:5173/favicon.ico?' + Date.now()
    }
    
    // Delay check to avoid immediate false positives (Feed might be starting)
    timeoutId = setTimeout(checkFeed, 2000)
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [isFeed])

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Minimal floating info bar - like Next.js error pill */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-white border border-gray-200 rounded-full shadow-lg px-4 py-2 flex items-center gap-3 text-sm">
          <Link
            href="/"
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
          {isFeed && (
            <span className="text-xs text-gray-500">v0.1.0</span>
          )}
        </div>
      </div>

      {/* Full-screen prototype display */}
      <div className="w-full h-screen pt-16">
        {isFeed ? (
          <>
            {feedError && (
              <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
                <div className="bg-red-50 border border-red-200 rounded-full shadow-lg px-4 py-2 flex items-center gap-2 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-red-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                  <span className="text-red-800 text-xs">Feed V3 not running on port 5173</span>
                </div>
              </div>
            )}
            <iframe
              src="http://localhost:5173"
              className="w-full h-full border-0"
              title="Feed V3 Prototype"
              allow="clipboard-read; clipboard-write; fullscreen"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-top-navigation"
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center p-8">
            {componentData.component && (() => {
              const Component = componentData.component
              return <Component />
            })()}
          </div>
        )}
      </div>
    </div>
  )
}

