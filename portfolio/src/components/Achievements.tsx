"use client";

import { motion } from "framer-motion";

type Milestone = {
  title: string;
  place: string;
  note: string;
  image?: string; // photo, screenshot, or figure representing the achievement
  rotate: number;
};

const milestones: Milestone[] = [
  {
    title: "Presented at MBCC 2026",
    place: "IIT Mandi",
    note: "Delivered a review paper on AI-driven brain tumor segmentation to a national research audience.",
    image: undefined,
    rotate: -3,
  },
  {
    title: "SleepTransformer outperformed baseline",
    place: "MESA Dataset research",
    note: "Substantial accuracy gains over a CNN-LSTM baseline on 4-class sleep stage prediction.",
    image: undefined,
    rotate: 2,
  },
  {
    title: "Two research papers in parallel with full-time coursework",
    place: "M.Tech + part-time SWE role",
    note: "Brain tumor segmentation review and automotive predictive maintenance study, alongside a part-time software engineering role.",
    image: undefined,
    rotate: -2,
  },
  {
    title: "Built a research pipeline end to end",
    place: "Signal acquisition → XAI → clinical validation",
    note: "Diagrammed and implemented a full multimodal pipeline, not just a model — acquisition, preprocessing, modeling, explainability, and validation.",
    image: undefined,
    rotate: 3,
  },
];

function MilestonePin({ rotate }: { rotate: number }) {
  return (
    <div
      className="absolute -top-4 left-1/2 -translate-x-1/2 flex flex-col items-center"
      style={{ transform: `translateX(-50%) rotate(${-rotate}deg)` }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-accent/70" />
      <span className="w-px h-3" style={{ background: "rgba(243,239,230,0.2)" }} />
    </div>
  );
}

function MilestoneFigure({ image, title }: { image?: string; title: string }) {
  if (image) {
    return (
      <div className="relative w-full aspect-[4/3] overflow-hidden border-b" style={{ borderColor: "rgba(243,239,230,0.12)" }}>
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover grayscale-[15%] contrast-[1.03] transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
    );
  }
  return (
    <div
      className="relative w-full aspect-[4/3] border-b flex items-center justify-center"
      style={{ borderColor: "rgba(243,239,230,0.12)", background: "rgba(243,239,230,0.02)" }}
    >
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="1" y="1" width="26" height="26" rx="2" stroke="rgba(243,239,230,0.2)" strokeWidth="1" />
        <path d="M7 19 L11 13 L15 17 L21 9" stroke="rgba(243,239,230,0.2)" strokeWidth="1" fill="none" />
      </svg>
    </div>
  );
}

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="relative px-6 md:px-12 py-28 md:py-40 bg-bg-raised overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-16">
          Achievements — 08
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-20 pt-4">
          {milestones.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.1 }}
              style={{ rotate: m.rotate, borderColor: "rgba(243,239,230,0.12)" }}
              whileHover={{ rotate: 0, y: -6 }}
              className="group relative bg-bg-raised border flex flex-col overflow-hidden"
            >
              <MilestonePin rotate={m.rotate} />

              <MilestoneFigure image={m.image} title={m.title} />

              <div className="p-6 flex flex-col gap-3">
                <p className="font-mono text-[11px] text-accent uppercase tracking-widest">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display text-lg md:text-xl text-ink tracking-tight leading-snug">
                  {m.title}
                </h3>
                <p className="text-xs text-ink-faint uppercase tracking-wide">
                  {m.place}
                </p>
                <p className="text-ink-dim text-sm leading-relaxed">
                  {m.note}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}