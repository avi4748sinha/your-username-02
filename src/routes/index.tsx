import { createFileRoute } from "@tanstack/react-router";
import { AmbienceProvider } from "@/lib/ambience";
import { AmbientBackdrop } from "@/components/raf/AmbientBackdrop";
import { EntryGate } from "@/components/raf/EntryGate";
import { TopBar } from "@/components/raf/TopBar";
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
          "A cinematic night record of Chhath Puja in Rafiganj, Bihar — real ghat footage, the four-day calendar, a live countdown to each Arghya and a Chhath music player.",
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
    <AmbienceProvider>
      <AmbientBackdrop />
      <EntryGate />
      <TopBar />
      <main className="relative min-h-screen text-cream">
        <Hero />
        <Countdown />
        <CinematicStory />
        <ChhathTimeline />
        <VideoGallery />
        <FinalSunrise />
        <MusicPlayer />
      </main>
    </AmbienceProvider>
  );
}
