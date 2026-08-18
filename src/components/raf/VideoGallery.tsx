import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { clipList, galleryCategories, type Clip } from "@/data/rafiganj";
import { CinemaVideo } from "./CinemaVideo";

export function VideoGallery() {
  const [cat, setCat] = useState("all");
  const [open, setOpen] = useState<number | null>(null);
  const items = cat === "all" ? clipList : clipList.filter((c) => c.category === cat);

  const go = (dir: number) => {
    setOpen((p) => {
      if (p === null) return p;
      const n = p + dir;
      return n < 0 || n >= items.length ? p : n;
    });
  };

  return (
    <section id="rafiganj" className="relative px-5 py-20">
      <p className="text-center font-ui text-[11px] uppercase tracking-[0.4em] text-gold/70">Archive</p>
      <h2 className="mt-3 text-center font-display text-4xl text-cream sm:text-5xl">Our Rafiganj</h2>
      <p className="mt-2 text-center font-ui text-sm text-cream/55">
        Shot at the ghat. No stock footage.
      </p>

      <div className="mt-7 -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none]">
        {galleryCategories.map((c) => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            className={`shrink-0 rounded-full px-4 py-2 font-ui text-xs tracking-wide transition-colors ${
              cat === c.id ? "bg-gold text-midnight" : "glass text-cream/75"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {items.map((c, i) => (
          <button
            key={c.id}
            onClick={() => setOpen(i)}
            className="group relative aspect-[9/16] overflow-hidden rounded-2xl border border-cream/10 grain"
          >
            <img src={c.poster} alt={c.label} loading="lazy" className="h-full w-full object-cover" />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-midnight to-transparent px-2.5 pb-2.5 pt-10 text-left font-ui text-[11px] tracking-wide text-cream">
              {c.label}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && items[open] && (
          <Viewer clip={items[open]!} onClose={() => setOpen(null)} onNav={go} />
        )}
      </AnimatePresence>
    </section>
  );
}

function Viewer({ clip, onClose, onNav }: { clip: Clip; onClose: () => void; onNav: (d: number) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-midnight/98"
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      onDragEnd={(_, info) => {
        if (info.offset.y > 90) onClose();
        else if (info.offset.y < -90) onNav(1);
      }}
    >
      <div className="relative h-full w-full max-w-[500px] grain vignette">
        <CinemaVideo src={clip.video} poster={clip.poster} eager kenBurns={false} />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-midnight to-transparent px-6 pb-10 pt-16">
          <p className="font-display text-3xl text-cream">{clip.label}</p>
          <p className="mt-1 font-ui text-xs tracking-[0.2em] text-cream/50">RAFIGANJ, BIHAR</p>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          className="glass absolute right-4 top-5 grid h-11 w-11 place-items-center rounded-full text-cream"
        >
          ✕
        </button>
        <div className="absolute inset-y-0 left-0 w-1/4" onClick={() => onNav(-1)} />
        <div className="absolute inset-y-0 right-0 w-1/4" onClick={() => onNav(1)} />
      </div>
    </motion.div>
  );
}
