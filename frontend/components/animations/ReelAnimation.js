import gsap from "gsap";

export const animateReelHover = (element, isEntering) => {
  if (!element) return;
  
  gsap.to(element, {
    width: isEntering ? "100%" : "0%",
    duration: 0.5,
    ease: "power2.inOut",
  });
};

export const animateReelActive = (element, isActive) => {
  if (!element) return;
  
  gsap.to(element, {
    height: isActive ? "auto" : 0,
    opacity: isActive ? 1 : 0,
    duration: 0.5,
    ease: "power3.inOut",
  });
};