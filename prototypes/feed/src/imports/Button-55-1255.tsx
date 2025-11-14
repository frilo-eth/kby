import svgPaths from "./svg-4dedx4v8fl";

function Icon() {
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

export default function Button() {
  return (
    <div className="relative rounded-[1px] size-full" data-name="button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[2px] items-center p-[4px] relative size-full">
          <p className="font-['Neue_Haas_Grotesk_Display:Medium',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#50463b] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">Popular</p>
          <Icon />
        </div>
      </div>
    </div>
  );
}