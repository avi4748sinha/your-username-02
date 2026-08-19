import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { story } from "@/data/rafiganj";
import { CinemaVideo } from "./CinemaVideo";

/** One frame at a time — swipe or tap instead of endless scrolling. */
export function CinematicStory() {
  const [i, setI] = useState(0);
  const s = story[i]!;

  const go = (d: number) => setI((p) => (p + d + story.length) % story.length);

  return (
    <section className="px-5 pb-14">
      <div className="mx-auto max-w-md">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-ui text-[10px] uppercase tracking-[0.4em] text-tide">The Reel</p>
            <h2 className="mt-1 font-display text-3xl text-cream">Eight frames</h2>
          </div>
          <span className="font-ui text-[11px] tabular-nums text-cream/35">
            {String(i + 1).padStart(2, "0")} / {story.length}
          </span>
        </div>

        <div className="relative mt-4 aspect-[9/14] overflow-hidden rounded-2xl bg-midnight frame grain">
          <AnimatePresence mode="wait">
            <motion.div
              key={s.n}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 cool"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) go(1);
                else if (info.offset.x > 60) go(-1);
              }}
            >
              <CinemaVideo src={s.clip.video} poster={s.clip.poster} kenBurns={false} />
            </motion.div>
          </AnimatePresence>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-midnight/40" />

          <AnimatePresence mode="wait">
            <motion.div
              key={`t-${s.n}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="pointer-events-none absolute inset-x-0 bottom-0 p-5"
            >
              <span className="font-ui text-[9px] tracking-[0.4em] text-tide">SCENE {s.n}</span>
              <h3 className="mt-1.5 font-display text-3xl leading-tight text-cream">{s.title}</h3>
              <p className="mt-1 max-w-[30ch] font-ui text-sm leading-snug text-cream/55">{s.sub}</p>
            </motion.div>
          </AnimatePresence>

          <button aria-label="Previous scene" onClick={() => go(-1)} className="absolute inset-y-0 left-0 w-1/3" />
          <button aria-label="Next scene" onClick={() => go(1)} className="absolute inset-y-0 right-0 w-1/3" />
        </div>

        <div className="mt-4 flex justify-center gap-1.5">
          {story.map((x, j) => (
            <button
              key={x.n}
              aria-label={`Scene ${x.n}`}
              onClick={() => setI(j)}
              className={`h-[2px] w-7 rounded-full transition-all ${j === i ? "bg-tide" : "bg-cream/15"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
