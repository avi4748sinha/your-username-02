import { useEffect, useState } from "react";

/**
 * Presence estimate for the header. Without a backend we cannot see other
 * browsers, so this models a small, slowly drifting audience and counts the
 * current visitor as one of them. It never jumps around wildly.
 */
export function useLiveViewers() {
  const [n, setN] = useState<number | null>(null);

  useEffect(() => {
    const base = 18 + Math.floor(Math.random() * 22);
    setN(base);
    const id = setInterval(() => {
      setN((p) => {
        const cur = p ?? base;
        const drift = Math.random() < 0.5 ? -1 : 1;
        return Math.min(96, Math.max(7, cur + drift * (Math.random() < 0.25 ? 2 : 1)));
      });
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return n;
}
