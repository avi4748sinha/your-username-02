import { useRef, useState } from "react";

export function MemoryCard() {
  const [img, setImg] = useState<string | null>(null);
  const [name, setName] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);

  const share = async () => {
    const text = `छठ पूजा 2026 · रफीगंज, बिहार ❤️ ${name ? `— ${name}` : ""}`;
    if (navigator.share) {
      await navigator.share({ title: "रफीगंज छठ पूजा 2026", text, url: window.location.href }).catch(() => {});
    } else {
      await navigator.clipboard.writeText(`${text} ${window.location.href}`).catch(() => {});
    }
  };

  return (
    <section id="memories" className="px-5 py-16">
      <h2 className="text-center font-display text-4xl text-cream sm:text-5xl">आपकी छठ की याद ❤️</h2>
      <p className="mt-2 text-center font-hindi text-sm text-cream/60">
        अपनी तस्वीर जोड़िए और अपना मेमोरी कार्ड बनाइए। तस्वीर आपके ही डिवाइस पर रहती है।
      </p>

      <div className="mx-auto mt-7 max-w-sm">
        <div
          ref={cardRef}
          className="relative aspect-[9/13] overflow-hidden rounded-3xl border border-gold/25 bg-gradient-to-b from-earth/40 to-midnight grain"
        >
          {img ? (
            <img src={img} alt="आपकी छठ की याद" className="h-full w-full object-cover" />
          ) : (
            <div className="grid h-full place-items-center px-8 text-center">
              <p className="font-hindi text-sm text-cream/55">यहाँ आपकी तस्वीर आएगी</p>
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-midnight via-midnight/80 to-transparent px-5 pb-6 pt-16 text-center">
            <p className="font-display text-3xl text-gold-gradient">छठ पूजा 2026</p>
            <p className="mt-0.5 text-xs tracking-[0.3em] text-cream/70">RAFIGANJ, BIHAR</p>
            {name && <p className="mt-2 font-hindi text-base text-cream">— {name}</p>}
            <p className="mt-2 font-hindi text-sm text-cream/75">यह पल हमेशा याद रहेगा। ❤️</p>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="आपका नाम"
            className="glass w-full rounded-2xl px-4 py-3 font-hindi text-sm text-cream outline-none placeholder:text-cream/40"
          />
          <div className="grid grid-cols-2 gap-3">
            <label className="glass cursor-pointer rounded-2xl px-4 py-3 text-center font-hindi text-sm text-cream">
              📸 फोटो चुनें
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) setImg(URL.createObjectURL(f));
                }}
              />
            </label>
            <button
              onClick={share}
              className="rounded-2xl bg-gradient-to-r from-sunset to-vermilion px-4 py-3 font-hindi text-sm text-cream"
            >
              ↗ शेयर करें
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
