import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { musicCategories, tracks, type Track } from "@/data/rafiganj";
import { useAmbience } from "@/lib/ambience";

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<any> | null = null;
function loadYT(): Promise<any> {
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve) => {
    if (window.YT?.Player) return resolve(window.YT);
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve(window.YT);
    };
    const s = document.createElement("script");
    s.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(s);
  });
  return apiPromise;
}

/**
 * Floating player. Audio streams live from YouTube; the iframe stays visible as
 * the small artwork tile because YouTube blocks playback in hidden frames.
 */
export function MusicPlayer() {
  const host = useRef<HTMLDivElement>(null);
  const player = useRef<any>(null);
  const [ready, setReady] = useState(false);
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cat, setCat] = useState(musicCategories[0]!.id);
  const [open, setOpen] = useState(false);
  const { entered, setDucked } = useAmbience();
  const current: Track | undefined = tracks[idx];

  useEffect(() => setDucked(playing), [playing, setDucked]);

  useEffect(() => {
    let cancelled = false;
    void loadYT().then((YT) => {
      if (cancelled || !host.current || player.current) return;
      player.current = new YT.Player(host.current, {
        height: "180",
        width: "320",
        videoId: tracks[0]!.id,
        playerVars: {
          playsinline: 1,
          controls: 0,
          rel: 0,
          modestbranding: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: () => setReady(true),
          onStateChange: (e: any) => {
            setPlaying(e.data === YT.PlayerState.PLAYING);
            if (e.data === YT.PlayerState.ENDED) setIdx((p) => (p + 1) % tracks.length);
          },
        },
      });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const first = useRef(true);
  useEffect(() => {
    if (!ready || !player.current) return;
    if (first.current) {
      first.current = false;
      return;
    }
    player.current.loadVideoById(tracks[idx]!.id);
    player.current.unMute?.();
    player.current.playVideo?.();
  }, [idx, ready]);

  useEffect(() => {
    const t = setInterval(() => {
      const p = player.current;
      if (!p?.getDuration) return;
      const d = p.getDuration();
      setProgress(d ? (p.getCurrentTime() / d) * 100 : 0);
    }, 500);
    return () => clearInterval(t);
  }, []);

  const toggle = () => {
    const p = player.current;
    if (!p) return;
    p.unMute?.();
    p.setVolume?.(100);
    if (playing) p.pauseVideo();
    else p.playVideo();
  };

  const step = (d: number) => setIdx((p) => (p + d + tracks.length) % tracks.length);
  const list = tracks.filter((t) => t.cat === cat);

  return (
    <motion.div
      initial={{ y: 90, opacity: 0 }}
      animate={{ y: entered ? 0 : 90, opacity: entered ? 1 : 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
      className="fixed inset-x-3 bottom-3 z-40"
    >
      <div className="mx-auto max-w-md overflow-hidden rounded-2xl p-2.5 card-night">
        <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
          {/* the YouTube frame itself, cropped into a small tile */}
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-cream/10">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[180px] w-[320px] -translate-x-1/2 -translate-y-1/2 scale-[0.35]">
              <div ref={host} />
            </div>
            {playing && (
              <span className="absolute inset-0 rounded-lg ring-1 ring-tide/60" />
            )}
          </div>

          <div className="min-w-0">
            <p className="truncate font-ui text-[13px] font-medium leading-tight text-cream">{current?.title}</p>
            <p className="truncate font-ui text-[11px] text-cream/40">{current?.artist}</p>
            <div className="mt-1.5 h-[2px] w-full overflow-hidden rounded-full bg-cream/10">
              <div className="h-full rounded-full bg-tide transition-[width] duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <button onClick={() => step(-1)} aria-label="Previous" className="h-9 w-6 text-cream/50">
              ⏮
            </button>
            <button
              onClick={toggle}
              aria-label={playing ? "Pause" : "Play"}
              className="grid h-10 w-10 place-items-center rounded-full border border-tide/40 bg-tide/15 text-sm text-cream"
            >
              {playing ? "❚❚" : "▶"}
            </button>
            <button onClick={() => step(1)} aria-label="Next" className="h-9 w-6 text-cream/50">
              ⏭
            </button>
            <button onClick={() => setOpen((o) => !o)} aria-label="Toggle playlist" className="h-9 w-6 text-cream/50">
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-2.5 hairline pt-2.5">
                <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 [scrollbar-width:none]">
                  {musicCategories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setCat(c.id)}
                      className={`shrink-0 rounded-full border px-3 py-1 font-ui text-[10px] uppercase tracking-[0.2em] ${
                        cat === c.id ? "border-tide/60 bg-tide/15 text-cream" : "border-cream/10 text-cream/45"
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
                <div className="max-h-44 overflow-y-auto">
                  {list.map((t) => {
                    const active = tracks[idx]?.id === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setIdx(tracks.findIndex((x) => x.id === t.id))}
                        className={`flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left font-ui text-[13px] ${
                          active ? "bg-tide/10 text-cream" : "text-cream/70"
                        }`}
                      >
                        <span className="min-w-0 flex-1 truncate">{t.title}</span>
                        <span className="shrink-0 text-[10px] text-cream/35">{t.artist}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
