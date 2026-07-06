"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Milestone = {
  title: string;
  place: string;
  note: string;
  date?: string;
  link?: string;
  images?: string[];
};

const milestones: Milestone[] = [
  {
    title: "Presented at MBCC 2026",
    place: "IIT Mandi",
    date: "June 2026",
    note: "Delivered a review paper on AI-driven brain tumor segmentation to a national research audience.",
    images: ["/images/chinmay-iitmandi.jpg"],
  },
  {
    title: "Google Cloud Facilitator Program",
    place: "Google Cloud",
    date: "September 2022",
    link: "https://www.skills.google/public_profiles/e06b333f-912a-4704-aa05-b97ab0de4230", // TODO: replace with actual link
    note: "Achieved the Ultimate Milestone by completing 40 quests and earning 20 skill badges. Received exclusive access to the Google Career Readiness Program.",
    images: ["/images/chinmay-google-facilitator.jpg"], // TODO: add image path(s), e.g. "/images/gcloud-facilitator.jpg"
  },
  {
    title: "Google Cloud Arcade",
    place: "Google Cloud",
    date: "August 2023",
    link: "https://www.skills.google/public_profiles/5652d001-5796-43c9-b35d-f08196962b7a", // TODO: replace with actual link
    note: "Demonstrated proficiency in cloud technologies and problem-solving through successful participation in interactive challenges within Google Cloud Arcade.",
    images: ["/images/chinmay-google-arcade.png"], // TODO: add image path(s), e.g. "/images/google-cloud-arcade.jpg"
  },
  {
    title: "Architecting with Google Compute Engine — Coursera",
    place: "Google Cloud Education",
    date: "June 2022",
    link: "https://coursera.org/share/cc981bb9319f81167c2c7db6fa794006", // TODO: replace with actual link
    note: "Completed a comprehensive five-course specialization offered by Google Cloud Education with a perfect 100% score across all courses.",
    images: ["/images/chinmay-coursera-certificate.png"], // TODO: add image path(s), e.g. "/images/coursera-certificate.jpg"
  },
  {
    title: "Paper accepted — AI-Aided Predictive Maintenance in Automotive Systems",
    place: "SVNIT, Surat",
    date: "September 2026",
    note: "A comparative review of AI and ML techniques including K-Means clustering, KNN, and autoencoders  for predictive maintenance and fault detection in automotive systems. Accepted for presentation.",
    images: ["/images/chinmay-svnit-paper.png"], // TODO: add image path(s) once you have a photo/screenshot for this
  },
];

function ImagePane({ images, title }: { images: string[]; title: string }) {
  const [index, setIndex] = useState(0);

  const go = (dir: 1 | -1, e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((prev) => (prev + dir + images.length) % images.length);
  };

  return (
    <div className="relative flex items-center justify-center bg-[rgba(243,239,230,0.02)] border border-[rgba(243,239,230,0.1)] p-4 md:p-6 min-h-70">
      <AnimatePresence mode="wait">
        <motion.img
          key={images[index]}
          src={images[index]}
          alt={`${title} — image ${index + 1}`}
          loading="lazy"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="max-h-105 max-w-full w-auto h-auto object-contain contrast-[1.03]"
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => go(-1, e)}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-ink hover:bg-black/70 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={(e) => go(1, e)}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-ink hover:bg-black/70 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex(i);
                }}
                aria-label={`Go to image ${i + 1}`}
                className="w-1.5 h-1.5 rounded-full transition-colors"
                style={{ background: i === index ? "rgba(243,239,230,0.9)" : "rgba(243,239,230,0.3)" }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function PlaceholderPane() {
  return (
    <div className="flex items-center justify-center min-h-70 border border-[rgba(243,239,230,0.1)] bg-[rgba(243,239,230,0.02)]">
      <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
        <rect x="1" y="1" width="26" height="26" rx="2" stroke="rgba(243,239,230,0.2)" strokeWidth="1" />
        <path d="M7 19 L11 13 L15 17 L21 9" stroke="rgba(243,239,230,0.2)" strokeWidth="1" fill="none" />
      </svg>
    </div>
  );
}

function AchievementAction({ href, external, label }: { href: string; external: boolean; label: string }) {
  const className =
    "inline-flex items-center gap-2 self-start rounded-full border border-[rgba(243,239,230,0.12)] bg-[rgba(243,239,230,0.03)] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim transition-colors hover:border-accent/40 hover:text-accent hover:bg-[rgba(47,214,167,0.06)]";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        <span>{label}</span>
        <span aria-hidden="true">↗</span>
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      <span>{label}</span>
      <span aria-hidden="true">→</span>
    </Link>
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

        <div className="flex flex-col gap-20 md:gap-28">
          {milestones.map((m, i) => {
            const reversed = i % 2 === 1;
            const hasImages = m.images && m.images.length > 0;
            const hasExternalLink = Boolean(m.link && m.link !== "#");
            const actionHref = hasExternalLink ? m.link! : "/coming-soon";
            const actionLabel = hasExternalLink ? "Visit credential" : "Coming soon";
            return (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center ${
                  reversed ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Text side */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-mono text-[11px] text-accent uppercase tracking-widest">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    {m.date && (
                      <p className="font-mono text-[11px] text-ink-faint uppercase tracking-widest">
                        {m.date}
                      </p>
                    )}
                  </div>

                  <h3 className="font-display text-2xl md:text-3xl text-ink tracking-tight leading-snug">
                    {m.title}
                  </h3>

                  <p className="text-xs text-ink-faint uppercase tracking-wide">
                    {m.place}
                  </p>

                  <AchievementAction href={actionHref} external={hasExternalLink} label={actionLabel} />

                  <p className="text-ink-dim text-sm md:text-base leading-relaxed max-w-md">
                    {m.note}
                  </p>
                </div>

                {/* Image side */}
                {hasImages ? <ImagePane images={m.images!} title={m.title} /> : <PlaceholderPane />}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}