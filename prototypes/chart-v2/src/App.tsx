import { useState, useRef, useEffect } from 'react';
import svgPaths from './imports/svg-4x98zwbfji';
import LPChartV3 from './components/LPChartV3';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <div className="max-w-[800px] mx-auto px-4 py-8">
        <LPChartV3 />
      </div>
    </div>
  );
}

function NavBar() {
  return (
    <div className="content-stretch flex h-[68px] items-start justify-center relative shrink-0 w-full border-b border-[#ffd2b5]">
      <div className="content-stretch flex h-[68px] items-center justify-between max-w-[800px] relative shrink-0 w-full px-4">
        <div className="basis-0 box-border content-stretch flex gap-[4px] grow items-center min-h-px min-w-px px-0 py-[16px] relative shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-[36px] w-[126px] text-[#8c0200]">
              <svg viewBox="0 0 126 36" fill="currentColor">
                <text x="0" y="28" className="font-['Neue_Haas_Grotesk_Display:Medium',sans-serif]" fontSize="24">Kumbaya</text>
              </svg>
            </div>
            <div className="flex gap-1">
              <div className="px-[8px] py-[8px]">
                <p className="font-['Neue_Haas_Grotesk_Display:Medium',sans-serif] text-[12px] text-[#6d6153] tracking-[0.24px]">Launchpad</p>
              </div>
              <div className="px-[8px] py-[8px]">
                <p className="font-['Neue_Haas_Grotesk_Display:Medium',sans-serif] text-[12px] text-[#6d6153] tracking-[0.24px]">Swap</p>
              </div>
              <div className="px-[8px] py-[8px]">
                <p className="font-['Neue_Haas_Grotesk_Display:Medium',sans-serif] text-[12px] text-[#8c0200] tracking-[0.24px]">Pools</p>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0">
          <div className="bg-[#8c0200] box-border content-stretch flex gap-[4px] items-center px-[12px] py-[8px] relative rounded-[1px] shrink-0">
            <p className="font-['Neue_Haas_Grotesk_Display:Medium',sans-serif] text-[14px] text-white tracking-[0.28px]">Create token</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function LiquidityPoolInterface() {
  const [leftHandlerPercent, setLeftHandlerPercent] = useState(-20.28);
  const [rightHandlerPercent, setRightHandlerPercent] = useState(19.28);
  const [zoomLevel, setZoomLevel] = useState(1);
  
  const currentPrice = 3451.31;
  const minPossiblePrice = 2000;
  const maxPossiblePrice = 4500;
  
  const minPrice = currentPrice * (1 + leftHandlerPercent / 100);
  const maxPrice = currentPrice * (1 + rightHandlerPercent / 100);
  
  const calculateAPR = () => {
    const rangeWidth = Math.abs(rightHandlerPercent - leftHandlerPercent);
    const concentrationFactor = 100 / rangeWidth;
    const baseFeeAPR = 30;
    const apr = baseFeeAPR * concentrationFactor * 0.75;
    return Math.min(apr, 500);
  };
  
  const estimatedAPR = calculateAPR();
  const ethPercent = ((currentPrice - minPrice) / (maxPrice - minPrice)) * 100;
  const usdcPercent = 100 - ethPercent;
  
  // Reset handlers to default position
  const handleReset = () => {
    setLeftHandlerPercent(-20.28);
    setRightHandlerPercent(19.28);
    setZoomLevel(1);
  };
  
  // Zoom in - narrow the view range for finer control
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev * 1.5, 5));
  };
  
  // Zoom out - widen the view range
  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev / 1.5, 0.5));
  };
  
  return (
    <div className="max-w-[800px] mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="box-border content-stretch flex gap-[4px] items-center px-0 py-[2px] mb-4">
        <div className="overflow-clip relative shrink-0 size-[16px]">
          <svg className="block size-full" fill="none" viewBox="0 0 16 16">
            <path d="M10 12L6 8L10 4" stroke="#8b7e6f" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <p className="font-['Neue_Haas_Grotesk_Display:Regular',sans-serif] text-[10px] text-[#8b7e6f] tracking-[0.2px]">Back to Pools</p>
        <div className="overflow-clip relative shrink-0 size-[16px]">
          <svg className="block size-full" fill="none" viewBox="0 0 16 16">
            <line x1="4" y1="8" x2="12" y2="8" stroke="#8b7e6f" strokeWidth="1" strokeLinecap="square"/>
          </svg>
        </div>
        <p className="font-['Neue_Haas_Grotesk_Display:Regular',sans-serif] text-[10px] text-[#8c0200] tracking-[0.2px]">USDC/WETH</p>
      </div>
      
      <div className="border border-[#ffd2b5] rounded-[2px] p-4 mb-4">
        {/* Pair Info */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <div className="bg-white mr-[-8px] relative rounded-full shrink-0 size-[32px] border border-[rgba(217,217,217,0.1)] z-10">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-400 to-gray-600" />
              </div>
              <div className="bg-[#2b354a] relative rounded-full shrink-0 size-[32px] border border-[rgba(217,217,217,0.1)]">
                <div className="absolute inset-[25%_36%]">
                  <div className="w-full h-full bg-white opacity-80" />
                </div>
              </div>
            </div>
            <p className="font-['Neue_Haas_Grotesk_Display:Medium',sans-serif] text-[14px] text-[#1a150f] tracking-[0.28px]">WETH/USDC</p>
            <div className="bg-[#f2eeea] flex gap-[6px] items-center pl-px pr-[6px] py-px rounded-[3px]">
              <div className="bg-[#a6f2d5] flex gap-[2px] items-center justify-center p-[4px] rounded-[2px]">
                <div className="relative shrink-0 size-[6px]">
                  <svg className="block size-full" fill="none" viewBox="0 0 6 6">
                    <circle cx="3" cy="3" fill="#14674A" r="3" />
                  </svg>
                </div>
                <p className="font-['Geist_Mono:Regular',sans-serif] text-[10px] text-[#14674a] tracking-[-0.2px] uppercase">In range</p>
              </div>
              <div className="font-['Geist_Mono:Regular',sans-serif] text-[10px] tracking-[-0.2px] uppercase">
                <span className="text-[#342c24]">0.3</span>
                <span className="text-[#6d6153]">%</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-[2px]">
              <div className="overflow-clip relative shrink-0 size-[16px]">
                <svg className="block size-full" fill="none" viewBox="0 0 16 16">
                  <rect x="2" y="2" width="12" height="12" stroke="#6D6153" strokeWidth="1.5" fill="none"/>
                </svg>
              </div>
            </button>
            <button className="p-[2px]">
              <div className="overflow-clip relative shrink-0 size-[16px]">
                <svg className="block size-full" fill="none" viewBox="0 0 16 16">
                  <path d="M8 4v8M4 8h8" stroke="#6D6153" strokeWidth="1.5" strokeLinecap="square"/>
                </svg>
              </div>
            </button>
          </div>
        </div>
        
        {/* Price Display */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="font-['Geist_Mono:Regular',sans-serif] text-[32px] text-[#342c24] uppercase">{currentPrice.toFixed(2)}</p>
            <div className="flex items-center gap-2">
              <p className="font-['Neue_Haas_Grotesk_Display:Regular',sans-serif] text-[12px] text-[#8b7e6f] tracking-[0.24px]">USDC per WETH</p>
              <button className="p-[2px]">
                <div className="overflow-clip relative shrink-0 size-[16px]">
                  <svg className="block size-full" fill="none" viewBox="0 0 16 16">
                    <path d="M4 6l4 4 4-4" stroke="#6D6153" strokeWidth="1.5" strokeLinecap="square"/>
                  </svg>
                </div>
              </button>
            </div>
          </div>
          <div className="flex gap-1">
            <button 
              className="p-[2px] hover:bg-neutral-100 rounded transition-colors"
              onClick={handleReset}
              title="Reset range"
            >
              <div className="overflow-clip relative shrink-0 size-[16px]">
                <svg className="block size-full" fill="none" viewBox="0 0 16 16">
                  <path d="M12 4L8 8M8 8L4 12M8 8L12 12M8 8L4 4" stroke="#0D0B08" strokeWidth="1.5" strokeLinecap="square"/>
                </svg>
              </div>
            </button>
            <button 
              className="p-[2px] hover:bg-neutral-100 rounded transition-colors"
              onClick={handleZoomIn}
              title="Zoom in"
            >
              <div className="overflow-clip relative shrink-0 size-[16px]">
                <svg className="block size-full" fill="none" viewBox="0 0 16 16">
                  <circle cx="8" cy="8" r="4" stroke="#1A150F" strokeWidth="1.5" fill="none"/>
                  <path d="M8 6v4M6 8h4" stroke="#1A150F" strokeWidth="1.5" strokeLinecap="square"/>
                </svg>
              </div>
            </button>
            <button 
              className="p-[2px] hover:bg-neutral-100 rounded transition-colors"
              onClick={handleZoomOut}
              title="Zoom out"
            >
              <div className="overflow-clip relative shrink-0 size-[16px]">
                <svg className="block size-full" fill="none" viewBox="0 0 16 16">
                  <circle cx="8" cy="8" r="4" stroke="#1A150F" strokeWidth="1.5" fill="none"/>
                  <line x1="6" y1="8" x2="10" y2="8" stroke="#1A150F" strokeWidth="1.5" strokeLinecap="square"/>
                </svg>
              </div>
            </button>
          </div>
        </div>
        
        {/* Interactive Visualization */}
        <InteractiveHistogram
          leftHandlerPercent={leftHandlerPercent}
          rightHandlerPercent={rightHandlerPercent}
          onLeftHandlerChange={setLeftHandlerPercent}
          onRightHandlerChange={setRightHandlerPercent}
          currentPrice={currentPrice}
          minPossiblePrice={minPossiblePrice}
          maxPossiblePrice={maxPossiblePrice}
          zoomLevel={zoomLevel}
        />
        
        {/* Price Range Dropdown */}
        <button className="flex items-center justify-between w-full py-[8px] mt-4">
          <p className="font-['Geist_Mono:Regular',sans-serif] text-[12px] text-[#8b7e6f] tracking-[-0.24px] uppercase">PRICE RANGE</p>
          <div className="overflow-clip relative shrink-0 size-[16px]">
            <svg className="block size-full" fill="none" viewBox="0 0 16 16">
              <path d="M4 6l4 4 4-4" stroke="#8b7e6f" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        </button>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Min Price */}
        <div className="border border-[#ffd2b5] rounded-[2px] p-4">
          <p className="font-['Geist_Mono:Regular',sans-serif] text-[10px] text-[#8b7e6f] uppercase tracking-[-0.2px] mb-2">Min</p>
          <p className="font-['Geist_Mono:SemiBold',sans-serif] text-[20px] text-[#342c24] mb-1">{minPrice.toFixed(2)}</p>
          <p className="font-['Geist_Mono:Regular',sans-serif] text-[10px] text-[#a99c8d] uppercase">${minPrice.toFixed(2)}</p>
        </div>
        
        {/* Max Price */}
        <div className="border border-[#ffd2b5] rounded-[2px] p-4">
          <p className="font-['Geist_Mono:Regular',sans-serif] text-[10px] text-[#8b7e6f] uppercase tracking-[-0.2px] mb-2">Max</p>
          <p className="font-['Geist_Mono:SemiBold',sans-serif] text-[20px] text-[#342c24] mb-1">{maxPrice.toFixed(2)}</p>
          <p className="font-['Geist_Mono:Regular',sans-serif] text-[10px] text-[#a99c8d] uppercase">${maxPrice.toFixed(2)}</p>
        </div>
        
        {/* Est APR */}
        <div className="border border-[#ffd2b5] rounded-[2px] p-4">
          <div className="flex items-center gap-2 mb-2">
            <p className="font-['Geist_Mono:Regular',sans-serif] text-[10px] text-[#8b7e6f] uppercase tracking-[-0.2px]">Est. APR</p>
            <div className="relative size-[12px]">
              <svg className="block size-full" fill="none" viewBox="0 0 12 12">
                <circle cx="6" cy="6" r="5" stroke="#8b7e6f" strokeWidth="1"/>
              </svg>
            </div>
          </div>
          <p className="font-['Geist_Mono:SemiBold',sans-serif] text-[28px] text-[#342c24] mb-1">{estimatedAPR.toFixed(2)}%</p>
          <p className="font-['Geist_Mono:Regular',sans-serif] text-[10px] text-[#8b7e6f] uppercase">Est. APR</p>
        </div>
        
        {/* Pool Balances */}
        <div className="border border-[#ffd2b5] rounded-[2px] p-4">
          <div className="flex items-center gap-2 mb-3">
            <p className="font-['Geist_Mono:Regular',sans-serif] text-[10px] text-[#8b7e6f] uppercase tracking-[-0.2px]">Pool Balances</p>
            <div className="relative size-[12px]">
              <svg className="block size-full" fill="none" viewBox="0 0 12 12">
                <circle cx="6" cy="6" r="5" stroke="#8b7e6f" strokeWidth="1"/>
              </svg>
            </div>
          </div>
          
          <div className="space-y-2">
            <div>
              <div className="flex justify-between mb-1">
                <p className="font-['Geist_Mono:SemiBold',sans-serif] text-[12px] text-[#342c24]">{ethPercent.toFixed(2)}%</p>
                <p className="font-['Geist_Mono:Regular',sans-serif] text-[10px] text-[#8b7e6f] uppercase">ETH</p>
              </div>
              <div className="h-1.5 bg-[#f2eeea] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#2775ca] rounded-full transition-all duration-300"
                  style={{ width: `${ethPercent}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <p className="font-['Geist_Mono:SemiBold',sans-serif] text-[12px] text-[#342c24]">{usdcPercent.toFixed(2)}%</p>
                <p className="font-['Geist_Mono:Regular',sans-serif] text-[10px] text-[#8b7e6f] uppercase">USDC</p>
              </div>
              <div className="h-1.5 bg-[#f2eeea] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#a6f2d5] rounded-full transition-all duration-300"
                  style={{ width: `${usdcPercent}%` }}
                />
              </div>
            </div>
          </div>
          
          <p className="font-['Geist_Mono:Regular',sans-serif] text-[10px] text-[#8b7e6f] mt-2">Pool Balances</p>
        </div>
      </div>
    </div>
  );
}

interface InteractiveHistogramProps {
  leftHandlerPercent: number;
  rightHandlerPercent: number;
  onLeftHandlerChange: (percent: number) => void;
  onRightHandlerChange: (percent: number) => void;
  currentPrice: number;
  minPossiblePrice: number;
  maxPossiblePrice: number;
  zoomLevel: number;
}

function InteractiveHistogram({
  leftHandlerPercent,
  rightHandlerPercent,
  onLeftHandlerChange,
  onRightHandlerChange,
  currentPrice,
  minPossiblePrice,
  maxPossiblePrice,
  zoomLevel,
}: InteractiveHistogramProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);
  const [showLeftTooltip, setShowLeftTooltip] = useState(false);
  const [showRightTooltip, setShowRightTooltip] = useState(false);
  
  // Convert percent to position (0-100)
  // Current price is at 50% (center), so we map -50% to 0% and +50% to 100%
  const leftPosition = ((leftHandlerPercent + 50) / 100) * 100;
  const rightPosition = ((rightHandlerPercent + 50) / 100) * 100;
  
  const handleMouseMove = (e: MouseEvent) => {
    if (!chartRef.current) return;
    
    const rect = chartRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = (x / rect.width) * 100;
    // Convert from 0-100% position to -50% to +50% relative to center
    const pricePercent = (percent - 50);
    
    if (isDraggingLeft) {
      const maxLeft = rightHandlerPercent - 1; // Minimum 1% gap between handlers
      const cappedPercent = Math.max(-50, Math.min(pricePercent, maxLeft));
      onLeftHandlerChange(cappedPercent);
    } else if (isDraggingRight) {
      const minRight = leftHandlerPercent + 1; // Minimum 1% gap between handlers
      const cappedPercent = Math.min(50, Math.max(pricePercent, minRight));
      onRightHandlerChange(cappedPercent);
    }
  };
  
  const handleMouseUp = () => {
    setIsDraggingLeft(false);
    setIsDraggingRight(false);
    setShowLeftTooltip(false);
    setShowRightTooltip(false);
  };
  
  useEffect(() => {
    if (isDraggingLeft || isDraggingRight) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDraggingLeft, isDraggingRight, leftHandlerPercent, rightHandlerPercent]);
  
  return (
    <div className="relative" ref={chartRef}>
      <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full z-[1]">
        {/* Histogram */}
        <div className="h-[200px] relative shrink-0 w-full">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 771 200">
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_gradient" x1="385.5" x2="385.5" y1="0" y2="200">
                <stop stopColor="#FF9361" />
                <stop offset="1" stopColor="#FFE2D1" />
              </linearGradient>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint1_gradient" x1="385.5" x2="385.5" y1="0" y2="200">
                <stop stopColor="#B91A00" />
                <stop offset="1" stopColor="#FF9361" />
              </linearGradient>
              <linearGradient id="handlerGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#C7BCAF" />
                <stop offset="1" stopColor="#0D0B08" />
              </linearGradient>
            </defs>
            
            {/* Histogram bars - improved distribution */}
            {Array.from({ length: 80 }).map((_, i) => {
              const totalWidth = 771;
              const barWidth = totalWidth / 80;
              const x = i * barWidth;
              const center = totalWidth / 2;
              const distance = Math.abs(x - center);
              // Create a more realistic liquidity distribution curve
              // Higher liquidity near center, tapering off towards edges
              const maxDistance = totalWidth / 2;
              const normalizedDistance = distance / maxDistance;
              // Use a smoother curve: height decreases exponentially from center
              const height = Math.max(20, 200 * Math.exp(-normalizedDistance * 2.5));
              const barPercent = (i / 80) * 100;
              const isInRange = barPercent >= leftPosition && barPercent <= rightPosition;
              
              return (
                <rect
                  key={i}
                  x={x}
                  y={200 - height}
                  width={barWidth}
                  height={height}
                  fill={isInRange ? "url(#paint1_gradient)" : "url(#paint0_gradient)"}
                  opacity={1}
                />
              );
            })}
            
            {/* Current price dashed line */}
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
          
          {/* Range overlay shade */}
          <div 
            className="absolute bg-[#ffe2d1] bottom-0 top-0 mix-blend-multiply pointer-events-none"
            style={{ 
              left: `${leftPosition}%`,
              right: `${100 - rightPosition}%`
            }}
          >
            {/* Bottom border line */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#342C24]" style={{ marginLeft: '-1px', marginRight: '-1px' }} />
          </div>
          
          {/* Left Handler */}
          <div
            className="absolute bottom-0 flex flex-col items-center cursor-ew-resize z-20"
            style={{ left: `${leftPosition}%`, transform: 'translateX(-50%)', height: '200px' }}
            onMouseDown={() => {
              setIsDraggingLeft(true);
              setShowLeftTooltip(true);
            }}
            onMouseEnter={() => setShowLeftTooltip(true)}
            onMouseLeave={() => !isDraggingLeft && setShowLeftTooltip(false)}
          >
            {/* Tooltip */}
            {showLeftTooltip && (
              <div className="absolute left-[calc(50%-46px)] top-[8px] translate-x-[-50%]">
                <div className="bg-neutral-50 box-border px-[12px] py-[8px] rounded-[2px] border border-[#dcd2c8] shadow-[0px_12px_16px_-4px_rgba(10,13,18,0.08)]">
                  <p className="font-['Geist_Mono:SemiBold',sans-serif] text-[12px] text-[#342c24] tracking-[-0.24px] uppercase whitespace-nowrap">
                    {leftHandlerPercent.toFixed(2)}%
                  </p>
                </div>
              </div>
            )}
            
            {/* Vertical gradient line */}
            <div className="flex h-[calc(100%-20px)] items-center justify-center relative shrink-0 w-0">
              <div className="flex-none rotate-[90deg] origin-center" style={{ width: '200px' }}>
                <svg width="200" height="2" viewBox="0 0 200 2" fill="none">
                  <line x1="0" y1="1" x2="200" y2="1" stroke="url(#handlerGradient)" strokeWidth="2" />
                </svg>
              </div>
            </div>
            
            {/* Circular marker */}
            <div className="bg-neutral-50 relative rounded-full shrink-0 size-[20px] border-2 border-[#342c24] translate-y-[11px]">
              <div className="absolute bottom-[33.33%] left-1/2 top-[33.33%] translate-x-[-50%] w-[6px]">
                <svg className="block size-full" fill="none" viewBox="0 0 8 9">
                  <line x1="1" y1="1" x2="1" y2="7.67" stroke="#342C24" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="7" y1="1" x2="7" y2="7.67" stroke="#342C24" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Right Handler */}
          <div
            className="absolute bottom-0 flex flex-col items-center cursor-ew-resize z-20"
            style={{ left: `${rightPosition}%`, transform: 'translateX(-50%)', height: '200px' }}
            onMouseDown={() => {
              setIsDraggingRight(true);
              setShowRightTooltip(true);
            }}
            onMouseEnter={() => setShowRightTooltip(true)}
            onMouseLeave={() => !isDraggingRight && setShowRightTooltip(false)}
          >
            {/* Tooltip */}
            {showRightTooltip && (
              <div className="absolute left-[calc(50%+46px)] top-[8px] translate-x-[-50%]">
                <div className="bg-neutral-50 box-border px-[12px] py-[8px] rounded-[2px] border border-[#dcd2c8] shadow-[0px_12px_16px_-4px_rgba(10,13,18,0.08)]">
                  <p className="font-['Geist_Mono:SemiBold',sans-serif] text-[12px] text-[#342c24] tracking-[-0.24px] uppercase whitespace-nowrap">
                    +{rightHandlerPercent.toFixed(2)}%
                  </p>
                </div>
              </div>
            )}
            
            {/* Vertical gradient line */}
            <div className="flex h-[calc(100%-20px)] items-center justify-center relative shrink-0 w-0">
              <div className="flex-none rotate-[90deg] origin-center" style={{ width: '200px' }}>
                <svg width="200" height="2" viewBox="0 0 200 2" fill="none">
                  <line x1="0" y1="1" x2="200" y2="1" stroke="url(#handlerGradient)" strokeWidth="2" />
                </svg>
              </div>
            </div>
            
            {/* Circular marker */}
            <div className="bg-neutral-50 relative rounded-full shrink-0 size-[20px] border-2 border-[#342c24] translate-y-[11px]">
              <div className="absolute bottom-[33.33%] left-1/2 top-[33.33%] translate-x-[-50%] w-[6px]">
                <svg className="block size-full" fill="none" viewBox="0 0 8 9">
                  <line x1="1" y1="1" x2="1" y2="7.67" stroke="#342C24" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="7" y1="1" x2="7" y2="7.67" stroke="#342C24" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Baseline */}
        <div className="h-0 relative shrink-0 w-full">
          <svg className="absolute -top-[1px] left-0 right-0" height="1" preserveAspectRatio="none">
            <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="#A99C8D" />
          </svg>
        </div>
        
        {/* Legend */}
        <div className="flex items-center justify-between py-[8px] w-full">
          <p className="font-['Geist_Mono:Regular',sans-serif] text-[12px] text-[#a99c8d] tracking-[-0.24px] uppercase flex-1 text-center">2.00k</p>
          <p className="font-['Geist_Mono:Regular',sans-serif] text-[12px] text-[#a99c8d] tracking-[-0.24px] uppercase flex-1 text-center">2.50k</p>
          <p className="font-['Geist_Mono:Regular',sans-serif] text-[12px] text-[#a99c8d] tracking-[-0.24px] uppercase flex-1 text-center">3.00k</p>
          <p className="font-['Geist_Mono:Regular',sans-serif] text-[12px] text-[#a99c8d] tracking-[-0.24px] uppercase flex-1 text-center">3.50k</p>
          <p className="font-['Geist_Mono:Regular',sans-serif] text-[12px] text-[#a99c8d] tracking-[-0.24px] uppercase flex-1 text-center">4.00k</p>
          <p className="font-['Geist_Mono:Regular',sans-serif] text-[12px] text-[#a99c8d] tracking-[-0.24px] uppercase flex-1 text-center">4.50k</p>
        </div>
      </div>
    </div>
  );
}