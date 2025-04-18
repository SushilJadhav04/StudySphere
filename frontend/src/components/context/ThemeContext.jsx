import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

// Determines the initial theme setting
const getInitialTheme = () => {
  const saved = localStorage.getItem("theme");
  if (saved) return saved;
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
  return "light";
};


export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme());

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme); // ❌ Removed system check
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggles between light and dark only
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
