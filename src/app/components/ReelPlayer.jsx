"use client";

import Script from "next/script";
import { useState} from "react";


export default function ReelPlayer({ index, reels }) {
  const [isMuted, setIsMuted] = useState(true);
  const [prevIndex, setPrevIndex] = useState(index);

  // Reset to muted when changing to a NEW video
  if (index !== prevIndex) {
    setPrevIndex(index);
    setIsMuted(true);
  }

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <div className="relative w-full max-w-87.5 mx-auto aspect-9/16 shrink-0 lg:h-full lg:max-w-none lg:w-auto bg-secondaryBlack rounded-[20px] overflow-hidden">
      {/* Custom Mute Toggle Button */}
      <button
        onClick={toggleMute}
        className="absolute top-4 right-4 z-10 px-4 py-2 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white rounded-full transition-all cursor-pointer"
      >
        {isMuted ? "Unmute" : "Mute"}
      </button>

      <Script
        src="https://static-01.cinema8.com/embed/player.js"
        strategy="lazyOnload"
      />

      <cinema8-player
        key={`${reels[index].link}-${isMuted}`}
        media-id={reels[index].link}
        style={{ width: "100%", height: "100%" }}
        autoplay="true"
        controls="false"
        loop="true"
        muted={isMuted ? "true" : "false"} 
      ></cinema8-player>
    </div>
  );
}
