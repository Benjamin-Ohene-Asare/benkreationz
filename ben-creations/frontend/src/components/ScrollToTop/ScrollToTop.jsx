
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Navigate to a specific section on the homepage
    if (hash) {
      const targetId = decodeURIComponent(hash.substring(1));
      let frameId;
      let attempts = 0;

      const scrollToSection = () => {
        const target = document.getElementById(targetId);

        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        } else if (attempts++ < 30) {
          frameId = requestAnimationFrame(scrollToSection);
        }
      };

      frameId = requestAnimationFrame(scrollToSection);

      return () => cancelAnimationFrame(frameId);
    }

    // Every new page opens from the top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname, hash]);

  return null;
}
