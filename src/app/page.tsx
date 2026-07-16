"use client";

import { useRef, useState, createContext } from "react";
import Navbar from "../components/Navbar";

export const ScrollContext = createContext<React.RefObject<HTMLDivElement | null> | null>(null);
import NoiseBg from "../components/ui/NoiseBg";
import Hero from "../components/Hero";
import About from "../components/About";
import Features from "../components/Features";
import Services from "../components/Services";
import HowWeWork from "../components/HowWeWork";
import Portfolio from "../components/Portfolio";
import Pricing from "../components/Pricing";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import CallToAction from "../components/CallToAction";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleContainerScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight - target.clientHeight;
    
    if (scrollHeight > 0) {
      const percentage = (scrollTop / scrollHeight) * 100;
      setScrollProgress(percentage);
    }
  };

  return (
    <ScrollContext.Provider value={scrollContainerRef}>
      <main className="relative w-full h-screen overflow-hidden bg-[#050505] text-white">
        {/* Scroll Progress Bar */}
        <div
          className="fixed top-0 left-0 h-[2px] bg-white z-50 transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />

        {/* Global Background Grid Noise Layer */}
        <NoiseBg />

        {/* Sticky Header Nav */}
        <Navbar scrollContainerRef={scrollContainerRef} />

        {/* Main Snap Scroll Container */}
        <div
          ref={scrollContainerRef}
          onScroll={handleContainerScroll}
          className="scroll-container no-scrollbar relative z-10 w-full h-full"
        >
          <Hero />
          <About />
          <Services />
          <HowWeWork />
          <Features />
          <Portfolio />
          <Pricing />
          <Testimonials />
          <FAQ />
          <CallToAction />

          {/* Contact + Footer — single snap section so Footer is reachable */}
          <div id="contact" className="scroll-section !h-auto !min-h-fit !overflow-visible">
            <Contact />
            <Footer />
          </div>
        </div>
      </main>
    </ScrollContext.Provider>
  );
}
