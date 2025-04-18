import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../components/context/ThemeContext";
import { IoClose } from "react-icons/io5";

const AboutUs = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const navigate = useNavigate();

  const baseText = isDark ? "text-white" : "text-black";
  const subText = isDark ? "text-gray-300" : "text-gray-800";
  const accentText = isDark ? "text-white" : "text-black"; 

  return (
    <div
      className={`relative min-h-screen flex flex-col items-center justify-start px-6 pt-24 pb-12 transition-colors duration-300 ${
        isDark ? "bg-[#0a0a0a]" : "bg-[#f4f4f4]"
      } ${baseText}`}
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className={`absolute top-1/4 left-1/2 w-96 h-96 ${isDark ? "bg-white" : "bg-black"} opacity-10 blur-[140px] rounded-full transform -translate-x-1/2`} />
        <div className={`absolute bottom-1/4 right-1/2 w-72 h-72 ${isDark ? "bg-white" : "bg-black"} opacity-10 blur-[100px] rounded-full transform translate-x-1/2`} />
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10 max-w-4xl w-full bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8 md:p-12 text-center animate-fade-in transition-all">
        {/* Close Button */}
        <button
          onClick={() => navigate(-1)}
          className={`absolute top-4 right-4 text-xl p-2 rounded-md hover:scale-110 transition ${
            theme === "dark"
              ? "text-white hover:bg-white/10"
              : "text-black hover:bg-black/10"
          }`}
        >
          <IoClose className={`${baseText} text-2xl`} />
        </button>

        <h1 className={`text-4xl sm:text-5xl font-bold mb-6 ${accentText}`}>
          About StudySphere
        </h1>

        <p className={`text-lg leading-relaxed ${subText}`}>
          Welcome to <strong className={accentText}>StudySphere</strong>, an innovative educational platform developed by the talented students of Shivajirao S. Jondhale College of Engineering. Our mission is to empower learners with cutting-edge tools for enhanced learning.
        </p>

        <Section title="Our Journey" subText={subText} accentText={accentText}>
          StudySphere evolved through various phases: <em>Resource Hub</em>, <em>Linguuify</em>, and now, a fully AI-integrated learning experience.
        </Section>

        <Section title="Innovative Features" subText={subText} accentText={accentText}>
          <ul className="space-y-2 text-left md:text-center text-lg">
            <li><strong>Smart Summarization Tool:</strong> Quickly distill key information.</li>
            <li><strong>Multi-Language Translation:</strong> Break language barriers.</li>
            <li><strong>AI Chatbot:</strong> Interactive learning assistant.</li>
            <li><strong>Books Repository:</strong> A vast collection of educational materials.</li>
            <li><strong>Study Sparks:</strong> Flashcards & smart summaries for revision.</li>
          </ul>
        </Section>

        <Section title="Our Goals" subText={subText} accentText={accentText}>
          <ul className="space-y-2 text-left md:text-center text-lg">
            <li>Integrate all tools into a seamless learning experience.</li>
            <li>Personalize learning for every user.</li>
            <li>Foster collaboration & engagement.</li>
            <li>Gamify learning to boost motivation.</li>
          </ul>
        </Section>

        <Section title="Meet the Team" subText={subText} accentText={accentText}>
          <ul className="space-y-1 text-lg">
            <li>Sushil Jadhav</li>
            <li>Soham Pawar</li>
            <li>Saloni Hule</li>
          </ul>
        </Section>

        <Section title="Join Us!" subText={subText} accentText={accentText}>
          Let’s redefine education together. Join us on this exciting journey toward academic excellence!
        </Section>
      </div>
    </div>
  );
};

const Section = ({ title, children, subText, accentText }) => (
  <div className="mt-8">
    <h2 className={`text-3xl font-semibold ${accentText}`}>{title}</h2>
    <div className={`mt-2 ${subText}`}>{children}</div>
  </div>
);

export default AboutUs;
