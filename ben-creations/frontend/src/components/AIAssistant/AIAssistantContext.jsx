
import {
  createContext,
  useContext,
  useRef,
  useState,
} from "react";

import { sendAIMessage } from "../../api/api";

const AIAssistantContext = createContext(null);

const WELCOME_MESSAGE = {
  id: "welcome",
  role: "assistant",
  content:
    "Hello! Welcome to BenKreations. I can help you explore our creative services, learn about our work, or discuss your project ideas. How can I assist you today?",
};

export function AIAssistantProvider({ children }) {
  const [messages, setMessages] = useState([
    WELCOME_MESSAGE,
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const sendingRef = useRef(false);
  const messagesRef = useRef([WELCOME_MESSAGE]);

  const sendMessage = async (text) => {
    const message = text.trim();

    if (!message || sendingRef.current) {
      return false;
    }

    sendingRef.current = true;
    setIsLoading(true);
    setError("");

    const history = messagesRef.current
      .filter((item) => item.id !== "welcome")
      .slice(-10)
      .map(({ role, content }) => ({
        role,
        content,
      }));

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: message,
    };

    messagesRef.current = [
      ...messagesRef.current,
      userMessage,
    ];

    setMessages(messagesRef.current);

    try {
      const reply = await sendAIMessage(
        message,
        history
      );

      const assistantMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: reply,
      };

      messagesRef.current = [
        ...messagesRef.current,
        assistantMessage,
      ];

      setMessages(messagesRef.current);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      sendingRef.current = false;
      setIsLoading(false);
    }

    return true;
  };

  return (
    <AIAssistantContext.Provider
      value={{
        messages,
        isLoading,
        error,
        sendMessage,
      }}
    >
      {children}
    </AIAssistantContext.Provider>
  );
}

export function useAIAssistant() {
  const context = useContext(AIAssistantContext);

  if (!context) {
    throw new Error(
      "useAIAssistant must be used within AIAssistantProvider."
    );
  }

  return context;
}
