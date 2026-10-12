
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

import About from "./pages/About/About";
import Home from "./pages/Home/Home";
// Free Tools
import WhatsAppLink from "./pages/WhatsAppLink/WhatsAppLink";
import Tool from "./pages/tools/Tool";
import QRGenerator from "./pages/QRGenerator/QRGenerator";
import Portfolio from "./sections/Portfolio/Portfolio";

// Global styles
import "./styles/global.css";
import "./styles/variables.css";
import "./styles/responsive.css";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Navbar />

      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/tools" element={<Tool />} />
          <Route path="/portfolio" element={<Portfolio />} /> 

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
    </BrowserRouter>
  );
}

export default App;
