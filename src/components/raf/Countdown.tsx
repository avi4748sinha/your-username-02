import { stages } from "@/data/rafiganj";
import { useCountdown } from "@/lib/useCountdown";

function Cell({ v, label }: { v: number; label: string }) {
  return (
    <div className="glass flex min-w-[70px] flex-col items-center rounded-2xl px-3 py-3">
      <span className="font-display text-3xl tabular-nums text-gold-gradient sm:text-4xl">
        {String(v).padStart(2, "0")}
      </span>
      <span className="mt-1 font-ui text-[10px] uppercase tracking-[0.2em] text-cream/50">{label}</span>
    </div>
  );
}

export function Countdown() {
  const start = stages[0]!.date;
  const r = useCountdown(start);

  return (
    <section className="relative overflow-hidden px-5 py-20">
      <div className="relative mx-auto max-w-xl text-center">
        <p className="font-ui text-[11px] uppercase tracking-[0.4em] text-gold/70">Countdown</p>
        <h2 className="mt-3 font-display text-4xl text-cream sm:text-5xl">Chhath begins in</h2>
        <div className="mt-7 flex justify-center gap-2.5">
          <Cell v={r?.d ?? 0} label="Days" />
          <Cell v={r?.h ?? 0} label="Hrs" />
          <Cell v={r?.m ?? 0} label="Min" />
          <Cell v={r?.s ?? 0} label="Sec" />
        </div>
        <p className="mt-5 font-ui text-sm text-cream/50">
          Nahay Khay · {stages[0]!.dateLabel} · Rafiganj, Bihar
        </p>
      </div>
    </section>
  );
}
