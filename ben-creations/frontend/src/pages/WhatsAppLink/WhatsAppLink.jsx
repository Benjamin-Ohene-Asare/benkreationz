
import { useEffect, useRef, useState } from "react";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import {
  MessageCircle,
  Copy,
  Check,
  ExternalLink,
  Link2,
  Phone,
  RotateCcw,
} from "lucide-react";

import "./WhatsAppLink.css";

const COUNTRY_CODES = [
  { country: "GH", code: "233", label: "Ghana (+233)" },
  { country: "NG", code: "234", label: "Nigeria (+234)" },
  { country: "US", code: "1", label: "USA (+1)" },
  { country: "CA", code: "1", label: "Canada (+1)" },
  { country: "GB", code: "44", label: "United Kingdom (+44)" },
  { country: "ZA", code: "27", label: "South Africa (+27)" },
  { country: "KE", code: "254", label: "Kenya (+254)" },
  { country: "IN", code: "91", label: "India (+91)" },
];

function WhatsAppLink() {
  const [country, setCountry] = useState("GH");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const clearResult = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    setLoading(false);
    setGeneratedLink("");
    setCopied(false);
    setError("");
  };

  const generateLink = (event) => {
    event.preventDefault();
    clearResult();

    const rawNumber = phone.trim();

    if (!rawNumber) {
      setError("Please enter a WhatsApp phone number.");
      return;
    }

    // Allow digits, spaces, hyphens, brackets and an optional +.
    if (!/^\+?[\d\s()-]+$/.test(rawNumber)) {
      setError("Use a valid phone number containing digits only.");
      return;
    }

    const selectedCountry = COUNTRY_CODES.find(
      (item) => item.country === country
    );

    if (!selectedCountry) {
      setError("Please select a valid country.");
      return;
    }

    // Local numbers are interpreted using the selected country.
    // International numbers beginning with + are checked
    // against the selected country.
    const parsed = parsePhoneNumberFromString(
      rawNumber,
      selectedCountry.country
    );

    if (!parsed || !parsed.isValid()) {
      setError(
        `Please enter a valid phone number for ${selectedCountry.label}.`
      );
      return;
    }

    if (parsed.country !== selectedCountry.country) {
      setError(
        `This number does not match ${selectedCountry.label}. Please select the correct country.`
      );
      return;
    }

    const internationalNumber = parsed.number.replace("+", "");

    const baseUrl = `https://wa.me/${internationalNumber}`;

    const link = message.trim()
      ? `${baseUrl}?text=${encodeURIComponent(message.trim())}`
      : baseUrl;

    setLoading(true);

    // Short visual feedback only; link generation is local.
    timerRef.current = setTimeout(() => {
      setGeneratedLink(link);
      setLoading(false);
      timerRef.current = null;
    }, 450);
  };

  const copyLink = async () => {
    if (!generatedLink) return;

    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setError("");
    } catch {
      setError(
        "Automatic copying failed. Select and copy the generated link manually."
      );
    }
  };

  const resetForm = () => {
    clearResult();
    setCountry("GH");
    setPhone("");
    setMessage("");
  };

  return (
    <section className="wa-tool-page">
      <div className="wa-tool-container">
        <div className="wa-tool-header">
          <span className="wa-tool-eyebrow">
            BEN CREATIONS / FREE TOOLS
          </span>

          <h1>
            WhatsApp Link <em>Generator.</em>
          </h1>

          <p>
            Create a direct WhatsApp chat link for your business,
            website, or social media profile. No registration required.
          </p>
        </div>

        <div className="wa-tool-layout">
          <div className="wa-tool-card">
            <div className="wa-tool-card-heading">
              <div className="wa-tool-icon">
                <MessageCircle size={23} />
              </div>

              <div>
                <h2>Create your link</h2>
                <p>Enter your details below to get started.</p>
              </div>
            </div>

            <form onSubmit={generateLink} noValidate>
              <div className="wa-tool-field">
                <label htmlFor="wa-country">Country code</label>

                <select
                  id="wa-country"
                  value={country}
                  disabled={loading}
                  onChange={(event) => {
                    setCountry(event.target.value);
                    clearResult();
                  }}
                >
                  {COUNTRY_CODES.map((item) => (
                    <option
                      key={item.country}
                      value={item.country}
                    >
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="wa-tool-field">
                <label htmlFor="wa-phone">
                  WhatsApp number
                </label>

                <div className="wa-tool-input-wrap">
                  <Phone size={18} />

                  <input
                    id="wa-phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel-national"
                    placeholder="024 123 4567"
                    value={phone}
                    disabled={loading}
                    aria-invalid={Boolean(error)}
                    aria-describedby="wa-phone-help"
                    onChange={(event) => {
                      setPhone(event.target.value);
                      clearResult();
                    }}
                    required
                  />
                </div>

                <small id="wa-phone-help">
                  Enter a local number or a full international
                  number starting with +.
                </small>
              </div>

              <div className="wa-tool-field">
                <label htmlFor="wa-message">
                  Pre-filled message <span>(Optional)</span>
                </label>

                <textarea
                  id="wa-message"
                  rows="5"
                  placeholder="Hello! I would like to enquire about your services."
                  value={message}
                  disabled={loading}
                  onChange={(event) => {
                    setMessage(event.target.value);
                    clearResult();
                  }}
                  maxLength={2000}
                />
              </div>

              {error && (
                <p className="wa-tool-error" role="alert">
                  {error}
                </p>
              )}

              <div className="wa-tool-form-actions">
                <button
                  type="submit"
                  className="wa-tool-generate"
                  disabled={loading}
                  aria-busy={loading}
                >
                  {loading ? (
                    <>
                      <span
                        className="wa-tool-spinner"
                        aria-hidden="true"
                      />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Link2 size={18} />
                      Generate WhatsApp Link
                    </>
                  )}
                </button>

                <button
                  type="button"
                  className="wa-tool-reset"
                  onClick={resetForm}
                  disabled={loading}
                  aria-label="Reset form"
                  title="Reset form"
                >
                  <RotateCcw size={18} />
                </button>
              </div>
            </form>
          </div>

          <div className="wa-tool-result-card">
            <div className="wa-tool-result-heading">
              <span className="wa-tool-result-label">
                YOUR GENERATED LINK
              </span>

              <div className="wa-tool-result-icon">
                <Link2 size={20} />
              </div>
            </div>

            <h2>Ready to connect?</h2>

            <p>
              Generate your link and share it anywhere your
              customers can find you.
            </p>

            {generatedLink ? (
              <div className="wa-tool-result-content">
                <label htmlFor="wa-generated-link">
                  Your WhatsApp link
                </label>

                <input
                  id="wa-generated-link"
                  type="text"
                  readOnly
                  value={generatedLink}
                  onFocus={(event) => event.target.select()}
                />

                <button
                  type="button"
                  className="wa-tool-copy"
                  onClick={copyLink}
                >
                  {copied ? (
                    <Check size={18} />
                  ) : (
                    <Copy size={18} />
                  )}

                  {copied ? "Copied!" : "Copy Link"}
                </button>

                <a
                  href={generatedLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wa-tool-open"
                >
                  <ExternalLink size={17} />
                  Open in WhatsApp
                </a>
              </div>
            ) : (
              <div
                className="wa-tool-empty-state"
                aria-live="polite"
              >
                {loading ? (
                  <>
                    <span
                      className="wa-tool-spinner wa-tool-spinner-large"
                      aria-hidden="true"
                    />
                    <span>Preparing your WhatsApp link...</span>
                  </>
                ) : (
                  <>
                    <MessageCircle
                      size={34}
                      strokeWidth={1.5}
                    />
                    <span>
                      Your generated link will appear here.
                    </span>
                  </>
                )}
              </div>
            )}

            <div className="wa-tool-result-footer">
              <Check size={16} />
              Free to use. No account required.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhatsAppLink;
