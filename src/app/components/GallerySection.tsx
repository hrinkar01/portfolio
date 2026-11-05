"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");

export const getAssetPath = (path: string) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
};

export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  category: "achievement" | "certificate" | "publication" | "event" | "extra";
  date: string;
  description: string;
  tags: string[];
  preferredWidth: number;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "sih-2025-winner",
    src: "/gallery/1-SIH_2025.jpeg",
    title: "Smart India Hackathon 2025 — Grand Finale Winner",
    shortTitle: "Smart India Hackathon '25",
    subtitle: "1st Prize · Team DEEP SIGHT · ₹1.5 Lakh",
    category: "achievement",
    date: "Dec 2025",
    description:
      "Secured 1st Place at the National Grand Finale of Smart India Hackathon 2025 (Hardware Edition). Represented Team 'DEEP SIGHT' at Bannari Amman Institute of Technology, winning the top prize of ₹1,50,000 cash grant awarded by the Ministry of Education, AICTE, and Persistent Systems.",
    tags: ["SIH 2025", "1st Prize", "₹1,50,000", "Hardware", "Govt of India"],
    preferredWidth: 280,
  },
  {
    id: "sih-2025-team",
    src: "/gallery/2-SIH_2025_TEAM.jpeg",
    title: "Team DEEP SIGHT — SIH Grand Finale Felicitation",
    shortTitle: "Grand Finale Felicitation",
    subtitle: "Cheque Ceremony on Main Stage",
    category: "event",
    date: "Dec 2025",
    description:
      "Team DEEP SIGHT on stage celebrating our 1st place victory and holding the ₹1,50,000 winning cheque during the SIH 2025 Grand Finale ceremony alongside dignitaries and organizers.",
    tags: ["Team DEEP SIGHT", "Stage Moment", "Felicitation"],
    preferredWidth: 440,
  },
  {
    id: "sih-2025-certificate",
    src: "/gallery/2-SIH_2025.jpeg",
    title: "SIH 2025 Winner Certificate & Nodal Badge",
    shortTitle: "SIH Winner Certificate",
    subtitle: "Ministry of Education & AICTE",
    category: "certificate",
    date: "Dec 2025",
    description:
      "Official Winner Certificate and Grand Finale student participant badge from the Ministry of Education Innovation Cell, AICTE, and Bannari Amman Institute of Technology nodal center.",
    tags: ["MoE", "AICTE", "Grand Finale", "Winner"],
    preferredWidth: 390,
  },
  {
    id: "nerf-paper",
    src: "/gallery/5-Review_Paper_on_NERF.jpeg",
    title: "Research Paper: Neural Radiance Fields (NeRF)",
    shortTitle: "Neural Radiance Fields (NeRF)",
    subtitle: "JETIR Journal Publication · UGC Approved",
    category: "publication",
    date: "June 2025",
    description:
      "Published research paper entitled 'Advancements in Neural Radiance Fields (NeRF): A Comprehensive Review of 3D Scene Reconstruction and Real-Time Rendering' in UGC-approved JETIR (ISSN: 2349-5162, 7.95 Impact Factor).",
    tags: ["Research Paper", "NeRF", "Computer Vision", "UGC Approved"],
    preferredWidth: 360,
  },
  {
    id: "lora-paper",
    src: "/gallery/4-Review_Paper_on_LORA_Technology.jpeg",
    title: "Conference Paper: LoRa Architecture & Protocols",
    shortTitle: "LoRa Architecture & Protocols",
    subtitle: "ICMART-2026 Conference · ACM / CSI",
    category: "publication",
    date: "April 2026",
    description:
      "Presented survey paper entitled 'A Comprehensive Survey on LoRa Technology: Architecture, Protocols & Application' at ICMART-2026, organized in association with ACM, Computer Society of India (CSI), and Institution of Engineers India (IEI).",
    tags: ["Conference Paper", "LoRa", "IoT", "ACM", "CSI"],
    preferredWidth: 360,
  },
  {
    id: "stanford-ml",
    src: "/gallery/1-Stanford_Online_Certificate.jpeg",
    title: "Supervised Machine Learning — Stanford Online",
    shortTitle: "Stanford Machine Learning",
    subtitle: "DeepLearning.AI · Andrew Ng",
    category: "certificate",
    date: "April 2025",
    description:
      "Completed certification in 'Supervised Machine Learning: Regression and Classification' taught by Andrew Ng, authorized by Stanford University and DeepLearning.AI via Coursera.",
    tags: ["Stanford", "Machine Learning", "DeepLearning.AI", "Andrew Ng"],
    preferredWidth: 380,
  },
  {
    id: "gits-ideathon-cert",
    src: "/gallery/3-GITS_Ideathon.jpeg",
    title: "IDEATHON '24 — 1st Position Certificate & Gold Medal",
    shortTitle: "IDEATHON '24 1st Prize",
    subtitle: "National Level Winner · Gold Medal",
    category: "achievement",
    date: "Sept 2024",
    description:
      "Awarded 1st Position Winner Certificate and 1st place Gold Medal in IDEATHON-2024 National Level Competition organized by Geetanjali Institute of Technical Studies (GITS), competing as team 'Innovate X'.",
    tags: ["1st Prize", "Gold Medal", "National Level", "Innovate X"],
    preferredWidth: 330,
  },
  {
    id: "gits-ideathon-stage",
    src: "/gallery/3-GITS_Ideathon_Winner.jpeg",
    title: "IDEATHON '24 — Award Ceremony with Faculty",
    shortTitle: "Team Innovate X On Stage",
    subtitle: "IDEATHON '24 Felicitation Ceremony",
    category: "event",
    date: "Sept 2024",
    description:
      "Team Innovate X receiving the 1st place awards on stage alongside institute directors, finance controllers, and faculty coordinators.",
    tags: ["Award Ceremony", "GITS", "Felicitation"],
    preferredWidth: 430,
  },
  {
    id: "singing-winner",
    src: "/gallery/4-College_Induction_Program_Winner_in_Singing.jpeg",
    title: "1st Prize Trophy — Cultural Induction Singing",
    shortTitle: "Induction Singing Trophy",
    subtitle: "1st Prize Cultural Winner · GITS",
    category: "extra",
    date: "2024–25",
    description:
      "1st place trophy awarded at the annual B.Tech Induction Programme for outstanding solo vocal performance in the university cultural competition.",
    tags: ["1st Prize", "Trophy", "Singing", "Cultural"],
    preferredWidth: 260,
  },
];

const categoryLabels: Record<GalleryItem["category"], string> = {
  achievement: "Wins & Awards",
  certificate: "Certifications",
  publication: "Research Papers",
  event: "Stage & Moments",
  extra: "Extracurricular",
};

const categoryColors: Record<GalleryItem["category"], string> = {
  achievement: "#f05454",
  certificate: "#38bdf8",
  publication: "#a78bfa",
  event: "#f59e0b",
  extra: "#10b981",
};

export default function GallerySection() {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const hasMoved = useRef(false);

  // Specifically arrange all 9 milestones into 2 visually balanced, staggered rows:
  const topRow: GalleryItem[] = [
    galleryItems[0], // SIH winner (narrow)
    galleryItems[1], // SIH team (wide)
    galleryItems[3], // NeRF paper (medium)
    galleryItems[6], // Ideathon cert (medium)
    galleryItems[8], // Singing trophy (narrow)
  ];
  const bottomRow: GalleryItem[] = [
    galleryItems[2], // SIH certificate (wide)
    galleryItems[4], // LoRa paper (medium)
    galleryItems[5], // Stanford ML (wide)
    galleryItems[7], // Ideathon stage (wide)
  ];

  // Scroll by offset button handler
  const scrollByAmount = (offset: number) => {
    if (!scrollerRef.current) return;
    scrollerRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  // Track scroll progress
  const updateScrollProgress = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      setScrollProgress(0);
    } else {
      setScrollProgress(Math.min(100, Math.max(0, (el.scrollLeft / maxScroll) * 100)));
    }
  };

  // Convert vertical mousewheel inside gallery to smooth horizontal scroll
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
        updateScrollProgress();
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // Listen for custom trigger to open specific gallery item from hero buttons
  useEffect(() => {
    const handleOpenGalleryItem = (e: Event) => {
      const customEvent = e as CustomEvent<{ id?: string; title?: string }>;
      const targetId = customEvent.detail?.id;
      const targetTitle = customEvent.detail?.title;
      const found = galleryItems.find(
        (it) =>
          (targetId && it.id === targetId) ||
          (targetTitle && it.title.toLowerCase().includes(targetTitle.toLowerCase()))
      );
      if (found) {
        setActiveItem(found);
      }
    };

    window.addEventListener("open-gallery-item", handleOpenGalleryItem);
    return () => {
      window.removeEventListener("open-gallery-item", handleOpenGalleryItem);
    };
  }, []);

  // Mouse drag handlers
  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollerRef.current) return;
    isDragging.current = true;
    hasMoved.current = false;
    startX.current = e.pageX - scrollerRef.current.offsetLeft;
    scrollStart.current = scrollerRef.current.scrollLeft;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    if (Math.abs(x - startX.current) > 6) {
      hasMoved.current = true;
    }
    scrollerRef.current.scrollLeft = scrollStart.current - walk;
    updateScrollProgress();
  };

  const onMouseUp = () => {
    isDragging.current = false;
  };

  // Lightbox keyboard controls
  useEffect(() => {
    if (!activeItem) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveItem(null);
      } else if (e.key === "ArrowRight") {
        const curIdx = galleryItems.findIndex((it) => it.id === activeItem.id);
        const nextIdx = (curIdx + 1) % galleryItems.length;
        setActiveItem(galleryItems[nextIdx]);
      } else if (e.key === "ArrowLeft") {
        const curIdx = galleryItems.findIndex((it) => it.id === activeItem.id);
        const prevIdx = (curIdx - 1 + galleryItems.length) % galleryItems.length;
        setActiveItem(galleryItems[prevIdx]);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeItem]);

  const handleCardClick = (item: GalleryItem) => {
    if (hasMoved.current) return;
    setActiveItem(item);
  };

  return (
    <section id="gallery" className="section gallery-section">
      {/* Header with — GALLERY and Navigation Arrows */}
      <div className="gallery-header-row">
        <div className="gallery-title-group">
          <span className="gallery-dash">—</span>
          <h2 className="section-title gallery-title">05. GALLERY</h2>
        </div>

        <div className="gallery-header-actions">
          <button
            type="button"
            className="gallery-arrow-btn"
            onClick={() => scrollByAmount(-450)}
            aria-label="Scroll left"
            title="Scroll left"
          >
            ‹
          </button>
          <button
            type="button"
            className="gallery-arrow-btn"
            onClick={() => scrollByAmount(450)}
            aria-label="Scroll right"
            title="Scroll right"
          >
            ›
          </button>
        </div>
      </div>

      {/* Horizontal Scrolling 2-Row Track */}
      <div
        className="gallery-scroller"
        ref={scrollerRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onScroll={updateScrollProgress}
      >
        <div className="gallery-horizontal-track">
          {/* Top Row */}
          <div className="gallery-row gallery-row-top">
            {topRow.map((item) => (
              <button
                key={item.id}
                type="button"
                className="gallery-h-card"
                style={{ width: `${item.preferredWidth}px` }}
                onClick={() => handleCardClick(item)}
                aria-label={`View ${item.title}`}
              >
                <div className="gallery-h-img-box" style={{ position: "relative" }}>
                  <Image
                    src={getAssetPath(item.src)}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 90vw, 450px"
                    className="gallery-h-img"
                    draggable={false}
                  />
                  <div className="gallery-h-gradient" />
                  <div className="gallery-h-info">
                    <span
                      className="gallery-h-badge"
                      style={{ color: categoryColors[item.category] }}
                    >
                      {item.subtitle}
                    </span>
                    <p className="gallery-h-title">{item.shortTitle}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Bottom Row */}
          {bottomRow.length > 0 && (
            <div className="gallery-row gallery-row-bottom">
              {bottomRow.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="gallery-h-card"
                  style={{ width: `${item.preferredWidth}px` }}
                  onClick={() => handleCardClick(item)}
                  aria-label={`View ${item.title}`}
                >
                  <div className="gallery-h-img-box" style={{ position: "relative" }}>
                    <Image
                      src={getAssetPath(item.src)}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 90vw, 450px"
                      className="gallery-h-img"
                      draggable={false}
                    />
                    <div className="gallery-h-gradient" />
                    <div className="gallery-h-info">
                      <span
                        className="gallery-h-badge"
                        style={{ color: categoryColors[item.category] }}
                      >
                        {item.subtitle}
                      </span>
                      <p className="gallery-h-title">{item.shortTitle}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="gallery-footer-row">
        <div className="gallery-progress-bar">
          <div
            className="gallery-progress-fill"
            style={{ width: `${Math.max(12, scrollProgress)}%` }}
          />
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          className="lightbox-backdrop"
          onClick={() => setActiveItem(null)}
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
        >
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            {/* Top Bar */}
            <div className="lightbox-topbar">
              <div className="lightbox-index-pill">
                {galleryItems.findIndex((it) => it.id === activeItem.id) + 1} /{" "}
                {galleryItems.length}
              </div>
              <button
                type="button"
                className="lightbox-close"
                onClick={() => setActiveItem(null)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Prev / Next Buttons */}
            {galleryItems.length > 1 && (
              <>
                <button
                  type="button"
                  className="lightbox-nav-btn prev"
                  onClick={() => {
                    const cur = galleryItems.findIndex((it) => it.id === activeItem.id);
                    const prev = (cur - 1 + galleryItems.length) % galleryItems.length;
                    setActiveItem(galleryItems[prev]);
                  }}
                  aria-label="Previous photo"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="lightbox-nav-btn next"
                  onClick={() => {
                    const cur = galleryItems.findIndex((it) => it.id === activeItem.id);
                    const next = (cur + 1) % galleryItems.length;
                    setActiveItem(galleryItems[next]);
                  }}
                  aria-label="Next photo"
                >
                  ›
                </button>
              </>
            )}

            {/* Lightbox Image */}
            <div className="lightbox-img-wrapper">
              <Image
                src={getAssetPath(activeItem.src)}
                alt={activeItem.title}
                fill
                sizes="95vw"
                className="lightbox-img"
                priority
              />
            </div>

            {/* Lightbox Details */}
            <div className="lightbox-meta">
              <div className="lightbox-badges-row">
                <span
                  className="gallery-category-badge"
                  style={{ color: categoryColors[activeItem.category] }}
                >
                  {categoryLabels[activeItem.category]}
                </span>
                <span className="lightbox-date-pill">{activeItem.date}</span>
              </div>
              <h3 className="lightbox-title">{activeItem.title}</h3>
              <p className="lightbox-subtitle">{activeItem.subtitle}</p>
              <p className="lightbox-desc">{activeItem.description}</p>
              <div className="lightbox-tags-row">
                {activeItem.tags.map((tag) => (
                  <span key={tag} className="lightbox-tag">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
