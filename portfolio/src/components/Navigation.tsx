"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { User, FolderKanban, FlaskConical, Network, Mail } from "lucide-react";

const links = [
  { href: "#about", label: "about", icon: User },
  { href: "#projects", label: "projects", icon: FolderKanban },
  { href: "#research", label: "research", icon: FlaskConical },
  { href: "#skills", label: "skills", icon: Network },
  { href: "#contact", label: "contact", icon: Mail },
];

function DockItem({
  href,
  label,
  Icon,
  isActive,
  mouseX,
  onActivate,
}: {
  href: string;
  label: string;
  Icon: typeof User;
  isActive: boolean;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  onActivate: (href: string) => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return Infinity;
    return val - (rect.left + rect.width / 2);
  });

  const scaleRaw = useTransform(
    distance,
    [-160, -80, 0, 80, 160],
    [1, 1.25, 1.9, 1.25, 1]
  );
  const scale = useSpring(scaleRaw, { stiffness: 400, damping: 26, mass: 0.4 });

  const yRaw = useTransform(
    distance,
    [-160, -80, 0, 80, 160],
    [0, -4, -12, -4, 0]
  );
  const y = useSpring(yRaw, { stiffness: 400, damping: 26, mass: 0.4 });

  return (
    <div className="relative flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 4 }}
        transition={{ duration: 0.15 }}
        className="absolute -top-11 px-2.5 py-1 rounded-md font-mono text-[10px] lowercase tracking-wide whitespace-nowrap pointer-events-none"
        style={{
          background: "rgba(15, 19, 18, 0.9)",
          color: "var(--color-ink)",
          border: "1px solid rgba(243,239,230,0.08)",
        }}
      >
        {label}
      </motion.div>
      <motion.a
        ref={ref}
        href={href}
        data-dock-href={href}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onPointerUp={() => setHovered(false)}
        onPointerCancel={() => setHovered(false)}
        onClick={(event) => {
          event.preventDefault();
          setHovered(false);
          mouseX.set(Infinity);
          onActivate(href);
        }}
        style={{ scale, y }}
        className="flex items-center justify-center w-10 h-10 rounded-full shrink-0"
      >
        <span
          className={`flex items-center justify-center w-full h-full rounded-full transition-colors duration-300 ${
            isActive ? "bg-accent text-bg" : "text-ink-dim hover:text-ink"
          }`}
        >
          <Icon size={17} strokeWidth={1.75} />
        </span>
      </motion.a>
      {isActive && (
        <span className="absolute -bottom-2 w-1 h-1 rounded-full bg-accent" />
      )}
    </div>
  );
}

export default function Navigation() {
  const [active, setActive] = useState<string>("");
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const rafId = useRef<number | null>(null);
  const mouseX = useMotionValue(Infinity);
  const pointerState = useRef({ active: false, lastHref: "" });

  const scrollToHref = (href: string) => {
    const section = document.querySelector(href) as HTMLElement | null;
    if (!section) return;

    setActive(href);
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleDockPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") return;

    pointerState.current.active = true;
    pointerState.current.lastHref = "";
    mouseX.set(event.clientX);

    const target = document.elementFromPoint(event.clientX, event.clientY) as HTMLElement | null;
    const link = target?.closest("a[data-dock-href]") as HTMLAnchorElement | null;
    const href = link?.dataset.dockHref;

    if (href) {
      pointerState.current.lastHref = href;
      scrollToHref(href);
    }
  };

  const handleDockPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    mouseX.set(event.clientX);

    if (event.pointerType === "mouse") return;
    if (!pointerState.current.active) return;

    const target = document.elementFromPoint(event.clientX, event.clientY) as HTMLElement | null;
    const link = target?.closest("a[data-dock-href]") as HTMLAnchorElement | null;
    const href = link?.dataset.dockHref;

    if (href && href !== pointerState.current.lastHref) {
      pointerState.current.lastHref = href;
      scrollToHref(href);
    }
  };

  const resetDockPointerState = () => {
    pointerState.current.active = false;
    pointerState.current.lastHref = "";
    mouseX.set(Infinity);
  };

  useEffect(() => {
    const onScroll = () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }

      rafId.current = window.requestAnimationFrame(() => {
        const y = window.scrollY;
        setHidden(y > lastY.current && y > 200);
        lastY.current = y;

        const sections = links.map((l) => document.querySelector(l.href));
        let current = "";

        sections.forEach((sec) => {
          if (!sec) return;
          const rect = sec.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            current = "#" + sec.id;
          }
        });

        setActive(current);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: hidden ? 100 : 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50"
    >
      <div
        onPointerLeave={resetDockPointerState}
        onPointerDown={handleDockPointerDown}
        onPointerMove={handleDockPointerMove}
        onPointerUp={resetDockPointerState}
        onPointerCancel={resetDockPointerState}
        onLostPointerCapture={resetDockPointerState}
        className="flex items-end gap-1 rounded-full px-3 py-2.5 border"
        style={{
          touchAction: "none",
          background: "rgba(15, 19, 18, 0.55)",
          backdropFilter: "blur(16px) saturate(140%)",
          WebkitBackdropFilter: "blur(16px) saturate(140%)",
          borderColor: "rgba(243,239,230,0.08)",
        }}
      >
        {links.map((l) => (
          <DockItem
            key={l.href}
            href={l.href}
            label={l.label}
            Icon={l.icon}
            isActive={active === l.href}
            mouseX={mouseX}
            onActivate={scrollToHref}
          />
        ))}
      </div>
    </motion.nav>
  );
}