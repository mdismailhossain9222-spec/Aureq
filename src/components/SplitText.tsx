import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { EASE } from "@/lib/motion";

type SplitTextProps = {
  text: string;
  className?: string;
  delay?: number;
  /** Render the reveal on mount instead of on scroll (above-the-fold copy). */
  immediate?: boolean;
  as?: "span" | "h1" | "h2" | "h3" | "p";
};

/**
 * Word-by-word masked reveal: each word rises out of its own overflow-hidden
 * box, staggered, so the headline lifts out of the void.
 */
export function SplitText({
  text,
  className,
  delay = 0,
  immediate = false,
  as = "span",
}: SplitTextProps) {
  const words = text.split(" ");
  const Tag = motion[as];

  return (
    <Tag
      className={cn("inline-block", className)}
      initial="initial"
      animate={immediate ? "animate" : undefined}
      whileInView={immediate ? undefined : "animate"}
      viewport={{ once: true, margin: "-15%" }}
      variants={{
        initial: {},
        animate: { transition: { staggerChildren: 0.08, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="relative inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom"
        >
          <motion.span
            className="inline-block"
            variants={{
              initial: { y: "100%" },
              animate: {
                y: "0%",
                transition: { duration: 0.9, ease: EASE },
              },
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
