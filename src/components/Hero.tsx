"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { Star, LayoutGrid } from "lucide-react";
import Globe from "./ui/Globe";

interface BgDot {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
}

export default function Hero() {
  const [dots, setDots] = useState<BgDot[]>([]);

  useEffect(() => {
    const generated = [...Array(40)].map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      x: Math.random() * 90 + 5,
      y: Math.random() * 90 + 5,
      duration: 15 + Math.random() * 15,
    }));
    
    const handle = requestAnimationFrame(() => {
      setDots(generated);
    });

    return () => cancelAnimationFrame(handle);
  }, []);
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 18 },
    },
  };

  const handleCtaClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="scroll-section relative flex flex-col justify-between items-center px-6 pt-[12vh] pb-[3vh] z-10 w-full min-h-[92vh] overflow-hidden bg-[#050505]"
    >
      {/* Precision Grid Brackets & Viewport Borders */}
      <div className="absolute top-6 left-6 w-5 h-5 border-t border-l border-neutral-900 pointer-events-none select-none opacity-50" />
      <div className="absolute top-6 right-6 w-5 h-5 border-t border-r border-neutral-900 pointer-events-none select-none opacity-50" />
      <div className="absolute bottom-6 left-6 w-5 h-5 border-b border-l border-neutral-900 pointer-events-none select-none opacity-50" />
      <div className="absolute bottom-6 right-6 w-5 h-5 border-b border-r border-neutral-900 pointer-events-none select-none opacity-50" />

      {/* Subtle Horizontal Layout Alignment Line */}
      <div className="absolute top-[12vh] left-6 right-6 border-b border-dashed border-neutral-900/30 pointer-events-none z-0" />

      {/* Monospace Editorial & Coordinate Info
      <div className="absolute top-8 left-14 hidden md:flex items-center gap-1.5 pointer-events-none select-none opacity-30 font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-500">
        <span>HQ: VENEZIA, IT</span>
        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
      </div>
      <div className="absolute top-8 right-14 hidden md:flex items-center gap-1.5 pointer-events-none select-none opacity-30 font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-500">
        <span>COORD: 45.4408° N, 12.3155° E</span>
      </div> */}

      {/* Drifting background dots */}
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full bg-white pointer-events-none z-0"
          style={{
            width: dot.size,
            height: dot.size,
            left: `${dot.x}%`,
            top: `${dot.y}%`,
          }}
          animate={{
            y: [0, -60, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Decorative breathing/moving center glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.5, 0.2],
          x: ["-50%", "-47%", "-53%", "-50%"],
          y: ["-50%", "-54%", "-46%", "-50%"],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[40%] left-1/2 w-[350px] md:w-[650px] h-[350px] md:h-[650px] rounded-full bg-white/10 blur-[130px] pointer-events-none z-0"
      />

      {/* Main Split Grid Layout */}
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-8 items-center my-auto relative z-10">
        
        {/* Left Column: Editorial Info */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-[2.5vh] w-full"
        >
          {/* Scarcity / Announcement Badge */}
          <motion.div variants={itemVariants} className="inline-flex max-w-full">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-900 bg-neutral-950/60 text-[10px] tracking-wider text-neutral-450 font-mono max-w-full">
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
              </span>
              <span className="text-neutral-400 uppercase tracking-widest truncate">Currently selecting startup cohorts</span>
            </div>
          </motion.div>

          {/* Large Centered Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] w-full"
          >
            Premium Digital Excellence <br />
            <span className="font-semibold bg-gradient-to-r from-amber-200 via-yellow-100 to-rose-200 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(251,191,36,0.06)]">
              Vantelli
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-xs sm:text-sm md:text-base text-neutral-500 max-w-2xl leading-relaxed w-full"
          >
            Crafting high-performance digital products, smart interfaces, and ROI-driven marketing systems 
            with Venetian precision and Italian craftsmanship.
          </motion.p>

          {/* Animated Action Button */}
          <motion.div variants={itemVariants} className="pt-2">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="relative p-[1px] inline-block rounded-xl overflow-hidden bg-neutral-900/60 hover:bg-neutral-850 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.015)] hover:shadow-[0_0_25px_rgba(255,255,255,0.04)] group"
            >
              {/* Rotating Border Beam */}
              <div className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_50%,#ffffff_85%,#ffffff_100%)] animate-[spin_6s_linear_infinite] opacity-50" />

              {/* Inside Interactive Button */}
              <button
                onClick={() => handleCtaClick("services")}
                className="relative px-4 sm:px-6 py-2.5 sm:py-3 bg-[#050505] hover:bg-[#050505]/95 text-white font-medium text-xs uppercase tracking-widest rounded-[11px] flex items-center gap-2 transition-colors duration-300 z-10 cursor-pointer"
              >
                Explore Services
                <span className="text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 transition-all text-xs">
                  →
                </span>
              </button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Column: 3D Interactive Canvas Globe */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-5 flex justify-center items-center w-full relative"
        >
          <Globe />
        </motion.div>

      </div>

      {/* Centered Trusted Companies Logo Strip (Auto Marquee) */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-[4vh] overflow-hidden relative z-10"
      >
        {/* Gradient masking for left/right borders */}
        <div className="absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

        {/* Marquee Track */}
        <div className="flex w-max mx-auto animate-marquee whitespace-nowrap gap-0 opacity-25 hover:opacity-45 transition-opacity duration-300">
          {/* First Set of Logos */}
          <div className="flex items-center gap-12 md:gap-24 pr-12 md:pr-24">
            <span className="text-xs font-bold tracking-[0.3em] text-white font-sans">VERCEL</span>
            <span className="text-xs font-bold tracking-[0.3em] text-white font-sans">STRIPE</span>
            <span className="text-xs font-semibold tracking-[0.3em] text-white font-sans">LINEAR</span>
            <span className="text-xs font-light tracking-[0.3em] text-white font-sans">RAYCAST</span>
            <span className="text-xs font-bold tracking-[0.3em] text-white font-sans">FRAMER</span>
          </div>
          {/* Duplicate Set for Infinite Loop */}
          <div className="flex items-center gap-12 md:gap-24 pr-12 md:pr-24" aria-hidden="true">
            <span className="text-xs font-bold tracking-[0.3em] text-white font-sans">VERCEL</span>
            <span className="text-xs font-bold tracking-[0.3em] text-white font-sans">STRIPE</span>
            <span className="text-xs font-semibold tracking-[0.3em] text-white font-sans">LINEAR</span>
            <span className="text-xs font-light tracking-[0.3em] text-white font-sans">RAYCAST</span>
            <span className="text-xs font-bold tracking-[0.3em] text-white font-sans">FRAMER</span>
          </div>
        </div>
      </motion.div>

      {/* Bottom Layout Elements (Dashed Star Divider + Navigation Button) */}
      <div className="w-full max-w-3xl mx-auto mt-auto space-y-[2.5vh] relative z-10">

        {/* Dashed Line Star Divider */}
        <div className="flex items-center justify-center gap-6 w-full max-w-xl mx-auto opacity-20">
          <div className="flex-1 border-t border-dashed border-neutral-700" />
          <div className="flex items-center gap-1.5 text-neutral-500">
            <Star className="w-2.5 h-2.5" />
            <Star className="w-3.5 h-3.5 fill-current" />
            <Star className="w-2.5 h-2.5" />
          </div>
          <div className="flex-1 border-t border-dashed border-neutral-700" />
        </div>

        {/* Projects Trigger Button */}
        <div className="flex justify-center pb-[2vh]">
          <button
            onClick={() => handleCtaClick("portfolio")}
            className="group flex items-center gap-2 px-4 py-2 border border-neutral-900 bg-neutral-950/40 text-neutral-400 hover:text-white text-[10px] font-mono tracking-wider uppercase rounded-xl hover:bg-neutral-900/20 hover:border-neutral-850 transition-all duration-300"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Our Projects
          </button>
        </div>
      </div>
    </section>
  );
}