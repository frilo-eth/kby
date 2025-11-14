import svgPaths from "./svg-01q4wve5uj";
import imgImage from "figma:asset/439247b1ebb4193e9686845f7aaaf7a95abc5bfe.png";

function Layer1() {
  return (
    <div className="h-[36px] relative shrink-0 w-[94.662px]" data-name="Layer_1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 95 36">
        <g clipPath="url(#clip0_1_1946)" id="Layer_1">
          <path d={svgPaths.p1312cd00} fill="var(--fill-0, #8C0200)" id="Vector" />
          <path d={svgPaths.p393b3b80} fill="var(--fill-0, #8C0200)" id="Vector_2" />
          <path d={svgPaths.p21fcad80} fill="var(--fill-0, #8C0200)" id="Vector_3" />
          <path d={svgPaths.p8a3f240} fill="var(--fill-0, #8C0200)" id="Vector_4" />
          <path d={svgPaths.p117edf00} fill="var(--fill-0, #8C0200)" id="Vector_5" />
          <path d={svgPaths.pc54bc0} fill="var(--fill-0, #8C0200)" id="Vector_6" />
          <path d={svgPaths.p22f6d900} fill="var(--fill-0, #8C0200)" id="Vector_7" />
        </g>
        <defs>
          <clipPath id="clip0_1_1946">
            <rect fill="white" height="36" width="94.6616" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame1597879971() {
  return (
    <div className="content-stretch flex gap-[7.2px] items-center relative shrink-0">
      <Layer1 />
    </div>
  );
}

function Logo() {
  return (
    <div className="content-stretch flex gap-[36px] items-center relative shrink-0" data-name="logo">
      <Frame1597879971 />
    </div>
  );
}

function Logo1() {
  return (
    <div className="box-border content-stretch flex gap-[40px] h-full items-center px-0 py-[16px] relative shrink-0" data-name="logo">
      <div aria-hidden="true" className="absolute border-[#ffb38b] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <Logo />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="icon">
          <path d={svgPaths.p2e26297} id="icon_2" stroke="var(--stroke-0, white)" strokeLinecap="square" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#8c0200] box-border content-stretch flex gap-[4px] items-center p-[8px] relative rounded-[1px] shrink-0" data-name="button">
      <p className="capitalize font-['Neue_Haas_Grotesk_Display:Medium',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[14px] text-nowrap text-white tracking-[0.28px] whitespace-pre">Create token</p>
      <Icon />
    </div>
  );
}

function Avatar1() {
  return (
    <div className="box-border content-stretch flex items-center p-[2px] relative shrink-0 w-[20px]" data-name="avatar">
      <div className="pointer-events-none relative rounded-[80px] shrink-0 size-[16px]" data-name="image">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[80px] size-full" src={imgImage} />
        <div aria-hidden="true" className="absolute border border-[#ffe2d1] border-solid inset-[-1px] rounded-[81px]" />
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[4px] items-center p-[8px] relative rounded-[1px] shrink-0" data-name="button">
      <div aria-hidden="true" className="absolute border-[#8c0200] border-[1.5px] border-solid inset-0 pointer-events-none rounded-[1px]" />
      <Avatar1 />
      <p className="capitalize font-['Neue_Haas_Grotesk_Display:Medium',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[#8c0200] text-[14px] text-nowrap tracking-[0.28px] whitespace-pre">0x635e...9739</p>
    </div>
  );
}

function Actions() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0" data-name="actions">
      <Button />
      <Button1 />
    </div>
  );
}

function Container() {
  return (
    <div className="basis-0 content-stretch flex grow items-start justify-end min-h-px min-w-px relative shrink-0" data-name="container">
      <Actions />
    </div>
  );
}

function Ctas() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="ctas">
      <div className="box-border content-stretch flex gap-[16px] items-center justify-center overflow-clip px-0 py-[16px] relative rounded-[inherit] size-full">
        <Container />
      </div>
      <div aria-hidden="true" className="absolute border-[#ffd2b5] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container1() {
  return (
    <div className="basis-0 grow h-full max-w-[768px] min-h-px min-w-px relative shrink-0" data-name="container">
      <div className="flex flex-row items-center max-w-inherit size-full">
        <div className="box-border content-stretch flex items-center justify-between max-w-inherit px-[12px] py-0 relative size-full">
          <Logo1 />
          <Ctas />
        </div>
      </div>
    </div>
  );
}

function NavBar() {
  return (
    <div className="content-stretch flex h-[68px] items-start justify-center relative shrink-0 w-full" data-name="nav-bar">
      <div aria-hidden="true" className="absolute border-[#ffd2b5] border-[0px_0px_1px] border-solid bottom-[-0.5px] left-0 pointer-events-none right-0 top-0" />
      <Container1 />
    </div>
  );
}

function Tab() {
  return (
    <div className="bg-[#ffe2d1] box-border content-stretch flex gap-[4px] h-full items-center p-[8px] relative shrink-0" data-name="tab">
      <p className="font-['Neue_Haas_Grotesk_Display:Medium',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#6d6153] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">All</p>
    </div>
  );
}

function Tab1() {
  return (
    <div className="bg-[#ffe2d1] box-border content-stretch flex gap-[4px] h-full items-center p-[8px] relative shrink-0" data-name="tab">
      <p className="font-['Neue_Haas_Grotesk_Display:Medium',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#8c0200] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">Memes</p>
    </div>
  );
}

function Tab2() {
  return (
    <div className="bg-[#ffe2d1] box-border content-stretch flex gap-[4px] h-full items-center p-[8px] relative shrink-0" data-name="tab">
      <p className="font-['Neue_Haas_Grotesk_Display:Medium',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#6d6153] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">Dares</p>
    </div>
  );
}

function Tab3() {
  return (
    <div className="bg-[#ffe2d1] box-border content-stretch flex gap-[4px] h-full items-center p-[8px] relative shrink-0" data-name="tab">
      <p className="font-['Neue_Haas_Grotesk_Display:Medium',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#6d6153] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">Questions</p>
    </div>
  );
}

function TabSelector() {
  return (
    <div className="basis-0 bg-[#ffe2d1] grow h-full min-h-px min-w-px relative shrink-0" data-name="tab-selector">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center px-[4px] py-0 relative size-full">
          <Tab />
          <Tab1 />
          <Tab2 />
          <Tab3 />
        </div>
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="icon">
          <path d={svgPaths.p33b99f80} id="icon_2" stroke="var(--stroke-0, #8C0200)" strokeLinecap="square" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Left() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="left">
      <Icon6 />
      <p className="font-['Neue_Haas_Grotesk_Display:Medium',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#8c0200] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">Sort</p>
    </div>
  );
}

function Frame1597879561() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
      <Left />
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="icon">
          <path d={svgPaths.p2ee40c80} id="icon_2" stroke="var(--stroke-0, #8C0200)" strokeLinecap="square" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="box-border content-stretch flex gap-[2px] items-center p-[2px] relative rounded-[1px] shrink-0" data-name="button">
      <Icon7 />
    </div>
  );
}

function UserStv() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0" data-name="user+stv">
      <Frame1597879561 />
      <Button3 />
    </div>
  );
}

function ModalHead() {
  return (
    <div className="bg-[#ffe2d1] box-border content-stretch flex flex-col h-[36px] items-start justify-between px-[16px] py-[8px] relative shrink-0" data-name="modal-head">
      <UserStv />
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="icon">
          <path d={svgPaths.p310d5600} id="icon_2" stroke="var(--stroke-0, #8C0200)" strokeLinecap="square" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Left1() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="left">
      <Icon9 />
      <p className="font-['Neue_Haas_Grotesk_Display:Medium',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#8c0200] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">Search</p>
    </div>
  );
}

function Frame1597879562() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow items-center min-h-px min-w-px relative shrink-0">
      <Left1 />
    </div>
  );
}

function Button5() {
  return <div className="box-border content-stretch flex gap-[2px] items-center p-[2px] rounded-[1px] shrink-0" data-name="button" />;
}

function UserStv1() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="user+stv">
      <Frame1597879562 />
      <Button5 />
    </div>
  );
}

function ModalHead1() {
  return (
    <div className="basis-0 bg-[#ffe2d1] grow h-[36px] min-h-px min-w-px relative shrink-0" data-name="modal-head">
      <div aria-hidden="true" className="absolute border-[#ffd2b5] border-[0px_0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] h-[36px] items-start justify-center px-[16px] py-[8px] relative w-full">
          <UserStv1 />
        </div>
      </div>
    </div>
  );
}

function Search() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-[276px]" data-name="search">
      <ModalHead />
      <ModalHead1 />
    </div>
  );
}

function Container2() {
  return (
    <div className="basis-0 bg-[#ffe2d1] grow max-w-[768px] min-h-px min-w-px relative shrink-0" data-name="container">
      <div className="content-stretch flex items-center max-w-inherit overflow-clip relative rounded-[inherit] w-full">
        <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
          <TabSelector />
        </div>
        <Search />
      </div>
      <div aria-hidden="true" className="absolute border border-[#ffd2b5] border-solid inset-[-0.5px] pointer-events-none" />
    </div>
  );
}

function Filterbar() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="filterbar">
      <Container2 />
    </div>
  );
}

function Feed() {
  return (
    <div className="basis-0 grow max-w-[768px] min-h-px min-w-px relative shrink-0 w-full" data-name="feed">
      <div aria-hidden="true" className="absolute border border-[#ffd2b5] border-solid inset-[-0.5px] pointer-events-none" />
    </div>
  );
}

function FeedContainer() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="feed-container">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[20px] items-center justify-center px-[20px] py-0 relative size-full">
          <Feed />
        </div>
      </div>
    </div>
  );
}

function Body() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow h-full items-center min-h-px min-w-px relative shrink-0" data-name="body">
      <FeedContainer />
    </div>
  );
}

function Body1() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0 w-full" data-name="body">
      <Body />
    </div>
  );
}

function Button6() {
  return (
    <div className="box-border content-stretch flex gap-[2px] items-center p-[2px] relative rounded-[1px] shrink-0" data-name="button">
      <p className="font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#6d6153] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">[ Settings ]</p>
    </div>
  );
}

function Button7() {
  return (
    <div className="box-border content-stretch flex gap-[2px] items-center p-[2px] relative rounded-[1px] shrink-0" data-name="button">
      <p className="font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#6d6153] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">[ Legal ]</p>
    </div>
  );
}

function Button8() {
  return (
    <div className="box-border content-stretch flex gap-[2px] items-center p-[2px] relative rounded-[1px] shrink-0" data-name="button">
      <p className="font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#6d6153] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">[ Contact ]</p>
    </div>
  );
}

function Button9() {
  return (
    <div className="box-border content-stretch flex gap-[2px] items-center p-[2px] relative rounded-[1px] shrink-0" data-name="button">
      <p className="font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#6d6153] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">[ Docs ]</p>
    </div>
  );
}

function Frame1597879989() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <Button6 />
      <Button7 />
      <Button8 />
      <Button9 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="icon">
          <path d={svgPaths.p29a61180} fill="var(--fill-0, #0D0B08)" id="icon_2" />
        </g>
      </svg>
    </div>
  );
}

function Button10() {
  return (
    <div className="box-border content-stretch flex gap-[2px] items-center p-[2px] relative rounded-[1px] shrink-0" data-name="button">
      <Icon10 />
    </div>
  );
}

function SecondaryLinks() {
  return (
    <div className="basis-0 content-stretch flex grow items-center justify-between min-h-px min-w-px relative shrink-0" data-name="secondary-links">
      <Frame1597879989 />
      <Button10 />
    </div>
  );
}

function Container3() {
  return (
    <div className="max-w-[768px] relative shrink-0 w-full" data-name="container">
      <div className="flex flex-row items-center max-w-inherit size-full">
        <div className="box-border content-stretch flex gap-[40px] items-center max-w-inherit px-[12px] py-[16px] relative w-full">
          <SecondaryLinks />
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="relative shrink-0 w-full" data-name="footer">
      <div className="content-stretch flex flex-col items-center overflow-clip relative rounded-[inherit] w-full">
        <Container3 />
      </div>
      <div aria-hidden="true" className="absolute border-[#ffd2b5] border-[1px_0px_0px] border-solid bottom-0 left-0 pointer-events-none right-0 top-[-0.5px]" />
    </div>
  );
}

export default function Layout() {
  return (
    <div className="bg-gradient-to-b content-stretch flex flex-col from-[#ffd2b5] items-start relative size-full to-[#fafafa] to-[11.747%]" data-name="layout">
      <NavBar />
      <Filterbar />
      <Body1 />
      <Footer />
    </div>
  );
}