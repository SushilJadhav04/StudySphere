import React, { useContext } from "react";
import classNames from "classnames";
import { ThemeContext } from "../context/ThemeContext";

const Button = ({
  type = "button",
  variant = "adaptive",
  disabled = false,
  children,
  className = "",
  ...props
}) => {
  const { theme } = useContext(ThemeContext);

  const baseStyles =
  "px-4 py-3 sm:px-5 sm:py-2.5 md:px-6 md:py-3 text-sm sm:text-base md:text-lg font-semibold rounded-md transition-all duration-300 focus:outline-none focus:ring-2 text-center";


  const variants = {
    primary:
      "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400",
    secondary:
      "bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-500",
    adaptive:
      "bg-black text-white hover:bg-neutral-900 focus:ring-gray-300 dark:bg-white dark:text-black dark:hover:bg-gray-200 dark:focus:ring-gray-500",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={classNames(
        baseStyles,
        variants[variant],
        { "opacity-50 cursor-not-allowed": disabled },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
