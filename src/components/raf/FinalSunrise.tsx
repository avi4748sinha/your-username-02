import { motion } from "motion/react";
import { clips, GITHUB_URL, OWNER } from "@/data/rafiganj";
import { CinemaVideo } from "./CinemaVideo";

export function FinalSunrise() {
  return (
    <section className="relative min-h-[85svh] overflow-hidden grain vignette">
      <div className="absolute inset-0 cool">
        <CinemaVideo src={clips.sunriseTemple.video} poster={clips.sunriseTemple.poster} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-midnight/70 via-midnight/55 to-midnight" />

      <div className="relative flex min-h-[85svh] flex-col items-center justify-center px-8 pb-36 pt-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-display text-3xl leading-snug text-ice-gradient">
            Where faith walks into the river,
            <br />
            Rafiganj begins.
          </p>

          <div className="mx-auto mt-10 w-full max-w-xs rounded-2xl px-5 py-6 card-night">
            <p className="font-display text-3xl text-cream">Chhath Puja 2026</p>
            <p className="mt-1 font-ui text-[10px] uppercase tracking-[0.4em] text-cream/40">Rafiganj · Bihar</p>
            <p className="mt-4 font-hindi text-sm text-cream/45">जय छठी मैया</p>
          </div>
        </motion.div>

        <footer className="mt-10 font-ui text-xs uppercase tracking-[0.25em] text-cream/35">
          Managed by {OWNER} ·{" "}
          <a href={GITHUB_URL} target="_blank" rel="noreferrer noopener" className="text-tide hover:underline">
            GitHub
          </a>
        </footer>
      </div>
    </section>
  );
}
