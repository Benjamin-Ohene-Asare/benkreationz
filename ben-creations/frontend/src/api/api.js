
const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  "http://127.0.0.1:8000"
).replace(/\/+$/, "");

// ==========================================
// CONTACT ENQUIRY
// ==========================================

export async function submitContactEnquiry(formData) {
  const response = await fetch(`${API_BASE_URL}/contact/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone?.trim() || "",
      subject: formData.service || "General Enquiry",
      message: formData.message.trim(),
    }),
  });

  let result;

  try {
    result = await response.json();
  } catch {
    throw new Error(
      "Unexpected server response. Please try again."
    );
  }

  if (!response.ok) {
    const firstError = Object.values(result)
      .flat()
      .find((value) => typeof value === "string");

    throw new Error(
      firstError ||
      result.detail ||
      "Unable to send your enquiry."
    );
  }

  return result;
}

// ==========================================
// BENKREATIONS AI ASSISTANT
// ==========================================

export async function sendAIMessage(message, history = []) {
  const response = await fetch(`${API_BASE_URL}/ai/chat/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: message.trim(),
      history: history.slice(-10).map((item) => ({
        role: item.role,
        content: item.content,
      })),
    }),
  });

  let result;

  try {
    result = await response.json();
  } catch {
    throw new Error(
      "The AI Assistant returned an unexpected response."
    );
  }

  if (!response.ok) {
    throw new Error(
      result.error ||
      result.detail ||
      "The AI Assistant is temporarily unavailable."
    );
  }

  if (
    typeof result.reply !== "string" ||
    !result.reply.trim()
  ) {
    throw new Error(
      "The AI Assistant returned an empty response."
    );
  }

  return result.reply;
}
