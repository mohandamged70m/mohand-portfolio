"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

type LetterElement = HTMLSpanElement;

export interface UseLetterRevealOptions {
  /** Preserve nested spans (e.g. a `.highlight` span) while splitting text. */
  preserveNestedSpans?: boolean;
}

export interface LetterRevealHandle {
  /** Returns the split letter spans currently in the DOM, if mounted. */
  getLetters: () => LetterElement[];
}

/**
 * Splits an element's text content into individual `<span class="letter">`
 * elements on mount. Nested spans (like a `.highlight` word) are preserved
 * and their inner text is split too. The hook only prepares the DOM — it does
 * not animate. The calling component drives timing via its own GSAP timeline.
 *
 * On unmount before any animation, the original text content is restored.
 */
export function useLetterReveal(
  ref: React.RefObject<HTMLElement | null>,
  options: UseLetterRevealOptions = {}
): React.MutableRefObject<LetterRevealHandle> {
  const { preserveNestedSpans = true } = options;
  const handleRef = useRef<LetterRevealHandle>({
    getLetters: () => [],
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const originalHTML = el.innerHTML;
    const ctx = gsap.context(() => {
      splitElement(el, preserveNestedSpans);
    }, el);

    handleRef.current.getLetters = () =>
      Array.from(el.querySelectorAll<LetterElement>(".letter"));

    return () => {
      ctx.revert();
      el.innerHTML = originalHTML;
      handleRef.current.getLetters = () => [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return handleRef;
}

function splitElement(el: HTMLElement, preserveNestedSpans: boolean): void {
  if (preserveNestedSpans) {
    // Walk child nodes so existing nested spans are kept intact.
    const nodes = Array.from(el.childNodes);
    el.innerHTML = "";
    for (const node of nodes) {
      if (node.nodeType === Node.TEXT_NODE) {
        el.appendChild(splitText(node.textContent ?? ""));
      } else if (
        node.nodeType === Node.ELEMENT_NODE &&
        (node as HTMLElement).classList.contains("highlight")
      ) {
        const highlight = node.cloneNode(false) as HTMLElement;
        highlight.innerHTML = "";
        highlight.appendChild(splitText(node.textContent ?? ""));
        el.appendChild(highlight);
      } else {
        el.appendChild(node.cloneNode(true));
      }
    }
  } else {
    el.innerHTML = "";
    el.appendChild(splitText(el.textContent ?? ""));
  }
}

function splitText(text: string): DocumentFragment {
  const frag = document.createDocumentFragment();
  for (const char of text) {
    const span = document.createElement("span");
    span.className = "letter inline-block whitespace-pre";
    span.textContent = char;
    frag.appendChild(span);
  }
  return frag;
}
