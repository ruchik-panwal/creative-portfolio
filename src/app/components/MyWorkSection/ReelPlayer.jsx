"use client";

import Script from "next/script";
import { useState } from "react";
import { FaLink } from "react-icons/fa6";

export function ReelPlayer({ index, reels }) {
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
        key={`${reels[index].hostId}-${isMuted}`}
        media-id={reels[index].hostId}
        style={{ width: "100%", height: "100%" }}
        autoplay="true"
        controls="false"
        loop="true"
        muted={isMuted ? "true" : "false"}
      ></cinema8-player>
    </div>
  );
}

export function ReelButton({ reel, onClick }) {
  return (
    <div
      className="bg-[#1D1D1D] h-14 w-full px-4 flex items-center justify-between rounded-[10px]"
      onClick={onClick}
    >
      <div className="truncate text-3xl">{reel.title}</div>
      <div className=" flex items-center justify-end gap-2">
        <a
          href={reel.link}
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 aspect-square flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <FaLink className="text-2xl" />
        </a>
      </div>
    </div>
  );
}
