"use client";

import { PageBackground } from "@/app/components/PageBackground";
import { ContactSection } from "@/app/components/sections/ContactSection";

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <PageBackground />
      <ContactSection />
    </main>
  );
}
