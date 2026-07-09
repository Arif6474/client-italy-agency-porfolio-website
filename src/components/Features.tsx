"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { Zap, Shield, Eye, Flame, GraduationCap, Clock, Sparkles } from "lucide-react";

interface BgDot {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
}

export default function Features() {
  const [dots, setDots] = useState<BgDot[]>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget, clientX, clientY } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    currentTarget.style.setProperty("--mouse-x", `${x}px`);
    currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  useEffect(() => {
    const generated = [...Array(12)].map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      x: Math.random() * 90 + 5,
      y: Math.random() * 90 + 5,
      duration: 12 + Math.random() * 10,
    }));
    
    const handle = requestAnimationFrame(() => {
      setDots(generated);
    });

    return () => cancelAnimationFrame(handle);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 90, damping: 18 },
    },
  };

  const featuresList = [
    {
      title: "Ultra Performance",
      desc: "Server-side rendering, CDN edge caching, and optimized asset delivery yielding 98+ PageSpeed scores.",
      icon: Zap,
      themeClass: "text-amber-400 border-amber-950/20 bg-amber-950/10 group-hover:border-amber-500/60 drop-shadow-[0_0_8px_rgba(251,191,36,0.35)]",
      borderGlow: "group-hover:bg-[radial-gradient(250px_circle_at_var(--mouse-x,-400px)_var(--mouse-y,-400px),rgba(251,191,36,0.25),transparent_80%)]",
      spotlightColor: "rgba(251,191,36,0.04)"
    },
    {
      title: "Bespoke Aesthetics",
      desc: "Fully tailored user interfaces crafted from scratch. High typography hierarchy and premium spacing rules.",
      icon: Flame,
      themeClass: "text-rose-400 border-rose-950/20 bg-rose-950/10 group-hover:border-rose-500/60 drop-shadow-[0_0_8px_rgba(244,63,94,0.35)]",
      borderGlow: "group-hover:bg-[radial-gradient(250px_circle_at_var(--mouse-x,-400px)_var(--mouse-y,-400px),rgba(244,63,94,0.25),transparent_80%)]",
      spotlightColor: "rgba(244,63,94,0.04)"
    },
    {
      title: "Advanced AI Bots",
      desc: "Chatbots and background workflows engineered with OpenAI/Claude APIs to automate 80% of customer support.",
      icon: GraduationCap,
      themeClass: "text-violet-400 border-violet-950/20 bg-violet-950/10 group-hover:border-violet-500/60 drop-shadow-[0_0_8px_rgba(139,92,246,0.35)]",
      borderGlow: "group-hover:bg-[radial-gradient(250px_circle_at_var(--mouse-x,-400px)_var(--mouse-y,-400px),rgba(139,92,246,0.25),transparent_80%)]",
      spotlightColor: "rgba(139,92,246,0.04)"
    },
    {
      title: "Security By Design",
      desc: "Enterprise-grade SSL compliance, PCI-compliant Stripe billing, and serverless route isolation.",
      icon: Shield,
      themeClass: "text-emerald-400 border-emerald-950/20 bg-emerald-950/10 group-hover:border-emerald-500/60 drop-shadow-[0_0_8px_rgba(16,185,129,0.35)]",
      borderGlow: "group-hover:bg-[radial-gradient(250px_circle_at_var(--mouse-x,-400px)_var(--mouse-y,-400px),rgba(16,185,129,0.25),transparent_80%)]",
      spotlightColor: "rgba(16,185,129,0.04)"
    },
    {
      title: "ROI-Focused SEO",
      desc: "Targeted keyword planning and content architectures designed to capture organic pipelines and increase sales.",
      icon: Eye,
      themeClass: "text-cyan-400 border-cyan-950/20 bg-cyan-950/10 group-hover:border-cyan-500/60 drop-shadow-[0_0_8px_rgba(6,182,212,0.35)]",
      borderGlow: "group-hover:bg-[radial-gradient(250px_circle_at_var(--mouse-x,-400px)_var(--mouse-y,-400px),rgba(6,182,212,0.25),transparent_80%)]",
      spotlightColor: "rgba(6,182,212,0.04)"
    },
    {
      title: "Bespoke Maintenance",
      desc: "Continuous post-launch audit reports, design upgrades, server patching, and responsive 24/7 client support.",
      icon: Clock,
      themeClass: "text-sky-400 border-sky-950/20 bg-sky-950/10 group-hover:border-sky-500/60 drop-shadow-[0_0_8px_rgba(14,165,233,0.35)]",
      borderGlow: "group-hover:bg-[radial-gradient(250px_circle_at_var(--mouse-x,-400px)_var(--mouse-y,-400px),rgba(14,165,233,0.25),transparent_80%)]",
      spotlightColor: "rgba(14,165,233,0.04)"
    },
  ];

  return (
    <section
      id="features"
      className="scroll-section relative px-6 md:px-12 py-28 z-10 w-full overflow-hidden border-t border-neutral-900 bg-[#050505] flex flex-col justify-center"
    >
      {/* Precision Grid Brackets & Viewport Borders */}
      <div className="absolute top-6 left-6 w-5 h-5 border-t border-l border-neutral-900 pointer-events-none select-none opacity-50" />
      <div className="absolute top-6 right-6 w-5 h-5 border-t border-r border-neutral-900 pointer-events-none select-none opacity-50" />
      <div className="absolute bottom-6 left-6 w-5 h-5 border-b border-l border-neutral-900 pointer-events-none select-none opacity-50" />
      <div className="absolute bottom-6 right-6 w-5 h-5 border-b border-r border-neutral-900 pointer-events-none select-none opacity-50" />

      {/* Subtle Horizontal Layout Alignment Line */}
      <div className="absolute top-[12vh] left-6 right-6 border-b border-dashed border-neutral-900/30 pointer-events-none z-0" />

      {/* Monospace Editorial & Coordinate Info */}
      <div className="absolute top-8 left-14 hidden md:flex items-center gap-1.5 pointer-events-none select-none opacity-20 font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-500">
        <span>Vantelli Capability System</span>
      </div>
      <div className="absolute top-8 right-14 hidden md:flex items-center gap-1.5 pointer-events-none select-none opacity-20 font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-500">
        <span>SYS CODE: V-METRIC.4</span>
      </div>

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
          animate={{ y: [0, -50, 0], opacity: [0.1, 0.45, 0.1] }}
          transition={{ duration: dot.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Breathing ambient glow — bottom-right */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] right-[-5%] w-[420px] h-[420px] rounded-full bg-white/10 blur-[120px] pointer-events-none z-0"
      />
      {/* Secondary glow — top-left */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.06, 0.15, 0.06] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute top-[-8%] left-[-5%] w-[320px] h-[320px] rounded-full bg-white/8 blur-[100px] pointer-events-none z-0"
      />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-16">

        {/* ── Section Header (centered) ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="flex flex-col items-center text-center space-y-4"
        >
          <motion.p
            variants={itemVariants}
            className="text-[10px] tracking-[0.2em] font-mono text-neutral-500 uppercase flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Core Capabilities
          </motion.p>

          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.08]"
          >
            High Performance.{" "}
            <span className="font-light text-neutral-400">Zero Compromise.</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-neutral-500 text-sm leading-relaxed max-w-lg"
          >
            We operate at the intersection of design craftsmanship and backend
            performance — here is how we build value into every deployment.
          </motion.p>
        </motion.div>

        {/* ── Features Card Grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {featuresList.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                variants={itemVariants}
                onMouseMove={handleMouseMove}
                className="group relative rounded-2xl p-[1px] bg-neutral-900 transition-colors duration-300 overflow-hidden"
              >
                {/* Border follow spotlight */}
                <div className={`absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none z-0 ${feat.borderGlow}`} />

                {/* Card body */}
                <div 
                  className="relative rounded-[15px] bg-[#070707]/90 hover:bg-[#070707]/95 border border-neutral-900/40 group-hover:border-neutral-800/30 transition-all duration-300 flex flex-col text-left overflow-hidden z-10 h-full"
                  style={{
                    backgroundImage: `radial-gradient(350px circle at var(--mouse-x, -400px) var(--mouse-y, -400px), ${feat.spotlightColor}, transparent 80%)`
                  }}
                >

                  {/* Top bar: number + icon */}
                  <div className="flex items-center justify-between px-6 pt-6 pb-5">
                    <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-neutral-700 group-hover:text-neutral-500 transition-colors duration-300">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    {/* Icon in circle with custom neon color drop shadow on hover */}
                    <div className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-500 ${feat.themeClass}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="mx-6 border-t border-neutral-900 group-hover:border-neutral-800 transition-colors duration-300" />

                  {/* Content */}
                  <div className="px-6 pt-5 pb-7 flex flex-col gap-2.5 flex-1">
                    <h3 className="text-base font-semibold text-white tracking-tight leading-snug">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-neutral-600 group-hover:text-neutral-400 leading-relaxed transition-colors duration-300">
                      {feat.desc}
                    </p>
                  </div>

                  {/* Bottom accent line — slides in on hover */}
                  <div className="absolute bottom-0 left-0 h-[1.5px] w-0 group-hover:w-full bg-gradient-to-r from-transparent via-neutral-500 to-transparent transition-all duration-500 ease-out" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
