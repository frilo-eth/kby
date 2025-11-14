import svgPaths from "./svg-ds18dikkvz";
import imgImage from "figma:asset/faaaca905f9885a2f74ea07b2729708f9fddcba3.png";
import imgMedia from "figma:asset/7fe85ae0a00fabb4b701407c9c6d3fc9ecda1774.png";
import imgImage1 from "figma:asset/439247b1ebb4193e9686845f7aaaf7a95abc5bfe.png";
import imgMedia1 from "figma:asset/2ba7e2a4752254b08c18a4a46b62e56667cd2656.png";
import imgImage2 from "figma:asset/5a7f458a9243802df3cff0a20e28b04ed74978b1.png";

function Avatar() {
  return (
    <div className="box-border content-stretch flex items-center p-[2px] relative shrink-0 w-[20px]" data-name="avatar">
      <div className="pointer-events-none relative rounded-[80px] shrink-0 size-[16px]" data-name="image">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[80px] size-full" src={imgImage} />
        <div aria-hidden="true" className="absolute border border-[#ffe2d1] border-solid inset-[-1px] rounded-[81px]" />
      </div>
    </div>
  );
}

function User() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="user">
      <Avatar />
      <p className="font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] leading-[1.15] not-italic relative shrink-0 text-[#8c0200] text-[14px] text-nowrap tracking-[0.28px] whitespace-pre">nath4an</p>
    </div>
  );
}

function Pill() {
  return (
    <div className="bg-[#ffd2b5] box-border content-stretch flex items-center justify-center px-[6px] py-[2px] relative rounded-[100px] shrink-0" data-name="pill">
      <p className="font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#8c0200] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">Meme</p>
    </div>
  );
}

function UserPost() {
  return (
    <div className="content-stretch flex gap-[5px] items-center relative shrink-0" data-name="user-post">
      <User />
      <p className="font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] leading-[1.15] not-italic relative shrink-0 text-[#8b7e6f] text-[14px] text-nowrap tracking-[0.28px] whitespace-pre">2h</p>
      <Pill />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="icon">
          <path d={svgPaths.p3943ff00} id="icon_2" stroke="var(--stroke-0, #0D0B08)" strokeLinecap="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="box-border content-stretch flex gap-[2px] items-center p-[2px] relative rounded-[1px] shrink-0" data-name="button">
      <Icon />
    </div>
  );
}

function Actions() {
  return (
    <div className="content-stretch flex gap-[8.8px] h-[22px] items-center relative rounded-[2.2px] shrink-0" data-name="actions">
      <Button />
    </div>
  );
}

function UserActions() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="user-actions">
      <UserPost />
      <Actions />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 text-[20px] text-nowrap whitespace-pre">
      <p className="font-['Neue_Haas_Grotesk_Display:Medium',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#342c24] tracking-[-0.4px]">Thinck boutet</p>
      <p className="font-['Geist_Mono:Regular',_sans-serif] font-normal leading-[24px] relative shrink-0 text-[#6d6153] uppercase">$THINCK</p>
    </div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex gap-[8px] items-end relative shrink-0 w-full" data-name="header">
      <Frame4 />
    </div>
  );
}

function TopLevel() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="top-level">
      <UserActions />
      <Header />
    </div>
  );
}

function Media() {
  return (
    <div className="box-border content-stretch flex gap-[12px] items-start justify-end overflow-clip p-[12px] relative rounded-[4px] shrink-0 size-[400px]" data-name="media">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[4px] size-full" src={imgMedia} />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_18_4266)" id="icon">
          <path d={svgPaths.p24c5700} id="icon_2" stroke="var(--stroke-0, #6D6153)" strokeLinecap="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_18_4266">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="box-border content-stretch flex gap-[2px] items-center p-[2px] relative rounded-[1px] shrink-0" data-name="button">
      <Icon1 />
      <p className="font-['Neue_Haas_Grotesk_Display:Medium',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#6d6153] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">1,23K</p>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="icon">
          <path d={svgPaths.p7124f80} id="icon_2" stroke="var(--stroke-0, #6D6153)" strokeLinecap="square" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="box-border content-stretch flex gap-[2px] items-center p-[2px] relative rounded-[1px] shrink-0" data-name="button">
      <Icon2 />
      <p className="font-['Neue_Haas_Grotesk_Display:Medium',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#6d6153] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">$124,53K</p>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="icon">
          <path d={svgPaths.p34c8bb00} id="icon_2" stroke="var(--stroke-0, #6D6153)" strokeLinecap="square" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="box-border content-stretch flex gap-[2px] items-center p-[2px] relative rounded-[1px] shrink-0" data-name="button">
      <Icon3 />
      <p className="font-['Neue_Haas_Grotesk_Display:Medium',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#6d6153] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">56%</p>
    </div>
  );
}

function Frame() {
  return <div className="bg-gradient-to-r from-[#0d3e2d] h-full rounded-[8px] to-[#a6f2d5] via-50% via-[#41e4a7] w-[113px]" />;
}

function Frame3() {
  return (
    <div className="backdrop-blur-[1px] backdrop-filter basis-0 bg-[#eee7df] grow h-[8px] min-h-px min-w-px relative rounded-[8px] shrink-0">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[8px] items-start justify-between pl-0 pr-[4px] py-0 relative w-full">
          <div className="basis-0 flex grow items-center justify-center min-h-px min-w-px relative shrink-0">
            <div className="flex-none h-full rotate-[180deg]">
              <Frame />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Reaction() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="reaction">
      <Button1 />
      <Button2 />
      <Button3 />
      <Frame3 />
    </div>
  );
}

function Media1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-name="media">
      <Media />
      <Reaction />
    </div>
  );
}

function Icon4() {
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

function Button4() {
  return (
    <div className="box-border content-stretch flex gap-[2px] items-center p-[4px] relative rounded-[1px] shrink-0" data-name="button">
      <p className="font-['Neue_Haas_Grotesk_Display:Medium',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#1a150f] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">Popular</p>
      <Icon4 />
    </div>
  );
}

function Button5() {
  return (
    <div className="box-border content-stretch flex gap-[2px] items-center p-[4px] relative rounded-[1px] shrink-0" data-name="button">
      <p className="font-['Neue_Haas_Grotesk_Display:Medium',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#8c0200] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">[ Reply ]</p>
    </div>
  );
}

function Interactions() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="interactions">
      <Button4 />
      <Button5 />
    </div>
  );
}

function Avatar1() {
  return (
    <div className="box-border content-stretch flex items-center p-[2px] relative shrink-0 w-[20px]" data-name="avatar">
      <div className="pointer-events-none relative rounded-[80px] shrink-0 size-[16px]" data-name="image">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[80px] size-full" src={imgImage1} />
        <div aria-hidden="true" className="absolute border border-[#ffe2d1] border-solid inset-[-1px] rounded-[81px]" />
      </div>
    </div>
  );
}

function User1() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="user">
      <Avatar1 />
      <p className="font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#8c0200] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">dani3l69</p>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="icon">
          <path d={svgPaths.p11f76c00} fill="var(--fill-0, #6D6153)" id="icon_2" />
        </g>
      </svg>
    </div>
  );
}

function XStamp() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0" data-name="x-stamp">
      <Icon5 />
    </div>
  );
}

function XId() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="x-id">
      <p className="font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#6d6153] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">2 h ago</p>
      <XStamp />
    </div>
  );
}

function Top() {
  return (
    <div className="basis-0 content-stretch flex gap-[6px] grow items-center min-h-px min-w-px relative shrink-0" data-name="top">
      <User1 />
      <XId />
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="icon">
          <path d={svgPaths.p3943ff00} id="icon_2" stroke="var(--stroke-0, #0D0B08)" strokeLinecap="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="box-border content-stretch flex gap-[2px] items-center p-[2px] relative rounded-[1px] shrink-0" data-name="button">
      <Icon6 />
    </div>
  );
}

function UserStv() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="user+stv">
      <Top />
      <Button6 />
    </div>
  );
}

function Media2() {
  return (
    <div className="box-border content-stretch flex gap-[12px] items-start justify-end overflow-clip p-[12px] relative rounded-[2px] shrink-0 size-[56px]" data-name="media">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[2px] size-full" src={imgMedia1} />
    </div>
  );
}

function Icon7() {
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

function Button7() {
  return (
    <div className="box-border content-stretch flex gap-[2px] items-center p-[2px] relative rounded-[1px] shrink-0" data-name="button">
      <Icon7 />
      <p className="font-['Neue_Haas_Grotesk_Display:Medium',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#8c0200] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">1,200</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start min-h-px min-w-px relative self-stretch shrink-0">
      <p className="[white-space-collapse:collapse] basis-0 font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] grow leading-[1.2] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#342c24] text-[12px] text-nowrap tracking-[0.24px] w-[156px]">{`>> dunno, maybe going up? 👀`}</p>
      <Button7 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
      <Media2 />
      <Frame1 />
    </div>
  );
}

function Comment() {
  return (
    <div className="bg-[#f2eeea] relative rounded-[4px] shrink-0 w-full" data-name="comment">
      <div aria-hidden="true" className="absolute border border-[#eee7df] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[4px] items-start p-[8px] relative w-full">
          <UserStv />
          <Frame5 />
        </div>
      </div>
    </div>
  );
}

function Avatar2() {
  return (
    <div className="box-border content-stretch flex items-center p-[2px] relative shrink-0 w-[20px]" data-name="avatar">
      <div className="pointer-events-none relative rounded-[80px] shrink-0 size-[16px]" data-name="image">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[80px] size-full" src={imgImage2} />
        <div aria-hidden="true" className="absolute border border-[#ffe2d1] border-solid inset-[-1px] rounded-[81px]" />
      </div>
    </div>
  );
}

function User2() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="user">
      <Avatar2 />
      <p className="font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#8c0200] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">p3dr0u</p>
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="icon">
          <path d={svgPaths.p2a44c280} fill="var(--fill-0, #6D6153)" id="icon_2" />
        </g>
      </svg>
    </div>
  );
}

function XStamp1() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0" data-name="x-stamp">
      <Icon8 />
    </div>
  );
}

function XId1() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="x-id">
      <p className="font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#6d6153] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">2 h ago</p>
      <XStamp1 />
    </div>
  );
}

function Top1() {
  return (
    <div className="basis-0 content-stretch flex gap-[6px] grow items-center min-h-px min-w-px relative shrink-0" data-name="top">
      <User2 />
      <XId1 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="icon">
          <path d={svgPaths.p3943ff00} id="icon_2" stroke="var(--stroke-0, #0D0B08)" strokeLinecap="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div className="box-border content-stretch flex gap-[2px] items-center p-[2px] relative rounded-[1px] shrink-0" data-name="button">
      <Icon9 />
    </div>
  );
}

function UserStv1() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="user+stv">
      <Top1 />
      <Button8 />
    </div>
  );
}

function Media3() {
  return (
    <div className="relative rounded-[2px] shrink-0 size-[56px]" data-name="media">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[2px] size-full" src={imgMedia1} />
    </div>
  );
}

function Icon10() {
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

function Button9() {
  return (
    <div className="box-border content-stretch flex gap-[2px] items-center p-[2px] relative rounded-[1px] shrink-0" data-name="button">
      <Icon10 />
      <p className="font-['Neue_Haas_Grotesk_Display:Medium',_sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#8c0200] text-[12px] text-nowrap tracking-[0.24px] whitespace-pre">1,200</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start min-h-px min-w-px relative self-stretch shrink-0">
      <p className="[white-space-collapse:collapse] basis-0 font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] grow leading-[1.2] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#342c24] text-[12px] text-nowrap tracking-[0.24px] w-[156px]">{`>> dunno, maybe going up? 👀`}</p>
      <Button9 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
      <Media3 />
      <Frame2 />
    </div>
  );
}

function Comment1() {
  return (
    <div className="bg-[#f2eeea] relative rounded-[4px] shrink-0 w-full" data-name="comment">
      <div aria-hidden="true" className="absolute border border-[#eee7df] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[4px] items-start p-[8px] relative w-full">
          <UserStv1 />
          <Frame6 />
        </div>
      </div>
    </div>
  );
}

function Comments() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="comments">
      <Comment />
      <Comment1 />
    </div>
  );
}

function DescriptionComments() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[271px] items-start relative shrink-0 w-full" data-name="description+comments">
      <div className="font-['Neue_Haas_Grotesk_Display:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#50463b] text-[0px] tracking-[0.28px] w-full">
        <p className="leading-[1.15] mb-0 text-[14px]">{`I'm sure this token will sink because it was created using a bot.`}</p>
        <p className="leading-[1.15] text-[14px]">
          The bot found the contract BEFORE the project was shown to...<span className="font-['Neue_Haas_Grotesk_Display:Medium',_sans-serif] not-italic tracking-[0.28px]"> </span>
          <span className="font-['Neue_Haas_Grotesk_Display:Medium',_sans-serif] not-italic text-[#342c24] tracking-[0.28px]">more</span>
        </p>
      </div>
      <Interactions />
      <Comments />
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="content">
      <Media1 />
      <DescriptionComments />
    </div>
  );
}

export default function ThreadV() {
  return (
    <div className="bg-neutral-50 relative size-full" data-name="thread-v4">
      <div aria-hidden="true" className="absolute border-[#ffd2b5] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[12px] items-start p-[12px] relative size-full">
          <TopLevel />
          <Content />
        </div>
      </div>
    </div>
  );
}