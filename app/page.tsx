"use client";

import { useEffect } from "react";
import HeroSection from "./components/home/HeroSection";
import { PageBackground } from "@/app/components/PageBackground";
import { StackSection } from "@/app/components/sections/StackSection";
import { ProjectSection } from "@/app/components/sections/ProjectSection";
import { ContactSection } from "@/app/components/sections/ContactSection";

export default function Home() {
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) {
      requestAnimationFrame(() => el.scrollIntoView());
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col">
      <PageBackground />
      <HeroSection
        introText="hey, i'm"
        name="Mohand Darwish"
        highlightedWord="Darwish"
        tagline="AI Frontend Engineer"
        location="Alexandria, EG"
        photoSrc="/portrait.jpeg"
      />
      <StackSection />
      <ProjectSection />
      <ContactSection />
    </main>
  );
}
