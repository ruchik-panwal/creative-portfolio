import gsap from "gsap";

export const animateSectionTextOut = (element, onCompleteCallback) => {
  return gsap.to(element, {
    yPercent: 120,
    duration: 0.6,
    ease: "expo.inOut",
    onComplete: onCompleteCallback,
  });
};

export const animateSectionTextIn = (element) => {
  return gsap.fromTo(
    element,
    { yPercent: -120 },
    { 
      yPercent: 0, 
      duration: 0.8,
      ease: "expo.out" 
    }
  );
};

export const animatePlayerIn = (element) => {
  return gsap.fromTo(
    element,
    { width: 0 }, 
    { 
      width: "auto", 
      duration: 1.2, 
      ease: "expo.out",
      clearProps: "width" 
    } 
  );
};

export const animatePlayerOut = (element, onCompleteCallback) => {
  return gsap.to(element, {
    width: 0,
    duration: 0.8,
    ease: "expo.inOut",
    onComplete: onCompleteCallback, 
  });
};

// UPDATED: Content disappearing to the left
export const animateContentOut = (element) => {
  return gsap.to(element, {
    xPercent: -100, // Slides entirely out to the left
    duration: 0.6, 
    ease: "expo.inOut",
  });
};

// UPDATED: Content appearing from the right
export const animateContentIn = (element) => {
  return gsap.fromTo(
    element,
    { xPercent: 100 }, // Starts fully pushed out to the right
    { 
      xPercent: 0, 
      duration: 0.8, 
      ease: "expo.out",
      clearProps: "transform" // Crucial: removes the GSAP transform after finishing so your layout stays responsive
    }
  );
};