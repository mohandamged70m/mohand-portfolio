"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Replays a section's entrance animation every time the user scrolls into it.
 *
 * The timeline is supplied by the caller (either a ready `gsap.core.Timeline`
 * or a factory that returns one) so the hook stays generic across sections.
 * ScrollTrigger is scoped to `sectionRef` and cleaned up on unmount.
 */
export function useScrollReplay(
  sectionRef: React.RefObject<HTMLElement | null>,
  timeline: gsap.core.Timeline | (() => gsap.core.Timeline)
): void {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const getTimeline = () =>
      typeof timeline === "function" ? timeline() : timeline;

    const ctx = gsap.context(() => {
      const tl = getTimeline();

      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        end: "bottom top",
        onEnter: () => tl.restart(),
        onEnterBack: () => tl.restart(),
        onLeave: () => tl.pause(0),
        onLeaveBack: () => tl.pause(0),
      });
    }, section);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
