import svgPaths from "./svg-3ul7a5rebn";

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

export default function Button() {
  return (
    <div className="relative rounded-[1px] size-full" data-name="button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[2px] items-center p-[2px] relative size-full">
          <Icon />
          <p className="font-['Neue_Haas_Grotesk_Display:Medium',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#6d6153] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">1,23K</p>
        </div>
      </div>
    </div>
  );
}