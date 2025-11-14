import { useState, useRef, useEffect } from "react";
import confetti from "canvas-confetti";
import svgPaths from "./svg-uzbk5bsnxw";
import svgPathsMenu from "./svg-x41vj2g193";
import contextMenuPaths from "./svg-ga3tmpwmuj";
import imgImage from "../assets/faaaca905f9885a2f74ea07b2729708f9fddcba3.png";
import imgMedia from "../assets/7fe85ae0a00fabb4b701407c9c6d3fc9ecda1774.png";
import imgImage1 from "../assets/439247b1ebb4193e9686845f7aaaf7a95abc5bfe.png";
import imgMedia1 from "../assets/2ba7e2a4752254b08c18a4a46b62e56667cd2656.png";
import imgImage2 from "../assets/5a7f458a9243802df3cff0a20e28b04ed74978b1.png";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import VidProgress1 from "./VidProgress";
import CommentInput from "./CommentInput";
import AnimatedNumber from "../components/AnimatedNumber";

// Full-screen modal for expanded media view
function FullScreenMediaModal({ 
  isOpen, 
  onClose, 
  src, 
  type = 'image',
  aspectRatio = '1:1',
  threadUsername = 'nath4an',
  commentUsername = 'stevie'
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  src: string; 
  type?: 'image' | 'video' | 'gif';
  aspectRatio?: '1:1' | 'horizontal' | 'vertical';
  threadUsername?: string;
  commentUsername?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoProgress, setVideoProgress] = useState(0);
  
  useEffect(() => {
    if (isOpen && videoRef.current && (type === 'video' || type === 'gif')) {
      videoRef.current.play();
    }
  }, [isOpen, type]);
  
  const handleVideoTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setVideoProgress(progress);
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center"
      onClick={onClose}
    >
      {/* Breadcrumb / Thread context */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-[4px] px-3 py-2">
        <p className="font-['Neue_Haas_Grotesk_Display:Medium',_sans-serif] text-[#8c0200] text-[12px] tracking-[0.24px] whitespace-pre">
          {threadUsername}
        </p>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M4.5 2.5L8 6L4.5 9.5" stroke="#6d6153" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <p className="font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] text-[#6d6153] text-[12px] tracking-[0.24px] whitespace-pre">
          {commentUsername}
        </p>
      </div>
      
      {/* Close button */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-white bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 transition-colors"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
      
      {/* Media container */}
      <div 
        className="relative"
        onClick={(e) => e.stopPropagation()}
      >
        {type === 'image' ? (
          <img 
            src={src} 
            alt="" 
            className="max-w-full max-h-[90vh] object-contain rounded-[2px]"
          />
        ) : (
          <div className="relative">
            <video
              ref={videoRef}
              src={src}
              loop
              muted
              playsInline
              onTimeUpdate={handleVideoTimeUpdate}
              className="max-w-full max-h-[90vh] object-contain rounded-[2px]"
            />
            {type === 'video' && (
              <div className="absolute bottom-0 left-0 right-0 h-[4px]">
                <div className="relative h-full w-full bg-[#000924] bg-opacity-70">
                  <div 
                    className="h-full bg-gradient-to-r from-[#0040a1] via-[#187bf5] to-[#97d6ff]"
                    style={{ width: `${videoProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Clickable and expandable comment media component
function CommentMedia({ 
  src, 
  type = 'image',
  aspectRatio = '1:1',
  threadUsername = 'nath4an',
  commentUsername = 'stevie'
}: { 
  src: string; 
  type?: 'image' | 'video' | 'gif';
  aspectRatio?: '1:1' | 'horizontal' | 'vertical';
  threadUsername?: string;
  commentUsername?: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoProgress, setVideoProgress] = useState(0);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const isLongPress = useRef(false);
  
  useEffect(() => {
    if (videoRef.current && (type === 'video' || type === 'gif')) {
      videoRef.current.play();
    }
  }, [type]);
  
  const handleMouseDown = () => {
    isLongPress.current = false;
    longPressTimer.current = setTimeout(() => {
      isLongPress.current = true;
      setShowFullscreen(true);
    }, 500); // 500ms for long press
  };
  
  const handleMouseUp = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
    
    // Only toggle if it wasn't a long press
    if (!isLongPress.current) {
      setIsExpanded(!isExpanded);
    }
  };
  
  const handleMouseLeave = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };
  
  const handleCloseFullscreen = () => {
    setShowFullscreen(false);
  };
  
  const handleVideoTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setVideoProgress(progress);
    }
  };
  
  const sizeClasses = isExpanded ? 'size-[120px]' : 'size-[56px]';
  
  return (
    <>
      <div 
        className={`relative rounded-[2px] shrink-0 cursor-pointer hover:opacity-90 transition-all ${sizeClasses}`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        data-name="media"
      >
        {type === 'image' ? (
          <img 
            alt="" 
            className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[2px] size-full" 
            src={src} 
          />
        ) : (
          <div className="relative size-full">
            <video
              ref={videoRef}
              src={src}
              loop
              muted
              playsInline
              onTimeUpdate={handleVideoTimeUpdate}
              className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[2px] size-full"
            />
            {type === 'video' && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px]">
                <div className="relative h-full w-full bg-[#000924] bg-opacity-50">
                  <div 
                    className="h-full bg-gradient-to-r from-[#0040a1] via-[#187bf5] to-[#97d6ff]"
                    style={{ width: `${videoProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      <FullScreenMediaModal
        isOpen={showFullscreen}
        onClose={handleCloseFullscreen}
        src={src}
        type={type}
        aspectRatio={aspectRatio}
        threadUsername={threadUsername}
        commentUsername={commentUsername}
      />
    </>
  );
}

function Avatar() {
  return (
    <div className="box-border content-stretch flex items-center p-[2px] relative shrink-0 w-[20px]" data-name="avatar">
      <div className="pointer-events-none relative rounded-[80px] shrink-0 size-[16px]" data-name="image">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[80px] size-full" src={imgImage} />
        <div aria-hidden="true" className="absolute border border-[#ffe2d1] border-solid inset-[-1px] rounded-[81px]" />
      </div>
    </div>
  );
}

function User({ username = 'nath4an' }: { username?: string }) {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0 cursor-pointer p-[2px] hover:bg-[#ffd2b5] hover:bg-opacity-30 rounded-[2px] transition-colors" data-name="user">
      <Avatar />
      <p className="font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#8c0200] text-[14px] text-nowrap tracking-[0.28px] whitespace-pre">{username}</p>
    </div>
  );
}

function Pill({ category = 'Meme' }: { category?: string }) {
  // Define colors based on category
  const getPillColors = () => {
    switch (category.toLowerCase()) {
      case 'dare':
        return {
          bg: 'bg-[#bdebff]',
          hover: 'hover:bg-[#a8e3ff]',
          text: 'text-[#002672]'
        };
      case 'question':
        return {
          bg: 'bg-[#ffd9f8]',
          hover: 'hover:bg-[#ffccf3]',
          text: 'text-[#471a3e]'
        };
      case 'meme':
      default:
        return {
          bg: 'bg-[#ffd2b5]',
          hover: 'hover:bg-[#ffc5a0]',
          text: 'text-[#8c0200]'
        };
    }
  };
  
  const colors = getPillColors();
  
  return (
    <div className={`${colors.bg} ${colors.hover} box-border content-stretch flex items-center justify-center px-[6px] py-[2px] relative rounded-[100px] shrink-0 cursor-pointer transition-colors`} data-name="pill">
      <p className={`font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] leading-[1.2] not-italic relative shrink-0 ${colors.text} text-[12px] text-nowrap tracking-[0.24px] whitespace-pre`}>{category}</p>
    </div>
  );
}

function UserPost({ username = 'nath4an', timeAgo = '2h', timestamp = '22 Oct 2025, 13:32', category = 'Meme' }: { username?: string; timeAgo?: string; timestamp?: string; category?: string }) {
  return (
    <div className="content-stretch flex gap-[5px] items-center relative shrink-0" data-name="user-post">
      <User username={username} />
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <p className="font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#8b7e6f] text-[14px] text-nowrap tracking-[0.28px] whitespace-pre cursor-default">{timeAgo}</p>
          </TooltipTrigger>
          <TooltipContent side="top" className="bg-neutral-50 border-0 rounded-[8px] p-[8px] shadow-[0px_1px_1px_0px_rgba(139,126,111,0.3),0px_2px_4px_0px_rgba(199,188,175,0.3),0px_4px_8px_0px_rgba(220,210,200,0.3)]">
            <p className="font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] leading-[1.2] not-italic text-[#6d6153] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">{timestamp}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Pill category={category} />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="icon">
          <path d={svgPaths.p3943ff00} id="icon_2" stroke="var(--stroke-0, #0D0B08)" strokeLinecap="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="box-border content-stretch flex gap-[2px] items-center p-[2px] relative rounded-[1px] shrink-0 cursor-pointer hover:bg-[#ffe2d1] transition-colors" data-name="button">
          <Icon1 />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white border border-[#ffd2b5] rounded-[4px] shadow-lg min-w-[140px] p-0">
        <DropdownMenuItem className="cursor-pointer px-[8px] py-[4px] hover:bg-[#ffe2d1] focus:bg-[#ffe2d1] rounded-none h-[28px] flex items-center gap-[4px]">
          <div className="relative shrink-0 size-[14px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
              <g id="icon">
                <path d={contextMenuPaths.p107e4a00} id="icon_2" stroke="var(--stroke-0, #50463B)" strokeLinecap="square" />
              </g>
            </svg>
          </div>
          <p className="font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#6d6153] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">Reply</p>
        </DropdownMenuItem>
        <div className="h-px bg-[#dcd2c8] mx-[8px]" />
        <DropdownMenuItem className="cursor-pointer px-[8px] py-[4px] hover:bg-[#ffe2d1] focus:bg-[#ffe2d1] rounded-none h-[28px] flex items-center gap-[4px]">
          <div className="relative shrink-0 size-[14px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
              <g id="icon">
                <path d={contextMenuPaths.p954d000} id="icon_2" stroke="var(--stroke-0, #50463B)" strokeLinecap="square" />
              </g>
            </svg>
          </div>
          <p className="font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#6d6153] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">Share</p>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer px-[8px] py-[4px] hover:bg-[#ffe2d1] focus:bg-[#ffe2d1] rounded-none h-[28px] flex items-center gap-[4px]">
          <div className="relative shrink-0 size-[14px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
              <g id="icon">
                <path d={contextMenuPaths.p361bcd80} fill="var(--fill-0, #50463B)" id="icon_2" />
              </g>
            </svg>
          </div>
          <p className="font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#6d6153] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">View on X</p>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer px-[8px] py-[4px] hover:bg-[#ffe2d1] focus:bg-[#ffe2d1] rounded-none h-[28px] flex items-center gap-[4px]">
          <div className="relative shrink-0 size-[14px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
              <g clipPath="url(#clip0_55_1950)" id="icon">
                <path d={contextMenuPaths.p19498c00} id="icon_2" stroke="var(--stroke-0, #50463B)" strokeLinecap="round" />
              </g>
              <defs>
                <clipPath id="clip0_55_1950">
                  <rect fill="white" height="14" width="14" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <p className="font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#6d6153] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">Star</p>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer px-[8px] py-[4px] hover:bg-[#ffe2d1] focus:bg-[#ffe2d1] rounded-none h-[28px] flex items-center gap-[4px]">
          <div className="relative shrink-0 size-[14px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
              <g id="icon">
                <path d={contextMenuPaths.p3e770f00} id="icon_2" stroke="var(--stroke-0, #50463B)" strokeLinecap="square" />
              </g>
            </svg>
          </div>
          <p className="font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#6d6153] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">Hide</p>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer px-[8px] py-[4px] hover:bg-[#ffe2d1] focus:bg-[#ffe2d1] rounded-none h-[28px] flex items-center gap-[4px]">
          <div className="relative shrink-0 size-[14px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
              <g id="icon">
                <path d={contextMenuPaths.p10a57900} id="icon_2" stroke="var(--stroke-0, #50463B)" strokeLinecap="square" />
              </g>
            </svg>
          </div>
          <p className="font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#6d6153] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">Report</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Actions() {
  return (
    <div className="content-stretch flex gap-[8.8px] h-[22px] items-center relative rounded-[2.2px] shrink-0" data-name="actions">
      <Button />
    </div>
  );
}

function UserActions({ username = 'nath4an', timeAgo = '2h', timestamp = '22 Oct 2025, 13:32', category = 'Meme' }: { username?: string; timeAgo?: string; timestamp?: string; category?: string }) {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="user-actions">
      <UserPost username={username} timeAgo={timeAgo} timestamp={timestamp} category={category} />
      <Actions />
    </div>
  );
}

function Frame1597879933({ tokenName = 'Thinck boutet', ticker = '$THINCK' }: { tokenName?: string; ticker?: string }) {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 text-[20px] text-nowrap whitespace-pre">
      <p className="font-['Neue_Haas_Grotesk_Display:Medium',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#342c24] tracking-[-0.4px] cursor-pointer hover:text-[#8c0200] transition-colors">{tokenName}</p>
      <p className="font-['Geist_Mono:Regular',_sans-serif] font-normal leading-[24px] relative shrink-0 text-[#6d6153] uppercase cursor-pointer hover:text-[#8c0200] transition-colors">{ticker}</p>
    </div>
  );
}

function Header({ tokenName = 'Thinck boutet', ticker = '$THINCK' }: { tokenName?: string; ticker?: string }) {
  return (
    <div className="content-stretch flex gap-[8px] items-end relative shrink-0 w-full" data-name="header">
      <Frame1597879933 tokenName={tokenName} ticker={ticker} />
    </div>
  );
}

function TopLevel({ username = 'nath4an', timeAgo = '2h', timestamp = '22 Oct 2025, 13:32', category = 'Meme', tokenName = 'Thinck boutet', ticker = '$THINCK' }: { username?: string; timeAgo?: string; timestamp?: string; category?: string; tokenName?: string; ticker?: string }) {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="top-level">
      <UserActions username={username} timeAgo={timeAgo} timestamp={timestamp} category={category} />
      <Header tokenName={tokenName} ticker={ticker} />
    </div>
  );
}

function Media({ isGraduated = false, mainMediaUrl }: { isGraduated?: boolean; mainMediaUrl?: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div 
      className={`box-border content-stretch flex gap-[12px] items-start justify-end overflow-clip p-[12px] relative rounded-[4px] shrink-0 cursor-pointer transition-all duration-200 ${isExpanded ? 'size-[400px]' : 'size-[240px]'}`}
      data-name="media"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[4px] size-full" src={mainMediaUrl || imgMedia} />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_18_4266)" id="icon">
          <path d={svgPaths.p24c5700} id="icon_2" stroke="var(--stroke-0, #6D6153)" strokeLinecap="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_18_4266">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button1({ commentsCount = 0, mediaCount = 0 }: { commentsCount?: number; mediaCount?: number }) {
  const formatNumber = (num: number) => {
    if (num === 0) return '0';
    if (num >= 1000) {
      return (num / 1000).toFixed(2).replace(/\.?0+$/, '') + 'K';
    }
    return num.toLocaleString();
  };

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="box-border content-stretch flex gap-[2px] items-center p-[2px] relative rounded-[1px] shrink-0 cursor-pointer hover:brightness-110 active:brightness-95 focus:outline-none focus:ring-1 focus:ring-[#6d6153] focus:ring-opacity-20 transition-all" data-name="button" tabIndex={0}>
            <Icon2 />
            <AnimatedNumber 
              value={formatNumber(commentsCount)} 
              className="font-['Neue_Haas_Grotesk_Display:Medium',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#6d6153] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre"
            />
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="bg-neutral-50 border-0 rounded-[8px] p-[8px] shadow-[0px_1px_1px_0px_rgba(139,126,111,0.3),0px_2px_4px_0px_rgba(199,188,175,0.3),0px_4px_8px_0px_rgba(220,210,200,0.3)]">
          <div className="flex flex-col gap-[2px]">
            <p className="font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] leading-[1.2] not-italic text-[#6d6153] text-[12px] tracking-[0.24px] whitespace-pre">{commentsCount.toLocaleString()} comment{commentsCount !== 1 ? 's' : ''}</p>
            {mediaCount > 0 && (
              <p className="font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] leading-[1.2] not-italic text-[#6d6153] text-[12px] tracking-[0.24px] whitespace-pre">{mediaCount.toLocaleString()} media attached</p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="icon">
          <path d={svgPaths.p7124f80} id="icon_2" stroke="var(--stroke-0, #6D6153)" strokeLinecap="square" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button2({ marketCap = 0, change24hr = 0, changePercent = 0 }: { marketCap?: number; change24hr?: number; changePercent?: number }) {
  const formatCurrency = (num: number) => {
    if (num === 0) return '$0';
    if (num >= 1000000) {
      return '$' + (num / 1000000).toFixed(2).replace(/\.?0+$/, '') + 'M';
    }
    if (num >= 1000) {
      return '$' + (num / 1000).toFixed(2).replace(/\.?0+$/, '') + 'K';
    }
    return '$' + num.toFixed(2);
  };

  const formatChange = (num: number) => {
    if (num === 0) return '$0';
    const sign = num >= 0 ? '+' : '';
    if (Math.abs(num) >= 1000) {
      return sign + '$' + (num / 1000).toFixed(1) + 'K';
    }
    return sign + '$' + num.toFixed(2);
  };

  const changeColor = change24hr >= 0 ? '#14674A' : '#8c0200';

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="box-border content-stretch flex gap-[2px] items-center p-[2px] relative rounded-[1px] shrink-0 cursor-pointer hover:brightness-110 active:brightness-95 focus:outline-none focus:ring-1 focus:ring-[#6d6153] focus:ring-opacity-20 transition-all" data-name="button" tabIndex={0}>
            <Icon3 />
            <AnimatedNumber 
              value={formatCurrency(marketCap)} 
              className="font-['Neue_Haas_Grotesk_Display:Medium',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#6d6153] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre"
            />
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="bg-neutral-50 border-0 rounded-[8px] p-[8px] shadow-[0px_1px_1px_0px_rgba(139,126,111,0.3),0px_2px_4px_0px_rgba(199,188,175,0.3),0px_4px_8px_0px_rgba(220,210,200,0.3)]">
          <div className="flex flex-col gap-[2px]">
            <p className="font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] leading-[1.2] not-italic text-[#6d6153] text-[12px] tracking-[0.24px] whitespace-pre">Market Cap</p>
            <p className="font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] leading-[1.2] not-italic text-[12px] tracking-[0.24px] whitespace-pre">
              <span className="text-[#6d6153]">{formatCurrency(marketCap)}</span>
              {(change24hr !== 0 || changePercent !== 0) && (
                <span style={{ color: changeColor }}> {formatChange(change24hr)} ({change24hr >= 0 ? '+' : ''}{changePercent.toFixed(2)}%) 24hr</span>
              )}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="icon">
          <path d={svgPaths.p34c8bb00} id="icon_2" stroke="var(--stroke-0, #6D6153)" strokeLinecap="square" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button3({ isGraduated = false, percentage = 56 }: { isGraduated?: boolean; percentage?: number }) {
  const displayValue = isGraduated ? '100%' : `${percentage}%`;
  
  return (
    <div className="box-border content-stretch flex gap-[2px] items-center p-[2px] relative rounded-[1px] shrink-0" data-name="button">
      <Icon4 />
      <AnimatedNumber 
        value={displayValue}
        className="font-['Neue_Haas_Grotesk_Display:Medium',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#6d6153] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre"
      />
    </div>
  );
}

function Frame427319190({ isGraduated = false }: { isGraduated?: boolean }) {
  if (isGraduated) {
    // Create fire-colored sparkle data with varied properties
    const sparkles = [
      // Bright yellow-white sparkles (hottest flames)
      ...Array(12).fill(null).map((_, i) => ({
        color: '#fffacd',
        size: Math.random() * 2 + 1,
        left: Math.random() * 100,
        top: Math.random() * 100,
        blur: Math.random() * 1,
        opacity: 0.8 + Math.random() * 0.2,
        delay: Math.random() * 2,
        duration: 1.2 + Math.random() * 0.8
      })),
      // Orange flame sparkles
      ...Array(10).fill(null).map((_, i) => ({
        color: '#ff6b35',
        size: Math.random() * 1.5 + 0.5,
        left: Math.random() * 100,
        top: Math.random() * 100,
        blur: Math.random() * 2,
        opacity: 0.6 + Math.random() * 0.3,
        delay: Math.random() * 2,
        duration: 1.5 + Math.random() * 1
      })),
      // Deep red sparkles
      ...Array(8).fill(null).map((_, i) => ({
        color: '#d32f2f',
        size: Math.random() * 1.2 + 0.8,
        left: Math.random() * 100,
        top: Math.random() * 100,
        blur: Math.random() * 1.5,
        opacity: 0.5 + Math.random() * 0.4,
        delay: Math.random() * 2,
        duration: 1.3 + Math.random() * 0.9
      })),
      // Bright orange highlights
      ...Array(6).fill(null).map((_, i) => ({
        color: '#ff9800',
        size: Math.random() * 1 + 0.5,
        left: Math.random() * 100,
        top: Math.random() * 100,
        blur: Math.random() * 2.5,
        opacity: 0.4 + Math.random() * 0.5,
        delay: Math.random() * 2,
        duration: 1.8 + Math.random() * 0.7
      }))
    ];
    
    return (
      <div className="relative h-full w-full rounded-[8px] overflow-hidden">
        {/* Base fire gradient - red to orange to yellow */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#c62828] via-[#ff6b35] to-[#ffb300]" />
        
        {/* Moving shimmer layer - brighter */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 15%, rgba(255, 255, 255, 0.9) 30%, transparent 50%, rgba(255, 255, 255, 0.6) 70%, transparent 85%)',
            backgroundSize: '200% 100%',
            animation: 'sparkleMove 2s linear infinite'
          }}
        />
        
        {/* Many sparkle particles with varied properties */}
        <div className="absolute inset-0">
          {sparkles.map((sparkle, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${sparkle.size}px`,
                height: `${sparkle.size}px`,
                backgroundColor: sparkle.color,
                left: `${sparkle.left}%`,
                top: `${sparkle.top}%`,
                filter: `blur(${sparkle.blur}px)`,
                animation: `sparkle ${sparkle.duration}s ease-in-out infinite`,
                animationDelay: `${sparkle.delay}s`,
                opacity: 0,
                boxShadow: `0 0 ${sparkle.size * 2}px ${sparkle.size * 0.5}px ${sparkle.color}`
              }}
            />
          ))}
        </div>
        
        <style>{`
          @keyframes sparkleMove {
            0% { background-position: 0% 50%; }
            100% { background-position: 200% 50%; }
          }
          
          @keyframes sparkle {
            0%, 100% { 
              opacity: 0;
              transform: scale(0);
            }
            50% { 
              opacity: 1;
              transform: scale(1.8);
            }
          }
        `}</style>
      </div>
    );
  }
  return <div className="bg-gradient-to-r from-[#0d3e2d] h-full rounded-[8px] to-[#a6f2d5] via-50% via-[#41e4a7]" />;
}

function Frame1597879565({ isGraduated = false, percentage = 56 }: { isGraduated?: boolean; percentage?: number }) {
  const progressWidth = isGraduated ? '100%' : `${percentage}%`;
  const barRef = useRef<HTMLDivElement>(null);
  
  const handleFireConfetti = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isGraduated || !barRef.current) return;
    
    const rect = barRef.current.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = rect.top / window.innerHeight;
    
    const scalar = 2;
    const fire = confetti.shapeFromText({ text: "🔥", scalar });

    const defaults = {
      origin: { x, y },
      spread: 45,
      ticks: 80,
      gravity: 1.2,
      decay: 0.92,
      startVelocity: 25,
      shapes: [fire],
      scalar,
      angle: 90,
    };

    const shoot = () => {
      confetti({
        ...defaults,
        particleCount: 15,
      });

      confetti({
        ...defaults,
        particleCount: 8,
        scalar: scalar * 0.7,
      });

      confetti({
        ...defaults,
        particleCount: 10,
        scalar: scalar / 2,
        shapes: ["circle"],
      });
    };

    shoot();
  };
  
  const handleFireCannon = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isGraduated || !barRef.current) return;
    
    const rect = barRef.current.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = rect.top / window.innerHeight;
    
    const scalar = 2.5;
    const fire = confetti.shapeFromText({ text: "🔥", scalar });

    const defaults = {
      origin: { x, y },
      spread: 60,
      ticks: 100,
      gravity: 1,
      decay: 0.9,
      startVelocity: 40,
      shapes: [fire],
      scalar,
      angle: 90,
    };

    const shoot = () => {
      confetti({
        ...defaults,
        particleCount: 25,
      });

      confetti({
        ...defaults,
        particleCount: 15,
        scalar: scalar * 0.7,
      });

      confetti({
        ...defaults,
        particleCount: 20,
        scalar: scalar / 2,
        shapes: ["circle"],
      });
    };

    // More intense bursts
    setTimeout(shoot, 0);
    setTimeout(shoot, 80);
    setTimeout(shoot, 160);
    setTimeout(shoot, 240);
    setTimeout(shoot, 320);
  };
  
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div 
            ref={barRef}
            className="backdrop-blur-[1px] backdrop-filter basis-0 bg-[#eee7df] grow h-[8px] min-h-px min-w-px relative rounded-[8px] shrink-0 overflow-hidden" 
            onMouseEnter={handleFireConfetti}
            onClick={handleFireCannon}>
            <div className="size-full">
              <div className="box-border content-stretch flex flex-row h-[8px] items-center justify-start relative w-full">
                <div className="flex-none h-full" style={{ width: progressWidth }}>
                  <Frame427319190 isGraduated={isGraduated} />
                </div>
              </div>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="bg-neutral-50 border-0 rounded-[8px] p-[8px] shadow-[0px_1px_1px_0px_rgba(139,126,111,0.3),0px_2px_4px_0px_rgba(199,188,175,0.3),0px_4px_8px_0px_rgba(220,210,200,0.3)]">
          <div className="flex flex-col gap-[2px]">
            {isGraduated ? (
              <>
                <p className="font-['Neue_Haas_Grotesk_Display:Medium',_sans-serif] leading-[1.2] not-italic text-[#ff6b35] text-[12px] tracking-[0.24px] whitespace-pre">🔥 On fire</p>
                <p className="font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] leading-[1.2] not-italic text-[#6d6153] text-[12px] tracking-[0.24px] whitespace-pre">Liquidity: $69.00K</p>
              </>
            ) : (
              <>
                <p className="font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] leading-[1.2] not-italic text-[#6d6153] text-[12px] tracking-[0.24px] whitespace-pre">Graduation Progress</p>
                <p className="font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] leading-[1.2] not-italic text-[#6d6153] text-[12px] tracking-[0.24px] whitespace-pre">{percentage}% to $69K liquidity</p>
              </>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function ProgressButton({ isGraduated = false, percentage = 56 }: { isGraduated?: boolean; percentage?: number }) {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 grow cursor-pointer group hover:brightness-110 active:brightness-95 focus:outline-none focus:ring-1 focus:ring-[#6d6153] focus:ring-opacity-20 transition-all" tabIndex={0}>
      <div className="rounded-[1px]">
        <Button3 isGraduated={isGraduated} percentage={percentage} />
      </div>
      <div className="basis-0 grow flex items-center rounded-[8px]">
        <Frame1597879565 isGraduated={isGraduated} percentage={percentage} />
      </div>
    </div>
  );
}

function Reaction({ 
  isGraduated = false, 
  percentage = 56,
  commentsCount = 0,
  mediaCount = 0,
  marketCap = 0,
  change24hr = 0,
  changePercent = 0
}: { 
  isGraduated?: boolean; 
  percentage?: number;
  commentsCount?: number;
  mediaCount?: number;
  marketCap?: number;
  change24hr?: number;
  changePercent?: number;
}) {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="reaction">
      <Button1 commentsCount={commentsCount} mediaCount={mediaCount} />
      <Button2 marketCap={marketCap} change24hr={change24hr} changePercent={changePercent} />
      <ProgressButton isGraduated={isGraduated} percentage={percentage} />
    </div>
  );
}

function Media1({ 
  isGraduated = false, 
  percentage = 56, 
  mainMediaUrl,
  commentsCount = 0,
  mediaCount = 0,
  marketCap = 0,
  change24hr = 0,
  changePercent = 0
}: { 
  isGraduated?: boolean; 
  percentage?: number; 
  mainMediaUrl?: string;
  commentsCount?: number;
  mediaCount?: number;
  marketCap?: number;
  change24hr?: number;
  changePercent?: number;
}) {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-name="media">
      <Media isGraduated={isGraduated} mainMediaUrl={mainMediaUrl} />
      <Reaction 
        isGraduated={isGraduated} 
        percentage={percentage}
        commentsCount={commentsCount}
        mediaCount={mediaCount}
        marketCap={marketCap}
        change24hr={change24hr}
        changePercent={changePercent}
      />
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="icon">
          <path d={svgPaths.p2ee40c80} id="icon_2" stroke="var(--stroke-0, #0D0B08)" strokeLinecap="square" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  const [sortBy, setSortBy] = useState<'Popular' | 'Latest' | 'Active user'>('Popular');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <div className="box-border content-stretch flex gap-[2px] items-center p-[4px] relative rounded-[1px] shrink-0 cursor-pointer hover:bg-[#ffd2b5] hover:bg-opacity-30 transition-colors" data-name="button">
          <span 
            style={{
              fontFamily: '"Neue Haas Grotesk Display", system-ui, -apple-system, sans-serif',
              fontWeight: 500,
              fontSize: '12px',
              fontStyle: 'normal',
              color: '#50463b',
              letterSpacing: '0.24px',
              lineHeight: '120%',
              whiteSpace: 'pre'
            }}
          >
            {sortBy}
          </span>
          <Icon5 />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="bg-neutral-50 border border-[#dcd2c8] rounded-[2px] shadow-lg min-w-[120px] p-0">
        <DropdownMenuItem 
          onClick={() => setSortBy('Popular')}
          className="cursor-pointer px-[8px] py-[4px] h-[28px] hover:bg-[#ffe2d1] focus:bg-[#ffe2d1] flex gap-[4px] items-center rounded-none"
        >
          <div className="relative shrink-0 size-[14px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
              <path d={svgPathsMenu.p2ba59e80} stroke="#50463B" strokeWidth="1.5" />
            </svg>
          </div>
          <span style={{ fontFamily: '"Neue Haas Grotesk Display", system-ui, -apple-system, sans-serif', fontWeight: 400, fontSize: '12px', fontStyle: 'normal', color: '#6d6153', letterSpacing: '0.24px', lineHeight: '120%' }}>Popular</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setSortBy('Latest')}
          className="cursor-pointer px-[8px] py-[4px] h-[28px] hover:bg-[#ffe2d1] focus:bg-[#ffe2d1] flex gap-[4px] items-center rounded-none"
        >
          <div className="relative shrink-0 size-[14px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
              <path d={svgPathsMenu.p2fbd9260} stroke="#50463B" strokeLinecap="square" strokeWidth="1.5" />
            </svg>
          </div>
          <span style={{ fontFamily: '"Neue Haas Grotesk Display", system-ui, -apple-system, sans-serif', fontWeight: 400, fontSize: '12px', fontStyle: 'normal', color: '#6d6153', letterSpacing: '0.24px', lineHeight: '120%' }}>Latest</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setSortBy('Active user')}
          className="cursor-pointer px-[8px] py-[4px] h-[28px] hover:bg-[#ffe2d1] focus:bg-[#ffe2d1] flex gap-[4px] items-center rounded-none"
        >
          <div className="relative shrink-0 size-[14px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
              <g>
                <path clipRule="evenodd" d={svgPathsMenu.p2dcbc10} fillRule="evenodd" stroke="#50463B" strokeWidth="1.5" />
                <path clipRule="evenodd" d={svgPathsMenu.p2a516600} fillRule="evenodd" stroke="#50463B" strokeWidth="1.5" />
              </g>
            </svg>
          </div>
          <span style={{ fontFamily: '"Neue Haas Grotesk Display", system-ui, -apple-system, sans-serif', fontWeight: 400, fontSize: '12px', fontStyle: 'normal', color: '#6d6153', letterSpacing: '0.24px', lineHeight: '120%' }}>Active user</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Button5() {
  return (
    <div className="box-border content-stretch flex gap-[2px] items-center p-[4px] relative rounded-[1px] shrink-0 cursor-pointer hover:bg-[#ffd2b5] hover:bg-opacity-30 transition-colors" data-name="button">
      <span 
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
        [ Reply ]
      </span>
    </div>
  );
}

function Interactions() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="interactions">
      <Button4 />
      <Button5 />
    </div>
  );
}

function Avatar8() {
  return (
    <div className="box-border content-stretch flex items-center p-[2px] relative shrink-0 w-[20px]" data-name="avatar">
      <div className="pointer-events-none relative rounded-[80px] shrink-0 size-[16px]" data-name="image">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[80px] size-full" src={imgImage1} />
        <div aria-hidden="true" className="absolute border border-[#ffe2d1] border-solid inset-[-1px] rounded-[81px]" />
      </div>
    </div>
  );
}

function User1() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0 cursor-pointer p-[2px] hover:bg-[#ffd2b5] hover:bg-opacity-30 rounded-[2px] transition-colors" data-name="user">
      <Avatar8 />
      <p className="font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#8c0200] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">dani3l69</p>
    </div>
  );
}

function Icon6() {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative shrink-0 size-[14px] cursor-pointer" data-name="icon">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
              <g id="icon">
                <path d={svgPaths.p11f76c00} fill="var(--fill-0, #6D6153)" id="icon_2" />
              </g>
            </svg>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="bg-neutral-50 border border-[#dcd2c8] border-solid rounded-[2px] p-[8px] shadow-[0px_1px_1px_0px_#8b7e6f,0px_2px_4px_0px_#c7bcaf,0px_4px_8px_0px_#dcd2c8] w-[215px]">
          <div className="box-border content-stretch flex flex-col gap-[4px] items-start">
            <p className="font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#6d6153] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">POX, or proof of X</p>
            <p className="font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] leading-[1.2] min-w-full not-italic relative shrink-0 text-[#342c24] text-[12px] tracking-[0.24px]">Currently, only media posted on <span className="font-['Neue_Haas_Grotesk_Display:Medium',_sans-serif]">X</span> can monetize on Kumbaya, as part of our content moderation policy.</p>
            <button className="box-border content-stretch flex gap-[2px] items-center p-[2px] relative rounded-[1px] shrink-0 cursor-pointer hover:bg-[#ffd2b5] hover:bg-opacity-30 active:bg-[#ffc5a0] active:bg-opacity-50 transition-colors">
              <p className="font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#6d6153] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">[ Learn more ]</p>
            </button>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function XStamp() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0" data-name="x-stamp">
      <Icon6 />
    </div>
  );
}

function XId() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="x-id">
      <p className="font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#6d6153] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">2 h ago</p>
      <XStamp />
    </div>
  );
}

function Top() {
  return (
    <div className="basis-0 content-stretch flex gap-[6px] grow items-center min-h-px min-w-px relative shrink-0" data-name="top">
      <User1 />
      <XId />
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="icon">
          <path d={svgPaths.p3943ff00} id="icon_2" stroke="var(--stroke-0, #0D0B08)" strokeLinecap="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <div className="box-border content-stretch flex gap-[2px] items-center p-[2px] relative rounded-[1px] shrink-0 cursor-pointer hover:bg-[#ffd2b5] hover:bg-opacity-30 transition-colors" data-name="button">
          <Icon7 />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-neutral-50 border border-[#dcd2c8] rounded-[4px] shadow-lg min-w-[120px] p-0">
        <DropdownMenuItem 
          className="cursor-pointer px-[8px] py-[4px] h-[28px] hover:bg-[#ffe2d1] focus:bg-[#ffe2d1] flex gap-[4px] items-center rounded-none"
        >
          <div className="relative shrink-0 size-[14px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
              <path d="M6.99886 9.04159V2.33326M9.62386 4.6666L6.99886 2.0416L4.37386 4.6666M11.9572 8.45826V11.9583H2.04053V8.45826" stroke="#50463B" strokeLinecap="square" />
            </svg>
          </div>
          <span style={{ fontFamily: '"Neue Haas Grotesk Display", system-ui, -apple-system, sans-serif', fontWeight: 400, fontSize: '12px', fontStyle: 'normal', color: '#6d6153', letterSpacing: '0.24px', lineHeight: '120%' }}>Share</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="cursor-pointer px-[8px] py-[4px] h-[28px] hover:bg-[#ffe2d1] focus:bg-[#ffe2d1] flex gap-[4px] items-center rounded-none"
        >
          <div className="relative shrink-0 size-[14px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
              <path d="M6.99886 4.37507V3.40285M6.99886 4.37507H6.02662C4.95275 4.37507 4.08219 3.50452 4.08219 2.43063C4.08219 1.89368 4.51747 1.4584 5.05442 1.4584C6.12829 1.4584 6.99886 2.32896 6.99886 3.40285M6.99886 4.37507H7.9711C9.04496 4.37507 9.91553 3.50452 9.91553 2.43063C9.91553 1.89368 9.48024 1.4584 8.94328 1.4584C7.86943 1.4584 6.99886 2.32896 6.99886 3.40285M6.99886 4.37507H2.04053V6.7084H2.62386M6.99886 4.37507H11.9572V6.7084H11.3739M6.99886 4.37507V6.7084M2.62386 6.7084V11.9584H6.99886M2.62386 6.7084V6.41674M2.62386 6.7084H6.99886M11.3739 6.7084V11.9584H6.99886M11.3739 6.7084V6.41674M11.3739 6.7084H6.99886M6.99886 6.7084V11.9584" stroke="#50463B" />
            </svg>
          </div>
          <span style={{ fontFamily: '"Neue Haas Grotesk Display", system-ui, -apple-system, sans-serif', fontWeight: 400, fontSize: '12px', fontStyle: 'normal', color: '#6d6153', letterSpacing: '0.24px', lineHeight: '120%' }}>Gift</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="cursor-pointer px-[8px] py-[4px] h-[28px] hover:bg-[#ffe2d1] focus:bg-[#ffe2d1] flex gap-[4px] items-center rounded-none"
        >
          <div className="relative shrink-0 size-[14px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
              <g clipPath="url(#clip0_comment_menu)">
                <path d="M9.80895 2.62486H11.2942L8.03312 6.33796L11.8431 11.3749H8.85323L6.51236 8.31397L3.83247 11.3749H2.34723L5.80203 7.40346L2.1535 2.62486H5.21762L7.33247 5.42098L9.80895 2.62486ZM9.28911 10.5031H10.1125L4.78496 3.46434H3.90027L9.28911 10.5031Z" fill="#50463B" />
              </g>
              <defs>
                <clipPath id="clip0_comment_menu">
                  <rect fill="white" height="14" width="14" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <span style={{ fontFamily: '"Neue Haas Grotesk Display", system-ui, -apple-system, sans-serif', fontWeight: 400, fontSize: '12px', fontStyle: 'normal', color: '#6d6153', letterSpacing: '0.24px', lineHeight: '120%' }}>View on X</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="cursor-pointer px-[8px] py-[4px] h-[28px] hover:bg-[#ffe2d1] focus:bg-[#ffe2d1] flex gap-[4px] items-center rounded-none"
        >
          <div className="relative shrink-0 size-[14px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
              <g clipPath="url(#clip1_comment_menu)">
                <path d="M6.99886 0.875L8.76543 4.57297L12.8322 5.10845L9.85719 7.92943L10.604 11.9583L6.99886 10.0038L3.39366 11.9583L4.14053 7.92943L1.16553 5.10845L5.23231 4.57297L6.99886 0.875Z" stroke="#50463B" strokeLinecap="round" />
              </g>
              <defs>
                <clipPath id="clip1_comment_menu">
                  <rect fill="white" height="14" width="14" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <span style={{ fontFamily: '"Neue Haas Grotesk Display", system-ui, -apple-system, sans-serif', fontWeight: 400, fontSize: '12px', fontStyle: 'normal', color: '#6d6153', letterSpacing: '0.24px', lineHeight: '120%' }}>Star</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="cursor-pointer px-[8px] py-[4px] h-[28px] hover:bg-[#ffe2d1] focus:bg-[#ffe2d1] flex gap-[4px] items-center rounded-none"
        >
          <div className="relative shrink-0 size-[14px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
              <path d="M2.04053 7.64259C4.91954 10.7037 9.07815 10.7037 11.9572 7.64259M2.04053 4.3375C3.48004 2.80691 5.23946 2.04161 6.99886 2.0416C8.75831 2.04158 10.5177 2.80685 11.9572 4.33739M6.99886 10.0624V11.9583M4.66555 9.77076L3.79055 11.2187M9.18636 9.77076L10.2072 11.2187" stroke="#50463B" strokeLinecap="square" />
            </svg>
          </div>
          <span style={{ fontFamily: '"Neue Haas Grotesk Display", system-ui, -apple-system, sans-serif', fontWeight: 400, fontSize: '12px', fontStyle: 'normal', color: '#6d6153', letterSpacing: '0.24px', lineHeight: '120%' }}>Hide</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="cursor-pointer px-[8px] py-[4px] h-[28px] hover:bg-[#ffe2d1] focus:bg-[#ffe2d1] flex gap-[4px] items-center rounded-none"
        >
          <div className="relative shrink-0 size-[14px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
              <path d="M2.62329 12.5417V9.04167M2.62329 9.04167V1.45833H11.9566L9.62329 5.25L11.9566 9.04167H2.62329Z" stroke="#50463B" strokeLinecap="square" />
            </svg>
          </div>
          <span style={{ fontFamily: '"Neue Haas Grotesk Display", system-ui, -apple-system, sans-serif', fontWeight: 400, fontSize: '12px', fontStyle: 'normal', color: '#6d6153', letterSpacing: '0.24px', lineHeight: '120%' }}>Report</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function UserStv() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="user+stv">
      <Top />
      <Button7 />
    </div>
  );
}

function Media2() {
  // For demonstration: you can change type to 'video' or 'gif' and provide a video URL
  // Example: return <CommentMedia src="https://example.com/video.mp4" type="video" aspectRatio="1:1" threadUsername="nath4an" commentUsername="dani3l69" />;
  return <CommentMedia src={imgMedia1} type="image" aspectRatio="1:1" threadUsername="nath4an" commentUsername="dani3l69" />;
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="icon">
          <path d={svgPaths.paffe900} id="icon_2" stroke="var(--stroke-0, #8C0200)" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div className="box-border content-stretch flex gap-[2px] items-center p-[2px] relative rounded-[1px] shrink-0" data-name="button">
      <Icon8 />
      <p className="font-['Neue_Haas_Grotesk_Display:Medium',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#8c0200] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">1,200</p>
    </div>
  );
}

function Frame1597879553() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start min-h-px min-w-px relative self-stretch shrink-0">
      <p className="[white-space-collapse:collapse] basis-0 font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] grow leading-[1.2] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#342c24] text-[12px] text-nowrap tracking-[0.24px] w-[156px]">{`>> dunno, maybe going up? 👀`}</p>
      <Button8 />
    </div>
  );
}

function Frame1597879997() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
      <Media2 />
      <Frame1597879553 />
    </div>
  );
}

function Comment() {
  return (
    <div className="bg-[#f2eeea] relative rounded-[4px] shrink-0 w-full" data-name="comment">
      <div aria-hidden="true" className="absolute border border-[#eee7df] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[4px] items-start p-[8px] relative w-full">
          <UserStv />
          <Frame1597879997 />
        </div>
      </div>
    </div>
  );
}

function Avatar11() {
  return (
    <div className="box-border content-stretch flex items-center p-[2px] relative shrink-0 w-[20px]" data-name="avatar">
      <div className="pointer-events-none relative rounded-[80px] shrink-0 size-[16px]" data-name="image">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[80px] size-full" src={imgImage2} />
        <div aria-hidden="true" className="absolute border border-[#ffe2d1] border-solid inset-[-1px] rounded-[81px]" />
      </div>
    </div>
  );
}

function User2() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0 cursor-pointer p-[2px] hover:bg-[#ffd2b5] hover:bg-opacity-30 rounded-[2px] transition-colors" data-name="user">
      <Avatar11 />
      <p className="font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#8c0200] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">p3dr0u</p>
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="icon">
          <path d={svgPaths.p11f76c00} fill="var(--fill-0, #6D6153)" id="icon_2" />
        </g>
      </svg>
    </div>
  );
}

function XStamp1() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0" data-name="x-stamp">
      <Icon9 />
    </div>
  );
}

function XId1() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="x-id">
      <p className="font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#6d6153] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">2 h ago</p>
      <XStamp1 />
    </div>
  );
}

function Top1() {
  return (
    <div className="basis-0 content-stretch flex gap-[6px] grow items-center min-h-px min-w-px relative shrink-0" data-name="top">
      <User2 />
      <XId1 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="icon">
          <path d={svgPaths.p3943ff00} id="icon_2" stroke="var(--stroke-0, #0D0B08)" strokeLinecap="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button9() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <div className="box-border content-stretch flex gap-[2px] items-center p-[2px] relative rounded-[1px] shrink-0 cursor-pointer hover:bg-[#ffd2b5] hover:bg-opacity-30 transition-colors" data-name="button">
          <Icon10 />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-neutral-50 border border-[#dcd2c8] rounded-[4px] shadow-lg min-w-[120px] p-0">
        <DropdownMenuItem 
          className="cursor-pointer px-[8px] py-[4px] h-[28px] hover:bg-[#ffe2d1] focus:bg-[#ffe2d1] flex gap-[4px] items-center rounded-none"
        >
          <div className="relative shrink-0 size-[14px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
              <path d="M6.99886 9.04159V2.33326M9.62386 4.6666L6.99886 2.0416L4.37386 4.6666M11.9572 8.45826V11.9583H2.04053V8.45826" stroke="#50463B" strokeLinecap="square" />
            </svg>
          </div>
          <span style={{ fontFamily: '"Neue Haas Grotesk Display", system-ui, -apple-system, sans-serif', fontWeight: 400, fontSize: '12px', fontStyle: 'normal', color: '#6d6153', letterSpacing: '0.24px', lineHeight: '120%' }}>Share</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="cursor-pointer px-[8px] py-[4px] h-[28px] hover:bg-[#ffe2d1] focus:bg-[#ffe2d1] flex gap-[4px] items-center rounded-none"
        >
          <div className="relative shrink-0 size-[14px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
              <path d="M6.99886 4.37507V3.40285M6.99886 4.37507H6.02662C4.95275 4.37507 4.08219 3.50452 4.08219 2.43063C4.08219 1.89368 4.51747 1.4584 5.05442 1.4584C6.12829 1.4584 6.99886 2.32896 6.99886 3.40285M6.99886 4.37507H7.9711C9.04496 4.37507 9.91553 3.50452 9.91553 2.43063C9.91553 1.89368 9.48024 1.4584 8.94328 1.4584C7.86943 1.4584 6.99886 2.32896 6.99886 3.40285M6.99886 4.37507H2.04053V6.7084H2.62386M6.99886 4.37507H11.9572V6.7084H11.3739M6.99886 4.37507V6.7084M2.62386 6.7084V11.9584H6.99886M2.62386 6.7084V6.41674M2.62386 6.7084H6.99886M11.3739 6.7084V11.9584H6.99886M11.3739 6.7084V6.41674M11.3739 6.7084H6.99886M6.99886 6.7084V11.9584" stroke="#50463B" />
            </svg>
          </div>
          <span style={{ fontFamily: '"Neue Haas Grotesk Display", system-ui, -apple-system, sans-serif', fontWeight: 400, fontSize: '12px', fontStyle: 'normal', color: '#6d6153', letterSpacing: '0.24px', lineHeight: '120%' }}>Gift</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="cursor-pointer px-[8px] py-[4px] h-[28px] hover:bg-[#ffe2d1] focus:bg-[#ffe2d1] flex gap-[4px] items-center rounded-none"
        >
          <div className="relative shrink-0 size-[14px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
              <g clipPath="url(#clip0_comment_menu2)">
                <path d="M9.80895 2.62486H11.2942L8.03312 6.33796L11.8431 11.3749H8.85323L6.51236 8.31397L3.83247 11.3749H2.34723L5.80203 7.40346L2.1535 2.62486H5.21762L7.33247 5.42098L9.80895 2.62486ZM9.28911 10.5031H10.1125L4.78496 3.46434H3.90027L9.28911 10.5031Z" fill="#50463B" />
              </g>
              <defs>
                <clipPath id="clip0_comment_menu2">
                  <rect fill="white" height="14" width="14" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <span style={{ fontFamily: '"Neue Haas Grotesk Display", system-ui, -apple-system, sans-serif', fontWeight: 400, fontSize: '12px', fontStyle: 'normal', color: '#6d6153', letterSpacing: '0.24px', lineHeight: '120%' }}>View on X</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="cursor-pointer px-[8px] py-[4px] h-[28px] hover:bg-[#ffe2d1] focus:bg-[#ffe2d1] flex gap-[4px] items-center rounded-none"
        >
          <div className="relative shrink-0 size-[14px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
              <g clipPath="url(#clip1_comment_menu2)">
                <path d="M6.99886 0.875L8.76543 4.57297L12.8322 5.10845L9.85719 7.92943L10.604 11.9583L6.99886 10.0038L3.39366 11.9583L4.14053 7.92943L1.16553 5.10845L5.23231 4.57297L6.99886 0.875Z" stroke="#50463B" strokeLinecap="round" />
              </g>
              <defs>
                <clipPath id="clip1_comment_menu2">
                  <rect fill="white" height="14" width="14" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <span style={{ fontFamily: '"Neue Haas Grotesk Display", system-ui, -apple-system, sans-serif', fontWeight: 400, fontSize: '12px', fontStyle: 'normal', color: '#6d6153', letterSpacing: '0.24px', lineHeight: '120%' }}>Star</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="cursor-pointer px-[8px] py-[4px] h-[28px] hover:bg-[#ffe2d1] focus:bg-[#ffe2d1] flex gap-[4px] items-center rounded-none"
        >
          <div className="relative shrink-0 size-[14px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
              <path d="M2.04053 7.64259C4.91954 10.7037 9.07815 10.7037 11.9572 7.64259M2.04053 4.3375C3.48004 2.80691 5.23946 2.04161 6.99886 2.0416C8.75831 2.04158 10.5177 2.80685 11.9572 4.33739M6.99886 10.0624V11.9583M4.66555 9.77076L3.79055 11.2187M9.18636 9.77076L10.2072 11.2187" stroke="#50463B" strokeLinecap="square" />
            </svg>
          </div>
          <span style={{ fontFamily: '"Neue Haas Grotesk Display", system-ui, -apple-system, sans-serif', fontWeight: 400, fontSize: '12px', fontStyle: 'normal', color: '#6d6153', letterSpacing: '0.24px', lineHeight: '120%' }}>Hide</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="cursor-pointer px-[8px] py-[4px] h-[28px] hover:bg-[#ffe2d1] focus:bg-[#ffe2d1] flex gap-[4px] items-center rounded-none"
        >
          <div className="relative shrink-0 size-[14px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
              <path d="M2.62329 12.5417V9.04167M2.62329 9.04167V1.45833H11.9566L9.62329 5.25L11.9566 9.04167H2.62329Z" stroke="#50463B" strokeLinecap="square" />
            </svg>
          </div>
          <span style={{ fontFamily: '"Neue Haas Grotesk Display", system-ui, -apple-system, sans-serif', fontWeight: 400, fontSize: '12px', fontStyle: 'normal', color: '#6d6153', letterSpacing: '0.24px', lineHeight: '120%' }}>Report</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function UserStv1() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="user+stv">
      <Top1 />
      <Button9 />
    </div>
  );
}

function Media3() {
  return <CommentMedia src={imgMedia1} type="image" aspectRatio="1:1" threadUsername="nath4an" commentUsername="p3dr0u" />;
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="icon">
          <path d={svgPaths.paffe900} id="icon_2" stroke="var(--stroke-0, #8C0200)" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button10() {
  return (
    <div className="box-border content-stretch flex gap-[2px] items-center p-[2px] relative rounded-[1px] shrink-0" data-name="button">
      <Icon11 />
      <p className="font-['Neue_Haas_Grotesk_Display:Medium',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#8c0200] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">1,200</p>
    </div>
  );
}

function Frame1597879554() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start min-h-px min-w-px relative self-stretch shrink-0">
      <p className="[white-space-collapse:collapse] basis-0 font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] grow leading-[1.2] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#342c24] text-[12px] text-nowrap tracking-[0.24px] w-[156px]">{`>> dunno, maybe going up? 👀`}</p>
      <Button10 />
    </div>
  );
}

function Frame1597879998() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
      <Media3 />
      <Frame1597879554 />
    </div>
  );
}

function Comment1() {
  return (
    <div className="bg-[#f2eeea] relative rounded-[4px] shrink-0 w-full" data-name="comment">
      <div aria-hidden="true" className="absolute border border-[#eee7df] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[4px] items-start p-[8px] relative w-full">
          <UserStv1 />
          <Frame1597879998 />
        </div>
      </div>
    </div>
  );
}

function Comment2() {
  return (
    <div className="bg-[#f2eeea] relative rounded-[4px] shrink-0 w-full" data-name="comment">
      <div aria-hidden="true" className="absolute border border-[#eee7df] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[4px] items-start p-[8px] relative w-full">
          <UserStv />
          <Frame1597879997 />
        </div>
      </div>
    </div>
  );
}

function Comment3() {
  return (
    <div className="bg-[#f2eeea] relative rounded-[4px] shrink-0 w-full" data-name="comment">
      <div aria-hidden="true" className="absolute border border-[#eee7df] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[4px] items-start p-[8px] relative w-full">
          <UserStv1 />
          <Frame1597879998 />
        </div>
      </div>
    </div>
  );
}

function Comment4() {
  return (
    <div className="bg-[#f2eeea] relative rounded-[4px] shrink-0 w-full" data-name="comment">
      <div aria-hidden="true" className="absolute border border-[#eee7df] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[4px] items-start p-[8px] relative w-full">
          <UserStv />
          <Frame1597879997 />
        </div>
      </div>
    </div>
  );
}

function DynamicComment({ comment }: { comment: CommentData }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [needsExpansion, setNeedsExpansion] = useState(false);

  useEffect(() => {
    if (textRef.current && comment.text) {
      // Check if text height exceeds 4 lines
      const lineHeight = 1.2 * 12; // 1.2 line-height * 12px font-size
      const maxHeight = lineHeight * 4;
      const actualHeight = textRef.current.scrollHeight;
      setNeedsExpansion(actualHeight > maxHeight);
    }
  }, [comment.text]);

  return (
    <div className="bg-[#f2eeea] relative rounded-[4px] shrink-0 w-full" data-name="comment">
      <div aria-hidden="true" className="absolute border border-[#eee7df] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[4px] items-start p-[8px] relative w-full">
          <UserStv />
          <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
            {comment.media && (
              <CommentMedia 
                src={comment.media.url} 
                type={comment.media.type} 
                aspectRatio="1:1" 
                threadUsername="nath4an" 
                commentUsername={comment.username} 
              />
            )}
            <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start min-h-px min-w-px relative self-stretch shrink-0">
              {comment.text && comment.text.trim() !== '' && (
                <div className="flex flex-col gap-[4px] w-full">
                  <p 
                    ref={textRef}
                    className={`font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] leading-[1.2] not-italic relative text-[#342c24] text-[12px] tracking-[0.24px] ${!isExpanded && needsExpansion ? 'line-clamp-4' : ''}`}
                  >
                    {comment.text}
                  </p>
                  {needsExpansion && (
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] leading-[1.2] not-italic text-[#6d6153] text-[12px] tracking-[0.24px] self-start hover:text-[#342c24] transition-colors"
                    >
                      {isExpanded ? 'Read less' : 'Read more'}
                    </button>
                  )}
                </div>
              )}
              <div className="box-border content-stretch flex gap-[2px] items-center p-[2px] relative rounded-[1px] shrink-0" data-name="button">
                <Icon8 />
                <p className="font-['Neue_Haas_Grotesk_Display:Medium',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#8c0200] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">{comment.hearts.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Comments({ comments = [], commentsCount = 0 }: { comments?: CommentData[]; commentsCount?: number }) {
  // If we have a commentsCount but no actual comments, generate mock recent comments
  const mockComments: CommentData[] = [
    {
      username: 'early_bird',
      timeAgo: 'Just now',
      text: 'First! This looks promising 🚀',
      hearts: Math.floor(Math.random() * 20) + 5,
    },
    {
      username: 'crypto_whale',
      timeAgo: '1m',
      text: 'Aping in!',
      hearts: Math.floor(Math.random() * 15) + 3,
    },
  ];
  
  // Use actual comments if available, otherwise use mock comments if count > 0
  const commentsToShow = comments.length > 0 ? comments : (commentsCount > 0 ? mockComments : []);
  
  // Only show first 2 comments
  const displayComments = commentsToShow.slice(0, 2);
  
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="comments">
      {displayComments.map((comment, index) => (
        <DynamicComment key={index} comment={comment} />
      ))}
    </div>
  );
}

function DescriptionComments({ description = `I'm pretty sure this token is destined to sink — and that's exactly why it's perfect.`, comments = [], commentsCount = 0 }: { description?: string; comments?: CommentData[]; commentsCount?: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);
  const fullText = description;
  
  // Check if text overflows beyond 2 lines
  useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current) {
        // Compare scrollHeight (full content height) with clientHeight (visible height)
        const hasOverflow = textRef.current.scrollHeight > textRef.current.clientHeight;
        setIsOverflowing(hasOverflow);
      }
    };
    
    checkOverflow();
    // Recheck on window resize
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [fullText]);
  
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start min-h-px min-w-px relative self-stretch shrink-0" data-name="description+comments">
      <div className="leading-[1.2] not-italic relative shrink-0 text-[14px] tracking-[0.28px] w-full">
        {isExpanded ? (
          <>
            <p className="mb-0 font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] text-[#50463b]">{fullText}</p>
            <span 
              onClick={() => setIsExpanded(false)}
              style={{ 
                fontFamily: '\"Neue Haas Grotesk Display\", system-ui, -apple-system, sans-serif',
                fontWeight: 500,
                fontSize: '14px',
                color: '#342c24',
                letterSpacing: '0.28px',
                cursor: 'pointer',
                lineHeight: '115%',
                background: '#fff',
                paddingLeft: '2px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#8c0200'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#342c24'}
            >
              less
            </span>
          </>
        ) : (
          <div className="relative">
            <p 
              ref={textRef}
              className="mb-0 line-clamp-2 font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] text-[#50463b]"
              style={{ paddingRight: isOverflowing ? '45px' : '0' }}
            >
              {fullText}
            </p>
            {isOverflowing && (
              <span 
                onClick={() => setIsExpanded(true)}
                className="absolute bottom-0 right-0"
                style={{ 
                  fontFamily: '"Neue Haas Grotesk Display", system-ui, -apple-system, sans-serif',
                  fontWeight: 500,
                  fontSize: '14px',
                  color: '#342c24',
                  letterSpacing: '0.28px',
                  cursor: 'pointer',
                  lineHeight: '115%',
                  background: '#fff',
                  paddingLeft: '2px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#8c0200'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#342c24'}
              >
                more
              </span>
            )}
          </div>
        )}
      </div>
      <Interactions />
      {commentsCount === 0 ? (
        <div className="w-full h-[36px]">
          <CommentInput />
        </div>
      ) : (
        <Comments comments={comments} commentsCount={commentsCount} />
      )}
    </div>
  );
}

function Content({ 
  isGraduated = false, 
  percentage = 56, 
  tokenName = 'Thinck boutet', 
  ticker = '$THINCK', 
  description = '', 
  mainMediaUrl, 
  comments = [],
  commentsCount = 0,
  mediaCount = 0,
  marketCap = 0,
  change24hr = 0,
  changePercent = 0
}: { 
  isGraduated?: boolean; 
  percentage?: number; 
  tokenName?: string; 
  ticker?: string; 
  description?: string; 
  mainMediaUrl?: string; 
  comments?: CommentData[];
  commentsCount?: number;
  mediaCount?: number;
  marketCap?: number;
  change24hr?: number;
  changePercent?: number;
}) {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-name="content">
      <Media1 
        isGraduated={isGraduated} 
        percentage={percentage} 
        mainMediaUrl={mainMediaUrl}
        commentsCount={commentsCount}
        mediaCount={mediaCount}
        marketCap={marketCap}
        change24hr={change24hr}
        changePercent={changePercent}
      />
      <DescriptionComments description={description} comments={comments} commentsCount={commentsCount} />
    </div>
  );
}

interface CommentData {
  username: string;
  timeAgo: string;
  text: string;
  hearts: number;
  media?: {
    type: 'image' | 'video' | 'gif';
    url: string;
  };
}

interface ThreadV4Props {
  isGraduated?: boolean;
  percentage?: number;
  username?: string;
  timeAgo?: string;
  timestamp?: string;
  category?: string;
  tokenName?: string;
  ticker?: string;
  description?: string;
  mainMediaUrl?: string;
  comments?: CommentData[];
  commentsCount?: number;
  mediaCount?: number;
  marketCap?: number;
  change24hr?: number;
  changePercent?: number;
}

export default function ThreadV4({ 
  isGraduated = false, 
  percentage = 56,
  username = 'nath4an',
  timeAgo = '2h',
  timestamp = '22 Oct 2025, 13:32',
  category = 'Meme',
  tokenName = 'Thinck boutet',
  ticker = '$THINCK',
  description = `I'm pretty sure this token is destined to sink — and that's exactly why it's perfect. $THINKK wasn't created by a genius dev team or a visionary DAO… it was spawned by a bot that accidentally discovered its own existence before anyone else even knew what was going on.`,
  mainMediaUrl,
  comments = [],
  commentsCount = 1236,
  mediaCount = 546,
  marketCap = 124530,
  change24hr = 26900,
  changePercent = 463.37
}: ThreadV4Props = {}) {
  return (
    <div className="bg-neutral-50 relative size-full" data-name="thread-v4">
      <div aria-hidden="true" className="absolute border-[#ffd2b5] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[12px] items-start p-[12px] relative size-full">
          <TopLevel username={username} timeAgo={timeAgo} timestamp={timestamp} category={category} tokenName={tokenName} ticker={ticker} />
          <Content 
            isGraduated={isGraduated} 
            percentage={percentage} 
            tokenName={tokenName} 
            ticker={ticker} 
            description={description} 
            mainMediaUrl={mainMediaUrl} 
            comments={comments}
            commentsCount={commentsCount}
            mediaCount={mediaCount}
            marketCap={marketCap}
            change24hr={change24hr}
            changePercent={changePercent}
          />
        </div>
      </div>
    </div>
  );
}