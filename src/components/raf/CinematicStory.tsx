import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { story } from "@/data/rafiganj";
import { CinemaVideo } from "./CinemaVideo";

/** One vintage frame at a time — swipe or tap instead of endless scrolling. */
export function CinematicStory() {
  const [i, setI] = useState(0);
  const s = story[i]!;

  const go = (d: number) => setI((p) => (p + d + story.length) % story.length);

  return (
    <section className="px-6 pb-16">
      <div className="mx-auto max-w-md">
        <p className="text-center font-ui text-[11px] uppercase tracking-[0.45em] text-gold/70">The Reel</p>

        <div className="relative mt-5 aspect-[9/13] overflow-hidden bg-midnight frame grain vintage">
          <AnimatePresence mode="wait">
            <motion.div
              key={s.n}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) go(1);
                else if (info.offset.x > 60) go(-1);
              }}
            >
              <CinemaVideo src={s.clip.video} poster={s.clip.poster} kenBurns={false} />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/10 to-midnight/50" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <span className="font-ui text-[10px] tracking-[0.4em] text-gold/80">SCENE {s.n}</span>
                <h3 className="mt-1.5 font-display text-3xl leading-tight text-cream">{s.title}</h3>
                <p className="mt-1.5 max-w-[30ch] font-ui text-[15px] italic leading-snug text-cream/70">
                  {s.sub}
                </p>
              </div>
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
              className={`h-[3px] w-8 rounded-full transition-colors ${j === i ? "bg-gold" : "bg-cream/20"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
