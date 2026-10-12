import { useEffect, useRef, useState } from "react";

import {
  FiArrowUpRight,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import {
  categories,
  portfolioItems,
} from "../../data/portfolioData";

import "./Portfolio.css";
import { Link } from "react-router-dom";
export default function Portfolio() {
  const sectionRef = useRef(null);
  const closeRef = useRef(null);
  const lastFocusedRef = useRef(null);

  const [activeCategory, setActiveCategory] =
    useState("All Works");

  const [selectedIndex, setSelectedIndex] =
    useState(null);

  const [visible, setVisible] = useState(false);

  // Display every selected project.
  // No HOME_LIMIT or slice() restriction.

  const displayedItems =
    activeCategory === "All Works"
      ? portfolioItems
      : portfolioItems.filter(
          (item) => item.category === activeCategory
        );

  const selectedItem =
    selectedIndex === null
      ? null
      : displayedItems[selectedIndex] ?? null;

  /* SCROLL REVEAL */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  /* LIGHTBOX KEYBOARD CONTROLS */

  useEffect(() => {
    if (selectedIndex === null) return;

    const previousOverflow =
      document.body.style.overflow;

    lastFocusedRef.current = document.activeElement;

    document.body.style.overflow = "hidden";

    closeRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedIndex(null);
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();

        setSelectedIndex(
          (current) =>
            (current + 1) % displayedItems.length
        );
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();

        setSelectedIndex(
          (current) =>
            (current - 1 + displayedItems.length) %
            displayedItems.length
        );
      }

      if (event.key === "Tab") {
        const dialog = closeRef.current?.closest(
          '[role="dialog"]'
        );

        const buttons = dialog?.querySelectorAll(
          "button:not(:disabled)"
        );

        if (!buttons?.length) return;

        const first = buttons[0];
        const last = buttons[buttons.length - 1];

        if (
          event.shiftKey &&
          document.activeElement === first
        ) {
          event.preventDefault();
          last.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === last
        ) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [selectedIndex === null, displayedItems.length]);

  /* RESTORE FOCUS WHEN PREVIEW CLOSES */

  useEffect(() => {
    if (selectedIndex === null) {
      lastFocusedRef.current?.focus?.();
      lastFocusedRef.current = null;
    }
  }, [selectedIndex]);

  /* CATEGORY FILTER */

  const changeCategory = (category) => {
    setSelectedIndex(null);
    setActiveCategory(category);
  };

  /* IMAGE NAVIGATION */

  const nextImage = () => {
    setSelectedIndex(
      (current) =>
        (current + 1) % displayedItems.length
    );
  };

  const previousImage = () => {
    setSelectedIndex(
      (current) =>
        (current - 1 + displayedItems.length) %
        displayedItems.length
    );
  };

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className={`ben-portfolio ${
        visible ? "ben-portfolio-visible" : ""
      }`}
      aria-labelledby="ben-portfolio-title"
    >
      <div className="ben-portfolio-container">

        {/* TOPLINE */}

        <div className="ben-portfolio-topline">
          <span>03 / SELECTED WORK</span>

          <span className="ben-portfolio-rule" />

          <span>GRAPHIC DESIGN PORTFOLIO</span>
        </div>

        {/* CENTERED HEADING */}

        <div className="ben-portfolio-heading-row">
          <p className="ben-portfolio-eyebrow">
            A COLLECTION OF MY CREATIVE WORK
          </p>

          <h2
            id="ben-portfolio-title"
            className="ben-portfolio-title"
          >
            Creative <em>portfolio.</em>
          </h2>

          <p className="ben-portfolio-intro">
            Explore a collection of my graphic
            design projects, from event flyers
            and campaigns to product promotions
            and visual branding.
          </p>
        </div>

        {/* CATEGORY TABS */}

        <div
          className="ben-portfolio-tabs"
          role="group"
          aria-label="Filter graphic designs"
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`ben-portfolio-tab ${
                activeCategory === category
                  ? "active"
                  : ""
              }`}
              onClick={() => changeCategory(category)}
              aria-pressed={
                activeCategory === category
              }
            >
              {category}
            </button>
          ))}
        </div>

        {/* ALL SELECTED PROJECTS */}

        <div
          className="ben-portfolio-grid"
          key={activeCategory}
        >
          {displayedItems.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className="ben-portfolio-card"
              style={{
                "--card-index": index,
              }}
              onClick={() => setSelectedIndex(index)}
              aria-label={`View ${item.title}`}
            >
              <div className="ben-portfolio-image">
                <img
                  src={item.image}
                  alt={`${item.title} artwork`}
                  loading="lazy"
                  decoding="async"
                />

                <div className="ben-portfolio-image-overlay">
                  <span>VIEW DESIGN</span>

                  <FiArrowUpRight
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div className="ben-portfolio-card-info">
                <span>{item.title}</span>
                <span>{item.category}</span>
              </div>
            </button>
          ))}
        </div>

        {/* EMPTY CATEGORY */}

        {displayedItems.length === 0 && (
          <p className="ben-portfolio-empty">
            No designs in this category yet.
          </p>
        )}

        {/* CENTERED SEE MORE BUTTON */}

       {/* VIEW FULL PORTFOLIO */}

<div className="ben-portfolio-more">
  <span className="ben-portfolio-more-count">
    EXPLORE MY COMPLETE CREATIVE COLLECTION
  </span>

  <Link
    to="/portfolio"
    className="ben-portfolio-more-button"
  >
    View All My Works
    <FiArrowUpRight aria-hidden="true" />
  </Link>
</div>

        {/* FOOTER */}

        <div className="ben-portfolio-bottom">
          <span>
            DESIGN THAT COMMUNICATES & CONNECTS
          </span>

          <span>
            {portfolioItems.length} SELECTED PROJECTS
          </span>
        </div>
      </div>

      {/* FULLSCREEN IMAGE PREVIEW */}

      {selectedItem && (
        <div
          className="ben-portfolio-lightbox"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              setSelectedIndex(null);
            }
          }}
        >
          <div
            className="ben-portfolio-lightbox-content"
            role="dialog"
            aria-modal="true"
            aria-label={`Preview ${selectedItem.title}`}
          >
            <button
              ref={closeRef}
              type="button"
              className="ben-portfolio-close"
              onClick={() => setSelectedIndex(null)}
              aria-label="Close preview"
            >
              <FiX />
            </button>

            {displayedItems.length > 1 && (
              <button
                type="button"
                className="ben-portfolio-nav previous"
                onClick={previousImage}
                aria-label="Previous design"
              >
                <FiChevronLeft />
              </button>
            )}

            <img
              src={selectedItem.image}
              alt={selectedItem.title}
            />

            {displayedItems.length > 1 && (
              <button
                type="button"
                className="ben-portfolio-nav next"
                onClick={nextImage}
                aria-label="Next design"
              >
                <FiChevronRight />
              </button>
            )}

            <div className="ben-portfolio-lightbox-caption">
              <span>{selectedItem.title}</span>
              <span>{selectedItem.category}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}