import React from "react";

const Footer = () => {
  return (
    <footer className="bg-transparent text-gray-300 py-4 w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-3">
          <p className="text-center text-sm text-gray-800 dark:text-gray-200">
            &copy; {new Date().getFullYear()} Study Sphere. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center space-x-8">
            <a
              href="/PrivacyPolicy"
              className="text-sm text-gray-800 dark:text-gray-200 hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/TermsOfService"
              className="text-sm text-gray-800 dark:text-gray-200 hover:text-white transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="/ContactUs"
              className="text-sm text-gray-800 dark:text-gray-200 hover:text-white transition-colors"
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
