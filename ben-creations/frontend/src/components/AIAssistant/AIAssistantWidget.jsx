
import { useState } from "react";
import { MessageCircle, X, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import AIAssistant from "./AIAssistant";
import "./AIAssistantWidget.css";

export default function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="bk-ai-widget" aria-label="BenKreations AI Assistant">
      {isOpen && (
        <div className="bk-ai-widget__panel">
          <div className="bk-ai-widget__toolbar">
            <span>BenKreations Assistant</span>

            <div className="bk-ai-widget__actions">
              <Link
                to="/ai-assistant"
                onClick={() => setIsOpen(false)}
                aria-label="Open full AI Assistant page"
                title="Open full page"
              >
                <ArrowUpRight size={17} />
              </Link>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close AI Assistant"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <AIAssistant />
        </div>
      )}

      <button
        type="button"
        className="bk-ai-widget__trigger"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={25} /> : <MessageCircle size={25} />}
      </button>
    </aside>
  );
}
