import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const useHeroAnimation = (containerRef, innerRef, isLoaded) => {
  useGSAP(() => {
    if (isLoaded && containerRef.current && innerRef.current) {
      const tl = gsap.timeline();

      tl.fromTo(
        containerRef.current,
        { padding: "0px" }, 
        {
          padding: "1.25rem", 
          duration: 1.2,
          ease: "power3.inOut",
        }
      ).fromTo(
        innerRef.current,
        { borderRadius: "0px" }, 
        {
          borderRadius: "20px", 
          duration: 1.2,
          ease: "power3.inOut",
        },
        0 // Starts exactly at the same time as the padding animation
      );
    }
  }, [isLoaded, containerRef, innerRef]);
};