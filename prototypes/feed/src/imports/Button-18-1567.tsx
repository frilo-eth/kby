import svgPaths from "./svg-43c09v0lsa";

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="icon">
          <path d={svgPaths.p1a319000} id="icon_2" stroke="var(--stroke-0, white)" strokeLinecap="square" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

export default function Button() {
  return (
    <div className="bg-[#8c0200] relative rounded-[1px] size-full" data-name="button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[4px] items-center px-[12px] py-[8px] relative size-full">
          <p className="capitalize font-['Neue_Haas_Grotesk_Display:Medium',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[14px] text-nowrap text-white tracking-[0.28px] whitespace-pre">Create token</p>
          <Icon />
        </div>
      </div>
    </div>
  );
}