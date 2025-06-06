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
      className="relative inline-block text-blue-500 font-poppins"
      style={{
        display: "inline-block",
        verticalAlign: "baseline", // Align with surrounding text
        minWidth: "10ch", // Prevent layout shift
        lineHeight:"1", 
        height:"1em",
        top:"0.1em",
      }}
    >
      <span
        className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
          isFlipping ? "opacity-0 translate-z-3" : "opacity-100 translate-y-0"
        }`}
        style={{
          display: "inline-block",
          whiteSpace: "nowrap",
          textAlign: "left",
        }}
      >
        {words[currentWordIndex]}
      </span>
    </span>
  );
};
