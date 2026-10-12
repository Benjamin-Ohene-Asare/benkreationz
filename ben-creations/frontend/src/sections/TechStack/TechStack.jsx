
import { useEffect, useRef, useState } from "react";

import {
  FiArrowUpRight,
  FiLayers,
  FiCode,
  FiFilm,
  FiImage,
  FiEdit3,
  FiVideo,
  FiPenTool,
  FiLayout,
  FiCpu,
  FiDatabase,
  FiGlobe,
  FiFileText,
  FiTerminal,
  FiBox,
  FiZap,
  FiMessageSquare,
  FiCommand,
  FiPlayCircle,
  FiFeather,
} from "react-icons/fi";

import "./TechStack.css";

/* ==========================================
   BEN CREATIONS - CREATIVE TOOLKIT
========================================== */

const toolGroups = [
  {
    number: "01",
    title: "Design & Visuals",
    description:
      "Creating compelling graphics, visual identities, and digital artwork.",
    icon: FiLayers,
    tools: [
      {
        name: "Photoshop",
        icon: FiImage,
        color: "#31A8FF",
      },
      {
        name: "Illustrator",
        icon: FiPenTool,
        color: "#FF9A00",
      },
      {
        name: "Canva",
        icon: FiLayout,
        color: "#00C4CC",
      },
      {
        name: "Figma",
        icon: FiEdit3,
        color: "#A259FF",
      },
    ],
  },

  {
    number: "02",
    title: "Video Editing & Motion",
    description:
      "Editing videos, crafting visual stories, and bringing creative ideas to life.",
    icon: FiFilm,
    tools: [
      {
        name: "CapCut",
        icon: FiFilm,
        color: "#171717",
      },
      {
        name: "Premiere Pro",
        icon: FiVideo,
        color: "#8B5CF6",
      },
    ],
  },

  {
    number: "03",
    title: "AI Creation & Prompt Engineering",
    description:
      "Using generative AI, creative direction, and structured prompts to produce engaging visual content and cinematic videos.",
    icon: FiZap,
    tools: [
      {
        name: "ChatGPT",
        icon: FiMessageSquare,
        color: "#10A37F",
      },
      {
        name: "Google Gemini",
        icon: FiCommand,
        color: "#4285F4",
      },
      {
        name: "Google Flow",
        icon: FiPlayCircle,
        color: "#A855F7",
      },
      {
        name: "Prompt Engineering",
        icon: FiFeather,
        color: "#C084FC",
      },
    ],
  },

  {
    number: "04",
    title: "Web & Development",
    description:
      "Developing responsive websites and functional digital experiences using modern web technologies.",
    icon: FiCode,
    tools: [
      {
        name: "React",
        icon: FiCpu,
        color: "#61DAFB",
      },
      {
        name: "JavaScript",
        icon: FiTerminal,
        color: "#EAB308",
      },
      {
        name: "Python",
        icon: FiBox,
        color: "#3776AB",
      },
      {
        name: "Django",
        icon: FiDatabase,
        color: "#44B78B",
      },
      {
        name: "HTML5",
        icon: FiFileText,
        color: "#E34F26",
      },
      {
        name: "CSS3",
        icon: FiGlobe,
        color: "#1572B6",
      },
    ],
  },
];

/* ==========================================
   COMPONENT
========================================== */

export default function TechStack() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
      reducedMotion ||
      !("IntersectionObserver" in window)
    ) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="tools"
      className={`ben-stack ${
        visible ? "ben-stack-visible" : ""
      }`}
      aria-labelledby="ben-stack-title"
    >
      <div className="ben-stack-container">

        {/* SECTION TOPLINE */}

        {/* <div className="ben-stack-topline">
          <span>02 / MY CREATIVE TOOLKIT</span>

          <span className="ben-stack-topline-rule" />

          <span>TOOLS & TECHNOLOGIES</span>
        </div> */}

        {/* SECTION HEADING */}

        <div className="ben-stack-heading-row">

          <div className="ben-stack-heading-content">

            <p className="ben-stack-eyebrow">
              THE TOOLS BEHIND THE WORK
            </p>

            <h2
              id="ben-stack-title"
              className="ben-stack-heading"
            >
              My creative
              <br />
              <em>toolkit.</em>
            </h2>

          </div>

          <p className="ben-stack-intro">
            From graphic design and video editing
            to AI-powered storytelling, prompt
            engineering, and web development,
            I combine creativity with modern
            technology to bring ideas to life.
          </p>

        </div>

        {/* TOOL CATEGORY CARDS */}

        <div className="ben-stack-groups">

          {toolGroups.map((group, index) => {
            const CategoryIcon = group.icon;

            return (
              <article
                className="ben-stack-group"
                key={group.number}
                style={{
                  "--group-index": index,
                }}
              >

                {/* CARD HEADER */}

                <div className="ben-stack-group-header">

                  <div className="ben-stack-group-icon">
                    <CategoryIcon aria-hidden="true" />
                  </div>

                  <span className="ben-stack-group-number">
                    {group.number}
                  </span>

                </div>

                {/* CATEGORY TITLE */}

                <h3>{group.title}</h3>

                <p className="ben-stack-group-description">
                  {group.description}
                </p>

                {/* SOFTWARE AND SKILLS */}

                <div className="ben-stack-tool-list">

                  {group.tools.map((tool) => {
                    const ToolIcon = tool.icon;

                    return (
                      <div
                        className="ben-stack-tool"
                        key={tool.name}
                        title={tool.name}
                      >

                        <span
                          className="ben-stack-tool-icon"
                          style={{
                            color: tool.color,
                          }}
                        >
                          <ToolIcon aria-hidden="true" />
                        </span>

                        <span className="ben-stack-tool-name">
                          {tool.name}
                        </span>

                      </div>
                    );
                  })}

                </div>

                <FiArrowUpRight
                  className="ben-stack-group-arrow"
                  aria-hidden="true"
                />

              </article>
            );
          })}

        </div>

        {/* SECTION FOOTER */}

        <div className="ben-stack-bottom">

          <span>
            DESIGN. AI. MOTION. DEVELOPMENT.
          </span>

          <span>
            ALWAYS EXPLORING. ALWAYS CREATING.
          </span>

        </div>

      </div>
    </section>
  );
}
