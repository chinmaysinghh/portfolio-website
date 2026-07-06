"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const log = [
  {
    tag: "current",
    role: "Software Development Engineer (Part-Time)",
    company: "Guru Software",
    period: "Jul 2025 — Present",
    place: "Ahmedabad, Gujarat",
    detail:
      "Assisting in building core modules of a Jewellery CRM system by improving UI workflows, fixing critical bugs, and enhancing module stability. Developing functional features such as inventory tracking, pricing updates, and product/category mappings, and collaborating with senior developers to refine business logic and optimize API interactions between frontend and backend.",
  },
  {
    tag: "internship",
    role: "Software Development Intern",
    company: "Guru Software",
    period: "Jan 2025 — Jul 2025",
    place: "Ahmedabad, Gujarat",
    detail:
      "Developed and integrated responsive UI components using React.js and Bootstrap for a web-based Jewellery CRM system, enhancing usability and cross-device compatibility. Implemented secure API integration with JWT authentication for real-time data exchange, and designed modules for inventory, billing, and customer management.",
  },
];

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.4"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  return (
    <section
      id="experience"
      ref={ref}
      className="relative px-6 md:px-12 py-28 md:py-40 bg-bg-raised"
    >
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-16">
          Experience — 04
        </p>

        <div className="grid grid-cols-[3px_1fr] md:grid-cols-[3px_120px_1fr] gap-x-6 md:gap-x-10">
          <div className="relative rounded-full bg-white/5 overflow-hidden">
            <motion.div
              style={{ scaleY: progress, transformOrigin: "top" }}
              className="absolute inset-0 bg-accent rounded-full"
            />
          </div>

          <div className="hidden md:block" />

          <div className="space-y-16 md:-mt-1">
            {log.map((entry, i) => (
              <motion.div
                key={entry.role + entry.period}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="grid md:grid-cols-[120px_1fr] gap-x-10"
              >
                <p className="font-mono text-[11px] text-accent uppercase tracking-widest mb-2 md:mb-0">
                  {entry.tag}
                </p>
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                    <h3 className="font-display text-xl md:text-2xl text-ink tracking-tight">
                      {entry.role}
                    </h3>
                    <p className="font-mono text-[11px] text-ink-faint uppercase tracking-widest whitespace-nowrap">
                      {entry.period}
                    </p>
                  </div>
                  <p className="text-xs text-ink-faint uppercase tracking-wide mb-3">
                    {entry.company} · {entry.place}
                  </p>
                  <p className="text-ink-dim leading-relaxed text-[15px] max-w-xl">
                    {entry.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}