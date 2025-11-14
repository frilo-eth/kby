import { useState } from "react";
import img from "../assets/439247b1ebb4193e9686845f7aaaf7a95abc5bfe.png";

export default function CommentInput() {
  const [isAnon, setIsAnon] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Determine colors based on state
  const getBgColor = () => {
    if (isAnon) return '#ffd2b5';
    if (isHovered) return 'white';
    return '#fafaf9'; // neutral-50
  };

  const getTextColor = () => {
    if (isAnon && isHovered) return '#8c0200';
    if (isAnon) return '#b91a00';
    if (isHovered) return '#50463b';
    return '#6d6153';
  };

  const getBorderColor = () => {
    if (isAnon && isHovered) return '#50463b';
    if (isAnon) return '#6d6153';
    if (isHovered) return '#8b7e6f';
    return '#a99c8d';
  };

  const getToggleBgColor = () => {
    return isAnon ? '#dd4400' : '#f0f0f0';
  };

  const getToggleLabelColor = () => {
    return isAnon ? '#8c0200' : '#8b7e6f';
  };

  return (
    <div 
      className="relative rounded-[2px] size-full cursor-text"
      style={{ 
        backgroundColor: getBgColor(),
        transition: 'background-color 200ms ease-in-out'
      }}
      data-name="comment-input"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        aria-hidden="true" 
        className="absolute border border-solid inset-0 pointer-events-none rounded-[2px]" 
        style={{ 
          borderColor: getBorderColor(),
          transition: 'border-color 200ms ease-in-out'
        }}
      />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[6px] items-start p-[8px] relative size-full">
          <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="input">
            {/* Text and avatar */}
            <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0">
              <div className="content-stretch flex gap-[5px] items-center relative shrink-0">
                {/* Avatar container - always takes up space */}
                <div 
                  className="box-border content-stretch flex items-center p-[2px] relative shrink-0 w-[20px]" 
                  data-name="avatar"
                  style={{
                    opacity: isAnon ? 0 : 1,
                    transform: isAnon ? 'translateX(-8px)' : 'translateX(0px)',
                    transition: 'opacity 200ms ease-in-out, transform 200ms ease-in-out'
                  }}
                >
                  <div className="pointer-events-none relative rounded-[80px] shrink-0 size-[16px]" data-name="image">
                    <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[80px] size-full" src={img} />
                    <div aria-hidden="true" className="absolute border border-[#ffe2d1] border-solid inset-[-1px] rounded-[81px]" />
                  </div>
                </div>
                <p 
                  className="font-['Neue_Haas_Grotesk_Display:Regular',sans-serif] leading-[1.15] not-italic relative shrink-0 text-[14px] text-nowrap tracking-[0.28px] whitespace-pre"
                  style={{ 
                    color: getTextColor(),
                    transform: isAnon ? 'translateX(-20px)' : 'translateX(0px)',
                    transition: 'color 200ms ease-in-out, transform 200ms ease-in-out'
                  }}
                >
                  {`>> join the conversation`}
                </p>
              </div>
            </div>
            
            {/* Anon toggle */}
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
              <p 
                className="font-['Neue_Haas_Grotesk_Display:Regular',sans-serif] leading-none not-italic relative shrink-0 text-[10px] text-nowrap tracking-[0.2px] whitespace-pre"
                style={{ 
                  color: getToggleLabelColor(),
                  transition: 'color 200ms ease-in-out'
                }}
              >
                Anon
              </p>
              <button
                className="content-stretch flex h-[12px] items-center overflow-clip relative rounded-[7499.25px] shrink-0 w-[24px] cursor-pointer"
                data-name="toggle"
                style={{ 
                  backgroundColor: getToggleBgColor(),
                  justifyContent: isAnon ? 'flex-end' : 'flex-start',
                  transition: 'background-color 200ms ease-in-out'
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsAnon(!isAnon);
                }}
              >
                {!isAnon && (
                  <div className="absolute inset-0 rounded-[7499.25px]" data-name="Border">
                    <div aria-hidden="true" className="absolute border-[#ffb38b] border-[0.75px] border-solid inset-0 pointer-events-none rounded-[7499.25px]" />
                  </div>
                )}
                <div 
                  className="relative rounded-[7499.25px] shrink-0 size-[12px]"
                  style={{ 
                    backgroundColor: isAnon ? '#ffd2b5' : '#ffe2d1',
                    transition: 'background-color 200ms ease-in-out, transform 200ms ease-in-out'
                  }}
                  data-name="Button"
                >
                  <div 
                    aria-hidden="true" 
                    className="absolute border-[0.75px] border-solid inset-0 pointer-events-none rounded-[7499.25px] shadow-[0px_0.75px_1.5px_0px_rgba(10,13,18,0.05)]"
                    style={{ 
                      borderColor: isAnon ? '#ff6622' : '#ffd2b5',
                      transition: 'border-color 200ms ease-in-out'
                    }}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}