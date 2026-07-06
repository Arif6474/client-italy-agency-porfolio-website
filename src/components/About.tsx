"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { Sparkles, Hammer, Layers, TrendingUp, Cpu } from "lucide-react";

interface BgDot {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
}

export default function About() {
  const [dots, setDots] = useState<BgDot[]>([]);

  useEffect(() => {
    const generated = [...Array(14)].map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      x: Math.random() * 90 + 5,
      y: Math.random() * 90 + 5,
      duration: 12 + Math.random() * 10,
    }));
    setDots(generated);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 90, damping: 18 },
    },
  };

  const values = [
    {
      num: "01",
      title: "Precision Engineering",
      desc: "Pixel-perfect frontend code written with React, Next.js, and TypeScript. No bloat, pure speed.",
      icon: Hammer,
    },
    {
      num: "02",
      title: "Aesthetic Integrity",
      desc: "Inspired by classical Italian design. High-contrast typography, large spacing, and clean grids.",
      icon: Layers,
    },
    {
      num: "03",
      title: "Measurable Growth",
      desc: "Marketing campaigns and product experiences built to achieve specific financial and traffic metrics.",
      icon: TrendingUp,
    },
    {
      num: "04",
      title: "Cognitive Systems",
      desc: "Production-grade custom AI models and automations that reduce support overhead by 60%.",
      icon: Cpu,
    },
  ];

  const stats = [
    { value: "120+", label: "Projects Delivered" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "60%", label: "Support Overhead Cut" },
    { value: "4+", label: "Years in Venice" },
  ];

  return (
    <section
      id="about"
      className="scroll-section relative px-6 md:px-12 py-28 z-10 w-full overflow-hidden border-t border-neutral-900 bg-[#050505]"
    >
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
            y: [0, -50, 0],
            opacity: [0.12, 0.5, 0.12],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Breathing ambient glow — top-right */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.12, 0.28, 0.12],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] right-[-5%] w-[480px] h-[480px] rounded-full bg-white/10 blur-[120px] pointer-events-none z-0"
      />
      {/* Secondary glow — bottom-left */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.06, 0.18, 0.06],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute bottom-[-10%] left-[-5%] w-[360px] h-[360px] rounded-full bg-white/8 blur-[100px] pointer-events-none z-0"
      />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-20">

        {/* ── Top: Label + Heading + Body ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-end"
        >
          {/* Left: Headline block */}
          <div className="lg:col-span-6 flex flex-col space-y-5 text-left">
            <motion.p
              variants={itemVariants}
              className="text-[10px] tracking-[0.2em] font-mono text-neutral-500 uppercase flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Agency Philosophy
            </motion.p>

            <motion.h2
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.08]"
            >
              Italian Design Meets{" "}
              <br />
              <span className="font-light text-neutral-400 text-glow">
                Digital Engineering.
              </span>
            </motion.h2>
          </div>

          {/* Right: Body copy */}
          <motion.div
            variants={containerVariants}
            className="lg:col-span-6 flex flex-col space-y-4 text-left"
          >
            <motion.p
              variants={itemVariants}
              className="text-neutral-400 text-sm md:text-base leading-relaxed"
            >
              Located in Venice, Italy, StudioWebDigital was founded on a simple
              principle: digital products should be as functional as they are
              beautiful. We do not design generic web pages — we craft bespoke
              digital flagship stores and automation structures.
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-neutral-500 text-sm leading-relaxed"
            >
              By bridging the gap between luxury design and high-end computer
              science, we provide premium brands and ambitious tech startups with
              an unforgettable online presence that delivers measurable compound
              growth.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* ── Stats strip ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-900"
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={itemVariants}
              className="group flex flex-col items-center justify-center gap-1 py-8 px-4 bg-[#050505] hover:bg-neutral-950/80 transition-colors duration-300 text-center"
            >
              <span className="text-3xl md:text-4xl font-bold text-white tracking-tight group-hover:text-glow transition-all duration-300">
                {s.value}
              </span>
              <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-[0.15em]">
                {s.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Values Grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {values.map((val) => {
            const Icon = val.icon;
            return (
              <motion.div
                key={val.num}
                variants={itemVariants}
                className="group relative p-[1px] rounded-2xl overflow-hidden"
              >
                {/* Conic-gradient border beam on hover */}
                <div className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_60%,#ffffff_88%,#ffffff_100%)] animate-[spin_8s_linear_infinite] opacity-0 group-hover:opacity-30 transition-opacity duration-500" />

                {/* Card body */}
                <div className="relative rounded-[15px] bg-neutral-950/40 hover:bg-neutral-950/70 border border-neutral-900 group-hover:border-neutral-800 transition-all duration-300 flex flex-col justify-between text-left h-[220px] p-6 z-10">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono font-bold tracking-wider text-neutral-700 group-hover:text-neutral-400 transition-colors duration-300">
                      {val.num} /
                    </span>
                    <Icon className="w-4 h-4 text-neutral-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="mt-auto space-y-1.5">
                    <h3 className="text-sm font-semibold tracking-tight text-white">
                      {val.title}
                    </h3>
                    <p className="text-xs text-neutral-600 group-hover:text-neutral-400 leading-normal line-clamp-3 transition-colors duration-300">
                      {val.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
