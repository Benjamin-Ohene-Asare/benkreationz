
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BookOpen,
  GraduationCap,
  Award,
  Clock3,
  ArrowUpRight,
  PlayCircle,
  LayoutDashboard,
  LibraryBig,
  Settings2,
  Menu,
  X,
} from "lucide-react";

import "../styles/StudentDashboard.css";

// Temporary demonstration data.
// Real enrolments and progress will come from Django later.
const demoCourses = [
  {
    id: 1,
    title: "Web Development Foundations",
    category: "Web Development",
    completed: 5,
    total: 12,
    progress: 42,
  },
  {
    id: 2,
    title: "Graphic Design Essentials",
    category: "Graphic Design",
    completed: 3,
    total: 10,
    progress: 30,
  },
  {
    id: 3,
    title: "AI Content Creation",
    category: "AI & Content",
    completed: 0,
    total: 8,
    progress: 0,
  },
];

function StudentDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const sidebarRef = useRef(null);
  const menuButtonRef = useRef(null);
  const closeButtonRef = useRef(null);
  const wasOpenRef = useRef(false);

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!sidebarOpen) {
      if (wasOpenRef.current) {
        menuButtonRef.current?.focus();
      }

      wasOpenRef.current = false;
      return;
    }

    wasOpenRef.current = true;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSidebarOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = sidebarRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements?.length) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

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

    document.addEventListener("keydown", handleKeyDown);

    const mediaQuery = window.matchMedia("(max-width: 760px)");

    const handleViewportChange = () => {
      if (!mediaQuery.matches) {
        setSidebarOpen(false);
      }
    };

    mediaQuery.addEventListener("change", handleViewportChange);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      mediaQuery.removeEventListener(
        "change",
        handleViewportChange
      );
    };
  }, [sidebarOpen]);

  return (
    <div className="academy-dashboard">
      {/* MOBILE MENU BAR */}
      <div className="academy-dashboard__mobile-bar">
        <button
          ref={menuButtonRef}
          type="button"
          className="academy-dashboard__mobile-toggle"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open student navigation"
          aria-expanded={sidebarOpen}
          aria-controls="academy-student-sidebar"
        >
          <Menu size={21} />
        </button>

        <Link
          className="academy-dashboard__mobile-brand"
          to="/academy"
        >
          <GraduationCap size={21} />
          <span>BenKreations Academy</span>
        </Link>
      </div>

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <button
          type="button"
          className="academy-dashboard__overlay"
          onClick={closeSidebar}
          aria-label="Close student navigation"
          tabIndex={-1}
        />
      )}

      {/* SIDEBAR */}
      <aside
        ref={sidebarRef}
        id="academy-student-sidebar"
        className={`academy-dashboard__sidebar ${
          sidebarOpen ? "is-open" : ""
        }`}
        aria-label="Student navigation"
      >
        <div className="academy-dashboard__sidebar-header">
          <Link
            className="academy-dashboard__brand"
            to="/academy"
            onClick={closeSidebar}
          >
            <GraduationCap size={25} />
            <span>
              BenKreations
              <small>ACADEMY</small>
            </span>
          </Link>

          <button
            ref={closeButtonRef}
            type="button"
            className="academy-dashboard__mobile-close"
            onClick={closeSidebar}
            aria-label="Close student navigation"
          >
            <X size={21} />
          </button>
        </div>

        <nav
          className="academy-dashboard__nav"
          aria-label="Student dashboard navigation"
        >
          <span className="academy-dashboard__nav-label">
            LEARNING
          </span>

          <Link
            className="academy-dashboard__nav-link active"
            to="/academy/dashboard"
            aria-current="page"
            onClick={closeSidebar}
          >
            <LayoutDashboard size={18} />
            Overview
          </Link>

          <Link
            className="academy-dashboard__nav-link"
            to="/academy/courses"
            onClick={closeSidebar}
          >
            <LibraryBig size={18} />
            Explore Courses
          </Link>

          <span className="academy-dashboard__nav-label">
            ACCOUNT
          </span>

          <span className="academy-dashboard__nav-link academy-dashboard__nav-link--disabled">
            <Award size={18} />
            Certificates
            <small>Soon</small>
          </span>

          <span className="academy-dashboard__nav-link academy-dashboard__nav-link--disabled">
            <Settings2 size={18} />
            Settings
            <small>Soon</small>
          </span>
        </nav>

        <div className="academy-dashboard__sidebar-bottom">
          <p>Keep learning. Keep creating.</p>
          <Link
            to="/academy/courses"
            onClick={closeSidebar}
          >
            Discover courses <ArrowUpRight size={15} />
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="academy-dashboard__main">
        <div className="academy-dashboard__topbar">
          <div>
            <span className="academy-dashboard__eyebrow">
              STUDENT AREA
            </span>

            <h1>Learning dashboard</h1>

            <p>
              Track your learning and continue where you left off.
            </p>
          </div>

          <div
            className="academy-dashboard__avatar"
            aria-label="Demo student"
          >
            S
          </div>
        </div>

        {/* DEMO NOTICE */}
        <div className="academy-dashboard__demo-note">
          Dashboard preview — sample courses and progress.
          Student accounts and purchases are not connected yet.
        </div>

        {/* STATISTICS */}
        <div className="academy-dashboard__stats">
          <div className="academy-dashboard__stat">
            <span className="academy-dashboard__stat-icon">
              <BookOpen size={20} />
            </span>

            <p>Enrolled Courses</p>
            <strong>03</strong>
          </div>

          <div className="academy-dashboard__stat">
            <span className="academy-dashboard__stat-icon">
              <Clock3 size={20} />
            </span>

            <p>In Progress</p>
            <strong>02</strong>
          </div>

          <div className="academy-dashboard__stat">
            <span className="academy-dashboard__stat-icon">
              <Award size={20} />
            </span>

            <p>Certificates Earned</p>
            <strong>00</strong>
          </div>
        </div>

        {/* LEARNING SECTION */}
        <div className="academy-dashboard__section-heading">
          <div>
            <h2>My learning</h2>
            <p>Your courses and learning progress.</p>
          </div>

          <Link to="/academy/courses">
            Browse courses <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* COURSE CARDS */}
        <div className="academy-dashboard__courses">
          {demoCourses.map((course) => (
            <article
              className="academy-dashboard__course"
              key={course.id}
            >
              <div className="academy-dashboard__course-cover">
                <BookOpen size={29} />
              </div>

              <div className="academy-dashboard__course-content">
                <span className="academy-dashboard__course-category">
                  {course.category}
                </span>

                <h3>{course.title}</h3>

                <div className="academy-dashboard__progress-info">
                  <span>
                    {course.completed} of {course.total} lessons
                  </span>

                  <strong>{course.progress}%</strong>
                </div>

                <div
                  className="academy-dashboard__progress-track"
                  role="progressbar"
                  aria-label={`${course.title} progress`}
                  aria-valuenow={course.progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    style={{
                      width: `${course.progress}%`,
                    }}
                  />
                </div>

                <span className="academy-dashboard__continue academy-dashboard__continue--disabled">
                  <PlayCircle size={17} />
                  Learning area coming soon
                </span>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}

export default StudentDashboard;
