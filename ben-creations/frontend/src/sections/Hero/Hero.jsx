
import "./Hero.css";
import benImage from "../../assets/ben.png";

const expertise = [
  "Graphic Design",
  "AI Video Creation",
  "Motion Graphics",
  "Web Development",
];

const approach = [
  "Creative Thinking",
  "Purposeful Design",
  "Digital Innovation",
];

export default function Hero() {
  return (
    <section className="ben-hero" id="home">
      <div className="ben-hero-glow ben-hero-glow-one" />
      <div className="ben-hero-glow ben-hero-glow-two" />

      <div className="ben-hero-photo" aria-hidden="true">
        <img src={benImage} alt="" />
      </div>

      <div className="ben-hero-overlay" />

      <div className="ben-hero-container">
        <div className="ben-hero-topline">
          {/* <span className="ben-hero-label">
            BEN CREATIONS / PORTFOLIO
          </span> */}

          {/* <span className="ben-hero-edition">
            DESIGN • AI • DEVELOPMENT
          </span> */}
        </div>

        <div className="ben-hero-main">
          <p className="ben-hero-eyebrow">
            CREATIVE DESIGNER & DIGITAL CREATOR
          </p>

          <h1 className="ben-hero-heading">
            <span className="ben-hero-heading-first">
              Creative
            </span>

            <span className="ben-hero-heading-second">
              <em>visual</em>
              <span>designer.</span>
            </span>
          </h1>

          <div className="ben-hero-intro">
            <p>
              I turn ideas into meaningful visual experiences
              through graphic design, AI-powered content,
              motion graphics and web development.
            </p>

            <div className="ben-hero-actions">
              <a href="#portfolio" className="ben-hero-primary">
                Explore My Work
                <span aria-hidden="true">↗</span>
              </a>

              <a href="#about" className="ben-hero-secondary">
                More About Me
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>

        <div className="ben-hero-bottom">
          <div className="ben-hero-details">
            <div className="ben-hero-info-card">
              <span className="ben-detail-label">
                01 / WHAT I DO
              </span>

              <div className="ben-detail-items">
                {expertise.map((item) => (
                  <span className="ben-detail-item" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="ben-hero-info-card">
              <span className="ben-detail-label">
                02 / MY APPROACH
              </span>

              <div className="ben-detail-items">
                {approach.map((item) => (
                  <span className="ben-detail-item" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <a
            href="#about"
            className="ben-hero-scroll"
            aria-label="Scroll to About Me"
          >
            <span>SCROLL TO EXPLORE</span>
            <span className="ben-scroll-arrow" aria-hidden="true">
              ↓
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
