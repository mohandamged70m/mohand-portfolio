import HeroSection from "./components/home/HeroSection";
import { FeatureCard } from "@/components/ui/grid-feature-cards";
import { PageBackground } from "@/app/components/PageBackground";
import { Smartphone } from "lucide-react";
import {
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiReact,
  SiNextdotjs,
  SiPostgresql,
  SiGooglegemini,
} from "react-icons/si";

const stack = [
  { title: "JavaScript / TypeScript", icon: SiTypescript, iconClassName: "size-10", description: "Type-safe language for robust web apps." },
  { title: "Node.js", icon: SiNodedotjs, iconClassName: "size-10", description: "Server-side runtime for APIs and services." },
  { title: "React.js", icon: SiReact, iconClassName: "size-10", description: "Component-driven library for UIs." },
  { title: "React Native", icon: Smartphone, iconClassName: "size-10", description: "Cross-platform native mobile apps." },
  { title: "Next.js", icon: SiNextdotjs, iconClassName: "size-10", description: "Full-stack React framework with App Router." },
  { title: "PostgreSQL", icon: SiPostgresql, iconClassName: "size-10", description: "Reliable, scalable relational database." },
  { title: "AI Google Studio", icon: SiGooglegemini, iconClassName: "size-10", description: "Building AI-first product experiences." },
];

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <PageBackground />
      <HeroSection
        introText="hey, i'm"
        name="Mohand Darwish"
        highlightedWord="Darwish"
        tagline="AI Frontend Engineer"
        location="Alexandria, EG"
        photoSrc="/portrait.jpeg"
      />
      <section
        id="stack"
        className="relative flex min-h-screen flex-col items-center justify-center px-6 py-16 text-fg"
      >
        <div className="relative z-10 flex w-full flex-col items-center">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Stack</h2>
        <p className="text-muted-foreground mt-3 max-w-2xl text-center text-sm tracking-wide text-balance md:text-base">
          The tools and technologies I use to build fast, accessible, and AI-first products.
        </p>
        <div className="mt-10 grid w-full max-w-5xl grid-cols-1 divide-x divide-y divide-dashed border border-dashed sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {stack.map((item, i) => (
            <FeatureCard key={i} feature={item} />
          ))}
        </div>
        </div>
      </section>
      <section
        id="project"
        className="flex min-h-screen items-center justify-center px-6 text-fg"
      >
        <h2 className="text-3xl font-semibold tracking-tight">Project</h2>
      </section>
      <section
        id="contact"
        className="flex min-h-screen items-center justify-center px-6 text-fg"
      >
        <h2 className="text-3xl font-semibold tracking-tight">Contact</h2>
      </section>
    </main>
  );
}
