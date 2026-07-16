export type SectionId =
  | "home"
  | "stack"
  | "project"
  | "contact";

export function getSectionElements(ids: SectionId[]): Map<SectionId, HTMLElement> {
  const map = new Map<SectionId, HTMLElement>();
  if (typeof document === "undefined") return map;
  for (const id of ids) {
    const el = document.getElementById(id);
    if (el) map.set(id, el);
  }
  return map;
}

export interface ActiveSectionOptions {
  ids: SectionId[];
  rootMarginTop?: number;
  rootMarginBottom?: number;
}

export function createActiveSectionObserver(
  options: ActiveSectionOptions,
  onChange: (id: SectionId) => void,
): () => void {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
    return () => {};
  }

  const { ids, rootMarginTop = 0, rootMarginBottom = 0 } = options;
  const elements = ids
    .map((id) => ({ id, el: document.getElementById(id) }))
    .filter((e): e is { id: SectionId; el: HTMLElement } => Boolean(e.el));

  if (elements.length === 0) return () => {};

  const visibility = new Map<SectionId, number>();

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const id = entry.target.id as SectionId;
        visibility.set(id, entry.intersectionRatio);
      }
      let best: SectionId | null = null;
      let bestRatio = 0;
      for (const [id, ratio] of visibility) {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          best = id;
        }
      }
      if (best && bestRatio > 0) onChange(best);
    },
    {
      rootMargin: `-${rootMarginTop}px 0px -${rootMarginBottom}px 0px`,
      threshold: [0, 0.25, 0.5, 0.75, 1],
    },
  );

  for (const { el } of elements) observer.observe(el);

  return () => observer.disconnect();
}
