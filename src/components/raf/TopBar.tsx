import { motion } from "motion/react";
import { GITHUB_URL, OWNER, stages } from "@/data/rafiganj";
import { useAmbience } from "@/lib/ambience";
import { diff, useNow } from "@/lib/useCountdown";

export function TopBar() {
  const { entered, soundOn, toggleSound } = useAmbience();
  const now = useNow();
  const next = now === null ? stages[0]! : (stages.find((s) => s.date.getTime() > now) ?? stages[stages.length - 1]!);
  const r = now === null ? null : diff(next.date, now);
  const live =
    r === null
      ? "--:--:--"
      : `${r.d}d ${String(r.h).padStart(2, "0")}:${String(r.m).padStart(2, "0")}:${String(r.s).padStart(2, "0")}`;

  return (
    <motion.header
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: entered ? 1 : 0, y: entered ? 0 : -14 }}
      transition={{ delay: 0.6, duration: 0.9 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto flex max-w-md items-center gap-2 px-3 py-3">
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer noopener"
          className="flex shrink-0 items-center gap-2 rounded-full border border-cream/10 bg-midnight/50 px-3 py-1.5 backdrop-blur-xl"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-tide breathe" />
          <span className="font-ui text-[10px] uppercase tracking-[0.24em] text-cream/70">{OWNER}</span>
        </a>

        <div className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-full border border-cream/10 bg-midnight/50 px-3 py-1.5 backdrop-blur-xl">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sunset breathe" />
          <span className="truncate font-ui text-[10px] tabular-nums tracking-[0.14em] text-cream/75">{live}</span>
        </div>

        <button
          onClick={toggleSound}
          aria-label={soundOn ? "Mute ambience" : "Unmute ambience"}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-cream/10 bg-midnight/50 text-cream/70 backdrop-blur-xl"
        >
          <span className="text-[13px]">{soundOn ? "◉" : "○"}</span>
        </button>
      </div>
    </motion.header>
  );
}
