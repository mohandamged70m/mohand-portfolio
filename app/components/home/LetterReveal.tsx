"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface LetterRevealProps {
  name: string;
  title: string;
}

export default function LetterReveal({ name, title }: LetterRevealProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const nameLetters =
        nameRef.current?.querySelectorAll(".letter") ?? [];
      const titleLetters =
        titleRef.current?.querySelectorAll(".letter") ?? [];
      const allLetters = [nameLetters, titleLetters];

      // Build the timeline but keep it paused — ScrollTrigger will drive it
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "back.out(1.7)" },
      });

      tl.set(allLetters, { opacity: 0, y: 30, rotateX: -90 })
        .to(nameLetters, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.6,
          stagger: 0.04,
        })
        .to(
          titleLetters,
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.5,
            stagger: 0.03,
          },
          "-=0.3"
        );

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",   // fires when section top hits 80% of viewport height
        end: "bottom top",
        onEnter: () => tl.restart(),      // scrolling down into it
        onEnterBack: () => tl.restart(),  // scrolling back up into it
        onLeave: () => tl.pause(0),       // reset when scrolling past, ready for next replay
        onLeaveBack: () => tl.pause(0),   // reset when scrolling above it again
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderLetters = (text: string) =>
    text.split("").map((char, i) => (
      <span key={i} className="letter inline-block whitespace-pre">
        {char}
      </span>
    ));

  return (
    <div ref={sectionRef} className="text-center">
      <h1 ref={nameRef} className="text-5xl font-bold text-fg">
        {renderLetters(name)}
      </h1>
      <h2 ref={titleRef} className="text-lg uppercase tracking-widest text-fg/60 mt-3">
        {renderLetters(title)}
      </h2>
    </div>
  );
}