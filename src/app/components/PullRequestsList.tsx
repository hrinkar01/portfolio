"use client";

import { useMemo, useRef, useEffect } from "react";
import { PULL_REQUESTS, PullRequest } from "../../data/pullRequests";

export default function PullRequestsList() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const firstSetRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);
  const isUserScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const posRef = useRef(0);

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

  // Continuous auto-glide + seamless bidirectional wrap
  useEffect(() => {
    const el = viewportRef.current;
    const firstSet = firstSetRef.current;
    if (!el || !firstSet) return;

    // Start centered on the second set so user can scroll up or down immediately
    const initialOffset = firstSet.offsetHeight || 480;
    el.scrollTop = initialOffset;
    posRef.current = initialOffset;

    let animationFrameId: number;
    const speed = 0.5; // Smooth ~30px per sec auto-glide

    const tick = () => {
      const currentEl = viewportRef.current;
      const currentFirstSet = firstSetRef.current;

      if (currentEl && currentFirstSet) {
        const singleSetHeight = currentFirstSet.offsetHeight;

        // Auto advance only when not hovered and not actively scrolled by user
        if (!isHoveredRef.current && !isUserScrollingRef.current) {
          posRef.current += speed;
          currentEl.scrollTop = posRef.current;
        }

        // Seamless wrap when reaching bottom or top of duplicated sets
        if (currentEl.scrollTop >= singleSetHeight * 2) {
          currentEl.scrollTop -= singleSetHeight;
          posRef.current = currentEl.scrollTop;
        } else if (currentEl.scrollTop <= 5) {
          currentEl.scrollTop += singleSetHeight;
          posRef.current = currentEl.scrollTop;
        }
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Handle manual scroll (trackpad / mouse wheel) with seamless loop wrap
  const handleScroll = () => {
    const el = viewportRef.current;
    const firstSet = firstSetRef.current;
    if (!el || !firstSet) return;

    posRef.current = el.scrollTop;
    const singleSetHeight = firstSet.offsetHeight;

    if (el.scrollTop >= singleSetHeight * 2) {
      el.scrollTop -= singleSetHeight;
      posRef.current = el.scrollTop;
    } else if (el.scrollTop <= 5) {
      el.scrollTop += singleSetHeight;
      posRef.current = el.scrollTop;
    }

    isUserScrollingRef.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isUserScrollingRef.current = false;
    }, 700);
  };

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    if (viewportRef.current) {
      posRef.current = viewportRef.current.scrollTop;
    }
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    isUserScrollingRef.current = false;
    if (viewportRef.current) {
      posRef.current = viewportRef.current.scrollTop;
    }
  };

  // Render an individual PR Row item
  const renderRow = (pr: PullRequest, keySuffix: string = "") => (
    <a
      key={`${pr.id}${keySuffix}`}
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

      {/* Main PR Rows List - Auto-Glides + Smooth Manual Trackpad/Wheel Scroll */}
      <div
        className="pr-marquee-viewport"
        ref={viewportRef}
        onScroll={handleScroll}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="pr-marquee-content">
          {/* Set 1 */}
          <div className="pr-marquee-set" ref={firstSetRef}>
            {PULL_REQUESTS.map((pr) => renderRow(pr))}
          </div>
          {/* Set 2 (for seamless loop) */}
          <div className="pr-marquee-set">
            {PULL_REQUESTS.map((pr) => renderRow(pr, "-dup1"))}
          </div>
          {/* Set 3 (buffer for upward manual scroll) */}
          <div className="pr-marquee-set">
            {PULL_REQUESTS.map((pr) => renderRow(pr, "-dup2"))}
          </div>
        </div>
      </div>
    </div>
  );
}
