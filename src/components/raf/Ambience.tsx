import { useEffect, useMemo, useState } from "react";

function useLowPower() {
  const [low, setLow] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cores = navigator.hardwareConcurrency ?? 8;
    setLow(reduce || cores <= 4);
  }, []);
  return low;
}

/** Floating diya sparks / golden particles. Subtle, spiritual — not gamey. */
export function Diyas({ count = 14, className = "" }: { count?: number; className?: string }) {
  const low = useLowPower();
  const n = low ? Math.min(5, count) : count;
  const seeds = useMemo(
    () =>
      Array.from({ length: n }, (_, i) => ({
        left: (i * 97) % 100,
        delay: (i * 1.7) % 14,
        dur: 16 + ((i * 3) % 12),
        size: 3 + ((i * 5) % 6),
        dx: ((i % 5) - 2) * 18,
      })),
    [n],
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {seeds.map((s, i) => (
        <span
          key={i}
          className="absolute bottom-0 rounded-full"
          style={{
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            background: "radial-gradient(circle, var(--gold), transparent 70%)",
            boxShadow: "0 0 12px var(--sunset)",
            animation: `raf-float ${s.dur}s linear ${s.delay}s infinite`,
            ["--dx" as string]: `${s.dx}px`,
          }}
        />
      ))}
    </div>
  );
}

/** Soft water-ripple divider used between major chapters. */
export function RippleDivider() {
  return (
    <div className="relative h-24 w-full overflow-hidden" aria-hidden>
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/35"
          style={{ animation: `raf-ripple 5s ease-out ${i * 1.6}s infinite` }}
        />
      ))}
    </div>
  );
}
