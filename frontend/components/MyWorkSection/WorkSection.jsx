"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

import { ReelPlayer } from "./ReelSection/ReelPlayer";
import ReelSection from "./ReelSection/ReelSection";
import WebDevSection from "./WebDev/WebDevSecrion";
import WorkNav from "./WorkNav";
import Reels from "./data";
import GraphSection from "@/components/MyWorkSection/graphicSection/GraphSection";

// Import your extracted animations
import { 
  animateSectionTextOut, 
  animateSectionTextIn, 
  animatePlayerIn,
  animatePlayerOut,
  animateContentOut, // <-- Imported new
  animateContentIn   // <-- Imported new
} from "../animations/workAnimations";

export default function WorkSection() {
  const [targetSection, setTargetSection] = useState(0);
  const [renderSection, setRenderSection] = useState(0);
  const sectionRef = useRef(null);

  function sectionSetter(ind) {
    if (ind === targetSection) return;
    setTargetSection(ind);
    
    if (sectionRef.current) {
      const topOffset = sectionRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: topOffset, behavior: "auto" }); 
    }
  }

  return (
    <div 
      ref={sectionRef}
      className={`w-full relative ${
        renderSection === 1 ? "h-auto" : "h-[150vh]" 
      }`}
    >
      <div 
        className={`flex flex-col gap-5 p-5 box-border w-full ${
          renderSection === 1 
            ? "relative min-h-screen h-auto overflow-visible" 
            : "sticky top-0 h-screen overflow-hidden" 
        }`}
      >
        <WorkNav sectionSetter={sectionSetter} section={targetSection} />
        <ShowWork 
          targetSection={targetSection} 
          renderSection={renderSection} 
          setRenderSection={setRenderSection} 
        />
      </div>
    </div>
  );
}

// Showing Off
function ShowWork({ targetSection, renderSection, setRenderSection }) {
  const [reelNo, setReelNo] = useState(2);
  const sections = ["Content Creation", "Graphic Design", "Web Development"];
  
  const textRef = useRef(null);
  const playerRef = useRef(null); 
  const contentRef = useRef(null); // NEW: Ref for the inner content
  const isFirstRender = useRef(true);

  // 1. OUT ANIMATION LOGIC
  useEffect(() => {
    if (targetSection === renderSection) return;

    let ctx = gsap.context(() => {
      // Animate the main content out simultaneously with everything else
      if (contentRef.current) {
        animateContentOut(contentRef.current);
      }

      if (renderSection === 0 && playerRef.current) {
        animateSectionTextOut(textRef.current);
        animatePlayerOut(playerRef.current, () => {
          setRenderSection(targetSection);
        });
      } else {
        animateSectionTextOut(textRef.current, () => {
          setRenderSection(targetSection);
        });
      }
    });

    return () => ctx.revert();
  }, [targetSection, renderSection, setRenderSection]);

  // 2. IN ANIMATION LOGIC
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    let ctx = gsap.context(() => {
      if (targetSection === renderSection) {
        animateSectionTextIn(textRef.current);
        
        // Animate the main content in
        if (contentRef.current) {
          animateContentIn(contentRef.current);
        }
        
        if (renderSection === 0 && playerRef.current) {
          animatePlayerIn(playerRef.current);
        }
      }
    });

    return () => ctx.revert();
  }, [renderSection, targetSection]);

  return (
    <div 
      className={`flex-1 flex flex-col lg:flex-row w-full sm:p-2 lg:p-0 box-border ${
        renderSection === 1 ? "overflow-visible" : "lg:overflow-hidden"
      }`}
    >
      <div 
        className={`flex-1 flex flex-col w-full gap-2 items-center bg-secondaryBlack rounded-[20px] p-4 min-h-125 ${
          renderSection === 1 ? "h-auto" : "lg:h-full"
        }`}
      >
        <div className="w-full text-5xl md:text-7xl lg:text-[7rem] tracking-tighter lg:tracking-[-7px] overflow-hidden leading-none shrink-0 py-2">
          <div ref={textRef} className="inline-block w-full">
            {sections[renderSection]}
          </div>
        </div>

        <div className="bg-foreground h-0.5 w-[98%] shrink-0 mt-2 lg:mt-0"></div>

        {/* NEW: Masking Wrapper */}
        <div className="w-full flex-1 overflow-hidden relative mt-2">
          {/* NEW: Animated content container */}
          <div ref={contentRef} className="w-full h-full">
            {renderSection === 1 && <GraphSection />}
            {renderSection === 2 && <WebDevSection />}
            {renderSection === 0 && <ReelSection reels={Reels} reelNo={reelNo} setReelNo={setReelNo} />}
          </div>
        </div>

      </div>

      {renderSection === 0 && (
        <div ref={playerRef} className="w-full lg:w-auto lg:h-full shrink-0 ml-5 overflow-hidden">
          <ReelPlayer index={reelNo} reels={Reels} />
        </div>
      )}
    </div>
  );
}