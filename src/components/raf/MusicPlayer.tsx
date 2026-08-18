import { useEffect, useRef, useState } from "react";
import { musicCategories, tracks, type Track } from "@/data/rafiganj";

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
 * Floating gramophone-style player. Audio streams live from YouTube.
 * The player iframe stays visibly on screen (YouTube blocks playback in
 * hidden / zero-size frames), rendered as the small artwork tile.
 */
export function MusicPlayer() {
  const host = useRef<HTMLDivElement>(null);
  const player = useRef<any>(null);
  const [ready, setReady] = useState(false);
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cat, setCat] = useState("classics");
  const [open, setOpen] = useState(false);
  const current: Track | undefined = tracks[idx];

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
    <div className="fixed inset-x-3 bottom-3 z-40">
      <div className="mx-auto max-w-md border border-gold/25 bg-midnight/85 p-2.5 backdrop-blur-xl grain">
        <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
          {/* the YouTube frame itself, cropped into a small vintage tile */}
          <div className="relative h-11 w-11 shrink-0 overflow-hidden border border-gold/25 vintage">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[180px] w-[320px] -translate-x-1/2 -translate-y-1/2 scale-[0.35]">
              <div ref={host} />
            </div>
          </div>

          <div className="min-w-0">
            <p className="truncate font-display text-[15px] leading-tight text-cream">{current?.title}</p>
            <p className="truncate font-ui text-xs italic text-cream/50">{current?.artist}</p>
            <div className="mt-1.5 h-px w-full bg-cream/15">
              <div className="h-full bg-gold" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <button onClick={() => step(-1)} aria-label="Previous" className="h-9 w-6 text-cream/60">
              ⏮
            </button>
            <button
              onClick={toggle}
              aria-label={playing ? "Pause" : "Play"}
              className="grid h-10 w-10 place-items-center rounded-full border border-gold/40 bg-gold/15 text-sm text-cream"
            >
              {playing ? "❚❚" : "▶"}
            </button>
            <button onClick={() => step(1)} aria-label="Next" className="h-9 w-6 text-cream/60">
              ⏭
            </button>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle playlist"
              className="h-9 w-6 text-cream/60"
            >
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {open && (
          <div className="mt-2.5 border-t border-gold/15 pt-2.5">
            <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 [scrollbar-width:none]">
              {musicCategories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCat(c.id)}
                  className={`shrink-0 border px-3 py-1 font-ui text-xs uppercase tracking-[0.2em] ${
                    cat === c.id ? "border-gold bg-gold/20 text-cream" : "border-cream/15 text-cream/60"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <div className="max-h-40 overflow-y-auto">
              {list.map((t) => {
                const active = tracks[idx]?.id === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setIdx(tracks.findIndex((x) => x.id === t.id))}
                    className={`flex w-full items-center gap-2 px-1 py-2 text-left font-ui text-[15px] ${
                      active ? "text-gold" : "text-cream/75"
                    }`}
                  >
                    <span className="min-w-0 flex-1 truncate">{t.title}</span>
                    <span className="shrink-0 text-[11px] italic text-cream/40">{t.artist}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
