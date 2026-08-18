import { motion } from "motion/react";
import { clips } from "@/data/rafiganj";
import { CinemaVideo } from "./CinemaVideo";
import { Diyas } from "./Ambience";

const lines = ["Cities changed.", "People moved away.", "Chhath didn't.", "It still calls everyone home."];

export function EmotionSection() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden grain vignette">
      <CinemaVideo src={clips.templeCrowd.video} poster={clips.templeCrowd.poster} />
      <div className="absolute inset-0 bg-midnight/75" />
      <Diyas count={10} />
      <div className="relative flex min-h-[100svh] flex-col justify-center px-7 py-24">
        <p className="font-ui text-[11px] uppercase tracking-[0.4em] text-gold/70">Why it stays</p>
        <div className="mt-8 space-y-6">
          {lines.map((l, i) => (
            <motion.p
              key={l}
              initial={{ opacity: 0, y: 26, filter: "blur(12px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1.1, delay: i * 0.8, ease: [0.22, 1, 0.36, 1] }}
              className={`font-display leading-snug ${
                i === lines.length - 1 ? "text-gold-gradient text-4xl sm:text-5xl" : "text-cream text-4xl sm:text-5xl"
              }`}
            >
              {l}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
