import { stages } from "@/data/rafiganj";
import { useNow } from "@/lib/useCountdown";

export function ChhathTimeline() {
  const now = useNow(30000);
  const activeIdx = now === null ? -1 : stages.findIndex((s) => s.date.getTime() > now);

  return (
    <section className="px-6 pb-16">
      <div className="mx-auto max-w-md">
        <p className="text-center font-ui text-[11px] uppercase tracking-[0.45em] text-gold/70">The Calendar</p>
        <h2 className="mt-2 text-center font-display text-4xl text-cream">Four Days</h2>
        <p className="mt-1 text-center font-ui text-sm italic text-cream/50">13 — 16 November 2026</p>

        <ol className="mt-6 border-t border-gold/15">
          {stages.map((s, i) => (
            <li
              key={s.id}
              className={`grid grid-cols-[auto_minmax(0,1fr)] gap-4 border-b border-gold/15 px-1 py-4 ${
                i === activeIdx ? "bg-gold/[0.06]" : ""
              }`}
            >
              <span className="pt-1 font-display text-sm tabular-nums text-gold/70">0{i + 1}</span>
              <div className="min-w-0">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="truncate font-display text-2xl text-cream">{s.name}</h3>
                  <span className="shrink-0 font-ui text-xs tracking-wide text-gold/70">{s.dateLabel}</span>
                </div>
                <p className="mt-1 font-ui text-[15px] italic leading-snug text-cream/60">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
