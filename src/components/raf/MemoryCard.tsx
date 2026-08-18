import { useState } from "react";

export function MemoryCard() {
  const [img, setImg] = useState<string | null>(null);
  const [name, setName] = useState("");

  const share = async () => {
    const text = `Chhath Puja 2026 · Rafiganj, Bihar${name ? ` — ${name}` : ""}`;
    if (navigator.share) {
      await navigator.share({ title: "Chhath Puja 2026 · Rafiganj", text, url: window.location.href }).catch(() => {});
    } else {
      await navigator.clipboard.writeText(`${text} ${window.location.href}`).catch(() => {});
    }
  };

  return (
    <section id="memories" className="px-5 py-20">
      <p className="text-center font-ui text-[11px] uppercase tracking-[0.4em] text-gold/70">Make yours</p>
      <h2 className="mt-3 text-center font-display text-4xl text-cream sm:text-5xl">Memory Card</h2>
      <p className="mt-2 text-center font-ui text-sm text-cream/55">
        Add a photo to build a shareable card. It never leaves your device.
      </p>

      <div className="mx-auto mt-8 max-w-sm">
        <div className="relative aspect-[9/13] overflow-hidden rounded-3xl border border-cream/10 bg-gradient-to-b from-earth/40 to-midnight grain">
          {img ? (
            <img src={img} alt="Your Chhath memory" className="h-full w-full object-cover" />
          ) : (
            <div className="grid h-full place-items-center px-8 text-center">
              <p className="font-ui text-sm text-cream/45">Your photo appears here</p>
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-midnight via-midnight/80 to-transparent px-5 pb-6 pt-16 text-center">
            <p className="font-display text-3xl text-gold-gradient">Chhath Puja 2026</p>
            <p className="mt-1 font-ui text-[10px] uppercase tracking-[0.35em] text-cream/60">Rafiganj, Bihar</p>
            {name && <p className="mt-2 font-ui text-sm text-cream">{name}</p>}
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="glass w-full rounded-2xl px-4 py-3 font-ui text-sm text-cream outline-none placeholder:text-cream/35"
          />
          <div className="grid grid-cols-2 gap-3">
            <label className="glass cursor-pointer rounded-2xl px-4 py-3 text-center font-ui text-sm text-cream">
              Choose photo
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
              className="rounded-2xl bg-gradient-to-r from-sunset to-vermilion px-4 py-3 font-ui text-sm text-cream"
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
