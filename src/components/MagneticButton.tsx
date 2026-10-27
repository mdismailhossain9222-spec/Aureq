import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/cn";

type MagneticButtonProps = {
  children: ReactNode;
  href?: string;
  className?: string;
  ariaLabel?: string;
  onClick?: () => void;
};

const SPRING = { stiffness: 220, damping: 22, mass: 0.4 };

/** Pulls the control up to 6px toward the cursor, then settles back. */
export function MagneticButton({
  children,
  href = "#",
  className,
  ariaLabel,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, SPRING);
  const sy = useSpring(y, SPRING);

  const handleMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    x.set(Math.max(-6, Math.min(6, dx * 0.18)));
    y.set(Math.max(-6, Math.min(6, dy * 0.3)));
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      aria-label={ariaLabel}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={cn(
        "group relative inline-flex items-center gap-2.5 rounded-full px-7 py-4 text-[11px] uppercase tracking-[0.22em] transition-colors duration-500",
        className,
      )}
    >
      {children}
    </motion.a>
  );
}
