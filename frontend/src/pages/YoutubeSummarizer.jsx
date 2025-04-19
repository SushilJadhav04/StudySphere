import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import Button from "../components/common/Button";

const YouTubeSummarizer = () => {
  const [youtubeURL, setYoutubeURL] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const textareaRef = useRef(null);

  // Auto-resize textarea to fit content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [summary]);

  const handleSummarize = async (e) => {
    e.preventDefault();
    if (!youtubeURL.trim()) {
      setError("Please enter a YouTube URL.");
      return;
    }

    setLoading(true);
    setError("");
    setSummary("");

    try {
      const response = await fetch("https://studysphere-dijr.onrender.com/youtube/summarize_youtube", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: youtubeURL }),
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      setSummary(data.summary || "No summary available.");
    } catch (err) {
      console.error("Summarization error:", err);
      setError("An error occurred while summarizing the video.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary)
      .then(() => alert("Summary copied!"))
      .catch(() => alert("Failed to copy."));
  };

  return (
    <div className="flex h-screen bg-white dark:bg-black text-black dark:text-white">
      <Sidebar />
      <div className="flex-1 p-6 sm:pl-64 pt-24">

        {/* Input */}
        <form onSubmit={handleSummarize} className="flex flex-col items-center gap-4 w-full mb-8">
  <input
    type="text"
    value={youtubeURL}
    onChange={(e) => setYoutubeURL(e.target.value)}
    placeholder="Enter a YouTube URL to get started...."
    className="w-full max-w-2xl bg-gray-600 dark:bg-[#2a2a2a] text-white dark:text-white border-none rounded-md px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
/>

  <Button
    type="submit"
    disabled={loading}
    className="px-6 py-3 text-base"
  >
    {loading ? "Summarizing..." : "Summarize"}
  </Button>
</form>


        {/* Error */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Summary Output (only if available) */}
        {summary && (
          <>
            <textarea
  ref={textareaRef}
  readOnly
  value={summary}
  className="resize-none overflow-hidden text-base text-black dark:text-white bg-transparent px-[5px] w-[calc(100%-10px)]"
  style={{
    border: "none",
    outline: "none",
    background: "inherit",
  }}
/>

            <div className="flex justify-centre">
              <Button onClick={copyToClipboard}>Copy</Button>
            </div>
          </>
        )}

        
      </div>
    </div>
  );
};

export default YouTubeSummarizer;
