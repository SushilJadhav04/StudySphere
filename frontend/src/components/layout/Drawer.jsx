import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Drawer = ({ children }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      
      <div className="drawer-content">
        {/* Toggle Button */}
        <label
          htmlFor="my-drawer"
          className="fixed top-4 left-4 z-50 p-3 bg-gray-900/80 text-white rounded-xl shadow-lg hover:bg-blue-500 transition-all duration-300 ease-in-out cursor-pointer"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </label>
        {children}
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <div
          className={`menu min-h-full w-80 p-6 shadow-2xl rounded-r-3xl transition-all duration-300 ${
            theme === "dark"
              ? "bg-black/90 text-white"
              : "bg-white text-black"
          }`}
        >
          <h2 className="text-xl font-bold text-center mb-4">Navigation</h2>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
