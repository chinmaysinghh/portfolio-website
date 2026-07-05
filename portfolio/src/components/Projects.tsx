"use client";

import { motion } from "framer-motion";

const projects = [
  {
    index: "01",
    title: "SleepTransformer",
    subtitle: "4-class sleep stage classification from wearable data",
    stack: ["PyTorch", "MESA Dataset", "Transformers", "CNN-LSTM"],
    detail:
      "A research pipeline that takes raw wrist-worn actigraphy and heart-rate signals through preprocessing, a CNN-LSTM baseline, and a custom transformer architecture — benchmarked end to end for sleep stage prediction. The transformer beat the baseline by a wide margin; the open work now is taming overfitting and class imbalance across sleep stages.",
    visual: "wave",
  },
  {
    index: "02",
    title: "Predictive Maintenance for Automotive Systems",
    subtitle: "Comparative ML study for failure prediction",
    stack: ["Decision Trees", "SVM", "Random Forest", "K-Means", "Autoencoders"],
    detail:
      "A comparative study of classical and unsupervised methods for predicting automotive system failures ahead of time — built out as a full research paper with model benchmarking across five distinct approaches, from decision trees to autoencoder-based anomaly detection.",
    visual: "grid",
  },
  {
    index: "03",
    title: "This Portfolio",
    subtitle: "An editorial, non-dashboard personal site",
    stack: ["Next.js", "TypeScript", "Tailwind v4", "Framer Motion"],
    detail:
      "Built deliberately against the template: no cards, no bento grids, no dashboard patterns. Every section carries its own layout logic, from a scroll-driven experience log to a constellation of skills — an attempt to make a portfolio feel handcrafted rather than generated.",
    visual: "lines",
  },
];

function Visual({ type }: { type: string }) {
  if (type === "wave") {
    return (
      <svg viewBox="0 0 400 200" className="w-full h-full">
        <motion.path
          d="M0,100 C40,40 80,160 120,100 C160,40 200,160 240,100 C280,40 320,160 360,100 L400,100"
          fill="none"
          stroke="#2fd6a7"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />
        <motion.path
          d="M0,120 C40,90 80,150 120,120 C160,90 200,150 240,120 C280,90 320,150 360,120 L400,120"
          fill="none"
          stroke="#5c655f"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, delay: 0.2, ease: "easeInOut" }}
        />
      </svg>
    );
  }
  if (type === "grid") {
    return (
      <svg viewBox="0 0 400 200" className="w-full h-full">
        {Array.from({ length: 6 }).map((_, r) =>
          Array.from({ length: 10 }).map((_, c) => (
            <motion.circle
              key={`${r}-${c}`}
              cx={20 + c * 38}
              cy={20 + r * 32}
              r={2}
              fill={(r + c) % 5 === 0 ? "#2fd6a7" : "#3a423e"}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (r * 10 + c) * 0.01 }}
            />
          ))
        )}
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.line
          key={i}
          x1={0}
          y1={40 + i * 32}
          x2={400}
          y2={40 + i * 32}
          stroke={i === 2 ? "#2fd6a7" : "#3a423e"}
          strokeWidth={i === 2 ? 1.5 : 1}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: i * 0.1 }}
        />
      ))}
    </svg>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative px-6 md:px-12 py-28 md:py-40">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-16">
          Projects — 05
        </p>

        <div className="space-y-28 md:space-y-40">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div>
                <span className="font-mono text-6xl md:text-8xl text-ink-faint/30 leading-none">
                  {p.index}
                </span>
                <h3 className="font-display text-3xl md:text-5xl tracking-tight text-ink mt-4 mb-3">
                  {p.title}
                </h3>
                <p className="text-accent text-sm mb-6">{p.subtitle}</p>
                <p className="text-ink-dim leading-relaxed text-[15px] max-w-lg mb-6">
                  {p.detail}
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[11px] text-ink-faint uppercase tracking-wide"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="aspect-[4/2.2] w-full">
                <Visual type={p.visual} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
