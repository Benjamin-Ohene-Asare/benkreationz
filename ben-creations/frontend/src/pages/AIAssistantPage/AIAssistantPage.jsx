
import AIAssistant from "../../components/AIAssistant/AIAssistant";
import "./AIAssistantPage.css";

export default function AIAssistantPage() {
  return (
    <section className="bk-ai-page">
      <div className="bk-ai-page__container">
        <div className="bk-ai-page__intro">
          <span className="bk-ai-page__eyebrow">
            BENKREATIONS AI
          </span>

          <h1>
            Your ideas start with a{" "}
            <span>conversation.</span>
          </h1>

          <p>
            Explore BenKreations services, ask questions about
            our creative work, or discuss your next project
            with our AI assistant.
          </p>
        </div>

        <div className="bk-ai-page__chat">
          <AIAssistant />
        </div>
      </div>
    </section>
  );
}
