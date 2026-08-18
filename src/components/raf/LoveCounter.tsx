import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export function LoveCounter({ hearts, onLove }: { hearts: number; onLove: () => void }) {
  const [bursts, setBursts] = useState<number[]>([]);

  const tap = () => {
    onLove();
    if ("vibrate" in navigator) navigator.vibrate?.(18);
    const id = Date.now();
    setBursts((b) => [...b, id]);
    setTimeout(() => setBursts((b) => b.filter((x) => x !== id)), 1400);
  };

  return (
    <button
      onClick={tap}
      aria-label="रफीगंज के लिए प्यार भेजें"
      className="glass fixed bottom-[168px] right-4 z-40 grid h-14 w-14 place-items-center rounded-full text-2xl active:scale-95"
    >
      ❤️
      <span className="absolute -bottom-5 whitespace-nowrap text-[10px] tabular-nums text-cream/70">
        {hearts.toLocaleString("en-IN")}
      </span>
      <AnimatePresence>
        {bursts.map((b, i) => (
          <motion.span
            key={b}
            initial={{ opacity: 1, y: 0, scale: 0.7 }}
            animate={{ opacity: 0, y: -120 - (i % 3) * 20, scale: 1.5, x: ((i % 3) - 1) * 26 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3, ease: "easeOut" }}
            className="pointer-events-none absolute text-xl"
          >
            ❤️
          </motion.span>
        ))}
      </AnimatePresence>
    </button>
  );
}
