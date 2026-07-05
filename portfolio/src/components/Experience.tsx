"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const log = [
  {
    tag: "current",
    role: "Software Engineer (Part-time)",
    detail:
      "Building and maintaining product features while completing an M.Tech in AI — shipping frontend and full-stack work on a schedule split around research and coursework.",
  },
  {
    tag: "research",
    role: "Sleep Stage Classification, MESA Dataset",
    detail:
      "Designed and compared a CNN-LSTM baseline against a custom SleepTransformer for 4-class sleep stage prediction from wrist-worn actigraphy and heart rate signals. The transformer improved substantially over baseline, with overfitting and class imbalance as open problems.",
  },
  {
    tag: "conference",
    role: "MBCC 2026, IIT Mandi",
    detail:
      "Presented a review paper on AI-driven brain tumor segmentation — covering SVMs, CNNs, U-Net, and transformer architectures — co-authored with Kush Vaidya and Deval Bhavsar, guided by Dr. Santosh Satapathy.",
  },
  {
    tag: "coursework",
    role: "Applied ML & Explainability Labs",
    detail:
      "Explainable AI work using SHAP on an EEG seizure dataset, plus presentations on U-KAN, MedSAMix, and MedSMILE for medical image segmentation coursework.",
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
                key={entry.role}
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
                  <h3 className="font-display text-xl md:text-2xl text-ink mb-2 tracking-tight">
                    {entry.role}
                  </h3>
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
