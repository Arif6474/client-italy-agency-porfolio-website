"use client";

import { motion, Variants } from "framer-motion";

interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  avatar: string;
  color: string;
}

const testimonials: TestimonialItem[] = [
  {
    quote:
      "Exceeded our expectations with innovative designs that brought our vision to life — a truly remarkable creative agency.",
    author: "Samantha Johnson",
    role: "CEO and Co-founder of ABC Company",
    avatar: "SJ",
    color: "bg-amber-500",
  },
  {
    quote:
      "Their ability to capture our brand essence in every project is unparalleled — an invaluable creative collaborator.",
    author: "Isabella Rodriguez",
    role: "Brand Director at Nova Creative",
    avatar: "IR",
    color: "bg-rose-500",
  },
  {
    quote:
      "Creative geniuses who listen, understand, and craft captivating visuals — an agency that truly understands our needs.",
    author: "Gabrielle Williams",
    role: "CEO and Co-founder of Luxe Studio",
    avatar: "GW",
    color: "bg-violet-500",
  },
  {
    quote:
      "StudioWebDigital completely transformed our digital presence. Sales increased by 180% in the first quarter after launch!",
    author: "Lucia Santoro",
    role: "CEO, Italian Fashion House",
    avatar: "LS",
    color: "bg-emerald-500",
  },
  {
    quote:
      "From concept to execution, their creativity knows no bounds — a game-changer for our brand's success.",
    author: "Natalie Martinez",
    role: "CMO at GrowthLab",
    avatar: "NM",
    color: "bg-pink-500",
  },
  {
    quote:
      "Their team's artistic flair and strategic approach resulted in remarkable campaigns — a reliable creative partner.",
    author: "John Peter",
    role: "Founder of Apex Brands",
    avatar: "JP",
    color: "bg-sky-500",
  },
  {
    quote:
      "A refreshing and imaginative agency that consistently delivers exceptional results — highly recommended.",
    author: "Victoria Thompson",
    role: "Director, Meridian Group",
    avatar: "VT",
    color: "bg-orange-500",
  },
  {
    quote:
      "The AI chatbot they built handles 80% of our inquiries automatically — intelligent, natural, and incredibly effective.",
    author: "Marco Rossi",
    role: "Founder, Tech Startup Milano",
    avatar: "MR",
    color: "bg-indigo-500",
  },
  {
    quote:
      "Working with StudioWebDigital was a game-changer. Their social strategy grew our brand awareness exponentially.",
    author: "Giulia Bianchi",
    role: "Marketing Director, Beauty Brand",
    avatar: "GB",
    color: "bg-teal-500",
  },
  {
    quote:
      "Stunning designs delivered on time, every time. The attention to detail and Italian elegance truly sets them apart.",
    author: "Andrei Popescu",
    role: "COO at Elevate Digital",
    avatar: "AP",
    color: "bg-cyan-500",
  },
];

// Split evenly into two rows
const row1 = testimonials.slice(0, 5);
const row2 = testimonials.slice(5);

function TestimonialCard({ item }: { item: TestimonialItem }) {
  return (
    <div className="flex-shrink-0 w-[300px] sm:w-[340px] md:w-[380px] mr-5 p-5 sm:p-6 rounded-2xl border border-neutral-800/70 bg-neutral-950/70 hover:bg-neutral-900/70 hover:border-neutral-700 transition-all duration-300 text-left flex flex-col gap-4 cursor-default group">
      {/* Quote mark */}
      <span className="text-4xl sm:text-5xl font-serif text-neutral-600 leading-none select-none group-hover:text-neutral-500 transition-colors">
        &#8220;&#8220;
      </span>

      {/* Quote text */}
      <p className="text-sm text-neutral-200 leading-relaxed flex-1 font-medium">
        {item.quote}
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className={`w-9 h-9 rounded-full ${item.color} flex items-center justify-center text-[11px] font-bold text-white shrink-0 shadow-md`}
        >
          {item.avatar}
        </div>
        <div>
          <p className="text-sm font-semibold text-white leading-tight">{item.author}</p>
          <p className="text-[11px] text-neutral-500 mt-0.5 leading-tight">{item.role}</p>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: TestimonialItem[];
  reverse?: boolean;
}) {
  // Duplicate for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden relative w-full">
      {/* Left + right gradient masks */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

      <div
        className={`flex w-max ${
          reverse ? "animate-[marquee-reverse_35s_linear_infinite]" : "animate-[marquee_35s_linear_infinite]"
        } hover:[animation-play-state:paused]`}
      >
        {doubled.map((item, idx) => (
          <TestimonialCard key={idx} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const headerVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      id="testimonials"
      className="scroll-section relative px-0 py-0 z-10 w-full overflow-hidden border-t border-neutral-900/60 bg-[#050505] flex flex-col justify-center"
    >
      <div className="w-full flex flex-col gap-6 py-16 sm:py-20">

        {/* Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center space-y-3 px-6 mb-4"
        >
          <p className="text-[10px] tracking-[0.25em] font-mono text-neutral-500 uppercase">
            ✦ &nbsp; WHAT CLIENTS SAY
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Trusted by{" "}
            <span className="font-light text-neutral-400">Ambitious Teams.</span>
          </h2>
          <p className="text-neutral-500 text-sm leading-relaxed max-w-lg mx-auto">
            Real feedback from businesses who partnered with us to build extraordinary digital experiences.
          </p>
        </motion.div>

        {/* Row 1 — scrolls left */}
        <MarqueeRow items={row1} reverse={false} />

        {/* Row 2 — scrolls right (opposite direction) */}
        <MarqueeRow items={row2} reverse={true} />

      </div>
    </section>
  );
}
