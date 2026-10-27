import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { site, type LookItem } from "@/content/site";
import { clipReveal } from "@/lib/motion";
import { cn } from "@/lib/cn";

const RATIOS = ["aspect-[4/5]", "aspect-[4/5]", "aspect-[3/4]", "aspect-[4/5]", "aspect-square"];
const OFFSETS = [
  "md:translate-y-0",
  "md:translate-y-16",
  "md:translate-y-6",
  "md:translate-y-20",
  "md:translate-y-0",
];

export function Lookbook() {
  return (
    <section
      id="lookbook"
      className="relative overflow-hidden px-6 py-32 md:px-16 md:py-40 lg:px-24"
    >
      {/* Section-only film grain */}
      <div aria-hidden="true" className="grain-section pointer-events-none absolute inset-0" />

      <RevealOnScroll className="relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <h2 className="font-heading text-5xl leading-[0.9] tracking-tight text-white md:text-7xl">
          <span className="block">{site.lookbook.titleLine1}</span>
          <span className="block italic text-white/85">
            {site.lookbook.titleLine2}
          </span>
        </h2>
        <a
          href="#collection"
          className="group inline-flex items-center gap-2 self-start text-[11px] uppercase tracking-[0.22em] text-white/50 transition-colors duration-500 hover:text-white md:self-end"
        >
          {site.lookbook.link}
          <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
            →
          </span>
        </a>
      </RevealOnScroll>

      <div className="relative mt-16 columns-2 gap-5 md:columns-3 md:gap-6">
        {site.lookbook.items.map((item, i) => (
          <LookTile
            key={item.caption}
            item={item}
            index={i}
            ratio={RATIOS[i % RATIOS.length]}
            offset={OFFSETS[i % OFFSETS.length]}
          />
        ))}
      </div>
    </section>
  );
}

function LookTile({
  item,
  index,
  ratio,
  offset,
}: {
  item: LookItem;
  index: number;
  ratio: string;
  offset: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  return (
    <motion.figure
      ref={ref}
      variants={clipReveal}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-15%" }}
      className={cn(
        "group relative mb-5 break-inside-avoid overflow-hidden rounded-xl border border-white/10",
        offset,
      )}
    >
      <motion.div style={{ scale }} className={cn("relative w-full", ratio)}>
        <img
          src={item.image}
          alt={item.alt}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: item.pos }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </motion.div>

      <figcaption className="pointer-events-none absolute bottom-4 left-4 opacity-0 transition-all duration-500 group-hover:opacity-100">
        <span className="liquid-glass-strong rounded-full px-4 py-2 text-[10px] uppercase tracking-wider text-white/85">
          {item.caption}
        </span>
      </figcaption>

      <span
        aria-hidden="true"
        className="absolute right-4 top-4 text-[10px] uppercase tracking-[0.3em] text-white/40"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
    </motion.figure>
  );
}
