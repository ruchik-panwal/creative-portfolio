import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function HeroTitle({ isLoaded }) {
  const fillRef = useRef(null);

  useGSAP(() => {
    if (!isLoaded) {
      // Animate the white text revealing from left to right
      // inset(top right bottom left) -> 100% on the right means it's fully hidden to start
      gsap.fromTo(
        fillRef.current,
        { clipPath: "inset(0% 100% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)", // 0% on the right means it's fully revealed
          duration: 3, // Perfectly matches your 3-second loader timeout
          ease: "power2.inOut",
        }
      );
    } else {
      // Safety catch: guarantee the text stays fully white when loading is done
      gsap.to(fillRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.5,
        ease: "power3.out"
      });
    }
  }, [isLoaded]);

  return (
    <div className="absolute bottom-5 left-20 text-[150px] font-black tracking-[-10%] select-none z-20">
      
      {/* 1. Base Layer (Faded grey/translucent background text) */}
      <div className="text-[#6c6c6c]">
        Ruchik Panwal
      </div>

      {/* 2. Top Layer (Solid white, gets animated from left to right) */}
      <div 
        ref={fillRef} 
        className="text-white absolute top-0 left-0 whitespace-nowrap"
        style={{ clipPath: "inset(0% 100% 0% 0%)" }} // Prevent flash before GSAP kicks in
      >
        Ruchik Panwal
      </div>
      
    </div>
  );
}