"use client";

import { motion } from "framer-motion";

const projects = [
  {
    index: "01",
    title: "Jewellery CRM Software",
    // subtitle: "End-to-end CRM built for the jewellery industry",
    stack: ["React.js", "REST APIs", "JWT Auth", "UI/UX"],
    detail:
      "Researched jewellery industry workflows and client requirements to lay the foundation for a tailored CRM solution. Led frontend development in React.js, building dynamic forms, dashboards, and interactive tables, and collaborated closely with clients and backend developers to translate real-world needs into intuitive, functional modules.",
    visual: "dashboard",
    link: "https://app.notion.com/p/Jewellery-CRM-Software-2b0b1f8b2b6e80bcbcc6d8762809a90b",
  },
  {
    index: "02",
    title: "CarXpert",
    // subtitle: "Progressive web app for automotive care & detailing",
    stack: ["React.js", "Tailwind CSS", "PWA", "Vercel"],
    detail:
      "A sleek, modern Progressive Web App for automotive care and detailing services, emphasizing seamless navigation and a visually appealing interface. Built responsive design end to end, including a full service-booking system and a powerful admin dashboard for managing bookings and contact form submissions.",
    visual: "road",
    link: "https://car-xpert.vercel.app/",
  },
];

function ProjectAction({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 self-start rounded-full border border-[rgba(243,239,230,0.12)] bg-[rgba(243,239,230,0.03)] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim transition-colors hover:border-accent/40 hover:text-accent hover:bg-[rgba(47,214,167,0.06)]"
    >
      <span>Visit project</span>
      <span aria-hidden="true">↗</span>
    </a>
  );
}

function Visual({ type }: { type: string }) {
  if (type === "dashboard") {
    return (
      <svg viewBox="0 0 400 200" className="w-full h-full">
        {/* sidebar */}
        <motion.rect
          x="10" y="10" width="50" height="180" rx="3"
          fill="none" stroke="#3a423e" strokeWidth="1"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        />
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.rect
            key={`nav-${i}`}
            x="20" y={30 + i * 30} width="30" height="6" rx="2"
            fill={i === 0 ? "#2fd6a7" : "#3a423e"}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
          />
        ))}
        {/* top stat cards */}
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.rect
            key={`card-${i}`}
            x={80 + i * 100} y="20" width="85" height="45" rx="3"
            fill="none" stroke={i === 0 ? "#2fd6a7" : "#3a423e"} strokeWidth="1"
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
          />
        ))}
        {/* table rows */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.line
            key={`row-${i}`}
            x1="80" y1={90 + i * 20} x2="380" y2={90 + i * 20}
            stroke="#3a423e" strokeWidth="1"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 + i * 0.06 }}
          />
        ))}
      </svg>
    );
  }

  // road / automotive visual
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      {/* road */}
      <motion.line
        x1="0" y1="150" x2="400" y2="150"
        stroke="#3a423e" strokeWidth="1.5"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
      {/* lane dashes */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.line
          key={i}
          x1={10 + i * 50} y1="150" x2={35 + i * 50} y2="150"
          stroke="#2fd6a7" strokeWidth="2"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
        />
      ))}
      {/* simple car silhouette */}
      <motion.path
        d="M60,130 L90,130 L100,110 L150,110 L165,130 L200,130 L200,140 L60,140 Z"
        fill="none" stroke="#2fd6a7" strokeWidth="1.5"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />
      <motion.circle cx="85" cy="140" r="8" fill="none" stroke="#5c655f" strokeWidth="1.5"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.8 }} />
      <motion.circle cx="175" cy="140" r="8" fill="none" stroke="#5c655f" strokeWidth="1.5"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.85 }} />
    </svg>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative px-6 md:px-12 py-28 md:py-40">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-16">
          Projects — 05
        </p>

        <div className="space-y-28 md:space-y-40">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div>
                <span className="font-mono text-6xl md:text-8xl text-ink-faint/30 leading-none">
                  {p.index}
                </span>
                <h3 className="font-display text-3xl md:text-5xl tracking-tight text-ink mt-4 mb-3">
                  {p.title}
                </h3>
                {/* <p className="text-accent text-sm mb-6">{p.subtitle}</p> */}
                <p className="text-ink-dim leading-relaxed text-[15px] max-w-lg mb-6">
                  {p.detail}
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-2 mb-6">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[11px] text-ink-faint uppercase tracking-wide"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <ProjectAction href={p.link} />
              </div>
              <div className="aspect-[4/2.2] w-full">
                <Visual type={p.visual} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}