"use client";

import { useState } from "react";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hrinkar16@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="contact" className="section contact-section-enhanced">
      <div className="contact-inner-wrap">
        <div className="contact-header-block">
          <h2 className="section-title">05. Contact</h2>
          <h3 className="contact-headline">Let&apos;s build something remarkable together.</h3>
          <p className="contact-subtitle">
            Whether you have an ambitious hardware/IoT system, open-source collaboration, or software engineering role in mind — my inbox is always open.
          </p>
        </div>

        <div className="contact-cards-grid">
          {/* Card 1: Direct Messaging & Email */}
          <div className="contact-card contact-card-primary">
            <div className="contact-card-header">
              <span className="contact-card-icon">✉️</span>
              <div>
                <h4 className="contact-card-title">Email &amp; Direct Message</h4>
                <p className="contact-card-desc">Fastest way to get in touch</p>
              </div>
            </div>
            <a href="mailto:hrinkar16@gmail.com" className="contact-main-link">
              hrinkar16@gmail.com
            </a>
            <div className="contact-actions-row">
              <a
                href="mailto:hrinkar16@gmail.com?subject=Hello%20Hrinkar!&body=Hi%20Hrinkar,%20I%20saw%20your%20portfolio..."
                className="contact-btn-primary"
              >
                Say Hello &rarr;
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="contact-btn-secondary"
                aria-label="Copy email address"
              >
                {copied ? "✓ Copied!" : "📋 Copy"}
              </button>
            </div>
          </div>

          {/* Card 2: Location & Availability */}
          <div className="contact-card">
            <div className="contact-card-header">
              <span className="contact-card-icon">📍</span>
              <div>
                <h4 className="contact-card-title">Location &amp; Availability</h4>
                <p className="contact-card-desc">Udaipur, Rajasthan, India</p>
              </div>
            </div>
            <div className="contact-info-list">
              <div className="contact-info-item">
                <span className="contact-status-indicator" />
                <span className="contact-info-text">Open for Full-Time Roles &amp; Contracts</span>
              </div>
              <div className="contact-info-item">
                <span className="contact-muted-icon">🕒</span>
                <span className="contact-info-text">IST (UTC+5:30) · Global Remote Ready</span>
              </div>
              <div className="contact-info-item">
                <span className="contact-muted-icon">📞</span>
                <a href="tel:+916376123778" className="contact-tel-link">
                  +91 6376123778
                </a>
              </div>
            </div>
          </div>

          {/* Card 3: Developer & Social Networks */}
          <div className="contact-card">
            <div className="contact-card-header">
              <span className="contact-card-icon">🌐</span>
              <div>
                <h4 className="contact-card-title">Developer &amp; Networks</h4>
                <p className="contact-card-desc">Explore codebase &amp; profile</p>
              </div>
            </div>
            <div className="contact-links-grid">
              <a
                href="https://github.com/hrinkar01"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-tile"
              >
                <div className="social-tile-main">
                  <span className="social-name">GitHub</span>
                  <span className="social-sub">@hrinkar01</span>
                </div>
                <span className="social-arrow">&rarr;</span>
              </a>

              <a
                href="https://linkedin.com/in/hrinkar-bothra-360093308/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-tile"
              >
                <div className="social-tile-main">
                  <span className="social-name">LinkedIn</span>
                  <span className="social-sub">Hrinkar Bothra</span>
                </div>
                <span className="social-arrow">&rarr;</span>
              </a>
            </div>
          </div>
        </div>

        {/* Seamless Integrated Footer */}
        <footer className="footer-integrated">
          <p className="footer-tagline">
            Designed &amp; Engineered by <strong>Hrinkar Bothra</strong> &middot; Built with Next.js &amp; TypeScript
          </p>
          <div className="footer-meta-row">
            <span>&copy; 2026 Hrinkar Bothra</span>
            <span className="footer-sep">&middot;</span>
            <a href="#hero" className="footer-top-link">
              Back to top &uarr;
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}
