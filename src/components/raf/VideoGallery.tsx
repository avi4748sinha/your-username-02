import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { clipList, type Clip } from "@/data/rafiganj";
import { CinemaVideo } from "./CinemaVideo";

export function VideoGallery() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="px-6 pb-16">
      <div className="mx-auto max-w-md">
        <p className="text-center font-ui text-[11px] uppercase tracking-[0.45em] text-gold/70">The Archive</p>
        <h2 className="mt-2 text-center font-display text-4xl text-cream">Our Rafiganj</h2>
        <p className="mt-1 text-center font-ui text-sm italic text-cream/50">Shot at the ghat. No stock footage.</p>

        <div className="mt-6 grid grid-cols-3 gap-2">
          {clipList.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setOpen(i)}
              className="relative aspect-[3/4] overflow-hidden frame grain vintage"
            >
              <img src={c.poster} alt={c.label} loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && clipList[open] && (
          <Viewer
            clip={clipList[open]!}
            onClose={() => setOpen(null)}
            onNav={(d) => setOpen((p) => (p === null ? p : (p + d + clipList.length) % clipList.length))}
          />
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
        if (Math.abs(info.offset.y) > 90) onClose();
      }}
    >
      <div className="relative h-full w-full max-w-[500px] grain vignette vintage">
        <CinemaVideo src={clip.video} poster={clip.poster} eager kenBurns={false} />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-midnight to-transparent px-6 pb-12 pt-16">
          <p className="font-display text-3xl text-cream">{clip.label}</p>
          <p className="mt-1 font-ui text-xs tracking-[0.3em] text-cream/45">RAFIGANJ, BIHAR</p>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-5 grid h-11 w-11 place-items-center rounded-full border border-gold/30 bg-midnight/70 text-cream"
        >
          ✕
        </button>
        <div className="absolute inset-y-0 left-0 w-1/4" onClick={() => onNav(-1)} />
        <div className="absolute inset-y-0 right-0 w-1/4" onClick={() => onNav(1)} />
      </div>
    </motion.div>
  );
}
