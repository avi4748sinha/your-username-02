const items = [
  { id: "home", icon: "🏠", label: "होम" },
  { id: "rafiganj", icon: "🎥", label: "रफीगंज" },
  { id: "chhath", icon: "🙏", label: "छठ" },
  { id: "memories", icon: "📸", label: "यादें" },
  { id: "about", icon: "❤️", label: "अंत" },
];

export function BottomNav() {
  return (
    <nav className="fixed inset-x-3 bottom-3 z-40">
      <div className="glass mx-auto flex max-w-xl items-center justify-between rounded-3xl px-2 py-2">
        {items.map((i) => (
          <a
            key={i.id}
            href={`#${i.id}`}
            className="flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-2xl px-1 py-1.5 text-cream/75 active:bg-cream/10"
          >
            <span className="text-base leading-none">{i.icon}</span>
            <span className="truncate font-hindi text-[10px]">{i.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
