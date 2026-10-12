
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setMenuOpen(false);

  const handleNavigation = (href) => {
    closeMenu();

    const hash = href.includes("#")
      ? href.substring(href.indexOf("#"))
      : "";

    if (location.pathname === "/" && hash) {
      const target = document.getElementById(hash.slice(1));

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else if (location.pathname === "/" && href === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="bc-navbar">
      <nav
        className="bc-nav-container"
        aria-label="Main navigation"
      >
        {/* BRAND */}
        <Link
          to="/"
          className="bc-nav-brand"
          onClick={() => handleNavigation("/")}
        >
          <span className="bc-brand-symbol">B.</span>

          <span className="bc-brand-text">
            <strong>Ben Creations</strong>
            <small>CREATIVE PORTFOLIO</small>
          </span>
        </Link>

        {/* MOBILE MENU */}
        <button
          type="button"
          className="bc-menu-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="bc-navigation-links"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* NAVIGATION */}
        <div
          id="bc-navigation-links"
          className={`bc-nav-content ${
            menuOpen ? "is-open" : ""
          }`}
        >
          <div className="bc-nav-links">

            <Link
              to="/"
              onClick={() => handleNavigation("/")}
            >
              Home
            </Link>

            <Link
              to="/about"
             onClick={closeMenu}
            >
              About Me
            </Link>

            <Link
              to="/#skills"
              onClick={() => handleNavigation("/#skills")}
            >
              Skills
            </Link>

            <Link
              to="/#services"
              onClick={() => handleNavigation("/#services")}
            >
              Services
            </Link>

            <Link
              to="/portfolio"
               onClick={closeMenu}
            >
              My Works
            </Link>

            <Link
              to="/#ai-studio"
              onClick={() => handleNavigation("/#ai-studio")}
            >
              AI Studio
            </Link>

           <Link to="/tools" onClick={closeMenu}>
  Free Tools
</Link>

          </div>

          {/* CONTACT */}
          <Link
            to="/#contact"
            className="bc-nav-contact"
            onClick={() => handleNavigation("/#contact")}
          >
            Let's Talk
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
