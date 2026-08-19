import { useEffect, useRef } from "react";
import { ambientClip } from "@/data/rafiganj";
import { useAmbience } from "@/lib/ambience";

/**
 * Fixed, page-wide ambience: the Rafiganj night clip runs behind everything in
 * a cool blue grade. Sound only starts after the visitor taps Enter (browsers
 * block unmuted autoplay) and ducks whenever the music player takes over.
 */
export function AmbientBackdrop() {
  const ref = useRef<HTMLVideoElement>(null);
  const { entered, ducked, soundOn } = useAmbience();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const wantSound = entered && soundOn && !ducked;
    el.muted = !wantSound;
    el.volume = 0.32;
    if (entered) void el.play().catch(() => {});
  }, [entered, ducked, soundOn]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-midnight" aria-hidden>
      <video
        ref={ref}
        src={ambientClip.video}
        poster={ambientClip.poster}
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        className="h-full w-full scale-110 object-cover cool"
        style={{ opacity: entered ? 0.42 : 0.16, transition: "opacity 2.4s ease" }}
      />
      {/* blue night wash + depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, oklch(0.28 0.09 250 / 0.55) 0%, transparent 60%), linear-gradient(180deg, oklch(0.12 0.05 258 / 0.85) 0%, oklch(0.11 0.05 258 / 0.7) 45%, oklch(0.1 0.045 258 / 0.92) 100%)",
        }}
      />
      <div className="absolute inset-0 grain" />
    </div>
  );
}
