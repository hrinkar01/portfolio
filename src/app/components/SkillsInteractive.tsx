"use client";

import { useState, useMemo } from "react";

interface SkillItem {
  name: string;
  isCore?: boolean;
  projectNote?: string;
  category: string;
}

interface SkillCategory {
  id: string;
  title: string;
  tag: string;
  icon: string;
  summary: string;
  featured?: boolean;
  skills: SkillItem[];
}

const CATEGORIES: SkillCategory[] = [
  {
    id: "hardware",
    title: "Hardware & Embedded IoT",
    tag: "SIH '25 Champion",
    icon: "⚡",
    summary: "Microcontrollers, radio mesh telemetry, and edge sensor protocols",
    featured: true,
    skills: [
      { name: "Raspberry Pi (0, 3, 4, 5, Pico)", isCore: true, projectNote: "ResQ (SIH '25) & Memoraid", category: "hardware" },
      { name: "ESP32 & ESP8266", isCore: true, projectNote: "ResQ Mesh Fabric", category: "hardware" },
      { name: "LoRa & ESP-Mesh", isCore: true, projectNote: "Zero-Internet Disaster Network", category: "hardware" },
      { name: "Arduino (Uno, Mega, WiFi, Nano)", category: "hardware" },
      { name: "Digispark & ATTiny", category: "hardware" },
      { name: "I2C / SPI OLED Displays", projectNote: "Memoraid & ResQ Field UI", category: "hardware" },
      { name: "Environmental & Gas Sensors", projectNote: "Toxic Gas & Seismic Telemetry", category: "hardware" },
    ],
  },
  {
    id: "languages",
    title: "Programming Languages",
    tag: "Systems & Scripting",
    icon: "💻",
    summary: "Systems programming, concurrency, and performance scripting",
    skills: [
      { name: "Python", isCore: true, projectNote: "OWASP BLT, REWIND, Memoraid", category: "languages" },
      { name: "C", isCore: true, projectNote: "Low-level firmware & memory control", category: "languages" },
      { name: "C++", isCore: true, projectNote: "Embedded optimization & systems code", category: "languages" },
      { name: "JavaScript (ES6+)", isCore: true, projectNote: "OWASP BLT leaderboards & tools", category: "languages" },
      { name: "TypeScript", projectNote: "Typed architecture & web apps", category: "languages" },
      { name: "Assembly", projectNote: "Microcontroller architecture & reverse engineering", category: "languages" },
    ],
  },
  {
    id: "aiml",
    title: "AI / ML & Edge Intelligence",
    tag: "On-Device Inference",
    icon: "🧠",
    summary: "Machine learning, offline speech pipelines, and edge model inference",
    skills: [
      { name: "PyTorch", isCore: true, projectNote: "Neural Radiance Fields & models", category: "aiml" },
      { name: "TensorFlow", isCore: true, projectNote: "Edge inference & training", category: "aiml" },
      { name: "Local LLM Inference", isCore: true, projectNote: "ResQ Offline Multilingual AI", category: "aiml" },
      { name: "Offline Speech Recognition (ASR)", isCore: true, projectNote: "Memoraid Audio Pipeline", category: "aiml" },
      { name: "Scikit-learn", category: "aiml" },
      { name: "NumPy & Pandas", category: "aiml" },
      { name: "Matplotlib & Seaborn", category: "aiml" },
    ],
  },
  {
    id: "web",
    title: "Web & Backend Architecture",
    tag: "High-Throughput",
    icon: "🌐",
    summary: "High-speed APIs, asynchronous services, and responsive web systems",
    skills: [
      { name: "Next.js", isCore: true, projectNote: "High-performance React applications", category: "web" },
      { name: "React", isCore: true, category: "web" },
      { name: "FastAPI", isCore: true, projectNote: "Async microservices & REST endpoints", category: "web" },
      { name: "Flask", category: "web" },
      { name: "WebSockets & Sockets", isCore: true, projectNote: "REWIND live state streaming", category: "web" },
      { name: "REST APIs Architecture", projectNote: "OWASP BLT API integrations", category: "web" },
      { name: "Tailwind CSS", category: "web" },
    ],
  },
  {
    id: "tools",
    title: "Developer Tools & DevOps",
    tag: "Automation & QA",
    icon: "🛠️",
    summary: "Automated testing suites, container isolation, and CI/CD pipelines",
    skills: [
      { name: "Git & GitHub", isCore: true, projectNote: "Open Source contributions at OWASP", category: "tools" },
      { name: "Docker", isCore: true, projectNote: "Isolated environment virtualization", category: "tools" },
      { name: "Pytest & Unit Testing", isCore: true, projectNote: "OWASP BLT CI test suites", category: "tools" },
      { name: "GitHub Actions / CI-CD", projectNote: "Automated scraper pipelines", category: "tools" },
      { name: "Reverse Engineering", projectNote: "Firmware extraction & analysis", category: "tools" },
      { name: "VS Code & Jupyter", category: "tools" },
    ],
  },
  {
    id: "os",
    title: "Operating Systems & Shell",
    tag: "POSIX & Embedded",
    icon: "🐧",
    summary: "Unix foundations, embedded Linux environments, and shell automation",
    skills: [
      { name: "Linux (Kali, Parrot OS, Ubuntu)", isCore: true, projectNote: "Primary development & pentesting platform", category: "os" },
      { name: "Raspberry Pi OS", isCore: true, projectNote: "Edge appliance OS tuning", category: "os" },
      { name: "Linux Shell Scripting (Bash)", isCore: true, projectNote: "Build automation & deployment scripts", category: "os" },
      { name: "MacOS", category: "os" },
      { name: "Windows", category: "os" },
    ],
  },
];

export default function SkillsInteractive() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeSkillHover, setActiveSkillHover] = useState<SkillItem | null>(null);

  // Filter categories and skills based on search query and active tab
  const filteredCategories = useMemo(() => {
    return CATEGORIES.map((cat) => {
      // Check tab filter
      if (activeTab !== "all" && cat.id !== activeTab) {
        return null;
      }

      // Check search filter
      if (!searchQuery.trim()) {
        return cat;
      }

      const q = searchQuery.toLowerCase();
      const matchingSkills = cat.skills.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          (s.projectNote && s.projectNote.toLowerCase().includes(q))
      );

      if (matchingSkills.length > 0 || cat.title.toLowerCase().includes(q)) {
        return {
          ...cat,
          skills: matchingSkills.length > 0 ? matchingSkills : cat.skills,
        };
      }

      return null;
    }).filter(Boolean) as SkillCategory[];
  }, [activeTab, searchQuery]);

  // Total count of all skills
  const totalSkillsCount = useMemo(() => {
    return CATEGORIES.reduce((acc, cat) => acc + cat.skills.length, 0);
  }, []);

  return (
    <div className="bento-skills-container">
      {/* Top Controls: Filter Pills & Search Box */}
      <div className="bento-skills-header">
        <div className="bento-tab-strip">
          <button
            type="button"
            className={`bento-tab-btn ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All <span className="tab-count-bubble">{totalSkillsCount}</span>
          </button>
          <button
            type="button"
            className={`bento-tab-btn ${activeTab === "hardware" ? "active" : ""}`}
            onClick={() => setActiveTab("hardware")}
          >
            <span>⚡</span> Hardware &amp; IoT
          </button>
          <button
            type="button"
            className={`bento-tab-btn ${activeTab === "languages" ? "active" : ""}`}
            onClick={() => setActiveTab("languages")}
          >
            <span>💻</span> Languages
          </button>
          <button
            type="button"
            className={`bento-tab-btn ${activeTab === "aiml" ? "active" : ""}`}
            onClick={() => setActiveTab("aiml")}
          >
            <span>🧠</span> AI / ML
          </button>
          <button
            type="button"
            className={`bento-tab-btn ${activeTab === "web" ? "active" : ""}`}
            onClick={() => setActiveTab("web")}
          >
            <span>🌐</span> Web &amp; Backend
          </button>
          <button
            type="button"
            className={`bento-tab-btn ${activeTab === "tools" ? "active" : ""}`}
            onClick={() => setActiveTab("tools")}
          >
            <span>🛠️</span> Dev Tools
          </button>
          <button
            type="button"
            className={`bento-tab-btn ${activeTab === "os" ? "active" : ""}`}
            onClick={() => setActiveTab("os")}
          >
            <span>🐧</span> OS &amp; Shell
          </button>
        </div>

        {/* Live Filter Search Input */}
        <div className="bento-search-box">
          <span className="bento-search-icon">🔍</span>
          <input
            type="text"
            className="bento-search-input"
            placeholder="Search skills (e.g. Python, ESP32)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="bento-search-clear"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Dynamic Contextual Tooltip Strip */}
      <div className={`bento-proof-strip ${activeSkillHover?.projectNote ? "visible" : ""}`}>
        <span className="bento-proof-badge">ENGINEERING APPLICATION</span>
        <span className="bento-proof-tech">{activeSkillHover?.name}</span>
        <span className="bento-proof-arrow">&rarr;</span>
        <span className="bento-proof-detail">
          {activeSkillHover?.projectNote || "Core engineering proficiency"}
        </span>
      </div>

      {/* Asymmetric Bento Grid */}
      <div className="bento-skills-grid">
        {filteredCategories.length === 0 ? (
          <div className="bento-empty-state">
            <span className="empty-icon">🔎</span>
            <p className="empty-title">No matching skills found for &ldquo;{searchQuery}&rdquo;</p>
            <button
              type="button"
              className="proj-action-btn primary"
              onClick={() => {
                setSearchQuery("");
                setActiveTab("all");
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredCategories.map((category) => {
            const isFeatured = category.featured && activeTab === "all";

            return (
              <div
                key={category.id}
                className={`bento-card ${isFeatured ? "bento-card-featured" : ""}`}
              >
                {/* Clean Header */}
                <div className="bento-card-header">
                  <div className="bento-card-title-group">
                    <span className="bento-card-icon">{category.icon}</span>
                    <div>
                      <h3 className="bento-card-title">{category.title}</h3>
                      <p className="bento-card-summary">{category.summary}</p>
                    </div>
                  </div>
                  <span className="bento-card-tag">{category.tag}</span>
                </div>

                {/* Chips Grid — Tight & Balanced with 0 Wasted Space */}
                <div className="bento-chips-wrap">
                  {category.skills.map((skill) => {
                    const isHovered = activeSkillHover?.name === skill.name;
                    const isMatch =
                      searchQuery.trim().length > 0 &&
                      skill.name.toLowerCase().includes(searchQuery.toLowerCase());

                    return (
                      <button
                        type="button"
                        key={skill.name}
                        className={`bento-skill-chip ${isHovered ? "hovered" : ""} ${
                          isMatch ? "matched" : ""
                        }`}
                        onMouseEnter={() => setActiveSkillHover(skill)}
                        onMouseLeave={() => setActiveSkillHover(null)}
                        onClick={() => setActiveSkillHover(skill)}
                        title={skill.projectNote ? `Used in: ${skill.projectNote}` : skill.name}
                      >
                        <span className="bento-chip-label">{skill.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
