import { useState } from "react";
import {
  FiArrowUpRight,
  FiMail,
  FiMessageCircle,
  FiMapPin,
  FiSend,
  FiInstagram,
  FiFacebook,
  FiYoutube,
} from "react-icons/fi";
import { submitContactEnquiry } from "../../api/api";


import "./Contact.css";

/*
  Replace these placeholders with your actual details.
  The form uses mailto for now; no backend is required.
*/

const CONTACT_EMAIL = "hello@example.com";
const WHATSAPP_NUMBER = "";

const socialLinks = [
  {
    label: "Instagram",
    href: "",
    icon: FiInstagram,
  },
  {
    label: "Facebook",
    href: "",
    icon: FiFacebook,
  },
  {
    label: "YouTube",
    href: "",
    icon: FiYoutube,
  },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) setError("");
  };


  
const handleSubmit = async (event) => {
  event.preventDefault();

  if (isSubmitting) return;

  setError("");
  setSuccess("");

  if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
    setError("Please complete the required fields.");
    return;
  }

  setIsSubmitting(true);

  try {
    const result = await submitContactEnquiry(form);

    setSuccess(
      result.message ||
        "Your enquiry has been received successfully."
    );

    setForm({
      name: "",
      email: "",
      service: "",
      message: "",
    });
  } catch (err) {
    setError(
      err instanceof Error
        ? err.message
        : "Unable to send your enquiry. Please try again."
    );
  } finally {
    setIsSubmitting(false);
  }
};



  const whatsappUrl = WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      "Hello Ben Creations, I'd like to discuss a project."
    )}`
    : null;

  return (
    <section
      id="contact"
      className="ben-contact"
      aria-labelledby="ben-contact-title"
    >
      <div className="ben-contact-background" aria-hidden="true">
        <div className="ben-contact-grid-pattern" />
        <div className="ben-contact-glow" />
        <div className="ben-contact-ring" />
      </div>

      <div className="ben-contact-container">
        {/* <div className="ben-contact-topline">
          <span>06 / GET IN TOUCH</span>
          <span className="ben-contact-topline-rule" />
          <span>LET'S COLLABORATE</span>
        </div> */}

        <div className="ben-contact-layout">
          {/* LEFT SIDE */}

          <div className="ben-contact-intro">
            <span className="ben-contact-eyebrow">
              HAVE SOMETHING IN MIND?
            </span>

            <h2 id="ben-contact-title" className="ben-contact-title">
              Let's create
              <br />
              something <em>great.</em>
            </h2>

            <p className="ben-contact-description">
              Have a project, creative idea, or business you'd like to
              bring to life? Whether it's graphic design, AI-powered
              videos, or a website, I'd love to hear what you have in mind.
            </p>

            <div className="ben-contact-details">
              <div className="ben-contact-detail">
                <div className="ben-contact-detail-icon">
                  <FiMail aria-hidden="true" />
                </div>

                <div>
                  <span>EMAIL ME</span>
                  {CONTACT_EMAIL === "hello@example.com" ? (
                    <p>Email coming soon</p>
                  ) : (
                    <a href={`mailto:${CONTACT_EMAIL}`}>
                      {CONTACT_EMAIL}
                    </a>
                  )}
                </div>
              </div>

              <div className="ben-contact-detail">
                <div className="ben-contact-detail-icon">
                  <FiMapPin aria-hidden="true" />
                </div>

                <div>
                  <span>BASED IN</span>
                  <p>Ghana — Available for remote projects</p>
                </div>
              </div>
            </div>

            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                className="ben-contact-whatsapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiMessageCircle aria-hidden="true" />
                Let's Chat on WhatsApp
                <FiArrowUpRight aria-hidden="true" />
              </a>
            ) : (
              <span className="ben-contact-whatsapp ben-contact-whatsapp-disabled">
                <FiMessageCircle aria-hidden="true" />
                WhatsApp Contact Coming Soon
              </span>
            )}

            <div className="ben-contact-socials">
              <span>FIND ME ONLINE</span>

              <div className="ben-contact-social-list">
                {socialLinks
                  .filter((social) => Boolean(social.href))
                  .map((social) => {
                    const Icon = social.icon;

                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                      >
                        <Icon aria-hidden="true" />
                      </a>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE — CONTACT FORM */}

          <div className="ben-contact-form-card">
            <div className="ben-contact-form-header">
              <div>
                <span>SEND AN ENQUIRY</span>
                <h3>Tell me about your project.</h3>
              </div>

              <div className="ben-contact-form-icon">
                <FiSend aria-hidden="true" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="ben-contact-form">
              <div className="ben-contact-form-row">
                <div className="ben-contact-field">
                  <label htmlFor="ben-contact-name">
                    Your Name <span>*</span>
                  </label>

                  <input
                    id="ben-contact-name"
                    name="name"
                    type="text"
                    placeholder="Your full name"
                    autoComplete="name"
                    maxLength={100}
                    required
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="ben-contact-field">
                  <label htmlFor="ben-contact-email">
                    Email Address <span>*</span>
                  </label>

                  <input
                    id="ben-contact-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    maxLength={254}
                    required
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="ben-contact-field">
                <label htmlFor="ben-contact-service">
                  What do you need?
                </label>

                <select
                  id="ben-contact-service"
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                >
                  <option value="">Select a service</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="AI Video Production">
                    AI Video Production
                  </option>
                  <option value="Web Development">
                    Web Development
                  </option>
                  <option value="Branding & Identity">
                    Branding & Identity
                  </option>
                  <option value="Other">Something Else</option>
                </select>
              </div>

              <div className="ben-contact-field">
                <label htmlFor="ben-contact-message">
                  Your Message <span>*</span>
                </label>

                <textarea
                  id="ben-contact-message"
                  name="message"
                  rows={5}
                  placeholder="Tell me a little about your idea, goals, or project..."
                  maxLength={3000}
                  required
                  value={form.message}
                  onChange={handleChange}
                />
              </div>

              {error && (
                <p className="ben-contact-error" role="alert">
                  {error}
                </p>
              )}
              {success && (
                <p className="ben-contact-success" role="status">
                  {success}
                </p>
              )}

              <button
                type="submit"
                className="ben-contact-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Enquiry"}
                <FiArrowUpRight aria-hidden="true" />
              </button>

              <p className="ben-contact-form-note">
                Your enquiry will be sent securely to Ben Creations.
              </p>
              <p className="ben-contact-form-note">
                This opens your email app with your enquiry prepared.
                It does not submit your message directly.
              </p>
            </form>
          </div>
        </div>

        {/* <div className="ben-contact-bottom">
          <span>GREAT IDEAS START WITH A CONVERSATION</span>
          <span>BEN CREATIONS — LET'S BUILD SOMETHING</span>
        </div> */}
      </div>
    </section>
  );
}