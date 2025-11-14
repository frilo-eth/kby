function Pill() {
  return <div className="absolute h-[18px] left-[25px] rounded-[100px] top-px w-[46px]" data-name="Pill" />;
}

function Pill1() {
  return <div className="absolute h-[18px] left-[76px] rounded-[100px] top-px w-[46px]" data-name="Pill" />;
}

function Pill2() {
  return <div className="absolute h-[18px] left-[127px] rounded-[100px] top-px w-[46px]" data-name="Pill" />;
}

function Container() {
  return (
    <div className="h-[18px] relative rounded-[81px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#f2eeea] border-solid inset-0 pointer-events-none rounded-[81px]" />
    </div>
  );
}

function Avatar() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[2px] rounded-[100px] size-[16px] top-[2px]" data-name="Avatar">
      <Container />
    </div>
  );
}

function UserPost() {
  return (
    <div className="absolute h-[20px] left-0 top-px w-[173px]" data-name="UserPost">
      <Pill />
      <Pill1 />
      <Pill2 />
      <Avatar />
    </div>
  );
}

function Actions() {
  return <div className="absolute h-[22px] left-[628px] opacity-0 rounded-[2.2px] top-0 w-[20px]" data-name="Actions" />;
}

function UserActions() {
  return (
    <div className="absolute h-[22px] left-0 top-0 w-[648px]" data-name="UserActions">
      <UserPost />
      <Actions />
    </div>
  );
}

function Pill3() {
  return (
    <div className="h-[18px] relative rounded-[100px] shrink-0 w-[147px]" data-name="Pill3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] w-[147px]" />
    </div>
  );
}

function Pill4() {
  return (
    <div className="basis-0 grow h-[18px] min-h-px min-w-px relative rounded-[100px] shrink-0" data-name="Pill3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] w-full" />
    </div>
  );
}

function Frame1597879933() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[18px] items-center left-0 top-[26px] w-[298px]" data-name="Frame1597879933">
      <Pill3 />
      <Pill4 />
    </div>
  );
}

function TopLevel() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="TopLevel">
      <UserActions />
      <Frame1597879933 />
    </div>
  );
}

function Media() {
  return <div className="absolute h-[160px] left-0 rounded-[4px] top-0 w-[240px]" data-name="Media" />;
}

function Pill5() {
  return (
    <div className="h-[18px] relative rounded-[100px] shrink-0 w-[46px]" data-name="Pill5">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] w-[46px]" />
    </div>
  );
}

function Reaction() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[18px] items-center left-0 top-[168px] w-[240px]" data-name="Reaction">
      {[...Array(3).keys()].map((_, i) => (
        <Pill5 key={i} />
      ))}
    </div>
  );
}

function Media1() {
  return (
    <div className="h-[186px] relative shrink-0 w-[240px]" data-name="Media1">
      <Media />
      <Reaction />
    </div>
  );
}

function Pill8() {
  return <div className="h-[18px] rounded-[100px] shrink-0 w-full" data-name="Pill8" />;
}

function Pill9() {
  return <div className="h-[18px] max-w-[240px] rounded-[100px] shrink-0 w-full" data-name="Pill9" />;
}

function Pill10() {
  return (
    <div className="h-[18px] relative rounded-[100px] shrink-0 w-[46px]" data-name="Pill10">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] w-[46px]" />
    </div>
  );
}

function Interactions() {
  return (
    <div className="content-stretch flex h-[18px] items-center justify-between relative shrink-0 w-full" data-name="Interactions">
      {[...Array(2).keys()].map((_, i) => (
        <Pill10 key={i} />
      ))}
    </div>
  );
}

function Comment() {
  return <div className="h-[16px] rounded-[100px] shrink-0 w-full" data-name="Comment" />;
}

function DescriptionComments() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start min-h-px min-w-px relative shrink-0" data-name="DescriptionComments">
      <Pill8 />
      <Pill9 />
      <Interactions />
      <Comment />
      <Pill9 />
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-name="Content">
      <Media1 />
      <DescriptionComments />
    </div>
  );
}

export default function LoadingState() {
  return (
    <div className="relative size-full" data-name="Loading State">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[12px] items-start p-[12px] relative size-full">
          <TopLevel />
          <Content />
        </div>
      </div>
    </div>
  );
}