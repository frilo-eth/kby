import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface LPChartV3Props {
  currentPrice?: number
  minPrice?: number
  maxPrice?: number
}

interface PriceInputProps {
  label: string
  value: number
  onChange: (value: number) => void
  usdValue: number
  priceBase?: 'usdc' | 'weth'
  formatWithSubscript?: (num: number) => string | React.ReactNode
  isFirst?: boolean
  isLast?: boolean
}

function PriceInput({ label, value, onChange, usdValue, priceBase = 'usdc', formatWithSubscript, isFirst = false, isLast = false }: PriceInputProps) {
  const [inputValue, setInputValue] = useState(value.toFixed(2))
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragStartX = useRef(0)
  const dragStartValue = useRef(0)

  useEffect(() => {
    if (priceBase === 'usdc') {
      setInputValue(value.toFixed(2))
    } else {
      // For WETH base, show more precision
      setInputValue(value.toFixed(6))
    }
  }, [value, priceBase])

  const formatNumber = (num: number) => {
    if (priceBase === 'usdc') {
      return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    } else {
      return num.toFixed(6)
    }
  }

  const formatUSD = (num: number) => {
    return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  const getIncrementStep = () => {
    return priceBase === 'usdc' ? 0.01 : 0.000001
  }

  const increment = () => {
    const step = getIncrementStep()
    const newValue = value + step
    onChange(newValue)
  }

  const decrement = () => {
    const step = getIncrementStep()
    const newValue = Math.max(0, value - step)
    onChange(newValue)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/,/g, '')
    setInputValue(input)
    
    const num = parseFloat(input)
    if (!isNaN(num) && num >= 0) {
      onChange(num)
    }
  }

  const handleInputBlur = () => {
    const num = parseFloat(inputValue.replace(/,/g, ''))
    if (!isNaN(num) && num >= 0) {
      onChange(num)
      setInputValue(formatNumber(num))
    } else {
      setInputValue(formatNumber(value))
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === inputRef.current) return
    e.preventDefault()
    setIsDragging(true)
    dragStartX.current = e.clientX
    dragStartValue.current = value
    document.body.style.cursor = 'ew-resize'
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      
      const deltaX = e.clientX - dragStartX.current
      const step = getIncrementStep()
      const sensitivity = step * 10 // Fine control for price inputs
      const newValue = Math.max(0, dragStartValue.current + (deltaX * sensitivity))
      
      onChange(newValue)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      document.body.style.cursor = 'default'
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, onChange, priceBase])

  // Check if we should use subscript formatting
  const shouldUseSubscript = priceBase === 'weth' && formatWithSubscript && value < 0.001
  const displayValue = shouldUseSubscript 
    ? formatWithSubscript(value)
    : formatNumber(value)

  // Determine border styles for seamless connection
  const borderStyles: React.CSSProperties = {
    borderTop: `1px solid #ffd2b5`,
    borderBottom: `1px solid #ffd2b5`,
    borderLeft: isFirst ? `1px solid #ffd2b5` : 'none',
    borderRight: 'none',
    borderRadius: '0px',
    borderRight: isLast ? 'none' : '1px solid #ffd2b5'
  }

  return (
    <div 
      ref={containerRef}
      className={`bg-[#fafafa] flex flex-col items-start transition-colors ${
        isDragging ? 'bg-[#f5f5f5]' : 'hover:bg-[#f5f5f5]'
      }`}
      style={{ flex: '1 1 0', minWidth: 0, padding: '12px', gap: '8px', ...borderStyles }}
    >
      <label className="block text-xs text-[#8b7e6f]">{label}</label>
      
      <div 
        className={`flex items-center justify-between w-full ${isDragging ? 'cursor-ew-resize' : 'cursor-grab active:cursor-grabbing'}`}
        onMouseDown={handleMouseDown}
      >
        {shouldUseSubscript && typeof displayValue !== 'string' ? (
          // Show formatted subscript display (not directly editable)
          <div className="flex-1 text-xl font-mono text-[#6d6153] uppercase flex items-baseline transition-colors hover:text-[#342c24]">
            {displayValue}
          </div>
        ) : (
          // Show editable input
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className="flex-1 text-xl font-mono text-[#6d6153] uppercase bg-transparent border-none focus:outline-none p-0 transition-colors hover:text-[#342c24] focus:text-[#342c24]"
            style={{ userSelect: isDragging ? 'none' : 'text' }}
          />
        )}

        <div className="flex items-center gap-1">
          <button
            onClick={increment}
            className="p-0.5 rounded transition-colors hover:bg-gray-200 active:bg-gray-300"
            type="button"
          >
            <svg className="w-4 h-4 text-[#1A150F] transition-colors" fill="none" viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M8 6v4M6 8h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
            </svg>
          </button>

          <button
            onClick={decrement}
            className="p-0.5 rounded transition-colors hover:bg-gray-200 active:bg-gray-300"
            type="button"
          >
            <svg className="w-4 h-4 text-[#1A150F] transition-colors" fill="none" viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <line x1="6" y1="8" x2="10" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="text-xs font-mono text-[#8b7e6f] uppercase tracking-tight transition-colors">
        ${formatUSD(usdValue)}
      </div>
    </div>
  )
}

export default function LPChartV3({
  currentPrice = 3451.31,
  minPrice: minPossiblePrice = 2000,
  maxPrice: maxPossiblePrice = 4500,
}: LPChartV3Props) {
  const chartRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [leftHandlerPercent, setLeftHandlerPercent] = useState(-20.28)
  const [rightHandlerPercent, setRightHandlerPercent] = useState(19.28)
  const [isDraggingLeft, setIsDraggingLeft] = useState(false)
  const [isDraggingRight, setIsDraggingRight] = useState(false)
  const [showLeftTooltip, setShowLeftTooltip] = useState(false)
  const [showRightTooltip, setShowRightTooltip] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [priceBase, setPriceBase] = useState<'usdc' | 'weth'>('usdc') // 'usdc' = USDC per WETH, 'weth' = WETH per USDC
  const [zoomLevel, setZoomLevel] = useState(1) // Zoom level: 1 = default, >1 = zoomed in, <1 = zoomed out
  
  // Default handler positions
  const defaultLeftHandlerPercent = -20.28
  const defaultRightHandlerPercent = 19.28

  // Mock contract addresses - replace with real ones
  const poolContract = '0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640'
  const wethContract = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
  const usdcContract = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setToastMessage(`${label} copied!`)
      setTimeout(() => setToastMessage(null), 2000)
    } catch (err) {
      setToastMessage('Failed to copy')
      setTimeout(() => setToastMessage(null), 2000)
    }
  }

  const handleShare = () => {
    const url = window.location.href
    const text = `Check out WETH/USDC pool at ${currentPrice} USDC per WETH`
    
    if (navigator.share) {
      navigator.share({
        title: 'WETH/USDC Pool',
        text: text,
        url: url,
      }).catch(() => {
        // Fallback to copying URL
        copyToClipboard(url, 'Link')
      })
    } else {
      // Fallback: copy URL to clipboard
      copyToClipboard(url, 'Link')
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showDropdown])

  // Calculate prices based on current base
  const displayPrice = priceBase === 'usdc' ? currentPrice : 1 / currentPrice
  const minPrice = priceBase === 'usdc' 
    ? currentPrice * (1 + leftHandlerPercent / 100)
    : (1 / currentPrice) * (1 - rightHandlerPercent / 100) // Inverted for WETH base
  const maxPrice = priceBase === 'usdc'
    ? currentPrice * (1 + rightHandlerPercent / 100)
    : (1 / currentPrice) * (1 - leftHandlerPercent / 100) // Inverted for WETH base
  
  // Calculate price range for chart legends
  const priceRange = {
    min: priceBase === 'usdc' 
      ? currentPrice * (1 + leftHandlerPercent / 100)
      : (1 / currentPrice) * (1 - rightHandlerPercent / 100),
    max: priceBase === 'usdc'
      ? currentPrice * (1 + rightHandlerPercent / 100)
      : (1 / currentPrice) * (1 - leftHandlerPercent / 100),
  }
  
  // Format number with subscript for small decimals (e.g., 0.0₄2, 0.0₃29)
  // Rules:
  // 1. Count consecutive zeros immediately after the decimal point
  // 2. Format: 0.0<subscript indicating zeros skipped><first non-zero digit><up to N following significant digits>
  // 3. N defaults to 2
  // 4. Never round; just truncate after N digits
  // Examples:
  // - 0.00002 → 0.0₄2
  // - 0.000290 → 0.0₃29 (with N=2)
  const formatWithSubscript = (num: number, maxDigitsAfterSubscript: number = 2): string | React.ReactNode => {
    if (num >= 1) {
      return num.toFixed(2)
    }
    
    const str = num.toFixed(15) // Use more precision to catch all zeros
    const match = str.match(/^0\.(0*)(\d+)$/)
    
    if (match) {
      const zerosAfterDecimal = match[1]
      const remainingDigits = match[2]
      
      // Count consecutive zeros
      const zeroCount = zerosAfterDecimal.length
      
      // If we have zeros after decimal, use subscript notation
      if (zeroCount > 0 && remainingDigits.length > 0) {
        const firstNonZero = remainingDigits[0]
        const followingDigits = remainingDigits.slice(1, 1 + maxDigitsAfterSubscript)
        
        // Format: 0.0<subscript><first non-zero><following digits>
        return (
          <span className="font-mono inline-flex items-baseline">
            <span style={{ fontFeatureSettings: '"zero"' }}>0</span>.
            <span style={{ fontFeatureSettings: '"zero"' }}>0</span>
            <sub className="text-[0.65em] leading-none" style={{ fontFeatureSettings: 'normal', verticalAlign: 'sub', fontSize: '0.65em' }}>
              {zeroCount}
            </sub>
            {firstNonZero}
            {followingDigits}
          </span>
        )
      }
    }
    
    // Default formatting for numbers without leading zeros
    if (num >= 0.01) {
      return num.toFixed(4)
    } else if (num >= 0.001) {
      return num.toFixed(5)
    } else {
      return num.toFixed(6)
    }
  }

  // Generate legend labels based on price range
  const generateLegendLabels = () => {
    const range = priceRange.max - priceRange.min
    const step = range / 5
    const labels: string[] = []
    
    for (let i = 0; i < 6; i++) {
      const value = priceRange.min + (step * i)
      if (priceBase === 'usdc') {
        // Format as USDC (e.g., 2.00k, 3.50k)
        if (value >= 1000) {
          labels.push(`${(value / 1000).toFixed(2)}k`)
        } else {
          labels.push(value.toFixed(2))
        }
      } else {
        // Format as WETH with subscript if needed
        const formatted = formatWithSubscript(value)
        // Convert React node to string for legend labels
        if (typeof formatted === 'string') {
          labels.push(formatted)
        } else {
          // For React nodes, we'll handle them separately in the render
          labels.push(value.toFixed(10))
        }
      }
    }
    
    return labels
  }
  
  const legendLabels = generateLegendLabels()

  // Calculate APR based on range width
  const calculateAPR = () => {
    const rangeWidth = Math.abs(rightHandlerPercent - leftHandlerPercent)
    const concentrationFactor = 100 / rangeWidth
    const baseFeeAPR = 30
    const apr = baseFeeAPR * concentrationFactor * 0.75
    return Math.min(apr, 500)
  }

  const estimatedAPR = calculateAPR()

  // Handle price input changes - sync with handlers
  const handleMinPriceChange = (newMinPrice: number) => {
    if (priceBase === 'usdc') {
      const newPercent = ((newMinPrice / currentPrice) - 1) * 100
      const maxLeft = rightHandlerPercent - 1
      const cappedPercent = Math.max(-50, Math.min(newPercent, maxLeft))
      setLeftHandlerPercent(cappedPercent)
    } else {
      // For WETH base, min price corresponds to max handler percent
      const basePrice = 1 / currentPrice
      const newPercent = ((basePrice / newMinPrice) - 1) * 100
      const minRight = leftHandlerPercent + 1
      const cappedPercent = Math.min(50, Math.max(newPercent, minRight))
      setRightHandlerPercent(cappedPercent)
    }
  }

  const handleMaxPriceChange = (newMaxPrice: number) => {
    if (priceBase === 'usdc') {
      const newPercent = ((newMaxPrice / currentPrice) - 1) * 100
      const minRight = leftHandlerPercent + 1
      const cappedPercent = Math.min(50, Math.max(newPercent, minRight))
      setRightHandlerPercent(cappedPercent)
    } else {
      // For WETH base, max price corresponds to min handler percent
      const basePrice = 1 / currentPrice
      const newPercent = ((basePrice / newMaxPrice) - 1) * 100
      const maxLeft = rightHandlerPercent - 1
      const cappedPercent = Math.max(-50, Math.min(newPercent, maxLeft))
      setLeftHandlerPercent(cappedPercent)
    }
  }
  
  const togglePriceBase = () => {
    setPriceBase(prev => prev === 'usdc' ? 'weth' : 'usdc')
  }

  // Convert price to pixel position on the chart (0-771)
  const priceToPosition = (price: number): number => {
    const totalWidth = 771
    // Map price to position: minPossiblePrice = 0, maxPossiblePrice = totalWidth
    const priceRange = maxPossiblePrice - minPossiblePrice
    if (priceRange === 0) return totalWidth / 2
    
    const normalizedPrice = (price - minPossiblePrice) / priceRange
    return normalizedPrice * totalWidth
  }

  // Convert pixel position to price
  const positionToPrice = (position: number): number => {
    const totalWidth = 771
    const normalizedPosition = position / totalWidth
    return minPossiblePrice + (normalizedPosition * (maxPossiblePrice - minPossiblePrice))
  }

  // Calculate exact positions for min and max prices on the chart
  const minPricePosition = priceToPosition(minPrice)
  const maxPricePosition = priceToPosition(maxPrice)
  const currentPricePosition = priceToPosition(currentPrice)

  // Reset handlers to default position and zoom level
  const handleReset = () => {
    setLeftHandlerPercent(defaultLeftHandlerPercent)
    setRightHandlerPercent(defaultRightHandlerPercent)
    setZoomLevel(1)
  }

  // Calculate zoomed viewBox for the chart
  // Always centers on current price (median line) - the most common swap price
  const getChartViewBox = () => {
    const baseWidth = 771
    const baseHeight = 200
    
    if (zoomLevel === 1) {
      return { 
        viewBox: `0 0 ${baseWidth} ${baseHeight}`, 
        viewBoxX: 0, 
        viewBoxWidth: baseWidth,
        viewBoxMin: 0,
        viewBoxMax: baseWidth
      }
    }
    
    // Always center zoom on current price position (median line)
    // This represents the most common swap price, regardless of liquidity concentration
    const zoomCenterX = currentPricePosition
    
    // Calculate visible width based on zoom level
    // Higher zoom = narrower view (focusing on current price)
    const visibleWidth = baseWidth / zoomLevel
    const visibleHeight = baseHeight
    
    // Calculate viewBox x position to center on current price
    // Always try to center on current price, but clamp to bounds when necessary
    let viewBoxX = zoomCenterX - visibleWidth / 2
    
    // Clamp to bounds - but prioritize keeping current price centered
    if (viewBoxX < 0) {
      // If we hit the left edge, current price might not be perfectly centered
      // but we ensure it's visible and as centered as possible
      viewBoxX = 0
    } else if (viewBoxX + visibleWidth > baseWidth) {
      // If we hit the right edge, current price might not be perfectly centered
      // but we ensure it's visible and as centered as possible
      viewBoxX = baseWidth - visibleWidth
    }
    
    // Verify current price is within visible range (should always be true after clamping)
    // If current price would be outside, adjust viewBox to include it
    if (zoomCenterX < viewBoxX) {
      viewBoxX = Math.max(0, zoomCenterX - visibleWidth / 2)
    } else if (zoomCenterX > viewBoxX + visibleWidth) {
      viewBoxX = Math.min(baseWidth - visibleWidth, zoomCenterX - visibleWidth / 2)
    }
    
    return { 
      viewBox: `${viewBoxX} 0 ${visibleWidth} ${visibleHeight}`, 
      viewBoxX, 
      viewBoxWidth: visibleWidth,
      viewBoxMin: viewBoxX,
      viewBoxMax: viewBoxX + visibleWidth
    }
  }

  const chartViewBox = getChartViewBox()

  // Zoom in - narrow the view range for finer control and zoom into chart
  const handleZoomIn = () => {
    const newZoomLevel = Math.min(zoomLevel * 1.5, 5) // Max zoom 5x
    setZoomLevel(newZoomLevel)
    
    // Calculate center of current range
    const centerPercent = (leftHandlerPercent + rightHandlerPercent) / 2
    const currentRange = rightHandlerPercent - leftHandlerPercent
    
    // Narrow the range by the zoom factor
    const newRange = currentRange / 1.5
    const halfRange = newRange / 2
    
    // Ensure we don't exceed bounds
    const newLeft = Math.max(-50, Math.min(centerPercent - halfRange, rightHandlerPercent - 1))
    const newRight = Math.min(50, Math.max(centerPercent + halfRange, leftHandlerPercent + 1))
    
    setLeftHandlerPercent(newLeft)
    setRightHandlerPercent(newRight)
  }

  // Zoom out - widen the view range and zoom out of chart
  const handleZoomOut = () => {
    const newZoomLevel = Math.max(zoomLevel / 1.5, 0.5) // Min zoom 0.5x
    setZoomLevel(newZoomLevel)
    
    // Calculate center of current range
    const centerPercent = (leftHandlerPercent + rightHandlerPercent) / 2
    const currentRange = rightHandlerPercent - leftHandlerPercent
    
    // Widen the range by the zoom factor
    const newRange = currentRange * 1.5
    const halfRange = newRange / 2
    
    // Ensure we don't exceed bounds
    const newLeft = Math.max(-50, centerPercent - halfRange)
    const newRight = Math.min(50, centerPercent + halfRange)
    
    setLeftHandlerPercent(newLeft)
    setRightHandlerPercent(newRight)
  }

  // Calculate liquidity concentration for a given price
  // Higher concentration near current price and within selected range
  const calculateLiquidityConcentration = (price: number): number => {
    // Base concentration: highest at current price, decays exponentially
    const priceDistance = Math.abs(price - currentPrice)
    const priceDistancePercent = (priceDistance / currentPrice) * 100
    
    // Base exponential decay from current price (more realistic curve)
    // Using a steeper decay for more realistic liquidity distribution
    const baseConcentration = Math.exp(-priceDistancePercent / 8)
    
    // Boost concentration within selected range (where LPs have active positions)
    const isInSelectedRange = price >= minPrice && price <= maxPrice
    const rangeWidth = maxPrice - minPrice
    const rangeWidthPercent = (rangeWidth / currentPrice) * 100
    
    // Stronger boost for tighter ranges (more concentrated liquidity)
    let rangeBoost = 1.0
    if (isInSelectedRange) {
      // Tighter ranges get more boost (more concentrated = higher liquidity)
      if (rangeWidthPercent < 5) {
        rangeBoost = 2.0 // Very tight range = high concentration
      } else if (rangeWidthPercent < 15) {
        rangeBoost = 1.6 // Medium range = good concentration
      } else {
        rangeBoost = 1.3 // Wide range = moderate concentration
      }
    } else {
      // Outside selected range has lower liquidity
      rangeBoost = 0.5
    }
    
    // Additional boost very close to current price (most active trading area)
    const nearPriceBoost = priceDistancePercent < 1 ? 1.5 : 
                          priceDistancePercent < 3 ? 1.2 : 1.0
    
    // Calculate final concentration
    const concentration = baseConcentration * rangeBoost * nearPriceBoost
    
    // Ensure minimum visibility and cap at maximum
    return Math.max(0.08, Math.min(1.0, concentration))
  }

  // Convert to percentages for overlay positioning, constrained to chart bounds (0-100%)
  const leftPosition = Math.max(0, Math.min(100, (minPricePosition / 771) * 100))
  const rightPosition = Math.max(0, Math.min(100, (maxPricePosition / 771) * 100))

  const handleMouseMove = (e: MouseEvent) => {
    if (!chartRef.current) return
    
    const rect = chartRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    
    // Convert mouse position to SVG coordinate space
    // Account for SVG scaling if needed
    const svgElement = chartRef.current.querySelector('svg')
    if (!svgElement) return
    
    const svgRect = svgElement.getBoundingClientRect()
    const svgX = ((x - (rect.left - svgRect.left)) / svgRect.width) * 771
    
    // Convert SVG position to price
    const targetPrice = positionToPrice(svgX)
    
    if (isDraggingLeft) {
      // Ensure we don't go beyond bounds or cross the right handler
      const constrainedPrice = Math.max(minPossiblePrice, Math.min(targetPrice, maxPrice - (maxPrice - minPrice) * 0.01))
      const newPercent = ((constrainedPrice / currentPrice) - 1) * 100
      const maxLeft = rightHandlerPercent - 1 // Minimum 1% gap
      const cappedPercent = Math.max(-50, Math.min(newPercent, maxLeft))
      setLeftHandlerPercent(cappedPercent)
    } else if (isDraggingRight) {
      // Ensure we don't go beyond bounds or cross the left handler
      const constrainedPrice = Math.max(minPrice + (maxPrice - minPrice) * 0.01, Math.min(targetPrice, maxPossiblePrice))
      const newPercent = ((constrainedPrice / currentPrice) - 1) * 100
      const minRight = leftHandlerPercent + 1 // Minimum 1% gap
      const cappedPercent = Math.min(50, Math.max(newPercent, minRight))
      setRightHandlerPercent(cappedPercent)
    }
  }

  const handleMouseUp = () => {
    setIsDraggingLeft(false)
    setIsDraggingRight(false)
    setShowLeftTooltip(false)
    setShowRightTooltip(false)
  }

  useEffect(() => {
    if (isDraggingLeft || isDraggingRight) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDraggingLeft, isDraggingRight, leftHandlerPercent, rightHandlerPercent])

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-50 p-8 relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-[#342c24] text-white px-4 py-2 rounded-[2px] shadow-lg text-sm font-medium"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white border border-[#ffd2b5] rounded-[2px] relative w-full max-w-2xl">
        {/* Breadcrumb Section */}
        <div className="bg-[#ffe2d1] border-b border-[#ffd2b5] px-3 py-2">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-[#8b7e6f]" fill="none" viewBox="0 0 16 16">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className="text-[10px] text-[#8b7e6f] tracking-[0.2px]">Back to Pools</span>
            <svg className="w-4 h-4 text-[#8b7e6f]" fill="none" viewBox="0 0 16 16">
              <line x1="4" y1="8" x2="12" y2="8" stroke="currentColor" strokeWidth="1" strokeLinecap="square"/>
            </svg>
            <span className="text-[10px] text-[#8c0200] tracking-[0.2px]">USDC/WETH</span>
          </div>
        </div>

        {/* Header Section */}
        <div className="p-3 border-b border-[#ffd2b5]">
          {/* Pair Info Row */}
          <div className="flex items-start justify-between mb-4">
            {/* Pair Info */}
            <div className="flex items-center gap-2">
              {/* Token Icons */}
              <div className="flex items-center -space-x-2">
                {/* WETH Icon */}
                <div className="w-8 h-8 relative z-10">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_weth)">
                      <rect width="32" height="32" rx="16" fill="white"/>
                      <g clipPath="url(#clip1_weth)">
                        <path d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z" fill="#627EEA"/>
                        <path d="M15.9976 4.57227V13.0216L23.139 16.2128L15.9976 4.57227Z" fill="white" fillOpacity="0.602"/>
                        <path d="M15.9979 4.57227L8.85547 16.2128L15.9979 13.0216V4.57227Z" fill="white"/>
                        <path d="M15.9976 21.6866V27.4278L23.1438 17.541L15.9976 21.6866Z" fill="white" fillOpacity="0.602"/>
                        <path d="M15.9979 27.4278V21.6857L8.85547 17.541L15.9979 27.4278Z" fill="white"/>
                        <path d="M15.9976 20.3583L23.139 16.2117L15.9976 13.0225V20.3583Z" fill="white" fillOpacity="0.2"/>
                        <path d="M8.85547 16.2117L15.9979 20.3583V13.0225L8.85547 16.2117Z" fill="white" fillOpacity="0.602"/>
                      </g>
                    </g>
                    <rect x="0.5" y="0.5" width="31" height="31" rx="15.5" stroke="#D9D9D9" strokeOpacity="0.1"/>
                    <defs>
                      <clipPath id="clip0_weth">
                        <rect width="32" height="32" rx="16" fill="white"/>
                      </clipPath>
                      <clipPath id="clip1_weth">
                        <rect width="32" height="32" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                {/* USDC Icon */}
                <div className="w-8 h-8 relative">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_usdc)">
                      <rect width="32" height="32" rx="16" fill="#2B354A"/>
                      <path d="M16 32C24.8667 32 32 24.8667 32 16C32 7.13328 24.8667 0 16 0C7.13328 0 0 7.13328 0 16C0 24.8667 7.13328 32 16 32Z" fill="#2775CA"/>
                      <path d="M20.467 18.3668C20.467 16.0335 19.067 15.2335 16.267 14.9002C14.267 14.6335 13.867 14.1002 13.867 13.1668C13.867 12.2334 14.5337 11.6335 15.867 11.6335C17.067 11.6335 17.7337 12.0335 18.067 13.0335C18.1337 13.2335 18.3337 13.3668 18.5337 13.3668H19.6003C19.867 13.3668 20.067 13.1668 20.067 12.9002V12.8335C19.8003 11.3668 18.6003 10.2335 17.067 10.1002V8.50024C17.067 8.23352 16.867 8.03352 16.5337 7.9668H15.5337C15.267 7.9668 15.067 8.1668 15.0003 8.50024V10.0335C13.0003 10.3002 11.7337 11.6335 11.7337 13.3002C11.7337 15.5002 13.067 16.3668 15.867 16.7002C17.7337 17.0335 18.3337 17.4335 18.3337 18.5002C18.3337 19.567 17.4003 20.3002 16.1337 20.3002C14.4003 20.3002 13.8003 19.5668 13.6003 18.5668C13.5337 18.3002 13.3337 18.1668 13.1337 18.1668H12.0003C11.7337 18.1668 11.5337 18.3668 11.5337 18.6335V18.7002C11.8003 20.3668 12.867 21.5668 15.067 21.9002V23.5002C15.067 23.7668 15.267 23.9668 15.6003 24.0335H16.6003C16.867 24.0335 17.067 23.8335 17.1337 23.5002V21.9002C19.1337 21.5668 20.467 20.1668 20.467 18.3668Z" fill="white"/>
                      <path d="M12.5998 25.3334C7.39984 23.4668 4.73312 17.6668 6.66656 12.5334C7.66656 9.73336 9.86656 7.60008 12.5998 6.60008C12.8666 6.4668 12.9998 6.2668 12.9998 5.93336V5.00008C12.9998 4.73336 12.8666 4.53336 12.5998 4.4668C12.5331 4.4668 12.3998 4.4668 12.3331 4.53336C5.99984 6.53336 2.53311 13.2668 4.53311 19.6001C5.73311 23.3334 8.59984 26.2001 12.3331 27.4001C12.5998 27.5334 12.8666 27.4001 12.9331 27.1334C12.9998 27.0668 12.9998 27.0001 12.9998 26.8668V25.9334C12.9998 25.7334 12.7998 25.4668 12.5998 25.3334ZM19.6666 4.53336C19.3998 4.40008 19.1331 4.53336 19.0666 4.80008C18.9998 4.8668 18.9998 4.93336 18.9998 5.0668V6.00008C18.9998 6.2668 19.1998 6.53336 19.3998 6.6668C24.5998 8.53336 27.2666 14.3334 25.3331 19.4668C24.3331 22.2668 22.1331 24.4001 19.3998 25.4001C19.1331 25.5334 18.9998 25.7334 18.9998 26.0668V27.0001C18.9998 27.2668 19.1331 27.4668 19.3998 27.5334C19.4666 27.5334 19.5998 27.5334 19.6666 27.4668C25.9998 25.4668 29.4666 18.7334 27.4666 12.4001C26.2666 8.60008 23.3331 5.73336 19.6666 4.53336Z" fill="white"/>
                    </g>
                    <rect x="0.5" y="0.5" width="31" height="31" rx="15.5" stroke="#D9D9D9" strokeOpacity="0.1"/>
                    <defs>
                      <clipPath id="clip0_usdc">
                        <rect width="32" height="32" rx="16" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
              
              {/* Pair Name */}
              <span 
                className="text-[#1A150F]"
                style={{
                  fontFamily: '"Neue Haas Grotesk Display", sans-serif',
                  fontSize: '14px',
                  fontWeight: 500,
                  lineHeight: '115%',
                  letterSpacing: '0.28px'
                }}
              >
                WETH/USDC
              </span>
              
              {/* In Range Badge */}
              <div className="bg-[#f2eeea] flex items-center gap-1.5 pl-px pr-1.5 py-px rounded-[3px]">
                <div className="bg-[#a6f2d5] flex items-center justify-center gap-0.5 p-1 rounded-[2px]">
                  <div className="w-1 h-1 rounded-full bg-[#14674A]" />
                  <span className="text-[10px] uppercase text-[#14674a] font-mono tracking-[-0.2px] leading-[10px]">In range</span>
                </div>
                <div className="flex items-center gap-px">
                  <span className="text-[10px] text-[#342c24] font-mono tracking-[-0.2px] leading-[10px]">0.3</span>
                  <span className="text-[10px] text-[#6d6153] font-mono tracking-[-0.2px] leading-[10px]">%</span>
                </div>
              </div>
            </div>
            
            {/* Action Icons */}
            <div className="flex items-center gap-2 p-0.5" ref={dropdownRef}>
              {/* Dropdown Button */}
              <div className="relative">
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="p-0.5 hover:bg-gray-100 rounded-[1px] flex items-center gap-0.5"
                >
                  <svg className="w-4 h-4 text-[#6d6153]" fill="none" viewBox="0 0 16 16">
                    <g clipPath="url(#clip0_mega)">
                      <path d="M5.87354 5.60386V4.85386H5.12354V5.60386H5.87354ZM6.59146 5.60386L7.29086 5.33305L7.10531 4.85386H6.59146V5.60386ZM7.9928 9.22296L7.2934 9.49377L7.47895 9.97296H7.9928V9.22296ZM9.47945 5.60386V4.85386H8.97546L8.78504 5.32049L9.47945 5.60386ZM10.1253 5.60386H10.8753V4.85386H10.1253V5.60386ZM8.00257 9.22296V9.97296H8.50656L8.69698 9.50633L8.00257 9.22296ZM6.66843 9.99789C6.25422 9.99789 5.91843 10.3337 5.91843 10.7479C5.91843 11.1621 6.25422 11.4979 6.66843 11.4979V10.7479V9.99789ZM6.67509 11.4979C7.0893 11.4979 7.42509 11.1621 7.42509 10.7479C7.42509 10.3337 7.0893 9.99789 6.67509 9.99789V10.7479V11.4979ZM9.33232 9.99789C8.9181 9.99789 8.58232 10.3337 8.58232 10.7479C8.58232 11.1621 8.9181 11.4979 9.33232 11.4979V10.7479V9.99789ZM9.33898 11.4979C9.75319 11.4979 10.089 11.1621 10.089 10.7479C10.089 10.3337 9.75319 9.99789 9.33898 9.99789V10.7479V11.4979ZM5.87354 9.6373H6.62354V5.60386H5.87354H5.12354V9.6373H5.87354ZM5.87354 5.60386V6.35386H6.59146V5.60386V4.85386H5.87354V5.60386ZM6.59146 5.60386L5.89206 5.87467L7.2934 9.49377L7.9928 9.22296L8.6922 8.95215L7.29086 5.33305L6.59146 5.60386ZM9.47945 5.60386V6.35386H10.1253V5.60386V4.85386H9.47945V5.60386ZM10.1253 5.60386H9.37529V9.6373H10.1253H10.8753V5.60386H10.1253ZM7.9928 9.22296V9.97296H8.00257V9.22296V8.47296H7.9928V9.22296ZM8.00257 9.22296L8.69698 9.50633L10.1739 5.88723L9.47945 5.60386L8.78504 5.32049L7.30817 8.93959L8.00257 9.22296ZM14.5 8H13.75C13.75 11.1756 11.1756 13.75 8 13.75V14.5V15.25C12.0041 15.25 15.25 12.0041 15.25 8H14.5ZM8 14.5V13.75C4.82436 13.75 2.25 11.1756 2.25 8H1.5H0.75C0.75 12.0041 3.99594 15.25 8 15.25V14.5ZM1.5 8H2.25C2.25 4.82436 4.82436 2.25 8 2.25V1.5V0.75C3.99594 0.75 0.75 3.99594 0.75 8H1.5ZM8 1.5V2.25C11.1756 2.25 13.75 4.82436 13.75 8H14.5H15.25C15.25 3.99594 12.0041 0.75 8 0.75V1.5ZM6.66843 10.7479V11.4979H6.67509V10.7479V9.99789H6.66843V10.7479ZM6.83491 10.7479H7.58491C7.58491 10.2417 7.17452 9.83142 6.66843 9.83142V10.5814V11.3314C6.34622 11.3314 6.08491 11.0702 6.08491 10.7479H6.83491ZM6.66843 10.5814V9.83142C6.16233 9.83142 5.75195 10.2417 5.75195 10.7479H6.50195H7.25195C7.25195 11.0702 6.99064 11.3314 6.66843 11.3314V10.5814ZM6.50195 10.7479H5.75195C5.75195 11.2541 6.16233 11.6644 6.66843 11.6644V10.9144V10.1644C6.99064 10.1644 7.25195 10.4256 7.25195 10.7479H6.50195ZM6.66843 10.9144V11.6644C7.17453 11.6644 7.58491 11.2541 7.58491 10.7479H6.83491H6.08491C6.08491 10.4256 6.34622 10.1644 6.66843 10.1644V10.9144ZM9.33232 10.7479V11.4979H9.33898V10.7479V9.99789H9.33232V10.7479ZM9.49879 10.7479H10.2488C10.2488 10.2417 9.83849 9.83142 9.33232 9.83142V10.5814V11.3314C9.01007 11.3314 8.74879 11.0701 8.74879 10.7479H9.49879ZM9.33232 10.5814V9.83142C8.82614 9.83142 8.41584 10.2417 8.41584 10.7479H9.16584H9.91584C9.91584 11.0701 9.65457 11.3314 9.33232 11.3314V10.5814ZM9.16584 10.7479H8.41584C8.41584 11.2541 8.82614 11.6644 9.33232 11.6644V10.9144V10.1644C9.65457 10.1644 9.91584 10.4256 9.91584 10.7479H9.16584ZM9.33232 10.9144V11.6644C9.83849 11.6644 10.2488 11.2541 10.2488 10.7479H9.49879H8.74879C8.74879 10.4256 9.01007 10.1644 9.33232 10.1644V10.9144Z" fill="#6D6153"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_mega">
                        <rect width="16" height="16" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                  <svg 
                    className={`w-4 h-4 text-[#a99c8d] transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`}
                    fill="none" 
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.33203 6.66699L7.9987 9.33366L10.6654 6.66699" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
                  </svg>
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-1 bg-white border border-[#dcd2c8] rounded-[2px] shadow-lg z-50 min-w-[280px]"
                    >
                      {/* Pool Contract */}
                      <div className="flex items-center justify-between p-3 border-b border-[#dcd2c8] hover:bg-gray-50">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <div className="flex items-center -space-x-2 flex-shrink-0">
                            <div className="w-5 h-5 relative z-10">
                              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="w-full h-full">
                                <g clipPath="url(#clip0_weth_dropdown)">
                                  <rect width="32" height="32" rx="16" fill="white"/>
                                  <g clipPath="url(#clip1_weth_dropdown)">
                                    <path d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z" fill="#627EEA"/>
                                    <path d="M15.9976 4.57227V13.0216L23.139 16.2128L15.9976 4.57227Z" fill="white" fillOpacity="0.602"/>
                                    <path d="M15.9979 4.57227L8.85547 16.2128L15.9979 13.0216V4.57227Z" fill="white"/>
                                    <path d="M15.9976 21.6866V27.4278L23.1438 17.541L15.9976 21.6866Z" fill="white" fillOpacity="0.602"/>
                                    <path d="M15.9979 27.4278V21.6857L8.85547 17.541L15.9979 27.4278Z" fill="white"/>
                                    <path d="M15.9976 20.3583L23.139 16.2117L15.9976 13.0225V20.3583Z" fill="white" fillOpacity="0.2"/>
                                    <path d="M8.85547 16.2117L15.9979 20.3583V13.0225L8.85547 16.2117Z" fill="white" fillOpacity="0.602"/>
                                  </g>
                                </g>
                                <rect x="0.5" y="0.5" width="31" height="31" rx="15.5" stroke="#D9D9D9" strokeOpacity="0.1"/>
                                <defs>
                                  <clipPath id="clip0_weth_dropdown">
                                    <rect width="32" height="32" rx="16" fill="white"/>
                                  </clipPath>
                                  <clipPath id="clip1_weth_dropdown">
                                    <rect width="32" height="32" fill="white"/>
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div className="w-5 h-5 relative">
                              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="w-full h-full">
                                <g clipPath="url(#clip0_usdc_dropdown)">
                                  <rect width="32" height="32" rx="16" fill="#2B354A"/>
                                  <path d="M16 32C24.8667 32 32 24.8667 32 16C32 7.13328 24.8667 0 16 0C7.13328 0 0 7.13328 0 16C0 24.8667 7.13328 32 16 32Z" fill="#2775CA"/>
                                  <path d="M20.467 18.3668C20.467 16.0335 19.067 15.2335 16.267 14.9002C14.267 14.6335 13.867 14.1002 13.867 13.1668C13.867 12.2334 14.5337 11.6335 15.867 11.6335C17.067 11.6335 17.7337 12.0335 18.067 13.0335C18.1337 13.2335 18.3337 13.3668 18.5337 13.3668H19.6003C19.867 13.3668 20.067 13.1668 20.067 12.9002V12.8335C19.8003 11.3668 18.6003 10.2335 17.067 10.1002V8.50024C17.067 8.23352 16.867 8.03352 16.5337 7.9668H15.5337C15.267 7.9668 15.067 8.1668 15.0003 8.50024V10.0335C13.0003 10.3002 11.7337 11.6335 11.7337 13.3002C11.7337 15.5002 13.067 16.3668 15.867 16.7002C17.7337 17.0335 18.3337 17.4335 18.3337 18.5002C18.3337 19.567 17.4003 20.3002 16.1337 20.3002C14.4003 20.3002 13.8003 19.5668 13.6003 18.5668C13.5337 18.3002 13.3337 18.1668 13.1337 18.1668H12.0003C11.7337 18.1668 11.5337 18.3668 11.5337 18.6335V18.7002C11.8003 20.3668 12.867 21.5668 15.067 21.9002V23.5002C15.067 23.7668 15.267 23.9668 15.6003 24.0335H16.6003C16.867 24.0335 17.067 23.8335 17.1337 23.5002V21.9002C19.1337 21.5668 20.467 20.1668 20.467 18.3668Z" fill="white"/>
                                  <path d="M12.5998 25.3334C7.39984 23.4668 4.73312 17.6668 6.66656 12.5334C7.66656 9.73336 9.86656 7.60008 12.5998 6.60008C12.8666 6.4668 12.9998 6.2668 12.9998 5.93336V5.00008C12.9998 4.73336 12.8666 4.53336 12.5998 4.4668C12.5331 4.4668 12.3998 4.4668 12.3331 4.53336C5.99984 6.53336 2.53311 13.2668 4.53311 19.6001C5.73311 23.3334 8.59984 26.2001 12.3331 27.4001C12.5998 27.5334 12.8666 27.4001 12.9331 27.1334C12.9998 27.0668 12.9998 27.0001 12.9998 26.8668V25.9334C12.9998 25.7334 12.7998 25.4668 12.5998 25.3334ZM19.6666 4.53336C19.3998 4.40008 19.1331 4.53336 19.0666 4.80008C18.9998 4.8668 18.9998 4.93336 18.9998 5.0668V6.00008C18.9998 6.2668 19.1998 6.53336 19.3998 6.6668C24.5998 8.53336 27.2666 14.3334 25.3331 19.4668C24.3331 22.2668 22.1331 24.4001 19.3998 25.4001C19.1331 25.5334 18.9998 25.7334 18.9998 26.0668V27.0001C18.9998 27.2668 19.1331 27.4668 19.3998 27.5334C19.4666 27.5334 19.5998 27.5334 19.6666 27.4668C25.9998 25.4668 29.4666 18.7334 27.4666 12.4001C26.2666 8.60008 23.3331 5.73336 19.6666 4.53336Z" fill="white"/>
                                </g>
                                <rect x="0.5" y="0.5" width="31" height="31" rx="15.5" stroke="#D9D9D9" strokeOpacity="0.1"/>
                                <defs>
                                  <clipPath id="clip0_usdc_dropdown">
                                    <rect width="32" height="32" rx="16" fill="white"/>
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs text-[#342c24] font-medium mb-0.5">Pool Contract</div>
                            <div className="text-xs text-[#6d6153] font-mono truncate max-w-[180px]">{poolContract}</div>
                          </div>
                        </div>
                        <button
                          onClick={() => copyToClipboard(poolContract, 'Pool contract')}
                          className="ml-2 p-1 hover:bg-gray-200 rounded flex-shrink-0 transition-colors"
                        >
                          <svg className="w-3.5 h-3.5 text-[#6d6153]" fill="none" viewBox="0 0 16 16">
                            <path d="M5.5 4.5V3.5C5.5 2.67 6.17 2 7 2H12.5C13.33 2 14 2.67 14 3.5V9C14 9.83 13.33 10.5 12.5 10.5H11.5M3.5 5.5H10.5C11.33 5.5 12 6.17 12 7V13.5C12 14.33 11.33 15 10.5 15H3.5C2.67 15 2 14.33 2 13.5V7C2 6.17 2.67 5.5 3.5 5.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                          </svg>
                        </button>
                      </div>

                      {/* WETH Contract */}
                      <div className="flex items-center justify-between p-3 border-b border-[#dcd2c8] hover:bg-gray-50">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <div className="w-5 h-5 flex-shrink-0">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="w-full h-full">
                              <g clipPath="url(#clip0_weth_single)">
                                <rect width="32" height="32" rx="16" fill="white"/>
                                <g clipPath="url(#clip1_weth_single)">
                                  <path d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z" fill="#627EEA"/>
                                  <path d="M15.9976 4.57227V13.0216L23.139 16.2128L15.9976 4.57227Z" fill="white" fillOpacity="0.602"/>
                                  <path d="M15.9979 4.57227L8.85547 16.2128L15.9979 13.0216V4.57227Z" fill="white"/>
                                  <path d="M15.9976 21.6866V27.4278L23.1438 17.541L15.9976 21.6866Z" fill="white" fillOpacity="0.602"/>
                                  <path d="M15.9979 27.4278V21.6857L8.85547 17.541L15.9979 27.4278Z" fill="white"/>
                                  <path d="M15.9976 20.3583L23.139 16.2117L15.9976 13.0225V20.3583Z" fill="white" fillOpacity="0.2"/>
                                  <path d="M8.85547 16.2117L15.9979 20.3583V13.0225L8.85547 16.2117Z" fill="white" fillOpacity="0.602"/>
                                </g>
                              </g>
                              <rect x="0.5" y="0.5" width="31" height="31" rx="15.5" stroke="#D9D9D9" strokeOpacity="0.1"/>
                              <defs>
                                <clipPath id="clip0_weth_single">
                                  <rect width="32" height="32" rx="16" fill="white"/>
                                </clipPath>
                                <clipPath id="clip1_weth_single">
                                  <rect width="32" height="32" fill="white"/>
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs text-[#342c24] font-medium mb-0.5">WETH Contract</div>
                            <div className="text-xs text-[#6d6153] font-mono truncate max-w-[180px]">{wethContract}</div>
                          </div>
                        </div>
                        <button
                          onClick={() => copyToClipboard(wethContract, 'WETH contract')}
                          className="ml-2 p-1 hover:bg-gray-200 rounded flex-shrink-0 transition-colors"
                        >
                          <svg className="w-3.5 h-3.5 text-[#6d6153]" fill="none" viewBox="0 0 16 16">
                            <path d="M5.5 4.5V3.5C5.5 2.67 6.17 2 7 2H12.5C13.33 2 14 2.67 14 3.5V9C14 9.83 13.33 10.5 12.5 10.5H11.5M3.5 5.5H10.5C11.33 5.5 12 6.17 12 7V13.5C12 14.33 11.33 15 10.5 15H3.5C2.67 15 2 14.33 2 13.5V7C2 6.17 2.67 5.5 3.5 5.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                          </svg>
                        </button>
                      </div>

                      {/* USDC Contract */}
                      <div className="flex items-center justify-between p-3 hover:bg-gray-50">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <div className="w-5 h-5 flex-shrink-0">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="w-full h-full">
                              <g clipPath="url(#clip0_usdc_single)">
                                <rect width="32" height="32" rx="16" fill="#2B354A"/>
                                <path d="M16 32C24.8667 32 32 24.8667 32 16C32 7.13328 24.8667 0 16 0C7.13328 0 0 7.13328 0 16C0 24.8667 7.13328 32 16 32Z" fill="#2775CA"/>
                                <path d="M20.467 18.3668C20.467 16.0335 19.067 15.2335 16.267 14.9002C14.267 14.6335 13.867 14.1002 13.867 13.1668C13.867 12.2334 14.5337 11.6335 15.867 11.6335C17.067 11.6335 17.7337 12.0335 18.067 13.0335C18.1337 13.2335 18.3337 13.3668 18.5337 13.3668H19.6003C19.867 13.3668 20.067 13.1668 20.067 12.9002V12.8335C19.8003 11.3668 18.6003 10.2335 17.067 10.1002V8.50024C17.067 8.23352 16.867 8.03352 16.5337 7.9668H15.5337C15.267 7.9668 15.067 8.1668 15.0003 8.50024V10.0335C13.0003 10.3002 11.7337 11.6335 11.7337 13.3002C11.7337 15.5002 13.067 16.3668 15.867 16.7002C17.7337 17.0335 18.3337 17.4335 18.3337 18.5002C18.3337 19.567 17.4003 20.3002 16.1337 20.3002C14.4003 20.3002 13.8003 19.5668 13.6003 18.5668C13.5337 18.3002 13.3337 18.1668 13.1337 18.1668H12.0003C11.7337 18.1668 11.5337 18.3668 11.5337 18.6335V18.7002C11.8003 20.3668 12.867 21.5668 15.067 21.9002V23.5002C15.067 23.7668 15.267 23.9668 15.6003 24.0335H16.6003C16.867 24.0335 17.067 23.8335 17.1337 23.5002V21.9002C19.1337 21.5668 20.467 20.1668 20.467 18.3668Z" fill="white"/>
                                <path d="M12.5998 25.3334C7.39984 23.4668 4.73312 17.6668 6.66656 12.5334C7.66656 9.73336 9.86656 7.60008 12.5998 6.60008C12.8666 6.4668 12.9998 6.2668 12.9998 5.93336V5.00008C12.9998 4.73336 12.8666 4.53336 12.5998 4.4668C12.5331 4.4668 12.3998 4.4668 12.3331 4.53336C5.99984 6.53336 2.53311 13.2668 4.53311 19.6001C5.73311 23.3334 8.59984 26.2001 12.3331 27.4001C12.5998 27.5334 12.8666 27.4001 12.9331 27.1334C12.9998 27.0668 12.9998 27.0001 12.9998 26.8668V25.9334C12.9998 25.7334 12.7998 25.4668 12.5998 25.3334ZM19.6666 4.53336C19.3998 4.40008 19.1331 4.53336 19.0666 4.80008C18.9998 4.8668 18.9998 4.93336 18.9998 5.0668V6.00008C18.9998 6.2668 19.1998 6.53336 19.3998 6.6668C24.5998 8.53336 27.2666 14.3334 25.3331 19.4668C24.3331 22.2668 22.1331 24.4001 19.3998 25.4001C19.1331 25.5334 18.9998 25.7334 18.9998 26.0668V27.0001C18.9998 27.2668 19.1331 27.4668 19.3998 27.5334C19.4666 27.5334 19.5998 27.5334 19.6666 27.4668C25.9998 25.4668 29.4666 18.7334 27.4666 12.4001C26.2666 8.60008 23.3331 5.73336 19.6666 4.53336Z" fill="white"/>
                              </g>
                              <rect x="0.5" y="0.5" width="31" height="31" rx="15.5" stroke="#D9D9D9" strokeOpacity="0.1"/>
                              <defs>
                                <clipPath id="clip0_usdc_single">
                                  <rect width="32" height="32" rx="16" fill="white"/>
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs text-[#342c24] font-medium mb-0.5">USDC Contract</div>
                            <div className="text-xs text-[#6d6153] font-mono truncate max-w-[180px]">{usdcContract}</div>
                          </div>
                        </div>
                        <button
                          onClick={() => copyToClipboard(usdcContract, 'USDC contract')}
                          className="ml-2 p-1 hover:bg-gray-200 rounded flex-shrink-0 transition-colors"
                        >
                          <svg className="w-3.5 h-3.5 text-[#6d6153]" fill="none" viewBox="0 0 16 16">
                            <path d="M5.5 4.5V3.5C5.5 2.67 6.17 2 7 2H12.5C13.33 2 14 2.67 14 3.5V9C14 9.83 13.33 10.5 12.5 10.5H11.5M3.5 5.5H10.5C11.33 5.5 12 6.17 12 7V13.5C12 14.33 11.33 15 10.5 15H3.5C2.67 15 2 14.33 2 13.5V7C2 6.17 2.67 5.5 3.5 5.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                          </svg>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Share Button */}
              <button 
                onClick={handleShare}
                className="p-0.5 hover:bg-gray-100 rounded-[1px]"
              >
                <svg className="w-4 h-4 text-[#6d6153]" fill="none" viewBox="0 0 16 16">
                  <path d="M7.9987 10.333V2.66634M10.9987 5.33301L7.9987 2.33301L4.9987 5.33301M13.6654 9.66634V13.6663H2.33203V9.66634" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Price Display Row */}
          <div className="flex items-end justify-between gap-5">
            {/* Price and Label */}
            <div className="flex-1">
              <div className="text-[32px] font-mono text-[#342c24] uppercase leading-[1.25] tracking-normal">
                {priceBase === 'usdc' 
                  ? currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                  : (1 / currentPrice).toFixed(6)
                }
              </div>
              <div 
                className="flex items-center gap-[5px] py-[2px] text-[#8B7E6F]"
                style={{
                  fontFamily: '"Neue Haas Grotesk Display", sans-serif',
                  fontSize: '12px',
                  fontWeight: 400,
                  lineHeight: '120%',
                  letterSpacing: '0.24px'
                }}
              >
                <span>
                  {priceBase === 'usdc' ? 'USDC per WETH' : 'WETH per USDC'}
                </span>
                <button 
                  onClick={togglePriceBase}
                  className="p-0.5 hover:bg-gray-100 rounded-[1px] transition-colors flex items-center gap-0.5"
                  title={`Switch to ${priceBase === 'usdc' ? 'WETH per USDC' : 'USDC per WETH'}`}
                >
                  <svg className="w-4 h-4 text-[#6d6153]" fill="none" viewBox="0 0 16 16">
                    <path d="M11.4974 14L13.1641 12.3333L11.4974 10.6667M3.83073 2L2.16406 3.66667L3.83073 5.33333M3.33073 3.66667H12.9974V7M2.33073 9V12.3333H11.9974" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Chart Controls */}
            <div className="flex items-center gap-0.5 p-0.5">
              <button 
                onClick={handleReset}
                className="flex items-center gap-0.5 p-0.5 hover:bg-gray-100 rounded-[1px] transition-colors" 
                title="Reset"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6.3335 9.66634V13.6663H2.3335M6.00016 13.3033C3.85748 12.4949 2.3335 10.4253 2.3335 7.99967C2.3335 4.87006 4.87055 2.33301 8.00016 2.33301C8.83196 2.33301 9.6219 2.51223 10.3335 2.83417M13.4595 5.97928C14.5275 8.92103 13.0085 12.1716 10.0667 13.2395" stroke="#0D0B08" strokeWidth="1.5" strokeLinecap="square"/>
                </svg>
              </button>
              <button 
                onClick={handleZoomIn}
                className="flex items-center gap-0.5 p-0.5 hover:bg-gray-100 rounded-[1px] transition-colors" 
                title="Zoom in"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 4V8M8 8V12M8 8H4M8 8H12" stroke="#1A150F" strokeWidth="1.5" strokeLinecap="square"/>
                </svg>
              </button>
              <button 
                onClick={handleZoomOut}
                className="flex items-center gap-0.5 p-0.5 hover:bg-gray-100 rounded-[1px] transition-colors" 
                title="Zoom out"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12 8H4" stroke="#1A150F" strokeWidth="1.5" strokeLinecap="square"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Chart Container */}
        <div className="p-3">
          <div className="relative w-full" ref={chartRef} style={{ height: '228px' }}>
            {/* SVG Chart Area */}
            <svg 
              className="w-full h-[200px]" 
              viewBox={chartViewBox.viewBox}
              preserveAspectRatio="xMidYMid meet"
              style={{ display: 'block' }}
            >
              <defs>
                {/* Inactive range gradient */}
                <linearGradient id="gradient-inactive-v3" x1="0" x2="0" y1="0" y2="1" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FF9361" />
                  <stop offset="100%" stopColor="#FFE2D1" />
                </linearGradient>
                
                {/* Active range gradient */}
                <linearGradient id="gradient-active-v3" x1="0" x2="0" y1="0" y2="1" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#B91A00" />
                  <stop offset="100%" stopColor="#FF9361" />
                </linearGradient>
                
                {/* Handler line gradient */}
                <linearGradient id="gradient-handler-v3" x1="0" x2="0" y1="0" y2="1" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#C7BCAF" />
                  <stop offset="100%" stopColor="#0D0B08" />
                </linearGradient>
              </defs>

              {/* Histogram bars with spacing - dynamically calculated based on liquidity concentration */}
              {/* Only render bars visible in the current viewBox */}
              {Array.from({ length: 80 }).map((_, i) => {
                const totalWidth = 771
                const numBars = 80
                const gapSize = 2 // Gap between bars in SVG units - increased for better separation
                const totalGaps = (numBars - 1) * gapSize
                const availableWidth = totalWidth - totalGaps
                const barWidth = availableWidth / numBars
                const x = i * (barWidth + gapSize)
                const barCenterX = x + barWidth / 2
                const barLeft = x
                const barRight = x + barWidth
                
                // Only render bars that are visible in the current viewBox
                // Add small buffer for smooth transitions
                const buffer = 10
                if (barRight < chartViewBox.viewBoxMin - buffer || barLeft > chartViewBox.viewBoxMax + buffer) {
                  return null
                }
                
                // Calculate the price this bar represents
                // Map bar position to price range based on visible range (minPossiblePrice to maxPossiblePrice)
                const barCenterPercent = (barCenterX / totalWidth) * 100
                
                // Convert bar position to actual price
                // Bar at 0% = minPossiblePrice, bar at 100% = maxPossiblePrice
                // This represents the full possible price range, not just the selected range
                const barPrice = minPossiblePrice + ((barCenterPercent / 100) * (maxPossiblePrice - minPossiblePrice))
                
                // Calculate liquidity concentration for this price
                const concentration = calculateLiquidityConcentration(barPrice)
                
                // Calculate bar height based on concentration
                // Min height 20px, max height 200px
                const minHeight = 20
                const maxHeight = 200
                const height = minHeight + (concentration * (maxHeight - minHeight))
                
                // Determine if bar is in selected range
                const isInRange = barPrice >= minPrice && barPrice <= maxPrice
                
                return (
                  <rect
                    key={i}
                    x={x}
                    y={200 - height}
                    width={barWidth}
                    height={height}
                    fill={isInRange ? "url(#gradient-active-v3)" : "url(#gradient-inactive-v3)"}
                  />
                )
              })}
              
              {/* Current price dashed line - always centered in viewport */}
              {/* The line is at currentPricePosition in absolute coordinates */}
              {/* Since viewBox is centered on currentPricePosition, this line appears at center */}
              <line
                x1={currentPricePosition}
                y1="0"
                x2={currentPricePosition}
                y2="200"
                stroke="#342C24"
                strokeWidth="2"
                strokeDasharray="4 8"
                strokeLinecap="round"
              />
            </svg>

            {/* Range Overlay - synchronized with bar positions, constrained to chart bounds */}
            <div 
              className="absolute bg-[#ffe2d1] bottom-[28px] top-0 mix-blend-multiply pointer-events-none"
              style={{ 
                left: `${leftPosition}%`,
                width: `${Math.max(0, rightPosition - leftPosition)}%`,
                height: '200px',
                maxWidth: `${100 - leftPosition}%` // Prevent overflow
              }}
            >
              {/* Bottom border line */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#342C24]" />
            </div>

            {/* Left Handler - synchronized with bar positions */}
            <div
              className="absolute bottom-[28px] flex flex-col items-center cursor-ew-resize z-20"
              style={{ 
                left: `${leftPosition}%`, 
                transform: 'translateX(-50%)',
                height: '200px' 
              }}
              onMouseDown={() => {
                setIsDraggingLeft(true)
                setShowLeftTooltip(true)
              }}
              onMouseEnter={() => setShowLeftTooltip(true)}
              onMouseLeave={() => !isDraggingLeft && setShowLeftTooltip(false)}
            >
              {/* Tooltip */}
              {showLeftTooltip && (
                <div className="absolute left-0 top-2 -translate-x-full -ml-2">
                  <div className="bg-[#fafafa] px-3 py-2 rounded border border-[#dcd2c8] shadow-lg">
                    <p className="text-xs font-mono font-semibold text-[#342c24] uppercase whitespace-nowrap">
                      {leftHandlerPercent.toFixed(2)}%
                    </p>
                  </div>
                </div>
              )}
              
              {/* Vertical gradient line */}
              <div className="flex h-[calc(100%-20px)] items-center justify-center w-0">
                <div className="flex-none rotate-90 origin-center" style={{ width: '200px' }}>
                  <svg width="200" height="2" viewBox="0 0 200 2" fill="none">
                    <line x1="0" y1="1" x2="200" y2="1" stroke="url(#gradient-handler-v3)" strokeWidth="2" />
                  </svg>
                </div>
              </div>
              
              {/* Circular marker */}
              <div className="bg-[#fafafa] relative rounded-full w-5 h-5 border-2 border-[#342c24] translate-y-[11px]">
                <div className="absolute bottom-[33.33%] left-1/2 top-[33.33%] -translate-x-1/2 w-1.5">
                  <svg className="w-full h-full" fill="none" viewBox="0 0 8 9">
                    <line x1="1" y1="1" x2="1" y2="7.67" stroke="#342C24" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="7" y1="1" x2="7" y2="7.67" stroke="#342C24" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Right Handler - synchronized with bar positions */}
            <div
              className="absolute bottom-[28px] flex flex-col items-center cursor-ew-resize z-20"
              style={{ 
                left: `${rightPosition}%`, 
                transform: 'translateX(-50%)',
                height: '200px' 
              }}
              onMouseDown={() => {
                setIsDraggingRight(true)
                setShowRightTooltip(true)
              }}
              onMouseEnter={() => setShowRightTooltip(true)}
              onMouseLeave={() => !isDraggingRight && setShowRightTooltip(false)}
            >
              {/* Tooltip */}
              {showRightTooltip && (
                <div className="absolute right-0 top-2 translate-x-full mr-2">
                  <div className="bg-[#fafafa] px-3 py-2 rounded border border-[#dcd2c8] shadow-lg">
                    <p className="text-xs font-mono font-semibold text-[#342c24] uppercase whitespace-nowrap">
                      +{rightHandlerPercent.toFixed(2)}%
                    </p>
                  </div>
                </div>
              )}
              
              {/* Vertical gradient line */}
              <div className="flex h-[calc(100%-20px)] items-center justify-center w-0">
                <div className="flex-none rotate-90 origin-center" style={{ width: '200px' }}>
                  <svg width="200" height="2" viewBox="0 0 200 2" fill="none">
                    <line x1="0" y1="1" x2="200" y2="1" stroke="url(#gradient-handler-v3)" strokeWidth="2" />
                  </svg>
                </div>
              </div>
              
              {/* Circular marker */}
              <div className="bg-[#fafafa] relative rounded-full w-5 h-5 border-2 border-[#342c24] translate-y-[11px]">
                <div className="absolute bottom-[33.33%] left-1/2 top-[33.33%] -translate-x-1/2 w-1.5">
                  <svg className="w-full h-full" fill="none" viewBox="0 0 8 9">
                    <line x1="1" y1="1" x2="1" y2="7.67" stroke="#342C24" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="7" y1="1" x2="7" y2="7.67" stroke="#342C24" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Baseline */}
            <div className="absolute bottom-[28px] left-0 right-0 h-px bg-[#A99C8D]" />

                    {/* Legend - Price labels */}
                    <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-0 py-2">
                      {legendLabels.map((label, i) => {
                        const value = priceRange.min + ((priceRange.max - priceRange.min) / 5 * i)
                        
                        // Format with subscript if needed (for WETH base)
                        if (priceBase === 'weth' && value < 1) {
                          const str = value.toFixed(15)
                          const match = str.match(/^0\.(0*)(\d+)$/)
                          
                          if (match) {
                            const zerosAfterDecimal = match[1]
                            const remainingDigits = match[2]
                            const zeroCount = zerosAfterDecimal.length
                            
                            // Use subscript notation if there are zeros after decimal
                            // Format: 0.0<subscript><first non-zero><following digits>
                            if (zeroCount > 0 && remainingDigits.length > 0) {
                              const firstNonZero = remainingDigits[0]
                              const followingDigits = remainingDigits.slice(1, 3) // N=2
                              
                              return (
                                <span 
                                  key={`${label}-${i}`}
                                  className="text-xs font-mono text-[#a99c8d] uppercase tracking-tight inline-flex items-baseline justify-center"
                                  style={{ flex: 1 }}
                                >
                                  <span style={{ fontFeatureSettings: '"zero"' }}>0</span>.
                                  <span style={{ fontFeatureSettings: '"zero"' }}>0</span>
                                  <sub className="text-[0.65em] leading-none" style={{ fontFeatureSettings: 'normal', verticalAlign: 'sub', fontSize: '0.65em' }}>
                                    {zeroCount}
                                  </sub>
                                  {firstNonZero}
                                  {followingDigits}
                                </span>
                              )
                            }
                          }
                        }
                        
                        return (
                          <span 
                            key={`${label}-${i}`}
                            className="text-xs font-mono text-[#a99c8d] uppercase tracking-tight"
                            style={{ flex: 1, textAlign: 'center' }}
                          >
                            {label}
                          </span>
                        )
                      })}
                    </div>
          </div>

          {/* Price Range Inputs */}
          <div className="mt-4 flex items-stretch w-full">
            <PriceInput
              label="Min"
              value={minPrice}
              onChange={handleMinPriceChange}
              usdValue={minPrice}
              priceBase={priceBase}
              formatWithSubscript={formatWithSubscript}
              isFirst={true}
            />
            <PriceInput
              label="Max"
              value={maxPrice}
              onChange={handleMaxPriceChange}
              usdValue={maxPrice}
              priceBase={priceBase}
              formatWithSubscript={formatWithSubscript}
              isLast={false}
            />
            
            {/* APR Display - Static component */}
            <div 
              className="bg-[#fafafa] flex flex-col gap-1 transition-colors"
              style={{ 
                padding: '12px',
                flex: '1 1 0',
                minWidth: 0,
                borderRadius: '0px',
                borderTop: '1px solid #ffd2b5',
                borderBottom: '1px solid #ffd2b5',
                borderRight: '1px solid #ffd2b5',
                borderLeft: '1px solid #ffd2b5'
              }}
            >
              <div className="flex items-center gap-1">
                <span className="text-xs text-[#a99c8d]">APR</span>
                <svg className="w-3 h-3 text-[#a99c8d]" fill="none" viewBox="0 0 16 16">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M8 6V8M8 10H8.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="text-xl font-mono text-[#1a150f] uppercase">
                {estimatedAPR.toFixed(2)}%
              </div>
              <div className="text-xs text-[#a99c8d]">
                Estimated
              </div>
            </div>
          </div>

          {/* Price Range Dropdown */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-1">
              {/* Time range buttons will go here */}
            </div>
            <button className="flex items-center gap-1 px-2 py-1 bg-[#fafafa] border border-[#eee7df] rounded text-xs font-mono text-[#6d6153] uppercase hover:bg-gray-50">
              <span>PRICE RANGE</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

