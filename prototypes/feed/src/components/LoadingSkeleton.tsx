import { motion } from "motion/react";

function Pill({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-[#f2eeea] rounded-[100px] ${className}`}>
      <motion.div
        className="h-full w-full rounded-[100px] bg-gradient-to-r from-transparent via-white/40 to-transparent"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "linear",
        }}
      />
    </div>
  );
}

function SkeletonBox({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-[#f2eeea] relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "linear",
        }}
      />
    </div>
  );
}

function TopLevel() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="TopLevel">
      <div className="absolute h-[20px] left-0 top-px w-[173px]" data-name="UserPost">
        <Pill className="absolute h-[18px] left-[25px] top-px w-[46px]" />
        <Pill className="absolute h-[18px] left-[76px] top-px w-[46px]" />
        <Pill className="absolute h-[18px] left-[127px] top-px w-[46px]" />
        <div className="absolute content-stretch flex flex-col items-start left-[2px] rounded-[100px] size-[16px] top-[2px]" data-name="Avatar">
          <SkeletonBox className="h-[18px] rounded-[81px] w-full" />
        </div>
      </div>
      <div className="absolute content-stretch flex gap-[4px] h-[18px] items-center left-0 top-[26px] w-[298px]">
        <Pill className="h-[18px] w-[147px]" />
        <Pill className="h-[18px] flex-1" />
      </div>
    </div>
  );
}

function Media1() {
  return (
    <div className="h-[186px] relative shrink-0 w-[240px]" data-name="Media1">
      <SkeletonBox className="absolute h-[160px] left-0 rounded-[4px] top-0 w-[240px]" />
      <div className="absolute content-stretch flex gap-[8px] h-[18px] items-center left-0 top-[168px] w-[240px]">
        <Pill className="h-[18px] w-[46px]" />
        <Pill className="h-[18px] w-[46px]" />
        <Pill className="h-[18px] w-[46px]" />
      </div>
    </div>
  );
}

function DescriptionComments() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start min-h-px min-w-px relative shrink-0" data-name="DescriptionComments">
      <Pill className="h-[18px] w-full" />
      <Pill className="h-[18px] max-w-[240px] w-full" />
      <div className="content-stretch flex h-[18px] items-center justify-between relative shrink-0 w-full">
        <Pill className="h-[18px] w-[46px]" />
        <Pill className="h-[18px] w-[46px]" />
      </div>
      <Pill className="h-[16px] w-full" />
      <Pill className="h-[18px] max-w-[240px] w-full" />
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

export default function LoadingStateSkeleton() {
  return (
    <div className="relative w-full" data-name="Loading State">
      <div className="w-full">
        <div className="box-border content-stretch flex flex-col gap-[12px] items-start p-[12px] relative w-full">
          <TopLevel />
          <Content />
        </div>
      </div>
    </div>
  );
}
