"use client";

import { ReactLenis } from 'lenis/react';

export default function SmoothScroll({ children }) {
  return (
    <ReactLenis 
      root 
      options={{
        lerp: 0.1, // The "smoothness" factor (lower is smoother, 0.1 is standard)
        duration: 1.5, // How long the scroll animation takes
        smoothWheel: true, // Enables smooth scrolling for mouse wheels
        smoothTouch: false, // Usually best to leave false so mobile feels native
      }}
    >
      {children}
    </ReactLenis>
  );
}