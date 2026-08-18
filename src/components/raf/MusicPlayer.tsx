import { useEffect, useRef, useState } from "react";
import { musicCategories } from "@/data/rafiganj";

type Track = { name: string; artist: string; url: string; cat: string };

/**
 * Floating player. No copyrighted audio is bundled — the visitor adds their own
 * (or royalty-free) tracks, which stay local to the device/session.
 */
export function MusicPlayer() {
  const audio = useRef<HTMLAudioElement>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cat, setCat] = useState("maiya");
  const [open, setOpen] = useState(false);
  const current = tracks[idx];

  useEffect(() => {
    const el = audio.current;
    if (!el || !current) return;
    el.src = current.url;
    if (playing) void el.play().catch(() => setPlaying(false));
  }, [idx, current?.url]);

  const toggle = () => {
    const el = audio.current;
    if (!el || !current) return;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      void el.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  const step = (d: number) => {
    if (!tracks.length) return;
    setIdx((p) => (p + d + tracks.length) % tracks.length);
  };

  const onFiles = (files: FileList | null) => {
    if (!files) return;
    const added: Track[] = Array.from(files).map((f) => ({
      name: f.name.replace(/\.[^.]+$/, ""),
      artist: "आपका संगीत",
      url: URL.createObjectURL(f),
      cat,
    }));
    setTracks((t) => [...t, ...added]);
  };

  const list = tracks.filter((t) => t.cat === cat);

  return (
    <>
      <audio
        ref={audio}
        onTimeUpdate={(e) => {
          const el = e.currentTarget;
          setProgress(el.duration ? (el.currentTime / el.duration) * 100 : 0);
        }}
        onEnded={() => step(1)}
      />

      <div className="fixed inset-x-3 bottom-[92px] z-40">
        <div className="glass mx-auto max-w-xl rounded-3xl px-3 py-2.5">
          <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="संगीत सूची"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-sunset to-vermilion text-lg"
            >
              🎵
            </button>
            <div className="min-w-0">
              <p className="truncate font-hindi text-sm text-cream">
                {current ? current.name : "अपना भक्ति संगीत जोड़ें"}
              </p>
              <p className="truncate text-[11px] text-cream/55">{current ? current.artist : "🎵 पर टैप करें"}</p>
              <div className="mt-1.5 h-[3px] w-full overflow-hidden rounded-full bg-cream/15">
                <div className="h-full rounded-full bg-gold" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <button onClick={() => step(-1)} aria-label="पिछला" className="h-10 w-8 text-cream/80">
                ⏮
              </button>
              <button
                onClick={toggle}
                aria-label={playing ? "रोकें" : "चलाएँ"}
                className="grid h-11 w-11 place-items-center rounded-full bg-cream text-midnight"
              >
                {playing ? "❚❚" : "▶"}
              </button>
              <button onClick={() => step(1)} aria-label="अगला" className="h-10 w-8 text-cream/80">
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
                    className={`shrink-0 rounded-full px-3 py-1.5 font-hindi text-xs ${
                      cat === c.id ? "bg-gold text-midnight" : "bg-cream/10 text-cream/80"
                    }`}
                  >
                    {c.icon} {c.label}
                  </button>
                ))}
              </div>
              <div className="max-h-40 space-y-1 overflow-y-auto">
                {list.length === 0 && (
                  <p className="py-2 font-hindi text-xs text-cream/55">
                    इस श्रेणी में अभी कोई गाना नहीं। नीचे से अपने डिवाइस का ऑडियो जोड़ें — कॉपीराइट गाने यहाँ नहीं
                    दिए गए हैं।
                  </p>
                )}
                {list.map((t) => (
                  <button
                    key={t.url}
                    onClick={() => setIdx(tracks.indexOf(t))}
                    className="block w-full truncate rounded-xl px-2 py-2 text-left font-hindi text-sm text-cream/85 hover:bg-cream/10"
                  >
                    ♪ {t.name}
                  </button>
                ))}
              </div>
              <label className="mt-2 block cursor-pointer rounded-xl border border-dashed border-gold/40 px-3 py-2 text-center font-hindi text-xs text-gold">
                + संगीत जोड़ें
                <input
                  type="file"
                  accept="audio/*"
                  multiple
                  className="hidden"
                  onChange={(e) => onFiles(e.target.files)}
                />
              </label>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
