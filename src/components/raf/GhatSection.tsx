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
          <h2 className="font-display text-5xl text-cream">रफीगंज के घाट</h2>
          <p className="mt-3 max-w-[24ch] font-hindi text-lg text-cream/80">
            जहाँ हर साल आस्था पानी में उतरती है।
          </p>
          <span className="glass mt-5 inline-block rounded-full px-4 py-2 text-sm text-cream/85">
            📍 Rafiganj, Bihar
          </span>
        </motion.div>
      </div>
    </section>
  );
}
