import React from "react";
import { motion, AnimatePresence } from "motion/react";
import EnhancedSearchBar from "../../prototypes/feed/src/components/EnhancedSearchBar";
import svgPaths from "../../prototypes/feed/src/imports/svg-01q4wve5uj";
import sortSvgPaths from "../../prototypes/feed/src/imports/svg-huy5abx9zb";
import plusIconPaths from "../../prototypes/feed/src/imports/svg-43c09v0lsa";
import imgImage from "../../prototypes/feed/src/assets/439247b1ebb4193e9686845f7aaaf7a95abc5bfe.png";

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
      <p className="capitalize font-['Neue_Haas_Grotesk_Display:Medium',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[14px] text-nowrap text-white tracking-[0.28px] whitespace-pre hidden sm:block">Create token</p>
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
      <p className="capitalize font-['Neue_Haas_Grotesk_Display:Medium',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[#8c0200] text-[14px] text-nowrap tracking-[0.28px] whitespace-pre hidden sm:block">0x635e...9739</p>
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

// Tab Component
function Tab({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) {
  return (
    <div 
      className={`box-border content-stretch flex gap-[4px] h-full items-center p-[8px] relative shrink-0 cursor-pointer transition-colors ${
        isActive ? 'bg-[#ffe2d1]' : 'bg-[#ffe2d1]'
      }`}
      onClick={onClick}
    >
      <p className={`font-['Neue_Haas_Grotesk_Display:Medium',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[12px] text-nowrap tracking-[0.24px] whitespace-pre ${
        isActive ? 'text-[#8c0200]' : 'text-[#6d6153]'
      }`}>
        {label}
      </p>
    </div>
  );
}

// Sort Button Component (rest state)
function SortButton() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
      <div className="relative shrink-0 size-[16px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
          <g id="icon">
            <path d={sortSvgPaths.p33b99f80} id="icon_2" stroke="var(--stroke-0, #8C0200)" strokeLinecap="square" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
      <p className="font-['Neue_Haas_Grotesk_Display:Medium',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#8c0200] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">
        Sort
      </p>
    </div>
  );
}

// Search Icon Component
function SearchIcon() {
  return (
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
}

// ModalHead Component (rest state search bar)
function ModalHead({ onFocus }: { onFocus: () => void }) {
  return (
    <div 
      className="bg-[#ffe2d1] box-border content-stretch flex flex-col h-[36px] items-start justify-between px-[16px] py-[8px] relative shrink-0 cursor-pointer" 
      data-name="modal-head"
      onClick={onFocus}
    >
      <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
        <SortButton />
        <div className="w-[1px] h-[20px] bg-[#ffd2b5]" />
        <div className="content-stretch flex gap-[2px] items-center relative shrink-0">
          <SearchIcon />
          <span 
            className="font-['Neue_Haas_Grotesk_Display:Medium',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#8c0200] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre"
          >
            Search
          </span>
        </div>
      </div>
    </div>
  );
}

// Search Component with expansion animation
function Search({ isExpanded, onFocus, onBlur }: { isExpanded: boolean; onFocus: () => void; onBlur: () => void }) {
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
          <ModalHead onFocus={onFocus} />
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

// Filterbar Component with integrated search and expansion animation
function Filterbar() {
  const [activeTab, setActiveTab] = React.useState('Memes');
  const [isSearchExpanded, setIsSearchExpanded] = React.useState(false);
  
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full overflow-visible" data-name="filterbar">
      <div className="basis-0 bg-[#ffe2d1] border border-[#ffd2b5] border-solid grow max-w-[768px] min-h-px min-w-px relative shrink-0 overflow-visible" data-name="container">
        <div className="content-stretch flex flex-row items-center max-w-inherit overflow-visible relative rounded-[inherit] w-full">
          {/* Tabs Section - Fade out when search expands */}
          <AnimatePresence>
            {!isSearchExpanded && (
              <motion.div 
                className="basis-0 flex flex-row grow items-center self-stretch shrink-0"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ 
                  duration: 0.15,
                  ease: [0.4, 0, 1, 1]
                }}
              >
                <div className="basis-0 bg-[#ffe2d1] box-border content-stretch flex grow h-full items-center min-h-px min-w-px px-[4px] py-0 relative shrink-0">
                  <Tab label="All" isActive={activeTab === 'All'} onClick={() => setActiveTab('All')} />
                  <Tab label="Memes" isActive={activeTab === 'Memes'} onClick={() => setActiveTab('Memes')} />
                  <Tab label="Dares" isActive={activeTab === 'Dares'} onClick={() => setActiveTab('Dares')} />
                  <Tab label="Questions" isActive={activeTab === 'Questions'} onClick={() => setActiveTab('Questions')} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Search Section - Expands to full width when active */}
          <Search 
            isExpanded={isSearchExpanded} 
            onFocus={() => setIsSearchExpanded(true)}
            onBlur={() => setIsSearchExpanded(false)}
          />
        </div>
        <div aria-hidden="true" className="absolute border border-[#ffd2b5] border-solid inset-[-0.5px] pointer-events-none" />
      </div>
    </div>
  );
}

// Footer Component
function Footer() {
  return (
    <div className="border-[1px_0px_0px] border-[#ffd2b5] border-solid relative shrink-0 w-full" data-name="footer">
      <div className="content-stretch flex flex-col items-center overflow-clip relative rounded-[inherit] w-full">
        <div className="box-border content-stretch flex gap-[40px] items-center max-w-[768px] px-[12px] py-[16px] relative shrink-0 w-full" data-name="container">
          <div className="basis-0 content-stretch flex grow items-center justify-between min-h-px min-w-px relative shrink-0" data-name="secondary-links">
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
              <a href="#" className="box-border content-stretch flex gap-[2px] items-center p-[2px] relative rounded-[1px] shrink-0 text-[12px] text-[#6d6153] hover:text-[#8c0200] transition-colors">[ Settings ]</a>
              <a href="#" className="box-border content-stretch flex gap-[2px] items-center p-[2px] relative rounded-[1px] shrink-0 text-[12px] text-[#6d6153] hover:text-[#8c0200] transition-colors">[ Legal ]</a>
              <a href="#" className="box-border content-stretch flex gap-[2px] items-center p-[2px] relative rounded-[1px] shrink-0 text-[12px] text-[#6d6153] hover:text-[#8c0200] transition-colors">[ Contact ]</a>
              <a href="#" className="box-border content-stretch flex gap-[2px] items-center p-[2px] relative rounded-[1px] shrink-0 text-[12px] text-[#6d6153] hover:text-[#8c0200] transition-colors">[ Docs ]</a>
            </div>
            <div className="box-border content-stretch flex gap-[2px] items-center p-[2px] relative rounded-[1px] shrink-0">
              <div className="overflow-clip relative shrink-0 size-[16px]" data-name="icon">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                  <path d="M4 4L12 12M12 4L4 12" stroke="#6d6153" strokeWidth="1.5" strokeLinecap="square" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchFeature() {
  return (
    <div className="h-[1080px] w-[1440px] mx-auto" data-name="layout/desktop">
      <div className="absolute bg-gradient-to-b content-stretch flex flex-col from-[#ffd2b5] inset-0 items-start to-[11.747%] to-[#fafafa]">
        {/* NavBar */}
        <NavBar />

        {/* Filterbar with integrated search */}
        <Filterbar />

        {/* Body - Empty state with border */}
        <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0 w-full" data-name="body">
          <div className="basis-0 content-stretch flex flex-col grow h-full items-center min-h-px min-w-px relative shrink-0">
            <div className="basis-0 box-border content-stretch flex flex-col gap-[20px] grow items-center justify-center min-h-px min-w-px px-[20px] py-0 relative shrink-0 w-full" data-name="feed-container">
              <div className="basis-0 border border-[#ffd2b5] border-solid grow max-w-[768px] min-h-px min-w-px shrink-0 w-full" data-name="feed" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

