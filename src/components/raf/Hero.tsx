import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { clips } from "@/data/rafiganj";
import { CinemaVideo } from "./CinemaVideo";
import { Diyas } from "./Ambience";

const beats = [
  { t: 2600, node: <span className="font-display text-6xl leading-none sm:text-8xl">रफीगंज…</span> },
  {
    t: 2600,
    node: (
      <span className="font-display text-5xl leading-tight sm:text-7xl">
        छठ पूजा <span className="text-gold-gradient">2026</span>
      </span>
    ),
  },
  { t: 2400, node: <span className="font-hindi text-3xl sm:text-4xl">कुछ त्योहार मनाए नहीं जाते…</span> },
  { t: 2400, node: <span className="font-hindi text-3xl sm:text-4xl">महसूस किए जाते हैं। ❤️</span> },
  { t: 3000, node: <span className="font-display text-4xl sm:text-6xl">जय छठी मैया 🙏</span> },
];

export function Hero() {
  const [i, setI] = useState(-1);
  const [videoIn, setVideoIn] = useState(false);

  useEffect(() => {
    const timers: number[] = [];
    let acc = 1400;
    timers.push(window.setTimeout(() => setVideoIn(true), 2200));
    beats.forEach((b, idx) => {
      timers.push(window.setTimeout(() => setI(idx), acc));
      acc += b.t;
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section id="home" className="relative min-h-[100svh] w-full overflow-hidden bg-midnight grain vignette">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, filter: "blur(18px)" }}
        animate={{ opacity: videoIn ? 0.72 : 0, filter: videoIn ? "blur(0px)" : "blur(18px)" }}
        transition={{ duration: 3.2, ease: "easeOut" }}
      >
        <CinemaVideo src={clips.droneGhat.video} poster={clips.droneGhat.poster} eager />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-midnight/85 via-midnight/35 to-midnight" />

      {/* the first diya */}
      <motion.div
        className="absolute left-1/2 top-[26%] -translate-x-1/2"
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.4, ease: "easeOut" }}
      >
        <div
          className="h-5 w-5 rounded-full"
          style={{
            background: "radial-gradient(circle at 50% 40%, var(--cream), var(--gold) 45%, var(--vermilion) 90%)",
            boxShadow: "0 0 42px 10px color-mix(in oklab, var(--sunset) 55%, transparent)",
            animation: "raf-flicker 2.6s ease-in-out infinite",
          }}
        />
      </motion.div>

      <Diyas count={16} />

      <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
        <div className="flex min-h-[42vh] items-center justify-center">
          <AnimatePresence mode="wait">
            {i >= 0 && (
              <motion.h1
                key={i}
                initial={{ opacity: 0, y: 26, filter: "blur(14px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -18, filter: "blur(10px)" }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-[18ch] text-cream drop-shadow-[0_6px_28px_rgba(0,0,0,0.7)]"
              >
                {beats[i]!.node}
              </motion.h1>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 12, duration: 1.4 }}
          className="absolute bottom-28 flex flex-col items-center gap-2"
        >
          <span className="font-hindi text-sm text-cream/70">जहाँ आस्था सिर्फ दिखाई नहीं देती… महसूस होती है।</span>
          <span className="text-[11px] uppercase tracking-[0.35em] text-gold/80">Rafiganj, Bihar 🇮🇳</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.2, repeat: Infinity }}
            className="mt-1 text-gold"
          >
            ↓
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
