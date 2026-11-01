import { useState } from "react";
import GraphFilter from "./GraphFilter";
import Masonry from "./Masonry";

const FILTERS = ["Emails", "Logos", "Poster", "Thumbnails"];

export default function GraphSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const activeFilter = activeIndex !== null ? FILTERS[activeIndex] : null;

  return (
    <div className="h-full w-full flex flex-col justify-between items-center gap-2">
      <GraphFilter 
        filters={FILTERS} 
        activeIndex={activeIndex} 
        setActiveIndex={setActiveIndex} 
      />
      <Masonry activeFilter={activeFilter} />
    </div>
  );
}