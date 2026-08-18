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

/** Floating player. Audio streams live from YouTube — nothing is bundled or re-hosted. */
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
        height: "1",
        width: "1",
        videoId: tracks[0]!.id,
        playerVars: { playsinline: 1, controls: 0, origin: window.location.origin },
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

  // load new track when index changes
  const first = useRef(true);
  useEffect(() => {
    if (!ready || !player.current) return;
    if (first.current) {
      first.current = false;
      return;
    }
    player.current.loadVideoById(tracks[idx]!.id);
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
    if (playing) p.pauseVideo();
    else p.playVideo();
  };

  const step = (d: number) => setIdx((p) => (p + d + tracks.length) % tracks.length);
  const list = tracks.filter((t) => t.cat === cat);

  return (
    <>
      <div className="pointer-events-none fixed -left-[9999px] top-0 h-px w-px overflow-hidden">
        <div ref={host} />
      </div>

      <div className="fixed inset-x-3 bottom-[86px] z-40">
        <div className="glass mx-auto max-w-xl rounded-2xl px-3 py-2.5">
          <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle playlist"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-sunset to-vermilion text-sm font-semibold text-cream"
            >
              {open ? "✕" : "♪"}
            </button>
            <div className="min-w-0">
              <p className="truncate font-ui text-sm text-cream">{current?.title}</p>
              <p className="truncate font-ui text-[11px] text-cream/50">
                {current?.artist} · YouTube
              </p>
              <div className="mt-1.5 h-[2px] w-full overflow-hidden rounded-full bg-cream/15">
                <div className="h-full rounded-full bg-gold" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <button onClick={() => step(-1)} aria-label="Previous" className="h-10 w-7 text-cream/70">
                ⏮
              </button>
              <button
                onClick={toggle}
                aria-label={playing ? "Pause" : "Play"}
                className="grid h-10 w-10 place-items-center rounded-full bg-cream text-sm text-midnight"
              >
                {playing ? "❚❚" : "▶"}
              </button>
              <button onClick={() => step(1)} aria-label="Next" className="h-10 w-7 text-cream/70">
                ⏭
              </button>
            </div>
          </div>

          {open && (
            <div className="mt-3 border-t border-cream/10 pt-3">
              <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 [scrollbar-width:none]">
                {musicCategories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCat(c.id)}
                    className={`shrink-0 rounded-full px-3 py-1.5 font-ui text-xs tracking-wide ${
                      cat === c.id ? "bg-gold text-midnight" : "bg-cream/10 text-cream/75"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
              <div className="max-h-44 space-y-0.5 overflow-y-auto">
                {list.map((t) => {
                  const active = tracks[idx]?.id === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setIdx(tracks.findIndex((x) => x.id === t.id))}
                      className={`flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left font-ui text-sm ${
                        active ? "bg-cream/10 text-gold" : "text-cream/80"
                      }`}
                    >
                      <span className="min-w-0 flex-1 truncate">{t.title}</span>
                      <span className="shrink-0 text-[10px] text-cream/40">{t.artist}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
