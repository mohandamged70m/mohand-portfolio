import HeroSection from "./components/home/HeroSection";
import { FeatureCard } from "@/components/ui/grid-feature-cards";
import { PageBackground } from "@/app/components/PageBackground";
import {
  Code2,
  Atom,
  Palette,
  Boxes,
  Wind,
  Brain,
  GitBranch,
  Server,
  PenTool,
  Layers,
  Zap,
  Container,
} from "lucide-react";

const stack = [
  { title: "TypeScript", icon: Code2, description: "Type-safe development across the stack." },
  { title: "React", icon: Atom, description: "Component-driven UIs with hooks and suspense." },
  { title: "Next.js", icon: Layers, description: "App Router, RSC, and edge rendering." },
  { title: "Tailwind", icon: Wind, description: "Utility-first styling with full control." },
  { title: "shadcn/ui", icon: Boxes, description: "Accessible, composable UI primitives." },
  { title: "Framer Motion", icon: Zap, description: "Fluid, gesture-driven animations." },
  { title: "Figma", icon: PenTool, description: "Design systems and prototyping." },
  { title: "Node.js", icon: Server, description: "APIs and serverless functions." },
  { title: "Git", icon: GitBranch, description: "Version control and collaboration." },
  { title: "Docker", icon: Container, description: "Containerized, reproducible environments." },
  { title: "AI / LLMs", icon: Brain, description: "Building AI-first product experiences." },
  { title: "Design Systems", icon: Palette, description: "Scalable, consistent visual language." },
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
