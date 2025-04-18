import { useState, useEffect, useContext, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "../common/ThemeToggle";
import Button from "../common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {  AuthProvider ,AuthContext } from "../context/AuthContext";

const FeatureNavbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const { user, logout, loading } = useContext(AuthContext);


  const features = {
    "/Summarization": "Summarization",
    "/Translation": "Translation",
    "/StudySparks": "Study Sparks",
    "/Chat": "Chatbot",
    "/books": "Book Repository",
    "/youtube": "YouTube Summarization",
  };

  useEffect(() => {
    const currentFeature = features[location.pathname] || "Home";
    setActiveFeature(currentFeature);
  }, [location]);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate("/"); // Use react-router navigation instead of window.location.href
  };

  // Extract first name or fallback to full name or email
  const displayName = () => {
    if (!user) return "";
    if (user.name) return user.name.split(" ")[0];
    if (user.email) return user.email.split("@")[0];
    return "User";
  };

  return (
    <nav className="bg-lightBg dark:bg-darkBg text-black dark:text-white px-4 py-2 flex justify-between items-center shadow-lg fixed w-full top-0 left-0 z-50 h-16 transition-colors duration-300">
      <div className="flex-1 text-center font-bold text-lg">{activeFeature}</div>

      <div className="flex items-center gap-4 mr-4 relative">
        <ThemeToggle />

        {loading ? (
          <div className="text-gray-500">Loading...</div>
        ) : user ? (

          <>
            <Button
              onClick={() => setDropdownOpen((prev) => !prev)}
              variant="primary"
              className="text-lg px-5 py-2 flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faUser} />
              <span>{displayName()} ▼</span>
            </Button>

            {dropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg z-50"
              >
                <ul className="space-y-3 list-none pl-2">
                  <li
                    className="px-4 py-2 text-foreground/80 hover:bg-muted dark:hover:bg-muted/70 cursor-pointer transition-all"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </>
        ) : (
          <Link to="http://localhost:5000/auth/google-login">
            <Button variant="adaptive" className="text-lg px-10 py-3">
              Login
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default FeatureNavbar;
