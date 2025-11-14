import React, { useState } from 'react'

// React wrapper for the chartz prototype
// This loads the chartz HTML files in an iframe
export default function Charts() {
  const [activeView, setActiveView] = useState<'gauge' | 'density'>('gauge')
  const [error, setError] = useState(false)

  // Try to load from the public directory first, fallback to localhost
  const gaugeSrc = '/prototypes/chartz/gauge.html'
  const densitySrc = '/prototypes/chartz/density.html'

  return (
    <div className="w-full h-screen flex flex-col bg-gray-50">
      {/* Tab switcher */}
      <div className="flex justify-center gap-4 bg-white border-b border-gray-200 px-4 py-3">
        <button
          onClick={() => setActiveView('gauge')}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            activeView === 'gauge'
              ? 'bg-gray-900 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Gauge View
        </button>
        <button
          onClick={() => setActiveView('density')}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            activeView === 'density'
              ? 'bg-gray-900 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Density View
        </button>
      </div>

      {/* Chart iframe */}
      <div className="flex-1 relative">
        {error ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="text-center p-8">
              <p className="text-gray-600 mb-4">
                Charts prototype files not found. Please ensure the chartz files are in the public directory.
              </p>
              <p className="text-sm text-gray-500">
                Expected location: <code className="bg-gray-100 px-2 py-1 rounded">/prototypes/chartz/</code>
              </p>
            </div>
          </div>
        ) : (
          <>
            {activeView === 'gauge' && (
              <iframe
                key="gauge"
                src={gaugeSrc}
                className="w-full h-full border-0"
                title="Gauge Chart"
                onError={() => setError(true)}
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
              />
            )}
            {activeView === 'density' && (
              <iframe
                key="density"
                src={densitySrc}
                className="w-full h-full border-0"
                title="Density Chart"
                onError={() => setError(true)}
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

