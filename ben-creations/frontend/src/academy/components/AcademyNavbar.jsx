
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  GraduationCap,
  Menu,
  X,
  Home,
  BookOpen,
  LayoutDashboard,
  ArrowLeft,
  ArrowUpRight,
} from "lucide-react";

import "../styles/AcademyNavbar.css";

function AcademyNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const closeButtonRef = useRef(null);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;

      const elements = menuRef.current?.querySelectorAll(
        'a[href], button:not([disabled])'
      );

      if (!elements?.length) return;

      const first = elements[0];
      const last = elements[elements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    const mediaQuery = window.matchMedia("(max-width: 760px)");

    const handleViewportChange = () => {
      if (!mediaQuery.matches) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    mediaQuery.addEventListener("change", handleViewportChange);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      mediaQuery.removeEventListener(
        "change",
        handleViewportChange
      );
    };
  }, [menuOpen]);

  return (
    <header className="academy-navbar">
      <div className="academy-navbar__inner">
        {/* ACADEMY BRAND */}
        <Link
          className="academy-navbar__brand"
          to="/academy"
          onClick={closeMenu}
        >
          <span className="academy-navbar__brand-icon">
            <GraduationCap size={23} />
          </span>

          <span className="academy-navbar__brand-text">
            BenKreations
            <small>ACADEMY</small>
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav
          className="academy-navbar__desktop-links"
          aria-label="Academy navigation"
        >
          <NavLink
            to="/academy"
            end
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/academy/courses"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Courses
          </NavLink>

          <NavLink
            to="/academy/dashboard"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            My Learning
          </NavLink>
        </nav>

        {/* DESKTOP ACTION / MOBILE MENU */}
        <div className="academy-navbar__actions">
          <Link
            className="academy-navbar__portfolio-link"
            to="/"
          >
            Main Website
            <ArrowUpRight size={16} />
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            className="academy-navbar__menu-button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open Academy menu"
            aria-expanded={menuOpen}
            aria-controls="academy-mobile-menu"
          >
            <Menu size={23} />
          </button>
        </div>
      </div>

      {/* MOBILE OVERLAY */}
      {menuOpen && (
        <button
          type="button"
          className="academy-navbar__backdrop"
          onClick={closeMenu}
          aria-label="Close Academy menu"
          tabIndex={-1}
        />
      )}

      {/* MOBILE SLIDING SIDEBAR */}
      <div
        ref={menuRef}
        id="academy-mobile-menu"
        className={`academy-navbar__mobile-menu ${
          menuOpen ? "is-open" : ""
        }`}
        aria-label="Mobile Academy menu"
      >
        <div className="academy-navbar__mobile-header">
          <div className="academy-navbar__mobile-heading">
            <GraduationCap size={23} />
            <span>BenKreations Academy</span>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            className="academy-navbar__close-button"
            onClick={closeMenu}
            aria-label="Close Academy menu"
          >
            <X size={21} />
          </button>
        </div>

        <span className="academy-navbar__mobile-label">
          ACADEMY MENU
        </span>

        <nav
          className="academy-navbar__mobile-links"
          aria-label="Mobile Academy navigation"
        >
          <NavLink
            to="/academy"
            end
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            <Home size={18} />
            Home
          </NavLink>

          <NavLink
            to="/academy/courses"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            <BookOpen size={18} />
            Explore Courses
          </NavLink>

          <NavLink
            to="/academy/dashboard"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            <LayoutDashboard size={18} />
            My Learning
          </NavLink>
        </nav>

        <Link
          className="academy-navbar__mobile-return"
          to="/"
          onClick={closeMenu}
        >
          <ArrowLeft size={17} />
          Return to Main Website
        </Link>
      </div>
    </header>
  );
}

export default AcademyNavbar;
