"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Pricing", href: "#pricing" },
];

export default function Navbar({ scrollContainerRef }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // 1. Detect if page is scrolled down to add a border/background density
    const handleScroll = () => {
      setIsScrolled(container.scrollTop > 50);
    };
    container.addEventListener("scroll", handleScroll);

    // 2. Track which section is active using IntersectionObserver
    const observerOptions = {
      root: container,
      rootMargin: "-20% 0px -60% 0px", // Trigger when section is in the main viewport area
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navItems.forEach((item) => {
      const id = item.href.substring(1);
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      container.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [scrollContainerRef]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.substring(1);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
            ? "bg-[#050505]/75  border-neutral-900/60 backdrop-blur-md py-4"
            : "bg-transparent py-6"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="group flex flex-col cursor-pointer"
          >
            <span className="text-xl font-bold tracking-[0.2em] text-white flex items-center">
              VAN
              <span className="font-light text-neutral-400 group-hover:text-white transition-colors duration-300 mx-1.5">
                TELLI
              </span>
            </span>
            <span className="text-[9px] uppercase tracking-[0.4em] text-neutral-500 font-mono mt-0.5">
              Venezia / ITALY
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 border border-neutral-900 bg-neutral-950/40 rounded-full px-2 py-1.5 backdrop-blur-sm">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-4 py-1.5 text-xs tracking-wider uppercase font-medium transition-colors duration-300 rounded-full ${isActive ? "text-white" : "text-neutral-400 hover:text-neutral-200"
                    }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-neutral-900 rounded-full -z-10 border border-neutral-800"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action CTA Button */}
          <div className="hidden lg:flex items-center">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="group flex items-center gap-1 px-4 py-2 border border-neutral-800 rounded-full bg-transparent text-white text-xs font-semibold uppercase tracking-wider hover:bg-white hover:text-[#050505] transition-all duration-300"
            >
              Contact Us
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Hamburger Menu Toggle (Mobile) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-400 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#050505] flex flex-col justify-center px-8 md:px-16 lg:hidden"
          >
            {/* Background elements */}
            <div className="absolute inset-0 noise-bg opacity-40 -z-10" />
            <div className="absolute top-[20%] left-[20%] w-[300px] h-[300px] rounded-full bg-white/2 blur-[100px] pointer-events-none" />

            <div className="flex flex-col space-y-6">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <motion.a
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-3xl font-bold tracking-wider uppercase text-left relative flex items-center"
                  >
                    <span
                      className={`mr-4 text-xs font-mono ${isActive ? "text-white" : "text-neutral-600"
                        }`}
                    >
                      0{index + 1}.
                    </span>
                    <span
                      className={isActive ? "text-white text-glow" : "text-neutral-500"}
                    >
                      {item.name}
                    </span>
                  </motion.a>
                );
              })}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="pt-8 border-t border-neutral-900 flex flex-col space-y-4"
              >
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact")}
                  className="w-full text-center py-4 rounded-xl border border-neutral-800 text-white font-semibold uppercase tracking-wider text-sm hover:bg-neutral-900 transition-colors"
                >
                  Contact Us
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
