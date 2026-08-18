import { motion } from "motion/react";
import { clips, GITHUB_URL } from "@/data/rafiganj";
import { CinemaVideo } from "./CinemaVideo";
import { Diyas } from "./Ambience";

const lines = ["Where faith walks into the river,", "Rafiganj begins its story."];

export function FinalSunrise() {
  return (
    <section id="about" className="relative min-h-[100svh] overflow-hidden grain vignette">
      <CinemaVideo src={clips.sunriseTemple.video} poster={clips.sunriseTemple.poster} />
      <div className="absolute inset-0 bg-gradient-to-b from-midnight/55 via-midnight/60 to-midnight" />
      <Diyas count={12} />

      <div className="relative flex min-h-[100svh] flex-col items-center justify-center px-7 pb-44 pt-24 text-center">
        {lines.map((l, i) => (
          <motion.p
            key={l}
            initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.2, delay: i * 0.8 }}
            className="mb-3 font-display text-3xl leading-snug text-cream sm:text-4xl"
          >
            {l}
          </motion.p>
        ))}

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 1 }}
          className="mt-10"
        >
          <p className="font-display text-5xl text-gold-gradient">Chhath Puja 2026</p>
          <p className="mt-2 font-ui text-xs uppercase tracking-[0.4em] text-cream/60">Rafiganj · Bihar</p>
          <p className="mt-6 font-hindi text-lg text-cream/70">जय छठी मैया</p>
        </motion.div>

        <footer className="mt-16 flex flex-col items-center gap-3">
          <p className="font-ui text-xs tracking-wide text-cream/45">Built by Avinash</p>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="glass rounded-full px-5 py-2.5 font-ui text-xs tracking-[0.2em] text-cream"
          >
            GITHUB ↗
          </a>
        </footer>
      </div>
    </section>
  );
}
