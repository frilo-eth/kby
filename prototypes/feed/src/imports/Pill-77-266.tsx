export default function Pill() {
  return (
    <div className="bg-[#ffd9f8] relative rounded-[100px] size-full" data-name="pill">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex items-center justify-center px-[6px] py-[2px] relative size-full">
          <p className="font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#471a3e] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">Question</p>
        </div>
      </div>
    </div>
  );
}