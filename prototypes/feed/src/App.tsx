import React from "react";
import svgPaths from "./imports/svg-01q4wve5uj";
import plusIconPaths from "./imports/svg-43c09v0lsa";
import heartSvgPaths from "./imports/svg-ixgy2ai4eq";
import tokenSvgPaths from "./imports/svg-hq0mv37q6e";
import imgImage from "figma:asset/439247b1ebb4193e9686845f7aaaf7a95abc5bfe.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { motion, AnimatePresence } from "motion/react";
import ThreadV4 from "./imports/ThreadV4";
import { ThreadVariation, THREAD_DATA } from "./components/ThreadVariations";
import LoadingStateSkeleton from "./components/LoadingSkeleton";
import NewEntriesButton from "./components/NewEntriesButton";
import EnhancedSearchBar from "./components/EnhancedSearchBar";

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

// Media preview component with squircle for images/videos
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
  tokenNames: [
    { id: 1, name: "PepeCoin", description: "The original meme coin", marketCap: "$124.53K", graduation: "56%", image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=100&h=100&fit=crop" },
    { id: 2, name: "DogeToken", description: "Much wow, very crypto", marketCap: "$89.2K", graduation: "72%", image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=100&h=100&fit=crop" },
  ],
  tickers: [
    { id: 1, ticker: "$PEPE", name: "PepeCoin", marketCap: "$124.53K", graduation: "56%", image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=100&h=100&fit=crop" },
    { id: 2, ticker: "$DOGE", name: "DogeToken", marketCap: "$89.2K", graduation: "72%", image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=100&h=100&fit=crop" },
  ],
  users: [
    { 
      id: 1, 
      username: "@cryptoking", 
      name: "Crypto King", 
      address: "0x1234567890abcdef", 
      avatar: null,
      launches: [
        { id: 1, image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=100&h=100&fit=crop" },
        { id: 2, image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=100&h=100&fit=crop" },
        { id: 3, image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=100&h=100&fit=crop" },
      ],
      totalLaunches: 27
    },
    { 
      id: 2, 
      username: "@memequeen", 
      name: "Meme Queen", 
      address: "0xabcdef1234567890", 
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
      launches: [
        { id: 1, image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=100&h=100&fit=crop" },
        { id: 2, image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=100&h=100&fit=crop" },
      ],
      totalLaunches: 5
    },
  ],
  comments: [
    { id: 1, text: "This is the best meme ever!", user: "@cryptoking", time: "2h ago", media: { type: "image", url: "https://images.unsplash.com/photo-1555421689-d68471e189f2?w=200&h=200&fit=crop", tips: 1200 } },
    { id: 2, text: "To the moon! 🚀", user: "@memequeen", time: "5h ago", media: null },
    { id: 3, text: "Check out this video!", user: "@cryptoking", time: "1d ago", media: { type: "video", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", tips: 850 } },
  ],
  mediaNames: [
    { id: 1, name: "epic-meme.jpg", type: "image", tips: 1200, url: "https://images.unsplash.com/photo-1555421689-d68471e189f2?w=200&h=200&fit=crop" },
    { id: 2, name: "funny-video.mp4", type: "video", tips: 3400, url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
    { id: 3, name: "cool-animation.gif", type: "gif", tips: 567, url: "https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" },
  ],
};

function Layer1() {
  return (
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
  );
}

function Frame1597879971() {
  return (
    <div className="content-stretch flex gap-[7.2px] items-center relative shrink-0">
      <Layer1 />
    </div>
  );
}

function Logo() {
  return (
    <div className="content-stretch flex gap-[36px] items-center relative shrink-0" data-name="logo">
      <Frame1597879971 />
    </div>
  );
}

function Logo1() {
  return (
    <div className="box-border content-stretch flex gap-[40px] h-full items-center px-0 py-[16px] relative shrink-0" data-name="logo">
      <div aria-hidden="true" className="absolute border-[#ffb38b] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <Logo />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="icon">
          <path d={plusIconPaths.p1a319000} id="icon_2" stroke="var(--stroke-0, white)" strokeLinecap="square" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#8c0200] box-border content-stretch flex gap-[4px] items-center px-[12px] py-[8px] relative rounded-[1px] shrink-0" data-name="button">
      <p className="capitalize font-['Neue_Haas_Grotesk_Display:Medium',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[14px] text-nowrap text-white tracking-[0.28px] whitespace-pre hidden sm:block">Create token</p>
      <Icon />
    </div>
  );
}

function Avatar1() {
  return (
    <div className="box-border content-stretch flex items-center p-[2px] relative shrink-0 w-[20px]" data-name="avatar">
      <div className="pointer-events-none relative rounded-[80px] shrink-0 size-[16px]" data-name="image">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[80px] size-full" src={imgImage} />
        <div aria-hidden="true" className="absolute border border-[#ffe2d1] border-solid inset-[-1px] rounded-[81px]" />
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[4px] items-center px-[12px] py-[8px] relative rounded-[1px] shrink-0" data-name="button">
      <div aria-hidden="true" className="absolute border-[#8c0200] border-[1.5px] border-solid inset-0 pointer-events-none rounded-[1px]" />
      <Avatar1 />
      <p className="capitalize font-['Neue_Haas_Grotesk_Display:Medium',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[#8c0200] text-[14px] text-nowrap tracking-[0.28px] whitespace-pre hidden sm:block">0x635e...9739</p>
    </div>
  );
}

function Actions() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0" data-name="actions">
      <Button />
      <Button1 />
    </div>
  );
}

function Container() {
  return (
    <div className="basis-0 content-stretch flex grow items-start justify-end min-h-px min-w-px relative shrink-0" data-name="container">
      <Actions />
    </div>
  );
}

function Ctas() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="ctas">
      <div className="box-border content-stretch flex gap-[16px] items-center justify-center overflow-clip px-0 py-[16px] relative rounded-[inherit] size-full">
        <Container />
      </div>
      <div aria-hidden="true" className="absolute border-[#ffd2b5] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container1() {
  return (
    <div className="basis-0 grow h-full w-full max-w-[768px] min-h-px min-w-px relative shrink-0" data-name="container">
      <div className="flex flex-row items-center max-w-inherit size-full">
        <div className="box-border content-stretch flex items-center justify-between max-w-inherit px-[12px] py-0 relative size-full">
          <Logo1 />
          <Ctas />
        </div>
      </div>
    </div>
  );
}

function NavBar() {
  return (
    <div className="content-stretch flex h-[68px] items-start justify-center relative shrink-0 w-full" data-name="nav-bar">
      <div aria-hidden="true" className="absolute border-[#ffd2b5] border-[0px_0px_1px] border-solid bottom-[-0.5px] left-0 pointer-events-none right-0 top-0" />
      <Container1 />
    </div>
  );
}

interface TabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function Tab({ label, isActive, onClick }: TabProps) {
  return (
    <div 
      className="bg-[#ffe2d1] box-border content-stretch flex gap-[4px] h-full items-center p-[12px] sm:p-[8px] relative shrink-0 cursor-pointer hover:bg-[#ffd2b5] transition-colors" 
      data-name="tab"
      onClick={onClick}
    >
      <span 
        style={{
          fontFamily: '"Neue Haas Grotesk Display", system-ui, -apple-system, sans-serif',
          fontWeight: 500,
          fontSize: '12px',
          fontStyle: 'normal',
          color: isActive ? '#8c0200' : '#6d6153',
          letterSpacing: '0.24px',
          lineHeight: '120%',
          whiteSpace: 'pre'
        }}
      >
        {label}
      </span>
    </div>
  );
}

interface TabSelectorProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

function TabSelector({ activeTab, onTabChange }: TabSelectorProps) {
  const tabs = ['All', 'Memes', 'Dares', 'Questions'];

  return (
    <div className="basis-0 bg-[#ffe2d1] grow h-full min-h-px min-w-px relative shrink-0" data-name="tab-selector">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center px-[4px] py-0 relative size-full overflow-x-auto">
          {tabs.map((tab) => (
            <Tab
              key={tab}
              label={tab}
              isActive={activeTab === tab}
              onClick={() => onTabChange(tab)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="icon">
          <path d={svgPaths.p33b99f80} id="icon_2" stroke="var(--stroke-0, #8C0200)" strokeLinecap="square" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

type SortOption = 'Latest' | 'Trending' | 'Starred';

function SortButton() {
  const [sortBy, setSortBy] = React.useState<SortOption>('Latest');
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <div className="content-stretch flex gap-[10px] items-center relative shrink-0 cursor-pointer hover:opacity-80 transition-opacity p-[12px] sm:p-0" data-name="user+stv">
          <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="sort-button">
            <Icon6 />
            <span 
              className="hidden sm:inline"
              style={{
                fontFamily: '"Neue Haas Grotesk Display", system-ui, -apple-system, sans-serif',
                fontWeight: 500,
                fontSize: '12px',
                fontStyle: 'normal',
                color: '#8c0200',
                letterSpacing: '0.24px',
                lineHeight: '120%',
                whiteSpace: 'pre',
                width: '52px'
              }}
            >
              {sortBy}
            </span>
          </div>
          <div className="box-border content-stretch flex gap-[2px] items-center p-[2px] relative rounded-[1px] shrink-0 hidden sm:flex" data-name="button">
            <div 
              className="relative shrink-0 size-[16px] transition-transform duration-200" 
              data-name="icon"
              style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
            >
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                <g id="icon">
                  <path d={svgPaths.p2ee40c80} id="icon_2" stroke="var(--stroke-0, #8C0200)" strokeLinecap="square" strokeWidth="1.5" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="bg-white border border-[#ffd2b5] rounded-[4px] shadow-lg min-w-[120px]">
        <DropdownMenuItem 
          onClick={() => setSortBy('Latest')}
          className="cursor-pointer px-4 py-2 hover:bg-[#ffe2d1] focus:bg-[#ffe2d1] rounded-none"
        >
          <span style={{ fontFamily: '"Neue Haas Grotesk Display", system-ui, -apple-system, sans-serif', fontWeight: 500, fontSize: '12px', fontStyle: 'normal', color: '#6d6153', letterSpacing: '0.24px', lineHeight: '120%' }}>Latest</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setSortBy('Trending')}
          className="cursor-pointer px-4 py-2 hover:bg-[#ffe2d1] focus:bg-[#ffe2d1] rounded-none"
        >
          <span style={{ fontFamily: '"Neue Haas Grotesk Display", system-ui, -apple-system, sans-serif', fontWeight: 500, fontSize: '12px', fontStyle: 'normal', color: '#6d6153', letterSpacing: '0.24px', lineHeight: '120%' }}>Trending</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setSortBy('Starred')}
          className="cursor-pointer px-4 py-2 hover:bg-[#ffe2d1] focus:bg-[#ffe2d1] rounded-none"
        >
          <span style={{ fontFamily: '"Neue Haas Grotesk Display", system-ui, -apple-system, sans-serif', fontWeight: 500, fontSize: '12px', fontStyle: 'normal', color: '#6d6153', letterSpacing: '0.24px', lineHeight: '120%' }}>Starred</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function UserStv() {
  return <SortButton />;
}

function ModalHead() {
  return (
    <div className="bg-[#ffe2d1] box-border content-stretch flex flex-col h-[36px] items-start justify-between px-0 sm:px-[16px] py-0 sm:py-[8px] relative shrink-0" data-name="modal-head">
      <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
        <UserStv />
        <div className="w-[1px] h-[20px] bg-[#ffd2b5]" />
        <div className="content-stretch flex gap-[2px] items-center relative shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
          <Icon9 />
          <span 
            className="hidden sm:inline"
            style={{
              fontFamily: '"Neue Haas Grotesk Display", system-ui, -apple-system, sans-serif',
              fontWeight: 500,
              fontSize: '12px',
              fontStyle: 'normal',
              color: '#8c0200',
              letterSpacing: '0.24px',
              lineHeight: '120%',
              whiteSpace: 'pre'
            }}
          >
            Search
          </span>
        </div>
      </div>
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="icon">
          <path d={svgPaths.p310d5600} id="icon_2" stroke="var(--stroke-0, #8C0200)" strokeLinecap="square" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

interface SearchBarProps {
  isExpanded: boolean;
  onFocus: () => void;
  onBlur: () => void;
}

function SearchBar({ isExpanded, onFocus, onBlur }: SearchBarProps) {
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [isSearching, setIsSearching] = React.useState(false);
  const [dropdownPosition, setDropdownPosition] = React.useState({ top: 0, left: 0, width: 0 });
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [showContent, setShowContent] = React.useState(false);
  const searchRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Update dropdown position continuously when expanded
  React.useEffect(() => {
    if (!isExpanded) return;

    let frameId: number;
    const updatePosition = () => {
      if (searchRef.current) {
        // Find the modal-head parent container for accurate width
        const modalHead = searchRef.current.closest('[data-name="modal-head"]');
        const targetElement = modalHead || searchRef.current;
        const rect = targetElement.getBoundingClientRect();
        
        // Use the searchRef for vertical position but modalHead for width
        const searchRect = searchRef.current.getBoundingClientRect();
        
        setDropdownPosition({
          top: rect.bottom + 4,
          left: rect.left,
          width: rect.width,
        });
      }
      if (isExpanded) {
        frameId = requestAnimationFrame(updatePosition);
      }
    };

    // Start immediately without delay
    updatePosition();

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [isExpanded]);

  // Filter search results based on query
  const getFilteredResults = () => {
    if (!searchValue.trim()) return null;

    const query = searchValue.toLowerCase();
    return {
      tokenNames: MOCK_SEARCH_DATA.tokenNames.filter(item => 
        item.name.toLowerCase().includes(query) || item.description.toLowerCase().includes(query)
      ),
      tickers: MOCK_SEARCH_DATA.tickers.filter(item => 
        item.ticker.toLowerCase().includes(query) || item.name.toLowerCase().includes(query)
      ),
      users: MOCK_SEARCH_DATA.users.filter(item => 
        item.username.toLowerCase().includes(query) || item.name.toLowerCase().includes(query)
      ),
      comments: MOCK_SEARCH_DATA.comments.filter(item => 
        item.text.toLowerCase().includes(query)
      ),
      mediaNames: MOCK_SEARCH_DATA.mediaNames.filter(item => 
        item.name.toLowerCase().includes(query)
      ),
    };
  };

  const results = getFilteredResults();
  const hasResults = results && (
    results.tokenNames.length > 0 || 
    results.tickers.length > 0 || 
    results.users.length > 0 || 
    results.comments.length > 0 || 
    results.mediaNames.length > 0
  );

  React.useEffect(() => {
    if (searchValue.trim()) {
      setIsSearching(true);
      const timer = setTimeout(() => setIsSearching(false), 300);
      return () => clearTimeout(timer);
    } else {
      setIsSearching(false);
    }
  }, [searchValue]);

  // Delay showing dropdown until search bar expansion completes
  React.useEffect(() => {
    if (isExpanded) {
      // Wait for the search bar expansion animation (400ms)
      const dropdownTimer = setTimeout(() => setShowDropdown(true), 400);
      // Then wait for dropdown animation (250ms) before showing content
      const contentTimer = setTimeout(() => setShowContent(true), 650);
      return () => {
        clearTimeout(dropdownTimer);
        clearTimeout(contentTimer);
      };
    } else {
      setShowDropdown(false);
      setShowContent(false);
    }
  }, [isExpanded]);

  // Clear searching state and text when blurred
  const handleBlur = () => {
    setIsSearching(false);
    setSearchValue('');
    setShowDropdown(false);
    setShowContent(false);
    onBlur();
  };

  // Handle clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        handleBlur();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onBlur]);

  // Handle ESC key
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isExpanded) {
        handleBlur();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isExpanded]);

  const handleContainerClick = () => {
    if (inputRef.current && !isExpanded) {
      inputRef.current.focus();
    }
  };

  return (
    <div ref={searchRef} className="content-stretch flex items-center justify-between relative shrink-0 w-full gap-[10px] group" data-name="search-bar">
      <div 
        onClick={handleContainerClick}
        className="basis-0 content-stretch flex gap-[10px] grow items-center min-h-px min-w-px relative shrink-0 cursor-text"
      >
        <div className="content-stretch flex gap-[2px] items-center relative shrink-0 pointer-events-none" data-name="left">
          <Icon9 />
          <AnimatePresence>
            {!isExpanded && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15, ease: [0.4, 0, 1, 1] }}
                className="hidden sm:inline"
                style={{
                  fontFamily: '"Neue Haas Grotesk Display", system-ui, -apple-system, sans-serif',
                  fontWeight: 500,
                  fontSize: '12px',
                  fontStyle: 'normal',
                  color: '#8c0200',
                  letterSpacing: '0.24px',
                  lineHeight: '120%',
                  whiteSpace: 'pre'
                }}
              >
                Search
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={onFocus}
          placeholder=""
          className="flex-1 bg-transparent border-none outline-none text-[12px] text-[#6d6153] placeholder:text-[#6d6153] placeholder:opacity-50 transition-all"
          style={{
            fontFamily: '"Neue Haas Grotesk Display", system-ui, -apple-system, sans-serif',
            fontWeight: 500,
            fontStyle: 'normal',
            letterSpacing: '0.24px',
            lineHeight: '120%'
          }}
        />
        {isSearching && (
          <div className="animate-spin h-3 w-3 border-2 border-[#8c0200] border-t-transparent rounded-full" />
        )}
      </div>

      {/* Search Results Dropdown - Using Portal */}
      {typeof window !== 'undefined' && ReactDOM.createPortal(
        <AnimatePresence>
          {showDropdown && (
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
                top: `${dropdownPosition.top}px`,
                left: `${dropdownPosition.left}px`,
                width: `${dropdownPosition.width}px`,
                zIndex: 9999,
              }}
            >
            {!searchValue.trim() ? (
              // Recent and Popular categories when search is empty
              showContent ? (
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
                        <MediaPreview type={item.mediaType as any} url={item.url!} />
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
                            <div className="text-[14px] text-[#6d6153] mb-1">{item.text}</div>
                            <div className="flex gap-2 text-[12px] text-[#6d6153] opacity-70">
                              <span>{item.user}</span>
                              <span>•</span>
                              <span style={{ fontWeight: 500 }}>{item.time}</span>
                            </div>
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
                      ) : item.type === 'comment' && item.media ? (
                        <div className="flex items-center gap-[2px] rounded-[1px]">
                          <div className="relative shrink-0 size-[16px]">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                              <g id="icon">
                                <path d={heartSvgPaths.paffe900} id="icon_2" stroke="var(--stroke-0, #8C0200)" strokeWidth="1.5" />
                              </g>
                            </svg>
                          </div>
                          <p className="text-[12px] text-[#8c0200]" style={{ fontWeight: 500 }}>{item.media.tips.toLocaleString()}</p>
                        </div>
                      ) : item.type === 'media' ? (
                        <div className="flex items-center gap-[2px] rounded-[1px]">
                          <div className="relative shrink-0 size-[16px]">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                              <g id="icon">
                                <path d={heartSvgPaths.paffe900} id="icon_2" stroke="var(--stroke-0, #8C0200)" strokeWidth="1.5" />
                              </g>
                            </svg>
                          </div>
                          <p className="text-[12px] text-[#8c0200]" style={{ fontWeight: 500 }}>{item.tips.toLocaleString()}</p>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-[150px]" />
              )
            ) : !hasResults ? (
              <div className="px-4 py-3 text-[#6d6153] text-[14px]" style={{ fontWeight: 500 }}>
                No results found
              </div>
            ) : (
              <div>
                {/* Token Names */}
                {results.tokenNames.length > 0 && (
                  <div>
                    <div className="px-4 py-2 text-[10px] text-[#8c0200] uppercase tracking-wider" style={{ fontWeight: 500 }}>
                      Token Name
                    </div>
                    {results.tokenNames.map(item => (
                      <div key={item.id} className="px-4 py-3 hover:bg-[#ffe2d1] cursor-pointer transition-colors flex items-center gap-3">
                        <MediaPreview type="image" url={item.image} />
                        <div className="flex-1">
                          <div className="text-[14px] text-[#6d6153]" style={{ fontWeight: 500 }}>{item.name}</div>
                          <div className="text-[12px] text-[#6d6153] opacity-70">{item.description}</div>
                        </div>
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
                      </div>
                    ))}
                  </div>
                )}

                {/* Tickers */}
                {results.tickers.length > 0 && (
                  <div>
                    <div className="px-4 py-2 text-[10px] text-[#8c0200] uppercase tracking-wider" style={{ fontWeight: 500 }}>
                      Ticker
                    </div>
                    {results.tickers.map(item => (
                      <div key={item.id} className="px-4 py-3 hover:bg-[#ffe2d1] cursor-pointer transition-colors flex items-center gap-3">
                        <MediaPreview type="image" url={item.image} />
                        <div className="flex-1">
                          <div className="text-[14px] text-[#8c0200]" style={{ fontWeight: 500 }}>{item.ticker}</div>
                          <div className="text-[12px] text-[#6d6153] opacity-70">{item.name}</div>
                        </div>
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
                      </div>
                    ))}
                  </div>
                )}

                {/* Users */}
                {results.users.length > 0 && (
                  <div>
                    <div className="px-4 py-2 text-[10px] text-[#8c0200] uppercase tracking-wider" style={{ fontWeight: 500 }}>
                      User
                    </div>
                    {results.users.map(item => (
                      <div key={item.id} className="px-4 py-3 hover:bg-[#ffe2d1] cursor-pointer transition-colors flex items-center gap-3">
                        {item.avatar ? (
                          <img src={item.avatar} alt={item.username} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                        ) : (
                          <Blockie address={item.address} />
                        )}
                        <div className="flex-1">
                          <div className="text-[14px] text-[#6d6153]" style={{ fontWeight: 500 }}>{item.username}</div>
                          <div className="text-[12px] text-[#6d6153] opacity-70">{item.name}</div>
                        </div>
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
                      </div>
                    ))}
                  </div>
                )}

                {/* Comments */}
                {results.comments.length > 0 && (
                  <div>
                    <div className="px-4 py-2 text-[10px] text-[#8c0200] uppercase tracking-wider" style={{ fontWeight: 500 }}>
                      Comment
                    </div>
                    {results.comments.map(item => (
                      <div key={item.id} className="px-4 py-3 hover:bg-[#ffe2d1] cursor-pointer transition-colors flex items-start gap-3">
                        {item.media && (
                          <MediaPreview type={item.media.type} url={item.media.url} />
                        )}
                        <div className="flex-1">
                          <div className="text-[14px] text-[#6d6153] mb-1">{item.text}</div>
                          <div className="flex gap-2 text-[12px] text-[#6d6153] opacity-70">
                            <span>{item.user}</span>
                            <span>•</span>
                            <span style={{ fontWeight: 500 }}>{item.time}</span>
                          </div>
                        </div>
                        {item.media && (
                          <div className="flex items-center gap-[2px] rounded-[1px]">
                            <div className="relative shrink-0 size-[16px]">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                                <g id="icon">
                                  <path d={heartSvgPaths.paffe900} id="icon_2" stroke="var(--stroke-0, #8C0200)" strokeWidth="1.5" />
                                </g>
                              </svg>
                            </div>
                            <p className="text-[12px] text-[#8c0200]" style={{ fontWeight: 500 }}>{item.media.tips.toLocaleString()}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Media Names */}
                {results.mediaNames.length > 0 && (
                  <div>
                    <div className="px-4 py-2 text-[10px] text-[#8c0200] uppercase tracking-wider" style={{ fontWeight: 500 }}>
                      Media Name
                    </div>
                    {results.mediaNames.map(item => (
                      <div key={item.id} className="px-4 py-3 hover:bg-[#ffe2d1] cursor-pointer transition-colors flex items-center gap-3">
                        <MediaPreview type={item.type} url={item.url} />
                        <div className="flex-1">
                          <div className="text-[14px] text-[#6d6153]" style={{ fontWeight: 500 }}>{item.name}</div>
                          <div className="text-[12px] text-[#6d6153] opacity-70">{item.type}</div>
                        </div>
                        <div className="flex items-center gap-[2px] rounded-[1px]">
                          <div className="relative shrink-0 size-[16px]">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                              <g id="icon">
                                <path d={heartSvgPaths.paffe900} id="icon_2" stroke="var(--stroke-0, #8C0200)" strokeWidth="1.5" />
                              </g>
                            </svg>
                          </div>
                          <p className="text-[12px] text-[#8c0200]" style={{ fontWeight: 500 }}>{item.tips.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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

interface SearchProps {
  isExpanded: boolean;
  onFocus: () => void;
  onBlur: () => void;
}

function Search({ isExpanded, onFocus, onBlur }: SearchProps) {
  return (
    <motion.div 
      className="content-stretch flex items-start relative shrink-0 overflow-visible" 
      data-name="search"
      animate={{
        width: isExpanded ? '100%' : 'auto',
        flex: isExpanded ? '1 1 0%' : '0 0 auto',
      }}
      transition={{ 
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      }}
      style={{ width: isExpanded ? '100%' : 'auto' }}
    >
      {!isExpanded ? (
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.15, ease: [0.4, 0, 1, 1] }}
          onClick={onFocus}
          className="cursor-pointer"
        >
          <ModalHead />
        </motion.div>
      ) : (
        <motion.div 
          className="w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          <EnhancedSearchBar onClose={onBlur} />
        </motion.div>
      )}
    </motion.div>
  );
}

interface Container2Props {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

function Container2({ activeFilter, onFilterChange }: Container2Props) {
  const [isSearchExpanded, setIsSearchExpanded] = React.useState(false);

  return (
    <div className="basis-0 bg-[#ffe2d1] grow w-full max-w-[768px] min-h-px min-w-px relative shrink-0 overflow-visible" data-name="container">
      <div className="content-stretch flex flex-row items-center max-w-inherit overflow-visible relative rounded-[inherit] w-full">
        <AnimatePresence>
          {!isSearchExpanded && (
            <motion.div 
              className="basis-0 flex flex-row grow items-center self-stretch shrink-0 w-full sm:w-auto"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ 
                duration: 0.15,
                ease: [0.4, 0, 1, 1]
              }}
            >
              <TabSelector activeTab={activeFilter} onTabChange={onFilterChange} />
            </motion.div>
          )}
        </AnimatePresence>
        <Search 
          isExpanded={isSearchExpanded} 
          onFocus={() => setIsSearchExpanded(true)}
          onBlur={() => setIsSearchExpanded(false)}
        />
      </div>
      <div aria-hidden="true" className="absolute border border-[#ffd2b5] border-solid inset-[-0.5px] pointer-events-none" />
    </div>
  );
}

interface FilterbarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

function Filterbar({ activeFilter, onFilterChange }: FilterbarProps) {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full overflow-visible" data-name="filterbar">
      <Container2 activeFilter={activeFilter} onFilterChange={onFilterChange} />
    </div>
  );
}

interface FeedProps {
  displayedThreads: typeof THREAD_DATA;
  newThreadsQueue: typeof THREAD_DATA;
  isLoadingNew: boolean;
  isLoadingMore: boolean;
}

function Feed({ displayedThreads, newThreadsQueue, isLoadingNew, isLoadingMore }: FeedProps) {
  return (
    <div className="w-screen sm:w-full max-w-[768px] relative shrink-0" data-name="feed">
      <div className="flex flex-col">
        {isLoadingNew && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {newThreadsQueue.map((_, index) => (
              <div key={`loading-${index}`} className="border-b border-[#ffd2b5]">
                <LoadingStateSkeleton />
              </div>
            ))}
          </motion.div>
        )}
        <AnimatePresence>
          {displayedThreads.map((threadData, index) => (
            <motion.div
              key={threadData.id}
              initial={index < newThreadsQueue.length && !isLoadingNew ? { opacity: 0, y: -20 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index < newThreadsQueue.length ? index * 0.1 : 0 }}
            >
              <ThreadVariation data={threadData} />
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoadingMore && (
          <>
            {[...Array(3)].map((_, index) => (
              <div key={`loading-more-${index}`}>
                <LoadingStateSkeleton />
              </div>
            ))}
          </>
        )}
      </div>
      <div aria-hidden="true" className="absolute border border-[#ffd2b5] border-solid inset-[-0.5px] pointer-events-none hidden sm:block" />
    </div>
  );
}

interface FeedContainerProps {
  activeFilter: string;
}

function FeedContainer({ activeFilter }: FeedContainerProps) {
  const [displayedThreads, setDisplayedThreads] = React.useState(THREAD_DATA);
  const [newThreadsQueue, setNewThreadsQueue] = React.useState<typeof THREAD_DATA>([]);
  const [isLoadingNew, setIsLoadingNew] = React.useState(false);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);
  const bottomRef = React.useRef<HTMLDivElement>(null);
  const lastScrollY = React.useRef(0);
  const threadIdCounter = React.useRef(10000); // Start from 10000 to avoid conflicts with existing IDs

  // Filter threads based on active tab
  const filterThreads = (threads: typeof THREAD_DATA) => {
    if (activeFilter === 'All') return threads;
    return threads.filter(thread => {
      const category = thread.category.toLowerCase();
      const filter = activeFilter.toLowerCase();
      // Remove 's' from filter if present (Memes -> Meme, Dares -> Dare, Questions -> Question)
      const normalizedFilter = filter.endsWith('s') ? filter.slice(0, -1) : filter;
      return category === normalizedFilter;
    });
  };

  const filteredDisplayedThreads = filterThreads(displayedThreads);
  const filteredNewThreadsQueue = filterThreads(newThreadsQueue);

  // Simulate new threads appearing every 15 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      // Pick a random thread from THREAD_DATA to simulate new content
      const randomThread = THREAD_DATA[Math.floor(Math.random() * THREAD_DATA.length)];
      
      // 40% chance of no comments, 60% chance of having comments
      const shouldHaveComments = Math.random() > 0.4;
      
      // Generate truly unique ID using counter
      threadIdCounter.current += 1;
      
      const newThread = {
        ...randomThread,
        id: threadIdCounter.current, // Use counter for unique ID
        timeAgo: 'Just now',
        createdAt: Date.now(), // Track when this thread was created
        comments: shouldHaveComments ? randomThread.comments : [], // Sometimes no comments
        commentsCount: shouldHaveComments ? randomThread.commentsCount : 0, // Match comments array
        mediaCount: shouldHaveComments ? randomThread.mediaCount : 0,
        marketCapValue: shouldHaveComments ? randomThread.marketCapValue : Math.floor(Math.random() * 5000) + 1000, // Fresh threads start low
      };
      
      setNewThreadsQueue(prev => [...prev, newThread]);
    }, 15000); // Every 15 seconds

    return () => clearInterval(interval);
  }, []);

  // Auto-load new entries when scrolling up
  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingUp = currentScrollY < lastScrollY.current;
      
      // If scrolling up and there are new entries, auto-load them
      if (scrollingUp && newThreadsQueue.length > 0 && !isLoadingNew) {
        handleViewNewEntries();
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [newThreadsQueue.length, isLoadingNew]);

  // Infinite scroll - load more when reaching bottom
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore) {
          loadMoreThreads();
        }
      },
      { threshold: 0.1 }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    };
  }, [isLoadingMore]);

  const loadMoreThreads = () => {
    setIsLoadingMore(true);
    
    // Show loading state for 1 second, then add more threads
    setTimeout(() => {
      const moreThreads = THREAD_DATA.map(thread => {
        threadIdCounter.current += 1;
        return {
          ...thread,
          id: threadIdCounter.current,
          timeAgo: `${Math.floor(Math.random() * 12) + 1}h`,
        };
      });
      
      setDisplayedThreads(prev => [...prev, ...moreThreads]);
      setIsLoadingMore(false);
    }, 1000);
  };

  const handleViewNewEntries = () => {
    setIsLoadingNew(true);
    
    // Show loading state for 1 second
    setTimeout(() => {
      setDisplayedThreads(prev => [...newThreadsQueue, ...prev]);
      setNewThreadsQueue([]);
      setIsLoadingNew(false);
    }, 1000);
  };

  return (
    <div className="w-full relative shrink-0" data-name="feed-container">
      <div className="flex flex-col items-center">
        <div className="box-border content-stretch flex flex-col items-center px-[20px] py-0 relative w-full">
          <AnimatePresence>
            {filteredNewThreadsQueue.length > 0 && !isLoadingNew && (
              <NewEntriesButton 
                count={filteredNewThreadsQueue.length} 
                onClick={handleViewNewEntries}
              />
            )}
          </AnimatePresence>
        </div>
        <div className="box-border content-stretch flex flex-col gap-[20px] items-center px-[20px] py-0 relative w-full pb-[68px]">
          <Feed 
            displayedThreads={filteredDisplayedThreads}
            newThreadsQueue={filteredNewThreadsQueue}
            isLoadingNew={isLoadingNew}
            isLoadingMore={isLoadingMore}
          />
          <div ref={bottomRef} className="h-px w-full" />
        </div>
      </div>
    </div>
  );
}

interface BodyProps {
  activeFilter: string;
}

function Body({ activeFilter }: BodyProps) {
  return (
    <div className="content-stretch flex flex-col items-center w-full relative shrink-0" data-name="body">
      <FeedContainer activeFilter={activeFilter} />
    </div>
  );
}

interface Body1Props {
  activeFilter: string;
}

function Body1({ activeFilter }: Body1Props) {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="body">
      <Body activeFilter={activeFilter} />
    </div>
  );
}

function Button6() {
  return (
    <div className="box-border content-stretch flex gap-[2px] items-center p-[2px] relative rounded-[1px] shrink-0" data-name="button">
      <p className="font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#6d6153] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">[ Settings ]</p>
    </div>
  );
}

function Button7() {
  return (
    <div className="box-border content-stretch flex gap-[2px] items-center p-[2px] relative rounded-[1px] shrink-0" data-name="button">
      <p className="font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#6d6153] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">[ Legal ]</p>
    </div>
  );
}

function Button8() {
  return (
    <div className="box-border content-stretch flex gap-[2px] items-center p-[2px] relative rounded-[1px] shrink-0" data-name="button">
      <p className="font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#6d6153] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">[ Contact ]</p>
    </div>
  );
}

function Button9() {
  return (
    <div className="box-border content-stretch flex gap-[2px] items-center p-[2px] relative rounded-[1px] shrink-0" data-name="button">
      <p className="font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#6d6153] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">[ Docs ]</p>
    </div>
  );
}

function Frame1597879989() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 flex-wrap sm:flex-nowrap" data-name="footer-links">
      <Button6 />
      <Button7 />
      <Button8 />
      <Button9 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="icon">
          <path d={svgPaths.p29a61180} fill="var(--fill-0, #0D0B08)" id="icon_2" />
        </g>
      </svg>
    </div>
  );
}

function Button10() {
  return (
    <div className="box-border content-stretch flex gap-[2px] items-center p-[2px] relative rounded-[1px] shrink-0" data-name="button">
      <Icon10 />
    </div>
  );
}

function SecondaryLinks() {
  return (
    <div className="basis-0 content-stretch flex flex-row grow items-center justify-between min-h-px min-w-px relative shrink-0" data-name="secondary-links">
      <Frame1597879989 />
      <Button10 />
    </div>
  );
}

function Container3() {
  return (
    <div className="w-full max-w-[768px] relative shrink-0" data-name="container">
      <div className="flex flex-row items-center max-w-inherit size-full">
        <div className="box-border content-stretch flex gap-[40px] items-center max-w-inherit px-[12px] py-[16px] relative w-full">
          <SecondaryLinks />
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="fixed bottom-0 left-0 right-0 w-full bg-[#fafafa] z-50" data-name="footer">
      <div className="content-stretch flex flex-col items-center overflow-clip relative rounded-[inherit] w-full">
        <Container3 />
      </div>
      <div aria-hidden="true" className="absolute border-[#ffd2b5] border-[1px_0px_0px] border-solid bottom-0 left-0 pointer-events-none right-0 top-[-0.5px]" />
    </div>
  );
}

export default function App() {
  const [activeFilter, setActiveFilter] = React.useState<string>('All');

  return (
    <div className="content-stretch flex flex-col items-start relative min-h-screen w-full overflow-x-hidden" data-name="layout">
      <div className="bg-gradient-to-b from-[#ffd2b5] to-[#fafafa] w-full">
        <NavBar />
      </div>
      <div className="bg-[#fafafa] w-full flex-1">
        <Filterbar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        <Body1 activeFilter={activeFilter} />
      </div>
      <Footer />
    </div>
  );
}
