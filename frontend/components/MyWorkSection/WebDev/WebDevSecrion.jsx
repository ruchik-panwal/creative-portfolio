"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import Script from "next/script";

// 1. Create your data object here
const WEB_PROJECTS = [
  {
    id: "WDezG8oX",
    title: "Spatialflow Portfolio",
    link: "https://spatialflow.in/",
    description:
      "A complete portfolio and booking platform built for an interior photographer. This was my first end-to-end project where I handled everything from designing the UI from scratch to integrating a client booking system and deploying it with a custom professional domain.",
  },
  {
    id: "KOW8V4rD", 
    title: "My Creative Portfolio",
    link: "https://ruchik.vercel.app/",
    description:
      "A visually driven personal portfolio designed to bridge frontend engineering and digital storytelling. It features fluid micro-animations, cinematic layouts, and interactive 3D elements to showcase my work across full-stack development, visual design, and video production.",
  },
];

export default function WebDevSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % WEB_PROJECTS.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + WEB_PROJECTS.length) % WEB_PROJECTS.length,
    );
  };

  const currentProject = WEB_PROJECTS[currentIndex];

  return (
    <div className="w-full h-full flex justify-center items-center gap-4 p-3">
      <Controls
        project={currentProject}
        onNext={handleNext}
        onPrev={handlePrev}
      />

      <div className="bg-[#000000] h-full aspect-video shrink-0 rounded-[20px] overflow-hidden relative cursor-shrink dot-shrink">
        <Script
          src="https://static-01.cinema8.com/embed/player.js"
          strategy="lazyOnload"
        />

        <cinema8-player
          key={currentProject.id}
          media-id={currentProject.id}
          style={{ width: "100%", height: "100%" }}
          autoplay="true"
          controls="false"
          loop="true"
          muted="true"
        ></cinema8-player>
      </div>
    </div>
  );
}

// Added ...props here to allow passing href, target, etc.
function AnimatedButton({ children, onClick, className, as: Tag = "button", ...props }) {
  const containerRef = useRef(null);
  const hoverBgRef = useRef(null);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const toggleHover = contextSafe((isEntering) => {
    gsap.to(hoverBgRef.current, {
      width: isEntering ? "100%" : "0%",
      duration: 0.4,
      ease: "power3.inOut",
      overwrite: "auto",
    });
  });

  return (
    <Tag
      ref={containerRef}
      onClick={onClick}
      onMouseEnter={() => toggleHover(true)}
      onMouseLeave={() => toggleHover(false)}
      className={`relative overflow-hidden ${className}`}
      {...props} // Spread the rest of the props (like href) onto the tag
    >
      <div
        ref={hoverBgRef}
        className="absolute left-0 top-0 bottom-0 w-0 z-0 bg-white pointer-events-none"
      />
      {/* Foreground content with mix-blend-exclusion to invert text color */}
      <div className="relative z-10 mix-blend-exclusion w-full h-full flex justify-center items-center">
        {children}
      </div>
    </Tag>
  );
}

function Controls({ project, onNext, onPrev }) {
  return (
    <div className="flex flex-col h-full flex-1 gap-4">
      {/* Dynamic Title and Description */}
      <div className="h-full w-full bg-[#1D1D1D] rounded-[20px] p-8 flex flex-col">
        <h2 className="text-white text-5xl font-black tracking-[-6%] mb-4">
          {project.title}
        </h2>
        <p className="text-gray-400 text-lg leading-6">{project.description}</p>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <AnimatedButton
          onClick={onPrev}
          className="bg-[#1D1D1D] rounded-[20px] w-70 h-30 flex justify-center items-center text-5xl cursor-shrink"
        >
          <FaArrowLeftLong />
        </AnimatedButton>

        {/* Changed as="div" to as="a" and added href/target props */}
        <AnimatedButton
          as="a"
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="h-full w-full bg-[#1D1D1D] rounded-[20px] flex justify-center items-center text-3xl cursor-shrink cursor-pointer"
        >
          Visit Site
        </AnimatedButton>

        <AnimatedButton
          onClick={onNext}
          className="bg-[#1D1D1D] rounded-[20px] w-70 h-30 flex justify-center items-center text-5xl cursor-shrink"
        >
          <FaArrowRightLong />
        </AnimatedButton>
      </div>
    </div>
  );
}