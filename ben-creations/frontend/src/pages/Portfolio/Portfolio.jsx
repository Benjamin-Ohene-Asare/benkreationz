
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Images,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

import {
  categories,
  portfolioItems,
} from "../../data/portfolioData";

import "./Portfolio.css";

export default function Portfolio() {
  const [activeCategory, setActiveCategory] =
    useState("All Works");

  const [selectedProject, setSelectedProject] =
    useState(null);

  const filteredProjects =
    activeCategory === "All Works"
      ? portfolioItems
      : portfolioItems.filter(
          (project) =>
            project.category === activeCategory
        );

  const selectedIndex = selectedProject
    ? filteredProjects.findIndex(
        (project) => project.id === selectedProject.id
      )
    : -1;

  const closePreview = () => {
    setSelectedProject(null);
  };

  const showPrevious = () => {
    if (selectedIndex < 0) return;

    const previousIndex =
      (selectedIndex - 1 + filteredProjects.length) %
      filteredProjects.length;

    setSelectedProject(filteredProjects[previousIndex]);
  };

  const showNext = () => {
    if (selectedIndex < 0) return;

    const nextIndex =
      (selectedIndex + 1) % filteredProjects.length;

    setSelectedProject(filteredProjects[nextIndex]);
  };

  useEffect(() => {
    if (!selectedProject) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [selectedProject]);

  return (
    <div className="bc-works-page">
      <div className="bc-works-container">

        {/* PAGE INTRODUCTION */}
        <header className="bc-works-header">
          <div className="bc-works-header-content">
            <span className="bc-works-eyebrow">
              BEN CREATIONS / SELECTED PROJECTS
            </span>

            <h1>
              My <span>Works.</span>
            </h1>

            <p className="bc-works-lead">
              A collection of creative projects built
              around visual storytelling, thoughtful
              design, and purposeful communication.
            </p>

            <p className="bc-works-description">
              Explore my graphic design work, including
              event promotions, church programmes,
              branding, product advertising, and
              campaign materials.
            </p>
          </div>

          <div className="bc-works-header-mark">
            <Images size={31} strokeWidth={1.5} />
            <span>CREATIVE PORTFOLIO</span>
            <strong>
              {portfolioItems.length.toString().padStart(2, "0")}
            </strong>
            <small>SELECTED WORKS</small>
          </div>
        </header>

        {/* CATEGORY FILTERS */}
        <section className="bc-works-gallery">
          <div className="bc-works-gallery-heading">
            <div>
              <span className="bc-works-section-label">
                EXPLORE THE COLLECTION
              </span>

              <h2>Design Gallery</h2>
            </div>

            <span className="bc-works-result-count">
              {filteredProjects.length} Projects
            </span>
          </div>

          <div
            className="bc-works-filters"
            aria-label="Filter projects by category"
          >
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`bc-works-filter ${
                  activeCategory === category
                    ? "is-active"
                    : ""
                }`}
                onClick={() => {
                  setActiveCategory(category);
                  setSelectedProject(null);
                }}
                aria-pressed={
                  activeCategory === category
                }
              >
                {category}
              </button>
            ))}
          </div>

          {/* PROJECT GRID */}
          {filteredProjects.length > 0 ? (
            <div className="bc-works-grid">
              {filteredProjects.map((project) => (
                <article
                  className="bc-works-card"
                  key={project.id}
                >
                  <button
                    type="button"
                    className="bc-works-card-image"
                    onClick={() =>
                      setSelectedProject(project)
                    }
                    aria-label={`Preview ${project.title}`}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                    />

                    <span className="bc-works-card-overlay">
                      <span>
                        View Project
                        <ArrowUpRight size={17} />
                      </span>
                    </span>
                  </button>

                  <div className="bc-works-card-info">
                    <span className="bc-works-card-category">
                      {project.category}
                    </span>

                    <h3>{project.title}</h3>

                    <button
                      type="button"
                      className="bc-works-card-link"
                      onClick={() =>
                        setSelectedProject(project)
                      }
                    >
                      View Design
                      <ArrowUpRight size={15} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="bc-works-empty">
              <Images size={38} />

              <h3>No projects in this category yet</h3>

              <p>
                More creative work will be added soon.
              </p>
            </div>
          )}
        </section>

        {/* CLOSING SECTION */}
        <section className="bc-works-cta">
          <div>
            <span>HAVE A PROJECT IN MIND?</span>

            <h2>
              Let's create something
              <br />
              <em>worth remembering.</em>
            </h2>

            <p>
              From promotional graphics to complete
              digital experiences, I'm open to
              creative collaborations.
            </p>
          </div>

          <a href="/#contact">
            Let's Work Together
            <ArrowUpRight size={19} />
          </a>
        </section>
      </div>

      {/* FULLSCREEN PROJECT PREVIEW */}
      {selectedProject && (
        <div
          className="bc-works-lightbox"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closePreview();
            }
          }}
        >
          <div
            className="bc-works-lightbox-panel"
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedProject.title} preview`}
          >
            <div className="bc-works-lightbox-top">
              <div>
                <span>
                  {selectedProject.category}
                </span>

                <h3>{selectedProject.title}</h3>
              </div>

              <button
                type="button"
                className="bc-works-lightbox-close"
                onClick={closePreview}
                aria-label="Close preview"
              >
                <X size={23} />
              </button>
            </div>

            <div className="bc-works-lightbox-image">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
              />
            </div>

            <div className="bc-works-lightbox-bottom">
              <button
                type="button"
                onClick={showPrevious}
                aria-label="Previous project"
              >
                <ChevronLeft size={19} />
                Previous
              </button>

              <span>
                {selectedIndex + 1} /{" "}
                {filteredProjects.length}
              </span>

              <button
                type="button"
                onClick={showNext}
                aria-label="Next project"
              >
                Next
                <ChevronRight size={19} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
