"use client";

const projects = [
  {
    title: "AI-Powered Code Review",
    description: "An automated code review tool using LLMs to detect bugs, security issues, and style violations in PRs.",
    tech: ["Next.js", "TypeScript", "OpenAI API", "PostgreSQL"],
    link: "#",
    github: "#",
  },
  {
    title: "Real-time Collaboration Editor",
    description: "A collaborative rich-text editor with operational transforms for concurrent editing, built with Yjs and WebRTC.",
    tech: ["React", "Yjs", "WebRTC", "Node.js"],
    link: "#",
    github: "#",
  },
  {
    title: "Cross-Platform Mobile App",
    description: "React Native app with Expo for a fintech startup, featuring biometric auth, real-time transactions, and offline support.",
    tech: ["React Native", "Expo", "TypeScript", "Supabase"],
    link: "#",
    github: "#",
  },
  {
    title: "Design System Library",
    description: "A comprehensive React component library with Storybook, Tokens Studio integration, and automated visual regression testing.",
    tech: ["React", "Storybook", "TypeScript", "Chromatic"],
    link: "#",
    github: "#",
  },
];

export function ProjectSection() {
  return (
    <section
      id="project"
      className="relative flex min-h-screen flex-col items-start justify-center px-6 py-16 text-fg"
    >
      <div className="relative z-10 flex w-full flex-col items-start">
        <div className="relative inline-block">
          <h2 className="font-caveat text-[clamp(2.5rem,7vw,4rem)] font-bold text-accent">
            my <span className="text-fg">projects</span>
          </h2>
          <svg
            className="pointer-events-none absolute -bottom-1.5 left-[-4px] h-4 w-full"
            viewBox="0 0 300 16"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 10 Q 80 2, 150 8 T 296 6"
              stroke="var(--color-accent)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <p className="text-muted-foreground mt-3 max-w-2xl text-left text-sm tracking-wide text-balance md:text-base">
          A selection of products and experiments I&apos;ve built, shipped, or contributed to.
        </p>
        <div className="mt-10 grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <article
              key={i}
              className="group relative overflow-hidden rounded-2xl border border-accent-muted/50 bg-surface/50 p-6 transition-all duration-300 hover:border-accent/50 hover:bg-surface/70 hover:shadow-lg"
            >
              <h3 className="font-display text-lg font-semibold tracking-tight text-fg group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tech.map((tech, j) => (
                  <span
                    key={j}
                    className="rounded-full border border-accent-muted/50 bg-surface/50 px-2.5 py-0.5 text-xs text-fg/70"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-4">
                <a
                  href={project.link}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-muted transition-colors"
                >
                  Live Demo
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
                <a
                  href={project.github}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-fg/70 hover:text-fg transition-colors"
                >
                  Code
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectSection;
