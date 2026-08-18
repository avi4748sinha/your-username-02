import { motion } from "motion/react";
import { clips } from "@/data/rafiganj";
import { CinemaVideo } from "./CinemaVideo";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-midnight grain vignette">
      <motion.div
        className="absolute inset-0 vintage"
        initial={{ opacity: 0, filter: "blur(14px)" }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 2.6, ease: "easeOut" }}
      >
        <CinemaVideo src={clips.droneGhat.video} poster={clips.droneGhat.poster} eager />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-midnight/80 via-midnight/40 to-midnight" />

      <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-ui text-[11px] uppercase tracking-[0.55em] text-gold/70">Est. Rafiganj · Bihar</p>

          <div className="mx-auto mt-6 w-full max-w-sm border-y border-gold/25 py-6">
            <h1 className="font-display text-5xl leading-none text-cream sm:text-7xl">Chhath Puja</h1>
            <p className="mt-2 font-display text-6xl leading-none text-gold-gradient sm:text-8xl">2026</p>
          </div>

          <p className="mt-6 font-ui text-lg italic text-cream/70">Four days. One river bend.</p>
          <p className="mt-1 font-hindi text-base text-cream/45">जय छठी मैया</p>
        </motion.div>

        <motion.span
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2.4, repeat: Infinity }}
          className="absolute bottom-24 text-cream/40"
        >
          ↓
        </motion.span>
      </div>
    </section>
  );
}
