import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";

/** Sticky glass pill. Tightens and darkens once the page starts moving. */
export function GlassNav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  return (
    <motion.header
      className="fixed inset-x-0 top-6 z-50 flex justify-center px-4"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
    >
      <motion.nav
        aria-label="Primary"
        className="liquid-glass-strong flex w-full max-w-3xl items-center justify-between rounded-full px-5 md:px-6"
        animate={{
          paddingTop: scrolled ? 8 : 12,
          paddingBottom: scrolled ? 8 : 12,
          backgroundColor: scrolled
            ? "rgba(0, 0, 0, 0.35)"
            : "rgba(255, 255, 255, 0.01)",
          boxShadow: scrolled
            ? "4px 4px 12px rgba(0,0,0,0.25), inset 0 1px 1px rgba(255,255,255,0.28)"
            : "4px 4px 4px rgba(0,0,0,0.05), inset 0 1px 1px rgba(255,255,255,0.15)",
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <a
          href="#top"
          className="relative z-10 font-heading text-xl italic leading-none tracking-tight text-white"
        >
          {site.brand}
        </a>

        <ul className="relative z-10 hidden items-center gap-8 md:flex">
          {site.nav.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="group relative text-[11px] uppercase tracking-[0.22em] text-white/60 transition-colors duration-500 hover:text-white"
              >
                {item}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-white/70 transition-all duration-500 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#collection"
          className="liquid-glass-strong group relative z-10 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-white/85 transition-colors duration-500 hover:text-white"
        >
          {site.hero.shop}
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={1.25}
          />
        </a>
      </motion.nav>
    </motion.header>
  );
}
