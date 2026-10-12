
import { useEffect, useRef, useState } from "react";
import "./About.css";
import benImage from "../../assets/ben.png";

const disciplines = [
  "Graphic Design",
  "AI Content Creation",
  "Motion Graphics",
  "Web Development",
];

export default function About() {
  const aboutRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = aboutRef.current;

    if (!element) return;

    // Respect reduced-motion accessibility settings
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
      reducedMotion ||
      !("IntersectionObserver" in window)
    ) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={aboutRef}
      className={`ben-about ${
        isVisible ? "ben-about-visible" : ""
      }`}
      id="about"
    >
      <div className="ben-about-container">

        {/* SECTION HEADER */}
        {/* <div className="ben-about-header">
          <span className="ben-about-kicker">
            01 / THE PERSON BEHIND THE WORK
          </span>

          <span className="ben-about-header-line" />

          <span className="ben-about-header-side">
            GET TO KNOW ME
          </span>
        </div> */}

        <div className="ben-about-grid">

          {/* PORTRAIT */}
          <div className="ben-about-visual">
            <div className="ben-about-image-frame">
              <img
                src={benImage}
                alt="Portrait of Ben, creative designer behind Ben Creations"
                loading="lazy"
              />

              <div className="ben-about-image-shade" />

              <div className="ben-about-image-caption">
                <span>BEN CREATIONS</span>
                <span>CREATIVE PORTFOLIO</span>
              </div>
            </div>

            <div className="ben-about-image-accent">
              <span>DESIGN WITH PURPOSE</span>
              <span aria-hidden="true">↗</span>
            </div>
          </div>

          {/* ABOUT CONTENT */}
          <div className="ben-about-content">

            <span className="ben-about-eyebrow">
              A LITTLE ABOUT ME
            </span>

            <h2 className="ben-about-title">
              More than a
              <br />
              <em>creative.</em>
              <br />
              I'm a storyteller
              <span className="ben-about-dot">.</span>
            </h2>

            <div className="ben-about-description">
              <p>
                I'm the creative mind behind
                <strong> Ben Creations</strong>, a personal
                creative brand where design, technology,
                and imagination come together.
              </p>

              <p>
                My work spans graphic design, AI-powered
                visual content, motion graphics, and web
                development. I enjoy transforming simple
                ideas into thoughtful digital experiences
                that communicate clearly and leave a
                lasting impression.
              </p>

              <p>
                For me, creativity goes beyond making
                things look beautiful. It's about solving
                problems, telling meaningful stories,
                and creating work that connects with people.
              </p>
            </div>

            {/* SPECIALIZATIONS */}
            <div className="ben-about-disciplines">
              <span className="ben-about-small-label">
                WHAT I SPECIALIZE IN
              </span>

              <div className="ben-about-tags">
                {disciplines.map((item) => (
                  <span
                    className="ben-about-tag"
                    key={item}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* CALL TO ACTION */}
            <div className="ben-about-footer">
              <a
                href="#portfolio"
                className="ben-about-button"
              >
                Discover My Work
                <span aria-hidden="true">↗</span>
              </a>

              <span className="ben-about-signature">
                Made with creativity &amp; purpose.
              </span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
