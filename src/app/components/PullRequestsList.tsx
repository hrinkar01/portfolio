"use client";

import { useMemo, useRef, useEffect } from "react";
import { PULL_REQUESTS, PullRequest } from "../../data/pullRequests";

export default function PullRequestsList() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const isManualScrollingRef = useRef(false);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isPausedRef = useRef(false);

  // High-level impact stats
  const stats = useMemo(() => {
    const total = PULL_REQUESTS.length;
    const merged = PULL_REQUESTS.filter((p) => p.status === "merged").length;
    const approved = PULL_REQUESTS.filter((p) => p.status === "approved").length;
    const inReview = PULL_REQUESTS.filter((p) => p.status === "under_review").length;
    return { total, merged, approved, inReview };
  }, []);

  const getStatusBadge = (status: PullRequest["status"]) => {
    switch (status) {
      case "approved":
        return <span className="pr-status-pill approved">● APPROVED</span>;
      case "merged":
        return <span className="pr-status-pill merged">✔ MERGED</span>;
      case "under_review":
        return <span className="pr-status-pill review">● IN REVIEW</span>;
      case "closed":
        return <span className="pr-status-pill closed">✕ CLOSED</span>;
      case "open":
      default:
        return <span className="pr-status-pill open">● OPEN</span>;
    }
  };

  // Continuous auto-glide with smooth bottom-to-top loop and manual wheel override
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    let rafId: number;
    const speed = 0.65; // Gentle readable pace

    const step = () => {
      const node = viewportRef.current;
      if (node && !isManualScrollingRef.current && !isPausedRef.current) {
        const maxScroll = node.scrollHeight - node.clientHeight;

        if (maxScroll > 5) {
          node.scrollTop += speed;

          // Reached the bottom
          if (node.scrollTop >= maxScroll - 2) {
            isPausedRef.current = true;
            // Pause 2.5s at bottom so user can read the last items
            pauseTimerRef.current = setTimeout(() => {
              if (viewportRef.current) {
                viewportRef.current.scrollTo({ top: 0, behavior: "smooth" });
              }
              // Pause 1s at top before resuming downward glide
              setTimeout(() => {
                isPausedRef.current = false;
              }, 1000);
            }, 2500);
          }
        }
      }

      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafId);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    };
  }, []);

  // When user actively wheels or scrolls, grant instant manual control and resume auto-scroll after idle
  const handleWheel = () => {
    isManualScrollingRef.current = true;
    isPausedRef.current = false;
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      isManualScrollingRef.current = false;
    }, 1800);
  };

  const handlePointerDown = () => {
    isManualScrollingRef.current = true;
    isPausedRef.current = false;
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
  };

  const handlePointerUp = () => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      isManualScrollingRef.current = false;
    }, 1800);
  };

  // Render an individual PR Row item
  const renderRow = (pr: PullRequest) => (
    <a
      key={pr.id}
      href={pr.url}
      target="_blank"
      rel="noopener noreferrer"
      className="pr-row-item"
      title={`View PR #${pr.number} on ${pr.forge}`}
    >
      <div className="pr-row-main">
        <span className={`pr-git-icon ${pr.status}`}>
          <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
            <path d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z" />
          </svg>
        </span>

        <span className="pr-number-tag">
          {pr.repo} #{pr.number}
        </span>

        <span className="pr-title-text">{pr.title}</span>
      </div>

      <div className="pr-row-meta">
        {pr.subsystem && <span className="pr-subsystem-chip">{pr.subsystem}</span>}
        {getStatusBadge(pr.status)}
        <span className="pr-arrow-link">↗</span>
      </div>
    </a>
  );

  return (
    <div className="pr-list-container">
      {/* Modern Impact Stats Strip */}
      <div className="pr-stats-strip">
        <div className="pr-stat-card">
          <div className="pr-stat-val-row">
            <span className="pr-stat-number">{stats.total}</span>
            <span className="pr-stat-badge">Total</span>
          </div>
          <span className="pr-stat-label">Pull Requests</span>
        </div>

        <div className="pr-stat-card merged">
          <div className="pr-stat-val-row">
            <span className="pr-stat-number">{stats.merged}</span>
            <span className="pr-stat-badge">✔ Merged</span>
          </div>
          <span className="pr-stat-label">Production Merged</span>
        </div>

        <div className="pr-stat-card approved">
          <div className="pr-stat-val-row">
            <span className="pr-stat-number">{stats.approved}</span>
            <span className="pr-stat-badge">● Approved</span>
          </div>
          <span className="pr-stat-label">Passed Code Review</span>
        </div>

        <div className="pr-stat-card review">
          <div className="pr-stat-val-row">
            <span className="pr-stat-number">{stats.inReview}</span>
            <span className="pr-stat-badge">● In Review</span>
          </div>
          <span className="pr-stat-label">Active Review</span>
        </div>
      </div>

      {/* Main PR Rows List - Single Clean Set (No Duplicate PRs) with Active Auto-Glide & Smooth Manual Scroll */}
      <div
        className="pr-marquee-viewport"
        ref={viewportRef}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <div className="pr-marquee-content">
          {PULL_REQUESTS.map((pr) => renderRow(pr))}
        </div>
      </div>
    </div>
  );
}
