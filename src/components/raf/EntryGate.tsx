import { AnimatePresence, motion } from "motion/react";
import { useAmbience } from "@/lib/ambience";

/**
 * Dark opening screen. One tap unlocks the ambient footage + sound and reveals
 * the experience — the moment the whole page comes alive.
 */
export function EntryGate() {
  const { entered, enter } = useAmbience();

  return (
    <AnimatePresence>
      {!entered && (
        <motion.div
          key="gate"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(14px)" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[70] grid place-items-center bg-midnight px-8 grain"
        >
          <div className="text-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.6, ease: "easeOut" }}
              className="mx-auto block h-3 w-3 rounded-full breathe"
              style={{ background: "var(--gold)", boxShadow: "0 0 40px 10px color-mix(in oklab, var(--sunset) 55%, transparent)" }}
            />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="mt-10 font-ui text-[10px] uppercase tracking-[0.5em] text-cream/45"
            >
              Rafiganj · Bihar
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.9, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 font-display text-5xl leading-[0.95] text-ice-gradient sm:text-6xl"
            >
              Chhath
              <br />
              Puja 2026
            </motion.h1>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.9 }}
              onClick={enter}
              className="group mt-12 inline-flex items-center gap-3 rounded-full border border-cream/15 px-7 py-3 font-ui text-[11px] uppercase tracking-[0.35em] text-cream/85 transition-colors hover:border-tide/60 sheen"
            >
              Enter the night
              <span className="text-tide transition-transform group-hover:translate-x-1">→</span>
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.9 }}
              className="mt-5 font-ui text-[11px] text-cream/30"
            >
              Best with headphones
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
