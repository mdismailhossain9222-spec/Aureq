import { useEffect, useRef, useState, type ReactNode } from "react";
import Hls from "hls.js";
import { useInView, useReducedMotion } from "framer-motion";

type VideoBackdropProps = {
  src: string;
  poster: string;
  /** Applied to the media wrapper so parallax can ride on top of it. */
  className?: string;
  posterAlt?: string;
};

/**
 * HLS film loop that only mounts its player once the section is near the
 * viewport. Safari falls back to native HLS; a static poster sits underneath
 * so a failed stream degrades into a still frame rather than a hole.
 */
export function VideoBackdrop({
  src,
  poster,
  className,
  posterAlt = "",
}: VideoBackdropProps) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { once: true, margin: "200px" });
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!inView || reduced || !video) return;

    let hls: Hls | undefined;
    const fail = () => setPlaying(false);

    if (Hls.isSupported()) {
      hls = new Hls({ enableWorker: false, capLevelToPlayerSize: true });
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => undefined);
      });
      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          fail();
          hls?.destroy();
        }
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      video.play().catch(() => undefined);
    }

    return () => hls?.destroy();
  }, [inView, reduced, src]);

  return (
    <div ref={ref} className={className} aria-hidden="true">
      <img
        src={poster}
        alt={posterAlt}
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {!reduced && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          poster={poster}
          onPlaying={() => setPlaying(true)}
          onError={() => setPlaying(false)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            playing ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}



export function VideoFades() {
  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[200px] bg-gradient-to-b from-black via-black/60 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[200px] bg-gradient-to-t from-black via-black/60 to-transparent" />
    </>
  );
}

export function VideoShell({ children }: { children: ReactNode }) {
  return <div className="absolute inset-0 z-0 overflow-hidden">{children}</div>;
}
