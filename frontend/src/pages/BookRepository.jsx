import React, { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Button from "../components/common/Button";
import "../styles/book-repository.css"; // Keep if you’re using any custom styles

const API_URL = "http://192.168.89.110:5000/book_repo/search?query=";

const BookRepository = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBooks = async (query) => {
    if (!query.trim()) {
      setError("Please enter a search query.");
      return;
    }

    setIsLoading(true);

    setError(null);

    try {
      const response = await fetch(`${API_URL}${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.books && Array.isArray(data.books)) {
        setBooks(data.books);
      } else {
        setBooks([]);
        setError("No books found for the given query.");
      }
    } catch (err) {
      console.error("Error fetching books:", err);
      setError("Failed to fetch books. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBooks(searchQuery);
  };

  return (
    <div className="flex h-screen bg-white dark:bg-black text-black dark:text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 px-4 sm:px-8 pt-24 sm:pl-64">
        {/* Search Bar Only */}
        <form onSubmit={handleSearch} className="flex gap-3 max-w-3xl mx-auto mb-8">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for books..."
            className="w-full bg-gray-100 dark:bg-[#1e1e1e] text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3
                       focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          />
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
            className="px-6 py-3 text-base"
          >
            {isLoading ? "Searching..." : "Search"}
          </Button>
        </form>

        {/* Error Message */}
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

        {/* Books Display */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">

          {books.map((book, index) => (
            <div
              key={book.id || `${book.title}-${index}`}
              className="book-card"
            >
              <img
                src={book.thumbnail}
                alt={book.title}
                className="book-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://books.google.com/googlebooks/images/no_cover_thumb.gif";
                }}
              />
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">{book.authors}</p>
              <div className="book-button-container">
                <a
                  href={book.preview_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="preview-button"
                >
                  Preview
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* No Books Found Message */}
        {books.length === 0 && !isLoading && !error && (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            No books found. Try searching for something!
          </div>
        )}
      </div>
    </div>
  );
};

export default BookRepository;
