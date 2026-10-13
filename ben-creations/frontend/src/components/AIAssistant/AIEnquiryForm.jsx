
import { useState } from "react";
import { ArrowLeft, LoaderCircle, Send } from "lucide-react";

import { submitContactEnquiry } from "../../api/api";
import "./AIEnquiryForm.css";
const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

export default function AIEnquiryForm({
  projectSummary = "",
  onBack,
  onSuccess,
}) {
  const [form, setForm] = useState(() => ({
    ...INITIAL_FORM,
    message: projectSummary,
  }));

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submitting) return;

    setSubmitting(true);
    setError("");

    try {
      await submitContactEnquiry(form);
      onSuccess?.();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to submit your enquiry."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bk-ai-enquiry">
      <div className="bk-ai-enquiry__heading">
        <button
          type="button"
          onClick={onBack}
          disabled={submitting}
          aria-label="Return to conversation"
        >
          <ArrowLeft size={18} />
        </button>

        <div>
          <h3>Start your project</h3>
          <p>
            Review your details before submitting.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <label>
          Full name *
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={updateField}
            maxLength={120}
            autoComplete="name"
            required
          />
        </label>

        <label>
          Email address *
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={updateField}
            maxLength={254}
            autoComplete="email"
            required
          />
        </label>

        <label>
          Phone number
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={updateField}
            maxLength={30}
            autoComplete="tel"
          />
        </label>

        <label>
          Service *
          <select
            name="service"
            value={form.service}
            onChange={updateField}
            required
          >
            <option value="">Select a service</option>
            <option value="Web Development">
              Web Development
            </option>
            <option value="Graphic Design">
              Graphic Design
            </option>
            <option value="Motion Graphics">
              Motion Graphics
            </option>
            <option value="AI Video Creation">
              AI Video Creation
            </option>
            <option value="Digital Marketing">
              Digital Marketing
            </option>
            <option value="Other">
              Other
            </option>
          </select>
        </label>

        <label>
          Project details *
          <textarea
            name="message"
            value={form.message}
            onChange={updateField}
            placeholder="Describe your project requirements..."
            maxLength={5000}
            rows={5}
            required
          />
        </label>

        {error && (
          <p className="bk-ai-enquiry__error" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="bk-ai-enquiry__submit"
          disabled={submitting}
        >
          {submitting ? (
            <>
              <LoaderCircle
                size={17}
                className="bk-ai__spinner"
              />
              Submitting...
            </>
          ) : (
            <>
              <Send size={17} />
              Submit Enquiry
            </>
          )}
        </button>

        <p className="bk-ai-enquiry__notice">
          Your enquiry will only be sent when you click
          Submit Enquiry.
        </p>
      </form>
    </div>
  );
}
