"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const handleScrollToTop = () => {
    const element = document.getElementById("home") || document.documentElement;
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-[#050505] border-t border-neutral-900/60 py-16 relative overflow-hidden flex flex-col justify-center items-center">

      {/* ── Background Grid Pattern & Stealth Neutral Glow ── */}
      <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[220px] rounded-full bg-white/5 blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col items-center gap-16 relative z-10">

        {/* ── Massive Centered Outlined Logo ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full flex items-center justify-center py-6 select-none"
        >
          <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-[0.12em] text-outline-cyan cursor-default text-center">
            VANTELLI
          </span>
        </motion.div>

        {/* ── Bottom Meta Row ── */}
        <div className="w-full border-t border-neutral-900/60 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] font-mono text-neutral-500">

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <span className="text-neutral-600 font-sans tracking-wide">Follow us on</span>
            <div className="flex items-center gap-2">
              <a
                href="#"
                aria-label="Facebook"
                className="w-7 h-7 rounded-full border border-neutral-800 bg-neutral-950/40 hover:bg-neutral-900 flex items-center justify-center hover:text-white hover:border-neutral-700 transition-all duration-300"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-7 h-7 rounded-full border border-neutral-800 bg-neutral-950/40 hover:bg-neutral-900 flex items-center justify-center hover:text-white hover:border-neutral-700 transition-all duration-300"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-7 h-7 rounded-full border border-neutral-800 bg-neutral-950/40 hover:bg-neutral-900 flex items-center justify-center hover:text-white hover:border-neutral-700 transition-all duration-300"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Back to Top */}
          <button
            onClick={handleScrollToTop}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-neutral-800 bg-neutral-950/60 hover:bg-cyan-500/10 hover:border-cyan-500/30 text-neutral-400 hover:text-cyan-400 transition-all duration-300 cursor-pointer"
          >
            <span className="w-4 h-4 rounded-full bg-cyan-500/15 flex items-center justify-center">
              <ArrowUp className="w-2.5 h-2.5" />
            </span>
            Back to Top
          </button>

          {/* Copyright */}
          <div>
            <span>© {new Date().getFullYear()} Vantelli. All Rights Reserved.</span>
          </div>

        </div>

      </div>
    </footer>
  );
}
