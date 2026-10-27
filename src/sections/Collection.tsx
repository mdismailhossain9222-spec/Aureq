import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { site, type CollectionItem } from "@/content/site";
import { EASE, staggerSlow } from "@/lib/motion";
import { cn } from "@/lib/cn";

export function Collection() {
  return (
    <section
      id="collection"
      className="relative px-6 py-32 md:px-16 md:py-40 lg:px-24"
    >
      <RevealOnScroll className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <h2 className="font-heading text-5xl leading-[0.9] tracking-tight text-white md:text-7xl">
          <span className="block">The</span>
          <span className="block italic text-white/90">Collection</span>
        </h2>
        <a
          href="#lookbook"
          className="group inline-flex items-center gap-2 self-start text-[11px] uppercase tracking-[0.22em] text-white/50 transition-colors duration-500 hover:text-white md:self-end"
        >
          View all
          <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
            →
          </span>
        </a>
      </RevealOnScroll>

      <motion.div
        className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[260px] md:grid-cols-4 lg:auto-rows-[300px]"
        variants={staggerSlow}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-15%" }}
      >
        {site.collection.map((item) => (
          <CollectionCard key={item.name} item={item} />
        ))}
      </motion.div>
    </section>
  );
}

function CollectionCard({ item }: { item: CollectionItem }) {
  const featured = Boolean(item.featured);

  return (
    <motion.article
      variants={{
        initial: { opacity: 0, y: 60 },
        animate: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.9, ease: EASE },
        },
      }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-black",
        "h-[62vw] sm:h-[42vw] md:h-auto",
        featured && "sm:col-span-2 md:col-span-2 md:row-span-2",
      )}
    >
      <img
        src={item.image}
        alt={`${item.name} — ${item.tag}`}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full scale-100 object-cover transition-transform duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent opacity-90" />
      <div className="pointer-events-none absolute inset-0 rounded-2xl transition-shadow duration-500 group-hover:shadow-[inset_0_0_60px_rgba(232,217,181,0.08)]" />

      {/* Glass label pill */}
      <div className="liquid-glass-strong absolute bottom-4 left-4 flex items-center gap-3 rounded-full px-4 py-2">
        <span className="font-heading text-sm italic leading-none text-white">
          {item.name}
        </span>
        <span className="text-[10px] uppercase leading-none tracking-wider text-white/60">
          {item.tag}
        </span>
      </div>

      {/* Tertiary action */}
      <span
        aria-hidden="true"
        className="liquid-glass-strong absolute right-4 top-4 flex h-8 w-8 translate-y-1 items-center justify-center rounded-full opacity-0 transition-all duration-500 group-hover:-translate-y-0 group-hover:translate-x-1 group-hover:opacity-100"
      >
        <ArrowUpRight className="h-4 w-4 text-white" strokeWidth={1.25} />
      </span>
    </motion.article>
  );
}
