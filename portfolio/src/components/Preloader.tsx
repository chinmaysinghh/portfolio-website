"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const TAGLINE = "build.research.engineer";
const TYPE_SPEED = 45;
const HOLD_AFTER_TYPE = 500;

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const typeInterval = window.setInterval(() => {
      setIndex((i) => {
        if (i >= TAGLINE.length) {
          window.clearInterval(typeInterval);
          return i;
        }
        return i + 1;
      });
    }, TYPE_SPEED);

    return () => window.clearInterval(typeInterval);
  }, []);

  useEffect(() => {
    if (index < TAGLINE.length) return;
    const hideTimer = window.setTimeout(
      () => setVisible(false),
      HOLD_AFTER_TYPE
    );
    return () => window.clearTimeout(hideTimer);
  }, [index]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg"
          style={{ touchAction: "none" }}
        >
          <p className="px-8 text-center font-mono text-sm uppercase tracking-[0.35em] text-ink md:text-base">
            {TAGLINE.slice(0, index)
              .split("")
              .map((char, i) => (
                <span key={i} className={char === "." ? "text-accent" : undefined}>
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            <motion.span
              aria-hidden
              className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-accent align-middle"
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}