import { motion, useScroll, useSpring } from "framer-motion";

/** 1px hairline across the top of the viewport, tied to reading progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    mass: 0.4,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[65] h-px w-full origin-left bg-white"
      style={{ scaleX }}
    />
  );
}
