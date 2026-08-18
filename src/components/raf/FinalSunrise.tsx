import { motion } from "motion/react";
import { clips, GITHUB_URL } from "@/data/rafiganj";
import { CinemaVideo } from "./CinemaVideo";
import { Diyas } from "./Ambience";

const lines = [
  "जहाँ आस्था नदी में उतरती है…",
  "वहीं रफीगंज की कहानी शुरू होती है। ❤️",
  "जय छठी मैया 🙏",
  "जय सूर्य देव ☀️",
];

export function FinalSunrise() {
  return (
    <section id="about" className="relative min-h-[100svh] overflow-hidden grain vignette">
      <CinemaVideo src={clips.sunriseTemple.video} poster={clips.sunriseTemple.poster} />
      <div className="absolute inset-0 bg-gradient-to-b from-midnight/55 via-midnight/60 to-midnight" />
      <Diyas count={16} />

      <div className="relative flex min-h-[100svh] flex-col items-center justify-center px-7 pb-40 pt-24 text-center">
        {lines.map((l, i) => (
          <motion.p
            key={l}
            initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.2, delay: i * 0.85 }}
            className={`mb-5 font-display leading-snug text-cream ${i < 2 ? "text-3xl sm:text-4xl" : "text-2xl text-gold-gradient"}`}
          >
            {l}
          </motion.p>
        ))}

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 1.2 }}
          className="mt-8"
        >
          <p className="font-display text-5xl text-gold-gradient">छठ पूजा 2026</p>
          <p className="mt-1 font-hindi text-lg text-cream/80">रफीगंज, बिहार</p>
        </motion.div>

        <footer className="mt-14 flex flex-col items-center gap-3">
          <p className="font-hindi text-sm text-cream/60">Made with ❤️ by Avinash</p>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="glass rounded-full px-5 py-2.5 text-sm text-cream"
          >
            GitHub →
          </a>
        </footer>
      </div>
    </section>
  );
}
