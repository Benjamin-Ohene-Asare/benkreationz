import {
  FiArrowUpRight,
  FiMessageCircle,
  FiGrid,
  FiYoutube,
  FiTool,
  FiArrowRight,
} from "react-icons/fi";

import "./FreeTools.css";

const tools = [
  {
    id: "whatsapp",
    number: "01",
    title: "WhatsApp Link Generator",
    description:
      "Create personalized WhatsApp chat links with ready-to-send messages. Share them with customers, friends, or your audience.",
    icon: FiMessageCircle,
    category: "COMMUNICATION",
    href: "/tools/whatsapp-link",
    available: true,
  },
  {
    id: "qr",
    number: "02",
    title: "QR Code Generator",
    description:
      "Turn website links, WhatsApp links, and other URLs into QR codes that are easy to share and download.",
    icon: FiGrid,
    category: "DIGITAL UTILITY",
    href: "/tools/qr-generator",
    available: true,
  },
  {
    id: "youtube",
    number: "03",
    title: "YouTube Video Downloader",
    description:
      "A planned utility for downloading videos where downloading is permitted and supported.",
    icon: FiYoutube,
    category: "VIDEO UTILITY",
    href: null,
    available: false,
  },
  {
    id: "more",
    number: "04",
    title: "More Creative Tools",
    description:
      "I'm working on more practical digital tools to make creative and everyday tasks simpler.",
    icon: FiTool,
    category: "COMING NEXT",
    href: null,
    available: false,
  },
];

export default function FreeTools() {
  return (
    <section
      id="free-tools"
      className="ben-tools"
      aria-labelledby="ben-tools-title"
    >
      <div className="ben-tools-background" aria-hidden="true">
        <div className="ben-tools-grid-pattern" />
        <div className="ben-tools-glow ben-tools-glow-one" />
        <div className="ben-tools-glow ben-tools-glow-two" />
        <div className="ben-tools-circle" />
      </div>

      <div className="ben-tools-container">
        {/* <div className="ben-tools-topline">
          <span>05 / FREE TOOLS</span>
          <span className="ben-tools-topline-rule" />
          <span>MADE FOR EVERYONE</span>
        </div> */}

        <div className="ben-tools-header">
          <span className="ben-tools-eyebrow">
            SIMPLE TOOLS. REAL VALUE.
          </span>

          <h2 id="ben-tools-title" className="ben-tools-title">
            Useful tools.
            <br />
            <em>Made simple.</em>
          </h2>

          <p>
            A growing collection of free digital utilities designed
            to help you create, connect, and get things done with less effort.
            No complicated setup — just useful tools when you need them.
          </p>
        </div>

        <div className="ben-tools-grid">
          {tools.map((tool) => {
            const Icon = tool.icon;

            const content = (
              <>
                <div className="ben-tool-card-top">
                  <div className="ben-tool-icon">
                    <Icon aria-hidden="true" />
                  </div>

                  <span className="ben-tool-number">
                    {tool.number} / 04
                  </span>
                </div>

                <div className="ben-tool-card-content">
                  <span className="ben-tool-category">
                    {tool.category}
                  </span>

                  <h3>{tool.title}</h3>
                  <p>{tool.description}</p>
                </div>

                <div className="ben-tool-card-bottom">
                  <span
                    className={
                      tool.available
                        ? "ben-tool-action"
                        : "ben-tool-coming"
                    }
                  >
                    {tool.available ? "Explore Tool" : "Coming Soon"}

                    {tool.available && (
                      <FiArrowUpRight aria-hidden="true" />
                    )}
                  </span>

                  <span className="ben-tool-card-arrow">
                    {tool.available ? (
                      <FiArrowUpRight aria-hidden="true" />
                    ) : (
                      <FiArrowRight aria-hidden="true" />
                    )}
                  </span>
                </div>
              </>
            );

            return tool.available ? (
              <a
                key={tool.id}
                href={tool.href}
                className="ben-tool-card ben-tool-card-active"
                aria-label={`Open ${tool.title}`}
              >
                {content}
              </a>
            ) : (
              <article
                key={tool.id}
                className="ben-tool-card ben-tool-card-disabled"
              >
                {content}
              </article>
            );
          })}
        </div>

        <div className="ben-tools-footer">
          {/* <div className="ben-tools-footer-line" /> */}

          {/* <div className="ben-tools-footer-content">
            <span>BUILT WITH PURPOSE. SHARED FOR FREE.</span>
            <span>BEN CREATIONS — DIGITAL UTILITIES</span>
          </div> */}
        </div>
      </div>
    </section>
  );
}