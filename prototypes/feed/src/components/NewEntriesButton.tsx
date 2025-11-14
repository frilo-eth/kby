import { motion } from "motion/react";

interface NewEntriesButtonProps {
  count: number;
  onClick: () => void;
}

export default function NewEntriesButton({ count, onClick }: NewEntriesButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-screen sm:w-full max-w-[768px] relative shrink-0"
    >
      <button
        onClick={onClick}
        className="bg-[#fafafa] w-full min-h-[48px] relative hover:bg-[#ffe2d1] transition-colors cursor-pointer"
        data-name="action-button"
      >
        <div className="flex items-center justify-center size-full">
          <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[20px] py-[16px] relative w-full">
            <p className="font-['Neue_Haas_Grotesk_Display:Medium',sans-serif] leading-[1.2] not-italic text-[#6d6153] text-[12px] tracking-[0.24px]">
              View {count} new {count === 1 ? 'entry' : 'entries'}
            </p>
          </div>
        </div>
      </button>
      <div aria-hidden="true" className="absolute border border-[#ffd2b5] border-solid inset-[-0.5px] pointer-events-none hidden sm:block" />
    </motion.div>
  );
}
