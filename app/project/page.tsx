"use client";

import { PageBackground } from "@/app/components/PageBackground";
import { ProjectSection } from "@/app/components/sections/ProjectSection";

export default function ProjectPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <PageBackground />
      <ProjectSection />
    </main>
  );
}
