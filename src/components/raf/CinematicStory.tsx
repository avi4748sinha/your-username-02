import { motion } from "motion/react";
import { story } from "@/data/rafiganj";
import { CinemaVideo } from "./CinemaVideo";
import { Diyas } from "./Ambience";

export function CinematicStory() {
  return (
    <section id="story" className="relative">
      {story.map((s, i) => (
        <div
          key={s.n}
          className="relative h-[100svh] w-full snap-start overflow-hidden bg-midnight grain vignette"
        >
          <CinemaVideo src={s.clip.video} poster={s.clip.poster} />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/25 to-midnight/70" />
          {i >= 4 && <Diyas count={10} />}

          <div className="absolute inset-x-0 top-6 flex justify-center gap-1.5 px-6">
            {story.map((_, j) => (
              <span
                key={j}
                className={`h-[3px] flex-1 rounded-full ${j <= i ? "bg-gold" : "bg-cream/20"}`}
              />
            ))}
          </div>

          <div className="absolute inset-x-0 bottom-0 px-6 pb-28">
            <motion.div
              initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="font-ui text-xs tracking-[0.45em] text-gold/85">SCENE {s.n}</span>
              <h3 className="mt-3 max-w-[16ch] font-display text-[2.6rem] leading-[1.1] text-cream drop-shadow-[0_4px_22px_rgba(0,0,0,0.75)] sm:text-6xl">
                {s.title}
              </h3>
              <p className="mt-3 max-w-[26ch] font-hindi text-base text-cream/75">{s.sub}</p>
            </motion.div>
          </div>
        </div>
      ))}
    </section>
  );
}
