"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useLetterReveal } from "@/app/hooks/animation/useLetterReveal";
import { useScrollReplay } from "@/app/hooks/animation/useScrollReplay";
import { ShaderBackground } from "@/components/ui/blue-halftone";
import { useTheme } from "@/app/hooks/useTheme";

export interface HeroSectionProps {
  name: string;
  highlightedWord: string;
  tagline: string;
  introText: string;
  location: string;
  photoSrc: string;
}

export default function HeroSection({
  name,
  highlightedWord,
  tagline,
  introText,
  location,
  photoSrc,
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const underlineRef = useRef<SVGPathElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const introReveal = useLetterReveal(introRef);
  const nameReveal = useLetterReveal(nameRef);
  const taglineReveal = useLetterReveal(taglineRef);

  useScrollReplay(sectionRef, () => {
    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: "power3.out" },
    });

    const introLetters = introReveal.current.getLetters();
    const nameLetters = nameReveal.current.getLetters();
    const taglineLetters = taglineReveal.current.getLetters();

    const path = underlineRef.current;
    const pathLength = path ? path.getTotalLength() : 0;
    if (path) {
      path.style.strokeDasharray = `${pathLength}`;
      path.style.strokeDashoffset = `${pathLength}`;
    }

    tl.set([...introLetters, ...nameLetters, ...taglineLetters], {
      opacity: 0,
      y: 24,
    })
      .set(badgesRef.current, { opacity: 0, y: 12 })
      .set(portraitRef.current, { opacity: 0, x: 20 })

      .to(introLetters, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.02,
      })
      .to(
        nameLetters,
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.03 },
        "-=0.15"
      )
      .to(
        taglineLetters,
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.025 },
        "-=0.2"
      )
      .to(
        path,
        { strokeDashoffset: 0, duration: 0.6, ease: "power2.inOut" },
        "-=0.15"
      )
      .to(
        badgesRef.current,
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.3"
      )
      .to(
        portraitRef.current,
        { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" },
        "-=0.5"
      );

    return tl;
  });

  const renderName = () => {
    const parts = name.split(highlightedWord);
    return (
      <>
        {parts[0]}
          <span className="highlight text-fg">
          {highlightedWord}
        </span>
        {parts[1] ?? ""}
      </>
    );
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="hero-section relative flex min-h-screen items-center justify-center overflow-hidden bg-surface px-6 py-20 text-fg"
    >
      <ShaderBackground
        variant={theme}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      />

      <div className="hero relative z-10 grid w-full max-w-[1080px] grid-cols-1 items-center gap-12 md:grid-cols-[1.15fr_0.85fr]">
        <div className="flex flex-col items-start">
          <p ref={introRef} className="intro mb-2 font-caveat text-2xl text-sage">
            {introText}
          </p>

          <h1
            ref={nameRef}
            className="name whitespace-nowrap font-display text-[clamp(3rem,6.5vw,5.5rem)] font-bold leading-[0.98] tracking-[-0.01em] text-fg/70"
          >
            {renderName()}
          </h1>

          <div className="tagline-wrap relative inline-block">
            <p
              ref={taglineRef}
              className="tagline mt-3 font-caveat text-[clamp(1.6rem,3vw,2.1rem)] text-accent"
            >
              {tagline}
            </p>
            <svg
              className="underline-svg pointer-events-none absolute -bottom-1.5 left-[-4px] h-4 w-full"
              viewBox="0 0 300 16"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true"
            >
              <path
                ref={underlineRef}
                d="M4 10 Q 80 2, 150 8 T 296 6"
                stroke="var(--color-accent)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div ref={badgesRef} className="badges mt-7 flex flex-wrap items-center gap-3">
            <span className="badge inline-flex items-center gap-1.5 rounded-full border border-accent-muted bg-surface/70 px-3.5 py-2 text-sm text-fg/80">
              <span className="dot h-1.5 w-1.5 rounded-full bg-sage" />
              Available
            </span>
            <span className="badge inline-flex items-center rounded-full border border-accent-muted bg-surface/70 px-3.5 py-2 text-sm text-fg/80">
              {location}
            </span>
            <a
              href="#contact"
                className="cta rounded-full bg-accent px-4 py-2 text-sm font-medium text-surface transition-colors hover:bg-accent-muted"
            >
              Book a call
            </a>
          </div>
        </div>

        <div
          ref={portraitRef}
          className="portrait relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl border border-accent-muted bg-surface/70"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photoSrc}
            alt={name}
            className="h-full w-full object-cover"
          />
            <span className="status-tag absolute bottom-3.5 left-3.5 rounded-full border border-accent-muted bg-surface/85 px-2.5 py-1 text-xs text-sage">
            based in {location}
          </span>
        </div>
      </div>
    </section>
  );
}
