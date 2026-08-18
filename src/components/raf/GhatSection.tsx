import { motion } from "motion/react";
import { clips } from "@/data/rafiganj";
import { CinemaVideo } from "./CinemaVideo";

export function GhatSection() {
  return (
    <section className="relative h-[92svh] overflow-hidden grain vignette">
      <CinemaVideo src={clips.droneWater.video} poster={clips.droneWater.poster} />
      <div className="absolute inset-0 bg-gradient-to-b from-midnight/70 via-transparent to-midnight" />
      <div className="absolute inset-x-0 bottom-0 px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1 }}
        >
          <p className="font-ui text-[11px] uppercase tracking-[0.4em] text-gold/70">The location</p>
          <h2 className="mt-3 font-display text-5xl text-cream">Rafiganj Ghat</h2>
          <p className="mt-3 max-w-[30ch] font-ui text-base leading-relaxed text-cream/70">
            Every November the steps disappear under people, and faith walks into the water.
          </p>
          <span className="glass mt-5 inline-block rounded-full px-4 py-2 font-ui text-xs tracking-[0.2em] text-cream/85">
            24.8151° N, 84.6394° E
          </span>
        </motion.div>
      </div>
    </section>
  );
}
