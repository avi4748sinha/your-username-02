import { motion } from "motion/react";
import { stages } from "@/data/rafiganj";
import { diff, useNow } from "@/lib/useCountdown";

function Cell({ v, label }: { v: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-display text-4xl tabular-nums text-cream">{String(v).padStart(2, "0")}</span>
      <span className="mt-1 font-ui text-[9px] uppercase tracking-[0.28em] text-cream/35">{label}</span>
    </div>
  );
}

export function Countdown() {
  const now = useNow();
  const next = now === null ? stages[0]! : (stages.find((s) => s.date.getTime() > now) ?? stages[stages.length - 1]!);
  const r = now === null ? null : diff(next.date, now);

  return (
    <section className="px-5 py-14">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-md rounded-2xl p-6 card-night"
      >
        <p className="font-ui text-[10px] uppercase tracking-[0.4em] text-tide">Next ritual</p>

        <h2 className="mt-3 font-display text-4xl text-cream">{next.name}</h2>

        <div className="mt-6 grid grid-cols-4 gap-2 rounded-xl border border-cream/10 bg-midnight/40 py-4">
          <Cell v={r?.d ?? 0} label="Days" />
          <Cell v={r?.h ?? 0} label="Hrs" />
          <Cell v={r?.m ?? 0} label="Min" />
          <Cell v={r?.s ?? 0} label="Sec" />
        </div>
      </motion.div>
    </section>
  );
}
