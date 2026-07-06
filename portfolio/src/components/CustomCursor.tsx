"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const RING_SIZE = 36;
const DOT_SIZE = 4;

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 320, mass: 0.4 };
  const ringX = useSpring(x, springConfig);
  const ringY = useSpring(y, springConfig);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    setEnabled(true);
    document.body.classList.add("custom-cursor-active");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);

      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [data-cursor], input, textarea, select"
      ) as HTMLElement | null;

      if (interactive) {
        setHovering(true);
        setLabel(interactive.getAttribute("data-cursor-text"));
      } else {
        setHovering(false);
        setLabel(null);
      }
    };

    const down = () => setPressed(true);
    const up = () => setPressed(false);
    const leaveWindow = () => {
      x.set(-100);
      y.set(-100);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    window.addEventListener("mouseleave", leaveWindow);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("mouseleave", leaveWindow);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* precision dot — snaps instantly, no lag */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[200] rounded-full bg-accent"
        style={{
          width: DOT_SIZE,
          height: DOT_SIZE,
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ scale: hovering ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />

      {/* reticle — springy trail, tightens into brackets on hover */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[200]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            width: hovering ? RING_SIZE * 1.5 : RING_SIZE,
            height: hovering ? RING_SIZE * 1.5 : RING_SIZE,
          }}
          transition={{ type: "spring", damping: 24, stiffness: 300 }}
        >
          {/* idle ring — fades out on hover */}
          <motion.div
            className="absolute inset-0 rounded-full border border-[rgba(243,239,230,0.18)]"
            animate={{ opacity: hovering ? 0 : 1, scale: pressed ? 0.9 : 1 }}
            transition={{ duration: 0.2 }}
          />

          {/* corner brackets — appear on hover */}
          <motion.span
            className="absolute left-0 top-0 h-2.5 w-2.5 border-l border-t border-accent"
            animate={{ opacity: hovering ? 1 : 0, scale: pressed ? 0.85 : 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="absolute right-0 top-0 h-2.5 w-2.5 border-r border-t border-accent"
            animate={{ opacity: hovering ? 1 : 0, scale: pressed ? 0.85 : 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="absolute bottom-0 left-0 h-2.5 w-2.5 border-b border-l border-accent"
            animate={{ opacity: hovering ? 1 : 0, scale: pressed ? 0.85 : 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="absolute bottom-0 right-0 h-2.5 w-2.5 border-b border-r border-accent"
            animate={{ opacity: hovering ? 1 : 0, scale: pressed ? 0.85 : 1 }}
            transition={{ duration: 0.2 }}
          />

          {/* optional hover label */}
          {label && (
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full mt-2 whitespace-nowrap rounded-sm bg-bg-raised px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-accent"
            >
              {label}
            </motion.span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}