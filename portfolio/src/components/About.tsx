"use client";

import { motion } from "framer-motion";

const stamps = [
  { label: "based in", value: "Ahmedabad, IN" },
  { label: "role", value: " Software Developer / AI Engineer" },
  { label: "studying", value: "M.Tech AI, 2025–27" },
  
  
];

export default function About() {
  return (
    <section
      id="about"
      className="relative px-6 md:px-12 py-28 md:py-40 bg-bg-raised border-y border-white/5"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-y-12 gap-x-8">
        {/* Eyebrow + oversized quote, asymmetric offset */}
        <div className="md:col-span-2">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-mono text-xs text-accent uppercase tracking-[0.2em] sticky top-28"
          >
            About
            <br />— 02
          </motion.p>
        </div>

        <div className="md:col-span-7">
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display text-3xl md:text-5xl leading-[1.15] tracking-tight text-ink"
          >
            I think of engineering and research as the same discipline —
            <span className="text-ink-dim"> one asks whether it works, the other asks why.</span>
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-12 space-y-5 text-ink-dim leading-relaxed text-[15px] md:text-base max-w-xl"
          >
            {/* <p>
              I am presently pursuing my M.Tech in Artificial Intelligence from Pandit Deendayal Energy University while working as a Software Development Engineer. I love coming up with innovative solutions to solve practical issues and researching about ideas which will shape the future of artificial intelligence. From scaling web applications to enhancing user experience and experimenting with deep learning, I am constantly driven by my passion for learning more. Apart from all this, I love night drives, discovering new places, and anything and everything that has to do with cars.
            </p>
            <p>
              My research lives in wearable sensing and medical imaging:
              classifying sleep stages from wrist-worn actigraphy and heart
              rate data, and reviewing deep learning approaches to brain
              tumor segmentation. My engineering lives in frontend systems
              and enterprise products — interfaces that need to feel as
              considered as the models behind them.
            </p>
            <p>
              Outside of both: cars, late-night driving, and the kind of
              quiet that makes hard problems easier to think through.
            </p> */}
          </motion.div>
        </div>

        {/* Digital passport stamps, right column */}
        <div className="md:col-span-3 md:pl-6 md:border-l" style={{ borderColor: "rgba(243,239,230,0.08)" }}>
          <p className="font-mono text-xs text-ink-faint uppercase tracking-[0.2em] mb-6">
            At a Glance
          </p>
          <div className="space-y-5">
            {stamps.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex flex-col border-b pb-3"
                style={{ borderColor: "rgba(243,239,230,0.08)" }}
              >
                <span className="font-mono text-[10px] text-accent uppercase tracking-widest">
                  {s.label}
                </span>
                <span className="text-sm text-ink mt-1">{s.value}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
