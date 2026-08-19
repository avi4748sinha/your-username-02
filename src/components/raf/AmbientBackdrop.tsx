import { useEffect, useRef, useState } from "react";
import { ambientClips, introFilm } from "@/data/rafiganj";
import { useAmbience } from "@/lib/ambience";

const HOLD_MS = 9000;

/**
 * Page-wide backdrop. On entry the opening film plays once *with its own
 * sound*; when it finishes (or when the visitor starts a song) the silent
 * Rafiganj scenes take over and keep cross-fading.
 */
export function AmbientBackdrop() {
  const { entered, ducked } = useAmbience();
  const [i, setI] = useState(0);
  const [introDone, setIntroDone] = useState(false);
  const intro = useRef<HTMLVideoElement>(null);
  const refs = useRef<(HTMLVideoElement | null)[]>([]);

  const introActive = entered && !introDone && !ducked;

  // the opening film — unmuted, one pass
  useEffect(() => {
    const el = intro.current;
    if (!el) return;
    if (!entered) return;
    if (introActive) {
      el.muted = false;
      el.volume = 1;
      void el.play().catch(() => {
        el.muted = true;
        void el.play().catch(() => {});
      });
    } else {
      el.muted = true;
      el.pause();
    }
  }, [entered, introActive]);

  useEffect(() => {
    if (!entered || introActive) return;
    const id = setInterval(() => setI((p) => (p + 1) % ambientClips.length), HOLD_MS);
    return () => clearInterval(id);
  }, [entered, introActive]);

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

      <video
        ref={intro}
        src={introFilm.video}
        poster={introFilm.poster}
        playsInline
        preload="auto"
        disablePictureInPicture
        onEnded={() => setIntroDone(true)}
        className="absolute inset-0 h-full w-full scale-[1.2] object-cover cool transition-opacity duration-[1400ms] ease-out"
        style={{ opacity: introActive ? 0.5 : 0 }}
      />

      {/* black night wash + a faint ember from the top */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, oklch(0.35 0.16 40 / 0.26) 0%, transparent 58%), linear-gradient(180deg, oklch(0.07 0.003 60 / 0.8) 0%, oklch(0.07 0.003 60 / 0.68) 45%, oklch(0.06 0.003 60 / 0.94) 100%)",
        }}
      />
      <div className="absolute inset-0 grain" />
    </div>
  );
}
