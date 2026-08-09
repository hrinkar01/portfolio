"use client";

export default function ContactFooter() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-white/10"
    >
      {/* Technical background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,106,61,0.9) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-ember/10 blur-[100px]"
      />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        {/* Main CTA */}
        <div className="py-28 text-center sm:py-36">
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-ember/50" />

            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-ember">
              Contact Me
            </span>

            <span className="h-px w-10 bg-ember/50" />
          </div>

          <h2 className="mx-auto max-w-4xl font-mono text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Let&apos;s build something
            <span className="block text-ember">
              interesting.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-xl text-sm leading-relaxed text-mist sm:text-base">
            Have an idea, project, collaboration, or just something
            interesting to talk about? I&apos;m always open to building
            and experimenting with new ideas.
          </p>

          {/* CTA */}
          <a
            href="mailto:your@email.com"
            className="group mt-10 inline-flex items-center gap-3 rounded-full border border-ember/50 bg-ember/10 px-7 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-ember transition-all duration-300 hover:bg-ember hover:text-black"
          >
            Get in touch

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>

        {/* Social links */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex flex-wrap justify-center gap-6 font-mono text-xs uppercase tracking-wider">
              <a
                href="https://github.com/hrinkar01"
                target="_blank"
                rel="noopener noreferrer"
                className="text-mist transition-colors hover:text-ember"
              >
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/hrinkar-bothra-360093308/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-mist transition-colors hover:text-ember"
              >
                LinkedIn
              </a>

              <a
                href="mailto:hrinkar16@gmail.com"
                className="text-mist transition-colors hover:text-ember"
              >
                Email
              </a>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-mist/60">
              <span className="h-1.5 w-1.5 rounded-full bg-ember shadow-[0_0_8px_rgba(255,106,61,0.8)]" />
              Available for interesting projects
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 font-mono text-[10px] uppercase tracking-widest text-mist/40 sm:flex-row">
          <span>HRINKAR BOTHRA</span>

          <span>
            © {new Date().getFullYear()} — Built with curiosity
          </span>

          <span></span>
        </div>
      </div>
    </footer>
  );
}