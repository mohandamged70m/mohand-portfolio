"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, useGSAP, DURATION, EASE, prefersReducedMotion } from "@/app/lib/gsap";
import { useActiveSection } from "@/app/hooks/useActiveSection";
import { useTheme } from "@/app/hooks/useTheme";
import { DockItem } from "./DockItem";
import { GlassEffect, GlassFilter } from "@/components/ui/liquid-glass";
import {
  HomeIcon,
  StackIcon,
  ProjectIcon,
  ResumeIcon,
  ContactIcon,
  SunIcon,
  MoonIcon,
} from "./icons";
import type { SectionId } from "@/app/lib/scroll";

const SECTION_ORDER: { id: SectionId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "stack", label: "Stack" },
  { id: "project", label: "Project" },
  { id: "contact", label: "Contact" },
];

export function Dock() {
  const dockRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const resolvedTheme = mounted ? theme : "light";
  const themeIcon: "sun" | "moon" = resolvedTheme === "dark" ? "sun" : "moon";

  const isHome = pathname === "/";
  const activeSection = useActiveSection(
    isHome ? SECTION_ORDER.map((s) => s.id) : [],
  );

  useGSAP(
    () => {
      if (!dockRef.current) return;
      if (prefersReducedMotion()) {
        gsap.set(dockRef.current, { y: 0, opacity: 1 });
        return;
      }
      gsap.from(dockRef.current, {
        y: 16,
        opacity: 0,
        duration: DURATION.entrance,
        ease: 'power2.out',
        delay: 0.6,
      });
    },
    { scope: dockRef },
  );

  const scrollToSection = (id: SectionId) => {
    if (!isHome) {
      router.push(`/#${id}`);
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    if (prefersReducedMotion()) {
      el.scrollIntoView();
      return;
    }
    gsap.to(window, {
      duration: 0.6,
      ease: EASE.inOut,
      scrollTo: { y: el, offsetY: 24 },
    });
  };

  const handleToggleTheme = () => {
    crossfadeTheme();
    toggleTheme();
  };

  const crossfadeTheme = () => {
    if (prefersReducedMotion() || typeof document === "undefined") return;
    const root = document.documentElement;
      gsap.to(root, {
        duration: DURATION.theme,
        ease: EASE.inOut,
        backgroundColor: theme === "dark" ? "#F7F7F5" : "#1A1A1A",
        color: theme === "dark" ? "#1A1A1A" : "#F5F5F5",
      onComplete: () => {
        gsap.set(root, { clearProps: "backgroundColor,color" });
      },
    });
  };

  return (
    <>
      <GlassFilter />
      <div
        ref={dockRef}
        className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 sm:bottom-6"
      >
        <GlassEffect className="rounded-full p-0">
          <nav
            aria-label="Primary"
            className="flex max-w-[calc(100vw-2rem)] flex-wrap items-center justify-center gap-1 rounded-full border border-white/30 p-2 shadow-[0_8px_30px_rgba(0,0,0,0.18)] sm:gap-2 sm:p-2.5"
          >
            <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
              {SECTION_ORDER.map((section) => (
                <DockItem
                  key={section.id}
                  label={section.label}
                  isLink={!isHome}
                  href={isHome ? undefined : `/#${section.id}`}
                  onClick={() => scrollToSection(section.id)}
                  active={isHome && activeSection === section.id}
                >
                  {section.id === "home" && <HomeIcon />}
                  {section.id === "stack" && <StackIcon />}
                  {section.id === "project" && <ProjectIcon />}
                  {section.id === "contact" && <ContactIcon />}
                </DockItem>
              ))}

              <DockItem
                label="Digital CV"
                isLink
                href="/resume"
                onClick={() => router.push("/resume")}
              >
                <ResumeIcon />
              </DockItem>

              <DockItem
                label={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                onClick={handleToggleTheme}
              >
                <span className="relative block h-[22px] w-[22px]">
                  <SunIcon
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{ opacity: themeIcon === "sun" ? 1 : 0 }}
                  />
                  <MoonIcon
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{ opacity: themeIcon === "moon" ? 1 : 0 }}
                  />
                </span>
              </DockItem>
            </div>
          </nav>
        </GlassEffect>
      </div>
    </>
  );
}
