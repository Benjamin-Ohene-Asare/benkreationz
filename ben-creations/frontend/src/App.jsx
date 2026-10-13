
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Shared AI Assistant Provider
import { AIAssistantProvider } from "./components/AIAssistant/AIAssistantContext";

// Layout Components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

// AI Assistant
import AIAssistantWidget from "./components/AIAssistant/AIAssistantWidget";
import AIAssistantPage from "./pages/AIAssistantPage/AIAssistantPage";

// Pages
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import Portfolio from "./sections/Portfolio/Portfolio";

// Free Tools
import WhatsAppLink from "./pages/WhatsAppLink/WhatsAppLink";
import Tool from "./pages/tools/Tool";
import QRGenerator from "./pages/QRGenerator/QRGenerator";

// Global Styles
import "./styles/global.css";
import "./styles/variables.css";
import "./styles/responsive.css";

function App() {
  return (
    <BrowserRouter>
      <AIAssistantProvider>
        <ScrollToTop />

        <Navbar />

        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/tools" element={<Tool />} />
            <Route path="/portfolio" element={<Portfolio />} />

            <Route
              path="/ai-assistant"
              element={<AIAssistantPage />}
            />

            <Route
              path="/tools/whatsapp-link"
              element={<WhatsAppLink />}
            />

            <Route
              path="/tools/qr-generator"
              element={<QRGenerator />}
            />
          </Routes>
        </main>

        <Footer />

        {/* Global Floating AI Assistant */}
        <AIAssistantWidget />
      </AIAssistantProvider>
    </BrowserRouter>
  );
}

export default App;
