
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// SEO
import SEO from "./components/SEO/SEO";

// Shared AI Assistant Provider
import { AIAssistantProvider } from "./components/AIAssistant/AIAssistantContext";

// Portfolio Layout Components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

// AI Assistant
import AIAssistantWidget from "./components/AIAssistant/AIAssistantWidget";
import AIAssistantPage from "./pages/AIAssistantPage/AIAssistantPage";

// Portfolio Pages
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import Portfolio from "./sections/Portfolio/Portfolio";

// Free Tools
import WhatsAppLink from "./pages/WhatsAppLink/WhatsAppLink";
import Tool from "./pages/tools/Tool";
import QRGenerator from "./pages/QRGenerator/QRGenerator";

// Academy Components
import AcademyNavbar from "./academy/components/AcademyNavbar";

// Academy Pages
import AcademyHome from "./academy/pages/AcademyHome";
import CourseCatalog from "./academy/pages/CourseCatalog";
import StudentDashboard from "./academy/pages/StudentDashboard";
import CourseLearningPage from "./academy/pages/CourseLearningPage";

// Global Styles
import "./styles/global.css";
import "./styles/variables.css";
import "./styles/responsive.css";

// SEO configuration for public pages
const pageSEO = {
 
"/": {
  title: "Benjamin Ohene Asare | Frontend Developer & IT Student",
  description:
    "Meet Benjamin Ohene Asare, a frontend web developer, graphic designer, and Information Technology student at Pentecost University, Ghana. Explore his education, technical skills, projects, and professional experience.",
},


  "/about": {
    title: "About Us",
    description:
      "Learn about BenKreations, our creative expertise, digital skills, and passion for web development, graphic design, AI video creation, and digital innovation.",
  },

  "/portfolio": {
    title: "Creative Portfolio & Projects",
    description:
      "Explore BenKreations creative projects, including graphic design, websites, motion graphics, AI-generated videos, branding, and digital campaigns.",
  },

  "/tools": {
    title: "Free Online Digital Tools",
    description:
      "Explore free online tools from BenKreations, including a WhatsApp link generator and QR code generator.",
  },

  "/tools/whatsapp-link": {
    title: "Free WhatsApp Link Generator",
    description:
      "Generate a free WhatsApp chat link for your phone number with BenKreations. Make it easy for customers and friends to contact you directly on WhatsApp.",
  },

  "/tools/qr-generator": {
    title: "Free QR Code Generator",
    description:
      "Create QR codes for links and other supported content using the free BenKreations QR Code Generator.",
  },

  "/ai-assistant": {
    title: "AI Assistant",
    description:
      "Explore the BenKreations AI Assistant and discover how AI-powered tools can support digital creativity and productivity.",
  },

  "/academy": {
    title: "BenKreations Academy",
    description:
      "Discover BenKreations Academy, a digital learning platform focused on practical creative and technology skills.",
  },

  "/academy/courses": {
    title: "Academy Courses",
    description:
      "Explore courses at BenKreations Academy covering web development, graphic design, AI content creation, and digital marketing.",
  },
};

function AppContent() {
  const location = useLocation();

  const currentPath =
    location.pathname.replace(/\/+$/, "") || "/";

  const isAcademyPage =
    currentPath === "/academy" ||
    currentPath.startsWith("/academy/");

  const showAcademyNavbar =
    currentPath === "/academy" ||
    currentPath === "/academy/courses" ||
    currentPath.startsWith("/academy/courses/");

  const seo = pageSEO[currentPath];

  const isPrivateOrUnfinished =
    currentPath === "/academy/dashboard" ||
    currentPath.startsWith("/academy/courses/");

  return (
    <AIAssistantProvider>
      <ScrollToTop />

      <SEO
        title={
          seo?.title ||
          "BenKreations"
        }
        description={
          seo?.description ||
          "Explore BenKreations creative digital services, tools, and learning resources."
        }
        path={currentPath}
        noIndex={isPrivateOrUnfinished || !seo}
      />

      {/* Portfolio navigation only */}
      {!isAcademyPage && <Navbar />}

      {/* Academy navigation */}
      {showAcademyNavbar && <AcademyNavbar />}

      <main id="main-content">
        <Routes>
          {/* PORTFOLIO */}
          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />

          <Route path="/tools" element={<Tool />} />

          <Route path="/portfolio" element={<Portfolio />} />

          <Route
            path="/ai-assistant"
            element={<AIAssistantPage />}
          />

          {/* FREE TOOLS */}
          <Route
            path="/tools/whatsapp-link"
            element={<WhatsAppLink />}
          />

          <Route
            path="/tools/qr-generator"
            element={<QRGenerator />}
          />

          {/* BENKREATIONS ACADEMY */}
          <Route
            path="/academy"
            element={<AcademyHome />}
          />

          <Route
            path="/academy/courses"
            element={<CourseCatalog />}
          />

          <Route
            path="/academy/dashboard"
            element={<StudentDashboard />}
          />

          <Route
            path="/academy/courses/:slug"
            element={<CourseLearningPage />}
          />
        </Routes>
      </main>

      {/* Portfolio footer only */}
      {!isAcademyPage && <Footer />}

      {/* Portfolio floating AI assistant only */}
      {!isAcademyPage && <AIAssistantWidget />}
    </AIAssistantProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
