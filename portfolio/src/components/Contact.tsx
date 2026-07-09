"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ScheduleMeeting from "./ScheduleMeeting";

const socials = [
  {
    index: "01",
    label: "Linkedin",
    href: "https://www.linkedin.com/in/chinmaysingh24/",
  },
  {
    index: "02",
    label: "Github",
    href: "https://github.com/chinmaysinghh",
  },
  {
    index: "03",
    label: "Resume",
    href: "https://drive.google.com/file/d/1YMGL6zm-g5WYUBCBiM6DCAEjuCpmwywr/view?usp=sharing",
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative px-6 md:px-12 py-32 md:py-48"
    >
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-8"
      >
        Contact — 09
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="font-display text-3xl sm:text-4xl md:text-7xl leading-[1.05] tracking-tight lowercase text-ink break-words max-w-4xl"
      >
        let's collaborate.
        <br />
        <a
          href="mailto:chinmaysingh285@gmail.com"
          className="text-accent hover:text-ink transition-colors duration-300 underline decoration-1 underline-offset-8 break-all sm:break-normal"
        >
          chinmaysingh285@gmail.com
        </a>
      </motion.h2>

      {/* Two-column body: editorial link list (left) + booking card (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-y-20 lg:gap-x-16 mt-24 md:mt-32">
        {/* Left: social / resume links */}
        <div>
          <p className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-6">
            Links
          </p>
          <div className="flex flex-col divide-y divide-[rgba(243,239,230,0.08)] border-y border-[rgba(243,239,230,0.08)]">
            {socials.map((s, i) => (
              <motion.a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * i }}
                className="group flex items-center justify-between py-5 md:py-6"
              >
                <span className="flex items-baseline gap-4 md:gap-6">
                  <span className="font-mono text-xs text-ink-faint">
                    {s.index}
                  </span>
                  <span className="font-display text-xl md:text-3xl lowercase text-ink-dim group-hover:text-accent transition-colors duration-300">
                    {s.label}
                  </span>
                </span>
                <ArrowUpRight
                  size={18}
                  strokeWidth={1.5}
                  className="text-ink-faint group-hover:text-accent transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Vertical divider — desktop only */}
        <div
          aria-hidden="true"
          className="hidden lg:block bg-[rgba(243,239,230,0.08)] w-px"
        />

        {/* Right: schedule a call */}
        <ScheduleMeeting
          meetingUrl="https://cal.com/chinmay-singh/30min"
          title="or, skip the emails."
          description="Grab a slot for a one on one discussion."
          buttonText="Schedule a Call"
        />
      </div>
    </section>
  );
}