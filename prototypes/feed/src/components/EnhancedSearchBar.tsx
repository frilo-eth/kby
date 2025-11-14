import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "../imports/svg-huy5abx9zb";
import tokenSvgPaths from "../imports/svg-hq0mv37q6e";

// Sort options for SEARCH RESULTS
type SortOption = "Recent" | "Hot" | "Valuable" | "Last reply" | "Oldest";

// Helper messages that rotate
const HELPER_MESSAGES = [
  "Try @ to find a user",
  "Try $ to find a ticker", 
  "Try >> to find a comment",
  "Search by token name or description",
  "Find trending memes and dares"
];

// Simple Blockie component for user avatars
function Blockie({ address }: { address: string }) {
  const colors = React.useMemo(() => {
    const hash = address.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    
    const hue1 = Math.abs(hash % 360);
    const hue2 = Math.abs((hash * 7) % 360);
    
    return {
      bg: `hsl(${hue1}, 65%, 60%)`,
      fg: `hsl(${hue2}, 70%, 45%)`,
    };
  }, [address]);

  return (
    <div className="w-8 h-8 rounded-full overflow-hidden" style={{ backgroundColor: colors.bg }}>
      <svg viewBox="0 0 8 8" className="w-full h-full">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((y) =>
          [0, 1, 2, 3].map((x) => {
            const index = y * 4 + x;
            const hash = address.charCodeAt(index % address.length);
            const shouldFill = hash % 2 === 0;
            const mirrorX = x >= 4 ? 7 - x : x;
            
            return shouldFill ? (
              <rect
                key={`${x}-${y}`}
                x={mirrorX}
                y={y}
                width="1"
                height="1"
                fill={colors.fg}
              />
            ) : null;
          })
        )}
      </svg>
    </div>
  );
}

// Media preview component
function MediaPreview({ type, url }: { type: string; url: string }) {
  const isVideo = type === 'video';
  
  return (
    <div className="w-10 h-10 rounded-[6px] overflow-hidden bg-[#ffe2d1] flex-shrink-0">
      {isVideo ? (
        <video
          src={url}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          preload="auto"
        />
      ) : (
        <img
          src={url}
          alt=""
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
}

// Mock search data
const MOCK_SEARCH_DATA = {
  recent: [
    { id: 1, name: "PepeCoin", type: "token", description: "The original meme coin", image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=100&h=100&fit=crop", marketCap: "$124.53K", graduation: "56%" },
    { 
      id: 2, 
      username: "@cryptoking", 
      name: "Crypto King", 
      type: "user", 
      address: "0x1234567890abcdef",
      avatar: null,
      launches: [
        { id: 1, image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=100&h=100&fit=crop" },
        { id: 2, image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=100&h=100&fit=crop" },
        { id: 3, image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=100&h=100&fit=crop" },
      ],
      totalLaunches: 27
    },
    { id: 3, ticker: "$DOGE", name: "DogeToken", type: "ticker", image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=100&h=100&fit=crop", marketCap: "$89.2K", graduation: "72%" },
  ],
  popular: [
    { id: 1, name: "MoonCoin", type: "token", description: "Lunar-themed crypto token", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=100&h=100&fit=crop", marketCap: "$234.8K", graduation: "89%" },
    { id: 2, ticker: "$MOON", name: "MoonCoin", type: "ticker", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=100&h=100&fit=crop", marketCap: "$234.8K", graduation: "89%" },
    { 
      id: 3, 
      username: "@whaletrader", 
      name: "Whale Trader", 
      type: "user", 
      address: "0xdeadbeef12345678", 
      avatar: null,
      launches: [
        { id: 1, image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=100&h=100&fit=crop" },
        { id: 2, image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=100&h=100&fit=crop" },
        { id: 3, image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=100&h=100&fit=crop" },
      ],
      totalLaunches: 42
    },
    { id: 4, text: "This is the best collection!", user: "@cryptowhale", type: "comment", time: "3h ago", media: { type: "image", url: "https://images.unsplash.com/photo-1555421689-d68471e189f2?w=200&h=200&fit=crop", tips: 4200 } },
    { id: 5, name: "viral-meme.gif", type: "media", mediaType: "gif", url: "https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif", tips: 5600 },
  ],
};

interface EnhancedSearchBarProps {
  onSearch?: (query: string) => void;
  onSortChange?: (sort: SortOption) => void;
  onClose?: () => void;
}

export default function EnhancedSearchBar({ onSearch, onSortChange, onClose }: EnhancedSearchBarProps) {
  const [isFocused, setIsFocused] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [currentSort, setCurrentSort] = useState<SortOption | null>(null);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [currentHelperIndex, setCurrentHelperIndex] = useState(0);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-focus input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Rotate helper messages every 3 seconds when focused
  useEffect(() => {
    if (!isFocused) return;

    const interval = setInterval(() => {
      setCurrentHelperIndex((prev) => (prev + 1) % HELPER_MESSAGES.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isFocused]);

  // Update dropdown position
  useEffect(() => {
    if (!containerRef.current) return;

    let frameId: number;
    const updatePosition = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + 4,
          left: rect.left,
          width: rect.width,
        });
      }
      frameId = requestAnimationFrame(updatePosition);
    };

    updatePosition();

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, []);

  // Handle clicks outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSortDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSortSelect = (sort: SortOption) => {
    setCurrentSort(sort);
    setShowSortDropdown(false);
    onSortChange?.(sort);
  };

  const handleClearSort = () => {
    setCurrentSort(null);
    onSortChange?.("Recent");
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    onSearch?.(value);
  };

  const sortOptions: SortOption[] = ["Recent", "Hot", "Valuable", "Last reply", "Oldest"];

  return (
    <div ref={containerRef} className="w-full">
      {/* Main Search Bar */}
      <div className="bg-[#ffe2d1] box-border content-stretch flex items-center relative w-full h-[36px] overflow-clip">
        <div aria-hidden="true" className="absolute border-[#ffd2b5] border-[0px_0px_0px_1px] border-solid inset-0 pointer-events-none" />
        
        <div className="flex items-center w-full h-full px-[12px] gap-[6px]">
          {/* Sort Button - Left Side */}
          {isFocused && (
            <div className="relative">
              {currentSort ? (
                // Active sort pill
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#ffe2d1] box-border content-stretch flex gap-[8px] h-[28px] items-center px-[8px] relative shrink-0 cursor-pointer hover:bg-[#ffd2b5] transition-colors"
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                >
                  <div className="content-stretch flex gap-[2px] items-center relative shrink-0">
                    {/* Sort Icon */}
                    <div className="relative shrink-0 size-[16px]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                        <g id="icon">
                          <path d={svgPaths.p33b99f80} id="icon_2" stroke="var(--stroke-0, #8C0200)" strokeLinecap="square" strokeWidth="1.5" />
                        </g>
                      </svg>
                    </div>
                    <p className="font-['Neue_Haas_Grotesk_Display:Medium',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#8c0200] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">
                      {currentSort}
                    </p>
                  </div>
                  {/* Clear X Icon */}
                  <div 
                    className="relative shrink-0 size-[16px] hover:opacity-70 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClearSort();
                    }}
                  >
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                      <g clipPath="url(#clip0_114_2150)">
                        <path d={svgPaths.p32f55d80} stroke="var(--stroke-0, #8C0200)" strokeLinecap="square" strokeWidth="1.5" />
                      </g>
                      <defs>
                        <clipPath id="clip0_114_2150">
                          <rect fill="white" height="16" width="16" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </motion.div>
              ) : (
                // Sort button
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="content-stretch flex gap-[4px] items-center relative shrink-0 cursor-pointer hover:opacity-70 transition-opacity"
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                >
                  <div className="relative shrink-0 size-[16px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                      <g id="icon">
                        <path d={svgPaths.p33b99f80} id="icon_2" stroke="var(--stroke-0, #8C0200)" strokeLinecap="square" strokeWidth="1.5" />
                      </g>
                    </svg>
                  </div>
                  <p className="font-['Neue_Haas_Grotesk_Display:Medium',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#8c0200] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">
                    Sort
                  </p>
                  {/* Dropdown arrow */}
                  <div className="relative shrink-0 size-[12px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                      <path d="M3 4.5L6 7.5L9 4.5" stroke="#8C0200" strokeWidth="1.5" strokeLinecap="square" />
                    </svg>
                  </div>
                </motion.div>
              )}

              {/* Sort Dropdown */}
              <AnimatePresence>
                {showSortDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-[calc(100%+4px)] left-0 bg-white border border-[#ffd2b5] rounded-[4px] shadow-lg min-w-[140px] z-50 overflow-hidden"
                  >
                    {sortOptions.map((option) => (
                      <div
                        key={option}
                        className="px-[12px] py-[8px] cursor-pointer hover:bg-[#ffe2d1] transition-colors"
                        onClick={() => handleSortSelect(option)}
                      >
                        <p className="font-['Neue_Haas_Grotesk_Display:Medium',sans-serif] leading-[1.2] not-italic text-[#6d6153] text-[12px] tracking-[0.24px]">
                          {option}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Search Input Area */}
          <div className="flex-1 flex items-center gap-[6px]">
            {/* Magnifier Icon - Only show when not focused */}
            <AnimatePresence>
              {!isFocused && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  className="relative shrink-0 size-[16px]"
                >
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                    <g id="icon">
                      <path 
                        d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" 
                        stroke="#8C0200" 
                        strokeWidth="1.5" 
                        strokeLinecap="square"
                      />
                      <path 
                        d="M14 14L11.1 11.1" 
                        stroke="#8C0200" 
                        strokeWidth="1.5" 
                        strokeLinecap="square"
                      />
                    </g>
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Search Label - Only show when not focused */}
            <AnimatePresence>
              {!isFocused && (
                <motion.p
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="font-['Neue_Haas_Grotesk_Display:Medium',sans-serif] leading-[1.2] not-italic text-[#8c0200] text-[12px] tracking-[0.24px] whitespace-pre"
                >
                  Search
                </motion.p>
              )}
            </AnimatePresence>

            {/* Input Field */}
            <input
              ref={inputRef}
              type="text"
              value={searchValue}
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                // Delay blur to allow clicking on dropdown
                setTimeout(() => setIsFocused(false), 200);
              }}
              placeholder={isFocused ? "Type in watcha lookin' for" : ""}
              className="flex-1 bg-transparent border-none outline-none text-[#8c0200] placeholder:text-[#8c0200] placeholder:opacity-60"
              style={{
                fontFamily: '"Neue Haas Grotesk Display", system-ui, -apple-system, sans-serif',
                fontWeight: 500,
                fontSize: '12px',
                letterSpacing: '0.24px',
                lineHeight: '120%'
              }}
            />
          </div>

          {/* Close/Clear Icon - Right Side */}
          {isFocused && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.15 }}
              className="relative shrink-0 size-[16px] cursor-pointer hover:opacity-70 transition-opacity"
              onClick={() => {
                setSearchValue("");
                setIsFocused(false);
                inputRef.current?.blur();
                onClose?.();
              }}
            >
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                <path d={svgPaths.p12bcfc00} stroke="var(--stroke-0, #8C0200)" strokeLinecap="square" strokeWidth="1.5" />
              </svg>
            </motion.div>
          )}
        </div>
      </div>

      {/* Helper Text Row - Below Search Bar */}
      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="relative bg-[#ffd2b5] cursor-pointer hover:bg-[#ffcaaa] transition-colors overflow-hidden"
            onClick={() => {
              // Cycle to next helper message on click
              setCurrentHelperIndex((prev) => (prev + 1) % HELPER_MESSAGES.length);
            }}
          >
            <div aria-hidden="true" className="absolute border-[#ffd2b5] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
            <div className="box-border content-stretch flex gap-[4px] h-[28px] items-center px-[12px] py-[4px] relative w-full">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentHelperIndex}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="font-['Neue_Haas_Grotesk_Display:Regular',sans-serif] leading-[1.2] not-italic text-[#50463b] text-[12px] tracking-[0.24px]"
                >
                  {HELPER_MESSAGES[currentHelperIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Results Dropdown - Using Portal */}
      {typeof window !== 'undefined' && ReactDOM.createPortal(
        <AnimatePresence>
          {isFocused && (
            <motion.div
              initial={{ opacity: 0, y: -4, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.96 }}
              transition={{ 
                duration: 0.2,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="fixed bg-white border border-[#ffd2b5] rounded-[4px] shadow-lg max-h-[400px] overflow-y-auto"
              style={{ 
                top: `${dropdownPosition.top + 28}px`, // Account for helper text height
                left: `${dropdownPosition.left}px`,
                width: `${dropdownPosition.width}px`,
                zIndex: 9999,
              }}
            >
              {!searchValue.trim() ? (
                // Default results - Recent and Popular categories
                <div>
                  {/* Recent */}
                  <div className="px-4 py-2 text-[10px] text-[#8c0200] uppercase tracking-wider" style={{ fontWeight: 500 }}>
                    Recent
                  </div>
                  {MOCK_SEARCH_DATA.recent.map(item => (
                    <div key={item.id} className="px-4 py-3 hover:bg-[#ffe2d1] cursor-pointer transition-colors flex items-center gap-3">
                      {/* Avatar/Image */}
                      {item.type === 'user' ? (
                        item.avatar ? (
                          <img src={item.avatar} alt={item.username} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                        ) : (
                          <Blockie address={item.address!} />
                        )
                      ) : (
                        <MediaPreview type="image" url={item.image!} />
                      )}
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {item.type === 'token' ? (
                          <>
                            <div className="text-[14px] text-[#6d6153]" style={{ fontWeight: 500 }}>{item.name}</div>
                            <div className="text-[12px] text-[#6d6153] opacity-70">{item.description}</div>
                          </>
                        ) : item.type === 'ticker' ? (
                          <>
                            <div className="text-[14px] text-[#8c0200]" style={{ fontWeight: 500 }}>{item.ticker}</div>
                            <div className="text-[12px] text-[#6d6153] opacity-70">{item.name}</div>
                          </>
                        ) : item.type === 'user' ? (
                          <>
                            <div className="text-[14px] text-[#6d6153]" style={{ fontWeight: 500 }}>{item.username}</div>
                            <div className="text-[12px] text-[#6d6153] opacity-70">{item.name}</div>
                          </>
                        ) : null}
                      </div>

                      {/* Right side stats */}
                      {item.type === 'token' || item.type === 'ticker' ? (
                        <div className="flex items-center gap-2">
                          {/* Market Cap */}
                          <div className="flex items-center gap-[2px]">
                            <div className="relative shrink-0 size-[16px]">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                                <g id="icon">
                                  <path d={tokenSvgPaths.p7124f80} id="icon_2" stroke="var(--stroke-0, #0D0B08)" strokeLinecap="square" strokeWidth="1.5" />
                                </g>
                              </svg>
                            </div>
                            <p className="text-[12px] text-[#6d6153]" style={{ fontWeight: 500 }}>{item.marketCap}</p>
                          </div>
                          {/* Graduation */}
                          <div className="flex items-center gap-[2px]">
                            <div className="relative shrink-0 size-[16px]">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                                <g id="icon">
                                  <path d={tokenSvgPaths.p34c8bb00} id="icon_2" stroke="var(--stroke-0, #0D0B08)" strokeLinecap="square" strokeWidth="1.5" />
                                </g>
                              </svg>
                            </div>
                            <p className="text-[12px] text-[#6d6153]" style={{ fontWeight: 500 }}>{item.graduation}</p>
                          </div>
                        </div>
                      ) : item.type === 'user' ? (
                        <div className="flex items-center gap-1">
                          {item.launches.slice(0, 3).map(launch => (
                            <img 
                              key={launch.id} 
                              src={launch.image} 
                              alt="" 
                              className="w-5 h-5 rounded-[4px] object-cover" 
                            />
                          ))}
                          {item.totalLaunches > 3 && (
                            <span className="text-[12px] text-[#6d6153] ml-1" style={{ fontWeight: 500 }}>
                              +{item.totalLaunches - 3} launches
                            </span>
                          )}
                          {item.totalLaunches <= 3 && (
                            <span className="text-[12px] text-[#6d6153] ml-1" style={{ fontWeight: 500 }}>
                              {item.totalLaunches} {item.totalLaunches === 1 ? 'launch' : 'launches'}
                            </span>
                          )}
                        </div>
                      ) : null}
                    </div>
                  ))}

                  {/* Popular */}
                  <div className="px-4 py-2 text-[10px] text-[#8c0200] uppercase tracking-wider mt-2" style={{ fontWeight: 500 }}>
                    Popular
                  </div>
                  {MOCK_SEARCH_DATA.popular.map(item => (
                    <div key={item.id} className={`px-4 py-3 hover:bg-[#ffe2d1] cursor-pointer transition-colors flex gap-3 ${item.type === 'comment' ? 'items-start' : 'items-center'}`}>
                      {/* Avatar/Image */}
                      {item.type === 'user' ? (
                        item.avatar ? (
                          <img src={item.avatar} alt={item.username} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                        ) : (
                          <Blockie address={item.address!} />
                        )
                      ) : item.type === 'comment' && item.media ? (
                        <MediaPreview type={item.media.type} url={item.media.url} />
                      ) : item.type === 'media' ? (
                        <MediaPreview type={item.mediaType!} url={item.url!} />
                      ) : (
                        <MediaPreview type="image" url={item.image!} />
                      )}
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {item.type === 'token' ? (
                          <>
                            <div className="text-[14px] text-[#6d6153]" style={{ fontWeight: 500 }}>{item.name}</div>
                            <div className="text-[12px] text-[#6d6153] opacity-70">{item.description}</div>
                          </>
                        ) : item.type === 'ticker' ? (
                          <>
                            <div className="text-[14px] text-[#8c0200]" style={{ fontWeight: 500 }}>{item.ticker}</div>
                            <div className="text-[12px] text-[#6d6153] opacity-70">{item.name}</div>
                          </>
                        ) : item.type === 'user' ? (
                          <>
                            <div className="text-[14px] text-[#6d6153]" style={{ fontWeight: 500 }}>{item.username}</div>
                            <div className="text-[12px] text-[#6d6153] opacity-70">{item.name}</div>
                          </>
                        ) : item.type === 'comment' ? (
                          <>
                            <div className="text-[14px] text-[#6d6153]" style={{ fontWeight: 500 }}>{item.user}</div>
                            <div className="text-[12px] text-[#6d6153]">{item.text}</div>
                            <div className="text-[10px] text-[#6d6153] opacity-70 mt-1">{item.time}</div>
                          </>
                        ) : item.type === 'media' ? (
                          <>
                            <div className="text-[14px] text-[#6d6153]" style={{ fontWeight: 500 }}>{item.name}</div>
                            <div className="text-[12px] text-[#6d6153] opacity-70">{item.mediaType}</div>
                          </>
                        ) : null}
                      </div>

                      {/* Right side stats */}
                      {item.type === 'token' || item.type === 'ticker' ? (
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-[2px]">
                            <div className="relative shrink-0 size-[16px]">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                                <g id="icon">
                                  <path d={tokenSvgPaths.p7124f80} id="icon_2" stroke="var(--stroke-0, #0D0B08)" strokeLinecap="square" strokeWidth="1.5" />
                                </g>
                              </svg>
                            </div>
                            <p className="text-[12px] text-[#6d6153]" style={{ fontWeight: 500 }}>{item.marketCap}</p>
                          </div>
                          <div className="flex items-center gap-[2px]">
                            <div className="relative shrink-0 size-[16px]">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                                <g id="icon">
                                  <path d={tokenSvgPaths.p34c8bb00} id="icon_2" stroke="var(--stroke-0, #0D0B08)" strokeLinecap="square" strokeWidth="1.5" />
                                </g>
                              </svg>
                            </div>
                            <p className="text-[12px] text-[#6d6153]" style={{ fontWeight: 500 }}>{item.graduation}</p>
                          </div>
                        </div>
                      ) : item.type === 'user' ? (
                        <div className="flex items-center gap-1">
                          {item.launches.slice(0, 3).map(launch => (
                            <img 
                              key={launch.id} 
                              src={launch.image} 
                              alt="" 
                              className="w-5 h-5 rounded-[4px] object-cover" 
                            />
                          ))}
                          {item.totalLaunches > 3 && (
                            <span className="text-[12px] text-[#6d6153] ml-1" style={{ fontWeight: 500 }}>
                              +{item.totalLaunches - 3}
                            </span>
                          )}
                        </div>
                      ) : (item.type === 'comment' || item.type === 'media') && item.media?.tips || item.tips ? (
                        <div className="text-[12px] text-[#8c0200]" style={{ fontWeight: 500 }}>
                          {item.media?.tips || item.tips} tips
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : (
                // Search results based on query
                <div className="px-4 py-3 text-center text-[#6d6153]">
                  <p className="text-[14px]" style={{ fontWeight: 500 }}>Search results for "{searchValue}"</p>
                  <p className="text-[12px] opacity-70 mt-1">Results would appear here filtered by your query</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
