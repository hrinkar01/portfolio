import GallerySection from "./components/GallerySection";
import HeroAnimated from "./components/HeroAnimated";
import SkillsInteractive from "./components/SkillsInteractive";
import PullRequestsList from "./components/PullRequestsList";

export default function Home() {
  return (
    <div className="container">
      {/* Fullscreen Hero Landing Area (Takes full screen so only Hero is visible above the fold) */}
      <div className="hero-fullscreen">
        {/* Header */}
        <header className="nav-header">
          <div className="logo">
            <span>~/</span>hrinkar
          </div>

          {/* Social Icons top-right */}
          <div className="nav-socials">
            <a
              href="https://github.com/hrinkar01"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter / X"
            >
              <svg viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/hrinkar-bothra-360093308/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </header>

        {/* Dynamic Animated Hero Section */}
        <HeroAnimated />

        {/* Scroll Cue to hint scrolling below */}
        <div className="hero-scroll-cue">
          <a href="#about" aria-label="Scroll to About Me">
            <span className="scroll-cue-text">EXPLORE WORK</span>
            <span className="scroll-cue-arrow">↓</span>
          </a>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="section">
        <h2 className="section-title">01. About Me</h2>
        <div className="about-body">
          <p className="about-lead">
            I build to <span className="about-highlight">solve real problems</span> — whether it&apos;s embedded hardware, IoT systems, or full-stack software. I believe great engineering is invisible; it just works.
          </p>
          <p className="about-secondary">
            Currently, I&apos;m an active open-source contributor to the{" "}
            <a href="https://owasp.org/www-project-bug-logging-tool/" target="_blank" rel="noopener noreferrer">
              OWASP Bug Logging Tool (BLT)
            </a>
            {" "}project — building security-focused tooling used by researchers and developers worldwide.
          </p>
          <div className="achievements">
            <div className="achievement-card">
              <span className="achievement-badge">🏆</span>
              <div>
                <p className="achievement-title">Smart India Hackathon 2025 — Grand Finale Winner</p>
                <p className="achievement-desc">National-level hackathon by Govt. of India (Hardware Edition). 1st place with Team DEEP SIGHT, awarded ₹1,50,000 top prize.</p>
              </div>
            </div>

            <div className="achievement-card">
              <span className="achievement-badge">🥇</span>
              <div>
                <p className="achievement-title">National IDEATHON &apos;24 — 1st Position &amp; Gold Medal</p>
                <p className="achievement-desc">Secured 1st place and gold medal leading Team Innovate X at the National-Level IDEATHON &apos;24 competition.</p>
              </div>
            </div>
            <div className="achievement-card">
              <span className="achievement-badge">🌍</span>
              <div>
                <p className="achievement-title">OWASP Open Source Contributor</p>
                <p className="achievement-desc">Actively contributing to the OWASP Bug Logging Tool (BLT) — building security-focused open-source software used globally.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section">
        <h2 className="section-title">02. Skills &amp; Technologies</h2>
        <SkillsInteractive />
      </section>

      {/* Projects Section */}
      <section id="projects" className="section">
        <h2 className="section-title">03. Featured Projects</h2>

        <div className="projects-bento">
          {/* Flagship Hero Card: ResQ — SIH '25 National Winner */}
          <article className="project-card project-card-featured">
            <div className="featured-card-header">
              <div className="featured-title-wrap">
                <span className="project-subhead">
                  <span className="kicker-pulse-dot" />
                  FLAGSHIP IOT PLATFORM · HARDWARE EDITION
                </span>
                <h3 className="featured-title">ResQ — IoT Disaster Emergency Network</h3>
              </div>
              <span className="project-badge highlight-badge">
                🏆 SIH &apos;25 GRAND FINALE WINNER
              </span>
            </div>

            <p className="project-lead">
              National award-winning zero-internet disaster emergency fabric engineered for active crisis zones. Combines decentralized mesh telemetry, long-range LoRa radio networks, and on-device offline multilingual AI.
            </p>

            <div className="featured-content-split">
              <ul className="project-bullets">
                <li>
                  <strong>Resilient Mesh Radio Fabric:</strong> Hybrid ESP-Mesh and LoRa protocol maintaining robust multi-hop communication across zero-internet disaster perimeters.
                </li>
                <li>
                  <strong>Distributed Environmental Telemetry:</strong> Autonomous edge sensor nodes for continuous environmental telemetry, toxic hazard detection, and autonomous alerts.
                </li>
                <li>
                  <strong>Decentralized LLM Terminal:</strong> Raspberry Pi field terminal running on-device multilingual LLM inference (Hindi, English, Tamil) for real-time triage without internet.
                </li>
              </ul>

              <div className="featured-metrics-card">
                <div className="metric-box">
                  <span className="metric-num">₹1,50,000</span>
                  <span className="metric-label">1st Place Top Prize</span>
                </div>
                <div className="metric-box">
                  <span className="metric-num">Govt. of India</span>
                  <span className="metric-label">Grand Finale Champion</span>
                </div>
                <div className="metric-box">
                  <span className="metric-num">Zero-Internet</span>
                  <span className="metric-label">Hardware Edge Fabric</span>
                </div>
              </div>
            </div>

            <div className="project-card-footer">
              <div className="project-tags">
                <span className="tag highlight-tag">ESP32 &amp; ESP-Mesh</span>
                <span className="tag highlight-tag">Long-Range LoRa</span>
                <span className="tag">Raspberry Pi</span>
                <span className="tag">Python</span>
                <span className="tag">Local LLM</span>
                <span className="tag">Hardware Embedded</span>
              </div>
              <div className="project-links">
                <a href="#gallery" className="proj-action-btn primary">
                  View in Gallery ↗
                </a>
                <a
                  href="https://github.com/hrinkar01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="proj-action-btn"
                >
                  Source Code ↗
                </a>
              </div>
            </div>
          </article>

          {/* Dual Projects Subgrid: REWIND & Memoraid */}
          <div className="projects-subgrid">
            {/* Project 2: REWIND */}
            <article className="project-card subgrid-card">
              <div className="card-content-top">
                <div className="project-header-top">
                  <div>
                    <span className="project-subhead">SYSTEMS &amp; TOOLING</span>
                    <h3 className="subgrid-card-title">REWIND — Time-Travel Debugger</h3>
                  </div>
                  <span className="project-badge">SYSTEMS TOOL</span>
                </div>
                <p className="project-lead">
                  High-speed deterministic debugging engine that records memory execution state snapshots, allowing developers to visually scrub backward through code execution history to isolate root causes.
                </p>
                <ul className="project-bullets">
                  <li>
                    <strong>Sub-Millisecond State Diffing:</strong> Recursive differential state analyzer detecting added, modified, and removed variables across nested structures in &lt; 0.001s.
                  </li>
                  <li>
                    <strong>Hot-Code In-Memory Sandbox:</strong> Browser-driven execution sandbox to patch and test multi-line runtime fixes in 0.5ms without restarting the program.
                  </li>
                  <li>
                    <strong>Polyglot CLI &amp; Process Tracing:</strong> Zero-config tracing for Python, Rust, C++, Go, and Docker workloads with live panic capture.
                  </li>
                </ul>
              </div>
              <div className="card-content-bottom">
                <div className="project-tags">
                  <span className="tag">Python</span>
                  <span className="tag">Systems Programming</span>
                  <span className="tag">Concurrency</span>
                  <span className="tag">Sockets</span>
                  <span className="tag">CLI</span>
                </div>
                <div className="project-links">
                  <a
                    href="https://github.com/hrinkar01/rewind"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="proj-action-btn"
                  >
                    Source Code ↗
                  </a>
                </div>
              </div>
            </article>

            {/* Project 3: Memoraid */}
            <article className="project-card subgrid-card">
              <div className="card-content-top">
                <div className="project-header-top">
                  <div>
                    <span className="project-subhead">EDGE AI &amp; WEARABLE</span>
                    <h3 className="subgrid-card-title">Memoraid — Wearable Memory Aid</h3>
                  </div>
                  <span className="project-badge">EDGE AI</span>
                </div>
                <p className="project-lead">
                  Localized, privacy-first wearable Raspberry Pi device engineered to mitigate short-term memory loss in dementia patients through ambient speech logging and recall.
                </p>
                <ul className="project-bullets">
                  <li>
                    <strong>Offline Speech Pipeline:</strong> 100% on-device local Speech-to-Text conversation logging, completely eliminating cloud data leaks.
                  </li>
                  <li>
                    <strong>Micro-Query Recall Engine:</strong> Fast contextual query engine paired with an embedded OLED display for time-sensitive conversation retrieval.
                  </li>
                  <li>
                    <strong>Edge Hardware Optimization:</strong> Streamlined storage pipelines enabling 24/7 continuous operation on constrained Raspberry Pi nodes.
                  </li>
                </ul>
              </div>
              <div className="card-content-bottom">
                <div className="project-tags">
                  <span className="tag">Raspberry Pi</span>
                  <span className="tag">Python</span>
                  <span className="tag">Offline ASR</span>
                  <span className="tag">OLED Display</span>
                  <span className="tag">Edge Computing</span>
                </div>
                <div className="project-links">
                  <a
                    href="https://github.com/hrinkar01"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="proj-action-btn"
                  >
                    Source Code ↗
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Open Source Contributions Section */}
      <section id="opensource" className="section">
        <h2 className="section-title">04. Open Source Contributions</h2>
        <div className="oss-card">
          <div className="oss-header">
            <div className="oss-org-badge">
              <span className="oss-org-logo">🛡️</span>
              <span className="oss-org-name">OWASP — Bug Logging Tool (BLT)</span>
            </div>
            <span className="oss-status-pill">● Active Contributor &amp; GSoC Aspirant</span>
          </div>

          <p className="oss-lead-desc">
            Actively contributing to the OWASP Bug Logging Tool (BLT) ecosystem — a global cybersecurity platform enabling ethical hackers, pentesters, and organizations to report, verify, and track security vulnerabilities.
          </p>

          <PullRequestsList />

          <div className="oss-footer-actions">
            <div className="oss-tech-tags">
              <span className="tag">Python</span>
              <span className="tag">Cloudflare Workers</span>
              <span className="tag">Cryptography</span>
              <span className="tag">Pytest</span>
              <span className="tag">urllib.parse</span>
              <span className="tag">Gitea API</span>
            </div>
            <div className="oss-links-row">
              <a href="https://git.owaspblt.org/BLT" target="_blank" rel="noopener noreferrer">
                OWASP/BLT &rarr;
              </a>
              <a href="https://github.com/OWASP/BLT/commits?author=hrinkar01" target="_blank" rel="noopener noreferrer">
                My Commits &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <GallerySection />

      {/* Contact Section */}
      <section id="contact" className="section">
        <h2 className="section-title">06. Contact</h2>
        <div className="contact-list">
          <div className="contact-item">
            <span className="contact-label">Email:</span>
            <a href="mailto:hrinkar16@gmail.com">hrinkar16@gmail.com</a>
          </div>
          <div className="contact-item">
            <span className="contact-label">Phone:</span>
            <a href="tel:+916376123778">+91 6376123778</a>
          </div>
          <div className="contact-item">
            <span className="contact-label">Location:</span>
            <span style={{ color: "var(--text-muted)" }}>Sector 4, Udaipur (Rajasthan), India</span>
          </div>
          <div className="contact-item">
            <span className="contact-label">GitHub:</span>
            <a href="https://github.com/hrinkar01" target="_blank" rel="noopener noreferrer">github.com/hrinkar01</a>
          </div>
          <div className="contact-item">
            <span className="contact-label">LinkedIn:</span>
            <a href="https://linkedin.com/in/hrinkar-bothra-360093308/" target="_blank" rel="noopener noreferrer">linkedin.com/in/hrinkar-bothra-360093308</a>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-logo">~/hrinkar</span>
            <span className="footer-status-dot">●</span>
            <span className="footer-status-text">All systems operational</span>
          </div>
          <p className="footer-tagline">
            Designed &amp; Engineered by <strong>Hrinkar Bothra</strong> &middot; Built with Next.js &amp; TypeScript
          </p>
          <div className="footer-meta-row">
            <span>&copy; 2026 Hrinkar Bothra</span>
            <span className="footer-sep">&middot;</span>
            <span>Udaipur, Rajasthan, India</span>
            <span className="footer-sep">&middot;</span>
            <a href="#about" className="footer-top-link">Back to top &uarr;</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
