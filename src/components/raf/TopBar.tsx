import { motion } from "motion/react";
import { GITHUB_URL, OWNER } from "@/data/rafiganj";
import { useAmbience } from "@/lib/ambience";
import { useLiveViewers } from "@/lib/useLiveViewers";

export function TopBar() {
  const { entered } = useAmbience();
  const viewers = useLiveViewers();

  return (
    <motion.header
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: entered ? 1 : 0, y: entered ? 0 : -14 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="h-[2px] w-full rgb-line" />
      <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-tide breathe" />
          <span className="font-ui text-[10px] uppercase tracking-[0.3em] text-cream/60">
            Live · {viewers ?? "—"} online
          </span>
        </div>

        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer noopener"
          className="font-ui text-[10px] uppercase tracking-[0.3em] text-cream/45 transition-colors hover:text-cream"
        >
          {OWNER}
        </a>
      </div>
    </motion.header>
  );
}
