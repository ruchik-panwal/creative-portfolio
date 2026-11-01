import gsap from "gsap";

export const initCursorAnimation = (
  innerElement,
  outerElement,
  textElement,
) => {
  if (!innerElement || !outerElement || !textElement) return;

  // 1. Initial Setup
  gsap.set([innerElement, outerElement], { xPercent: -50, yPercent: -50 });
  gsap.set(outerElement, { scale: 0, opacity: 0 });
  gsap.set(textElement, { display: "none" });

  const setXInner = gsap.quickSetter(innerElement, "x", "px");
  const setYInner = gsap.quickSetter(innerElement, "y", "px");
  const xMoveOuter = gsap.quickTo(outerElement, "x", {
    duration: 0.5,
    ease: "power3.out",
  });
  const yMoveOuter = gsap.quickTo(outerElement, "y", {
    duration: 0.5,
    ease: "power3.out",
  });

  let hasMoved = false;
  
  // NEW: Keep track of the active timeline so we can kill it completely
  let hoverTl = null; 

  // 2. Hover Effect Definitions
  const effects = {
    socialLink: {
      enter: (target) => {
        // Kill the previous timeline entirely so onComplete doesn't fire
        if (hoverTl) hoverTl.kill(); 

        gsap.killTweensOf(textElement);
        gsap.killTweensOf(outerElement, "width,backgroundColor,borderColor");
        gsap.killTweensOf(innerElement, "opacity");

        const hoverText = target.getAttribute("data-cursor") || "visit";
        textElement.textContent = hoverText;
        
        gsap.set(textElement, { y: 15, opacity: 0, display: "inline-block", color: "#000" });
        gsap.to(innerElement, { opacity: 0, duration: 0.1 });

        // Assign to hoverTl
        hoverTl = gsap.timeline();
        hoverTl.to(outerElement, {
          backgroundColor: "#ffffff",
          borderColor: "transparent",
          width: 72,
          duration: 0.2,
          ease: "power3.out",
        }).to(textElement, {
          y: 0,
          opacity: 1,
          duration: 0.1,
          ease: "power3.out",
        });
      },
      leave: () => {
        // Kill the previous timeline entirely
        if (hoverTl) hoverTl.kill();

        gsap.killTweensOf(textElement);
        gsap.killTweensOf(outerElement, "width,backgroundColor,borderColor");
        gsap.killTweensOf(innerElement, "opacity");

        // Assign to hoverTl
        hoverTl = gsap.timeline({
          onComplete: () => {
            textElement.textContent = "";
            gsap.set(textElement, { display: "none" });
          },
        });
        
        hoverTl.to(textElement, {
          y: 15,
          opacity: 0,
          duration: 0.2,
          ease: "power3.in",
        }).to(
          outerElement,
          {
            width: 32,
            backgroundColor: "transparent",
            borderColor: "#ffffff",
            duration: 0.3,
            ease: "power3.out",
          },
          "-=0.1",
        );

        gsap.to(innerElement, { opacity: 1, duration: 0.2 });
      },
    },
    cursorShrink: {
      enter: () => {
        gsap.killTweensOf(outerElement, "scale");
        gsap.to(outerElement, {
          scale: 0,
          duration: 0.2,
          ease: "power3.out",
        });
      },
      leave: () => {
        gsap.killTweensOf(outerElement, "scale");
        gsap.to(outerElement, {
          scale: 1,
          duration: 0.2,
          ease: "power3.out",
        });
      }
    },
    // NEW: Shrinks the inner dot
    dotShrink: {
      enter: () => {
        gsap.killTweensOf(innerElement, "scale");
        gsap.to(innerElement, {
          scale: 0,
          duration: 0.2,
          ease: "power3.out",
        });
      },
      leave: () => {
        gsap.killTweensOf(innerElement, "scale");
        gsap.to(innerElement, {
          scale: 1,
          duration: 0.2,
          ease: "power3.out",
        });
      }
    },
    increaseCircle: {
      enter: () => {
        gsap.killTweensOf(outerElement, "scale");
        gsap.to(outerElement, {
          scale: 3, 
          duration: 1,
          ease: "power3.out",
        });
      },
      leave: () => {
        gsap.killTweensOf(outerElement, "scale");
        gsap.to(outerElement, {
          scale: 1, 
          duration: 0.3,
          ease: "power3.out",
        });
      }
    }
  };

  // 3. Event Handlers
  // 3. Event Handlers
  const handleMouseMove = (e) => {
    if (document.body.classList.contains("is-loading")) return;

    if (!hasMoved) {
      hasMoved = true;
      
      // Check exactly what element the mouse is resting on right now
      const target = e.target;
      const isOverCursorShrink = target.closest(".cursor-shrink");
      const isOverDotShrink = target.closest(".dot-shrink");

      // Animate the outer circle: stay at scale 0 if over the hero, otherwise scale 1
      gsap.to(outerElement, {
        scale: isOverCursorShrink ? 0 : 1,
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
      });

      // Animate the inner dot: stay at scale 0 if over the hero, otherwise scale 1
      gsap.to(innerElement, {
        scale: isOverDotShrink ? 0 : 1,
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
      });
    }
    
    setXInner(e.clientX);
    setYInner(e.clientY);
    xMoveOuter(e.clientX);
    yMoveOuter(e.clientY);
  };

  const handleMouseOver = (e) => {
    const target = e.target;
    if (target.closest(".social-link")) effects.socialLink.enter(target.closest(".social-link"));
    if (target.closest(".cursor-shrink")) effects.cursorShrink.enter();
    if (target.closest(".increase-circle")) effects.increaseCircle.enter();
    if (target.closest(".dot-shrink")) effects.dotShrink.enter();
  };

  const handleMouseOut = (e) => {
    const target = e.target;
    if (target.closest(".social-link")) effects.socialLink.leave();
    if (target.closest(".cursor-shrink")) effects.cursorShrink.leave();
    if (target.closest(".increase-circle")) effects.increaseCircle.leave();
    if (target.closest(".dot-shrink")) effects.dotShrink.leave();
  };

  // 4. Listeners
  window.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseover", handleMouseOver);
  document.addEventListener("mouseout", handleMouseOut);

  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseover", handleMouseOver);
    document.removeEventListener("mouseout", handleMouseOut);
  };
};