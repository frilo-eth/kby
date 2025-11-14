export default function Button() {
  return (
    <div className="relative rounded-[1px] size-full" data-name="button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[2px] items-center p-[4px] relative size-full">
          <p className="font-['Neue_Haas_Grotesk_Display:Medium',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#8c0200] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">[ Reply ]</p>
        </div>
      </div>
    </div>
  );
}