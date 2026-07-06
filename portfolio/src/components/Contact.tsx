"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative px-6 md:px-12 py-32 md:py-48 flex flex-col justify-between min-h-[80svh]"
    >
      <div className="max-w-4xl">
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
          className="font-display text-3xl sm:text-4xl md:text-7xl leading-[1.05] tracking-tight lowercase text-ink break-words"
        >
          say something.
          <br />
          <a href="mailto:chinmaysingh285@gmail.com" className="text-accent hover:text-ink transition-colors duration-300 underline decoration-1 underline-offset-8 break-all sm:break-normal">
            chinmaysingh285@gmail.com
          </a>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap gap-x-8 gap-y-3 mt-16 font-mono text-xs uppercase tracking-widest"
        >
          <a href="https://www.linkedin.com/in/chinmaysingh24/" className="text-ink-dim hover:text-accent transition-colors">
            LinkedIn
          </a>
          <a href="https://github.com/chinmaysinghh" className="text-ink-dim hover:text-accent transition-colors">
            GitHub
          </a>
          <a href="https://drive.google.com/file/d/1Fp78iqn3wAXDE9kXPpPe1GaWFe_UMDNC/view?usp=drive_link" className="text-ink-dim hover:text-accent transition-colors">
            Resume
          </a>
        </motion.div>
      </div>

      <div className="flex items-end justify-between font-mono text-[11px] text-ink-faint uppercase tracking-widest mt-24">
        <span>Ahmedabad, India</span>
        <span>build. research. engineer.</span>
      </div>
    </section>
  );
}