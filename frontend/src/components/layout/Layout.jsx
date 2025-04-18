import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <footer
      className={`${
        isDark ? "bg-gray-900 text-white" : "bg-white text-black"
      } py-4 w-full transition-colors duration-300 border-t ${
        isDark ? "border-gray-700" : "border-gray-300"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-3">
          <p className="text-center text-sm font-medium">
            &copy; {new Date().getFullYear()} Study Sphere. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center space-x-8">
            <a
              href="/PrivacyPolicy"
              className={`text-sm font-medium ${
                isDark ? "hover:text-gray-300" : "hover:text-blue-700"
              } transition-colors`}
            >
              Privacy Policy
            </a>
            <a
              href="/TermsOfService"
              className={`text-sm font-medium ${
                isDark ? "hover:text-gray-300" : "hover:text-blue-700"
              } transition-colors`}
            >
              Terms of Service
            </a>
            <a
              href="/ContactUs"
              className={`text-sm font-medium ${
                isDark ? "hover:text-gray-300" : "hover:text-blue-700"
              } transition-colors`}
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
