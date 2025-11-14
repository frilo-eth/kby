import svgPaths from "./svg-6gm75ityo0";

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_18_4239)" id="icon">
          <path d={svgPaths.p24c5700} id="icon_2" stroke="var(--stroke-0, #6D6153)" strokeLinecap="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_18_4239">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="box-border content-stretch flex gap-[2px] items-center p-[2px] relative rounded-[1px] shrink-0" data-name="button">
      <Icon />
      <p className="font-['Neue_Haas_Grotesk_Display:Medium',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#6d6153] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">1,23K</p>
    </div>
  );
}

function Icon1() {
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

function Button1() {
  return (
    <div className="box-border content-stretch flex gap-[2px] items-center p-[2px] relative rounded-[1px] shrink-0" data-name="button">
      <Icon1 />
      <p className="font-['Neue_Haas_Grotesk_Display:Medium',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#6d6153] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">$124,53K</p>
    </div>
  );
}

function Icon2() {
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

function Button2() {
  return (
    <div className="box-border content-stretch flex gap-[2px] items-center p-[2px] relative rounded-[1px] shrink-0" data-name="button">
      <Icon2 />
      <p className="font-['Neue_Haas_Grotesk_Display:Medium',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#6d6153] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">56%</p>
    </div>
  );
}

function Frame() {
  return <div className="bg-gradient-to-r from-[#0d3e2d] h-full rounded-[8px] to-[#a6f2d5] via-50% via-[#41e4a7] w-[36px]" />;
}

function Frame1() {
  return (
    <div className="backdrop-blur-[1px] backdrop-filter basis-0 bg-[#eee7df] grow h-[8px] min-h-px min-w-px relative rounded-[8px] shrink-0">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[8px] items-start justify-between pl-0 pr-[4px] py-0 relative w-full">
          <div className="basis-0 flex grow items-center justify-center min-h-px min-w-px relative shrink-0">
            <div className="flex-none h-full rotate-[180deg]">
              <Frame />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Reaction() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative size-full" data-name="reaction">
      <Button />
      <Button1 />
      <Button2 />
      <Frame1 />
    </div>
  );
}