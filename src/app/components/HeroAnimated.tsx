"use client";

import { useEffect, useState, useRef, useCallback } from "react";

const ROLES = [
  "SOFTWARE ENGINEER",
  "Smart India Hackathon '25 WINNER",
  "OWASP BLT CONTRIBUTOR",
  "IOT & EMBEDDED SYSTEM BUILDER",
  "GITS IDEATHON '24 WINNER",
];

const SCRAMBLE_GLYPHS = "01#@$%&*!?<>_[]{}/\\=+~^";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

export default function HeroAnimated() {
  const [displayedText, setDisplayedText] = useState(ROLES[0]);
  const [isScrambling, setIsScrambling] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

  // Parallax scroll tracking
  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Refs for timing control without stale closures
  const roleIndexRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearScrambleTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Matrix Scramble cipher decryption transition
  const triggerScramble = useCallback((nextIdx: number) => {
    clearScrambleTimer();
    roleIndexRef.current = nextIdx;
    const targetText = ROLES[nextIdx];
    const targetChars = Array.from(targetText);
    const targetLen = targetChars.length;
    setIsScrambling(true);

    let step = 0;
    const totalSteps = 16;

    intervalRef.current = setInterval(() => {
      step++;
      const resolved = Math.floor((step / totalSteps) * targetLen);

      let res = "";
      for (let i = 0; i < targetLen; i++) {
        if (i < resolved) {
          res += targetChars[i];
        } else {
          res += SCRAMBLE_GLYPHS[Math.floor(Math.random() * SCRAMBLE_GLYPHS.length)];
        }
      }
      setDisplayedText(res);

      if (step >= totalSteps) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        setDisplayedText(targetText);
        setIsScrambling(false);
      }
    }, 28);
  }, []);

  // Hover to re-scramble cipher wave
  const handleHoverScramble = () => {
    if (!isScrambling) {
      triggerScramble(roleIndexRef.current);
    }
  };

  // Initial scramble on mount + auto-rotate every 3.5 seconds
  useEffect(() => {
    const initialTimer = setTimeout(() => {
      triggerScramble(0);
    }, 600);

    const autoTimer = setInterval(() => {
      const nextIdx = (roleIndexRef.current + 1) % ROLES.length;
      triggerScramble(nextIdx);
    }, 3600);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(autoTimer);
      clearScrambleTimer();
    };
  }, [triggerScramble]);

  // Particle constellation interactive background canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    const particleCount = Math.min(32, Math.floor(width / 35));
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        size: Math.random() * 1.8 + 1,
        alpha: Math.random() * 0.4 + 0.15,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            const lineAlpha = (1 - dist / 110) * 0.12;
            ctx.strokeStyle = `rgba(48, 71, 94, ${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles & update positions
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Subtle interactive mouse repulsion
        if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
          const mdx = p.x - mouseRef.current.x;
          const mdy = p.y - mouseRef.current.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < 90 && mDist > 0) {
            const force = (1 - mDist / 90) * 0.7;
            p.x += (mdx / mDist) * force;
            p.y += (mdy / mDist) * force;
          }
        }

        ctx.fillStyle = i % 5 === 0 ? `rgba(240, 84, 84, ${p.alpha * 1.3})` : `rgba(221, 221, 221, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseRef.current = { x, y };
    heroRef.current.style.setProperty("--mouse-x", `${x}px`);
    heroRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: null, y: null };
  };

  const triggerGalleryModal = (itemId: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("open-gallery-item", {
          detail: { id: itemId },
        })
      );
    }
  };

  return (
    <section
      className="hero hero-animated-section"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translateY(${Math.min(scrollY * 0.28, 120)}px)`,
        opacity: Math.max(1 - scrollY / 650, 0.15),
      }}
    >
      {/* Background canvas for connected particle constellation */}
      <canvas ref={canvasRef} className="hero-particle-canvas" />

      {/* Dynamic Ambient Glow Orb behind the content */}
      <div className="hero-ambient-glow" />

      {/* Cyberpunk Matrix Scramble Role Header */}
      <div className="hero-tag-interactive">
        <span className="hero-tag-prefix">&gt;</span>
        <span
          className={`hero-tag-text scramble-text ${isScrambling ? "scrambling" : ""}`}
          onMouseEnter={handleHoverScramble}
          title="Hover to re-scramble cipher"
        >
          {displayedText}
        </span>
        <span className="hero-tag-cursor">_</span>
      </div>

      {/* Main Hero Title */}
      <h1 className="hero-title">
        Hi, I&apos;m <span>Hrinkar Bothra</span>
      </h1>

      {/* Key Accolade Highlights Chips */}
      <div className="hero-badges-strip">
        <button
          type="button"
          className="hero-badge-chip"
          onClick={() => triggerGalleryModal("sih-2025-winner")}
          title="Click to view: Smart India Hackathon 2025 — Grand Finale Winner"
        >
          <span className="badge-chip-icon">🏆</span>
          <span className="badge-chip-text">SIH &apos;25 Winner (₹1,50,000)</span>
        </button>
        <button
          type="button"
          className="hero-badge-chip"
          onClick={() => triggerGalleryModal("gits-ideathon-stage")}
          title="Click to view: IDEATHON '24 — Award Ceremony with Faculty"
        >
          <span className="badge-chip-icon">🥇</span>
          <span className="badge-chip-text">GITS IDEATHON &apos;24 Gold Winner</span>
        </button>
        <a
          href="#opensource"
          className="hero-badge-chip"
          title="Click to open OWASP Open Source Contribution section"
        >
          <span className="badge-chip-icon">🛡️</span>
          <span className="badge-chip-text">Active OWASP BLT Contributor</span>
        </a>
      </div>

      {/* Interactive Pill Buttons */}
      <div className="hero-actions">
        <a href="#about" className="pill-btn animated-pill">
          <span>ABOUT</span>
        </a>
        <a href="#skills" className="pill-btn animated-pill">
          <span>SKILLS</span>
        </a>
        <a href="#projects" className="pill-btn animated-pill">
          <span>PROJECTS</span>
        </a>
        <a href="#opensource" className="pill-btn animated-pill">
          <span>OPEN SOURCE</span>
        </a>
        <a href="#gallery" className="pill-btn animated-pill">
          <span>GALLERY</span>
        </a>
        <a href="#contact" className="pill-btn animated-pill">
          <span>CONTACT</span>
        </a>
      </div>
    </section>
  );
}
