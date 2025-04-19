import React, { useState } from "react";
import { FaFileAlt, FaSpinner, FaPaperPlane, FaCopy } from "react-icons/fa";
import Card from "../components/common/Card";

import Sidebar from "../components/layout/Sidebar";
import Button from "../components/common/Button";
import "../styles/studysparks.css";

const StudySparks = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState({ summary: "", flashcards: [], expected_questions: [] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://studysphere-kmzy.onrender.com/studysparks/process-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      response.ok ? setResults(data) : setError(data.error || "Failed to process text");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="studysparks flex h-screen bg-white dark:bg-[#0d0d0d] text-black dark:text-white font-poppins">

      <Sidebar />

      <div className="flex-1 p-6 sm:pl-64 mt-16 flex justify-center items-start overflow-y-auto">
        <div className="w-full max-w-7xl flex flex-col gap-10">

          {/* Input + Output side-by-side */}
          <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-6">
            {/* Left box - Input */}
            <div className="flex-1 flex flex-col gap-4">
              <textarea
                className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1a1a1a] text-black dark:text-white rounded-md resize-none"
                placeholder="Type or paste text here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <Button
                type="submit"
                className="mt-4 flex items-center gap-2 px-4 py-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Generate
                  </>
                )}
              </Button>
            </div>

            {/* Right box - Output */}
            <div className="flex-1 flex flex-col gap-4">
              <div className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1a1a1a] text-black dark:text-white rounded-md overflow-y-auto">
                {results.summary ? results.summary : <p className="text-gray-500 dark:text-gray-400">Your Smart Summary will appear here...</p>}
              </div>
              {results.summary && (
                <Button
                  type="button"
                  className=" mt-4 flex items-center gap-2"
                  onClick={() => navigator.clipboard.writeText(results.summary)}
                >
                  <FaCopy />
                  Copy
                </Button>
              )}
            </div>
          </form>

          {/* Flashcards Section */}
          {results.flashcards.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-md font-semibold text-gray-900 dark:text-gray-100">Flashcards</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-800 dark:text-gray-300 space-y-2">
                {results.flashcards.map((card, index) => (
                  <Card key={index} question={card.question} answer={card.answer} />
                ))}
              </div>
            </div>
          )}

          {/* Expected Questions Section */}
          {results.expected_questions.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-md font-semibold text-gray-900 dark:text-gray-100">Most Expected Questions</h3>
              <ul className="list-disc list-inside text-gray-800 dark:text-gray-300 space-y-2">
                {results.expected_questions.map((question, index) => (
                  <li key={index}>{question}</li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default StudySparks;
