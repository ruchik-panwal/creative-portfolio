import gsap from "gsap";

export const animateHoverFill = (element, isEntering) => {
  return gsap.to(element, {
    scaleX: isEntering ? 1 : 0,
    duration: 0.5,
    ease: "power2.inOut",
  });
};