import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { clipList, galleryCategories, type Clip } from "@/data/rafiganj";
import { CinemaVideo } from "./CinemaVideo";

export function VideoGallery() {
  const [cat, setCat] = useState("all");
  const [open, setOpen] = useState<number | null>(null);
  const list = cat === "all" ? clipList : clipList.filter((c) => c.category === cat);

  return (
    <section className="px-5 pb-14">
      <div className="mx-auto max-w-md">
        <p className="font-ui text-[10px] uppercase tracking-[0.4em] text-tide">The Archive</p>
        <h2 className="mt-1 font-display text-3xl text-cream">Our Rafiganj</h2>

        <div className="-mx-1 mt-4 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none]">
          {galleryCategories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={`shrink-0 rounded-full border px-3 py-1 font-ui text-[10px] uppercase tracking-[0.2em] transition-colors ${
                cat === c.id ? "border-tide/60 bg-tide/15 text-cream" : "border-cream/10 text-cream/45"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-4 grid grid-cols-2 gap-2">
          <AnimatePresence mode="popLayout">
            {list.map((c) => (
              <motion.button
                layout
                key={c.id}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35 }}
                onClick={() => setOpen(clipList.findIndex((x) => x.id === c.id))}
                className="group relative aspect-[3/4] overflow-hidden rounded-xl frame grain"
              >
                <img
                  src={c.poster}
                  alt={c.label}
                  loading="lazy"
                  className="h-full w-full object-cover cool transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-midnight to-transparent p-2 text-left font-ui text-[11px] text-cream/80">
                  {c.label}
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
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
      className="fixed inset-0 z-[60] flex items-center justify-center bg-midnight/98"
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.y) > 90) onClose();
      }}
    >
      <div className="relative h-full w-full max-w-[500px] grain vignette">
        <div className="absolute inset-0 cool">
          <CinemaVideo src={clip.video} poster={clip.poster} eager kenBurns={false} />
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-midnight to-transparent px-6 pb-28 pt-16">
          <p className="font-display text-3xl text-cream">{clip.label}</p>
          <p className="mt-1 font-ui text-[10px] tracking-[0.3em] text-cream/40">RAFIGANJ, BIHAR</p>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-5 grid h-11 w-11 place-items-center rounded-full border border-cream/15 bg-midnight/70 text-cream backdrop-blur-xl"
        >
          ✕
        </button>
        <div className="absolute inset-y-0 left-0 w-1/4" onClick={() => onNav(-1)} />
        <div className="absolute inset-y-0 right-0 w-1/4" onClick={() => onNav(1)} />
      </div>
    </motion.div>
  );
}
