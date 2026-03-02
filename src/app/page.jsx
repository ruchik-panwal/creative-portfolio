import Hero from "./components/Hero";
import Footer from "./components/Footer";
import WorkSection from "./components/WorkSection";

export default function Home() {
  return (
    <div>
      <div className="">
        <Hero />
      </div>
      <WorkSection />
      <Footer />
    </div>
  );
}
