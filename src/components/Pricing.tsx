"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { Sparkles, Check } from "lucide-react";
import Modal from "./ui/Modal";

interface Package {
  id: string;
  name: string;
  price: number | string;
  desc: string;
  features: string[];
  isPopular?: boolean;
}

const packages: Package[] = [
  {
    id: "studio-standard",
    name: "Studio Standard",
    price: 2500,
    desc: "Complete aesthetic storefronts & custom web architectures.",
    features: [
      "Custom Next.js & React Frontend",
      "Figma Design & Wireframing",
      "SEO Infrastructure & Web Vitals Audit",
      "Full Mobile & Tablet Responsive",
      "1 Month Post-Launch SLA Support"
    ],
  },
  {
    id: "Venezia-premium",
    name: "Venezia Premium",
    price: 5000,
    desc: "Bespoke digital architectures & custom AI agent automations.",
    features: [
      "Everything in Studio Standard",
      "Custom AI Agent & Chatbot Setup",
      "Interactive Animations & Spotlight Layouts",
      "Headless E-Commerce & CMS Setup",
      "CI/CD Pipeline & Cloud Deployment",
      "3 Months Post-Launch SLA Support"
    ],
    isPopular: true,
  },
  {
    id: "enterprise-suite",
    name: "Enterprise Suite",
    price: "10,000+",
    desc: "Full digital engineering partner for global products.",
    features: [
      "Unlimited Multi-Tenant SaaS Codebase",
      "Custom LLM Fine-Tuning Workflows",
      "Advanced BI & Visual Dashboards",
      "Dedicated DevOps Infrastructure",
      "Regular Security & Vulnerability Audits",
      "12 Months Dedicated SLA Support"
    ],
  },
];

export default function Pricing() {
  const [selectedPack, setSelectedPack] = useState<Package | null>(null);
  const [paymentState, setPaymentState] = useState<"idle" | "processing" | "success">("idle");
  const [dots, setDots] = useState<{ id: number; size: number; x: number; y: number; duration: number }[]>([]);

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

  // Payment Form States
  const [cardName, setCardName] = useState("");
  const [cardEmail, setCardEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCtaClick = (pack: Package) => {
    if (pack.id === "enterprise") {
      // Direct scroll to contact
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      setSelectedPack(pack);
      setPaymentState("idle");
      // Reset fields
      setCardName("");
      setCardEmail("");
      setCardNumber("");
      setCardExpiry("");
      setCardCvc("");
      setErrors({});
    }
  };

  const handleClosePayment = () => {
    setSelectedPack(null);
  };

  // Card formatting helpers
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, "").replace(/\D/g, "");
    const formatted = value.match(/.{1,4}/g)?.join(" ") || value;
    setCardNumber(formatted.slice(0, 19)); // 16 digits + 3 spaces
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    let formatted = value;
    if (value.length >= 2) {
      formatted = value.slice(0, 2) + "/" + value.slice(2, 4);
    }
    setCardExpiry(formatted.slice(0, 5));
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setCardCvc(value.slice(0, 3));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!cardName.trim()) newErrors.cardName = "Name is required";
    if (!cardEmail.trim()) {
      newErrors.cardEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(cardEmail)) {
      newErrors.cardEmail = "Enter a valid email";
    }

    const plainCard = cardNumber.replace(/\s/g, "");
    if (plainCard.length !== 16) {
      newErrors.cardNumber = "Enter a 16-digit card number";
    }

    if (cardExpiry.length !== 5 || !cardExpiry.includes("/")) {
      newErrors.cardExpiry = "Expiry date must be MM/YY";
    }

    if (cardCvc.length !== 3) {
      newErrors.cardCvc = "CVC must be 3 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setPaymentState("processing");

    // Simulate Stripe payment gateway latency
    setTimeout(() => {
      setPaymentState("success");
    }, 2000);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 18 } },
  };

  return (
    <section
      id="pricing"
      className="scroll-section relative px-6 md:px-12 py-28 z-10 w-full overflow-hidden border-t border-neutral-900 bg-[#050505]"
    >
      {/* Drifting background dots */}
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full bg-white pointer-events-none z-0"
          style={{ width: dot.size, height: dot.size, left: `${dot.x}%`, top: `${dot.y}%` }}
          animate={{ y: [0, -50, 0], opacity: [0.1, 0.45, 0.1] }}
          transition={{ duration: dot.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Breathing ambient glow — top-left */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.24, 0.1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-5%] w-[440px] h-[440px] rounded-full bg-white/10 blur-[120px] pointer-events-none z-0"
      />
      {/* Secondary glow — bottom-right */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.06, 0.16, 0.06] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 6 }}
        className="absolute bottom-[-10%] right-[-5%] w-[360px] h-[360px] rounded-full bg-white/8 blur-[100px] pointer-events-none z-0"
      />

      <div className="max-w-7xl mx-auto w-full flex flex-col gap-16 relative z-10">

        {/* ── Section Header (centered) ── */}


        {/* Precision Grid Brackets & Viewport Borders */}
        <div className="absolute top-6 left-6 w-5 h-5 border-t border-l border-neutral-900 pointer-events-none select-none opacity-50" />
        <div className="absolute top-6 right-6 w-5 h-5 border-t border-r border-neutral-900 pointer-events-none select-none opacity-50" />
        <div className="absolute bottom-6 left-6 w-5 h-5 border-b border-l border-neutral-900 pointer-events-none select-none opacity-50" />
        <div className="absolute bottom-6 right-6 w-5 h-5 border-b border-r border-neutral-900 pointer-events-none select-none opacity-50" />

        {/* Subtle Horizontal Layout Alignment Line */}
        <div className="absolute top-[12vh] left-6 right-6 border-b border-dashed border-neutral-900/30 pointer-events-none z-0" />

        {/* Monospace Editorial & Coordinate Info */}
        <div className="absolute top-8 left-14 hidden md:flex items-center gap-1.5 pointer-events-none select-none opacity-20 font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-500">
          <span>Vantelli Investment Config</span>
        </div>
        <div className="absolute top-8 right-14 hidden md:flex items-center gap-1.5 pointer-events-none select-none opacity-20 font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-500">
          <span>SYS CODE: V-PRICE.3</span>
        </div>

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
            Clear Investment
          </motion.p>

          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.08]"
          >
            Service{" "}
            <span className="font-light text-neutral-400">Packages</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-neutral-500 text-sm leading-relaxed max-w-lg"
          >
            Choose a structured scope to elevate your brand. All rates represent transparent standard prices.
          </motion.p>
        </motion.div>

        {/* ── Pricing Cards (3-column layout) ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto"
        >
          {packages.map((pack, idx) => {
            const isPopular = pack.isPopular;
            const isEnterprise = pack.id === "enterprise-suite";

            // Theme settings
            let borderGlow = "group-hover:bg-[radial-gradient(250px_circle_at_var(--mouse-x,-400px)_var(--mouse-y,-400px),rgba(255,255,255,0.15),transparent_80%)]";
            let spotlightColor = "rgba(255, 255, 255, 0.03)";
            let checkIconClass = "text-neutral-600";
            let ctaClass = "border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/30 text-white bg-transparent";

            if (isPopular) {
              borderGlow = "group-hover:bg-[radial-gradient(250px_circle_at_var(--mouse-x,-400px)_var(--mouse-y,-400px),rgba(251,191,36,0.3),transparent_80%)]";
              spotlightColor = "rgba(251, 191, 36, 0.04)";
              checkIconClass = "text-amber-500";
              ctaClass = "bg-white text-black hover:bg-neutral-200";
            } else if (isEnterprise) {
              borderGlow = "group-hover:bg-[radial-gradient(250px_circle_at_var(--mouse-x,-400px)_var(--mouse-y,-400px),rgba(139,92,246,0.25),transparent_80%)]";
              spotlightColor = "rgba(139, 92, 246, 0.04)";
              checkIconClass = "text-violet-500";
              ctaClass = "border-violet-900/40 hover:border-violet-600 hover:bg-violet-950/20 text-white bg-transparent";
            }

            return (
              <motion.div
                key={pack.id}
                variants={itemVariants}
                onMouseMove={handleMouseMove}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative rounded-2xl p-[1px] bg-neutral-900 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col"
              >
                {/* Border follow spotlight */}
                <div className={`absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none z-0 ${borderGlow}`} />

                {/* Popular card halo pulse */}
                {isPopular && (
                  <motion.div
                    animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.35, 0.15] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-[-4px] rounded-[20px] bg-amber-500/10 blur-[15px] pointer-events-none z-0"
                  />
                )}

                {/* Popular Badge tab */}
                {isPopular && (
                  <div className="absolute -top-px left-1/2 -translate-x-1/2 z-20">
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-[#050505] border border-amber-500/30 rounded-b-xl shadow-lg">
                      <span className="relative flex h-1.5 w-1.5 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500" />
                      </span>
                      <span className="text-[8px] font-bold tracking-widest text-amber-400 uppercase">
                        Most Popular
                      </span>
                    </div>
                  </div>
                )}

                {/* Card body */}
                <div
                  className="relative rounded-[15px] bg-[#070707]/90 hover:bg-[#070707]/95 border border-neutral-900/40 group-hover:border-neutral-800/30 transition-all duration-300 flex flex-col justify-between overflow-hidden z-10 h-full p-6 text-left flex-1"
                  style={{
                    backgroundImage: `radial-gradient(350px circle at var(--mouse-x, -400px) var(--mouse-y, -400px), ${spotlightColor}, transparent 80%)`
                  }}
                >
                  {/* Top Header */}
                  <div>
                    <div className="flex items-center justify-between pb-4">
                      <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-neutral-700 group-hover:text-neutral-500 transition-colors duration-300">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      {isPopular && (
                        <span className="text-[8px] font-mono text-amber-500/80 tracking-wider uppercase font-semibold">
                          Recommended
                        </span>
                      )}
                    </div>

                    <div className="border-t border-neutral-900/60 group-hover:border-neutral-800/50 transition-colors duration-300 w-full mb-5" />

                    <div>
                      <h3 className="text-base font-semibold text-white tracking-tight leading-snug">
                        {pack.name}
                      </h3>
                      <p className="text-[11px] text-neutral-500 mt-1 leading-normal">
                        {pack.desc}
                      </p>
                    </div>

                    <div className="flex items-baseline gap-1 my-5">
                      <span className="text-3xl font-black text-white tracking-tight">
                        {typeof pack.price === "number" ? `€${pack.price.toLocaleString()}` : `€${pack.price}`}
                      </span>
                      {typeof pack.price === "number" && (
                        <span className="text-[9px] font-mono text-neutral-600">/one-time</span>
                      )}
                    </div>

                    <ul className="space-y-2.5 border-t border-neutral-900 pt-4 mb-8">
                      {pack.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2 text-[11px] text-neutral-400 leading-snug">
                          <Check className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${checkIconClass}`} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleCtaClick(pack)}
                    className={`w-full py-2.5 rounded-xl border text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${ctaClass}`}
                  >
                    {isEnterprise ? "Contact Sales" : "Get Started"}
                  </button>

                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 h-[1.5px] w-0 group-hover:w-full bg-gradient-to-r from-transparent via-neutral-500 to-transparent transition-all duration-500 ease-out z-20" />
              </motion.div>
            );
          })}
        </motion.div>

      </div>

      {/* Stripe Payment Portal Modal */}
      <Modal
        isOpen={selectedPack !== null}
        onClose={handleClosePayment}
        title={selectedPack ? `Billing - ${selectedPack.name}` : ""}
        subtitle="Stripe Secure Gateway"
      >
        {selectedPack && (
          <div className="space-y-6">

            {/* Amount details */}
            <div className="p-4 rounded-xl border border-neutral-900 bg-neutral-950/40 flex justify-between items-center text-left">
              <div>
                <p className="text-xs font-bold text-white">{selectedPack.name} Package</p>
                <p className="text-[10px] text-neutral-500">Standard single-payment invoice</p>
              </div>
              <span className="text-lg font-bold text-white font-mono">
                €{typeof selectedPack.price === "number" ? selectedPack.price.toLocaleString() : selectedPack.price}
              </span>
            </div>

            {/* Payment States Handler */}
            {paymentState === "idle" && (
              <form onSubmit={handlePaymentSubmit} className="space-y-4">

                {/* Full name */}
                <div className="flex flex-col gap-1.5 text-left">
                  <label htmlFor="cardName" className="text-[10px] font-mono text-neutral-500 uppercase">
                    CARDHOLDER NAME *
                  </label>
                  <input
                    id="cardName"
                    type="text"
                    required
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Lucia Santoro"
                    className="w-full px-3 py-2 text-xs border border-neutral-900 rounded-lg bg-neutral-950/50 text-white focus:outline-none focus:border-neutral-750 focus:ring-1 focus:ring-neutral-750"
                  />
                  {errors.cardName && <span className="text-[9px] font-mono text-red-500">{errors.cardName}</span>}
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-1.5 text-left">
                  <label htmlFor="cardEmail" className="text-[10px] font-mono text-neutral-500 uppercase">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    id="cardEmail"
                    type="email"
                    required
                    value={cardEmail}
                    onChange={(e) => setCardEmail(e.target.value)}
                    placeholder="lucia@fashionhouse.it"
                    className="w-full px-3 py-2 text-xs border border-neutral-900 rounded-lg bg-neutral-950/50 text-white focus:outline-none focus:border-neutral-750 focus:ring-1 focus:ring-neutral-750"
                  />
                  {errors.cardEmail && <span className="text-[9px] font-mono text-red-500">{errors.cardEmail}</span>}
                </div>

                {/* Card Number */}
                <div className="flex flex-col gap-1.5 text-left">
                  <label htmlFor="cardNumber" className="text-[10px] font-mono text-neutral-500 uppercase">
                    CARD NUMBER *
                  </label>
                  <input
                    id="cardNumber"
                    type="text"
                    required
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="4242 4242 4242 4242"
                    className="w-full px-3 py-2 text-xs border border-neutral-900 rounded-lg bg-neutral-950/50 text-white font-mono focus:outline-none focus:border-neutral-750 focus:ring-1 focus:ring-neutral-750"
                  />
                  {errors.cardNumber && <span className="text-[9px] font-mono text-red-500">{errors.cardNumber}</span>}
                </div>

                {/* Expiry and CVC grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5 text-left">
                    <label htmlFor="cardExpiry" className="text-[10px] font-mono text-neutral-500 uppercase">
                      EXPIRY DATE *
                    </label>
                    <input
                      id="cardExpiry"
                      type="text"
                      required
                      value={cardExpiry}
                      onChange={handleExpiryChange}
                      placeholder="MM/YY"
                      className="w-full px-3 py-2 text-xs border border-neutral-900 rounded-lg bg-neutral-950/50 text-white font-mono focus:outline-none focus:border-neutral-750 focus:ring-1 focus:ring-neutral-750"
                    />
                    {errors.cardExpiry && <span className="text-[9px] font-mono text-red-500">{errors.cardExpiry}</span>}
                  </div>

                  <div className="flex flex-col gap-1.5 text-left">
                    <label htmlFor="cardCvc" className="text-[10px] font-mono text-neutral-500 uppercase">
                      CVC CODE *
                    </label>
                    <input
                      id="cardCvc"
                      type="text"
                      required
                      value={cardCvc}
                      onChange={handleCvcChange}
                      placeholder="123"
                      className="w-full px-3 py-2 text-xs border border-neutral-900 rounded-lg bg-neutral-950/50 text-white font-mono focus:outline-none focus:border-neutral-750 focus:ring-1 focus:ring-neutral-750"
                    />
                    {errors.cardCvc && <span className="text-[9px] font-mono text-red-500">{errors.cardCvc}</span>}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-white text-[#050505] hover:bg-neutral-200 transition-colors text-xs font-semibold uppercase tracking-wider rounded-lg shadow-md mt-6"
                >
                  Pay €{typeof selectedPack.price === "number" ? selectedPack.price.toLocaleString() : selectedPack.price}
                </button>
              </form>
            )}

            {paymentState === "processing" && (
              <div className="py-12 flex flex-col items-center justify-center space-y-4">
                <div className="w-8 h-8 rounded-full border-2 border-neutral-800 border-t-white animate-spin" />
                <p className="text-xs text-neutral-400 font-mono tracking-wider">
                  AUTHORIZING FUNDS via Stripe Gateway...
                </p>
              </div>
            )}

            {paymentState === "success" && (
              <div className="py-8 flex flex-col items-center justify-center space-y-4 text-center">
                <div className="w-12 h-12 rounded-full border border-neutral-800 bg-neutral-950/50 flex items-center justify-center text-white text-lg shadow-lg">
                  ✓
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-sm font-bold text-white tracking-tight">Payment Successful</h4>
                  <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
                    Thank you for choosing Vantelli. A confirmation invoice has been sent to <strong className="text-white">{cardEmail}</strong>. Our director will call you within 24 business hours to kick off your project.
                  </p>
                </div>
                <button
                  onClick={handleClosePayment}
                  className="px-5 py-2 border border-neutral-800 hover:bg-neutral-900 text-white text-xs font-mono rounded-lg transition-colors mt-4"
                >
                  Close Receipt
                </button>
              </div>
            )}

            <div className="text-center text-[10px] text-neutral-500 font-mono flex items-center justify-center gap-1.5 pt-2 border-t border-neutral-900/60">
              <span>🔒 SSL Encrypted Checkout</span>
            </div>

          </div>
        )}
      </Modal>
    </section>
  );
}
