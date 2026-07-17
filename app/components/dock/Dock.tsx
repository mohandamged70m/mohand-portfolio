"use client";

import { useRef, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, useGSAP, DURATION, EASE, prefersReducedMotion } from "@/app/lib/gsap";
import { useTheme } from "@/app/hooks/useTheme";
import { useActiveSection } from "@/app/hooks/useActiveSection";
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

const SECTION_ITEMS: { id: SectionId; label: string; icon: typeof HomeIcon }[] = [
  { id: "home", label: "Home", icon: HomeIcon },
  { id: "stack", label: "Stack", icon: StackIcon },
  { id: "project", label: "Project", icon: ProjectIcon },
  { id: "contact", label: "Contact", icon: ContactIcon },
];

const RESUME_ITEM = { id: "resume", label: "Digital CV", href: "/resume", icon: ResumeIcon };

const ITEM_WIDTH = 48;
const GAP = 8;
const PADDING = 12;

export function Dock() {
  const dockRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [mounted] = useState(() => typeof window !== "undefined");

  const isHome = pathname === "/";
  const activeSection = useActiveSection(["home", "stack", "project", "contact"]);

  const resolvedTheme = mounted ? theme : "light";
  const themeIcon: "sun" | "moon" = resolvedTheme === "dark" ? "sun" : "moon";

  const activeId: string | null = isHome
    ? activeSection
    : pathname.startsWith("/stack")
      ? "stack"
      : pathname.startsWith("/project")
        ? "project"
        : pathname.startsWith("/contact")
          ? "contact"
          : pathname.startsWith("/resume")
            ? "resume"
            : null;

  const dockItems = [...SECTION_ITEMS, RESUME_ITEM];
  const activeIndex = activeId ? dockItems.findIndex((item) => item.id === activeId) : -1;
  const indicatorOffset = activeIndex >= 0 ? PADDING + activeIndex * (ITEM_WIDTH + GAP) + ITEM_WIDTH / 2 : 0;
  const indicatorStyle: React.CSSProperties = {
    transform: `translateX(${indicatorOffset}px)`,
    opacity: activeIndex >= 0 ? 1 : 0,
  };

  useGSAP(
    () => {
      if (!dockRef.current || !indicatorRef.current) return;
      if (prefersReducedMotion()) {
        gsap.set(dockRef.current, { y: 0, opacity: 1 });
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.from(dockRef.current, {
        y: 16,
        opacity: 0,
        duration: DURATION.entrance,
        delay: 0.6,
      }).from(indicatorRef.current, {
        scaleX: 0,
        duration: DURATION.indicator,
        ease: EASE.inOut,
      }, "-=0.3");
    },
    { scope: dockRef, dependencies: [activeId] },
  );

  const scrollToSection = useCallback((id: SectionId) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (prefersReducedMotion()) {
      el.scrollIntoView();
      return;
    }
    gsap.to(window, {
      duration: 0.7,
      ease: "power2.inOut",
      scrollTo: `#${id}`,
    });
  }, []);

  const handleSectionClick = useCallback(
    (id: SectionId, e?: React.MouseEvent) => {
      if (isHome) {
        e?.preventDefault();
        scrollToSection(id);
      } else {
        e?.preventDefault();
        router.push(`/#${id}`);
      }
    },
    [isHome, scrollToSection, router],
  );

  const handleToggleTheme = () => {
    if (prefersReducedMotion() || typeof document === "undefined") {
      toggleTheme();
      return;
    }
    const root = document.documentElement;
    gsap.to(root, {
      duration: DURATION.theme,
      ease: EASE.inOut,
      backgroundColor: theme === "dark" ? "#F7F7F5" : "#1A1A1A",
      color: theme === "dark" ? "#1A1A1A" : "#F5F5F5",
      onComplete: () => {
        gsap.set(root, { clearProps: "backgroundColor,color" });
        toggleTheme();
      },
    });
  };

  return (
    <>
      <GlassFilter />
      <div
        ref={dockRef}
        className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 sm:bottom-6"
        role="navigation"
        aria-label="Primary navigation"
      >
        <GlassEffect className="rounded-full p-0 relative">
          <nav className="flex max-w-[calc(100vw-2rem)] flex-wrap items-center justify-center gap-1 rounded-full border border-white/30 p-2 shadow-[0_8px_30px_rgba(0,0,0,0.18)] sm:gap-2 sm:p-2.5">
            <div className="relative flex flex-wrap items-center justify-center gap-1 sm:gap-2">
              <div
                ref={indicatorRef}
                className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent transition-all duration-300 ease-out origin-center"
                style={indicatorStyle}
                aria-hidden="true"
              />
              {SECTION_ITEMS.map((item) => (
                <DockItem
                  key={item.id}
                  label={item.label}
                  isLink
                  href={isHome ? `#${item.id}` : `/#${item.id}`}
                  active={activeId === item.id}
                  onClick={(e) => handleSectionClick(item.id, e)}
                >
                  <item.icon className="size-5" />
                </DockItem>
              ))}

              <DockItem
                key={RESUME_ITEM.id}
                label={RESUME_ITEM.label}
                isLink
                href={RESUME_ITEM.href}
                active={activeId === RESUME_ITEM.id}
              >
                <RESUME_ITEM.icon className="size-5" />
              </DockItem>

              <DockItem
                label={!mounted ? "Toggle theme" : resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                onClick={handleToggleTheme}
              >
                <span className="relative block h-[22px] w-[22px]">
                  <SunIcon
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{ opacity: !mounted ? 0 : themeIcon === "sun" ? 1 : 0 }}
                  />
                  <MoonIcon
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{ opacity: !mounted ? 1 : themeIcon === "moon" ? 1 : 0 }}
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
