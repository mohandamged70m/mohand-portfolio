"use client";

import { ShaderBackground } from "@/components/ui/blue-halftone";
import { useTheme } from "@/app/hooks/useTheme";

export function PageBackground() {
  const { theme } = useTheme();

  return (
    <ShaderBackground
      variant={theme}
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
