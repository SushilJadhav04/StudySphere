import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../common/ThemeToggle";
import { ThemeContext } from "../context/ThemeContext";
import Button from "../common/Button";

const Navbar = () => {
  const { theme } = useContext(ThemeContext);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  // Detect if screen is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 px-4 sm:px-6 py-2 transition-all duration-300 ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 w-full">

        {/* Logo */}
        <div className="text-center sm:text-left">
          <Link to="/" className="text-2xl font-extrabold tracking-wide">
            STUDYSPHERE
          </Link>
        </div>

        {/* Nav Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">

          {/* Features Dropdown */}
          <div
            className={`relative ${!isMobile ? "group" : ""}`}
          >
            {/* Toggle button */}
            <Button
              className="px-4 py-2 text-sm"
              onClick={() => isMobile && setIsMobileDropdownOpen(!isMobileDropdownOpen)}
            >
              Features
            </Button>

            {/* Dropdown */}
            <div
              className={`absolute left-1/2 sm:left-0 transform -translate-x-1/2 sm:transform-none mt-2 w-[90vw] sm:w-80 rounded-lg p-4 transition-all duration-300 z-50
                ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"} 
                ${isMobile
                  ? isMobileDropdownOpen
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                  : "opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100"}
              `}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                {[
                  { name: "Summarization", path: "/summarization", desc: "Summarize textbooks, PDFs, & docs." },
                  { name: "Translation", path: "/translation", desc: "Translate text into multiple languages." },
                  { name: "StudySparks", path: "/studysparks", desc: "Boost your learning with smart tools." },
                  { name: "Book Repository", path: "/books", desc: "Access a large collection of books." },
                  { name: "Chat", path: "/chat", desc: "Interactive AI chat for instant help." },
                  {name: "YouTube Summarizer", path: "/youtube", desc: "Summarize YouTube videos in seconds." },
                ].map((item, index) => (
                  <Link
                    to={item.path}
                    key={index}
                    className={`block p-2 rounded-md transition-all ${
                      theme === "dark"
                        ? "hover:bg-neutral-800"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <p className="font-bold">{item.name}</p>
                    <p className="text-xs">{item.desc}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* About Us */}
          <Link to="/AboutUs">
            <Button className="text-sm px-4 py-2">About Us</Button>
          </Link>

          {/* Theme Toggle */}
          <div className="flex justify-center sm:justify-end">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
