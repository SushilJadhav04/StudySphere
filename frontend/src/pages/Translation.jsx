import React, { useState, useEffect, useContext } from "react";
import { FaSpinner, FaClipboard } from "react-icons/fa";
import axios from "axios";
import Sidebar from "../components/layout/Sidebar";
import { debounce } from "lodash";
import Button from "../components/common/Button";
import { ThemeContext } from "../components/context/ThemeContext";

const Translation = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [sourceLang, setSourceLang] = useState("auto");
  const [targetLang, setTargetLang] = useState("hi");
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useContext(ThemeContext);

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "pt", name: "Portuguese" },
    { code: "ru", name: "Russian" },
    { code: "zh-CN", name: "Chinese" },
    { code: "ja", name: "Japanese" },
    { code: "ko", name: "Korean" },
    { code: "hi", name: "Hindi" },
    { code: "ar", name: "Arabic" },
    { code: "mr", name: "Marathi" },
    { code: "kn", name: "Kannada" }
  ];

  const translateText = debounce(async (text) => {
    if (!text.trim()) {
      setOutputText("");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("https://studysphere-kmzy.onrender.com/translation/translate", {
        text,
        source_lang: sourceLang,
        target_lang: targetLang,
      });

      setOutputText(response.data.translated_text || "Translation not available.");
    } catch (error) {
      console.error("Error:", error);
      setOutputText("Error in translation.");
    } finally {
      setIsLoading(false);
    }
  }, 500);

  useEffect(() => {
    translateText(inputText);
    return () => translateText.cancel();
  }, [inputText, sourceLang, targetLang]);

  // Updated copyToClipboard function
  const copyToClipboard = () => {
    if (outputText.trim() === "") {
      alert("❌ There's no text to copy.");
      return;
    }

    navigator.clipboard.writeText(outputText)
      .then(() => {
        alert("✅ Text copied successfully!");
      })
      .catch((err) => {
        console.error("Clipboard error:", err);
        alert("❌ Failed to copy text.");
      });
  };
  return (
    <div className="flex h-screen font-['Poppins'] bg-white text-black dark:bg-black dark:text-white">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 sm:pl-64 pt-20">
        {/* Language Selection Buttons */}
        <div className="flex flex-wrap gap-3 mb-6 justify-center md:justify-start">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              variant={targetLang === lang.code ? "primary" : "adaptive"}
              onClick={() => setTargetLang(lang.code)}
              className="px-4 py-2"
            >
              {lang.name}
            </Button>
          ))}
        </div>

        {/* Translation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Input Section */}
          <div className="flex flex-col gap-4">
            <textarea
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-900 focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 focus:outline-none"
              placeholder="Enter text to translate..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>

          {/* Output Section */}
          <div className="flex flex-col gap-4">
            <textarea
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-900"
              placeholder="Translation will appear here..."
              value={outputText}
              readOnly
            />
            <Button
              onClick={copyToClipboard}
              className="mt-4 flex items-center gap-1 text-xs"
            >
              <FaClipboard className="text-sm" /> Copy
            </Button>
          </div>

        </div>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex justify-center mt-4">
            <FaSpinner className="animate-spin text-xl" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Translation;
