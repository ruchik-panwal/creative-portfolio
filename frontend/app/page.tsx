'use client';
import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import WorkSection from "../components/MyWorkSection/WorkSection";
import SmoothScroll from "../components/SmoothScroll";
import MyStack from "../components/MyStack/MyStack";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("is-loading"); 
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("is-loading"); 
    }
    
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("is-loading");
    };
  }, [isLoaded]);

  return (
    <SmoothScroll>
      {/* ADDED: h-screen overflow-hidden when not loaded */}
      <div className={`relative w-full flex flex-col ${isLoaded ? "" : "h-screen overflow-hidden"}`}>
        
        <div className="relative z-10 bg-background">
          <Hero 
            isLoaded={isLoaded} 
            onLoadComplete={() => setTimeout(() => setIsLoaded(true), 3000)} 
          />
        </div>

        <WorkSection />

        <div className="relative z-10 bg-background">
          <MyStack />
        </div>

        <div className="relative z-20 bg-background">
          <Footer />
        </div>

      </div>
    </SmoothScroll>
  );
}