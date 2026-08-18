import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Hero } from "@/components/raf/Hero";
import { Countdown } from "@/components/raf/Countdown";
import { LiveCounter } from "@/components/raf/LiveCounter";
import { CinematicStory } from "@/components/raf/CinematicStory";
import { VideoGallery } from "@/components/raf/VideoGallery";
import { GhatSection } from "@/components/raf/GhatSection";
import { ChhathTimeline } from "@/components/raf/ChhathTimeline";
import { ArghyaCountdown } from "@/components/raf/ArghyaCountdown";
import { EmotionSection } from "@/components/raf/EmotionSection";
import { MemoryCard } from "@/components/raf/MemoryCard";
import { MusicPlayer } from "@/components/raf/MusicPlayer";
import { LoveCounter } from "@/components/raf/LoveCounter";
import { BottomNav } from "@/components/raf/BottomNav";
import { FinalSunrise } from "@/components/raf/FinalSunrise";
import { RippleDivider } from "@/components/raf/Ambience";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "रफीगंज छठ पूजा 2026 — Rafiganj Chhath Cinematic Experience" },
      {
        name: "description",
        content:
          "रफीगंज, बिहार की छठ पूजा 2026 — असली घाट फुटेज, लाइव काउंटडाउन, सिनेमैटिक कहानी और यादें। जहाँ आस्था महसूस होती है।",
      },
      { property: "og:title", content: "रफीगंज छठ पूजा 2026 ❤️" },
      {
        property: "og:description",
        content: "जहाँ आस्था सिर्फ दिखाई नहीं देती… महसूस होती है। रफीगंज, बिहार का सिनेमैटिक छठ अनुभव।",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0b1020" },
    ],
  }),
  component: Index,
});

const HEART_KEY = "raf-chhath-hearts";

function Index() {
  const [hearts, setHearts] = useState(18492);

  useEffect(() => {
    const saved = localStorage.getItem(HEART_KEY);
    if (saved) setHearts(Number(saved));
  }, []);

  const love = () =>
    setHearts((h) => {
      const n = h + 1;
      localStorage.setItem(HEART_KEY, String(n));
      return n;
    });

  return (
    <main className="relative min-h-screen bg-midnight text-cream">
      {/* sunset → night → sunrise atmosphere */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.16 0.045 265) 0%, oklch(0.24 0.09 40) 28%, oklch(0.13 0.04 275) 55%, oklch(0.2 0.07 30) 80%, oklch(0.34 0.11 60) 100%)",
        }}
      />
      <Hero />
      <Countdown />
      <LiveCounter hearts={hearts} />
      <ArghyaCountdown />
      <RippleDivider />
      <CinematicStory />
      <RippleDivider />
      <GhatSection />
      <VideoGallery />
      <ChhathTimeline />
      <EmotionSection />
      <MemoryCard />
      <FinalSunrise />

      <LoveCounter hearts={hearts} onLove={love} />
      <MusicPlayer />
      <BottomNav />
    </main>
  );
}
