"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface ScheduleMeetingProps {
  meetingUrl: string;
  title?: string;
  description?: string;
  buttonText?: string;
  availabilityText?: string;
}

/**
 * ScheduleMeeting
 *
 * Designed to sit as the right column of the Contact section's two-column
 * layout. Reuses the site's established color roles (text-ink, text-ink-dim,
 * text-accent), font families (font-mono for labels, font-display for
 * headings), and animation rhythm (whileInView + staggered delay).
 */
export default function ScheduleMeeting({
  meetingUrl,
  title = "or, skip the emails.",
  description = "Grab a slot on my calendar — pick a time that works for you and it's booked.",
  buttonText = "Schedule a Call",
  availabilityText = "Available for new projects",
}: ScheduleMeetingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.15 }}
      className="flex flex-col"
    >
      <div className="flex items-center gap-2.5 mb-6">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
        <span className="font-mono text-xs text-accent uppercase tracking-[0.2em]">
          {availabilityText}
        </span>
      </div>

      <h3 className="font-display text-3xl sm:text-4xl md:text-5xl leading-[1.1] tracking-tight lowercase text-ink">
        {title}
      </h3>

      {description ? (
        <p className="mt-5 max-w-sm font-sans text-sm md:text-base text-ink-dim leading-relaxed">
          {description}
        </p>
      ) : null}

      <a
        href={meetingUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${buttonText} — opens Cal.com booking page in a new tab`}
        className="group inline-flex items-center gap-2 mt-10 px-6 py-3.5 rounded-full border border-[rgba(243,239,230,0.15)] font-mono text-xs uppercase tracking-widest text-ink w-fit transition-colors duration-300 hover:text-bg hover:bg-accent hover:border-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      >
        {buttonText}
        <ArrowUpRight
          size={14}
          strokeWidth={1.75}
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </a>

      {/* <span className="mt-6 font-mono text-[11px] text-ink-faint uppercase tracking-widest">
        30 min · Virtual Meeting
      </span> */}
    </motion.div>
  );
}