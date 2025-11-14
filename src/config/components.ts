// Centralized component configuration
// Add new components here - they'll automatically appear in the index

import React from 'react'
import DraggablePriceInput from '@/components/draggable-price-input'
import FeedV3 from '@/prototypes/FeedV3'
import Searchbox from '@/prototypes/Searchbox'
import Charts from '@/prototypes/Charts'
import LPChartV3 from '@/prototypes/LPChartV3'

export type ComponentConfig = {
  id: string
  name: string
  description: string
  version: string
  date: string
  product: 'DEX' | 'Feed'
  component?: React.ComponentType
  isFullPage?: boolean // Components that should render full-screen
}

export const componentRegistry: Record<string, ComponentConfig> = {
  'draggable-price-input': {
    id: 'draggable-price-input',
    name: 'Draggable Price Input',
    description: 'Price input with drag-to-adjust, increment/decrement buttons, and formatted display',
    version: '1.0.0',
    date: '2024-11-13',
    product: 'DEX',
    component: DraggablePriceInput,
  },
  'feed-v3': {
    id: 'feed-v3',
    name: 'Feed V3',
    description: 'Interactive social media feed prototype with threads, comments, reactions, search, and real-time updates',
    version: '0.1.0',
    date: '2024-11-13',
    product: 'Feed',
    component: FeedV3,
    isFullPage: true,
  },
  'searchbox': {
    id: 'searchbox',
    name: 'Searchbox',
    description: 'Comprehensive toolbar with tabs, sorting, and deep search system with grammar parsing, filters, and real-time results',
    version: '0.1.0',
    date: '2024-11-13',
    product: 'Feed',
    component: Searchbox,
    isFullPage: true,
  },
  'charts': {
    id: 'charts',
    name: 'LP Price Chart',
    description: 'Interactive liquidity visualization prototypes for DeFi pools - muscle chart and gauge views with drag-to-adjust price ranges',
    version: '1.0.0',
    date: '2024-11-13',
    product: 'DEX',
    component: Charts,
    isFullPage: true,
  },
  'lp-chart-v3': {
    id: 'lp-chart-v3',
    name: 'LP Price Chart V3',
    description: 'Refined liquidity pool chart with interactive range selection, histogram visualization, and real-time price tracking',
    version: '3.0.0',
    date: '2024-11-13',
    product: 'DEX',
    component: LPChartV3,
    isFullPage: true,
  },
}

// Export as array for easy iteration (sorted alphabetically)
export const componentsList = Object.values(componentRegistry).sort((a, b) => 
  a.name.localeCompare(b.name)
)

