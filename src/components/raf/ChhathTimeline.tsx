import { motion } from "motion/react";
import { stages } from "@/data/rafiganj";
import { useNow } from "@/lib/useCountdown";

export function ChhathTimeline() {
  const now = useNow(30000);
  const activeIdx = now === null ? -1 : stages.findIndex((s) => s.date.getTime() > now);

  return (
    <section id="chhath" className="relative px-5 py-16">
      <h2 className="text-center font-display text-4xl text-cream sm:text-5xl">छठ की यात्रा</h2>
      <p className="mt-2 text-center font-hindi text-sm text-cream/60">चार दिन, एक आस्था — 13 से 16 नवम्बर 2026</p>

      <ol className="relative mx-auto mt-9 max-w-xl">
        <span className="absolute left-[26px] top-2 bottom-2 w-px bg-gradient-to-b from-gold/60 via-sunset/40 to-transparent" />
        {stages.map((s, i) => {
          const upcoming = i === activeIdx;
          return (
            <motion.li
              key={s.id}
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: i * 0.05 }}
              className="relative mb-4 pl-16"
            >
              <span
                className={`absolute left-0 top-1 grid h-[52px] w-[52px] place-items-center rounded-2xl text-xl ${
                  upcoming ? "bg-gold text-midnight" : "glass"
                }`}
              >
                {s.icon}
              </span>
              <div
                className={`relative overflow-hidden rounded-2xl px-4 py-3 ${
                  upcoming ? "border border-gold/50 bg-gold/10" : "glass"
                }`}
              >
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
                  <h3 className="min-w-0 truncate font-display text-2xl text-cream">{s.name}</h3>
                  {upcoming && (
                    <span className="shrink-0 rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-midnight">
                      अगला
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs tracking-wide text-gold/85">{s.dateLabel}</p>
                <p className="mt-1.5 font-hindi text-sm leading-relaxed text-cream/70">{s.desc}</p>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </section>
  );
}
