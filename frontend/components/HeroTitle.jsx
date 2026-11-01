import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function HeroTitle({ isLoaded }) {
  const fillRef = useRef(null);

  useGSAP(() => {
    if (!isLoaded) {
      gsap.fromTo(
        fillRef.current,
        { clipPath: "inset(0% 100% 0% 0%)" },
        {
          clipPath: "inset(0% -10% 0% 0%)", // Negative value ensures the final letter isn't clipped
          duration: 3, 
          ease: "power2.inOut",
        }
      );
    } else {
      gsap.to(fillRef.current, {
        clipPath: "inset(0% -10% 0% 0%)",
        duration: 0.5,
        ease: "power3.out"
      });
    }
  }, [isLoaded]);

  return (
    <div className="absolute bottom-5 left-20 text-[150px] font-black tracking-[-10%] select-none z-20">
      
      {/* 1. Base Layer */}
      <div className="text-[#6c6c6c]">
        Ruchik Panwal
      </div>

      {/* 2. Top Layer */}
      <div 
        ref={fillRef} 
        className="text-white absolute top-0 left-0 whitespace-nowrap"
        style={{ clipPath: "inset(0% 100% 0% 0%)" }}
      >
        Ruchik Panwal
      </div>
      
    </div>
  );
}