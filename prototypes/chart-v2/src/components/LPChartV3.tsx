import React, { useState, useRef, useEffect } from 'react'

interface LPChartV3Props {
  currentPrice?: number
  minPrice?: number
  maxPrice?: number
}

export default function LPChartV3({
  currentPrice = 3451.31,
  minPrice: minPossiblePrice = 2000,
  maxPrice: maxPossiblePrice = 4500,
}: LPChartV3Props) {
  const chartRef = useRef<HTMLDivElement>(null)
  const [leftHandlerPercent, setLeftHandlerPercent] = useState(-20.28)
  const [rightHandlerPercent, setRightHandlerPercent] = useState(19.28)
  const [isDraggingLeft, setIsDraggingLeft] = useState(false)
  const [isDraggingRight, setIsDraggingRight] = useState(false)
  const [showLeftTooltip, setShowLeftTooltip] = useState(false)
  const [showRightTooltip, setShowRightTooltip] = useState(false)

  const minPrice = currentPrice * (1 + leftHandlerPercent / 100)
  const maxPrice = currentPrice * (1 + rightHandlerPercent / 100)

  // Convert percent to position (0-100)
  const leftPosition = ((leftHandlerPercent + 50) / 100) * 100
  const rightPosition = ((rightHandlerPercent + 50) / 100) * 100

  const handleMouseMove = (e: MouseEvent) => {
    if (!chartRef.current) return
    
    const rect = chartRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percent = (x / rect.width) * 100
    // Convert from 0-100% position to -50% to +50% relative to center
    const pricePercent = (percent - 50)
    
    if (isDraggingLeft) {
      const maxLeft = rightHandlerPercent - 1 // Minimum 1% gap
      const cappedPercent = Math.max(-50, Math.min(pricePercent, maxLeft))
      setLeftHandlerPercent(cappedPercent)
    } else if (isDraggingRight) {
      const minRight = leftHandlerPercent + 1 // Minimum 1% gap
      const cappedPercent = Math.min(50, Math.max(pricePercent, minRight))
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
    <div className="bg-white border border-[#ffd2b5] rounded-[2px] relative w-full">
      {/* Header Section */}
      <div className="p-3 border-b border-[#ffd2b5]">
        <div className="flex items-start justify-between mb-4">
          {/* Pair Info */}
          <div className="flex items-center gap-2">
            <div className="flex items-center -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 border-2 border-white" />
              <div className="w-8 h-8 rounded-full bg-[#2b354a] border-2 border-white" />
            </div>
            <span className="text-sm font-medium text-[#1a150f]">WETH/USDC</span>
            <div className="bg-[#f2eeea] flex items-center gap-1.5 px-1.5 py-0.5 rounded">
              <div className="w-1.5 h-1.5 rounded-full bg-[#14674A]" />
              <span className="text-[10px] uppercase text-[#14674a] font-mono">In range</span>
              <span className="text-[10px] text-[#342c24] font-mono">0.3</span>
              <span className="text-[10px] text-[#6d6153] font-mono">%</span>
            </div>
          </div>
          
          {/* Action Icons */}
          <div className="flex items-center gap-1">
            <button className="p-1 hover:bg-gray-100 rounded">
              <svg className="w-4 h-4 text-[#6d6153]" fill="none" viewBox="0 0 16 16">
                <rect x="2" y="2" width="12" height="12" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              </svg>
            </button>
            <button className="p-1 hover:bg-gray-100 rounded">
              <svg className="w-4 h-4 text-[#6d6153]" fill="none" viewBox="0 0 16 16">
                <path d="M8 4v8M4 8h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Price Display */}
        <div className="flex items-end justify-between">
          <div>
            <div className="text-[32px] font-mono text-[#342c24] uppercase leading-tight">
              {currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-xs text-[#8b7e6f]">USDC per WETH</span>
              <button className="p-0.5 hover:bg-gray-100 rounded">
                <svg className="w-4 h-4 text-[#6d6153]" fill="none" viewBox="0 0 16 16">
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Chart Controls */}
          <div className="flex items-center gap-1">
            <button className="p-1 hover:bg-gray-100 rounded" title="Reset">
              <svg className="w-4 h-4 text-[#0D0B08]" fill="none" viewBox="0 0 16 16">
                <path d="M12 4L8 8M8 8L4 12M8 8L12 12M8 8L4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
              </svg>
            </button>
            <button className="p-1 hover:bg-gray-100 rounded" title="Zoom in">
              <svg className="w-4 h-4 text-[#1A150F]" fill="none" viewBox="0 0 16 16">
                <circle cx="8" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <path d="M8 6v4M6 8h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
              </svg>
            </button>
            <button className="p-1 hover:bg-gray-100 rounded" title="Zoom out">
              <svg className="w-4 h-4 text-[#1A150F]" fill="none" viewBox="0 0 16 16">
                <circle cx="8" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <line x1="6" y1="8" x2="10" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
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
            viewBox="0 0 771 200" 
            preserveAspectRatio="none"
            style={{ display: 'block' }}
          >
            <defs>
              {/* Inactive range gradient */}
              <linearGradient id="gradient-inactive" x1="0" x2="0" y1="0" y2="1" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FF9361" />
                <stop offset="100%" stopColor="#FFE2D1" />
              </linearGradient>
              
              {/* Active range gradient */}
              <linearGradient id="gradient-active" x1="0" x2="0" y1="0" y2="1" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#B91A00" />
                <stop offset="100%" stopColor="#FF9361" />
              </linearGradient>
              
              {/* Handler line gradient */}
              <linearGradient id="gradient-handler" x1="0" x2="0" y1="0" y2="1" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#C7BCAF" />
                <stop offset="100%" stopColor="#0D0B08" />
              </linearGradient>
            </defs>

            {/* Histogram bars */}
            {Array.from({ length: 80 }).map((_, i) => {
              const totalWidth = 771
              const barWidth = totalWidth / 80
              const x = i * barWidth
              const center = totalWidth / 2
              const distance = Math.abs(x - center)
              // Create realistic liquidity distribution - exponential decay from center
              const maxDistance = totalWidth / 2
              const normalizedDistance = distance / maxDistance
              const height = Math.max(20, 200 * Math.exp(-normalizedDistance * 2.5))
              
              // Determine if bar is in selected range
              const barPercent = (i / 80) * 100
              const leftPosition = ((leftHandlerPercent + 50) / 100) * 100
              const rightPosition = ((rightHandlerPercent + 50) / 100) * 100
              const isInRange = barPercent >= leftPosition && barPercent <= rightPosition
              
              return (
                <rect
                  key={i}
                  x={x}
                  y={200 - height}
                  width={barWidth}
                  height={height}
                  fill={isInRange ? "url(#gradient-active)" : "url(#gradient-inactive)"}
                />
              )
            })}
            
            {/* Current price dashed line - center of chart */}
            <line
              x1="385.5"
              y1="0"
              x2="385.5"
              y2="200"
              stroke="#342C24"
              strokeWidth="2"
              strokeDasharray="4 8"
              strokeLinecap="round"
            />
          </svg>

          {/* Range Overlay */}
          <div 
            className="absolute bg-[#ffe2d1] bottom-[28px] top-0 mix-blend-multiply pointer-events-none"
            style={{ 
              left: `${leftPosition}%`,
              right: `${100 - rightPosition}%`
            }}
          >
            {/* Bottom border line */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#342C24]" />
          </div>

          {/* Left Handler */}
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
                  <line x1="0" y1="1" x2="200" y2="1" stroke="url(#gradient-handler)" strokeWidth="2" />
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

          {/* Right Handler */}
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
                  <line x1="0" y1="1" x2="200" y2="1" stroke="url(#gradient-handler)" strokeWidth="2" />
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
            {['2.00k', '2.50k', '3.00k', '3.50k', '4.00k', '4.50k'].map((label, i) => (
              <span 
                key={label}
                className="text-xs font-mono text-[#a99c8d] uppercase tracking-tight"
                style={{ flex: 1, textAlign: 'center' }}
              >
                {label}
              </span>
            ))}
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
  )
}

