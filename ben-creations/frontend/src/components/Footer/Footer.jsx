import {
  FiArrowUpRight,
  FiArrowUp,
  FiInstagram,
  FiFacebook,
  FiYoutube,
  FiMail,
  FiHeart,
} from "react-icons/fi";

import "./Footer.css";

const quickLinks = [
  { label: "Home", href: "/#home" },
  { label: "About Me", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Services", href: "/#services" },
  { label: "My Works", href: "/#portfolio" },
  { label: "AI Studio", href: "/#ai-studio" },
];

const serviceLinks = [
  { label: "Graphic Design", href: "/#services" },
  { label: "AI Video Production", href: "/#services" },
  { label: "Web Development", href: "/#services" },
  { label: "Branding & Identity", href: "/#services" },
];

const toolLinks = [
  { label: "WhatsApp Link Generator", href: "/tools/whatsapp-link" },
  { label: "QR Code Generator", href: "/tools/qr-generator" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "",
    icon: FiInstagram,
  },
  {
    label: "Facebook",
    href: "",
    icon: FiFacebook,
  },
  {
    label: "YouTube",
    href: "",
    icon: FiYoutube,
  },
];

const CONTACT_EMAIL = "";

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    if (window.location.pathname !== "/") {
      window.location.assign("/#home");
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="ben-footer">
      <div className="ben-footer-background" aria-hidden="true">
        <div className="ben-footer-glow" />
        <div className="ben-footer-grid-pattern" />
      </div>

      <div className="ben-footer-container">
        {/* TOP CTA */}

        <div className="ben-footer-cta">
          <div>
            <span className="ben-footer-eyebrow">
              HAVE A PROJECT IN MIND?
            </span>

            <h2>
              Let's make something
              <br />
              <em>remarkable.</em>
            </h2>
          </div>

          <a href="/#contact" className="ben-footer-cta-button">
            Let's Work Together
            <FiArrowUpRight aria-hidden="true" />
          </a>
        </div>

        <div className="ben-footer-divider" />

        {/* MAIN FOOTER */}

        <div className="ben-footer-main">
          {/* BRAND */}

          <div className="ben-footer-brand">
            <a href="/#home" className="ben-footer-logo">
              <span className="ben-footer-logo-mark">B.</span>

              <span className="ben-footer-logo-text">
                <strong>Ben Creations</strong>
                <small>CREATIVE PORTFOLIO</small>
              </span>
            </a>

            <p>
              Bringing ideas to life through thoughtful design,
              AI-powered creativity, and modern digital experiences.
            </p>

            <div className="ben-footer-socials">
              {socialLinks
                .filter((social) => Boolean(social.href))
                .map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                    >
                      <Icon aria-hidden="true" />
                    </a>
                  );
                })}
            </div>

            {CONTACT_EMAIL && (
              <a
                className="ben-footer-email"
                href={`mailto:${CONTACT_EMAIL}`}
              >
                <FiMail aria-hidden="true" />
                {CONTACT_EMAIL}
              </a>
            )}
          </div>

          {/* QUICK LINKS */}

          <div className="ben-footer-column">
            <h3>Explore</h3>

            <nav aria-label="Footer navigation">
              {quickLinks.map((link) => (
                <a key={link.label} href={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* SERVICES */}

          <div className="ben-footer-column">
            <h3>What I Do</h3>

            <nav aria-label="Footer services">
              {serviceLinks.map((link) => (
                <a key={link.label} href={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* TOOLS */}

          <div className="ben-footer-column">
            <h3>Free Tools</h3>

            <nav aria-label="Footer tools">
              {toolLinks.map((link) => (
                <a key={link.label} href={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>

            <span className="ben-footer-tools-note">
              More tools coming soon.
            </span>
          </div>
        </div>

        {/* BOTTOM BAR */}

        <div className="ben-footer-bottom">
          <p>
            © {year} Ben Creations. All rights reserved.
          </p>

          <p className="ben-footer-made">
            Designed with <FiHeart aria-label="care" /> and creativity.
          </p>

          <button
            type="button"
            className="ben-footer-back-top"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            Back to Top
            <FiArrowUp aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}