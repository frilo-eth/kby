import svgPaths from "./svg-huy5abx9zb";

function Icon() {
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

function Left() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="left">
      <Icon />
      <p className="font-['Neue_Haas_Grotesk_Display:Medium',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#8c0200] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">Trending</p>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_114_2150)" id="icon">
          <path d={svgPaths.p32f55d80} id="icon_2" stroke="var(--stroke-0, #8C0200)" strokeLinecap="square" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_114_2150">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function DropdownBtn() {
  return (
    <div className="bg-[#ffe2d1] box-border content-stretch flex gap-[8px] h-[36px] items-center p-[8px] relative shrink-0" data-name="dropdown-btn">
      <Left />
      <Icon1 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="icon">
          <path d={svgPaths.p17328700} id="icon_2" stroke="var(--stroke-0, #8C0200)" strokeLinecap="square" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Left1() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="left">
      <Icon2 />
      <p className="font-['Neue_Haas_Grotesk_Display:Medium',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#8c0200] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">Ticker</p>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_114_2150)" id="icon">
          <path d={svgPaths.p32f55d80} id="icon_2" stroke="var(--stroke-0, #8C0200)" strokeLinecap="square" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_114_2150">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function DropdownBtn1() {
  return (
    <div className="bg-[#ffe2d1] box-border content-stretch flex gap-[8px] h-[36px] items-center p-[8px] relative shrink-0" data-name="dropdown-btn">
      <Left1 />
      <Icon3 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="icon">
          <path d={svgPaths.pd3e8500} id="Vector" stroke="var(--stroke-0, #8C0200)" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Left2() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="left">
      <Icon4 />
      <p className="font-['Neue_Haas_Grotesk_Display:Medium',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#8c0200] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">1</p>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_114_2150)" id="icon">
          <path d={svgPaths.p32f55d80} id="icon_2" stroke="var(--stroke-0, #8C0200)" strokeLinecap="square" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_114_2150">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function DropdownBtn2() {
  return (
    <div className="bg-[#ffe2d1] box-border content-stretch flex gap-[8px] h-[36px] items-center p-[8px] relative shrink-0" data-name="dropdown-btn">
      <Left2 />
      <Icon5 />
    </div>
  );
}

function Tools() {
  return (
    <div className="min-w-[120px] relative shrink-0" data-name="tools">
      <div className="content-stretch flex items-center min-w-inherit overflow-clip relative rounded-[inherit]">
        <DropdownBtn />
        <DropdownBtn1 />
        <DropdownBtn2 />
      </div>
      <div aria-hidden="true" className="absolute border-[#ffd2b5] border-[0px_0px_0px_1px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Pill() {
  return (
    <div className="bg-[#8c0200] box-border content-stretch flex gap-[2px] items-center justify-center px-[6px] py-[2px] relative rounded-[100px] shrink-0" data-name="pill">
      <p className="font-['Neue_Haas_Grotesk_Display:Regular',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[12px] text-nowrap text-white tracking-[0.24px] whitespace-pre">Vol: $3.0K - $33.0K</p>
    </div>
  );
}

function Pill1() {
  return (
    <div className="bg-[#8c0200] box-border content-stretch flex gap-[2px] items-center justify-center px-[6px] py-[2px] relative rounded-[100px] shrink-0" data-name="pill">
      <p className="font-['Neue_Haas_Grotesk_Display:Regular',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[12px] text-nowrap text-white tracking-[0.24px] whitespace-pre">MC $10.0K - $100.0K</p>
    </div>
  );
}

function Pills() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="pills">
      <Pill />
      <Pill1 />
    </div>
  );
}

function Button() {
  return (
    <div className="box-border content-stretch flex gap-[2px] items-center p-[2px] relative rounded-[1px] shrink-0" data-name="button">
      <p className="font-['Neue_Haas_Grotesk_Display:Medium',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#8c0200] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">Type in watcha lookin’ for</p>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="icon">
          <path d={svgPaths.p12bcfc00} id="Vector" stroke="var(--stroke-0, #8C0200)" strokeLinecap="square" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="box-border content-stretch flex gap-[2px] items-center p-[2px] relative rounded-[1px] shrink-0" data-name="button">
      <Icon6 />
    </div>
  );
}

function UserStv() {
  return (
    <div className="basis-0 content-stretch flex grow items-center justify-between min-h-px min-w-px relative shrink-0" data-name="user+stv">
      <Button />
      <Button1 />
    </div>
  );
}

function SearchBar() {
  return (
    <div className="basis-0 bg-[#ffe2d1] grow h-[36px] min-h-px min-w-px relative shrink-0" data-name="search-bar">
      <div aria-hidden="true" className="absolute border-[#ffd2b5] border-[0px_0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[6px] h-[36px] items-center px-[12px] py-[8px] relative w-full">
          <Pills />
          <UserStv />
        </div>
      </div>
    </div>
  );
}

function SearchBar1() {
  return (
    <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-full" data-name="search-bar">
      <Tools />
      <SearchBar />
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="content">
      <p className="font-['Neue_Haas_Grotesk_Display:Regular',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#50463b] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">Try @ to search for a user</p>
    </div>
  );
}

function MenuRow() {
  return (
    <button className="bg-[#ffd2b5] cursor-pointer h-[28px] relative shrink-0 w-full" data-name="menu-row">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[4px] h-[28px] items-center px-[12px] py-[4px] relative w-full">
          <Content />
        </div>
      </div>
    </button>
  );
}

export default function DeepSearch() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="deep-search">
      <SearchBar1 />
      <MenuRow />
    </div>
  );
}