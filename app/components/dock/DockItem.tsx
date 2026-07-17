"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import { gsap, useGSAP, DURATION, EASE, prefersReducedMotion } from "@/app/lib/gsap";

interface DockItemProps {
  label: string;
  href?: string;
  onClick?: (e?: React.MouseEvent) => void;
  active?: boolean;
  children: ReactNode;
  isLink?: boolean;
}

export function DockItem({
  label,
  href,
  onClick,
  active,
  children,
  isLink,
}: DockItemProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const scaleTo = useRef<((v: number) => void) | null>(null);
  const yTo = useRef<((v: number) => void) | null>(null);

  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return;
      scaleTo.current = gsap.quickTo(ref.current, "scale", {
        duration: DURATION.hover,
        ease: EASE.soft,
      });
      yTo.current = gsap.quickTo(ref.current, "y", {
        duration: DURATION.hover,
        ease: EASE.soft,
      });
    },
    { scope: ref },
  );

  const handleEnter = () => {
    if (prefersReducedMotion()) return;
    scaleTo.current?.(1.15);
    yTo.current?.(-6);
  };

  const handleLeave = () => {
    if (prefersReducedMotion()) return;
    scaleTo.current?.(1);
    yTo.current?.(0);
  };

  const handlePress = () => {
    if (prefersReducedMotion()) return;
    scaleTo.current?.(0.92);
  };

  const commonProps = {
    ref,
    "aria-label": label,
    onMouseEnter: handleEnter,
    onMouseLeave: handleLeave,
    onPointerDown: handlePress,
    onPointerUp: handleLeave,
    className: [
      "group relative flex h-11 w-11 items-center justify-center rounded-full sm:h-12 sm:w-12",
      "text-fg/80",
      "transition-colors duration-200",
      "hover:text-fg",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
      "focus-visible:ring-offset-transparent",
      active ? "text-fg" : "",
    ].join(" "),
  };

  const inner = (
    <>
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-accent-muted/60 bg-surface/90 px-2 py-1 text-xs font-medium text-fg opacity-0 shadow-sm backdrop-blur-sm transition-opacity duration-150 group-hover:opacity-100"
      >
        {label}
      </span>
    </>
  );

  if (isLink && href) {
    return (
      <Link href={href} prefetch={true} onClick={onClick} {...commonProps}>
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" onClick={() => onClick?.()} {...commonProps}>
      {inner}
    </button>
  );
}
