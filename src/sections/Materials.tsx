import { useEffect, useRef, useState } from "react";
import {
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { Marquee } from "@/components/Marquee";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { site, type Stat } from "@/content/site";
import { EASE } from "@/lib/motion";

export function Materials() {
  const reversed = [...site.materials].reverse();

  return (
    <section
      id="materials"
      className="relative overflow-hidden bg-black py-32 md:py-40"
    >
      {/* single champagne hairline across the top */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne to-transparent opacity-70"
      />

      <img
        src={site.materialsBackdrop}
        alt="Macro study of brushed champagne gold, black sapphire glass and carbon weave"
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover opacity-[0.14] [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]"
      />

      <div className="relative">
        <RevealOnScroll className="px-6 md:px-16 lg:px-24">
          <p className="text-[10px] uppercase tracking-[0.35em] text-white/45">
            Materials — No Substitutes
          </p>
        </RevealOnScroll>

        <div className="mt-12 flex flex-col gap-2 md:gap-6">
          <Marquee items={site.materials} direction="left" />
          <Marquee items={reversed} direction="right" />
        </div>

        <div className="mt-20 grid grid-cols-1 gap-4 px-6 md:grid-cols-3 md:px-16 lg:px-24">
          {site.stats.map((stat, i) => (
            <RevealOnScroll key={stat.label} delay={i * 0.1}>
              <StatCard stat={stat} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const reduced = useReducedMotion();
  const value = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;

    const render = (v: number) => setDisplay(v.toFixed(stat.decimals));
    render(reduced ? stat.value : 0);

    if (reduced) return;

    const controls = animate(value, stat.value, {
      duration: 1.2,
      ease: EASE,
    });
    const unsubscribe = value.on("change", render);

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [inView, reduced, stat.value, stat.decimals, value]);

  return (
    <div
      ref={ref}
      className="liquid-glass-strong rounded-2xl p-8 md:p-10"
    >
      <p className="flex items-baseline gap-1 font-heading text-6xl italic leading-none text-white md:text-7xl">
        <span>{display}</span>
        <span className="text-3xl text-champagne md:text-4xl">
          {stat.suffix}
        </span>
      </p>
      <div className="mt-6 h-px w-full bg-white/10" />
      <p className="mt-5 text-[10px] uppercase tracking-[0.3em] text-white/50">
        {stat.label}
      </p>
    </div>
  );
}
