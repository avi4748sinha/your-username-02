import { motion } from "motion/react";
import { clips } from "@/data/rafiganj";
import { CinemaVideo } from "./CinemaVideo";
import { Diyas } from "./Ambience";

const lines = ["शहर बदल गए…", "लोग दूर चले गए…", "लेकिन छठ…", "आज भी हमें घर बुला लेता है।"];

export function EmotionSection() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden grain vignette">
      <CinemaVideo src={clips.templeCrowd.video} poster={clips.templeCrowd.poster} />
      <div className="absolute inset-0 bg-midnight/72" />
      <Diyas count={12} />
      <div className="relative flex min-h-[100svh] flex-col justify-center px-7 py-24">
        <h2 className="font-display text-3xl text-gold-gradient">रफीगंज की छठ — कुछ अलग है ❤️</h2>
        <div className="mt-8 space-y-6">
          {lines.map((l, i) => (
            <motion.p
              key={l}
              initial={{ opacity: 0, y: 26, filter: "blur(12px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1.1, delay: i * 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-4xl leading-snug text-cream sm:text-5xl"
            >
              {l}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
