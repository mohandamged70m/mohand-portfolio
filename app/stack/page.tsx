"use client";

import { PageBackground } from "@/app/components/PageBackground";
import { StackSection } from "@/app/components/sections/StackSection";

export default function StackPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <PageBackground />
      <StackSection />
    </main>
  );
}
