
import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/CourseCatalog.css";

const categories = [
  "All Courses",
  "Web Development",
  "Graphic Design",
  "AI & Content",
  "Digital Marketing",
];

const courses = [
  {
    id: 1,
    slug: "web-development-foundations",
    title: "Web Development Foundations",
    category: "Web Development",
    level: "Beginner",
    lessons: 12,
    price: 149,
    image: null,
  },
  {
    id: 2,
    slug: "graphic-design-essentials",
    title: "Graphic Design Essentials",
    category: "Graphic Design",
    level: "Beginner",
    lessons: 10,
    price: 99,
    image: null,
  },
  {
    id: 3,
    slug: "ai-content-creation",
    title: "AI Content Creation",
    category: "AI & Content",
    level: "All Levels",
    lessons: 8,
    price: 129,
    image: null,
  },
  {
    id: 4,
    slug: "digital-marketing-fundamentals",
    title: "Digital Marketing Fundamentals",
    category: "Digital Marketing",
    level: "Beginner",
    lessons: 9,
    price: 119,
    image: null,
  },
];

function CourseCatalog() {
  const [activeCategory, setActiveCategory] =
    useState("All Courses");

  const filteredCourses =
    activeCategory === "All Courses"
      ? courses
      : courses.filter(
          (course) => course.category === activeCategory
        );

  return (
    <section className="academy-catalog">
      <div className="academy-catalog__container">
        <div className="academy-catalog__header">
          <div>
            <span className="academy-catalog__eyebrow">
              BENKREATIONS ACADEMY
            </span>

            <h1>Explore our courses</h1>

            <p>
              Practical lessons designed to help you build
              real-world digital skills.
            </p>
          </div>

          <Link
            className="academy-catalog__dashboard-link"
            to="/academy/dashboard"
          >
            My Learning
          </Link>
        </div>

        <div
          className="academy-catalog__filters"
          aria-label="Filter courses by category"
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={
                activeCategory === category
                  ? "academy-catalog__filter active"
                  : "academy-catalog__filter"
              }
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="academy-catalog__grid">
          {filteredCourses.map((course) => (
            <article
              className="academy-course-card"
              key={course.id}
            >
              <div className="academy-course-card__visual">
                <span>{course.category}</span>
              </div>

              <div className="academy-course-card__body">
                <div className="academy-course-card__meta">
                  <span>{course.level}</span>
                  <span>{course.lessons} lessons</span>
                </div>

                <h2>{course.title}</h2>

                <div className="academy-course-card__footer">
                  <strong>GH₵ {course.price}</strong>

                  <Link
                    to={`/academy/courses/${course.slug}`}
                  >
                    View Course
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="academy-catalog__notice">
          Preview courses and prices for interface development.
          Actual courses will be managed through the Academy
          administration system.
        </p>
      </div>
    </section>
  );
}

export default CourseCatalog;
