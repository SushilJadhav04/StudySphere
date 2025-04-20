import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { AuthContext } from "../components/context/AuthContext";
import { FlipWords } from "../components/ui/flip-words";
import Footer from "../components/layout/Footer";
import { ThemeContext } from "../components/context/ThemeContext";
import Button from "../components/common/Button";
import "../styles/Home.css";

const Home = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  // 🔐 Google Login Handler
  const handleGoogleLogin = () => {
    window.location.href = "https://studysphere-dijr.onrender.com/auth/google-login"; // Or your deployed backend URL
  };

  return (
    <div className="flex flex-col min-h-screen text-black dark:text-white bg-white dark:bg-black overflow-x-hidden">
      {/* Main Content */}
      <div className="z-10 flex-1 flex flex-col items-center justify-center px-4 py-10">
        <div className="relative z-10 text-center">
          {/* Main Heading */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-center">
            <span className="inline-flex flex-wrap justify-center items-center gap-2">
              Your path to&nbsp;
              <FlipWords
                words={[
                  "Growth",
                  "Success",
                  "Creation",
                  "Knowledge",
                  "Discovery",
                  "Innovation",
                  "Transformation",
                ]}
              />
            </span>
          </h1>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-2">
            starts here!
          </h2>

          {/* Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-6 flex-wrap px-16 py-2">
            {!isLoggedIn && (
              <Button
                className="w-full sm:w-auto text-center px-4 py-2"
                onClick={handleGoogleLogin}
              >
                Login
              </Button>
            )}

            <Link to="/Summarization" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto flex justify-center items-center gap-2 text-center">
                Let's Go <FaArrowRight className="text-lg" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
