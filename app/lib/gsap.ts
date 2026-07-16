import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollToPlugin);

export const EASE = {
  out: "power3.out",
  inOut: "power2.inOut",
  soft: "power2.out",
} as const;

export const DURATION = {
  entrance: 0.4,
  hover: 0.2,
  theme: 0.3,
  indicator: 0.35,
} as const;

export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

export { gsap, useGSAP };
