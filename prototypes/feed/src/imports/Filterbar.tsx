function Container() {
  return (
    <div className="basis-0 bg-[#ffe2d1] grow max-w-[800px] min-h-px min-w-px relative shrink-0" data-name="container">
      <div className="content-stretch flex items-center max-w-inherit overflow-clip relative rounded-[inherit] w-full">
        <div className="basis-0 bg-neutral-50 grow min-h-[48px] min-w-px relative rounded-[2px] shrink-0" data-name="action-button">
          <div className="flex flex-row items-center justify-center min-h-inherit overflow-clip rounded-[inherit] size-full">
            <div className="box-border content-stretch flex gap-[8px] items-center justify-center min-h-inherit px-[20px] py-[16px] relative w-full">
              <div className="flex flex-col font-['Neue_Haas_Grotesk_Display:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6d6153] text-[14px] text-nowrap tracking-[0.28px]">
                <p className="leading-[1.15] whitespace-pre">View 42 new entries</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#ffd2b5] border-solid inset-[-0.5px] pointer-events-none" />
    </div>
  );
}

export default function Filterbar() {
  return (
    <div className="content-stretch flex items-center justify-center relative size-full" data-name="filterbar">
      <Container />
    </div>
  );
}