import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/raf/Hero";
import { Countdown } from "@/components/raf/Countdown";
import { CinematicStory } from "@/components/raf/CinematicStory";
import { VideoGallery } from "@/components/raf/VideoGallery";
import { ChhathTimeline } from "@/components/raf/ChhathTimeline";
import { MusicPlayer } from "@/components/raf/MusicPlayer";
import { FinalSunrise } from "@/components/raf/FinalSunrise";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chhath Puja 2026 — Rafiganj, Bihar" },
      {
        name: "description",
        content:
          "A short vintage record of Chhath Puja in Rafiganj, Bihar — real ghat footage, the four-day calendar, and a live countdown to each Arghya.",
      },
      { property: "og:title", content: "Chhath Puja 2026 — Rafiganj, Bihar" },
      {
        property: "og:description",
        content: "Real footage from the Rafiganj ghat: four days, five rituals, one town.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#141019" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen bg-midnight text-cream">
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.15 0.028 40) 0%, oklch(0.2 0.045 45) 45%, oklch(0.16 0.035 40) 75%, oklch(0.26 0.06 55) 100%)",
        }}
      />
      <Hero />
      <Countdown />
      <CinematicStory />
      <ChhathTimeline />
      <VideoGallery />
      <FinalSunrise />
      <MusicPlayer />
    </main>
  );
}
