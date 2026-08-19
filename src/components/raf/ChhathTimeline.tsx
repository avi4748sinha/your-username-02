import { motion } from "motion/react";
import { stages } from "@/data/rafiganj";
import { useNow } from "@/lib/useCountdown";

export function ChhathTimeline() {
  const now = useNow(30000);
  const activeIdx = now === null ? -1 : stages.findIndex((s) => s.date.getTime() > now);

  return (
    <section className="px-5 pb-14">
      <div className="mx-auto max-w-md">
        <p className="font-ui text-[10px] uppercase tracking-[0.4em] text-tide">The Calendar</p>
        <h2 className="mt-1 font-display text-3xl text-cream">13 — 16 November</h2>

        <ol className="relative mt-6 pl-6">
          <span className="absolute bottom-2 left-[5px] top-2 w-px bg-gradient-to-b from-tide/50 via-cream/12 to-transparent" />
          {stages.map((s, i) => {
            const active = i === activeIdx;
            return (
              <motion.li
                key={s.id}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className="relative pb-6 last:pb-0"
              >
                <span
                  className={`absolute -left-6 top-2 h-[11px] w-[11px] rounded-full border ${
                    active ? "border-tide bg-tide breathe" : "border-cream/25 bg-midnight"
                  }`}
                />
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className={`font-display text-2xl ${active ? "text-cream" : "text-cream/75"}`}>{s.name}</h3>
                  <span className="shrink-0 font-ui text-[10px] uppercase tracking-[0.18em] text-cream/35">
                    {s.dateLabel}
                  </span>
                </div>
                <p className="mt-1 font-ui text-sm leading-snug text-cream/45">{s.desc}</p>
                {active && (
                  <span className="mt-2 inline-block rounded-full border border-tide/40 px-2 py-0.5 font-ui text-[9px] uppercase tracking-[0.25em] text-tide">
                    Up next
                  </span>
                )}
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
