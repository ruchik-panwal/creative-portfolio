"use client";

import Script from "next/script";
import { useGSAP } from "@gsap/react";
import { useState, useRef } from "react";
import { FaLink } from "react-icons/fa6";
import {
  animateReelHover,
  animateReelActive,
} from "../../animations/ReelAnimation"; // Update path if needed

export function ReelPlayer({ index, reels }) {
  const [isMuted, setIsMuted] = useState(true); // Initial page load stays muted
  const [prevIndex, setPrevIndex] = useState(index);

  // Unmute when changing to a NEW video (user clicked a button)
  if (index !== prevIndex) {
    setPrevIndex(index);
    setIsMuted(false); 
  }

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <div className="relative w-full max-w-87.5 mx-auto aspect-9/16 shrink-0 lg:h-full lg:max-w-none lg:w-auto bg-secondaryBlack rounded-[20px] overflow-hidden cursor-shrink dot-shrink">
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

export function ReelButton({ reel, ind, reelNo, onClick }) {
  const containerRef = useRef();
  const hoverBgRef = useRef();
  const descRef = useRef();

  const { contextSafe } = useGSAP({ scope: containerRef });

  // 1. Move isActive out so it can be used in the JSX and the hook
  const isActive = reelNo === ind;

  // 2. Hover Animation (Background) triggered via contextSafe
  const toggleHover = contextSafe((isEntering) => {
    animateReelHover(hoverBgRef.current, isEntering);
  });

  // 3. Active State Animation
  useGSAP(() => {
    animateReelActive(descRef.current, isActive);
  }, [isActive]); // Listen to the extracted variable

  return (
    <div
      ref={containerRef}
      // Apply slight white background if active, else default dark background
      className={`relative w-full px-4 flex flex-col rounded-[10px] text-foreground overflow-hidden cursor-pointer shrink-0 transition-colors duration-300 ${
        isActive ? "bg-[#383737]" : "bg-[#1D1D1D]"
      }`}
      onClick={onClick}
      onMouseEnter={() => toggleHover(true)}
      onMouseLeave={() => toggleHover(false)}
    >
      {/* Animated Hover Background */}
      <div
        ref={hoverBgRef}
        className="absolute inset-0 w-0 z-0 bg-white pointer-events-none"
      />

      {/* Main Header (Title & Link) */}
      <div className="w-full h-16 flex items-center justify-between mix-blend-exclusion z-10 shrink-0">
        <div className="truncate text-3xl font-light tracking-tight">
          {reel.title}
        </div>

        {/* Render link button ONLY if reel.link exists and is not an empty string */}
        {reel.link && reel.link.trim() !== "" && (
          <a
            href={reel.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-2 hover:scale-110 transition-transform flex gap-1 justify-center items-center social-link"
          >
            <FaLink className="text-xl" />
          </a>
        )}
      </div>

      <div
        ref={descRef}
        className="h-0 overflow-hidden mix-blend-exclusion z-10"
      >
        <div className="pb-6 pt-2 text-1xl leading-relaxed">
          {reel.description}
        </div>
      </div>
    </div>
  );
}