"use client";

import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { LandingContent } from "@/components/landing/LandingContent";
import { GrowthLoops } from "@/components/landing/GrowthLoops";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main>
        <Hero />
        <LandingContent />
        <GrowthLoops />
      </main>
      <Footer />
    </div>
  );
}
