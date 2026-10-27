import type { Config } from "tailwindcss";

/**
 * Tailwind v4 reads its theme from `src/index.css` (`@theme`), which is where
 * `--font-heading` / `--font-body` are registered. This file mirrors the same
 * extension so editors and older tooling pick up the Aureq type system too.
 */
const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["'Instrument Serif'", "serif"],
        body: ["'Barlow'", "sans-serif"],
      },
      colors: {
        champagne: "#E8D9B5",
      },
    },
  },
};

export default config;
