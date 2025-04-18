import React, { useState } from "react";
import { FaSpinner, FaClipboard } from "react-icons/fa";
import Sidebar from "../components/layout/Sidebar";
import Button from "../components/common/Button";

const Summarization = () => {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [wordLimit, setWordLimit] = useState("");


  const handleSummarize = async () => {
    if (!inputText.trim()) {
      setError("Please enter text before summarizing.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://192.168.74.110:5000/summarization/process-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: inputText,
          word_limit: wordLimit ? parseInt(wordLimit, 10) : undefined
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setSummary(data.summary || "No summary available.");
    } catch (error) {
      console.error("Summarization error:", error);
      setError("An unexpected error occurred while generating the summary.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary).then(() => {
      alert("Summary copied successfully!");
    }).catch(() => {
      alert("Failed to copy summary.");
    });
  };

  return (
    <div className="flex h-screen bg-white text-black dark:bg-black dark:text-white font-['Poppins']">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Workspace */}
      <div className="flex-1 p-6 sm:pl-64 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Input Section */}
          <div className="p-4">
            <textarea
              className="w-full h-80 p-3 bg-gray-100 dark:bg-[#2a2a2a] text-black dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
              placeholder="Type or paste text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            ></textarea>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <div className="mt-4">
          <label className="block mb-1 text-sm font-medium">Word Limit (optional)</label>
           <input
    type="number"
    className="w-auto p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-[#2a2a2a] text-black dark:text-white"
    placeholder="e.g. 100"
    value={wordLimit}
    onChange={(e) => setWordLimit(e.target.value)}
    min="10"
    max="1000"
  />
  
</div>
            {/* Summarize Button BELOW input */}
            <div className="mt-4">
              <Button
                onClick={handleSummarize}
                disabled={loading}
                icon={loading ? <FaSpinner className="animate-spin" /> : null}
              >
                {loading ? "Summarizing..." : "Summarize"}
              </Button>
            </div>
          </div>



          {/* Output Section */}
          <div className="p-4">
            <textarea
              className="w-full h-80 p-3 bg-gray-100 dark:bg-[#2a2a2a] text-black dark:text-white border border-gray-300 dark:border-gray-600"
              placeholder="Your summary will appear here..."
              value={summary}
              readOnly
            />
            {/* Copy Button */}
            <div className="mt-4">
              <Button onClick={copyToClipboard} icon={<FaClipboard />}>
                Copy
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Summarization;
