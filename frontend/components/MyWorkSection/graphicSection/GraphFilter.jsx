import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function GraphFilter({ filters, activeIndex, setActiveIndex }) {
  const buttonRefs = useRef([]);

  useEffect(() => {
    buttonRefs.current.forEach((btn, index) => {
      if (!btn) return;

      if (index === activeIndex) {
        // Active clicked state - full glow and white background
        gsap.to(btn, {
          backgroundColor: "#ffffff",
          color: "#000000",
          boxShadow: "0px 0px 10px 4px rgba(255, 255, 255, 0.2)",
          duration: 0.8,
          ease: "power2.inOut",
        });
      } else {
        // Inactive state - resets to default Tailwind classes
        gsap.to(btn, {
          backgroundColor: "", 
          color: "",
          boxShadow: "0px 0px 0px 0px rgba(255, 255, 255, 0)",
          duration: 0.8,
          ease: "power2.inOut",
        });
      }
    });
  }, [activeIndex]);

  return (
    <div className="h-[3vh] w-full flex justify-center my-4 items-center gap-2">
      {filters.map((filter, i) => (
        <button
          ref={(el) => (buttonRefs.current[i] = el)} 
          className="px-2 py-1 bg-background rounded-[5px] cursor-shrink"
          key={i}
          onClick={() => setActiveIndex(i)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}