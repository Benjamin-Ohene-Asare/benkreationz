
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Circle,
  Clock3,
  FileText,
  GraduationCap,
  LockKeyhole,
  Play,
} from "lucide-react";

import "../styles/CourseLearningPage.css";

// Demo content for frontend development only.
// Real lessons and enrolment permissions will come
// from the Django backend later.

const demoCourses = {
  "web-development-foundations": {
    title: "Web Development Foundations",
    category: "Web Development",
    instructor: "BenKreations Academy",
    sections: [
      {
        title: "Getting Started",
        lessons: [
          {
            id: "web-1",
            title: "Welcome to Web Development",
            duration: "08:30",
            description:
              "Discover how websites work and what you will learn throughout this course.",
          },
          {
            id: "web-2",
            title: "Understanding HTML",
            duration: "14:20",
            description:
              "Learn how HTML structures the content of a web page.",
          },
          {
            id: "web-3",
            title: "Introduction to CSS",
            duration: "16:45",
            description:
              "Understand how CSS controls website appearance and layout.",
          },
        ],
      },
      {
        title: "Building Your First Website",
        lessons: [
          {
            id: "web-4",
            title: "Creating Your First Page",
            duration: "19:10",
            description:
              "Put your HTML and CSS knowledge into practice.",
          },
          {
            id: "web-5",
            title: "Making Websites Responsive",
            duration: "21:00",
            description:
              "Learn how to adapt websites to different screen sizes.",
          },
        ],
      },
    ],
  },

  "graphic-design-essentials": {
    title: "Graphic Design Essentials",
    category: "Graphic Design",
    instructor: "BenKreations Academy",
    sections: [
      {
        title: "Design Foundations",
        lessons: [
          {
            id: "design-1",
            title: "Introduction to Graphic Design",
            duration: "10:20",
            description:
              "Explore the fundamentals of visual communication.",
          },
          {
            id: "design-2",
            title: "Colour and Typography",
            duration: "17:15",
            description:
              "Understand how colours and fonts influence design.",
          },
          {
            id: "design-3",
            title: "Creating Your First Flyer",
            duration: "23:40",
            description:
              "Learn how to create a balanced promotional flyer.",
          },
        ],
      },
    ],
  },

  "ai-content-creation": {
    title: "AI Content Creation",
    category: "AI & Content",
    instructor: "BenKreations Academy",
    sections: [
      {
        title: "AI Content Fundamentals",
        lessons: [
          {
            id: "ai-1",
            title: "Introduction to AI Content",
            duration: "09:40",
            description:
              "Discover how AI can support creative content production.",
          },
          {
            id: "ai-2",
            title: "Writing Effective Prompts",
            duration: "18:25",
            description:
              "Learn how to structure prompts for consistent results.",
          },
          {
            id: "ai-3",
            title: "Planning AI Video Scenes",
            duration: "20:10",
            description:
              "Build a simple storyboard and prepare scene prompts.",
          },
        ],
      },
    ],
  },

  "digital-marketing-fundamentals": {
    title: "Digital Marketing Fundamentals",
    category: "Digital Marketing",
    instructor: "BenKreations Academy",
    sections: [
      {
        title: "Marketing Essentials",
        lessons: [
          {
            id: "marketing-1",
            title: "Introduction to Digital Marketing",
            duration: "11:30",
            description:
              "Understand the major channels used in digital marketing.",
          },
          {
            id: "marketing-2",
            title: "Understanding Your Audience",
            duration: "15:45",
            description:
              "Learn how to identify and communicate with customers.",
          },
          {
            id: "marketing-3",
            title: "Planning a Social Media Campaign",
            duration: "22:10",
            description:
              "Create a simple marketing campaign plan.",
          },
        ],
      },
    ],
  },
};

function CourseLearningPage() {
  const { slug } = useParams();
  console.log("Academy course slug:", slug);
  const course = demoCourses[slug];

  const lessons =
    course?.sections.flatMap((section) => section.lessons) ?? [];

  const [selectedLessonId, setSelectedLessonId] = useState(null);

  const activeLesson =
    lessons.find((lesson) => lesson.id === selectedLessonId) ??
    lessons[0];

  const activeIndex = lessons.findIndex(
    (lesson) => lesson.id === activeLesson?.id
  );

  const goToLesson = (index) => {
    if (index >= 0 && index < lessons.length) {
      setSelectedLessonId(lessons[index].id);
    }
  };

  if (!course) {
    return (
      <section className="academy-learning__not-found">
        <GraduationCap size={38} />
        <h1>Course not found</h1>
        <p>Received slug: {String(slug)}</p>
        <p>The requested course is not available.</p>
        <Link to="/academy/courses">
          <ArrowLeft size={17} />
          Back to Courses
        </Link>
      </section>
    );
  }

  return (
    <div className="academy-learning">
      {/* COURSE HEADER */}
      <header className="academy-learning__header">
        <div className="academy-learning__header-inner">
          <Link
            to="/academy/courses"
            className="academy-learning__back"
          >
            <ArrowLeft size={17} />
            All Courses
          </Link>

          <div className="academy-learning__course-info">
            <span>{course.category}</span>
            <h1>{course.title}</h1>
            <p>{course.instructor}</p>
          </div>

          <div className="academy-learning__course-count">
            <BookOpen size={17} />
            {lessons.length} demo lessons
          </div>
        </div>
      </header>

      <div className="academy-learning__layout">
        {/* LESSON CONTENT */}
        <main className="academy-learning__main">
          <div className="academy-learning__video">
            <div className="academy-learning__video-placeholder">
              <div className="academy-learning__play-icon">
                <Play size={28} fill="currentColor" />
              </div>

              <h2>Lesson video coming soon</h2>

              <p>
                Videos will appear here when course content
                is uploaded through the Academy administration
                system.
              </p>

              <span>
                <LockKeyhole size={15} />
                Demo learning interface
              </span>
            </div>
          </div>

          <div className="academy-learning__lesson-details">
            <span className="academy-learning__eyebrow">
              LESSON {activeIndex + 1} OF {lessons.length}
            </span>

            <h2>{activeLesson?.title}</h2>

            <p>{activeLesson?.description}</p>

            <div className="academy-learning__lesson-meta">
              <span>
                <Clock3 size={16} />
                {activeLesson?.duration}
              </span>

              <span>
                <FileText size={16} />
                Learning materials coming soon
              </span>
            </div>

            <div className="academy-learning__lesson-actions">
              <button
                type="button"
                onClick={() => goToLesson(activeIndex - 1)}
                disabled={activeIndex <= 0}
              >
                <ArrowLeft size={17} />
                Previous Lesson
              </button>

              <button
                type="button"
                className="academy-learning__next"
                onClick={() => goToLesson(activeIndex + 1)}
                disabled={activeIndex >= lessons.length - 1}
              >
                Next Lesson
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </main>

        {/* COURSE CURRICULUM */}
        <aside className="academy-learning__sidebar">
          <div className="academy-learning__sidebar-heading">
            <div>
              <span>YOUR LEARNING PATH</span>
              <h2>Course Content</h2>
            </div>

            <p>
              {lessons.length} preview lessons
            </p>
          </div>

          <div className="academy-learning__sections">
            {course.sections.map((section, sectionIndex) => (
              <section
                className="academy-learning__section"
                key={section.title}
              >
                <div className="academy-learning__section-title">
                  <span>MODULE {sectionIndex + 1}</span>
                  <h3>{section.title}</h3>
                </div>

                <div className="academy-learning__lesson-list">
                  {section.lessons.map((lesson) => {
                    const isActive =
                      lesson.id === activeLesson?.id;

                    return (
                      <button
                        type="button"
                        key={lesson.id}
                        className={`academy-learning__lesson-item ${
                          isActive ? "is-active" : ""
                        }`}
                        onClick={() =>
                          setSelectedLessonId(lesson.id)
                        }
                        aria-current={
                          isActive ? "step" : undefined
                        }
                      >
                        {isActive ? (
                          <CheckCircle2 size={18} />
                        ) : (
                          <Circle size={18} />
                        )}

                        <span className="academy-learning__lesson-text">
                          <strong>{lesson.title}</strong>
                          <small>
                            <Clock3 size={12} />
                            {lesson.duration}
                          </small>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          <div className="academy-learning__sidebar-footer">
            <p>
              This is a frontend preview. Enrolment, lesson
              completion and progress tracking will be
              connected to Django later.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default CourseLearningPage;
