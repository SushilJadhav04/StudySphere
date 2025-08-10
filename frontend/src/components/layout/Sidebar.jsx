import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHome,
  faBook,
  faLanguage,
  faClipboardList,
  faRobot,
  faStar,
  faMessage,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../context/ThemeContext";


const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth > 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { name: "Home", icon: faHome, path: "/" },
    { name: "Summarization", icon: faClipboardList, path: "/Summarization" },
    { name: "Book Repository", icon: faBook, path: "/books" },
    { name: "Translation", icon: faLanguage, path: "/Translation" },
    { name: "StudySparks", icon: faStar, path: "/StudySparks" },
    { name: "ChatBot", icon: faRobot, path: "/Chat" },
    { name: "Youtube Summarizer", icon: faRobot, path: "/YoutubeSummarizer" },
    { name: "Contact Us", icon: faMessage, path: "/ContactUs" },

  ];

  const getLinkStyles = (path) => {
    const isActive = location.pathname === path;
    if (isActive) return "bg-gradient-to-r from-purple-600 to-blue-700 text-white";

    if (theme === "dark") {
      return "text-white hover:bg-gray-700";
    }
    return "text-black hover:bg-gray-100";
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-[15px] left-[15px] z-50 p-2 rounded-lg shadow-md transition-all duration-300 ease-in-out
          ${theme === "dark"
            ? "bg-gray-800 text-white hover:bg-gray-700"
            : "bg-gray-200 text-black hover:bg-gray-300"
          }`}
        aria-label="Toggle Sidebar"
      >
        <FontAwesomeIcon icon={faBars} className="w-4 h-4" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full transition-all duration-300 ease-in-out z-40 shadow-2xl rounded-r-xl flex flex-col justify-between
          ${isOpen ? "w-64" : "w-20"}
          ${theme === "dark" ? "bg-black text-white" : "bg-white text-black border-r border-gray-300"}
          ${window.innerWidth <= 768 && !isOpen ? "z-0" : "z-40"} 
        `}
        style={{
          display: window.innerWidth <= 768 && !isOpen ? "none" : "flex",
        }}
      >
        <nav className="mt-[75px] px-4 flex-grow">
          <ul className="space-y-3 list-none">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 group ${getLinkStyles(item.path)}`}
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className="text-xl transition-transform duration-200 group-hover:scale-110"
                  />
                  {isOpen && (
                    <span className="ml-4 font-semibold tracking-wide">
                      {item.name}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
