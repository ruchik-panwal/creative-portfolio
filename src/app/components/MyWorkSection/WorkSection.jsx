"use client";

import { useState } from "react";

import { ReelPlayer, ReelButton } from "./ReelPlayer";
import WorkNav from "./WorkNav";
import Reels from "./data";

// The Main Work Section
export default function WorkSection() {
  const [section, setSection] = useState(0);

  function sectionSetter(ind) {
    setSection(ind);
  }

  return (
    <div className="flex flex-col gap-5 sm:h-screen p-5 box-border overflow-hidden">
      <WorkNav sectionSetter={sectionSetter} section={section} />
      <ShowWork />
    </div>
  );
}

// Shwing Off
function ShowWork() {
  const [reelNo, setReelNo] = useState(2);

  return (
    <div className="flex-1 flex flex-col lg:flex-row w-full gap-5 lg:overflow-hidden sm:p-2 lg:p-0">
      <div className="flex-1 flex flex-col gap-2 items-center bg-secondaryBlack rounded-[20px] p-4 min-h-120 lg:h-full">
        <div className="w-full text-5xl md:text-7xl lg:text-[7rem] tracking-tighter lg:-tracking-[7px] overflow-hidden leading-none shrink-0">
          Reels
        </div>

        <div className="bg-foreground h-0.5 w-[98%] shrink-0 mt-2 lg:mt-0"></div>

        <ReelSection reels={Reels} reelNo={reelNo} setReelNo={setReelNo} />
      </div>

      <ReelPlayer index={reelNo} reels={Reels} />
    </div>
  );
}

function ReelSection({ reels, reelNo, setReelNo }) {
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
