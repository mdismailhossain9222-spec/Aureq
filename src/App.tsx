import { MotionConfig } from "framer-motion";
import { CustomCursor } from "@/components/CustomCursor";
import { GlassNav } from "@/components/GlassNav";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Hero } from "@/sections/Hero";
import { Collection } from "@/sections/Collection";
import { Craft } from "@/sections/Craft";
import { Materials } from "@/sections/Materials";
import { Lookbook } from "@/sections/Lookbook";
import { CtaFooter } from "@/sections/CtaFooter";
import { useLenis } from "@/lib/useLenis";

export default function App() {
  useLenis();

  return (
    <MotionConfig reducedMotion="user">
      <div className="grain relative min-h-screen w-full overflow-x-hidden bg-black text-white">
        <ScrollProgress />
        <GlassNav />
        <CustomCursor />

        <main>
          <Hero />
          <Collection />
          <Craft />
          <Materials />
          <Lookbook />
        </main>

        <CtaFooter />
      </div>
    </MotionConfig>
  );
}
