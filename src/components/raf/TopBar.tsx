import { motion } from "motion/react";
import { GITHUB_URL, OWNER } from "@/data/rafiganj";
import { useAmbience } from "@/lib/ambience";

export function TopBar() {
  const { entered, soundOn, toggleSound } = useAmbience();

  return (
    <motion.header
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: entered ? 1 : 0, y: entered ? 0 : -14 }}
      transition={{ delay: 0.6, duration: 0.9 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3">
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer noopener"
          className="flex items-center gap-2 rounded-full border border-cream/10 bg-midnight/50 px-3 py-1.5 backdrop-blur-xl"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-tide breathe" />
          <span className="font-ui text-[10px] uppercase tracking-[0.28em] text-cream/70">
            Managed by {OWNER}
          </span>
        </a>

        <button
          onClick={toggleSound}
          aria-label={soundOn ? "Mute ambience" : "Unmute ambience"}
          className="grid h-9 w-9 place-items-center rounded-full border border-cream/10 bg-midnight/50 text-cream/70 backdrop-blur-xl"
        >
          <span className="text-[13px]">{soundOn ? "◉" : "○"}</span>
        </button>
      </div>
    </motion.header>
  );
}
