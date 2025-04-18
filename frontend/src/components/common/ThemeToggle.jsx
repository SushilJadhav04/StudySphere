import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Moon, Sun } from "lucide-react"; // Removed Laptop icon

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const renderIcon = () => {
    return theme === "light" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />;
  };

  return (
    <button
  onClick={toggleTheme}
  className="p-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-800 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-700 transition-all shadow-sm"
  title={`Switch theme (current: ${theme})`}
>
  {renderIcon()}
</button>

  );
};

export default ThemeToggle;
