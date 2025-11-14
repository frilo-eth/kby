function Frame1597879560() {
  return (
    <div className="content-stretch flex gap-[5px] items-center relative shrink-0">
      <p className="font-['Neue_Haas_Grotesk_Display:Regular',sans-serif] leading-[1.15] not-italic relative shrink-0 text-[#8c0200] text-[14px] text-nowrap tracking-[0.28px] whitespace-pre">{`>> join the conversation`}</p>
    </div>
  );
}

function Frame1597879561() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0">
      <Frame1597879560 />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#ffd2b5] relative rounded-[7499.25px] shrink-0 size-[12px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#ff6622] border-[0.75px] border-solid inset-0 pointer-events-none rounded-[7499.25px] shadow-[0px_0.75px_1.5px_0px_rgba(10,13,18,0.05)]" />
    </div>
  );
}

function Frame1597880010() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <p className="font-['Neue_Haas_Grotesk_Display:Regular',sans-serif] leading-none not-italic relative shrink-0 text-[#8c0200] text-[10px] text-nowrap tracking-[0.2px] whitespace-pre">Anon</p>
      <div className="bg-[#dd4400] content-stretch flex h-[12px] items-center justify-end overflow-clip relative rounded-[7499.25px] shrink-0 w-[24px]" data-name="toggle">
        <Button />
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="input">
      <Frame1597879561 />
      <Frame1597880010 />
    </div>
  );
}

export default function CommentInput() {
  return (
    <button className="bg-[#ffd2b5] cursor-pointer relative rounded-[2px] size-full" data-name="comment-input">
      <div aria-hidden="true" className="absolute border border-[#50463b] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[6px] items-start p-[8px] relative size-full">
          <Input />
        </div>
      </div>
    </button>
  );
}