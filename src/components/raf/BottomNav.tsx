const items = [
  { id: "home", label: "Home" },
  { id: "story", label: "Story" },
  { id: "rafiganj", label: "Archive" },
  { id: "chhath", label: "Rituals" },
  { id: "memories", label: "Card" },
  { id: "about", label: "End" },
];

export function BottomNav() {
  return (
    <nav className="fixed inset-x-3 bottom-3 z-40">
      <div className="glass mx-auto flex max-w-xl items-center justify-between rounded-2xl px-1.5 py-1.5">
        {items.map((i) => (
          <a
            key={i.id}
            href={`#${i.id}`}
            className="min-w-0 flex-1 rounded-xl px-1 py-2 text-center font-ui text-[11px] tracking-wide text-cream/70 active:bg-cream/10"
          >
            <span className="block truncate">{i.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
