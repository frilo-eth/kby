import { Link } from 'react-router-dom'

// Default icon for components without specific icons
const defaultIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a2.25 2.25 0 011.591-.659h4.911a2.25 2.25 0 011.591.659m-5.841 0V8.858a2.25 2.25 0 00-.659 1.591L5 14.5m0 0v5.714a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25V14.5M5 14.5l3.659-1.591a2.25 2.25 0 01.659-1.591m0 0v5.714m0-5.714a2.25 2.25 0 00.659-1.591L8.25 7.5m5.841 0l1.591.659a2.25 2.25 0 011.591.659m-1.591 0V8.858a2.25 2.25 0 01.659-1.591L15 5.5m-1.159 0v5.714" />
  </svg>
)

// Unified component collection - all components live together in one index
const components = [
  {
    id: 'draggable-price-input',
    name: 'Draggable Price Input',
    description: 'Price input with drag-to-adjust, increment/decrement buttons, and formatted display',
    version: '1.0.0',
    date: '2024-11-13',
    product: 'DEX',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
  },
  {
    id: 'feed-v3',
    name: 'Feed V3',
    description: 'Interactive social media feed prototype with threads, comments, reactions, search, and real-time updates',
    version: '0.1.0',
    date: '2024-11-13',
    product: 'Feed',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5zM18.75 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM18.75 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM18.75 18.75a.75.75 0 110-1.5.75.75 0 010 1.5zM5.25 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM5.25 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM5.25 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
      </svg>
    ),
  },
  {
    id: 'searchbox',
    name: 'Searchbox',
    description: 'Comprehensive toolbar with tabs, sorting, and deep search system with grammar parsing, filters, and real-time results',
    version: '0.1.0',
    date: '2024-11-13',
    product: 'Feed',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
].sort((a, b) => {
  // All components sorted alphabetically by name - unified collection
  return a.name.localeCompare(b.name)
})

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function Home() {
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
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Component
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Version
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {components.map((component) => (
                  <tr
                    key={component.id}
                    className="group hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/components/${component.id}`} className="flex items-center gap-3 cursor-pointer">
                        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-gray-600 group-hover:text-gray-900">
                          {component.icon}
                        </div>
                        <div className="text-sm font-medium text-gray-900 group-hover:text-gray-700">
                          {component.name}
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <Link to={`/components/${component.id}`} className="block cursor-pointer">
                        <div className="text-sm text-gray-600">
                          {component.description}
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/components/${component.id}`} className="block cursor-pointer">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${
                          component.product === 'DEX' 
                            ? 'bg-blue-100 text-blue-800' 
                            : component.product === 'Feed'
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {component.product}
                        </span>
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/components/${component.id}`} className="block cursor-pointer">
                        <div className="text-sm text-gray-600">
                          {component.version}
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/components/${component.id}`} className="block cursor-pointer">
                        <div className="text-sm text-gray-600">
                          {formatDate(component.date)}
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Link to={`/components/${component.id}`} className="inline-flex items-center justify-end gap-2 text-sm text-gray-500 group-hover:text-gray-700 ml-auto cursor-pointer">
                        <span>View</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

