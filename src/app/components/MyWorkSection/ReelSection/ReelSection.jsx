import { ReelButton } from "./ReelPlayer";

export default function ReelSection({ reels, reelNo, setReelNo }) {
  return (
    /* 1. Added flex-1 to take up available space
       2. Added min-h-0 to allow the container to be smaller than its content (crucial for scroll)
       3. Changed to overflow-y-auto for a cleaner look
    */
    <div className="flex flex-col gap-2 mt-3 w-full flex-1 min-h-0 overflow-y-auto select-none">
      {reels.map((reel, ind) => (
        <ReelButton
          key={ind}
          reel={reel}
          ind={ind}
          onClick={() => setReelNo(ind)}
          reelNo={reelNo}
        />
      ))}
    </div>
  );
}
