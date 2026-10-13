
import { useEffect, useId, useRef, useState } from "react";
import {
  Bot,
  Send,
  User,
  LoaderCircle,
  AlertCircle,
  BriefcaseBusiness,
  CheckCircle2,
} from "lucide-react";

import { useAIAssistant } from "./AIAssistantContext";
import AIEnquiryForm from "./AIEnquiryForm";
import "./AIAssistant.css";

export default function AIAssistant() {
  const { messages, isLoading, error, sendMessage } =
    useAIAssistant();

  const [input, setInput] = useState("");
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  const inputId = useId();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!showEnquiryForm) {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [messages, isLoading, showEnquiryForm]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const message = input.trim();

    if (!message || isLoading) return;

    setInput("");
    await sendMessage(message);
  };

  // Prepare an editable summary from the conversation.
  // This does not make another Gemini API request.
  const projectSummary = messages
    .filter((item) => item.role === "user")
    .map((item) => item.content.trim())
    .filter(Boolean)
    .slice(-10)
    .join("\n\n")
    .slice(0, 5000);

  const handleEnquirySuccess = () => {
    setShowEnquiryForm(false);
    setEnquirySubmitted(true);
  };

  return (
    <section className="bk-ai">
      {/* HEADER */}
      <header className="bk-ai__header">
        <div className="bk-ai__avatar">
          <Bot size={23} aria-hidden="true" />
        </div>

        <div className="bk-ai__heading">
          <h2>BenKreations AI</h2>
          <p>Your creative assistant</p>
        </div>

        <span className="bk-ai__status">
          AI Assistant
        </span>
      </header>

      {showEnquiryForm ? (
        <AIEnquiryForm
          projectSummary={projectSummary}
          onBack={() => setShowEnquiryForm(false)}
          onSuccess={handleEnquirySuccess}
        />
      ) : (
        <>
          {/* CONVERSATION */}
          <div
            className="bk-ai__messages"
            role="log"
            aria-label="AI Assistant conversation"
            aria-live="polite"
            aria-relevant="additions"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`bk-ai__message bk-ai__message--${message.role}`}
              >
                <div className="bk-ai__message-icon">
                  {message.role === "assistant" ? (
                    <Bot size={16} aria-hidden="true" />
                  ) : (
                    <User size={16} aria-hidden="true" />
                  )}
                </div>

                <p>{message.content}</p>
              </div>
            ))}

            {isLoading && (
              <div className="bk-ai__typing" role="status">
                <LoaderCircle
                  size={17}
                  className="bk-ai__spinner"
                  aria-hidden="true"
                />
                BenKreations AI is thinking...
              </div>
            )}

            {error && (
              <div
                role="alert"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                  padding: "12px",
                  borderRadius: "10px",
                  background: "#fff2f2",
                  color: "#a32626",
                  fontSize: "12px",
                  lineHeight: 1.5,
                }}
              >
                <AlertCircle
                  size={17}
                  aria-hidden="true"
                  style={{ flexShrink: 0 }}
                />
                <span>{error}</span>
              </div>
            )}

            {enquirySubmitted && (
              <div
                role="status"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "9px",
                  padding: "13px",
                  borderRadius: "11px",
                  background: "#edf9f0",
                  color: "#216638",
                  fontSize: "12px",
                  lineHeight: 1.6,
                }}
              >
                <CheckCircle2
                  size={18}
                  aria-hidden="true"
                  style={{ flexShrink: 0 }}
                />
                Your enquiry has been submitted successfully.
                Thank you for contacting BenKreations!
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* PROJECT ENQUIRY ACTION */}
          <div className="bk-ai__project-action">
            <button
              type="button"
              className="bk-ai__project-button"
              onClick={() => {
                setEnquirySubmitted(false);
                setShowEnquiryForm(true);
              }}
            >
              <BriefcaseBusiness size={16} aria-hidden="true" />
              Start a Project
            </button>
          </div>

          {/* MESSAGE INPUT */}
          <form
            className="bk-ai__composer"
            onSubmit={handleSubmit}
          >
            <label
              htmlFor={inputId}
              className="bk-ai__sr-only"
            >
              Your message
            </label>

            <input
              id={inputId}
              type="text"
              value={input}
              onChange={(event) =>
                setInput(event.target.value)
              }
              placeholder="Ask BenKreations AI..."
              maxLength={2000}
              autoComplete="off"
              disabled={isLoading}
            />

            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
            >
              {isLoading ? (
                <LoaderCircle
                  size={19}
                  className="bk-ai__spinner"
                  aria-hidden="true"
                />
              ) : (
                <Send size={19} aria-hidden="true" />
              )}
            </button>
          </form>
        </>
      )}

      <div className="bk-ai__footer">
        AI responses may contain mistakes. Verify important details.
      </div>
    </section>
  );
}
