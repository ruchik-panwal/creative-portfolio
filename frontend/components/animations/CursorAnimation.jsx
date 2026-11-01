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

  // Keep track of the active timeline so we can kill it completely
  let hoverTl = null;

  // 2. Hover Effect Definitions
  const effects = {
    socialLink: {
      enter: (target) => {
        if (hoverTl) hoverTl.kill();

        gsap.killTweensOf(textElement);
        gsap.killTweensOf(outerElement, "width,backgroundColor,borderColor");
        gsap.killTweensOf(innerElement, "opacity");

        const hoverText = target.getAttribute("data-cursor") || "visit";
        textElement.textContent = hoverText;

        gsap.set(textElement, {
          y: 15,
          opacity: 0,
          display: "inline-block",
          color: "#000",
        });
        gsap.to(innerElement, { opacity: 0, duration: 0.1 });

        hoverTl = gsap.timeline();
        hoverTl
          .to(outerElement, {
            backgroundColor: "#ffffff",
            borderColor: "transparent",
            width: 72,
            duration: 0.2,
            ease: "power3.out",
          })
          .to(textElement, {
            y: 0,
            opacity: 1,
            duration: 0.1,
            ease: "power3.out",
          });
      },
      leave: () => {
        if (hoverTl) hoverTl.kill();

        gsap.killTweensOf(textElement);
        gsap.killTweensOf(outerElement, "width,backgroundColor,borderColor");
        gsap.killTweensOf(innerElement, "opacity");

        hoverTl = gsap.timeline({
          onComplete: () => {
            textElement.textContent = "";
            gsap.set(textElement, { display: "none" });
          },
        });

        hoverTl
          .to(textElement, {
            y: 15,
            opacity: 0,
            duration: 0.2,
            ease: "power3.in",
          })
          .to(
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
    cursorDrag: {
      enter: () => {
        if (hoverTl) hoverTl.kill();

        gsap.killTweensOf(textElement);
        gsap.killTweensOf(outerElement, "width,height,backgroundColor,borderColor");
        gsap.killTweensOf(innerElement, "opacity");

        textElement.textContent = "Drag";

        gsap.set(textElement, {
          y: 15,
          opacity: 0,
          display: "inline-block",
          color: "#000",
        });
        gsap.to(innerElement, { opacity: 0, duration: 0.1 });

        hoverTl = gsap.timeline();
        hoverTl
          .to(outerElement, {
            backgroundColor: "#ffffff",
            borderColor: "transparent",
            width: 100,
            height: 100,
            duration: 0.2,
            ease: "power3.out",
          })
          .to(textElement, {
            y: 0,
            opacity: 1,
            duration: 0.1,
            ease: "power3.out",
          });
      },
      leave: () => {
        if (hoverTl) hoverTl.kill();

        gsap.killTweensOf(textElement);
        gsap.killTweensOf(outerElement, "width,height,backgroundColor,borderColor");
        gsap.killTweensOf(innerElement, "opacity");

        hoverTl = gsap.timeline({
          onComplete: () => {
            textElement.textContent = "";
            gsap.set(textElement, { display: "none" });
          },
        });

        hoverTl
          .to(textElement, {
            y: 15,
            opacity: 0,
            duration: 0.2,
            ease: "power3.in",
          })
          .to(
            outerElement,
            {
              width: 32,
              height: 32,
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
      },
    },
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
      },
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
      },
    },
  };

  // 3. Event Handlers
  const handleMouseMove = (e) => {
    if (document.body.classList.contains("is-loading")) return;

    if (!hasMoved) {
      hasMoved = true;

      const target = e.target;
      const isOverCursorShrink = target.closest(".cursor-shrink");
      const isOverDotShrink = target.closest(".dot-shrink");

      gsap.to(outerElement, {
        scale: isOverCursorShrink ? 0 : 1,
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
      });

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
    const related = e.relatedTarget;

    const socialTarget = target.closest(".social-link");
    if (socialTarget && (!related || !related.closest(".social-link"))) {
      effects.socialLink.enter(socialTarget);
    }
    
    const dragTarget = target.closest(".cursor-drag");
    if (dragTarget && (!related || !related.closest(".cursor-drag"))) {
      effects.cursorDrag.enter();
    }

    const shrinkTarget = target.closest(".cursor-shrink");
    if (shrinkTarget && (!related || !related.closest(".cursor-shrink"))) {
      effects.cursorShrink.enter();
    }

    const increaseTarget = target.closest(".increase-circle");
    if (increaseTarget && (!related || !related.closest(".increase-circle"))) {
      effects.increaseCircle.enter();
    }

    const dotTarget = target.closest(".dot-shrink");
    if (dotTarget && (!related || !related.closest(".dot-shrink"))) {
      effects.dotShrink.enter();
    }
  };

  const handleMouseOut = (e) => {
    const target = e.target;
    const related = e.relatedTarget;

    const socialTarget = target.closest(".social-link");
    // Only trigger leave if we are actually moving completely out of the container
    if (socialTarget && (!related || !socialTarget.contains(related))) {
      effects.socialLink.leave();
    }

    const dragTarget = target.closest(".cursor-drag");
    if (dragTarget && (!related || !dragTarget.contains(related))) {
      effects.cursorDrag.leave();
    }

    const shrinkTarget = target.closest(".cursor-shrink");
    if (shrinkTarget && (!related || !shrinkTarget.contains(related))) {
      effects.cursorShrink.leave();
    }

    const increaseTarget = target.closest(".increase-circle");
    if (increaseTarget && (!related || !increaseTarget.contains(related))) {
      effects.increaseCircle.leave();
    }

    const dotTarget = target.closest(".dot-shrink");
    if (dotTarget && (!related || !dotTarget.contains(related))) {
      effects.dotShrink.leave();
    }
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