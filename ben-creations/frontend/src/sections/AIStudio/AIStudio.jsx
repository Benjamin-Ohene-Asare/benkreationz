import { useEffect, useRef, useState } from "react";
import {
  FiArrowUpRight,
  FiPlay,
  FiX,
  FiCpu,
  FiFilm,
  FiZap,
} from "react-icons/fi";

import { aiVideos } from "../../data/aiVideos";
import "./AIStudio.css";

export default function AIStudio() {
  const sectionRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previousFocusRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!activeVideo) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveVideo(null);
      }

      if (event.key === "Tab") {
        const dialog = closeButtonRef.current?.closest('[role="dialog"]');
        const focusable = dialog?.querySelectorAll(
          'button:not([disabled]), a[href]'
        );

        if (!focusable?.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus?.();
    };
  }, [activeVideo]);

  const openVideo = (video) => {
    previousFocusRef.current = document.activeElement;
    setActiveVideo(video);
  };

  return (
    <section
      id="ai-studio"
      ref={sectionRef}
      className={`ben-ai-studio ${isVisible ? "ben-ai-visible" : ""}`}
      aria-labelledby="ben-ai-title"
    >
      {/* AI BACKGROUND PATTERNS */}
      <div className="ben-ai-background" aria-hidden="true">
        <div className="ben-ai-grid" />
        <div className="ben-ai-glow ben-ai-glow-one" />
        <div className="ben-ai-glow ben-ai-glow-two" />
        <div className="ben-ai-ring ben-ai-ring-one" />
        <div className="ben-ai-ring ben-ai-ring-two" />
        <div className="ben-ai-light-beam" />
        <div className="ben-ai-noise" />
        <div className="ben-ai-orbit ben-ai-orbit-one" />
        <div className="ben-ai-orbit ben-ai-orbit-two" />
      </div>

      <div className="ben-ai-container">
        {/* SECTION TOPLINE */}
        {/* <div className="ben-ai-topline">
          <span>04 / AI CREATIVE STUDIO</span>
          <span className="ben-ai-topline-rule" />
          <span>GENERATIVE VIDEO & STORYTELLING</span>
        </div> */}

        {/* HEADER */}
        <div className="ben-ai-header">
          <div className="ben-ai-header-icon">
            <FiCpu aria-hidden="true" />
            <span>AI-POWERED CREATIVITY</span>
          </div>

          <h2 id="ben-ai-title" className="ben-ai-title">
            Where imagination
            <br />
            meets <em>intelligence.</em>
          </h2>

          <p className="ben-ai-intro">
            Bringing ideas to life through artificial intelligence,
            cinematic storytelling, and creative technology. Explore
            AI-generated campaign videos, product commercials, and
            digital experiences crafted with imagination.
          </p>

          <div className="ben-ai-highlights">
            <span>
              <FiZap aria-hidden="true" />
              Prompt Engineering
            </span>

            <span>
              <FiFilm aria-hidden="true" />
              AI Video Production
            </span>

            <span>
              <FiCpu aria-hidden="true" />
              Creative Technology
            </span>
          </div>
        </div>

        {/* GALLERY HEADER */}
        <div className="ben-ai-gallery-heading">
          <div>
            <span className="ben-ai-gallery-eyebrow">
              FEATURED CREATIVE WORK
            </span>

            <h3>
              AI video <em>showcase.</em>
            </h3>
          </div>

          <span className="ben-ai-gallery-count">
            {String(aiVideos.length).padStart(2, "0")} PROJECTS
          </span>
        </div>

        {/* FOUR-COLUMN VIDEO GRID */}
        <div className="ben-ai-video-grid">
          {aiVideos.map((video, index) => (
            <article
              key={video.id}
              className="ben-ai-video-card"
              style={{ "--video-index": index }}
            >
              <button
                type="button"
                className="ben-ai-video-preview"
                onClick={() => openVideo(video)}
                aria-label={`Play ${video.title}`}
              >
                <img
                  src={video.thumbnail}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />

                <div className="ben-ai-video-shade" />

                <span className="ben-ai-video-type">
                  {video.category}
                </span>

                <span className="ben-ai-play">
                  <FiPlay aria-hidden="true" />
                </span>
              </button>

              <div className="ben-ai-video-info">
                <div className="ben-ai-video-title-row">
                  <h4>{video.title}</h4>
                  <FiArrowUpRight aria-hidden="true" />
                </div>

                <p>{video.description}</p>
              </div>
            </article>
          ))}
        </div>

        {/* FOOTER */}
        {/* <div className="ben-ai-bottom">
          <span>IMAGINATION WITHOUT LIMITS</span>
          <span>DESIGN • AI • STORYTELLING</span>
        </div> */}
      </div>

      {/* VIDEO MODAL */}
      {activeVideo && (
        <div
          className="ben-ai-modal"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setActiveVideo(null);
            }
          }}
        >
          <div
            className="ben-ai-modal-content"
            role="dialog"
            aria-modal="true"
            aria-label={`Playing ${activeVideo.title}`}
          >
            <button
              ref={closeButtonRef}
              type="button"
              className="ben-ai-modal-close"
              onClick={() => setActiveVideo(null)}
              aria-label="Close video"
            >
              <FiX />
            </button>

            <div className="ben-ai-player">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>

            <div className="ben-ai-modal-caption">
              <h3>{activeVideo.title}</h3>
              <span>{activeVideo.category}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}