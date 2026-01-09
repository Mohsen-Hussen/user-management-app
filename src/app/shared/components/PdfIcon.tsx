import React, { useState, useEffect } from "react";
import pdfLight from "@/app/assets/pdf-light.svg";
import pdfDark from "@/app/assets/pdf-dark.svg";

interface PdfIconProps {
  className?: string;
}

export const PdfIcon: React.FC<PdfIconProps> = ({ className = "" }) => {
  const [isDarkMode, setIsDarkMode] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return <img src={isDarkMode ? pdfDark : pdfLight} alt="PDF" className={className} />;
};

export default PdfIcon;
