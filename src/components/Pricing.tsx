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
    id: "quick-start",
    name: "Quick Start",
    price: 99,
    desc: "Perfect for establishing a basic brand baseline.",
    features: ["Professional Logo Design", "5 Social Media Posts", "Email Newsletter Template", "Free Consultation (30min)"],
  },
  {
    id: "micro-business",
    name: "Micro Business",
    price: 799,
    desc: "Built for launch-ready startups.",
    features: ["Conversion Landing Page", "Basic SEO Foundations", "20 Social Media Posts", "2 Months SLA Support"],
  },
  {
    id: "starter",
    name: "Starter Pack",
    price: 2500,
    desc: "Complete custom website deployment.",
    features: ["Website Design & Build", "SEO Content Infrastructure", "Full Mobile Responsive", "1 Month SLA Support"],
  },
  {
    id: "professional",
    name: "Professional",
    price: 5999,
    desc: "Bespoke digital architecture for scaling brands.",
    features: ["Custom Next.js Development", "Growth Marketing Strategy", "Social Media Identity Setup", "Custom AI Chatbot Integration", "3 Months SLA Support"],
    isPopular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "12,000+",
    desc: "Full technical suite for complex organizations.",
    features: ["Full-Stack App Development", "Omnichannel Marketing Campaigns", "Custom LLM Agents Workflows", "Dedicated Support Manager", "12 Months SLA Support"],
  },
];

export default function Pricing() {
  const [selectedPack, setSelectedPack] = useState<Package | null>(null);
  const [paymentState, setPaymentState] = useState<"idle" | "processing" | "success">("idle");
  const [dots, setDots] = useState<{ id: number; size: number; x: number; y: number; duration: number }[]>([]);

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
            <span className="font-light text-neutral-400 text-glow">
              Packages.
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-neutral-500 text-sm leading-relaxed max-w-lg"
          >
            Choose a structured scope to elevate your brand. All rates represent transparent standard prices.
          </motion.p>
        </motion.div>

        {/* ── Pricing Cards ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 items-stretch"
        >
          {packages.map((pack, idx) => {
            if (pack.isPopular) {
              return (
                <motion.div
                  key={pack.id}
                  variants={itemVariants}
                  whileInView={{ scale: [0.95, 1.03, 1] }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.25 }}
                  viewport={{ once: true }}
                  className="relative rounded-2xl flex flex-col"
                  style={{ zIndex: 2 }}
                >
                  {/* Outer pulsing glow halo */}
                  <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.45, 0.2] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-[-8px] rounded-[22px] bg-white/15 blur-[20px] pointer-events-none"
                  />

                  {/* White card body */}
                  <div className="relative rounded-2xl bg-white flex flex-col flex-1 overflow-hidden">

                    {/* Shimmer sweep */}
                    <motion.div
                      animate={{ x: ["-120%", "220%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 2.5 }}
                      className="absolute inset-0 w-[45%] bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 pointer-events-none z-10"
                    />

                    {/* Badge tab — drops down from top */}
                    <div className="absolute -top-px left-1/2 -translate-x-1/2 z-20">
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-[#050505] border border-neutral-800 rounded-b-xl shadow-lg">
                        <span className="relative flex h-1.5 w-1.5 shrink-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                        </span>
                        <span className="text-[8px] font-bold tracking-widest text-white uppercase">
                          Most Popular
                        </span>
                      </div>
                    </div>

                    {/* Top bar: number + label */}
                    <div className="flex items-center justify-between px-5 pt-7 pb-4">
                      <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-neutral-400">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[8px] font-mono text-neutral-400 tracking-wider uppercase">
                        recommended
                      </span>
                    </div>

                    {/* Divider */}
                    <div className="mx-5 border-t border-neutral-200" />

                    {/* Content */}
                    <div className="px-5 pt-4 pb-5 flex flex-col flex-1 gap-4">
                      <div>
                        <h3 className="text-sm font-semibold text-[#050505] tracking-tight">{pack.name}</h3>
                        <p className="text-[10px] text-neutral-500 mt-1 leading-normal">{pack.desc}</p>
                      </div>

                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-[#050505] tracking-tight">
                          {typeof pack.price === "number" ? `€${pack.price.toLocaleString()}` : `€${pack.price}`}
                        </span>
                        {typeof pack.price === "number" && (
                          <span className="text-[9px] font-mono text-neutral-500">/one-time</span>
                        )}
                      </div>

                      <ul className="space-y-2.5 flex-1 border-t border-neutral-200 pt-4">
                        {pack.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-2 text-[11px] text-neutral-600 leading-snug">
                            <Check className="w-3 h-3 flex-shrink-0 mt-0.5 text-[#050505]" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Dark CTA with conic border beam */}
                      <div className="relative p-[1px] rounded-xl overflow-hidden">
                        <div className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_50%,#000000_80%,#000000_100%)] animate-[spin_6s_linear_infinite] opacity-50" />
                        <button
                          onClick={() => handleCtaClick(pack)}
                          className="relative w-full py-2.5 rounded-[11px] bg-[#050505] hover:bg-neutral-900 text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer z-10"
                        >
                          Get Started
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            }

            // ── Regular cards ──
            return (
              <motion.div
                key={pack.id}
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative rounded-2xl border border-neutral-900 bg-neutral-950/15 hover:bg-neutral-950/40 hover:border-neutral-800 flex flex-col overflow-hidden transition-colors duration-300"
              >
                {/* Top bar */}
                <div className="flex items-center justify-between px-5 pt-5 pb-4">
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-neutral-700 group-hover:text-neutral-500 transition-colors duration-300">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Divider */}
                <div className="mx-5 border-t border-neutral-900 group-hover:border-neutral-800 transition-colors duration-300" />

                {/* Content */}
                <div className="px-5 pt-4 pb-5 flex flex-col flex-1 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-white tracking-tight">{pack.name}</h3>
                    <p className="text-[10px] text-neutral-600 mt-1 leading-normal group-hover:text-neutral-500 transition-colors duration-300">
                      {pack.desc}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-white tracking-tight">
                      {typeof pack.price === "number" ? `€${pack.price.toLocaleString()}` : `€${pack.price}`}
                    </span>
                    {typeof pack.price === "number" && (
                      <span className="text-[9px] font-mono text-neutral-600">/one-time</span>
                    )}
                  </div>

                  <ul className="space-y-2.5 flex-1 border-t border-neutral-900 pt-4">
                    {pack.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2 text-[11px] text-neutral-500 group-hover:text-neutral-400 leading-snug transition-colors duration-300">
                        <Check className="w-3 h-3 flex-shrink-0 mt-0.5 text-neutral-600" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleCtaClick(pack)}
                    className="w-full py-2.5 rounded-xl border border-neutral-800 hover:border-neutral-700 text-white text-xs font-semibold uppercase tracking-wider bg-transparent hover:bg-neutral-900/30 transition-all duration-300 cursor-pointer"
                  >
                    {pack.id === "enterprise" ? "Contact Sales" : "Get Started"}
                  </button>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 h-[1.5px] w-0 group-hover:w-full bg-gradient-to-r from-transparent via-neutral-500 to-transparent transition-all duration-500 ease-out" />
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
                    Thank you for choosing StudioWebDigital. An confirmation invoice has been sent to <strong className="text-white">{cardEmail}</strong>. Our director will call you within 24 business hours to kick off your project.
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
