import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { site, type CraftStep } from "@/content/site";
import { EASE, clipReveal } from "@/lib/motion";

export function Craft() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineScale = useTransform(scrollYProgress, [0.05, 0.85], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = latest < 0.34 ? 0 : latest < 0.62 ? 1 : 2;
    setActive((prev) => (prev === index ? prev : index));
  });

  return (
    <section
      id="craft"
      ref={sectionRef}
      className="relative overflow-hidden bg-black px-6 py-32 md:px-16 md:py-40 lg:px-24"
    >
      {/* champagne ambience behind the text rail */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-1/4 h-[640px] w-[640px] -translate-x-1/3 rounded-full bg-[radial-gradient(circle,rgba(232,217,181,0.06)_0%,rgba(232,217,181,0)_70%)]"
      />

      <div className="relative grid grid-cols-1 gap-16 lg:grid-cols-[2fr_3fr] lg:gap-20">
        {/* Sticky text rail */}
        <div className="craft-rail">
          <RevealOnScroll>
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/45">
              The Process
            </p>
            <h2 className="mt-6 max-w-md font-heading text-4xl italic leading-[1.05] text-white md:text-5xl">
              Made slow, by hands that refuse to hurry.
            </h2>
          </RevealOnScroll>

          <div className="relative mt-14 pl-10 md:pl-14">
            <div
              aria-hidden="true"
              className="absolute left-0 top-0 h-full w-px bg-white/10"
            >
              <motion.div
                className="h-full w-px origin-top bg-champagne/50"
                style={{ scaleY: lineScale }}
              />
            </div>

            <ol className="flex flex-col gap-12">
              {site.craft.map((step, i) => (
                <CraftStepItem
                  key={step.n}
                  step={step}
                  index={i}
                  active={active === i}
                />
              ))}
            </ol>
          </div>
        </div>

        {/* Parallax image stack */}
        <div className="flex flex-col gap-16 md:gap-24">
          {site.craft.map((step, i) => (
            <CraftImage key={`img-${step.n}`} step={step} offset={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CraftStepItem({
  step,
  index,
  active,
}: {
  step: CraftStep;
  index: number;
  active: boolean;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 32 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.9, ease: EASE, delay: index * 0.08 },
      }}
      viewport={{ once: true, margin: "-15%" }}
      className="relative"
    >
      <span
        className={`block font-heading text-6xl italic leading-none transition-colors duration-700 md:text-7xl ${
          active ? "text-champagne" : "text-white/10"
        }`}
      >
        {step.n}
      </span>
      <h3
        className={`mt-3 font-heading text-3xl italic transition-colors duration-700 md:text-4xl ${
          active ? "text-white" : "text-white/60"
        }`}
      >
        {step.title}
      </h3>
      <p className="mt-3 max-w-sm text-sm font-light leading-relaxed text-white/60 md:text-base">
        {step.body}
      </p>
    </motion.li>
  );
}

function CraftImage({
  step,
  offset,
}: {
  step: CraftStep;
  offset: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const distance = offset === 1 ? 80 : offset === 0 ? 40 : 64;
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <motion.figure
      ref={ref}
      variants={clipReveal}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-15%" }}
      className="relative overflow-hidden rounded-2xl border border-white/10"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-[-14%]">
          <img
            src={step.image}
            alt={`${step.title} — Aureq atelier`}
            loading="lazy"
            decoding="async"
            style={{ objectPosition: step.pos }}
            className="h-full w-full object-cover"
          />
        </motion.div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      <figcaption className="absolute bottom-5 left-5 flex items-center gap-3">
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/70">
          {step.n} — {step.title}
        </span>
      </figcaption>
    </motion.figure>
  );
}


