import React, { useState, useEffect, useRef, useContext } from "react";
import { FaPaperPlane, FaUpload, FaTrashAlt, FaPlusSquare, FaPlus, FaArrowAltCircleUp } from "react-icons/fa";
import Sidebar from "../components/layout/Sidebar";
import { ThemeContext } from "../components/context/ThemeContext";
import "../styles/chat.css";
import Button from "../components/common/Button";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [pdfContent, setPdfContent] = useState("");
  const chatHistoryRef = useRef(null);

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const finalQuery = pdfContent ? `${input}\n\n[PDF Context]: ${pdfContent}` : input;

    setMessages((prev) => [...prev, { text: input, sender: "user" }]);
    setInput("");

    try {
      const res = await fetch("https://studysphere-dijr.onrender.com/chatbot/ask_gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: finalQuery }),
      });

      const data = await res.json();
      const reply = res.ok
        ? data.response || "No response from AI"
        : "Error: Unable to process your request.";

      setMessages((prev) => [...prev, { text: reply, sender: "ai" }]);
    } catch (err) {
      console.error("Error:", err);
      setMessages((prev) => [...prev, { text: "Error: Failed to connect to AI.", sender: "ai" }]);
    }
  };

  const handlePdfUpload = async () => {
    if (!pdfFile) {
      setUploadStatus("Please select a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", pdfFile);

    try {
      setUploadStatus("Uploading...");
      const res = await fetch("https://studysphere-dijr.onrender.com/chatbot/upload_pdf", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      const success = res.ok && data.text;

      setPdfContent(success ? data.text : "");
      setUploadStatus(
        success
          ? "PDF uploaded successfully! You can now ask questions about it."
          : "Failed to extract text from PDF."
      );
      setMessages((prev) => [
        ...prev,
        {
          text: success
            ? "PDF uploaded successfully!"
            : "Failed to extract text from PDF.",
          sender: "system",
        },
      ]);
    } catch (err) {
      console.error("Error uploading PDF:", err);
      setUploadStatus("Error uploading PDF.");
    }
  };

  const resetPdf = () => {
    setPdfFile(null);
    setUploadStatus("");
    setPdfContent("");
  };

  return (
    <div
      className={`chat-container flex h-screen font-['Poppins'] transition-colors duration-300 ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}
    >
      <Sidebar />

      <div className="flex-1 flex flex-col items-center p-6 sm:pl-64 pt-20">
        <div className="flex flex-col w-full max-w-4xl h-[85vh]">

          {/* Chat History */}
          <div
            ref={chatHistoryRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
  className={`max-w-[70%] p-3 rounded-lg whitespace-pre-wrap shadow-md ${
    message.sender === "user"
      ? "bg-gray-200 text-black"
      : message.sender === "system"
      ? "bg-yellow-400 text-black"
      : theme === "dark"
      ? "bg-gray-700 text-gray-200"
      : "bg-gray-200 text-black"
  }`}
>
  {message.sender === "ai" ? (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: message.text }}
    />
  ) : (
    message.text
  )}
</div>

              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="p-4 w-full space-y-4 ">

            {/* Message Input Field (Top Line) */}
            <div
              className={`flex items-center rounded-lg shadow-md transition-all ${theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className={`flex-1 px-4 py-3 bg-transparent focus:outline-none placeholder-gray-400 ${theme === "dark" ? "text-white" : "text-black"}`}
              />
            </div>

            {/* Buttons Row (Below Input) */}
            <div className="flex flex-wrap justify-between items-center gap-3">

              <div className="flex gap-3 flex-wrap">

                {/* Hidden File Input */}
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setPdfFile(e.target.files[0])}
                  className="hidden"
                  id="pdf-upload"
                />

                {/* Choose File Button */}
                <label
                  htmlFor="pdf-upload"
                  className={`flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer transition shadow ${
                    theme === "dark"
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-black text-white hover:bg-gray-800"
                  }`}
                >
                  <FaPlus />
                </label>

                {/* Upload PDF Button */}
                <button
                  type="button"
                  onClick={handlePdfUpload}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition shadow ${
                    theme === "dark"
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-black text-white hover:bg-gray-800"
                  }`}
                >
                  <FaUpload />
                </button>

                {/* Reset PDF Button */}
                <button
                  type="button"
                  onClick={resetPdf}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition shadow ${
                    theme === "dark"
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-black text-white hover:bg-gray-800"
                  }`}
                >
                  <FaTrashAlt />
                </button>

                {/* Upload Status */}
                {uploadStatus && (
                  <span
                    className={`text-sm self-center ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {uploadStatus}
                  </span>
                )}
              </div>

              {/* Send Button (Right Aligned) */}
              <button
                type="submit"
                disabled={!input.trim()}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition disabled:opacity-50 shadow ${
                  theme === "dark"
                    ? "bg-white text-black hover:bg-gray-200"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                <FaArrowAltCircleUp />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
