"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Sparkles, BarChart, ShoppingCart, MessageSquare, Heart, LayoutGrid, Utensils, CheckCircle } from "lucide-react";
import Modal from "./ui/Modal";

// Structure definitions
interface ProjectMetric {
  value: string;
  label: string;
}

interface PortfolioItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  metrics: ProjectMetric[];
  icon: React.ComponentType<{ className?: string }>;
  image: string;
}

interface PortfolioDetail {
  id: string;
  tag: string;
  title: string;
  overview: string;
  strategyHeading: string;
  strategyItems: string[];
  results: ProjectMetric[];
  techStack?: string[];
  features?: string[];
  image: string;
}

const portfolioList: PortfolioItem[] = [
  {
    id: "luxury-fashion",
    tag: "Digital Marketing",
    title: "Luxury Fashion Brand",
    description: "Complete digital marketing overhaul for an Italian luxury brand. Increased organic search engine traffic by 250% in 6 months.",
    icon: Heart,
    image: "/images/luxury-fashion.png",
    metrics: [
      { value: "+250%", label: "Traffic Growth" },
      { value: "3.2x", label: "ROI Increase" },
    ],
  },
  {
    id: "ecommerce",
    tag: "Web Development",
    title: "E-Commerce Platform",
    description: "Full-stack ecommerce platform for premium Italian artisan products. Integrated Stripe checkout, caching, and CDN.",
    icon: ShoppingCart,
    image: "/images/ecommerce.png",
    metrics: [
      { value: "98/100", label: "PageSpeed Score" },
      { value: "1.2M", label: "Users / Month" },
    ],
  },
  {
    id: "chatbot",
    tag: "AI Services",
    title: "Smart Customer Bot",
    description: "AI support agent built using Claude API for 24/7 client care. Automatically answers 80% of customer questions.",
    icon: MessageSquare,
    image: "/images/chatbot.png",
    metrics: [
      { value: "-60%", label: "Support Cost" },
      { value: "4.8/5", label: "Client Rating" },
    ],
  },
  {
    id: "saas-dashboard",
    tag: "Web Development",
    title: "SaaS Dashboard",
    description: "Complex real-time time-series analytics dashboard. Serves active corporate clients with sub-200ms query latency.",
    icon: LayoutGrid,
    image: "/images/saas-dashboard.png",
    metrics: [
      { value: "99.9%", label: "Uptime SLA" },
      { value: "50K+", label: "Active Users" },
    ],
  },
  {
    id: "beauty-campaign",
    tag: "Social Media",
    title: "Beauty Brand Campaign",
    description: "Multi-platform growth campaign across Instagram, TikTok, and LinkedIn. Raised follower counts from 10K to 150K.",
    icon: Sparkles,
    image: "/images/beauty-campaign.png",
    metrics: [
      { value: "15x", label: "Follower Growth" },
      { value: "8.5%", label: "Engagement Rate" },
    ],
  },
  {
    id: "restaurant",
    tag: "Full Service",
    title: "Restaurant Brand Launch",
    description: "Complete localized Venezia branding, food video, and local search optimization campaign. Tripled reservation velocity.",
    icon: Utensils,
    image: "/images/restaurant.png",
    metrics: [
      { value: "3x", label: "Reservations" },
      { value: "92%", label: "Rating Score" },
    ],
  },
];

const portfolioDetailsData: Record<string, PortfolioDetail> = {
  "luxury-fashion": {
    id: "luxury-fashion",
    tag: "Digital Marketing",
    title: "Luxury Fashion Brand - Digital Transformation",
    image: "/images/luxury-fashion.png",
    overview: "Complete digital marketing overhaul for an Italian luxury fashion house targeting international markets. The client needed to establish digital authority and scale premium ecommerce conversions.",
    strategyHeading: "Strategy & Tactical Execution",
    strategyItems: [
      "Technical SEO audit and optimization targeting luxury fashion terms.",
      "High-end copy creation focusing on heritage and craftsmanship.",
      "Structured Google Ads and Instagram visual campaigns.",
      "Domain authority building via references in design journals.",
      "Segmented newsletter campaigns targeting high net-worth lists.",
    ],
    results: [
      { value: "+250%", label: "Organic traffic growth" },
      { value: "3.2x", label: "Campaign ROI increase" },
      { value: "€450K+", label: "Incremental sales generated" },
      { value: "6 Months", label: "Project timeline" },
    ],
  },
  ecommerce: {
    id: "ecommerce",
    tag: "Web Development",
    title: "Premium E-Commerce Platform",
    image: "/images/ecommerce.png",
    overview: "Full-stack e-commerce platform for premium Italian artisan products. Engineered with modular React logic and serverless database integration to handle heavy checkouts with minimal delay.",
    strategyHeading: "Technical Deliverables",
    techStack: ["Next.js (App Router)", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Stripe", "Vercel Edge"],
    features: [
      "Sub-second faceted product search and filter routing.",
      "Smooth hardware-accelerated product slide displays.",
      "Safe, PCI-compliant Stripe API billing structures.",
      "Live order inventory checks.",
      "Bespoke buyer dashboard tracking shipments.",
    ],
    strategyItems: [
      "Optimized load times with Next.js dynamic static generation.",
      "Secured safe global transactions via direct Stripe API hooks.",
      "Configured multi-layered edge caching on Vercel's global CDN.",
    ],
    results: [
      { value: "98/100", label: "Google PageSpeed score" },
      { value: "1.2M", label: "Monthly unique buyers" },
      { value: "99.99%", label: "Platform uptime rate" },
      { value: "€2.3M", label: "Annual transactions volume" },
    ],
  },
  chatbot: {
    id: "chatbot",
    tag: "AI Services",
    title: "AI-Powered Customer Support Agent",
    image: "/images/chatbot.png",
    overview: "Designed and engineered an automated chatbot using Claude API for 24/7 client operations. The bot processes structured help queues, freeing up staff and raising customer feedback scores.",
    strategyHeading: "Core System Capabilities",
    features: [
      "Direct answers on shipping schedules, returns, and inventory.",
      "Real-time courier updates via API link.",
      "Safe hand-off path to staff with clean logs.",
      "Multi-lingual supports (Italian, English, German, French).",
      "Unified metrics dashboard showing client satisfaction.",
    ],
    strategyItems: [
      "Interfacing Claude LLM with vector database trained on support scripts.",
      "Integrating ticketing webhooks for live profile updates.",
      "Automating human agent handover protocols for edge cases.",
    ],
    results: [
      { value: "60%", label: "Customer support cost saved" },
      { value: "4.8/5", label: "Satisfaction reviews rating" },
      { value: "80%", label: "Tickets solved autonomously" },
      { value: "< 2 min", label: "Average response time" },
    ],
  },
  "saas-dashboard": {
    id: "saas-dashboard",
    tag: "Web Development",
    title: "Enterprise Analytics SaaS Dashboard",
    image: "/images/saas-dashboard.png",
    overview: "A complex analytics dashboard visualizing heavy time-series client datasets. Renders high-frequency query updates with responsive rendering speeds.",
    strategyHeading: "Software Architecture",
    techStack: ["React", "TypeScript", "D3.js Visualization", "Node.js (Express)", "PostgreSQL (TimescaleDB)", "Redis Cache", "AWS Serverless"],
    features: [
      "Streaming WebSockets delivering data feeds.",
      "Export utilities for CSV, PDF, and JSON datasets.",
      "Faceted interactive drilldown views.",
      "Unified tenant-level user permission rules (RBAC).",
      "Custom scheduled metric report mailers.",
    ],
    strategyItems: [
      "Optimized query speeds utilizing TimescaleDB database partitioning.",
      "Configured high-speed memory buffers using Redis caches.",
      "Engineered hardware-accelerated grid lines with custom D3 logic.",
    ],
    results: [
      { value: "99.9%", label: "Corporate SLA uptime" },
      { value: "50K+", label: "Active dashboards" },
      { value: "200ms", label: "Average query response" },
      { value: "1B+", label: "Monthly data feeds tracked" },
    ],
  },
  "beauty-campaign": {
    id: "beauty-campaign",
    tag: "Social Media",
    title: "Beauty Brand Growth Campaign",
    image: "/images/beauty-campaign.png",
    overview: "Unified visual content design and distribution campaign for a beauty brand across Instagram, TikTok, and LinkedIn. Raised engagement metrics and drove social store referrals.",
    strategyHeading: "Social Strategies",
    strategyItems: [
      "High-contrast product animations tailored for TikTok reels.",
      "Micro-influencer PR mailings and content amplification.",
      "Prompt response structures raising profile weights.",
      "Faceted educational copy describing clean skin values.",
      "Weekly analytics review mapping content performance.",
    ],
    results: [
      { value: "15x", label: "Audience follower scale" },
      { value: "8.5%", label: "Average engagement rate" },
      { value: "150K", label: "Total active audience" },
      { value: "€850K", label: "Direct referral transactions" },
    ],
  },
  restaurant: {
    id: "restaurant",
    tag: "Full Service",
    title: "Fine Dining Restaurant Venezia Launch",
    image: "/images/restaurant.png",
    overview: "Complete identity redesign, localization, and launch campaign for a fine dining spot in Mestre/Venezia. Merged sensory offline photography with optimized local SEO listings.",
    strategyHeading: "Scope of Work",
    strategyItems: [
      "Bespoke visual identity suite (vector logo, typography, paper stocks).",
      "Stunning, responsive reservation web portal.",
      "High-end food visuals capturing seasonal Venezia plates.",
      "Local SEO maps citation updates capturing tourist lookups.",
      "Targeted digital placements capturing dining leads.",
    ],
    results: [
      { value: "3x", label: "Reservation velocity" },
      { value: "92%", label: "Positive reviews score" },
      { value: "5K+", label: "Monthly web portal visits" },
      { value: "€200K+", label: "First year revenue increase" },
    ],
  },
};

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<PortfolioDetail | null>(null);
  const [dots, setDots] = useState<{ id: number; size: number; x: number; y: number; duration: number }[]>([]);

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
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.98, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 18 },
    },
  };

  const handleOpenProject = (id: string) => {
    setSelectedProject(portfolioDetailsData[id] || null);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
  };

  return (
    <section
      id="portfolio"
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

      {/* Breathing glow — top-right */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.24, 0.1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] right-[-5%] w-[440px] h-[440px] rounded-full bg-white/10 blur-[120px] pointer-events-none z-0"
      />
      {/* Secondary glow — bottom-left */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.06, 0.16, 0.06] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 6 }}
        className="absolute bottom-[-10%] left-[-5%] w-[360px] h-[360px] rounded-full bg-white/8 blur-[100px] pointer-events-none z-0"
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
            Case Studies
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.08]"
          >
            Featured{" "}
            <span className="font-light text-neutral-400 text-glow">
              Projects.
            </span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-neutral-500 text-sm leading-relaxed max-w-lg"
          >
            Real outcomes. Selected stories showing how we help brands scale online platforms and launch systems.
          </motion.p>
        </motion.div>

        {/* ── Portfolio Grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {portfolioList.map((project) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.id}
                variants={itemVariants}
                onClick={() => handleOpenProject(project.id)}
                className="group relative rounded-2xl border border-neutral-900 bg-neutral-950/20 hover:bg-neutral-950/50 hover:border-neutral-800 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
              >
                {/* Image Preview Area */}
                <div className="relative w-full aspect-[16/10] overflow-hidden border-b border-neutral-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                  />
                  {/* Glass Overlay Tag */}
                  <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-neutral-950/75 border border-neutral-800 backdrop-blur-md">
                    <span className="text-[8px] font-mono font-bold tracking-widest text-neutral-400 uppercase">
                      {project.tag}
                    </span>
                  </div>
                  {/* Category icon */}
                  <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-neutral-950/75 border border-neutral-800 backdrop-blur-md flex items-center justify-center text-neutral-500 group-hover:text-white transition-colors duration-300">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-base font-semibold text-white tracking-tight mb-2 leading-snug group-hover:text-glow transition-all duration-300">
                    {project.title}
                  </h3>
                  <p className="text-xs text-neutral-600 group-hover:text-neutral-400 leading-relaxed line-clamp-3 mb-6 transition-colors duration-300">
                    {project.description}
                  </p>

                  {/* Metrics Row */}
                  {/* <div className="mt-auto pt-4 border-t border-neutral-900 grid grid-cols-2 gap-4">
                    {project.metrics.map((metric, idx) => (
                      <div key={idx} className="text-left">
                        <span className="text-sm font-bold text-white tracking-tight">
                          {metric.value}
                        </span>
                        <p className="text-[9px] font-mono text-neutral-600 uppercase tracking-wider mt-0.5">
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div> */}
                </div>

                {/* Bottom slide-in accent line */}
                <div className="absolute bottom-0 left-0 h-[1.5px] w-0 group-hover:w-full bg-gradient-to-r from-transparent via-neutral-500 to-transparent transition-all duration-500 ease-out" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Case Study Detail Modal */}
      <Modal
        isOpen={selectedProject !== null}
        onClose={handleCloseProject}
        title={selectedProject?.title}
        subtitle={selectedProject?.tag}
      >
        {selectedProject && (
          <div className="space-y-6">

            {/* Modal Hero Image */}
            <div className="w-full aspect-[16/9] rounded-xl overflow-hidden border border-neutral-900">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-sm text-neutral-400 leading-relaxed text-left">
              {selectedProject.overview}
            </p>

            {/* Strategy Items */}
            <div className="border-t border-neutral-900 pt-5">
              <h4 className="text-xs font-mono font-bold tracking-widest text-neutral-500 uppercase mb-3 text-left">
                {selectedProject.strategyHeading}
              </h4>
              <ul className="space-y-2">
                {selectedProject.strategyItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-400 text-left">
                    <CheckCircle className="w-3.5 h-3.5 text-neutral-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack (if available) */}
            {selectedProject.techStack && (
              <div className="border-t border-neutral-900 pt-5 text-left">
                <h4 className="text-xs font-mono font-bold tracking-widest text-neutral-500 uppercase mb-3">
                  TECHNOLOGY STACK
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-[10px] font-mono rounded bg-neutral-900 border border-neutral-800 text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Key Features (if available) */}
            {selectedProject.features && (
              <div className="border-t border-neutral-900 pt-5 text-left">
                <h4 className="text-xs font-mono font-bold tracking-widest text-neutral-500 uppercase mb-3">
                  SYSTEM CAPABILITIES
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedProject.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-neutral-400">
                      <span className="w-1 h-1 rounded-full bg-neutral-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Results Grid */}
            <div className="border-t border-neutral-900 pt-5 text-left">
              <h4 className="text-xs font-mono font-bold tracking-widest text-neutral-500 uppercase mb-4">
                RESULTS DELIVERED
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {selectedProject.results.map((res, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-neutral-900 bg-neutral-950/40"
                  >
                    <div className="text-base font-bold text-white tracking-tight">
                      {res.value}
                    </div>
                    <div className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider mt-0.5 leading-normal">
                      {res.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* <div className="border-t border-neutral-900 pt-5 text-left flex justify-end">
              <button
                onClick={handleCloseProject}
                className="px-5 py-2.5 border border-neutral-850 hover:bg-neutral-900 transition-colors text-xs font-semibold uppercase tracking-wider rounded-lg text-white cursor-pointer"
              >
                Close Project Case
              </button>
            </div> */}
          </div>
        )}
      </Modal>
    </section>
  );
}
