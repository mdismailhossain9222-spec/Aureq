import type { Variants } from "framer-motion";

/** Smooth, damped, spring-like settle. Used for almost everything. */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Harder entrance — used sparingly, for wipes and clip reveals. */
export const EASE_IN: [number, number, number, number] = [0.83, 0, 0.17, 1];

export const VIEWPORT = { once: true, margin: "-15%" } as const;

export const fadeUp: Variants = {
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE },
  },
};

export const blurIn: Variants = {
  initial: { opacity: 0, filter: "blur(8px)" },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 1.1, ease: EASE },
  },
};

export const stagger: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.08 } },
};

export const staggerSlow: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.1 } },
};

export const clipReveal: Variants = {
  initial: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
  animate: {
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: { duration: 1.1, ease: EASE },
  },
};
