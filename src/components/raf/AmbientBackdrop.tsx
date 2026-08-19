import { useEffect, useRef, useState } from "react";
import { ambientClips } from "@/data/rafiganj";
import { useAmbience } from "@/lib/ambience";

const HOLD_MS = 15000;

/**
 * Fixed, page-wide ambience: the Rafiganj footage cross-fades from one night
 * scene to the next behind everything, in a cool blue grade. Sound only starts
 * after the visitor taps Enter and ducks whenever the music player takes over.
 */
export function AmbientBackdrop() {
  const { entered, ducked, soundOn } = useAmbience();
  const [i, setI] = useState(0);
  const a = useRef<HTMLVideoElement>(null);
  const b = useRef<HTMLVideoElement>(null);

  // advance the scene on a slow loop once the visitor is in
  useEffect(() => {
    if (!entered) return;
    const id = setInterval(() => setI((p) => (p + 1) % ambientClips.length), HOLD_MS);
    return () => clearInterval(id);
  }, [entered]);

  const front = i % 2 === 0 ? a : b;
  const back = i % 2 === 0 ? b : a;
  const frontClip = ambientClips[i]!;
  const backClip = ambientClips[(i + 1) % ambientClips.length]!;

  useEffect(() => {
    const wantSound = entered && soundOn && !ducked;
    for (const r of [a, b]) {
      const el = r.current;
      if (!el) continue;
      el.volume = 0.3;
      el.muted = true;
    }
    const f = front.current;
    if (f) {
      f.muted = !wantSound;
      f.currentTime = 0;
      void f.play().catch(() => {});
    }
    if (back.current) void back.current.play().catch(() => {});
  }, [entered, ducked, soundOn, i, front, back]);

  const cls =
    "absolute inset-0 h-full w-full origin-bottom scale-[1.35] object-cover cool transition-opacity duration-[2200ms] ease-out";

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-midnight" aria-hidden>
      <video
        ref={a}
        key={`a-${i % 2 === 0 ? frontClip.id : backClip.id}`}
        src={i % 2 === 0 ? frontClip.video : backClip.video}
        poster={i % 2 === 0 ? frontClip.poster : backClip.poster}
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        className={cls}
        style={{ opacity: i % 2 === 0 ? (entered ? 0.44 : 0.16) : 0 }}
      />
      <video
        ref={b}
        key={`b-${i % 2 === 1 ? frontClip.id : backClip.id}`}
        src={i % 2 === 1 ? frontClip.video : backClip.video}
        poster={i % 2 === 1 ? frontClip.poster : backClip.poster}
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        className={cls}
        style={{ opacity: i % 2 === 1 ? (entered ? 0.44 : 0.16) : 0 }}
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
