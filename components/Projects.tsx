
"use client";

import { useEffect, useRef, useState } from "react";

type Project = {
  name: string;
  status: string;
  stack: string[];
  summary: string;
  bullets: string[];
  href?: string;
};

const PROJECTS: Project[] = [
  {
    name: "RepoLens",
    status: "In progress",
    stack: ["Python", "FastAPI", "Next.js", "SQLite", "Tree-sitter"],
    summary:
      "A local-first visual repository intelligence platform that helps developers understand unfamiliar codebases and contribute faster.",
    bullets: [
      "Interactive repository exploration, execution trace flow, and architecture visualization",
      "Dependency-aware blast radius analysis with ML-based change risk prediction",
      "Contributor onboarding: learning paths, key file discovery, semantic repo understanding",
      "Privacy-focused, fully offline execution model with modular extensibility",
    ],
    href: "https://github.com/hrinkar01/repolens",
  },
  {
    name: "ResQ",
    status: "2025 - SIH Winner (Hardware)",
    stack: ["IoT", "ESP-Mesh", "LoRa", "Raspberry Pi", "Python"],
    summary:
      "An IoT disaster-response platform covering pre-disaster prep, real-time emergency response, and recovery, built to run without internet.",
    bullets: [
      "Hybrid ESP-Mesh + LoRa comms fabric for resilient, internet-independent coordination",
      "Distributed edge nodes for continuous environmental sensing and automated hazard alerts",
      "Rugged Raspberry Pi touchscreen terminal for decentralized field operations",
      "Local LLM inference for offline multilingual (Hindi, English, Tamil) decision support",
    ],
  },
  {
    name: "Memoraid",
    status: "2025",
    stack: ["Raspberry Pi", "Python", "Offline ASR", "OLED Display"],
    summary:
      "A localized, privacy-first wearable that helps dementia patients hold onto short-term memory, no cloud involved.",
    bullets: [
      "Offline speech-to-text pipeline for continuous conversation logging, zero cloud data leaks",
      "Interactive OLED query engine for instant context retrieval and time-sensitive alerts",
      "Optimized storage/memory footprint for 24/7 logging on constrained edge hardware",
    ],
  },
  {
    name: "CheatCode",
    status: "2026",
    stack: ["ESP32", "OLED Display", "LLM"],
    summary:
      "Cheating Device based on ESP32",
    bullets: [
      "Save notes in organised manner in sd card, no matter how long they are.",
      "Supports both online and offline mode.",
      "Ask anything using voice input and get output on display.",
    ],
    href: "https://github.com/hrinkar01/cheatcode",
  },
];

function useInView(elementRef: React.RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = elementRef.current;

    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [elementRef]);

  return inView;
}

function ProjectCard({
  project,
  index,
  inView,
}: {
  project: Project;
  index: number;
  inView: boolean;
}) {
  const cardClass =
    "group relative rounded-xl border border-white/10 bg-white/[0.02] p-6 " +
    "transition-all duration-700 ease-out hover:border-ember/50 sm:p-8 " +
    (inView
      ? "translate-y-0 opacity-100"
      : "translate-y-8 opacity-0");

  return (
    <div
      style={{
        transitionDelay: inView ? `${index * 120}ms` : "0ms",
      }}
      className={cardClass}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="font-mono text-xl font-bold text-white sm:text-2xl">
          {project.name}
        </h3>

        <span className="rounded-full border border-ember/40 bg-ember/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-ember">
          {project.status}
        </span>
      </div>

      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mist sm:text-base">
        {project.summary}
      </p>

      <ul className="mt-5 space-y-2">
        {project.bullets.map((bullet) => (
          <li
            key={bullet}
            className="flex gap-3 text-sm text-mist/90"
          >
            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-ember/70" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-mist"
          >
            {tech}
          </span>
        ))}
      </div>

      {project.href && (
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-ember underline decoration-ember/60 underline-offset-4 transition-colors hover:text-white"
        >
          View repo
        </a>
      )}
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef);

  return (
    <section
  id="projects"
  ref={sectionRef}
  className="relative mx-auto w-full max-w-6xl px-6 pb-26 pt-9 lg:px-16"
>
      <div className="text-center">

        <h2 className="mt-3 font-mono text-3xl font-bold text-white sm:text-4xl">
          Projects
        </h2>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.name}
            project={project}
            index={index}
            inView={inView}
          />
        ))}
      </div>
    </section>
  );
}

