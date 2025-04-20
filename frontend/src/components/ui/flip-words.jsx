import React, { useState, useEffect } from "react";

export const FlipWords = ({ words, interval = 2000 }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    const wordTimer = setInterval(() => {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setIsFlipping(false);
      }, 500); // Sync with animation duration
    }, interval);

    return () => clearInterval(wordTimer);
  }, [words, interval]);

  return (
    <span
      className="relative inline-block"
      style={{
        display: "inline-block",
        verticalAlign: "baseline", // Align with surrounding text
        minWidth: "10ch", // Prevent layout shift
        height: "1em", // Match text line height
      }}
    >
      <span
        className={`absolute inset-0 transition-all duration-500 ease-in-out transform text-blue-500 font-bold`}
        style={{
          whiteSpace: "nowrap",
          display: "inline-block",
          transform: isFlipping ? "translateX(-100%)" : "translateX(0)",
          opacity: isFlipping ? 0 : 1,
          transition: "transform 0.5s ease-in-out, opacity 0.5s ease-in-out",
        }}
      >
        {words[currentWordIndex]}
      </span>
    </span>
  );
};
