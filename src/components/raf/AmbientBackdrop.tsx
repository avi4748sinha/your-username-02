import { useEffect, useRef, useState } from "react";
import { ambientClips } from "@/data/rafiganj";
import { useAmbience } from "@/lib/ambience";

const HOLD_MS = 9000;

/**
 * Page-wide backdrop: every Rafiganj clip is mounted once and the active one
 * fades in over the others, so the scene keeps changing without reloading a
 * video. It is always silent — the music player owns the audio.
 */
export function AmbientBackdrop() {
  const { entered } = useAmbience();
  const [i, setI] = useState(0);
  const refs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    if (!entered) return;
    const id = setInterval(() => setI((p) => (p + 1) % ambientClips.length), HOLD_MS);
    return () => clearInterval(id);
  }, [entered]);

  useEffect(() => {
    refs.current.forEach((el, idx) => {
      if (!el) return;
      el.muted = true;
      if (idx === i || idx === (i + 1) % ambientClips.length) {
        if (idx === i) el.currentTime = 0;
        void el.play().catch(() => {});
      } else {
        el.pause();
      }
    });
  }, [i, entered]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-midnight" aria-hidden>
      {ambientClips.map((c, idx) => (
        <video
          key={c.id}
          ref={(el) => {
            refs.current[idx] = el;
          }}
          src={c.video}
          poster={c.poster}
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          className="absolute inset-0 h-full w-full origin-bottom scale-[1.35] object-cover cool transition-opacity duration-[1600ms] ease-out"
          style={{ opacity: idx === i ? (entered ? 0.42 : 0.14) : 0 }}
        />
      ))}

      {/* black night wash + a faint red ember from the top */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, oklch(0.35 0.16 27 / 0.28) 0%, transparent 58%), linear-gradient(180deg, oklch(0.07 0.003 285 / 0.82) 0%, oklch(0.07 0.003 285 / 0.7) 45%, oklch(0.06 0.003 285 / 0.94) 100%)",
        }}
      />
      <div className="absolute inset-0 grain" />
    </div>
  );
}
