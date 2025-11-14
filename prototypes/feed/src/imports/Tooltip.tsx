export default function Tooltip() {
  return (
    <div className="bg-neutral-50 relative rounded-[2px] size-full" data-name="tooltip">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[4px] items-start overflow-clip p-[8px] relative size-full">
          <p className="font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#6d6153] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">{` 22 Oct 2025, 13:32`}</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#dcd2c8] border-solid inset-0 pointer-events-none rounded-[2px] shadow-[0px_1px_1px_0px_#8b7e6f,0px_2px_4px_0px_#c7bcaf,0px_4px_8px_0px_#dcd2c8]" />
    </div>
  );
}