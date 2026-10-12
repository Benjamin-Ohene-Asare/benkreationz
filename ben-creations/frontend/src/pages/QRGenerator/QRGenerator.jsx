
import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import {
  QrCode,
  Link2,
  Type,
  Wifi,
  MessageCircle,
  Download,
  RefreshCw,
} from "lucide-react";

import "./QRGenerator.css";

const qrTypes = [
  { id: "url", label: "Website URL", icon: Link2 },
  { id: "text", label: "Plain Text", icon: Type },
  { id: "whatsapp", label: "WhatsApp", icon: MessageCircle },
  { id: "wifi", label: "Wi-Fi", icon: Wifi },
];

const escapeWifi = (text) =>
  text.replace(/([\\;,":])/g, "\\$1");

export default function QRGenerator() {
  const [type, setType] = useState("url");
  const [value, setValue] = useState("");
  const [wifiName, setWifiName] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [wifiSecurity, setWifiSecurity] = useState("WPA");
  const [qrImage, setQrImage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const generationId = useRef(0);
  const loadingTimer = useRef(null);

  useEffect(() => {
    return () => {
      generationId.current += 1;
      clearTimeout(loadingTimer.current);
    };
  }, []);

  const cancelGeneration = () => {
    generationId.current += 1;
    clearTimeout(loadingTimer.current);
    setLoading(false);
  };

  const resetQR = () => {
    cancelGeneration();
    setValue("");
    setWifiName("");
    setWifiPassword("");
    setWifiSecurity("WPA");
    setQrImage("");
    setError("");
  };

  const changeType = (nextType) => {
    if (nextType === type) return;
    resetQR();
    setType(nextType);
  };

  const generateQR = async (event) => {
    event.preventDefault();

    if (loading) return;

    setError("");
    setQrImage("");

    let qrContent = "";

    if (type === "wifi") {
      if (!wifiName.trim()) {
        setError("Please enter your Wi-Fi network name.");
        return;
      }

      if (wifiSecurity !== "nopass" && !wifiPassword) {
        setError("Please enter your Wi-Fi password.");
        return;
      }

      qrContent =
        `WIFI:T:${wifiSecurity};` +
        `S:${escapeWifi(wifiName)};` +
        `P:${
          wifiSecurity === "nopass"
            ? ""
            : escapeWifi(wifiPassword)
        };;`;
    } else {
      const input = value.trim();

      if (!input) {
        setError(
          "Please enter the information for your QR code."
        );
        return;
      }

      if (type === "url") {
        try {
          const url = new URL(input);

          if (
            !["http:", "https:"].includes(url.protocol)
          ) {
            throw new Error("Invalid protocol");
          }

          qrContent = url.href;
        } catch {
          setError(
            "Please enter a valid website URL beginning with https://"
          );
          return;
        }
      } else if (type === "whatsapp") {
        try {
          const url = new URL(input);

          if (
            url.protocol !== "https:" ||
            !["wa.me", "api.whatsapp.com"].includes(
              url.hostname.toLowerCase()
            )
          ) {
            throw new Error("Invalid WhatsApp URL");
          }

          qrContent = url.href;
        } catch {
          setError(
            "Please enter a valid HTTPS WhatsApp link."
          );
          return;
        }
      } else {
        qrContent = input;
      }
    }

    const currentGeneration = ++generationId.current;
    const startedAt = Date.now();

    setLoading(true);

    try {
      const image = await QRCode.toDataURL(qrContent, {
        width: 1000,
        margin: 3,
        errorCorrectionLevel: "H",
        color: {
          dark: "#24133F",
          light: "#FFFFFF",
        },
      });

      const elapsed = Date.now() - startedAt;
      const remaining = Math.max(0, 3000 - elapsed);

      loadingTimer.current = setTimeout(() => {
        if (
          currentGeneration !== generationId.current
        ) {
          return;
        }

        setQrImage(image);
        setLoading(false);
        loadingTimer.current = null;
      }, remaining);
    } catch {
      if (
        currentGeneration !== generationId.current
      ) {
        return;
      }

      setError(
        "Unable to generate the QR code. Please try again."
      );
      setLoading(false);
    }
  };

  const downloadQR = () => {
    if (!qrImage || loading) return;

    const link = document.createElement("a");
    link.href = qrImage;
    link.download = "ben-creations-qr-code.png";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <section className="bc-qr-page">
      <div className="bc-qr-container">
        <header className="bc-qr-heading">
          <span className="bc-qr-eyebrow">
            BEN CREATIONS · FREE TOOLS
          </span>

          <h1>
            QR Code <span>Generator</span>
          </h1>

          <p>
            Create professional, high-quality QR codes for
            websites, text, WhatsApp links, and Wi-Fi networks.
          </p>
        </header>

        <div className="bc-qr-layout">
          <div className="bc-qr-card">
            <div className="bc-qr-card-heading">
              <QrCode size={24} />

              <div>
                <h2>Create Your QR Code</h2>
                <p>
                  Select what your QR code should contain.
                </p>
              </div>
            </div>

            <div className="bc-qr-types">
              {qrTypes.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`bc-qr-type ${
                      type === item.id ? "is-active" : ""
                    }`}
                    onClick={() => changeType(item.id)}
                    aria-pressed={type === item.id}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            <form onSubmit={generateQR}>
              {type === "wifi" ? (
                <>
                  <label htmlFor="bc-wifi-name">
                    Wi-Fi Network Name (SSID)
                  </label>

                  <input
                    id="bc-wifi-name"
                    value={wifiName}
                    onChange={(e) =>
                      setWifiName(e.target.value)
                    }
                    placeholder="Enter network name"
                    maxLength={128}
                    required
                  />

                  <label htmlFor="bc-wifi-security">
                    Security Type
                  </label>

                  <select
                    id="bc-wifi-security"
                    value={wifiSecurity}
                    onChange={(e) =>
                      setWifiSecurity(e.target.value)
                    }
                  >
                    <option value="WPA">
                      WPA / WPA2 / WPA3
                    </option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">
                      No Password
                    </option>
                  </select>

                  {wifiSecurity !== "nopass" && (
                    <>
                      <label htmlFor="bc-wifi-password">
                        Wi-Fi Password
                      </label>

                      <input
                        id="bc-wifi-password"
                        type="text"
                        value={wifiPassword}
                        onChange={(e) =>
                          setWifiPassword(e.target.value)
                        }
                        placeholder="Enter Wi-Fi password"
                        maxLength={128}
                        required
                      />
                    </>
                  )}
                </>
              ) : (
                <>
                  <label htmlFor="bc-qr-input">
                    {type === "url"
                      ? "Website URL"
                      : type === "whatsapp"
                      ? "WhatsApp Link"
                      : "Your Text"}
                  </label>

                  {type === "text" ? (
                    <textarea
                      id="bc-qr-input"
                      value={value}
                      onChange={(e) =>
                        setValue(e.target.value)
                      }
                      placeholder="Enter your text here..."
                      rows={5}
                      maxLength={2000}
                      required
                    />
                  ) : (
                    <input
                      id="bc-qr-input"
                      type="text"
                      value={value}
                      onChange={(e) =>
                        setValue(e.target.value)
                      }
                      placeholder={
                        type === "url"
                          ? "https://example.com"
                          : "https://wa.me/233..."
                      }
                      maxLength={2000}
                      required
                    />
                  )}
                </>
              )}

              {error && (
                <p className="bc-qr-error" role="alert">
                  {error}
                </p>
              )}

              <button
                className="bc-qr-generate"
                type="submit"
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="bc-qr-spinner"
                      aria-hidden="true"
                    />
                    <span>Generating QR Code...</span>
                  </>
                ) : (
                  <>
                    <QrCode size={19} />
                    <span>Generate QR Code</span>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="bc-qr-preview-card">
            <div className="bc-qr-preview-heading">
              <h2>Your QR Code</h2>
              <p>
                Your generated QR code will appear here.
              </p>
            </div>

            <div
              className="bc-qr-preview"
              aria-live="polite"
            >
              {loading ? (
                <div className="bc-qr-empty">
                  <span
                    className="bc-qr-preview-spinner"
                    aria-hidden="true"
                  />
                  <p>Creating your QR code...</p>
                </div>
              ) : qrImage ? (
                <img
                  src={qrImage}
                  alt="Your generated QR code"
                />
              ) : (
                <div className="bc-qr-empty">
                  <QrCode
                    size={82}
                    strokeWidth={1.1}
                  />
                  <p>
                    Ready to create your QR code
                  </p>
                </div>
              )}
            </div>

            <div className="bc-qr-preview-actions">
              <button
                type="button"
                className="bc-qr-download"
                onClick={downloadQR}
                disabled={!qrImage || loading}
              >
                <Download size={18} />
                Download PNG
              </button>

              <button
                type="button"
                className="bc-qr-reset"
                onClick={resetQR}
              >
                <RefreshCw size={17} />
                Reset
              </button>
            </div>

            <p className="bc-qr-preview-note">
              Free to use · High-resolution PNG · No signup
              required
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
