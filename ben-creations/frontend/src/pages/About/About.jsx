
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  GraduationCap,
  Layers3,
  Palette,
  Target,
  Database,
  CheckCircle2,
  Music2,
  BookOpen,
  Sparkles,
} from "lucide-react";

import benImage from "../../assets/ben.png";
import graduationImage from "../../assets/images/grad.jpeg";
import keyboardImage from "../../assets/images/keyboard.jpeg";

import "./About.css";

const strengths = [
  {
    icon: Code2,
    title: "Frontend Development",
    description:
      "Building responsive, accessible, and user-friendly interfaces using HTML, CSS, JavaScript, and React.",
  },
  {
    icon: Palette,
    title: "Creative Design",
    description:
      "Creating compelling graphics, digital campaigns, and visual experiences that communicate clearly.",
  },
  {
    icon: Database,
    title: "Technical Foundations",
    description:
      "Applying knowledge of SQL, databases, networking, information systems, and computer security.",
  },
];

const experiences = [
  {
    number: "01",
    name: "VoteAfric",
    role: "Co-Founder & Frontend Developer",
    description:
      "Contributing to a digital voting and engagement platform for awards, pageants, reality shows, and student elections. My involvement includes frontend development and improving user experiences.",
    tags: [
      "Frontend Development",
      "Digital Voting",
      "Team Collaboration",
    ],
  },
  {
    number: "02",
    name: "Vendolynk",
    role: "Digital Commerce Concept",
    description:
      "Exploring an online storefront solution that helps vendors showcase products, establish a digital presence, and connect with customers.",
    tags: [
      "E-Commerce",
      "Product Thinking",
      "Web Platforms",
    ],
  },
  {
    number: "03",
    name: "Rental & Hostel Management",
    role: "Platform Concept & Development",
    description:
      "Working on a platform concept for property listings, inspection bookings, dashboards, and notifications to simplify rental management.",
    tags: [
      "Web Applications",
      "User Experience",
      "Product Design",
    ],
  },
];

const skills = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "React",
  "Responsive Web Design",
  "UI Development",
  "SQL",
  "Database Management",
  "Computer Networking",
  "Adobe Photoshop",
  "CapCut",
  "Digital Content Creation",
];

export default function About() {
  return (
    <div className="bc-about-page">
      <div className="bc-about-container">

        {/* INTRODUCTION */}
        <section className="bc-about-intro">
          <div className="bc-about-intro-copy">
            <span className="bc-about-eyebrow">
              THE PERSON BEHIND BEN CREATIONS
            </span>

            <h1>
              Hello, I'm{" "}
              <span>Benjamin Ohene Asare.</span>
            </h1>

            <p className="bc-about-lead">
              Frontend Web Developer, Graphic Designer,
              and Information Technology Student.
            </p>

            <p className="bc-about-summary">
              I'm a Level 400 Information Technology student
              at Pentecost University, Ghana, passionate
              about creating practical digital solutions.
              I combine frontend development, creative
              design, and product thinking to build digital
              experiences that are functional, visually
              engaging, and useful to the people who
              rely on them.
            </p>

            <div className="bc-about-intro-actions">
              <a
                href="/#portfolio"
                className="bc-about-primary-button"
              >
                Explore My Work
                <ArrowUpRight size={17} />
              </a>

              <a
                href="/#contact"
                className="bc-about-secondary-button"
              >
                Get in Touch
                <ArrowUpRight size={17} />
              </a>
            </div>

            <div className="bc-about-quick-facts">
              <span>
                <CheckCircle2 size={16} />
                Based in Ghana
              </span>

              <span>
                <CheckCircle2 size={16} />
                Frontend & Creative
              </span>

              <span>
                <CheckCircle2 size={16} />
                Continuous Learner
              </span>
            </div>
          </div>

          <div className="bc-about-portrait-wrap">
            <div className="bc-about-portrait">
              <img
                src={benImage}
                alt="Portrait of Benjamin Ohene Asare"
                fetchPriority="high"
              />
            </div>

            <div className="bc-about-portrait-caption">
              <span>BENJAMIN OHENE ASARE</span>
              <span>DEVELOPER & DIGITAL CREATIVE</span>
            </div>
          </div>
        </section>

        {/* BACKGROUND */}
        <section className="bc-about-section bc-about-story">
          <div className="bc-about-section-heading">
            <span className="bc-about-section-kicker">
              01 / MY BACKGROUND
            </span>

            <h2>
              Driven by curiosity.
              <br />
              <span>Focused on building.</span>
            </h2>
          </div>

          <div className="bc-about-story-copy">
            <p>
              My journey into technology began with a
              desire to understand how digital products
              work and how they can solve everyday problems.
              That curiosity has grown into a commitment
              to developing websites, exploring digital
              platforms, and creating visual content that
              communicates effectively.
            </p>

            <p>
              I enjoy understanding the complete development
              process, from planning interfaces and organizing
              components to integrating functionality and
              preparing applications for deployment.
            </p>

            <p>
              My creative background also influences the way
              I approach software development. I pay attention
              to typography, spacing, usability, and visual
              consistency because a successful digital
              experience needs both strong functionality
              and thoughtful design.
            </p>
          </div>
        </section>

        {/* STRENGTHS */}
        <section className="bc-about-section">
          <div className="bc-about-section-heading">
            {/* <span className="bc-about-section-kicker">
              02 / WHAT I BRING
            </span> */}

            <h2>
              Technical thinking.
              <br />
              <span>Creative execution.</span>
            </h2>

            <p>
              I work across development and design,
              with a growing understanding of how digital
              products serve real users and businesses.
            </p>
          </div>

          <div className="bc-about-strength-grid">
            {strengths.map(
              ({ icon: Icon, title, description }) => (
                <article
                  className="bc-about-strength-card"
                  key={title}
                >
                  <div className="bc-about-strength-icon">
                    <Icon size={23} />
                  </div>

                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              )
            )}
          </div>
        </section>

        {/* PROJECT EXPERIENCE */}
        <section className="bc-about-section bc-about-experience">
          <div className="bc-about-section-heading">
            {/* <span className="bc-about-section-kicker">
              03 / PROJECT EXPERIENCE
            </span> */}

            <h2>
              Learning through
              <br />
              <span>real projects.</span>
            </h2>

            <p>
              My experience includes contributing to
              an established digital platform and exploring
              solutions for commerce and property management.
            </p>
          </div>

          <div className="bc-about-experience-list">
            {experiences.map((item) => (
              <article
                className="bc-about-experience-item"
                key={item.number}
              >
                <span className="bc-about-experience-number">
                  {item.number}
                </span>

                <div className="bc-about-experience-content">
                  <span className="bc-about-experience-role">
                    {item.role}
                  </span>

                  <h3>{item.name}</h3>
                  <p>{item.description}</p>

                  <div className="bc-about-experience-tags">
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>

                <Layers3
                  className="bc-about-experience-symbol"
                  size={23}
                />
              </article>
            ))}
          </div>
        </section>

        {/* EDUCATION WITH GRADUATION IMAGE */}
        <section className="bc-about-section bc-about-education">
          <div className="bc-about-section-heading">
            <span className="bc-about-section-kicker">
              04 / EDUCATION
            </span>

            <h2>
              Building a strong
              <br />
              <span>technical foundation.</span>
            </h2>

            <p>
              My education combines computing, information
              technology, and business knowledge to support
              my development as a technology professional.
            </p>
          </div>

          <div className="bc-about-education-feature">
            <div className="bc-about-education-photo">
              <img
                src={graduationImage}
                alt="Benjamin Ohene Asare in his graduation photograph"
                loading="lazy"
                decoding="async"
              />

              <div className="bc-about-photo-label">
                <GraduationCap size={17} />
                <span>MY EDUCATIONAL JOURNEY</span>
              </div>
            </div>

            <div className="bc-about-education-details">
              <div className="bc-about-education-highlight">
                <div className="bc-about-highlight-icon">
                  <GraduationCap size={22} />
                </div>

                <span>ACADEMIC DEVELOPMENT</span>

                <h3>
                  Learning, applying,
                  and continuously improving.
                </h3>

                <p>
                  My academic journey has strengthened my
                  technical understanding and encouraged
                  me to apply what I learn through
                  practical digital projects.
                </p>
              </div>

              <div className="bc-about-education-mini-card">
                <BookOpen size={20} />

                <div>
                  <span>CURRENT EDUCATION</span>
                  <h4>Pentecost University</h4>
                  <p>
                    BSc Information Technology — Level 400
                  </p>
                </div>
              </div>

              <div className="bc-about-education-mini-card">
                <BriefcaseBusiness size={20} />

                <div>
                  <span>PREVIOUS QUALIFICATION</span>
                  <h4>NCC Education</h4>
                  <p>
                    Levels 4 & 5 — Diploma in Computing
                    and Business Management
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section className="bc-about-section">
          <div className="bc-about-section-heading">
            <span className="bc-about-section-kicker">
              05 / MY TOOLKIT
            </span>

            <h2>
              Skills I'm developing
              <br />
              <span>and applying.</span>
            </h2>
          </div>

          <div className="bc-about-skills">
            {skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </section>

        {/* PERSONAL INTEREST WITH KEYBOARD IMAGE */}
        <section className="bc-about-section bc-about-personal">
          <div className="bc-about-section-heading">
            <span className="bc-about-section-kicker">
              06 / BEYOND THE SCREEN
            </span>

            <h2>
              Creativity doesn't
              <br />
              <span>stop at the keyboard.</span>
            </h2>
          </div>

          <div className="bc-about-personal-feature">
            <div className="bc-about-personal-content">
              <div className="bc-about-personal-icon">
                <Music2 size={25} />
              </div>

              <span className="bc-about-personal-eyebrow">
                MUSIC & PERSONAL CREATIVITY
              </span>

              <h3>
                Another side
                <br />
                of my creativity.
              </h3>

              <p>
                Outside web development and graphic design,
                I enjoy playing the keyboard and piano.
                Music gives me another opportunity to
                explore creativity, develop discipline,
                and express ideas in a different way.
              </p>

              <p>
                Whether I'm writing code, designing a
                visual experience, or playing music,
                I enjoy learning, practicing, and
                improving my craft.
              </p>

              <div className="bc-about-personal-signature">
                <Sparkles size={17} />
                <span>
                  Creativity, discipline, and continuous growth.
                </span>
              </div>
            </div>

            <div className="bc-about-keyboard-photo">
              <img
                src={keyboardImage}
                alt="Benjamin Ohene Asare playing the keyboard"
                loading="lazy"
                decoding="async"
              />

              <div className="bc-about-keyboard-caption">
                <Music2 size={16} />
                <span>PASSION BEYOND TECHNOLOGY</span>
              </div>
            </div>
          </div>
        </section>

        {/* VISION */}
        <section className="bc-about-vision">
          <div className="bc-about-vision-icon">
            <Target size={25} />
          </div>

          <span className="bc-about-section-kicker">
            07 / MY DIRECTION
          </span>

          <h2>
            Growing as a developer.
            <br />
            <span>Building with purpose.</span>
          </h2>

          <p>
            My goal is to grow into a highly skilled
            frontend developer and digital entrepreneur,
            contribute to professional development teams,
            and create technology solutions that make
            a meaningful difference in Ghana and beyond.
          </p>

          <a href="/#contact">
            Let's Connect
            <ArrowUpRight size={18} />
          </a>
        </section>

      </div>
    </div>
  );
}
