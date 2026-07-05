"use client";

import { motion } from "framer-motion";

const papers = [
  {
    title: "AI-Driven Brain Tumor Segmentation: A Review",
    venue: "MBCC 2026, IIT Mandi",
    authors: "Chinmay · Kush Vaidya · Deval Bhavsar",
    note: "Guided by Dr. Santosh Satapathy",
    abstract:
      "A survey of deep learning approaches to brain tumor segmentation, tracing the progression from support vector machines through convolutional networks to U-Net and transformer-based architectures.",
  },
  {
    title: "Sleep Stage Classification from Wrist-Worn Wearables",
    venue: "MESA Dataset · Ongoing",
    authors: "Chinmay",
    note: "CNN-LSTM baseline vs. SleepTransformer",
    abstract:
      "A comparative study of a CNN-LSTM baseline against a custom transformer architecture for 4-class sleep stage prediction, using actigraphy and heart rate signals. Includes a full pipeline from multimodal signal acquisition through explainability and clinical validation.",
  },
  {
    title: "AI-Driven Predictive Maintenance in Automotive Systems",
    venue: "Conference Submission",
    authors: "Chinmay",
    note: "Decision Trees · SVM · Random Forest · K-Means · Autoencoders",
    abstract:
      "A benchmarking study comparing five machine learning approaches for predicting automotive component failure ahead of occurrence, spanning supervised and unsupervised methods.",
  },
];

export default function Research() {
  return (
    <section id="research" className="relative px-6 md:px-12 py-28 md:py-40 bg-bg-raised">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-baseline justify-between mb-16 flex-wrap gap-4">
          <p className="font-mono text-xs text-accent uppercase tracking-[0.2em]">
            Research — 06
          </p>
          <p className="font-mono text-xs text-ink-faint uppercase tracking-[0.2em]">
            Archive · Vol. I
          </p>
        </div>

        <div>
          {papers.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.05 }}
              className="py-10 border-t"
              style={{ borderColor: "rgba(243,239,230,0.1)" }}
            >
              <div className="grid md:grid-cols-[1fr_auto] gap-x-8 gap-y-2 mb-4">
                <h3 className="font-display text-2xl md:text-3xl tracking-tight text-ink">
                  {p.title}
                </h3>
                <p className="font-mono text-xs text-accent uppercase tracking-widest self-start md:text-right">
                  {p.venue}
                </p>
              </div>
              <p className="text-sm text-ink-dim mb-1">{p.authors}</p>
              <p className="text-xs text-ink-faint italic mb-4">{p.note}</p>
              <p className="text-ink-dim leading-relaxed text-[15px] max-w-2xl">
                {p.abstract}
              </p>
            </motion.article>
          ))}
          <div className="border-t" style={{ borderColor: "rgba(243,239,230,0.1)" }} />
        </div>
      </div>
    </section>
  );
}
