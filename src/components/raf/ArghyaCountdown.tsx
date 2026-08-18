import { stages } from "@/data/rafiganj";
import { diff, useNow } from "@/lib/useCountdown";

export function ArghyaCountdown() {
  const now = useNow();
  const arghyas = stages.filter((s) => s.id === "sandhya" || s.id === "pratah" || s.id === "paran");
  const next = now === null ? arghyas[0]! : (arghyas.find((s) => s.date.getTime() > now) ?? arghyas[arghyas.length - 1]!);
  const r = now === null ? null : diff(next.date, now);

  return (
    <section className="px-5 py-10">
      <div className="glass relative mx-auto max-w-xl overflow-hidden rounded-3xl p-5">
        <div
          className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full opacity-40 blur-2xl"
          style={{ background: "radial-gradient(circle, var(--sunset), transparent 70%)" }}
        />
        <p className="text-[11px] uppercase tracking-[0.35em] text-gold/80">☀️ अगला अर्घ्य</p>
        <h3 className="mt-2 font-display text-4xl text-cream">{next.name}</h3>
        <p className="mt-1 font-hindi text-sm text-cream/65">
          {next.dateLabel} · {next.date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" })} IST
        </p>
        <div className="mt-5 grid grid-cols-4 gap-2">
          {[
            { v: r?.d ?? 0, l: "दिन" },
            { v: r?.h ?? 0, l: "घंटे" },
            { v: r?.m ?? 0, l: "मिनट" },
            { v: r?.s ?? 0, l: "सेकंड" },
          ].map((c) => (
            <div key={c.l} className="rounded-2xl bg-midnight/60 py-3 text-center">
              <div className="font-display text-2xl tabular-nums text-gold-gradient">
                {String(c.v).padStart(2, "0")}
              </div>
              <div className="text-[10px] tracking-widest text-cream/55">{c.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
