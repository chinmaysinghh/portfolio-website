"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative px-6 md:px-12 pt-10 pb-8 border-t border-[rgba(243,239,230,0.08)]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        {/* Left: copyright */}
        <span className="font-mono text-[11px] text-ink-faint uppercase tracking-widest">
          © {year} — all rights reserved
        </span>

        {/* Right: back to top */}
        <motion.button
          onClick={scrollToTop}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-2 self-start md:self-auto font-mono text-[11px] uppercase tracking-widest text-ink-dim hover:text-accent transition-colors duration-300"
        >
          back to top
          <span className="flex items-center justify-center w-7 h-7 rounded-full border border-[rgba(243,239,230,0.15)]">
            <ArrowUp size={12} strokeWidth={1.75} />
          </span>
        </motion.button>
      </div>

      
    </footer>
  );
}