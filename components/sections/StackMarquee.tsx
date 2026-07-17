"use client";

import {
  SiTypescript,
  SiNodedotjs,
  SiReact,
  SiNextdotjs,
  SiPostgresql,
  SiGooglegemini,
} from "react-icons/si";
import { Smartphone } from "lucide-react";
import type { IconType } from "react-icons";

type StackItem = {
  name: string;
  icon: IconType;
  category: string;
};

const stack: StackItem[] = [
  { name: "TypeScript", icon: SiTypescript, category: "language" },
  { name: "Node.js", icon: SiNodedotjs, category: "runtime" },
  { name: "React", icon: SiReact, category: "framework" },
  { name: "React Native", icon: Smartphone, category: "framework" },
  { name: "Next.js", icon: SiNextdotjs, category: "framework" },
  { name: "PostgreSQL", icon: SiPostgresql, category: "database" },
  { name: "AI Google Studio", icon: SiGooglegemini, category: "ai" },
];

function Chip({ item }: { item: StackItem }) {
  const Icon = item.icon;
  return (
    <div className="group/chip flex shrink-0 items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-3 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[var(--stack-accent)]">
      <Icon className="size-7 text-[var(--fg)] transition-colors duration-200 group-hover/chip:text-[var(--stack-accent)]" />
      <span className="text-sm font-medium text-[var(--fg)]">{item.name}</span>
      <span className="font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground transition-colors duration-200 group-hover/chip:text-[var(--stack-accent-soft)]">
        {item.category}
      </span>
    </div>
  );
}

function MarqueeRow({
  items,
  direction,
}: {
  items: StackItem[];
  direction: "left" | "right";
}) {
  const sequence = [...items, ...items];
  return (
    <div className="marquee-viewport py-2">
      <div
        className={`marquee-track gap-4 ${
          direction === "left" ? "marquee-track--left" : "marquee-track--right"
        }`}
      >
        {sequence.map((item, i) => (
          <Chip key={`${item.name}-${i}`} item={item} />
        ))}
        {sequence.map((item, i) => (
          <div key={`clone-${item.name}-${i}`} aria-hidden="true">
            <Chip item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function StackMarquee() {
  const mid = Math.ceil(stack.length / 2);
  const row1 = stack.slice(0, mid);
  const row2 = stack.slice(mid);

  return (
    <div className="flex w-full flex-col gap-4">
      <MarqueeRow items={row1} direction="left" />
      <MarqueeRow items={row2} direction="right" />
    </div>
  );
}

export default StackMarquee;
