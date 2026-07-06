"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type Node = {
  id: string;
  label: string;
  full?: string; // full text shown on hover, if different from label
  x: number;
  y: number;
  cluster: number;
};

const nodes: Node[] = [
  // cluster 0 — AI / ML Skills
  { id: "tensorflow", label: "TensorFlow", x: 260, y: 60, cluster: 0 },
  { id: "keras", label: "Keras", x: 350, y: 40, cluster: 0 },
  { id: "numpy", label: "NumPy", x: 195, y: 130, cluster: 0 },
  { id: "pandas", label: "Pandas", x: 290, y: 140, cluster: 0 },
  { id: "matplotlib", label: "Matplotlib", x: 390, y: 115, cluster: 0 },
  {
    id: "preprocessing",
    label: "Data Preprocessing",
    full: "Data Preprocessing & Feature Engineering",
    x: 175,
    y: 235,
    cluster: 0,
  },
  {
    id: "training",
    label: "Model Training & Eval",
    full: "Neural Network Model Training & Evaluation",
    x: 300,
    y: 290,
    cluster: 0,
  },
  {
    id: "imageclass",
    label: "Image Classification",
    full: "Image Classification & Deep Learning Workflows",
    x: 425,
    y: 235,
    cluster: 0,
  },

  // cluster 1 — Development Skills
  { id: "html5", label: "HTML5", x: 545, y: 55, cluster: 1 },
  { id: "css", label: "CSS", x: 610, y: 35, cluster: 1 },
  { id: "bootstrap", label: "Bootstrap", x: 680, y: 55, cluster: 1 },
  { id: "javascript", label: "JavaScript", x: 750, y: 45, cluster: 1 },
  { id: "reactjs", label: "ReactJs", x: 820, y: 80, cluster: 1 },
  { id: "tailwind", label: "Tailwind CSS", x: 580, y: 130, cluster: 1 },
  { id: "mysql", label: "MySQL", x: 655, y: 145, cluster: 1 },
  { id: "php", label: "PHP", x: 725, y: 155, cluster: 1 },
  { id: "uiux", label: "UI/UX", x: 800, y: 170, cluster: 1 },
  { id: "restapis", label: "REST APIs", x: 615, y: 210, cluster: 1 },
  { id: "seo", label: "SEO", x: 695, y: 220, cluster: 1 },
  { id: "pwa", label: "PWA", x: 770, y: 235, cluster: 1 },

  // cluster 2 — Programming Languages
  { id: "c", label: "C", x: 60, y: 90, cluster: 2 },
  { id: "cpp", label: "C++", x: 140, y: 55, cluster: 2 },
  { id: "java", label: "Java", x: 50, y: 170, cluster: 2 },
  { id: "python", label: "Python", x: 130, y: 150, cluster: 2 },

  // cluster 3 — Testing, Version Control, Cloud & Deployment
  { id: "postman", label: "Postman", x: 340, y: 400, cluster: 3 },
  { id: "git", label: "Git", x: 415, y: 440, cluster: 3 },
  { id: "github", label: "GitHub", x: 490, y: 400, cluster: 3 },
  { id: "gcp", label: "Google Cloud Platform", x: 570, y: 445, cluster: 3 },
  { id: "vercel", label: "Vercel", x: 645, y: 400, cluster: 3 },
];

const links: [string, string][] = [
  // AI / ML internal
  ["tensorflow", "keras"],
  ["tensorflow", "numpy"],
  ["numpy", "pandas"],
  ["pandas", "matplotlib"],
  ["numpy", "preprocessing"],
  ["preprocessing", "training"],
  ["training", "imageclass"],
  ["keras", "training"],

  // Development internal
  ["html5", "css"],
  ["css", "bootstrap"],
  ["bootstrap", "javascript"],
  ["javascript", "reactjs"],
  ["css", "tailwind"],
  ["reactjs", "tailwind"],
  ["mysql", "php"],
  ["php", "reactjs"],
  ["reactjs", "uiux"],
  ["tailwind", "restapis"],
  ["restapis", "seo"],
  ["seo", "pwa"],
  ["pwa", "reactjs"],

  // Languages internal
  ["c", "cpp"],
  ["cpp", "java"],
  ["java", "python"],

  // Tools internal
  ["postman", "git"],
  ["git", "github"],
  ["github", "gcp"],
  ["gcp", "vercel"],

  // bridges between clusters
  ["python", "tensorflow"],
  ["python", "numpy"],
  ["python", "pandas"],
  ["git", "python"],
  ["postman", "restapis"],
  ["vercel", "reactjs"],
  ["gcp", "tensorflow"],
];

const clusterColors = ["#2fd6a7", "#f3efe6", "#9aa39d", "#d9b779"];

export default function Skills() {
  const [hovered, setHovered] = useState<string | null>(null);
  const map = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <section id="skills" className="relative px-6 md:px-12 py-28 md:py-40">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-4">
          Skills — 07
        </p>
        

        <svg
          viewBox="0 0 900 490"
          className="w-full h-auto"
          style={{ maxHeight: 560 }}
        >
          {links.map(([a, b], i) => {
            const na = map[a];
            const nb = map[b];
            const dim = hovered && hovered !== a && hovered !== b;
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
                transition={{ duration: 1, delay: i * 0.02 }}
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
                {n.full && <title>{n.full}</title>}
                <motion.circle
                  cx={n.x}
                  cy={n.y}
                  r={hovered === n.id ? 7 : 4.5}
                  fill={clusterColors[n.cluster]}
                  fillOpacity={dim ? 0.3 : 1}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.03 }}
                />
                <motion.text
                  x={n.x}
                  y={n.y - 14}
                  textAnchor="middle"
                  fill={n.cluster === 1 ? "#f3efe6" : clusterColors[n.cluster]}
                  fillOpacity={dim ? 0.25 : 0.9}
                  fontSize={11}
                  fontFamily="var(--font-mono)"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.03 }}
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
            AI / ML Skills
          </span>
          <span className="flex items-center gap-2 text-ink-dim">
            <span className="w-2 h-2 rounded-full" style={{ background: clusterColors[1] }} />
            Development Skills
          </span>
          <span className="flex items-center gap-2 text-ink-dim">
            <span className="w-2 h-2 rounded-full" style={{ background: clusterColors[2] }} />
            Programming Languages
          </span>
          <span className="flex items-center gap-2 text-ink-dim">
            <span className="w-2 h-2 rounded-full" style={{ background: clusterColors[3] }} />
            Testing, Version Control & Cloud
          </span>
        </div>
      </div>
    </section>
  );
}