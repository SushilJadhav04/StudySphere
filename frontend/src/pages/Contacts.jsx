import React, { useState, useContext } from "react";
import { ThemeContext } from "../components/context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import Button from "../components/common/Button";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div
      className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden font-[Poppins] px-6 py-12 transition-colors duration-300 ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Glow Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/2 w-96 h-96 bg-black-700 opacity-30 blur-[140px] rounded-full transform -translate-x-1/2"></div>
        <div className="absolute bottom-1/4 right-1/2 w-72 h-72 bg-black-700 opacity-30 blur-[100px] rounded-full transform translate-x-1/2"></div>
      </div>

      {/* Contact Card */}
      <div
        className={`relative z-10 max-w-3xl ${
          theme === "dark"
            ? "bg-white/10 border-white/20 text-white"
            : "bg-black/5 border-black/20 text-black"
        } backdrop-blur-lg  shadow-lg border p-8 md:p-12 text-center`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className={`absolute top-4 right-4 text-xl p-2 rounded-md hover:scale-110 transition ${
    theme === "dark"
              ? "text-white hover:bg-white/10"
              : "text-black hover:bg-black/10"
          }`}
        >
          <FaTimes />
        </button>

        <h1 className="text-4xl sm:text-5xl font-bold mb-6">Contact Us</h1>
        <p
          className={`text-lg mb-6 ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          We'd love to hear from you! Fill out the form below and we'll get
          back to you soon.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          {/* Name */}
          <div>
          <label htmlFor="Name" className="block text-lg font-medium mb-1">
              Name:
            </label>
            <input
              type="name"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={`w-full mt-2 p-3 rounded-lg border focus:outline-none focus:ring-2
                ${
                  theme === "dark"
                    ? "bg-zinc-900 text-white border-gray-400 focus:ring-white placeholder-gray-400"
                    : "bg-white text-black border-gray-500 focus:ring-black placeholder-gray-500"
                }`}
              
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-lg font-medium mb-1">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`w-full mt-2 p-3 rounded-lg border focus:outline-none focus:ring-2
                ${
                  theme === "dark"
                    ? "bg-zinc-900 text-white border-gray-400 focus:ring-white placeholder-gray-400"
                    : "bg-white text-black border-gray-500 focus:ring-black placeholder-gray-500"
                }`}
              
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-lg font-medium mb-1">
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className={`w-full mt-2 p-3 rounded-lg border focus:outline-none focus:ring-2
                ${
                  theme === "dark"
                    ? "bg-zinc-900 text-white border-gray-400 focus:ring-white placeholder-gray-400"
                    : "bg-white text-black border-gray-500 focus:ring-black placeholder-gray-500"
                }`}
              
            ></textarea>
          </div>

          {/* Minimal Submit Button */}
          <Button type="submit">Send Message</Button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
