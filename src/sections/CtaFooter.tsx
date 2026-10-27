import { ArrowUpRight } from "lucide-react";
import { SplitText } from "@/components/SplitText";
import { MagneticButton } from "@/components/MagneticButton";
import {
  VideoBackdrop,
  VideoFades,
} from "@/components/VideoBackdrop";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { site } from "@/content/site";

export function CtaFooter() {
  return (
    <footer id="contact" className="relative w-full overflow-hidden bg-black">
      <div className="relative flex min-h-[90vh] w-full flex-col items-center justify-center px-6 py-40 text-center md:px-16">
        <VideoBackdrop
          src={site.hero.videoUrl}
          poster={site.hero.poster}
          posterAlt="Abstract liquid chrome ring drifting in black"
          className="absolute inset-0"
        />
        <VideoFades />
        <div className="pointer-events-none absolute inset-0 bg-black/45" />

        <div className="relative z-10 flex w-full max-w-4xl flex-col items-center">
          <RevealOnScroll>
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/50">
              {site.cta.eyebrow}
            </p>
          </RevealOnScroll>

          <h2 className="mt-8 font-heading text-4xl italic leading-[0.95] tracking-tight text-white sm:text-5xl md:text-7xl">
            <SplitText text={site.cta.title} />
          </h2>

          <RevealOnScroll delay={0.15}>
            <p className="mt-8 max-w-xl text-base font-light leading-relaxed text-white/60 md:text-lg">
              {site.cta.subtext}
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.25}>
            <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
              <MagneticButton
                href="#contact"
                ariaLabel={site.cta.primary}
                className="liquid-glass-strong text-white/90 hover:text-white"
              >
                {site.cta.primary}
                <ArrowUpRight className="h-5 w-5" strokeWidth={1.25} />
              </MagneticButton>

              <MagneticButton
                href="#collection"
                ariaLabel={site.cta.secondary}
                className="bg-white text-black hover:bg-white/90"
              >
                {site.cta.secondary}
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
              </MagneticButton>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      <div className="mt-32 border-t border-white/10 px-6 py-10 md:px-16 lg:px-24">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <a
            href="#top"
            className="font-heading text-2xl italic leading-none tracking-tight text-white transition-opacity duration-500 hover:opacity-70"
          >
            {site.brand}
          </a>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {site.footer.links.map((link) => (
                <li key={link}>
                  <a
                    href="#contact"
                    className="text-[11px] uppercase tracking-[0.22em] text-white/50 transition-colors duration-500 hover:text-white"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <p className="text-[11px] uppercase tracking-[0.18em] text-white/40">
            {site.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
