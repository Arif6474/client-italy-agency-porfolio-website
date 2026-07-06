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

  useEffect(() => {
    const generated = [...Array(12)].map((_, i) => ({
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
    },
    {
      title: "Bespoke Aesthetics",
      desc: "Fully tailored user interfaces crafted from scratch. High typography hierarchy and premium spacing rules.",
      icon: Flame,
    },
    {
      title: "Advanced AI Bots",
      desc: "Chatbots and background workflows engineered with OpenAI/Claude APIs to automate 80% of customer support.",
      icon: GraduationCap,
    },
    {
      title: "Security By Design",
      desc: "Enterprise-grade SSL compliance, PCI-compliant Stripe billing, and serverless route isolation.",
      icon: Shield,
    },
    {
      title: "ROI-Focused SEO",
      desc: "Targeted keyword planning and content architectures designed to capture organic pipelines and increase sales.",
      icon: Eye,
    },
    {
      title: "Bespoke Maintenance",
      desc: "Continuous post-launch audit reports, design upgrades, server patching, and responsive 24/7 client support.",
      icon: Clock,
    },
  ];

  return (
    <section
      id="features"
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
            <span className="font-light text-neutral-400 text-glow">
              Zero Compromise.
            </span>
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
                className="group relative p-[1px] rounded-2xl overflow-hidden"
              >
                {/* Rotating conic border beam */}
                <div className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_60%,#ffffff_88%,#ffffff_100%)] animate-[spin_8s_linear_infinite] opacity-0 group-hover:opacity-20 transition-opacity duration-500" />

                {/* Card body */}
                <div className="relative rounded-[15px] bg-neutral-950/20 group-hover:bg-neutral-950/50 border border-neutral-900 group-hover:border-neutral-800 transition-all duration-300 flex flex-col text-left overflow-hidden z-10 h-full">

                  {/* Top bar: number + icon */}
                  <div className="flex items-center justify-between px-6 pt-6 pb-5">
                    <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-neutral-700 group-hover:text-neutral-500 transition-colors duration-300">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    {/* Icon in circle */}
                    <div className="w-9 h-9 rounded-full border border-neutral-800 bg-neutral-950 flex items-center justify-center text-neutral-600 group-hover:text-white group-hover:border-neutral-600 transition-all duration-300">
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
