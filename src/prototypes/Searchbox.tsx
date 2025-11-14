import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "../../prototypes/feed/src/imports/svg-01q4wve5uj";
import sortSvgPaths from "../../prototypes/feed/src/imports/svg-huy5abx9zb";
import tokenSvgPaths from "../../prototypes/feed/src/imports/svg-hq0mv37q6e";
import plusIconPaths from "../../prototypes/feed/src/imports/svg-43c09v0lsa";
import imgImage from "../../prototypes/feed/src/assets/439247b1ebb4193e9686845f7aaaf7a95abc5bfe.png";

// Font-face declarations (extracted from globals.css to avoid Tailwind layer issues)
const fontStyles = `
  @font-face {
    font-family: 'Neue Haas Grotesk Display';
    src: local('Neue Haas Grotesk Display Medium'), local('NeueHaasDisplay-Medium');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Neue Haas Grotesk Display';
    src: local('Neue Haas Grotesk Display'), local('NeueHaasDisplay-Regular');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
`;

// Inject font styles once
let fontsInjected = false;
if (typeof document !== 'undefined' && !fontsInjected) {
  const styleId = 'searchbox-fonts';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = fontStyles;
    document.head.appendChild(style);
    fontsInjected = true;
  }
}

// Types
type FeedTab = "ALL" | "MEANS" | "DARES" | "QUESTIONS";
type FeedSort = "Latest" | "Hottest" | "Trending";
type SearchSort = "Latest" | "Trending" | "Hot" | "Starred";
type SearchCategory = "MEANS" | "DARES" | "QUESTIONS";
type SearchResultType = "token" | "ticker" | "user" | "comment" | "media";

// Font styles
const fontMedium = {
  fontFamily: '"Neue Haas Grotesk Display", system-ui, -apple-system, sans-serif',
  fontWeight: 500,
} as const;

const fontRegular = {
  fontFamily: '"Neue Haas Grotesk Display", system-ui, -apple-system, sans-serif',
  fontWeight: 400,
} as const;

interface SearchResult {
  id: number;
  type: SearchResultType;
  name?: string;
  ticker?: string;
  username?: string;
  text?: string;
  description?: string;
  image?: string;
  address?: string;
  avatar?: string | null;
  marketCap?: string;
  graduation?: string;
  time?: string;
  user?: string;
  media?: { type: string; url: string; tips?: number };
  mediaType?: string;
  url?: string;
  tips?: number;
  launches?: Array<{ id: number; image: string }>;
  totalLaunches?: number;
}

// Logo component
function Logo() {
  return (
    <div className="content-stretch flex gap-[36px] items-center relative shrink-0" data-name="logo">
      <div className="content-stretch flex gap-[7.2px] items-center relative shrink-0">
        <div className="h-[36px] relative shrink-0 w-[94.662px]" data-name="Layer_1">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 95 36">
            <g clipPath="url(#clip0_1_1946)" id="Layer_1">
              <path d={svgPaths.p1312cd00} fill="var(--fill-0, #8C0200)" id="Vector" />
              <path d={svgPaths.p393b3b80} fill="var(--fill-0, #8C0200)" id="Vector_2" />
              <path d={svgPaths.p21fcad80} fill="var(--fill-0, #8C0200)" id="Vector_3" />
              <path d={svgPaths.p8a3f240} fill="var(--fill-0, #8C0200)" id="Vector_4" />
              <path d={svgPaths.p117edf00} fill="var(--fill-0, #8C0200)" id="Vector_5" />
              <path d={svgPaths.pc54bc0} fill="var(--fill-0, #8C0200)" id="Vector_6" />
              <path d={svgPaths.p22f6d900} fill="var(--fill-0, #8C0200)" id="Vector_7" />
            </g>
            <defs>
              <clipPath id="clip0_1_1946">
                <rect fill="white" height="36" width="94.6616" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}

// Create Token Button
function CreateTokenButton() {
  return (
    <div className="bg-[#8c0200] box-border content-stretch flex gap-[4px] items-center px-[12px] py-[8px] relative rounded-[1px] shrink-0 cursor-pointer hover:opacity-90 transition-opacity">
      <p 
        className="capitalize leading-[16px] not-italic relative shrink-0 text-[14px] text-nowrap text-white tracking-[0.28px] whitespace-pre hidden sm:block"
        style={fontMedium}
      >
        Create token
      </p>
      <div className="relative shrink-0 size-[20px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
          <g id="icon">
            <path d={plusIconPaths.p1a319000} id="icon_2" stroke="var(--stroke-0, white)" strokeLinecap="square" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

// Wallet Button
function WalletButton() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[4px] items-center px-[12px] py-[8px] relative rounded-[1px] shrink-0 cursor-pointer hover:opacity-90 transition-opacity">
      <div aria-hidden="true" className="absolute border-[#8c0200] border-[1.5px] border-solid inset-0 pointer-events-none rounded-[1px]" />
      <div className="box-border content-stretch flex items-center p-[2px] relative shrink-0 w-[20px]">
        <div className="pointer-events-none relative rounded-[80px] shrink-0 size-[16px]">
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[80px] size-full" src={imgImage} />
          <div aria-hidden="true" className="absolute border border-[#ffe2d1] border-solid inset-[-1px] rounded-[81px]" />
        </div>
      </div>
      <p 
        className="capitalize leading-[16px] not-italic relative shrink-0 text-[#8c0200] text-[14px] text-nowrap tracking-[0.28px] whitespace-pre hidden sm:block"
        style={fontMedium}
      >
        0x635e...9739
      </p>
    </div>
  );
}

// NavBar Component
function NavBar() {
  return (
    <div className="border-[0px_0px_1px] border-[#ffd2b5] border-solid box-border content-stretch flex h-[68px] items-start justify-center relative shrink-0 w-full" data-name="nav-bar">
      <div className="basis-0 box-border content-stretch flex grow h-full items-center justify-between max-w-[768px] min-h-px min-w-px px-[12px] py-0 relative shrink-0" data-name="container">
        <div className="box-border content-stretch flex gap-[40px] h-full items-center px-0 py-[16px] relative shrink-0" data-name="logo">
          <Logo />
        </div>
        <div className="basis-0 border-[1px_0px_0px] border-[#ffd2b5] border-solid grow h-full min-h-px min-w-px relative shrink-0" data-name="ctas">
          <div className="box-border content-stretch flex gap-[16px] items-center justify-center overflow-clip px-0 py-[16px] relative rounded-[inherit] size-full">
            <div className="basis-0 content-stretch flex grow items-start justify-end min-h-px min-w-px relative shrink-0" data-name="container">
              <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0" data-name="actions">
                <CreateTokenButton />
                <WalletButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Blockie component for user avatars
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
  const isGif = type === 'gif';
  
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
const MOCK_SEARCH_DATA: {
  recent: SearchResult[];
  lastSearches: SearchResult[];
  tokens: SearchResult[];
  tickers: SearchResult[];
  users: SearchResult[];
  comments: SearchResult[];
  media: SearchResult[];
} = {
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
      ],
      totalLaunches: 27
    },
    { id: 3, ticker: "$DOGE", name: "DogeToken", type: "ticker", image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=100&h=100&fit=crop", marketCap: "$89.2K", graduation: "72%" },
  ],
  lastSearches: [
    { id: 4, name: "MoonCoin", type: "token", description: "Lunar-themed crypto token", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=100&h=100&fit=crop", marketCap: "$234.8K", graduation: "89%" },
    { id: 5, ticker: "$ETH", name: "Ethereum", type: "ticker", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=100&h=100&fit=crop", marketCap: "$2.4B", graduation: "95%" },
  ],
  tokens: [
    { id: 1, name: "PepeCoin", type: "token", description: "The original meme coin", image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=100&h=100&fit=crop", marketCap: "$124.53K", graduation: "56%" },
    { id: 2, name: "MoonCoin", type: "token", description: "Lunar-themed crypto token", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=100&h=100&fit=crop", marketCap: "$234.8K", graduation: "89%" },
    { id: 3, name: "DogeToken", type: "token", description: "Much wow, very crypto", image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=100&h=100&fit=crop", marketCap: "$89.2K", graduation: "72%" },
  ],
  tickers: [
    { id: 1, ticker: "$PEPE", name: "PepeCoin", type: "ticker", image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=100&h=100&fit=crop", marketCap: "$124.53K", graduation: "56%" },
    { id: 2, ticker: "$DOGE", name: "DogeToken", type: "ticker", image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=100&h=100&fit=crop", marketCap: "$89.2K", graduation: "72%" },
    { id: 3, ticker: "$ETH", name: "Ethereum", type: "ticker", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=100&h=100&fit=crop", marketCap: "$2.4B", graduation: "95%" },
    { id: 4, ticker: "$KBY", name: "Kumbaya", type: "ticker", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=100&h=100&fit=crop", marketCap: "$1.2M", graduation: "78%" },
  ],
  users: [
    { 
      id: 1, 
      username: "@cryptoking", 
      name: "Crypto King", 
      address: "0x1234567890abcdef", 
      avatar: null,
      type: "user",
      launches: [
        { id: 1, image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=100&h=100&fit=crop" },
        { id: 2, image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=100&h=100&fit=crop" },
        { id: 3, image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=100&h=100&fit=crop" },
      ],
      totalLaunches: 27
    },
    { 
      id: 2, 
      username: "@satoshi", 
      name: "Satoshi Nakamoto", 
      address: "0xabcdef1234567890", 
      avatar: null,
      type: "user",
      launches: [
        { id: 1, image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=100&h=100&fit=crop" },
      ],
      totalLaunches: 1
    },
  ],
  comments: [
    { id: 1, text: "This is the best meme ever!", user: "@cryptoking", time: "2h ago", type: "comment", media: { type: "image", url: "https://images.unsplash.com/photo-1555421689-d68471e189f2?w=200&h=200&fit=crop", tips: 1200 } },
    { id: 2, text: "To the moon! 🚀", user: "@memequeen", time: "5h ago", type: "comment", media: null },
    { id: 3, text: "#12345 - Check out this video!", user: "@cryptoking", time: "1d ago", type: "comment", media: { type: "video", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", tips: 850 } },
  ],
  media: [
    { id: 1, name: "epic-meme.jpg", type: "media", mediaType: "image", tips: 1200, url: "https://images.unsplash.com/photo-1555421689-d68471e189f2?w=200&h=200&fit=crop" },
    { id: 2, name: "funny-video.mp4", type: "media", mediaType: "video", tips: 3400, url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
    { id: 3, name: "cool-animation.gif", type: "media", mediaType: "gif", tips: 567, url: "https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" },
  ],
};

// Search Grammar Parser
function parseSearchQuery(query: string): { type: SearchResultType | null; term: string } {
  const trimmed = query.trim();
  
  if (trimmed.startsWith('$')) {
    return { type: 'ticker', term: trimmed.slice(1) };
  }
  if (trimmed.startsWith('@')) {
    return { type: 'user', term: trimmed.slice(1) };
  }
  if (trimmed.startsWith('#')) {
    return { type: 'comment', term: trimmed.slice(1) };
  }
  
  // Check if it's a smart contract address (0x followed by 40 hex chars)
  if (/^0x[a-fA-F0-9]{40}$/.test(trimmed)) {
    return { type: 'token', term: trimmed };
  }
  
  // Default to token name search
  return { type: null, term: trimmed };
}

// Filter search results based on query
function filterSearchResults(query: string, category?: SearchCategory): SearchResult[] {
  const { type, term } = parseSearchQuery(query);
  const lowerTerm = term.toLowerCase();
  
  let results: SearchResult[] = [];
  
  if (type === 'ticker') {
    results = MOCK_SEARCH_DATA.tickers.filter(t => 
      t.ticker?.toLowerCase().includes(lowerTerm) || 
      t.name?.toLowerCase().includes(lowerTerm)
    );
  } else if (type === 'user') {
    results = MOCK_SEARCH_DATA.users.filter(u => 
      u.username?.toLowerCase().includes(lowerTerm) ||
      u.name?.toLowerCase().includes(lowerTerm)
    );
  } else if (type === 'comment') {
    results = MOCK_SEARCH_DATA.comments.filter(c => 
      c.text?.toLowerCase().includes(lowerTerm) ||
      c.user?.toLowerCase().includes(lowerTerm)
    );
  } else if (/^0x[a-fA-F0-9]{40}$/.test(term)) {
    // Smart contract address search
    results = MOCK_SEARCH_DATA.tokens.filter(t => t.address === term);
  } else {
    // Token name search (default)
    results = [
      ...MOCK_SEARCH_DATA.tokens.filter(t => 
        t.name?.toLowerCase().includes(lowerTerm) ||
        t.description?.toLowerCase().includes(lowerTerm)
      ),
      ...MOCK_SEARCH_DATA.tickers.filter(t => 
        t.name?.toLowerCase().includes(lowerTerm) ||
        t.ticker?.toLowerCase().includes(lowerTerm)
      ),
      ...MOCK_SEARCH_DATA.users.filter(u => 
        u.username?.toLowerCase().includes(lowerTerm) ||
        u.name?.toLowerCase().includes(lowerTerm)
      ),
      ...MOCK_SEARCH_DATA.comments.filter(c => 
        c.text?.toLowerCase().includes(lowerTerm)
      ),
      ...MOCK_SEARCH_DATA.media.filter(m => 
        m.name?.toLowerCase().includes(lowerTerm)
      ),
    ];
  }
  
  // Apply category filter if specified
  // Note: In real implementation, results would have category metadata
  // For now, we'll just return all results
  
  return results;
}

// Tab Component
function Tab({ label, isActive, onClick }: { label: FeedTab; isActive: boolean; onClick: () => void }) {
  return (
    <div 
      className={`box-border content-stretch flex gap-[4px] h-full items-center p-[8px] relative shrink-0 cursor-pointer transition-colors ${
        isActive ? 'bg-[#ffe2d1]' : ''
      }`}
      onClick={onClick}
    >
      <p 
        className={`leading-[1.2] not-italic relative shrink-0 text-[12px] text-nowrap tracking-[0.24px] whitespace-pre ${
          isActive ? 'text-[#8c0200]' : 'text-[#6d6153]'
        }`}
        style={fontMedium}
      >
        {label}
      </p>
    </div>
  );
}

// Sort Dropdown Component
function SortDropdown({ 
  options, 
  currentValue, 
  onChange, 
  label 
}: { 
  options: string[]; 
  currentValue: string | null; 
  onChange: (value: string) => void;
  label: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  return (
    <div ref={containerRef} className="relative w-full h-full">
      <div 
        className="content-stretch flex gap-[10px] items-center relative shrink-0 cursor-pointer hover:opacity-80 transition-opacity h-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="content-stretch flex gap-[2px] items-center relative shrink-0">
          <div className="relative shrink-0 size-[16px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
              <g id="icon">
                <path d={sortSvgPaths.p33b99f80} id="icon_2" stroke="var(--stroke-0, #8C0200)" strokeLinecap="square" strokeWidth="1.5" />
              </g>
            </svg>
          </div>
          <p 
            className="leading-[1.2] not-italic relative shrink-0 text-[#8c0200] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre"
            style={fontMedium}
          >
            {currentValue || label}
          </p>
        </div>
        <div className="relative shrink-0 size-[16px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="#8C0200" strokeWidth="1.5" strokeLinecap="square" />
          </svg>
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute top-[calc(100%+4px)] left-0 bg-white border border-[#ffd2b5] rounded-[4px] shadow-lg min-w-[140px] z-50 overflow-hidden"
          >
            {options.map((option) => (
              <div
                key={option}
                className={`px-[12px] py-[8px] cursor-pointer hover:bg-[#ffe2d1] transition-colors ${
                  currentValue === option ? 'bg-[#ffe2d1]' : ''
                }`}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
              >
                <p 
                  className="leading-[1.2] not-italic text-[#6d6153] text-[12px] tracking-[0.24px]"
                  style={{
                    fontFamily: '"Neue Haas Grotesk Display", system-ui, -apple-system, sans-serif',
                    fontWeight: 500,
                  }}
                >
                  {option}
                </p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Range Slider Component
function RangeSlider({ 
  label, 
  min, 
  max, 
  value, 
  onChange 
}: { 
  label: string; 
  min: number; 
  max: number; 
  value: [number, number]; 
  onChange: (value: [number, number]) => void;
}) {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(Number(e.target.value), value[1]);
    onChange([newMin, value[1]]);
  };
  
  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(Number(e.target.value), value[0]);
    onChange([value[0], newMax]);
  };
  
  return (
    <div className="py-2">
      <div className="flex items-center justify-between mb-2">
        <label 
          className="text-[12px] text-[#6d6153]"
          style={{
            fontFamily: '"Neue Haas Grotesk Display", system-ui, -apple-system, sans-serif',
            fontWeight: 500,
          }}
        >
          {label}
        </label>
        <span 
          className="text-[12px] text-[#8c0200]"
          style={{
            fontFamily: '"Neue Haas Grotesk Display", system-ui, -apple-system, sans-serif',
            fontWeight: 500,
          }}
        >
          ${value[0].toLocaleString()} - ${value[1].toLocaleString()}
        </span>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="range"
          min={min}
          max={max}
          value={value[0]}
          onChange={handleMinChange}
          className="flex-1 h-1 bg-[#ffd2b5] rounded-lg appearance-none cursor-pointer accent-[#8c0200]"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value[1]}
          onChange={handleMaxChange}
          className="flex-1 h-1 bg-[#ffd2b5] rounded-lg appearance-none cursor-pointer accent-[#8c0200]"
        />
      </div>
    </div>
  );
}

// Search Results Component
function SearchResults({ 
  results, 
  isLoading 
}: { 
  results: SearchResult[]; 
  isLoading: boolean;
}) {
  // Group results by type
  const grouped = results.reduce((acc, result) => {
    if (!acc[result.type]) {
      acc[result.type] = [];
    }
    acc[result.type].push(result);
    return acc;
  }, {} as Record<SearchResultType, SearchResult[]>);
  
  const typeLabels: Record<SearchResultType, string> = {
    token: 'Tokens',
    ticker: 'Tickers',
    user: 'Users',
    comment: 'Comments',
    media: 'Media',
  };
  
  if (isLoading) {
    return (
      <div className="px-4 py-8 text-center text-[#6d6153]">
        <p className="text-[14px]" style={fontRegular}>Loading results...</p>
      </div>
    );
  }
  
  if (results.length === 0) {
    return (
      <div className="px-4 py-8 text-center text-[#6d6153]">
        <p className="text-[14px]" style={fontMedium}>No results found</p>
        <p className="text-[12px] opacity-70 mt-1" style={fontRegular}>Try a different search term</p>
      </div>
    );
  }
  
  return (
    <div className="divide-y divide-[#ffd2b5]">
      {Object.entries(grouped).map(([type, items]) => (
        <div key={type}>
          <div className="px-4 py-2 bg-[#ffe2d1]">
            <p 
              className="text-[10px] text-[#8c0200] uppercase tracking-wider"
              style={fontMedium}
            >
              {typeLabels[type as SearchResultType]}
            </p>
          </div>
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="px-4 py-3 hover:bg-[#ffe2d1] cursor-pointer transition-colors flex gap-3 items-center"
            >
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
                item.image && <MediaPreview type="image" url={item.image} />
              )}
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                {item.type === 'token' ? (
                  <>
                    <div className="text-[14px] text-[#6d6153]" style={fontMedium}>{item.name}</div>
                    <div className="text-[12px] text-[#6d6153] opacity-70" style={fontRegular}>{item.description}</div>
                  </>
                ) : item.type === 'ticker' ? (
                  <>
                    <div className="text-[14px] text-[#8c0200]" style={fontMedium}>{item.ticker}</div>
                    <div className="text-[12px] text-[#6d6153] opacity-70" style={fontRegular}>{item.name}</div>
                  </>
                ) : item.type === 'user' ? (
                  <>
                    <div className="text-[14px] text-[#6d6153]" style={fontMedium}>{item.username}</div>
                    <div className="text-[12px] text-[#6d6153] opacity-70" style={fontRegular}>{item.name}</div>
                  </>
                ) : item.type === 'comment' ? (
                  <>
                    <div className="text-[14px] text-[#6d6153]" style={fontMedium}>{item.user}</div>
                    <div className="text-[12px] text-[#6d6153]" style={fontRegular}>{item.text}</div>
                    {item.time && <div className="text-[10px] text-[#6d6153] opacity-70 mt-1" style={fontRegular}>{item.time}</div>}
                  </>
                ) : item.type === 'media' ? (
                  <>
                    <div className="text-[14px] text-[#6d6153]" style={fontMedium}>{item.name}</div>
                    <div className="text-[12px] text-[#6d6153] opacity-70" style={fontRegular}>{item.mediaType}</div>
                  </>
                ) : null}
              </div>
              
              {/* Right side stats */}
              {(item.type === 'token' || item.type === 'ticker') && (
                <div className="flex items-center gap-2">
                  {item.marketCap && (
                    <div className="flex items-center gap-[2px]">
                      <div className="relative shrink-0 size-[16px]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                          <g id="icon">
                            <path d={tokenSvgPaths.p7124f80} id="icon_2" stroke="var(--stroke-0, #0D0B08)" strokeLinecap="square" strokeWidth="1.5" />
                          </g>
                        </svg>
                      </div>
                      <p className="text-[12px] text-[#6d6153]" style={fontMedium}>{item.marketCap}</p>
                    </div>
                  )}
                  {item.graduation && (
                    <div className="flex items-center gap-[2px]">
                      <div className="relative shrink-0 size-[16px]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                          <g id="icon">
                            <path d={tokenSvgPaths.p34c8bb00} id="icon_2" stroke="var(--stroke-0, #0D0B08)" strokeLinecap="square" strokeWidth="1.5" />
                          </g>
                        </svg>
                      </div>
                      <p className="text-[12px] text-[#6d6153]" style={fontMedium}>{item.graduation}</p>
                    </div>
                  )}
                </div>
              )}
              {item.type === 'user' && item.launches && (
                <div className="flex items-center gap-1">
                  {item.launches.slice(0, 3).map(launch => (
                    <img 
                      key={launch.id} 
                      src={launch.image} 
                      alt="" 
                      className="w-5 h-5 rounded-[4px] object-cover" 
                    />
                  ))}
                  {item.totalLaunches && item.totalLaunches > 3 && (
                    <span className="text-[12px] text-[#6d6153] ml-1" style={fontMedium}>
                      +{item.totalLaunches - 3}
                    </span>
                  )}
                </div>
              )}
              {(item.type === 'comment' || item.type === 'media') && (item.media?.tips || item.tips) && (
                <div className="text-[12px] text-[#8c0200]" style={fontMedium}>
                  {item.media?.tips || item.tips} tips
                </div>
              )}
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  );
}

// Main Toolbar Component
function Toolbar({
  activeTab,
  feedSort,
  isSearchActive,
  onTabChange,
  onFeedSortChange,
  onSearchActivate,
  onSearchDeactivate,
}: {
  activeTab: FeedTab;
  feedSort: FeedSort | null;
  isSearchActive: boolean;
  onTabChange: (tab: FeedTab) => void;
  onFeedSortChange: (sort: FeedSort) => void;
  onSearchActivate: () => void;
  onSearchDeactivate: () => void;
}) {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full overflow-visible" data-name="toolbar">
      <div className="basis-0 bg-white border-b border-[#ffd2b5] border-solid grow max-w-[768px] min-h-px min-w-px relative shrink-0 overflow-visible" data-name="container">
        <div className="content-stretch flex flex-row items-center max-w-inherit overflow-visible relative rounded-[inherit] w-full">
          {/* Tabs Section - Hide when search is active */}
          <AnimatePresence>
            {!isSearchActive && (
              <motion.div 
                className="basis-0 flex flex-row grow items-center self-stretch shrink-0"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15, ease: [0.4, 0, 1, 1] }}
              >
                <div className="basis-0 bg-[#ffe2d1] box-border content-stretch flex grow h-full items-center min-h-px min-w-px px-[4px] py-0 relative shrink-0">
                  <Tab label="ALL" isActive={activeTab === 'ALL'} onClick={() => onTabChange('ALL')} />
                  <Tab label="MEANS" isActive={activeTab === 'MEANS'} onClick={() => onTabChange('MEANS')} />
                  <Tab label="DARES" isActive={activeTab === 'DARES'} onClick={() => onTabChange('DARES')} />
                  <Tab label="QUESTIONS" isActive={activeTab === 'QUESTIONS'} onClick={() => onTabChange('QUESTIONS')} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Right Side: Sort + Search - Hide when search is active */}
          <AnimatePresence>
            {!isSearchActive && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="content-stretch flex items-start relative shrink-0"
                style={{ width: '276px' }}
              >
                {/* Sort Button */}
                <div className="bg-[#ffe2d1] box-border content-stretch flex flex-col h-[36px] items-start justify-between px-[16px] py-[8px] relative shrink-0">
                  <SortDropdown
                    options={['Latest', 'Hottest', 'Trending']}
                    currentValue={feedSort}
                    onChange={(value) => onFeedSortChange(value as FeedSort)}
                    label="Sort"
                  />
                </div>
                
                {/* Search Icon Button */}
                <div 
                  className="basis-0 bg-[#ffe2d1] border-[0px_0px_0px_1px] border-[#ffd2b5] border-solid box-border content-stretch flex flex-col gap-[8px] grow h-[36px] items-start justify-center min-h-px min-w-px px-[16px] py-[8px] relative shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={onSearchActivate}
                >
                  <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                    <div className="content-stretch flex gap-[2px] items-center relative shrink-0">
                      <div className="relative shrink-0 size-[16px]">
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
                      </div>
                      <p 
                        className="leading-[1.2] not-italic relative shrink-0 text-[#8c0200] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre"
                        style={fontMedium}
                      >
                        Search
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Search Section - Expands to full width when active */}
          <SearchSection
            isActive={isSearchActive}
            onActivate={onSearchActivate}
            onDeactivate={onSearchDeactivate}
          />
        </div>
      </div>
    </div>
  );
}

// Search Section Component
function SearchSection({
  isActive,
  onActivate,
  onDeactivate,
}: {
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  const [searchValue, setSearchValue] = useState("");
  const [searchSort, setSearchSort] = useState<SearchSort | null>(null);
  const [searchCategory, setSearchCategory] = useState<SearchCategory | null>(null);
  const [volumeRange, setVolumeRange] = useState<[number, number]>([0, 1000000]);
  const [marketCapRange, setMarketCapRange] = useState<[number, number]>([0, 5000000]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Auto-focus when activated
  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);
  
  // Show recent/last searches when active but no query
  useEffect(() => {
    if (isActive && !searchValue.trim()) {
      setSearchResults([...MOCK_SEARCH_DATA.recent, ...MOCK_SEARCH_DATA.lastSearches]);
    }
  }, [isActive, searchValue]);
  
  // Debounced search
  useEffect(() => {
    if (!isActive) return;
    
    const timeoutId = setTimeout(() => {
      if (searchValue.trim()) {
        setIsSearching(true);
        // Simulate API call
        setTimeout(() => {
          const results = filterSearchResults(searchValue, searchCategory || undefined);
          setSearchResults(results);
          setIsSearching(false);
        }, 300);
      } else {
        setSearchResults([...MOCK_SEARCH_DATA.recent, ...MOCK_SEARCH_DATA.lastSearches]);
      }
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [searchValue, searchCategory, isActive]);
  
  // Handle clipboard paste
  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      setSearchValue(text);
      inputRef.current?.focus();
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    }
  }, []);
  
  // Search icon component
  const SearchIcon = () => (
    <div className="relative shrink-0 size-[16px]">
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
    </div>
  );
  
  return (
    <motion.div
      ref={containerRef}
      className="content-stretch flex items-start relative shrink-0 overflow-visible"
      animate={{
        width: isActive ? '100%' : 'auto',
        flex: isActive ? '1 1 0%' : '0 0 auto',
      }}
      transition={{ 
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {!isActive ? (
        // Resting state
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="bg-[#ffe2d1] box-border content-stretch flex flex-col h-[36px] items-start justify-between px-[16px] py-[8px] relative shrink-0 cursor-pointer"
          onClick={onActivate}
        >
          <div className="content-stretch flex gap-[2px] items-center relative shrink-0">
            <SearchIcon />
            <span 
              className="leading-[1.2] not-italic relative shrink-0 text-[#8c0200] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre"
              style={{
                fontFamily: '"Neue Haas Grotesk Display", system-ui, -apple-system, sans-serif',
                fontWeight: 500,
              }}
            >
              Search
            </span>
          </div>
        </motion.div>
      ) : (
        // Active search mode
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full relative"
        >
          {/* Search Bar */}
          <div className="bg-[#ffe2d1] box-border content-stretch flex items-center relative w-full h-[36px] overflow-clip">
            <div aria-hidden="true" className="absolute border-[#ffd2b5] border-[0px_0px_0px_1px] border-solid inset-0 pointer-events-none" />
            
            <div className="flex items-center w-full h-full px-[12px] gap-[6px]">
              {/* Search Input */}
              <div className="flex-1 flex items-center gap-[6px]">
                <SearchIcon />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Type to search..."
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
              
              {/* Search-specific controls */}
              <div className="flex items-center gap-[8px] shrink-0">
                {/* Category Dropdown */}
                <SortDropdown
                  options={['MEANS', 'DARES', 'QUESTIONS']}
                  currentValue={searchCategory}
                  onChange={(value) => setSearchCategory(value as SearchCategory)}
                  label="Category"
                />
                
                {/* Sort Dropdown */}
                <SortDropdown
                  options={['Latest', 'Trending', 'Hot', 'Starred']}
                  currentValue={searchSort}
                  onChange={(value) => setSearchSort(value as SearchSort)}
                  label="Sort"
                />
                
                {/* Filters Toggle */}
                <div 
                  className="cursor-pointer hover:opacity-70 transition-opacity"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <svg className="w-4 h-4" fill="none" stroke="#8C0200" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="square" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                </div>
                
                {/* Clipboard Paste */}
                <div 
                  className="cursor-pointer hover:opacity-70 transition-opacity"
                  onClick={handlePaste}
                  title="Paste from clipboard"
                >
                  <svg className="w-4 h-4" fill="none" stroke="#8C0200" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="square" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                
                {/* Close */}
                <div 
                  className="cursor-pointer hover:opacity-70 transition-opacity"
                  onClick={onDeactivate}
                >
                  <svg className="w-4 h-4" fill="none" stroke="#8C0200" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="square" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-[#ffd2b5] border-t border-[#ffd2b5] px-4 py-3 overflow-hidden"
              >
                <RangeSlider
                  label="Volume"
                  min={0}
                  max={1000000}
                  value={volumeRange}
                  onChange={setVolumeRange}
                />
                <RangeSlider
                  label="Market Cap"
                  min={0}
                  max={5000000}
                  value={marketCapRange}
                  onChange={setMarketCapRange}
                />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Search Results */}
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="absolute top-[100%] left-0 right-0 bg-white border border-[#ffd2b5] border-t-0 max-h-[500px] overflow-y-auto z-50 shadow-lg mt-[-1px]"
              >
                <SearchResults results={searchResults} isLoading={isSearching} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
}

// Main Component
export default function Searchbox() {
  const [activeTab, setActiveTab] = useState<FeedTab>("ALL");
  const [feedSort, setFeedSort] = useState<FeedSort | null>(null);
  const [isSearchActive, setIsSearchActive] = useState(false);
  
  return (
    <div className="h-[1080px] w-[1440px] mx-auto" data-name="layout/desktop">
      <div className="absolute bg-gradient-to-b content-stretch flex flex-col from-[#ffd2b5] inset-0 items-start to-[11.747%] to-[#fafafa]">
        {/* NavBar */}
        <NavBar />
        
        {/* Toolbar */}
        <Toolbar
          activeTab={activeTab}
          feedSort={feedSort}
          isSearchActive={isSearchActive}
          onTabChange={setActiveTab}
          onFeedSortChange={setFeedSort}
          onSearchActivate={() => setIsSearchActive(true)}
          onSearchDeactivate={() => setIsSearchActive(false)}
        />
        
        {/* Body - Feed placeholder */}
        <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0 w-full" data-name="body">
          <div className="basis-0 content-stretch flex flex-col grow h-full items-center min-h-px min-w-px relative shrink-0">
            <div className="basis-0 content-stretch flex grow items-center justify-center min-h-px min-w-px relative shrink-0 w-full">
              <div className="text-center text-[#6d6153]">
                <p className="text-[16px] font-medium mb-2">Feed Content</p>
                <p className="text-[12px] opacity-70">
                  Active Tab: {activeTab} | Sort: {feedSort || 'None'}
                </p>
                {isSearchActive && (
                  <p className="text-[12px] opacity-70 mt-2">Search mode is active</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

