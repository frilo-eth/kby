/**
 * @figmaAssetKey ffde77e68ebee2fdf2bd4094ed8eb652c5118874
 */
function VidProgress({ className }: { className?: string }) {
  return (
    <div className={className} data-name="vid-progress">
      <div className="basis-0 flex grow items-center justify-center min-h-px min-w-px relative shrink-0">
        <div className="flex-none h-full rotate-[180deg]">
          <div className="bg-gradient-to-r from-[#0040a1] h-full to-[#97d6ff] via-50% via-[#187bf5] w-[36px]" />
        </div>
      </div>
    </div>
  );
}

export default function VidProgress1() {
  return <VidProgress className="backdrop-blur-[1px] backdrop-filter bg-[#000924] relative size-full" />;
}