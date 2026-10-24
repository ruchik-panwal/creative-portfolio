"use client";

import { useState } from "react";

import { ReelPlayer } from "./ReelSection/ReelPlayer";
import ReelSection from "./ReelSection/ReelSection";
import WebDevSection from "./WebDev/WebDevSecrion";
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
      <ShowWork section={section} />
    </div>
  );
}

// Shwing Off
function ShowWork({section}) {
  const [reelNo, setReelNo] = useState(2);

  const sections = ["Reels", "Graphic design", "Web Development"]
  return (
    <div className="flex-1 flex flex-col lg:flex-row w-full gap-5 lg:overflow-hidden sm:p-2 lg:p-0  box-border">
      <div className="flex-1 flex flex-col w-full gap-2 items-center bg-secondaryBlack rounded-[20px] p-4 min-h-120 lg:h-full">
        <div className="w-full text-5xl md:text-7xl lg:text-[7rem] tracking-tighter lg:-tracking-[7px] overflow-hidden leading-none shrink-0">
          {sections[section]}
        </div>

        <div className="bg-foreground h-0.5 w-[98%] shrink-0 mt-2 lg:mt-0"></div>

        <WebDevSection />
        {/* <ReelSection reels={Reels} reelNo={reelNo} setReelNo={setReelNo} /> */}

      </div>

      {/* <ReelPlayer index={reelNo} reels={Reels} /> */}
    </div>
  );
}

