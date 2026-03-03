import Hero from "./components/Hero";
import Footer from "./components/Footer";
import WorkSection from "./components/MyWorkSection/WorkSection";
import SmoothScroll from "./components/SmoothScroll"; // Make sure this path matches where you saved the file

export default function Home() {
  return (
    <SmoothScroll>
      <div>
        <div className="">
          <Hero />
        </div>
        <WorkSection />
        <Footer />
      </div>
    </SmoothScroll>
  );
}