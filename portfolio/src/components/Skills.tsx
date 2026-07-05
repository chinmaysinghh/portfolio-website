"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type Node = { id: string; label: string; x: number; y: number; cluster: number };

const nodes: Node[] = [
  // cluster 0 — AI / ML
  { id: "pytorch", label: "PyTorch", x: 140, y: 90, cluster: 0 },
  { id: "transformers", label: "Transformers", x: 240, y: 60, cluster: 0 },
  { id: "cnnlstm", label: "CNN-LSTM", x: 110, y: 180, cluster: 0 },
  { id: "sklearn", label: "Scikit-learn", x: 230, y: 170, cluster: 0 },
  { id: "xai", label: "SHAP / XAI", x: 170, y: 250, cluster: 0 },

  // cluster 1 — Frontend
  { id: "nextjs", label: "Next.js", x: 560, y: 80, cluster: 1 },
  { id: "react", label: "React", x: 650, y: 120, cluster: 1 },
  { id: "ts", label: "TypeScript", x: 590, y: 190, cluster: 1 },
  { id: "tailwind", label: "Tailwind CSS", x: 480, y: 160, cluster: 1 },
  { id: "framer", label: "Framer Motion", x: 660, y: 220, cluster: 1 },

  // cluster 2 — systems / tools, bridges the two
  { id: "python", label: "Python", x: 360, y: 220, cluster: 2 },
  { id: "git", label: "Git", x: 420, y: 300, cluster: 2 },
  { id: "latex", label: "LaTeX", x: 300, y: 320, cluster: 2 },
  { id: "sql", label: "SQL", x: 480, y: 340, cluster: 2 },
  { id: "node", label: "Node.js", x: 540, y: 280, cluster: 2 },
];

const links: [string, string][] = [
  ["pytorch", "transformers"],
  ["pytorch", "cnnlstm"],
  ["cnnlstm", "sklearn"],
  ["sklearn", "xai"],
  ["pytorch", "xai"],
  ["nextjs", "react"],
  ["react", "ts"],
  ["ts", "tailwind"],
  ["react", "framer"],
  ["tailwind", "framer"],
  ["python", "pytorch"],
  ["python", "sklearn"],
  ["python", "git"],
  ["git", "latex"],
  ["git", "sql"],
  ["node", "nextjs"],
  ["node", "git"],
  ["sql", "node"],
];

const clusterColors = ["#2fd6a7", "#f3efe6", "#9aa39d"];

export default function Skills() {
  const [hovered, setHovered] = useState<string | null>(null);
  const map = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <section id="skills" className="relative px-6 md:px-12 py-28 md:py-40">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-4">
          Skills — 07
        </p>
        <p className="text-ink-dim max-w-lg mb-16 text-[15px] leading-relaxed">
          Not a skill bar, a map. Three clusters — machine learning research,
          frontend engineering, and the tooling that connects them — drawn as
          a network rather than ranked.
        </p>

        <svg
          viewBox="0 0 760 400"
          className="w-full h-auto"
          style={{ maxHeight: 480 }}
        >
          {links.map(([a, b], i) => {
            const na = map[a];
            const nb = map[b];
            const dim =
              hovered && hovered !== a && hovered !== b;
            return (
              <motion.line
                key={`${a}-${b}`}
                x1={na.x}
                y1={na.y}
                x2={nb.x}
                y2={nb.y}
                stroke={clusterColors[na.cluster]}
                strokeOpacity={dim ? 0.05 : 0.25}
                strokeWidth={1}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.03 }}
              />
            );
          })}

          {nodes.map((n, i) => {
            const dim = hovered && hovered !== n.id;
            return (
              <g
                key={n.id}
                onMouseEnter={() => setHovered(n.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "default" }}
              >
                <motion.circle
                  cx={n.x}
                  cy={n.y}
                  r={hovered === n.id ? 7 : 4.5}
                  fill={clusterColors[n.cluster]}
                  fillOpacity={dim ? 0.3 : 1}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                />
                <motion.text
                  x={n.x}
                  y={n.y - 14}
                  textAnchor="middle"
                  fill={n.cluster === 1 ? "#f3efe6" : clusterColors[n.cluster]}
                  fillOpacity={dim ? 0.25 : 0.9}
                  fontSize={12}
                  fontFamily="var(--font-mono)"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.04 }}
                >
                  {n.label}
                </motion.text>
              </g>
            );
          })}
        </svg>

        <div className="flex flex-wrap gap-x-8 gap-y-2 mt-10 font-mono text-xs uppercase tracking-widest">
          <span className="flex items-center gap-2 text-ink-dim">
            <span className="w-2 h-2 rounded-full" style={{ background: clusterColors[0] }} />
            ML / Research
          </span>
          <span className="flex items-center gap-2 text-ink-dim">
            <span className="w-2 h-2 rounded-full" style={{ background: clusterColors[1] }} />
            Frontend
          </span>
          <span className="flex items-center gap-2 text-ink-dim">
            <span className="w-2 h-2 rounded-full" style={{ background: clusterColors[2] }} />
            Tools / Systems
          </span>
        </div>
      </div>
    </section>
  );
}
