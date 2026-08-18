import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster: string;
  className?: string;
  kenBurns?: boolean;
  eager?: boolean;
};

/**
 * Lazy, viewport-aware video. Loads the source only when near the viewport and
 * plays only while visible — never more than the on-screen clip at a time.
 */
export function CinemaVideo({ src, poster, className = "", kenBurns = true, eager = false }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(eager);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setLoad(true);
            void el.play().catch(() => {});
          } else {
            el.pause();
          }
        }
      },
      { rootMargin: "160px", threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      poster={poster}
      {...(load ? { src } : {})}
      muted
      loop
      playsInline
      preload="none"
      disablePictureInPicture
      className={`h-full w-full object-cover ${kenBurns ? "ken-burns" : ""} ${className}`}
    />
  );
}
