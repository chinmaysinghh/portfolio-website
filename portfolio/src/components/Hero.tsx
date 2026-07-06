"use client";

import { useRef, useMemo } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  MotionValue,
} from "framer-motion";

/* =========================================================
   SHARED HELPERS
========================================================= */

type Depth = { depth: number; exitX: number; exitY: number };

function useParallax(mx: MotionValue<number>, my: MotionValue<number>, depth: number) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return {
    x: useSpring(x, { stiffness: 120, damping: 20, mass: 0.6 }),
    y: useSpring(y, { stiffness: 120, damping: 20, mass: 0.6 }),
  };
}

/** wraps a doodle: cursor parallax, scroll-exit toward its section, gentle idle float, hover lift */
function Artifact({
  className,
  mx,
  my,
  cfg,
  exitProgress,
  label,
  floatRange = 4,
  floatDuration = 6,
  rotate = 0,
  children,
}: {
  className: string;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  cfg: Depth;
  exitProgress: MotionValue<number>;
  label: string;
  floatRange?: number;
  floatDuration?: number;
  rotate?: number;
  children: React.ReactNode;
}) {
  const parallax = useParallax(mx, my, cfg.depth);
  const exitX = useTransform(exitProgress, [0, 1], [0, cfg.exitX]);
  const exitY = useTransform(exitProgress, [0, 1], [0, cfg.exitY]);
  const exitOpacity = useTransform(exitProgress, [0, 0.7], [1, 0]);

  const x = useTransform([parallax.x, exitX], ([a, b]: number[]) => a + b);
  const y = useTransform([parallax.y, exitY], ([a, b]: number[]) => a + b);

  return (
    <motion.div
      style={{ x, y, opacity: exitOpacity }}
      className={`absolute group ${className}`}
    >
      <motion.div
        animate={{ y: [0, -floatRange, 0], rotate: [rotate, rotate + 0.6, rotate] }}
        transition={{ duration: floatDuration, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          initial={{ rotate: 0, y: 0 }}
          whileHover={{ rotate: rotate - 1.5, y: -4, scale: 1.03 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      </motion.div>
      <motion.span
        initial={{ opacity: 0, y: 4 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="absolute -bottom-6 left-0 font-mono text-[10px] text-accent lowercase tracking-widest pointer-events-none whitespace-nowrap"
      >
        {label}
      </motion.span>
    </motion.div>
  );
}

const INK_LINE = "#9aa39d";
const PAPER = "#f3efe6";
const ACCENT = "#2fd6a7";

/* =========================================================
   BACKGROUND — engineering grid, blueprint dots, noise, glow
========================================================= */

function WorkspaceBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* radial glow, origin of the canvas */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(47,214,167,0.06), transparent 70%)",
        }}
      />

      {/* engineering grid, fading toward the edges */}
      <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
        <defs>
          <pattern id="hero-grid" width="42" height="42" patternUnits="userSpaceOnUse">
            <path
              d="M 42 0 L 0 0 0 42"
              fill="none"
              stroke={INK_LINE}
              strokeOpacity="0.08"
              strokeWidth="0.6"
            />
          </pattern>
          <pattern id="hero-grid-dots" width="42" height="42" patternUnits="userSpaceOnUse">
            <circle cx="0" cy="0" r="1" fill={INK_LINE} fillOpacity="0.15" />
          </pattern>
          <radialGradient id="hero-fade" cx="50%" cy="38%" r="65%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="70%" stopColor="white" stopOpacity="0.5" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="hero-fade-mask">
            <rect width="100%" height="100%" fill="url(#hero-fade)" />
          </mask>
          <filter id="hero-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
        <g mask="url(#hero-fade-mask)">
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
          <rect width="100%" height="100%" fill="url(#hero-grid-dots)" />
        </g>
        <rect width="100%" height="100%" filter="url(#hero-noise)" opacity="0.025" />
      </svg>

      {/* coordinate markers, top-left / bottom-right, like a drafting sheet */}
      
      

      {/* research-in-progress indicator */}
      

      {/* drifting connection nodes */}
      {[
        { top: "22%", left: "40%", delay: 0 },
        { top: "68%", left: "58%", delay: 0.7 },
        { top: "36%", left: "72%", delay: 1.4 },
        { top: "78%", left: "30%", delay: 2.1 },
      ].map((n, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full hidden md:block"
          style={{ top: n.top, left: n.left, backgroundColor: ACCENT }}
          animate={{ opacity: [0.15, 0.7, 0.15], scale: [1, 1.6, 1] }}
          transition={{ duration: 3.4, repeat: Infinity, delay: n.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* =========================================================
   CONNECTIVE TISSUE — dashed paths linking the artifacts
========================================================= */

function ConnectionLayer() {
  // approximate anchor points, in viewBox percent-space (0-1000 x 0-600)
  const paths = [
    "M 90 210 C 220 150, 340 170, 430 260",   // notebook -> center
    "M 900 190 C 760 150, 640 190, 560 250",  // blueprint -> center
    "M 120 470 C 260 430, 360 400, 470 340",  // commit graph -> center
    "M 880 440 C 740 400, 640 380, 540 340",  // terminal -> center
    "M 60 320 C 150 320, 220 320, 300 320",   // sticky note -> center
    "M 940 300 C 850 300, 780 300, 700 300",  // equation -> center
  ];
  return (
    <svg
      className="absolute inset-0 w-full h-full hidden md:block pointer-events-none"
      viewBox="0 0 1000 600"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke={INK_LINE}
          strokeOpacity="0.18"
          strokeWidth="1"
          strokeDasharray="4 6"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.6 + i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
}

/* =========================================================
   ARTIFACTS — every doodle means something specific
========================================================= */

function Notebook() {
  return (
    <svg width="150" height="120" viewBox="0 0 150 120" fill="none">
      <rect x="4" y="4" width="142" height="112" rx="2" stroke={INK_LINE} strokeOpacity="0.35" />
      <line x1="4" y1="28" x2="146" y2="28" stroke={INK_LINE} strokeOpacity="0.2" />
      <text x="14" y="20" fontSize="7" fontFamily="monospace" fill={INK_LINE} fillOpacity="0.5">
        research notes
      </text>
      {[46, 60, 74, 88].map((y) => (
        <motion.line
          key={y}
          x1="16"
          y1={y}
          x2={y % 28 === 0 ? 100 : 120}
          y2={y}
          stroke={PAPER}
          strokeOpacity="0.3"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.4 + y * 0.005 }}
        />
      ))}
      <motion.path
        d="M100 44 C 116 50, 122 62, 112 74 C 104 84, 118 92, 130 86"
        stroke={ACCENT}
        strokeOpacity="0.55"
        strokeWidth="1.2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, delay: 0.8 }}
      />
    </svg>
  );
}

function Blueprint() {
  const nodes = [
    [20, 20], [90, 15], [140, 55], [70, 70], [15, 90], [110, 100],
  ];
  const edges: [number, number][] = [[0, 1], [1, 2], [1, 3], [3, 4], [3, 5]];
  return (
    <svg width="160" height="120" viewBox="0 0 160 120" fill="none">
      <rect x="0" y="0" width="160" height="120" rx="2" stroke={ACCENT} strokeOpacity="0.2" />
      <text x="8" y="112" fontSize="7" fontFamily="monospace" fill={INK_LINE} fillOpacity="0.5">
        system architecture
      </text>
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke={INK_LINE}
          strokeOpacity="0.4"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, delay: 0.3 + i * 0.12 }}
        />
      ))}
      {nodes.map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r={i === 1 ? 4 : 2.5}
          fill={i === 1 ? ACCENT : PAPER}
          fillOpacity={i === 1 ? 0.9 : 0.5}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
        />
      ))}
    </svg>
  );
}

function CommitGraph() {
  return (
    <svg width="140" height="80" viewBox="0 0 140 80" fill="none">
      <text x="8" y="12" fontSize="7" fontFamily="monospace" fill={INK_LINE} fillOpacity="0.5">
        git log --graph
      </text>
      <motion.line
        x1="8" y1="46" x2="132" y2="46"
        stroke={INK_LINE} strokeOpacity="0.25" strokeWidth="1"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      />
      {[8, 32, 56, 80, 104, 128].map((x, i) => (
        <motion.circle
          key={x}
          cx={x}
          cy={i % 2 === 0 ? 46 : 28}
          r={i === 4 ? 4 : 2.5}
          fill={i === 4 ? ACCENT : PAPER}
          fillOpacity={i === 4 ? 0.9 : 0.45}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.5 + i * 0.08 }}
        />
      ))}
      {[8, 32, 56, 80, 104, 128].map((x, i) =>
        i % 2 === 0 ? null : (
          <motion.line
            key={`b-${x}`}
            x1={x - 24}
            y1={46}
            x2={x}
            y2={28}
            stroke={INK_LINE}
            strokeOpacity="0.25"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.6 + i * 0.08 }}
          />
        )
      )}
    </svg>
  );
}

function Terminal() {
  const lines = [0.9, 0.6, 0.75, 0.4];
  return (
    <svg width="140" height="96" viewBox="0 0 140 96" fill="none">
      <rect x="0" y="0" width="140" height="96" rx="3" stroke={INK_LINE} strokeOpacity="0.25" />
      <circle cx="10" cy="10" r="2" fill={INK_LINE} fillOpacity="0.3" />
      <circle cx="18" cy="10" r="2" fill={INK_LINE} fillOpacity="0.3" />
      <circle cx="26" cy="10" r="2" fill={INK_LINE} fillOpacity="0.3" />
      {lines.map((w, i) => (
        <motion.line
          key={i}
          x1="10"
          y1={28 + i * 12}
          x2={10 + w * 110}
          y2={28 + i * 12}
          stroke={PAPER}
          strokeOpacity="0.25"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
        />
      ))}
      {/* blinking cursor on the active line */}
      <motion.rect
        x="10"
        y="76"
        width="6"
        height="9"
        fill={ACCENT}
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
      />
    </svg>
  );
}

function StickyNote() {
  return (
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
      <rect x="4" y="4" width="82" height="82" fill={PAPER} fillOpacity="0.06" stroke={PAPER} strokeOpacity="0.2" />
      <text x="12" y="18" fontSize="7" fontFamily="monospace" fill={ACCENT} fillOpacity="0.6">
        currently
      </text>
      {[30, 42, 54].map((y, i) => (
        <motion.line
          key={y}
          x1="12"
          y1={y}
          x2={i === 1 ? 68 : 56}
          y2={y}
          stroke={ACCENT}
          strokeOpacity="0.35"
          strokeWidth="1.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
        />
      ))}
    </svg>
  );
}

function EquationSketch() {
  return (
    <svg width="130" height="70" viewBox="0 0 130 70" fill="none">
      <motion.path
        d="M6 40 Q 20 10, 34 40 T 62 40"
        stroke={INK_LINE}
        strokeOpacity="0.4"
        strokeWidth="1.2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      />
      <motion.path
        d="M70 20 L 78 50 M 74 20 L 66 50"
        stroke={ACCENT}
        strokeOpacity="0.5"
        strokeWidth="1.2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      />
      <motion.circle
        cx="100" cy="35" r="14"
        stroke={PAPER} strokeOpacity="0.25" strokeWidth="1"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
      />
    </svg>
  );
}

/** small neural network sketch, three layers, a few weighted edges */
function NeuralNet() {
  const layers = [
    [[0, 10], [0, 32], [0, 54]],
    [[45, 0], [45, 24], [45, 44], [45, 64]],
    [[90, 20], [90, 44]],
  ];
  const edges: [number, number, number, number][] = [];
  layers[0].forEach(([x1, y1]) =>
    layers[1].forEach(([x2, y2]) => edges.push([x1, y1, x2, y2]))
  );
  layers[1].forEach(([x1, y1]) =>
    layers[2].forEach(([x2, y2]) => edges.push([x1, y1, x2, y2]))
  );
  return (
    <svg width="110" height="80" viewBox="-6 -6 110 80" fill="none">
      <text x="0" y="-8" fontSize="7" fontFamily="monospace" fill={INK_LINE} fillOpacity="0.5">
        transformer block
      </text>
      {edges.map(([x1, y1, x2, y2], i) => (
        <motion.line
          key={i}
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={INK_LINE}
          strokeOpacity="0.15"
          strokeWidth="0.6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.3 + i * 0.02 }}
        />
      ))}
      {layers.flat().map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x} cy={y} r="3.5"
          fill={i % 5 === 0 ? ACCENT : PAPER}
          fillOpacity={i % 5 === 0 ? 0.8 : 0.4}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
        />
      ))}
    </svg>
  );
}

/** loss curve, descending, with a faint accuracy curve rising against it */
function TrainingCurve() {
  return (
    <svg width="130" height="80" viewBox="0 0 130 80" fill="none">
      <text x="0" y="10" fontSize="7" fontFamily="monospace" fill={INK_LINE} fillOpacity="0.5">
        loss / epoch
      </text>
      <line x1="4" y1="70" x2="126" y2="70" stroke={INK_LINE} strokeOpacity="0.2" strokeWidth="1" />
      <line x1="4" y1="16" x2="4" y2="70" stroke={INK_LINE} strokeOpacity="0.2" strokeWidth="1" />
      <motion.path
        d="M6 20 C 30 30, 40 55, 60 60 C 80 64, 95 66, 124 68"
        stroke={ACCENT}
        strokeOpacity="0.6"
        strokeWidth="1.3"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, delay: 0.5 }}
      />
      <motion.path
        d="M6 66 C 30 58, 40 34, 60 26 C 80 20, 95 16, 124 14"
        stroke={PAPER}
        strokeOpacity="0.25"
        strokeWidth="1"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, delay: 0.8 }}
      />
    </svg>
  );
}

/** request -> service -> db flow */
function ApiFlow() {
  const stops = [
    { x: 8, label: "client" },
    { x: 62, label: "api" },
    { x: 116, label: "db" },
  ];
  return (
    <svg width="132" height="60" viewBox="0 0 132 60" fill="none">
      {stops.map((s, i) => (
        <g key={i}>
          <motion.rect
            x={s.x} y={16} width="18" height="18" rx="2"
            stroke={i === 1 ? ACCENT : INK_LINE}
            strokeOpacity={i === 1 ? 0.6 : 0.35}
            strokeWidth="1"
            fill="none"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 + i * 0.2 }}
          />
          <text x={s.x - 2} y={48} fontSize="6.5" fontFamily="monospace" fill={INK_LINE} fillOpacity="0.5">
            {s.label}
          </text>
        </g>
      ))}
      {[0, 1].map((i) => (
        <motion.line
          key={i}
          x1={stops[i].x + 18}
          y1={25}
          x2={stops[i + 1].x}
          y2={25}
          stroke={INK_LINE}
          strokeOpacity="0.3"
          strokeWidth="1"
          strokeDasharray="3 3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.6 + i * 0.2 }}
        />
      ))}
      <motion.circle
        r="2" fill={ACCENT}
        animate={{ cx: [8, 62, 116], cy: 25 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1.2 }}
      />
    </svg>
  );
}

/** tiny roadmap checklist, three items, one checked */
function Roadmap() {
  const items = ["ship v2", "eval harness", "write it up"];
  return (
    <svg width="120" height="76" viewBox="0 0 120 76" fill="none">
      <text x="0" y="10" fontSize="7" fontFamily="monospace" fill={INK_LINE} fillOpacity="0.5">
        next up
      </text>
      {items.map((label, i) => (
        <g key={label}>
          <motion.rect
            x="0" y={18 + i * 18} width="10" height="10" rx="2"
            stroke={INK_LINE} strokeOpacity="0.35" strokeWidth="1" fill="none"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
          />
          {i === 0 && (
            <motion.path
              d={`M2 ${23 + i * 18} L5 ${26 + i * 18} L9 ${20 + i * 18}`}
              stroke={ACCENT} strokeWidth="1.4" fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 0.9 }}
            />
          )}
          <text
            x="16"
            y={27 + i * 18}
            fontSize="7"
            fontFamily="monospace"
            fill={PAPER}
            fillOpacity={i === 0 ? 0.3 : 0.5}
            textDecoration={i === 0 ? "line-through" : "none"}
          >
            {label}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* =========================================================
   HERO
========================================================= */

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.4], [0, -40]);

  function handlePointerMove(e: React.PointerEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(nx * 24);
    my.set(ny * 24);
  }

  return (
    <section
      id="top"
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="relative min-h-[100svh] overflow-hidden px-6 md:px-12"
    >
      <WorkspaceBackground />

      {/* ===================== DESKTOP CANVAS ===================== */}
      <div className="absolute inset-0 hidden md:block">
        <ConnectionLayer />

        <Artifact
          className="top-[14%] left-[6%]"
          mx={mx} my={my}
          cfg={{ depth: 0.6, exitX: -80, exitY: -60 }}
          exitProgress={scrollYProgress}
          label="→ about"
          floatDuration={7}
        >
          <Notebook />
        </Artifact>

        <Artifact
          className="top-[10%] right-[7%]"
          mx={mx} my={my}
          cfg={{ depth: 0.9, exitX: 90, exitY: -70 }}
          exitProgress={scrollYProgress}
          label="→ experience"
          floatDuration={8}
        >
          <Blueprint />
        </Artifact>

        <Artifact
          className="bottom-[16%] left-[8%]"
          mx={mx} my={my}
          cfg={{ depth: 0.5, exitX: -70, exitY: 70 }}
          exitProgress={scrollYProgress}
          label="→ projects"
          floatDuration={6.5}
        >
          <CommitGraph />
        </Artifact>

        <Artifact
          className="bottom-[12%] right-[9%]"
          mx={mx} my={my}
          cfg={{ depth: 0.7, exitX: 80, exitY: 80 }}
          exitProgress={scrollYProgress}
          label="→ projects"
          floatDuration={7.5}
        >
          <Terminal />
        </Artifact>

        <Artifact
          className="top-[40%] left-[2%]"
          mx={mx} my={my}
          cfg={{ depth: 0.4, exitX: -60, exitY: 20 }}
          exitProgress={scrollYProgress}
          label="→ focus"
          rotate={-2}
          floatDuration={5.5}
        >
          <StickyNote />
        </Artifact>

        <Artifact
          className="top-[46%] right-[3%]"
          mx={mx} my={my}
          cfg={{ depth: 0.45, exitX: 60, exitY: 10 }}
          exitProgress={scrollYProgress}
          label="→ research"
          floatDuration={6}
        >
          <EquationSketch />
        </Artifact>

        <Artifact
          className="top-[4%] left-[32%]"
          mx={mx} my={my}
          cfg={{ depth: 0.3, exitX: -30, exitY: -90 }}
          exitProgress={scrollYProgress}
          label="→ research"
          floatDuration={9}
        >
          <NeuralNet />
        </Artifact>

        <Artifact
          className="top-[6%] right-[30%]"
          mx={mx} my={my}
          cfg={{ depth: 0.3, exitX: 30, exitY: -90 }}
          exitProgress={scrollYProgress}
          label="→ research"
          floatDuration={8.5}
        >
          <TrainingCurve />
        </Artifact>

        <Artifact
          className="bottom-[6%] left-[34%]"
          mx={mx} my={my}
          cfg={{ depth: 0.35, exitX: -20, exitY: 90 }}
          exitProgress={scrollYProgress}
          label="→ projects"
          floatDuration={7}
        >
          <ApiFlow />
        </Artifact>

        <Artifact
          className="bottom-[8%] right-[32%]"
          mx={mx} my={my}
          cfg={{ depth: 0.35, exitX: 20, exitY: 90 }}
          exitProgress={scrollYProgress}
          label="→ about"
          floatDuration={6}
        >
          <Roadmap />
        </Artifact>
      </div>

      {/* ===================== MOBILE CANVAS ===================== */}
      {/* fewer, larger, intentionally cropped at the edges */}
      <div className="absolute inset-0 md:hidden">
        <Artifact
          className="top-[8%] -left-6 scale-110"
          mx={mx} my={my}
          cfg={{ depth: 0.3, exitX: -50, exitY: -40 }}
          exitProgress={scrollYProgress}
          label="→ about"
          floatDuration={7}
        >
          <Notebook />
        </Artifact>

        <Artifact
          className="top-[6%] -right-8 scale-110"
          mx={mx} my={my}
          cfg={{ depth: 0.35, exitX: 50, exitY: -40 }}
          exitProgress={scrollYProgress}
          label="→ experience"
          floatDuration={8}
        >
          <Blueprint />
        </Artifact>

        <Artifact
          className="top-[46%] -left-8 scale-110"
          mx={mx} my={my}
          cfg={{ depth: 0.25, exitX: -40, exitY: 10 }}
          exitProgress={scrollYProgress}
          label="→ focus"
          rotate={-2}
          floatDuration={6}
        >
          <StickyNote />
        </Artifact>

        <Artifact
          className="bottom-[20%] -right-6 scale-110"
          mx={mx} my={my}
          cfg={{ depth: 0.3, exitX: 40, exitY: 40 }}
          exitProgress={scrollYProgress}
          label="→ projects"
          floatDuration={7.5}
        >
          <Terminal />
        </Artifact>

        <Artifact
          className="bottom-[6%] left-[10%] scale-95"
          mx={mx} my={my}
          cfg={{ depth: 0.2, exitX: -20, exitY: 50 }}
          exitProgress={scrollYProgress}
          label="→ research"
          floatDuration={6.5}
        >
          <TrainingCurve />
        </Artifact>
      </div>

      {/* ===================== CENTER STATEMENT ===================== */}
      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="relative z-10 h-[100svh] flex flex-col items-center justify-center text-center max-w-2xl mx-auto"
      >
        

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-3xl md:text-5xl leading-[1.2] tracking-tight lowercase text-ink"
        >
          designing systems.
          <br />
          researching intelligence.
          <br />
          building products.
        </motion.h1>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-14 font-mono text-xs uppercase tracking-[0.2em] text-ink-dim hover:text-accent transition-colors duration-300 flex flex-col items-center gap-3"
        >
          <span>begin exploration</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-current opacity-50"
          />
        </motion.a>
      </motion.div>
    </section>
  );
}