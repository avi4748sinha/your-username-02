import { motion } from "motion/react";
import { clips } from "@/data/rafiganj";
import { CinemaVideo } from "./CinemaVideo";
import { useAmbience } from "@/lib/ambience";

const line = {
  hidden: { opacity: 0, y: 16, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function Hero() {
  const { entered } = useAmbience();

  return (
    <section className="relative flex min-h-[100svh] w-full flex-col justify-end overflow-hidden pb-20">
      <motion.div
        className="absolute inset-0 cool"
        initial={{ opacity: 0, scale: 1.12 }}
        animate={{ opacity: entered ? 0.75 : 0, scale: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
      >
        <CinemaVideo src={clips.droneGhat.video} poster={clips.droneGhat.poster} eager />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-midnight/70 via-midnight/25 to-midnight" />

      <motion.div
        initial="hidden"
        animate={entered ? "show" : "hidden"}
        transition={{ staggerChildren: 0.22, delayChildren: 0.4 }}
        className="relative z-10 px-6"
      >
        <motion.p
          variants={line}
          transition={{ duration: 1 }}
          className="font-ui text-[10px] uppercase tracking-[0.5em] text-tide"
        >
          Rafiganj Ghat · Bihar
        </motion.p>

        <motion.h1
          variants={line}
          transition={{ duration: 1.1 }}
          className="mt-4 font-display text-[3.4rem] leading-[0.88] text-ice-gradient sm:text-7xl"
        >
          Chhath
          <br />
          Puja <span className="italic">2026</span>
        </motion.h1>

        <motion.div variants={line} transition={{ duration: 1 }} className="mt-6 flex items-center gap-4">
          <span className="h-px w-12 bg-cream/25" />
          <p className="font-ui text-sm text-cream/60">November 13 — 16, Rafiganj</p>
        </motion.div>
      </motion.div>

      <motion.span
        animate={{ y: [0, 8, 0], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2.6, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 font-ui text-[10px] tracking-[0.4em] text-cream/40"
      >
        SCROLL
      </motion.span>
    </section>
  );
}
