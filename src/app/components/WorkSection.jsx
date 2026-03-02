"use client";

import ReelPlayer from "./ReelPlayer";
import { useState } from "react";

export default function WorkSection() {
  return (
    <div className="flex flex-col gap-5 sm:h-screen p-5 box-border overflow-hidden">
      <WorkNav />
      <ShowWork />
    </div>
  );
}

function WorkNav() {
  return (
    <div className="shrink-0 h-[8vh] bg-secondaryBlack w-full rounded-[20px]"></div>
  );
}

function ShowWork() {
  const [reelNo, setReelNo] = useState(0);
  const Reels = [
    {
      title: "Road To Programming",
      link: "rXGZw9KD",
      description:
        "Level up your web dev game with these essential React hooks for managing state and side effects.",
    },
    {
      title: "Codemates",
      link: "7DNKdPWX",
      description:
        "Hit your macros and smash this 6-day Push Pull Legs routine designed for building muscle while burning fat.",
    },
    {
      title: "Idea Hackathon Teaser",
      link: "AJE7aR8D",
      description:
        "Starting the journey of amateur telescope making. Patience and the right grit are key!",
    },
    {
      title: "Idea Hackathon Phase One ",
      link: "nOYY5V1O",
      description:
        "Pushing the limits of modern gaming and seeing how far this GPU can go without thermal throttling.",
    },
  ];

  return (
    <div className="flex-1 flex flex-col lg:flex-row w-full gap-5 lg:overflow-hidden sm:p-2 lg:p-0">
      <div className="flex-1 flex flex-col gap-2 items-center bg-secondaryBlack rounded-[20px] p-4 min-h-120 lg:h-full">
        <div className="w-full text-5xl md:text-7xl lg:text-[7rem] tracking-tighter lg:-tracking-[7px] overflow-hidden leading-none shrink-0">
          Reels
        </div>

        <div className="bg-foreground h-0.5 w-[98%] shrink-0 mt-2 lg:mt-0"></div>

        <div className="flex flex-col gap-1 mt-3 w-full h-full overflow-y-scroll select-none cursor-pointer">
          {Reels.map((reel, ind) => {
            return (
              <ReelButton
                key={ind}
                reel={reel}
                onClick={() => setReelNo(ind)}
              />
            );
          })}
        </div>
      </div>

      <ReelPlayer index={reelNo} reels={Reels} />
    </div>
  );
}

function ReelButton({ reel, onClick }) {
  return (
    <div
      className="bg-[#1D1D1D] h-14 w-full px-4 flex items-center rounded-[10px]"
      onClick={onClick}
    >
      <div className="truncate text-3xl">{reel.title}</div>
    </div>
  );
}
