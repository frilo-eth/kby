import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { componentsList } from '@/config/components'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/Accordion'

// Icon mapping for components
const componentIcons: Record<string, React.ReactNode> = {
  'draggable-price-input': (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
    </svg>
  ),
  'feed-v3': (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5zM18.75 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM18.75 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM18.75 18.75a.75.75 0 110-1.5.75.75 0 010 1.5zM5.25 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM5.25 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM5.25 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
    </svg>
  ),
  'searchbox': (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  ),
  'charts': (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  ),
  'lp-chart-v3': (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  ),
}

const defaultIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a2.25 2.25 0 011.591-.659h4.911a2.25 2.25 0 011.591.659m-5.841 0V8.858a2.25 2.25 0 00-.659 1.591L5 14.5m0 0v5.714a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25V14.5M5 14.5l3.659-1.591a2.25 2.25 0 01.659-1.591m0 0v5.714m0-5.714a2.25 2.25 0 00.659-1.591L8.25 7.5m5.841 0l1.591.659a2.25 2.25 0 011.591.659m-1.591 0V8.858a2.25 2.25 0 01.659-1.591L15 5.5m-1.159 0v5.714" />
  </svg>
)

// Use centralized component list
const components = componentsList

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

// Extract base name from component name (e.g., "Feed V3" -> "Feed", "LP Price Chart" -> "LP Price Chart")
const getBaseName = (name: string): string => {
  // Remove version suffixes like "V3", "v2", etc.
  return name.replace(/\s+v\d+$/i, '').trim()
}

export default function Home() {
  // Group components by base name
  const groupedComponents = useMemo(() => {
    const groups = new Map<string, typeof components>()
    
    components.forEach((component) => {
      const baseName = getBaseName(component.name)
      if (!groups.has(baseName)) {
        groups.set(baseName, [])
      }
      groups.get(baseName)!.push(component)
    })
    
    // Sort versions within each group by version number (descending)
    groups.forEach((versions) => {
      versions.sort((a, b) => {
        // Simple version comparison - extract numbers and compare
        const aVersion = a.version.split('.').map(Number)
        const bVersion = b.version.split('.').map(Number)
        for (let i = 0; i < Math.max(aVersion.length, bVersion.length); i++) {
          const aVal = aVersion[i] || 0
          const bVal = bVersion[i] || 0
          if (bVal !== aVal) return bVal - aVal
        }
        return 0
      })
    })
    
    return Array.from(groups.entries()).sort(([a], [b]) => a.localeCompare(b))
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            UI Component Collection
          </h1>
          <p className="text-gray-600">
            A curated collection of UI components and design decisions for developers to reference and implement
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <Accordion allowMultiple={true}>
            {groupedComponents.map(([baseName, versions]) => {
              const latestVersion = versions[0]
              const hasMultipleVersions = versions.length > 1
              
              return (
                <AccordionItem key={baseName} value={baseName}>
                  <AccordionTrigger className="px-6">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-gray-600">
                        {componentIcons[latestVersion.id] || defaultIcon}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">
                          {baseName}
                        </div>
                        {!hasMultipleVersions && (
                          <div className="text-xs text-gray-500 mt-0.5">
                            {latestVersion.description}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${
                          latestVersion.product === 'DEX' 
                            ? 'bg-blue-100 text-blue-800' 
                            : latestVersion.product === 'Feed'
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {latestVersion.product}
                        </span>
                        {hasMultipleVersions && (
                          <span className="text-xs text-gray-500">
                            {versions.length} version{versions.length > 1 ? 's' : ''}
                          </span>
                        )}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6">
                    <div className="space-y-1 pb-2">
                      {versions.map((component) => (
                        <Link
                          key={component.id}
                          to={`/components/${component.id}`}
                          className="flex items-center gap-3 py-2 text-sm hover:text-gray-900 transition-colors"
                        >
                          <span className="text-gray-500 font-mono text-xs w-16">
                            v{component.version}
                          </span>
                          <span className="text-gray-600 flex-1">
                            {component.description}
                          </span>
                          <span className="text-gray-400 text-xs">
                            {formatDate(component.date)}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </div>

        {components.length === 0 && (
          <div className="text-center py-12 text-gray-500 text-sm">
            <p>No components available yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}

