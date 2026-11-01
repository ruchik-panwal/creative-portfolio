import { useRef } from "react";
import { useHeroAnimation } from "./animations/useHeroAnimation"; 
import Navbar from "./navbar";
import DitherEffect from "@/components/Dither";
import HeroTitle from "./HeroTitle"; // Adjust the import path as needed

export default function Hero({ onLoadComplete, isLoaded }) {
  const containerRef = useRef(null);
  const innerRef = useRef(null);

  useHeroAnimation(containerRef, innerRef, isLoaded);

  return (
    <div ref={containerRef} className="flex flex-col gap-5 h-screen p-0 overflow-hidden relative">
      {/* <Navbar /> */}
      <div 
        ref={innerRef} 
        className="flex-1 w-full bg-secondaryBlack relative overflow-hidden"
        style={{ borderRadius: '0px' }} 
      >
        
        <DitherEffect imageUrl="/HeroImg.png" onLoadComplete={onLoadComplete} isLoaded={isLoaded} />

        <div 
          className={`absolute inset-0 bg-secondaryBlack transition-opacity duration-1000 ease-in-out z-10 cursor-shrink dot-shrink cursor-none ${
            isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
          }`} 
        />

      </div>
      
      <HeroTitle isLoaded={isLoaded} />
    </div>
  );
}