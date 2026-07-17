"use client";

import { StackMarquee } from "@/components/sections/StackMarquee";

export function StackSection() {
  return (
    <section
      id="stack"
      className="relative flex min-h-screen flex-col items-start justify-center px-6 py-16 text-fg"
    >
      <div className="relative z-10 flex w-full flex-col items-start">
        <div className="relative inline-block">
          <h2 className="font-caveat text-[clamp(2.5rem,7vw,4rem)] font-bold text-accent">
            my <span className="text-fg">stack</span>
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
          The tools and technologies I use to build fast, accessible, and AI-first products.
        </p>
        <div className="mt-10 w-full max-w-5xl">
          <StackMarquee />
        </div>
      </div>
    </section>
  );
}

export default StackSection;
