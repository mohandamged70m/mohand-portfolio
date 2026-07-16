import Link from "next/link";

export default function ResumePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-surface px-6 text-fg">
      <h1 className="text-4xl font-semibold tracking-tight">Digital CV</h1>
      <Link
        className="rounded-full border border-accent-muted px-5 py-2.5 font-medium transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        href="/"
      >
        See full portfolio →
      </Link>
    </main>
  );
}
