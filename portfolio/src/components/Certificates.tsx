"use client";

import { motion } from "framer-motion";

const documents = [
  { title: "Add certificate title", issuer: "Issuing body", year: "20XX", rotate: -4 },
  { title: "Add certificate title", issuer: "Issuing body", year: "20XX", rotate: 3 },
  { title: "Add certificate title", issuer: "Issuing body", year: "20XX", rotate: -2 },
];

export default function Certificates() {
  return (
    <section id="certificates" className="relative px-6 md:px-12 py-28 md:py-40">
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-4">
          Certificates — 09
        </p>
        <p className="text-ink-faint text-xs mb-16 font-mono">
          / placeholder slots — replace with real certificates /
        </p>

        <div className="relative flex flex-wrap gap-x-14 gap-y-16 justify-center md:justify-start pt-6">
          {/* hanging line */}
          <div
            className="absolute -top-2 left-0 right-0 h-px hidden md:block"
            style={{ background: "rgba(243,239,230,0.15)" }}
          />
          {documents.map((doc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              style={{ rotate: doc.rotate, borderColor: "rgba(243,239,230,0.12)" }}
              whileHover={{ rotate: 0, y: -6 }}
              className="relative w-48 aspect-[3/4] bg-bg-raised border p-5 flex flex-col justify-between"
            >
              <span
                className="absolute -top-6 left-1/2 -translate-x-1/2 w-px h-6 hidden md:block"
                style={{ background: "rgba(243,239,230,0.2)" }}
              />
              <div>
                <p className="font-mono text-[10px] text-accent uppercase tracking-widest mb-3">
                  Certificate
                </p>
                <h3 className="font-display text-base text-ink leading-snug">
                  {doc.title}
                </h3>
              </div>
              <div>
                <p className="text-xs text-ink-dim">{doc.issuer}</p>
                <p className="font-mono text-[11px] text-ink-faint mt-1">
                  {doc.year}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
