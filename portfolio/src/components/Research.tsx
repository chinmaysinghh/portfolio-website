"use client";

import { motion } from "framer-motion";

const papers = [
  {
    title: "A Comprehensive Review of Artificial Intelligence-Driven Methods for Brain Tumor Segmentation",
    venue: "MBCC 2026, IIT Mandi",
    abstract:
      "Diagnosis of brain tumors using MRI scans is currently a very tedious and error-prone manual process, which is why this study evaluates how artificial intelligence has been transforming this process. The paper examines the development of the technologies that were used for this purpose in the past, ranging from support vector machines to convolutional neural networks and U-Net, and compares their performance on the task of detecting and segmenting the tumors on the images. The idea was to produce a clear map of the current state of the art in the field.",
  },
  {
    title: "AI-Aided Predictive Maintenance in Automotive Systems — A Comparative Review",
    venue: "MVAI Conference, SVNIT",
    abstract:
      "The cars produce data from sensors on an ongoing basis, yet maintenance is done based on regular intervals irrespective of any failure happening in the vehicle. This research paper analyses how artificial intelligence and machine learning techniques are used to make a change in the situation and predict failures before it occurs. The five different machine learning techniques – decision tree, SVM, random forest, K-means clustering, and autoencoder are analysed on actual applications related to automotive industry, comparing pros and cons of each approach.",
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