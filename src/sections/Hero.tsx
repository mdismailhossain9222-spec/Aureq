import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SplitText } from "@/components/SplitText";
import { MagneticButton } from "@/components/MagneticButton";
import {
  VideoBackdrop,
  VideoFades,
} from "@/components/VideoBackdrop";
import { site } from "@/content/site";
import { EASE } from "@/lib/motion";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 55, damping: 22, mass: 0.7 });
  const py = useSpring(my, { stiffness: 55, damping: 22, mass: 0.7 });

  const handleMove = (event: React.MouseEvent<HTMLElement>) => {
    if (reduced) return;
    const { clientX, clientY } = event;
    mx.set((clientX / window.innerWidth - 0.5) * -24);
    my.set((clientY / window.innerHeight - 0.5) * -24);
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      onMouseMove={handleMove}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden"
    >
      {/* Film loop */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ x: px, y: py, scale: 1.08 }}
      >
        <VideoBackdrop
          src={site.hero.videoUrl}
          poster={site.hero.poster}
          posterAlt="Abstract liquid chrome ring floating in a black void"
          className="absolute inset-0"
        />
      </motion.div>

      <VideoFades />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_50%,transparent_35%,rgba(0,0,0,0.55)_100%)]" />

      {/* Copy */}
      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center px-6 pb-28 pt-36 text-center md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          className="flex items-center gap-4"
        >
          <span className="h-px w-8 bg-white/25" aria-hidden="true" />
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/50 md:text-xs">
            {site.hero.eyebrow}
          </p>
          <span className="h-px w-8 bg-white/25" aria-hidden="true" />
        </motion.div>

        <h1 className="mt-8 max-w-4xl font-heading text-5xl italic leading-[0.85] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
          <SplitText text={site.hero.title} immediate />
        </h1>

        <motion.p
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.6 }}
          className="mt-8 max-w-xl text-base font-light leading-relaxed text-white/60 md:text-lg"
        >
          {site.hero.subtext}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.85 }}
          className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
        >
          <MagneticButton
            href="#collection"
            ariaLabel={site.hero.ctaPrimary}
            className="liquid-glass-strong text-white/90 hover:text-white"
          >
            {site.hero.ctaPrimary}
            <ArrowUpRight className="h-5 w-5" strokeWidth={1.25} />
          </MagneticButton>

          <MagneticButton
            href="#contact"
            ariaLabel={site.hero.ctaSecondary}
            className="bg-white text-black hover:bg-white/90"
          >
            {site.hero.ctaSecondary}
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 1.1 }}
        className="absolute bottom-10 left-6 z-10 flex flex-col items-center gap-4 md:left-16"
      >
        <span
          className="text-[10px] uppercase tracking-[0.35em] text-white/40"
          style={{ writingMode: "vertical-rl" }}
        >
          {site.hero.scrollLabel}
        </span>
        <span className="relative block h-12 w-px overflow-hidden bg-white/15">
          <motion.span
            className="absolute left-0 top-0 block h-3 w-px bg-white/80"
            animate={{ y: [0, 40], opacity: [0, 1, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
