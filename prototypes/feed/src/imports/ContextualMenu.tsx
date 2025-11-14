import svgPaths from "./svg-x41vj2g193";

function Icon() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="icon">
          <path d={svgPaths.p2ba59e80} id="icon_2" stroke="var(--stroke-0, #50463B)" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="content">
      <Icon />
      <p className="font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#6d6153] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">Popular</p>
    </div>
  );
}

function MenuRow() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="menu-row">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[4px] h-[28px] items-center px-[8px] py-[4px] relative w-full">
          <Content />
        </div>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="icon">
          <path d={svgPaths.p2fbd9260} id="icon_2" stroke="var(--stroke-0, #50463B)" strokeLinecap="square" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="content">
      <Icon1 />
      <p className="font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#6d6153] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">Lastest</p>
    </div>
  );
}

function MenuRow1() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="menu-row">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[4px] h-[28px] items-center px-[8px] py-[4px] relative w-full">
          <Content1 />
        </div>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="icon">
          <g id="icon_2">
            <path clipRule="evenodd" d={svgPaths.p2dcbc10} fillRule="evenodd" stroke="var(--stroke-0, #50463B)" strokeWidth="1.5" />
            <path clipRule="evenodd" d={svgPaths.p2a516600} fillRule="evenodd" stroke="var(--stroke-0, #50463B)" strokeWidth="1.5" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="content">
      <Icon2 />
      <p className="font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#6d6153] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">Active user</p>
    </div>
  );
}

function MenuRow2() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="menu-row">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[4px] h-[28px] items-center px-[8px] py-[4px] relative w-full">
          <Content2 />
        </div>
      </div>
    </div>
  );
}

export default function ContextualMenu() {
  return (
    <div className="bg-neutral-50 relative rounded-[2px] size-full" data-name="contextual-menu">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <MenuRow />
        <MenuRow1 />
        <MenuRow2 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#dcd2c8] border-solid inset-0 pointer-events-none rounded-[2px]" />
    </div>
  );
}