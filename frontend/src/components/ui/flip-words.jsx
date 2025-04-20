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
    <span className="relative inline-block min-w-[10ch] h-[2.5rem] sm:h-[3rem] md:h-[3.5rem]">
      <span
        className={`absolute inset-0 transition-all duration-500 ease-in-out transform text-blue-500 font-poppins font-bold
          ${isFlipping ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0"}
        `}
        style={{ whiteSpace: "nowrap" }}
      >
        {words[currentWordIndex]}
      </span>
    </span>
  );
};
