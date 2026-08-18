import { motion } from "motion/react";
import { stages } from "@/data/rafiganj";
import { useNow } from "@/lib/useCountdown";

export function ChhathTimeline() {
  const now = useNow(30000);
  const activeIdx = now === null ? -1 : stages.findIndex((s) => s.date.getTime() > now);

  return (
    <section id="chhath" className="relative px-5 py-20">
      <p className="text-center font-ui text-[11px] uppercase tracking-[0.4em] text-gold/70">Four Days</p>
      <h2 className="mt-3 text-center font-display text-4xl text-cream sm:text-5xl">The Chhath Journey</h2>
      <p className="mt-2 text-center font-ui text-sm text-cream/55">13 — 16 November 2026 · Rafiganj, Bihar</p>

      <ol className="relative mx-auto mt-10 max-w-xl">
        <span className="absolute left-[18px] top-2 bottom-2 w-px bg-gradient-to-b from-gold/50 via-sunset/30 to-transparent" />
        {stages.map((s, i) => {
          const upcoming = i === activeIdx;
          return (
            <motion.li
              key={s.id}
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: i * 0.05 }}
              className="relative mb-4 pl-12"
            >
              <span
                className={`absolute left-[11px] top-4 h-[15px] w-[15px] rounded-full border-2 ${
                  upcoming ? "border-gold bg-gold" : "border-cream/30 bg-midnight"
                }`}
              />
              <div
                className={`relative overflow-hidden rounded-2xl px-4 py-3.5 ${
                  upcoming ? "border border-gold/40 bg-gold/[0.07]" : "glass"
                }`}
              >
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-2">
                  <h3 className="min-w-0 truncate font-display text-2xl text-cream">
                    {s.name} <span className="font-hindi text-base text-cream/45">{s.native}</span>
                  </h3>
                  {upcoming && (
                    <span className="shrink-0 rounded-full bg-gold px-2 py-0.5 font-ui text-[9px] font-semibold uppercase tracking-[0.2em] text-midnight">
                      Next
                    </span>
                  )}
                </div>
                <p className="mt-0.5 font-ui text-xs tracking-wide text-gold/80">{s.dateLabel}</p>
                <p className="mt-1.5 font-ui text-sm leading-relaxed text-cream/65">{s.desc}</p>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </section>
  );
}
