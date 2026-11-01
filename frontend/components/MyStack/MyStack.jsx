"use client";

import { useState } from "react";
import Image from "next/image";
import OptionWheel from "../OptionWheel";

const STACK_ITEMS = [
  { name: "Blender", logo: "/stackLogos/blender.png" },
  { name: "Davinci Resolve", logo: "/stackLogos/davinci-resolve.png" },
  { name: "Figma", logo: "/stackLogos/figma.png" },
  { name: "Canva", logo: "/stackLogos/canva.png" },
  { name: "Inkscape", logo: "/stackLogos/inkscape.png" },
  { name: "Lightroom", logo: "/stackLogos/lightroom.png" },
  { name: "Audacity", logo: "/stackLogos/audacity.png" },
];

export default function MyStack() {
  const [selectedItem, setSelectedItem] = useState(STACK_ITEMS[2]);

  return (
    <div className="w-full relative h-[150vh]">
      <div className="sticky top-0 flex flex-col gap-5 h-screen p-5 overflow-hidden w-full box-border">
        <div className="flex-1 h-full overflow-hidden w-full rounded-[20px] bg-secondaryBlack flex justify-between tracking-[-6%]">
            <div className="absolute text-[15rem] font-black tracking-[-8%] -top-10 left-10">My Stack</div>
        
          {/* Left Side: Active Image */}
          <div className="h-full w-1/2 flex items-center justify-center relative">
            {selectedItem?.logo && (
              <Image
                src={selectedItem.logo}
                alt={selectedItem.name}
                width={1200} // Intrinsic resolution
                height={1200}
                // max-w-none removes the width limit.
                // Adjust w-[900px] / h-[900px] or the -bottom/-left values to scale/move it exactly how you want.
                className="object-contain absolute max-w-none w-320 h-320 bottom-[-50%] left-[-20%] "
              />
            )}
          </div>

          {/* Right Side: Option Wheel */}
          <div className="h-full w-1/2 relative cursor-drag select-none">
            <OptionWheel
              items={STACK_ITEMS}
              defaultSelected={2}
              textColor="#a6a6a6"
              activeColor="#ffffff"
              side="right"
              fontSize={3.5}
              curve={0}
              visibleItems={15}
              tilt={0}
              blur={0}
              fade={0.15}
              smoothing={430}
              inset={150}
              loop
              draggable
              soundUrl="/assets/sounds/click-soft.mp3"
              soundVolume={0}
              onChange={(index, item) => setSelectedItem(item)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
