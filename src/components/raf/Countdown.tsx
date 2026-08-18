import { stages } from "@/data/rafiganj";
import { diff, useNow } from "@/lib/useCountdown";

function Cell({ v, label }: { v: number; label: string }) {
  return (
    <div className="flex flex-col items-center border-r border-gold/15 px-2 last:border-r-0">
      <span className="font-display text-3xl tabular-nums text-cream sm:text-4xl">
        {String(v).padStart(2, "0")}
      </span>
      <span className="mt-1 font-ui text-[10px] uppercase tracking-[0.28em] text-gold/60">{label}</span>
    </div>
  );
}

export function Countdown() {
  const now = useNow();
  const next = now === null ? stages[0]! : (stages.find((s) => s.date.getTime() > now) ?? stages[stages.length - 1]!);
  const r = now === null ? null : diff(next.date, now);

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-md border border-gold/20 bg-midnight/40 p-6 text-center grain">
        <p className="font-ui text-[11px] uppercase tracking-[0.45em] text-gold/70">Next ritual</p>
        <h2 className="mt-3 font-display text-4xl text-cream">{next.name}</h2>
        <p className="mt-1 font-ui text-sm italic text-cream/55">
          {next.dateLabel} ·{" "}
          {next.date.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "Asia/Kolkata",
          })}{" "}
          IST
        </p>
        <div className="mt-6 grid grid-cols-4 border-y border-gold/15 py-4">
          <Cell v={r?.d ?? 0} label="Days" />
          <Cell v={r?.h ?? 0} label="Hrs" />
          <Cell v={r?.m ?? 0} label="Min" />
          <Cell v={r?.s ?? 0} label="Sec" />
        </div>
      </div>
    </section>
  );
}
