import { motion } from "motion/react";
import { clips, GITHUB_URL } from "@/data/rafiganj";
import { CinemaVideo } from "./CinemaVideo";

export function FinalSunrise() {
  return (
    <section className="relative min-h-[80svh] overflow-hidden grain vignette">
      <div className="absolute inset-0 vintage">
        <CinemaVideo src={clips.sunriseTemple.video} poster={clips.sunriseTemple.poster} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-midnight/60 via-midnight/65 to-midnight" />

      <div className="relative flex min-h-[80svh] flex-col items-center justify-center px-8 pb-32 pt-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2 }}
        >
          <p className="font-ui text-xl italic leading-snug text-cream/80">
            Where faith walks into the river,
            <br />
            Rafiganj begins its story.
          </p>
          <div className="mx-auto mt-8 w-full max-w-xs border-y border-gold/25 py-5">
            <p className="font-display text-4xl text-gold-gradient">Chhath Puja 2026</p>
            <p className="mt-1.5 font-ui text-[11px] uppercase tracking-[0.45em] text-cream/55">Rafiganj · Bihar</p>
          </div>
          <p className="mt-6 font-hindi text-base text-cream/50">जय छठी मैया</p>
        </motion.div>

        <footer className="mt-12 font-ui text-sm text-cream/45">
          Built by Avinash ·{" "}
          <a href={GITHUB_URL} target="_blank" rel="noreferrer noopener" className="text-gold/80 underline-offset-4 hover:underline">
            GitHub
          </a>
        </footer>
      </div>
    </section>
  );
}
