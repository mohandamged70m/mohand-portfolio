import HeroSection from "./components/home/HeroSection";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
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
        className="flex min-h-screen items-center justify-center bg-surface px-6 text-fg"
      >
        <h2 className="text-3xl font-semibold tracking-tight">Stack</h2>
      </section>
      <section
        id="project"
        className="flex min-h-screen items-center justify-center bg-surface px-6 text-fg"
      >
        <h2 className="text-3xl font-semibold tracking-tight">Project</h2>
      </section>
      <section
        id="contact"
        className="flex min-h-screen items-center justify-center bg-surface px-6 text-fg"
      >
        <h2 className="text-3xl font-semibold tracking-tight">Contact</h2>
      </section>
    </main>
  );
}
