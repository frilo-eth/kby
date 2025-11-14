import svgPaths from "./svg-ixgy2ai4eq";

function Icon() {
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

export default function Button() {
  return (
    <div className="relative rounded-[1px] size-full" data-name="button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[2px] items-center p-[2px] relative size-full">
          <Icon />
          <p className="font-['Neue_Haas_Grotesk_Display:Medium',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#8c0200] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">1,200</p>
        </div>
      </div>
    </div>
  );
}