"use client";

import { useState } from "react";
import { Mail, Calendar } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const contactInfo = [
  { icon: Mail, label: "Email", value: "mohand.darwish@email.com", href: "mailto:mohand.darwish@email.com" },
  { icon: FaLinkedin, label: "LinkedIn", value: "mohand-darwish", href: "https://linkedin.com/in/mohand-darwish" },
  { icon: FaGithub, label: "GitHub", value: "mohand-darwish", href: "https://github.com/mohand-darwish" },
  { icon: Calendar, label: "Availability", value: "Open to opportunities", href: "#" },
];

export function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("success");
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <section
      id="contact"
      className="relative flex min-h-screen flex-col items-start justify-center px-6 py-16 text-fg"
    >
      <div className="relative z-10 flex w-full max-w-4xl flex-col gap-10">
        <div className="relative inline-block">
          <h2 className="font-caveat text-[clamp(2.5rem,7vw,4rem)] font-bold text-accent">
            get in <span className="text-fg">touch</span>
          </h2>
          <svg
            className="pointer-events-none absolute -bottom-1.5 left-[-4px] h-4 w-full"
            viewBox="0 0 300 16"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 10 Q 80 2, 150 8 T 296 6"
              stroke="var(--color-accent)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <p className="text-muted-foreground max-w-2xl text-left text-sm tracking-wide text-balance md:text-base">
          Have a project in mind or just want to say hi? I&apos;d love to hear from you.
          Fill out the form or reach out directly through any of the channels below.
        </p>

        <div className="w-full grid gap-8 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Name"
                  required
                  className="w-full rounded-lg border border-accent-muted/50 bg-surface/50 px-4 py-3 text-fg placeholder:text-fg/40 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Email"
                  required
                  className="w-full rounded-lg border border-accent-muted/50 bg-surface/50 px-4 py-3 text-fg placeholder:text-fg/40 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Message"
                rows={5}
                required
                className="w-full rounded-lg border border-accent-muted/50 bg-surface/50 px-4 py-3 text-fg placeholder:text-fg/40 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={status === "submitting" || status === "success"}
              className="self-start rounded-full bg-accent px-8 py-3 text-sm font-medium text-surface transition-colors hover:bg-accent-muted disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? "Sending..." : status === "success" ? "Sent!" : "Send Message"}
            </button>
          </form>

          <div className="flex flex-col gap-6">
            <div className="space-y-4">
              {contactInfo.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 rounded-lg border border-accent-muted/50 bg-surface/50 p-4 transition-all hover:border-accent/50 hover:bg-surface/70"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-fg/60 uppercase tracking-wider">{item.label}</p>
                    <p className="text-fg">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="rounded-2xl border border-accent-muted/50 bg-surface/50 p-6">
              <p className="font-caveat text-xl font-bold text-accent mb-3">Book a call</p>
              <p className="text-muted-foreground text-sm mb-4">
                Let&apos;s discuss your project, collaboration ideas, or just grab a virtual coffee.
              </p>
              <a
                href="https://cal.com/mohand-darwish"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-accent px-5 py-2.5 font-medium transition-colors hover:border-accent-muted hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Calendar className="h-4 w-4" />
                Schedule a meeting
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
