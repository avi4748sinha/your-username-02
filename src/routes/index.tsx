import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/raf/Hero";
import { Countdown } from "@/components/raf/Countdown";
import { CinematicStory } from "@/components/raf/CinematicStory";
import { VideoGallery } from "@/components/raf/VideoGallery";
import { GhatSection } from "@/components/raf/GhatSection";
import { ChhathTimeline } from "@/components/raf/ChhathTimeline";
import { ArghyaCountdown } from "@/components/raf/ArghyaCountdown";
import { EmotionSection } from "@/components/raf/EmotionSection";
import { MemoryCard } from "@/components/raf/MemoryCard";
import { MusicPlayer } from "@/components/raf/MusicPlayer";
import { BottomNav } from "@/components/raf/BottomNav";
import { FinalSunrise } from "@/components/raf/FinalSunrise";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chhath Puja 2026 — Rafiganj, Bihar" },
      {
        name: "description",
        content:
          "A cinematic record of Chhath Puja in Rafiganj, Bihar — real ghat footage, live countdowns to each Arghya, and a scene-by-scene story of the four days.",
      },
      { property: "og:title", content: "Chhath Puja 2026 — Rafiganj, Bihar" },
      {
        property: "og:description",
        content: "Real footage from the Rafiganj ghat: four days, five rituals, one town.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0b1020" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen bg-midnight text-cream">
      {/* sunset → night → sunrise atmosphere */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.16 0.045 265) 0%, oklch(0.22 0.08 40) 28%, oklch(0.13 0.04 275) 55%, oklch(0.19 0.065 30) 80%, oklch(0.32 0.1 60) 100%)",
        }}
      />
      <Hero />
      <Countdown />
      <ArghyaCountdown />
      <CinematicStory />
      <GhatSection />
      <VideoGallery />
      <ChhathTimeline />
      <EmotionSection />
      <MemoryCard />
      <FinalSunrise />

      <MusicPlayer />
      <BottomNav />
    </main>
  );
}
