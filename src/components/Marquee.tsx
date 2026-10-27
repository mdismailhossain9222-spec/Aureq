import { cn } from "@/lib/cn";

type MarqueeProps = {
  items: readonly string[];
  direction?: "left" | "right";
  separator?: string;
  className?: string;
  outline?: boolean;
};

/** Ambient horizontal scroll — 40s per loop, pauses on hover. */
export function Marquee({
  items,
  direction = "left",
  separator = "·",
  className,
  outline = true,
}: MarqueeProps) {
  const run = [...items, ...items];

  return (
    <div
      className={cn("marquee-wrap fade-x relative w-full overflow-hidden", className)}
    >
      <div
        className={cn(
          "marquee-track",
          direction === "left" ? "marquee-left" : "marquee-right",
        )}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {run.map((item, i) => (
              <span
                key={`${copy}-${item}-${i}`}
                className={cn(
                  "flex shrink-0 items-center whitespace-nowrap font-heading italic",
                  "text-[clamp(2.75rem,8vw,7.5rem)] leading-[1]",
                  outline ? "text-outline" : "text-white",
                )}
              >
                {item}
                <span
                  className="mx-6 md:mx-10 not-italic"
                  style={{
                    color: "transparent",
                    WebkitTextStroke: "1px rgba(232, 217, 181, 0.5)",
                  }}
                  aria-hidden="true"
                >
                  {separator}
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
