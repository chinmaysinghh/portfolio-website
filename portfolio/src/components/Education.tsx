"use client";

import { motion } from "framer-motion";

type EducationEntry = {
  year: string;
  title: string;
  place: string;
  grade: string;       // e.g. "CGPA 8.7 / 10"
  gradeLabel: string;  // e.g. "current cgpa"
  tags: string[];      // short coursework / focus keywords, not sentences
};

const journey: EducationEntry[] = [
  {
    year: "2025 — 2027",
    title: "M.Tech, Artificial Intelligence",
    place: "Pandit Deendayal Energy University, Gandhinagar",
    grade: "CGPA — 7.75/10",       // TODO: replace with your actual CGPA
    gradeLabel: "current cgpa",
    tags: ["Deep Learning", "Explainable AI", "Time Series", "Research Methodology"],
  },
  {
    year: "2021 — 2025",
    title: "B.Tech, Computer Engineering", // TODO: confirm exact degree title
    place: "Engineering, pre-M.Tech",       // TODO: replace with your university name
    grade: "CGPA — 8.24/10",                    // TODO: replace with your actual CGPA
    gradeLabel: "final cgpa",
    tags: ["Programming Fundamentals", "Systems Thinking", "Machine Learning"],
  },
];

export default function Education() {
  return (
    <section id="education" className="relative px-6 md:px-12 py-28 md:py-40">
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-16">
          Education — 03
        </p>

        <div className="relative">
          {/* connecting path — centered inside the rail column below, so it always meets the dots */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
            className="absolute left-4 md:left-6 top-2 bottom-2 w-px bg-linear-to-b from-accent via-accent-dim to-transparent"
          />

          <div className="space-y-20">
            {journey.map((j, i) => (
              <motion.div
                key={j.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="grid grid-cols-[2rem_1fr] md:grid-cols-[3rem_1fr] gap-x-2"
              >
                {/* rail: dot centered on the same line as above, regardless of column width */}
                <div className="relative">
                  <span className="absolute left-1/2 top-1.5 w-2.5 h-2.5 -translate-x-1/2 rounded-full bg-accent" />
                </div>

                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-10">
                  {/* left: identity */}
                  <div className="max-w-xl">
                    <p className="font-mono text-xs text-ink-faint uppercase tracking-widest mb-3">
                      {j.year}
                    </p>
                    <h3 className="font-display text-2xl md:text-4xl tracking-tight text-ink mb-2">
                      {j.title}
                    </h3>
                    <p className="text-sm text-accent mb-5">{j.place}</p>

                    {/* coursework / focus tags, not a paragraph */}
                    <div className="flex flex-wrap gap-2">
                      {j.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[11px] tracking-wide text-ink-dim border border-ink-dim/20 rounded-full px-3 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* right: the number that matters */}
                  <div className="shrink-0 md:text-right border-t md:border-t-0 md:border-l border-ink-dim/15 pt-4 md:pt-0 md:pl-10">
                    <p className="font-display text-3xl md:text-4xl text-ink tracking-tight">
                      {j.grade}
                    </p>
                    <p className="font-mono text-[11px] text-ink-faint uppercase tracking-widest mt-1">
                      {j.gradeLabel}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}