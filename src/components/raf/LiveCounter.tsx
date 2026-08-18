import { useEffect, useState } from "react";

function useDrift(base: number, spread: number) {
  const [v, setV] = useState(base);
  useEffect(() => {
    const id = setInterval(() => {
      setV((p) => Math.max(base - spread, p + Math.round((Math.random() - 0.42) * spread * 0.12)));
    }, 2600);
    return () => clearInterval(id);
  }, [base, spread]);
  return v;
}

export function LiveCounter({ hearts }: { hearts: number }) {
  const listening = useDrift(24600, 900);

  return (
    <section className="px-5">
      <div className="glass mx-auto flex max-w-xl flex-col gap-3 rounded-3xl px-4 py-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cream/85">Live from Rafiganj</span>
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <p className="min-w-0 font-hindi text-base text-cream">
            <span className="tabular-nums text-gold">{listening.toLocaleString("en-IN")}</span> लोग अभी इस अनुभव में हैं
          </p>
          <p className="shrink-0 font-hindi text-sm text-cream/85">
            ❤️ <span className="tabular-nums text-gold">{hearts.toLocaleString("en-IN")}</span>
          </p>
        </div>
        <p className="text-[10px] leading-relaxed text-cream/45">
          नोट: ये काउंटर इस पेज पर चलने वाले डेमो/एनिमेटेड आँकड़े हैं — असली ग्लोबल यूज़र डेटा नहीं। आपका ❤️ आपके ही
          डिवाइस पर सेव होता है।
        </p>
      </div>
    </section>
  );
}
