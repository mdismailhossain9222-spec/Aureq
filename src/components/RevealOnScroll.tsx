import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type RevealOnScrollProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "article" | "li" | "header" | "figure";
};

/** Opacity + lift + de-blur on first entry. Text first, then media, then tertiary. */
export function RevealOnScroll({
  children,
  className,
  delay = 0,
  y = 40,
  as = "div",
}: RevealOnScrollProps) {
  const Tag = motion[as];

  return (
    <Tag
      className={cn(className)}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay },
      }}
      viewport={{ once: true, margin: "-15%" }}
    >
      {children}
    </Tag>
  );
}
