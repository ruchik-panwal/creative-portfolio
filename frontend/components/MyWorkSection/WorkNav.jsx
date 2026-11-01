import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function WorkNav({ sectionSetter, section }) {
  const btns = ["Content Creation", "Graphic Design", "Web Development"];

  return (
    <div className="shrink-0 flex justify-center items-center gap-5 h-[8vh] bg-secondaryBlack w-full rounded-[20px]">
      {btns.map((btn, ind) => {
        return (
          <NavBtn
            name={btn}
            key={ind}
            onClick={() => sectionSetter(ind)}
            onStatus={section === ind}
          />
        );
      })}
    </div>
  );
}

function NavBtn({ name, onStatus, onClick }) {
  const lineRef = useRef(null);

  useEffect(() => {
    if (onStatus) {
      // Expand from center
      gsap.to(lineRef.current, {
        scaleX: 1,
        duration: 0.4,
        ease: "power3.out",
      });
    } else {
      // Shrink back to center
      gsap.to(lineRef.current, {
        scaleX: 0,
        duration: 0.4,
        ease: "power3.out",
      });
    }
  }, [onStatus]);

  return (
    <button
      onClick={onClick}
      // Added relative positioning and padding bottom to make room for the custom line
      className="relative tracking-tighter text-[2.2vw] cursor-pointer pb-1 increase-circle"
    >
      {name}
      {/* Custom underline element */}
      <span
        ref={lineRef}
        // origin-center forces the scale animation to happen from the middle outwards
        className="absolute bottom-3 left-0 w-full h-0.5 bg-white origin-center scale-x-0"
      />
    </button>
  );
}