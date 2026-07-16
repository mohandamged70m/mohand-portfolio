"use client";

import { useEffect, useState } from "react";
import {
  createActiveSectionObserver,
  type SectionId,
} from "@/app/lib/scroll";

export function useActiveSection(ids: SectionId[]): SectionId | null {
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    const cleanup = createActiveSectionObserver({ ids }, setActive);
    return cleanup;
  }, [ids]);

  return active;
}
