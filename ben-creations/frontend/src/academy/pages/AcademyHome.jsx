
import { Link } from "react-router-dom";
import "../styles/AcademyHome.css";
function AcademyHome() {
  return (
    <section className="academy-home">
      <div className="academy-home__content">
        <span className="academy-home__eyebrow">
          BENKREATIONS ACADEMY
        </span>

        <h1>
          Learn Practical Digital Skills.
          <br />
          Build Your Future.
        </h1>

        <p>
          Explore practical courses in web development,
          graphic design, AI content creation, and digital
          marketing. Learn at your own pace with lifetime
          access to purchased courses.
        </p>

        <div className="academy-home__actions">
          <Link to="/academy/courses">
            Explore Courses
          </Link>

          <Link to="/academy/dashboard">
            Student Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AcademyHome;
