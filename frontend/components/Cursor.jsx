"use client";

import { useEffect, useRef } from "react";
import { initCursorAnimation } from "./animations/CursorAnimation";

export default function Cursor() {
  const innerRef = useRef(null);
  const outerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const cleanup = initCursorAnimation(
      innerRef.current,
      outerRef.current,
      textRef.current,
    );
    return cleanup;
  }, []);

  return (
    <>
      {/* Outer Circle */}
      <div
        ref={outerRef}
        // Added border-white and mix-blend-difference
        className="fixed w-8 h-8 rounded-full border border-white pointer-events-none flex items-center justify-center overflow-hidden z-9999 opacity-0 scale-0 "
      >
        <span
          ref={textRef}
          className="text-[25px] tracking-tighter text-white opacity-0 translate-y-3.75"
        ></span>
      </div>

      {/* Inner Dot */}
      <div
        ref={innerRef}
        // Added bg-white and mix-blend-difference
        className="fixed w-1.5 h-1.5 rounded-full pointer-events-none z-9999 bg-white opacity-0"
      />
    </>
  );
}